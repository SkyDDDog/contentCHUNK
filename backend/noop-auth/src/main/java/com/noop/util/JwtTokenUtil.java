package com.noop.util;


import com.noop.config.AuthJwtProperties;
import com.noop.constant.AuthConstants;
import com.noop.constant.JwtTokenConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * jwt 令牌生成、验证工具类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/5
 */
@Component
public class JwtTokenUtil {


    @Autowired
    private RedisUtil redisUtil;
    @Autowired
    private AuthJwtProperties jwtProperties;


    /**
     * 生成 token 令牌主方法
     * @param userId 用户Id或用户名
     * @return 令token牌
     */

    public Map<String, Object> generateTokenAndRefreshToken(String userId, String username, String roles) {
        //生成令牌及刷新令牌
        Map<String, Object> tokenMap = this.buildToken(userId, username, roles);
        //redis缓存结果
        this.cacheToken(userId, tokenMap);
        return tokenMap;
    }

    //将token缓存进redis
    private void cacheToken(String userId, Map<String, Object> tokenMap) {
        redisUtil.hset(JwtTokenConstants.buildJwtCacheKey(userId), JwtTokenConstants.ACCESS_TOKEN, tokenMap.get(JwtTokenConstants.ACCESS_TOKEN));
        redisUtil.hset(JwtTokenConstants.buildJwtCacheKey(userId), JwtTokenConstants.REFRESH_TOKEN, tokenMap.get(JwtTokenConstants.REFRESH_TOKEN));
        redisUtil.expire(JwtTokenConstants.buildJwtCacheKey(userId), jwtProperties.getExpiration() * 2);
    }

    /**
     * 生成令牌
     * @param userId    用户id
     * @param username  用户名
     * @return  令牌map
     */
    private Map<String, Object> buildToken(String userId, String username, String roles) {
        Map<String, String> map = new HashMap<>();
        map.put("roles", roles);
        //生成token令牌
        String accessToken = generateAccessToken(userId, username, map);
        //生成刷新令牌
        String refreshToken = generateRefreshToken(userId, username, null);
        //存储两个令牌及过期时间，返回结果
        Map<String, Object> tokenMap = new HashMap<>(2);
        tokenMap.put(JwtTokenConstants.ACCESS_TOKEN, accessToken);
        tokenMap.put(JwtTokenConstants.REFRESH_TOKEN, refreshToken);
        tokenMap.put(JwtTokenConstants.EXPIRE_IN, jwtProperties.getExpiration());
        return tokenMap;
    }
    /**
     * 生成 token 令牌 及 refresh token 令牌
     * @param payloads 令牌中携带的附加信息
     * @return 令牌
     */
    public String generateAccessToken(String userId, String username,
                                      Map<String,String> payloads) {
        Map<String, Object> claims = this.buildClaims(userId, username, payloads);;

        return this.generateAccessToken(claims);
    }
    public String generateRefreshToken(String userId, String username, Map<String,String> payloads) {
        Map<String, Object> claims = this.buildClaims(userId, username, payloads);
        return this.generateRefreshToken(claims);
    }

    /**
     * 构建map存储令牌需携带的信息
     * @param userId    用户id
     * @param username  用户名
     * @param payloads  令牌中携带的附加信息
     * @return  令牌map
     */
    private Map<String, Object> buildClaims(String userId, String username, Map<String, String> payloads) {
        int payloadSizes = payloads == null? 0 : payloads.size();

        Map<String, Object> claims = new HashMap<>(payloadSizes + 2);
        if (payloadSizes!=0) {
            claims.put(JwtTokenConstants.ROLES, payloads.get("roles"));
        }
        claims.put("sub", userId);
        claims.put(JwtTokenConstants.USER_NAME, username);
        claims.put("created", new Date());
        //claims.put("roles", "admin");

        if(payloadSizes > 0){
            claims.putAll(payloads);
        }

        return claims;
    }


    /**
     * 刷新令牌并生成新令牌
     * 并将新结果缓存进redis
     * @param userId    用户id
     * @param username  用户名
     * @return  令牌map
     */
    public Map<String, Object> refreshTokenAndGenerateToken(String userId, String username, String roles) {
        Map<String, Object> tokenMap = buildToken(userId, username, roles);
        redisUtil.del(JwtTokenConstants.buildJwtCacheKey(userId));
        this.cacheToken(userId, tokenMap);
        return tokenMap;
    }



//    /**
//     * 从request获取userid
//     * @param request http请求
//     * @return request.getHeader
//     */
//    public String getUserIdFromRequest(HttpServletRequest request) {
//        return request.getHeader(USER_ID);
//    }

    /**
     * 缓存中删除token
     * @param userId 用户id
     * @return 删除结果
     */
    public boolean removeToken(String userId) {
        return 0 < redisUtil.del(JwtTokenConstants.buildJwtCacheKey(userId));
    }


    /**
     * 从令牌中获取用户id
     *
     * @param token 令牌
     * @return 用户id
     */
    public String getUserIdFromToken(String token) {
        String userId;
        try {
            Claims claims = getClaimsFromToken(token);
            userId = claims.getSubject();
        } catch (Exception e) {
            userId = null;
        }
        return userId;
    }
    /**
     * 从令牌中获取用户名
     *
     * @param token 令牌
     * @return 用户名
     */
    public String getUserNameFromToken(String token) {
        String username;
        try {
            Claims claims = getClaimsFromToken(token);
            username = (String) claims.get(JwtTokenConstants.USER_NAME);
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    public String getUserRoleFromToken(String token) {
        String role;
        try {
            Claims claims = getClaimsFromToken(token);
            role = (String) claims.get(JwtTokenConstants.ROLES);
        } catch (Exception e) {
            role = null;
        }
        return role;
    }

    /**
     * 判断令牌是否不存在 redis 中
     *
     * @param token 刷新令牌
     * @return true-不存在，false-存在
     */
    public Boolean isRefreshTokenNotExistCache(String token) {
        String userId = getUserIdFromToken(token);
        String refreshToken = (String)redisUtil.hget(JwtTokenConstants.buildJwtCacheKey(userId), JwtTokenConstants.REFRESH_TOKEN);
        return refreshToken == null || !refreshToken.equals(token);
    }

    /**
     * 判断令牌是否过期
     *
     * @param token 令牌
     * @return true-已过期，false-未过期
     */
    public Boolean isTokenExpired(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            Date expiration = claims.getExpiration();
            return expiration.before(new Date());
        } catch (Exception e) {
            //验证 JWT 签名失败等同于令牌过期
            return true;
        }
    }

    /**
     * 刷新令牌
     *
     * @param token 原令牌
     * @return 新令牌
     */
    public Map<String, Object> refreshToken(String token) {
        Map<String, Object> newToken;
        try {
            Claims claims = getClaimsFromToken(token);
            claims.put("created", new Date());
            String accessToken = this.generateAccessToken(claims);
            String refreshToken = this.generateRefreshToken(claims);
            newToken = new HashMap<>(3);
            newToken.put(JwtTokenConstants.ACCESS_TOKEN, accessToken);
            newToken.put(JwtTokenConstants.REFRESH_TOKEN, refreshToken);
            newToken.put(JwtTokenConstants.EXPIRE_IN, jwtProperties.getExpiration());
        } catch (Exception e) {
            newToken = null;
        }
        return newToken;
    }


    /**
     * 验证令牌
     *
     * @param token       令牌
     * @param userId  用户Id用户名
     * @return 是否有效
     */
    public Boolean validateToken(String token, String userId) {

        String userIdFromToken = getUserIdFromToken(token);
        return (userIdFromToken.equals(userId) && !isTokenExpired(token));
    }


    /**
     * 生成令牌
     * @param claims 数据声明
     * @return 令牌
     */
    private String generateAccessToken(Map<String, Object> claims) {
        Date expirationDate = new Date(System.currentTimeMillis()
                + jwtProperties.getExpiration());
        return Jwts.builder().setClaims(claims)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512,
                        jwtProperties.getSecret())
                .compact();
    }
    /**
     * 生成刷新令牌 refreshToken，有效期是令牌的 2 倍
     * @param claims 数据声明
     * @return 令牌
     */
    private String generateRefreshToken(Map<String, Object> claims) {
        Date expirationDate = new Date(System.currentTimeMillis() + jwtProperties.getExpiration() * 2);
        return Jwts.builder().setClaims(claims)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
    }

    /**
     * 从令牌中获取数据声明,验证 JWT 签名
     *
     * @param token 令牌
     * @return 数据声明
     */
    private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token);
            claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    /**
     * 生成测试用的token
     * 可用时长一个月
     * @return  token
     */
    public String generateTestToken() {
        Map<String, Object> claims = new HashMap<>(4);
        claims.put("sub", "1749837707132424193");
        claims.put(JwtTokenConstants.USER_NAME, "lear");
        claims.put("created", new Date());
        claims.put(JwtTokenConstants.ROLES, AuthConstants.ROOT_ROLE);

        Date expirationDate = new Date(System.currentTimeMillis()
                + 30 * 24 * 60 * 60 * 1000L);
        return Jwts.builder().setClaims(claims)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512,
                        jwtProperties.getSecret())
                .compact();
    }

}
