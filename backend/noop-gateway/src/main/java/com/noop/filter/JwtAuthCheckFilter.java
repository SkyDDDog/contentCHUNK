package com.noop.filter;

import com.alibaba.fastjson.JSON;
import com.noop.common.CommonResult;
import com.noop.common.MsgCodeUtil;
import com.noop.config.AuthJwtProperties;
import com.noop.config.AuthWhiteListProperties;
import com.noop.constant.AuthConstants;
import com.noop.util.JwtTokenUtil;
import com.noop.util.RedisUtil;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Jwt认证检查过滤器
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/5
 */

@Slf4j
@Configuration
public class JwtAuthCheckFilter {

    public static final String USER_ID = "userId";
    public static final String USER_NAME = "username";
    public static final String FROM_SOURCE = "from-source";

    @Value("${auth.rbac.enabled}")
    private boolean rbacEnabled;

    @Value("${auth.enabled}")
    private boolean authEnabled;

    @Resource
    private AuthJwtProperties authJwtProperties;
    @Resource
    private AuthWhiteListProperties whiteListProperties;
    @Resource
    private JwtTokenUtil jwtTokenUtil;
    @Resource
    private RedisUtil redisUtil;


    @Bean
    @Order(-101)
    public GlobalFilter jwtAuthGlobalFilter() {
        return (exchange, chain) -> {
            ServerHttpRequest serverHttpRequest = exchange.getRequest();
            ServerHttpResponse serverHttpResponse = exchange.getResponse();
            ServerHttpRequest.Builder mutate = serverHttpRequest.mutate();
            if (!authEnabled) {
                return chain.filter(exchange.mutate().request(mutate.build()).build());
            }
            // 请求路径
            String requestUrl = serverHttpRequest.getURI().getPath();
            // 请求方法
            String method = serverHttpRequest.getMethod().name();
            // RestFul风格的请求路径
            String restFulPath = method + ":" + requestUrl;
            // url匹配工具
            AntPathMatcher antPathMatcher = new AntPathMatcher();

            //对白名单中的地址放行
            List<String> whiteList = whiteListProperties.getWhites();
            for(String str : whiteList){
                if(requestUrl.contains(str)){
                    log.info("白名单,放行:{}", restFulPath);
                    return chain.filter(exchange);
                }
            }

            // 从 HTTP 请求头中获取 JWT 令牌
            String token = getToken(serverHttpRequest);
            if (!StringUtils.hasLength(token)) {
                return this.unauthorizedResponse(exchange, serverHttpResponse, MsgCodeUtil.MSG_CODE_JWT_TOKEN_ISNULL);
            }

            // 对Token解签名，并验证Token是否过期
            boolean isJwtNotValid = jwtTokenUtil.isTokenExpired(token);
            if(isJwtNotValid){
                return this.unauthorizedResponse(exchange, serverHttpResponse, MsgCodeUtil.MSG_CODE_JWT_TOKEN_EXPIRED);
            }
            // 验证 token 里面的 userId 是否为空
            String userId = jwtTokenUtil.getUserIdFromToken(token);
            String username = jwtTokenUtil.getUserNameFromToken(token);
            String role = jwtTokenUtil.getUserRoleFromToken(token);
            if (!StringUtils.hasLength(userId)) {
                return this.unauthorizedResponse(exchange, serverHttpResponse, MsgCodeUtil.MSG_CODE_JWT_ILLEGAL_ARGUMENT);
            }

            // 权限校验
            if (rbacEnabled) {
                // 超级管理员直接放行
                if (AuthConstants.ROOT_ROLE.equals(role)) {
                    // 设置用户信息到请求
                    addHeader(mutate, USER_ID, userId);
                    addHeader(mutate, USER_NAME, username);
                    // 内部请求来源参数清除
                    removeHeader(mutate, FROM_SOURCE);
                    return chain.filter(exchange.mutate().request(mutate.build()).build());
                }

                // 从redis中读入所有uri->角色对应关系
                Map<Object, Object> entries = redisUtil.hmget(AuthConstants.AUTH_CACHE_KEY);
                // 角色集合
                List<String> authorities = new ArrayList<>();
                entries.forEach((path, roles) -> {
                    // 路径匹配则添加到角色集合中
                    if (antPathMatcher.match((String) path, restFulPath)) {
                        authorities.addAll((List<String>) roles);
                    }
                });
                if (CollectionUtils.isEmpty(authorities) || !authorities.contains(role)) {
                    return this.unauthorizedResponse(exchange, serverHttpResponse, MsgCodeUtil.MSG_CODE_JWT_PERMISSION_LIMITED);
                }
            }

            // 设置用户信息到请求
            addHeader(mutate, USER_ID, userId);
            addHeader(mutate, USER_NAME, username);
            // 内部请求来源参数清除
            removeHeader(mutate, FROM_SOURCE);
            return chain.filter(exchange.mutate().request(mutate.build()).build());
        };
    }

    /**
     * 添加头部信息
     * @param mutate    ServerHttpRequest.Builder
     * @param name    头部名称
     * @param value   头部值
     */
    private void addHeader(ServerHttpRequest.Builder mutate, String name, Object value) {
        if (value == null) {
            return;
        }
        String valueStr = value.toString();
        String valueEncode = urlEncode(valueStr);
        mutate.header(name, valueEncode);
    }

    /**
     * 移除头部信息
     * @param mutate    ServerHttpRequest.Builder
     * @param name  头部名称
     */
    private void removeHeader(ServerHttpRequest.Builder mutate, String name) {
        mutate.headers(httpHeaders -> httpHeaders.remove(name)).build();
    }

    /**
     * 内容编码，配置为UTF-8
     * @param str  内容
     * @return    编码后的内容
     */
    static String urlEncode(String str) {
        return URLEncoder.encode(str, StandardCharsets.UTF_8);
    }

    /**
     * 获取请求头中的token
     * @param request   ServerHttpRequest
     * @return  token
     */
    private String getToken(ServerHttpRequest request) {
        String token = request.getHeaders().getFirst(authJwtProperties.getHeader());
//        // 如果前端设置了令牌前缀，则裁剪掉前缀
        if (StringUtils.hasLength(token) && token.startsWith("Bearer "))
        {
            token = token.replaceFirst("Bearer ", "");
        }
        return token;
    }

    /**
     * jwt鉴权失败处理类
     * @param exchange  ServerWebExchange
     * @param serverHttpResponse    ServerHttpResponse
     * @param responseCode  响应码
     * @return  Mono<Void>
     */
    private Mono<Void> unauthorizedResponse(ServerWebExchange exchange, ServerHttpResponse serverHttpResponse, int responseCode) {
        log.warn("token异常处理,请求路径:{}", exchange.getRequest().getPath());
        serverHttpResponse.setStatusCode(HttpStatus.UNAUTHORIZED);
        serverHttpResponse.getHeaders().add("Content-Type", "application/json;charset=UTF-8");
        CommonResult result = new CommonResult();
        result.fail(responseCode).end();

        DataBuffer dataBuffer = serverHttpResponse.bufferFactory()
                .wrap(JSON.toJSONStringWithDateFormat(result, JSON.DEFFAULT_DATE_FORMAT)
                        .getBytes(StandardCharsets.UTF_8));
        return serverHttpResponse.writeWith(Flux.just(dataBuffer));
    }


}
