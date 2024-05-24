package com.noop.util;

import com.alibaba.fastjson.JSONObject;
import com.noop.config.WechatConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 微信AccessToken获取工具类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/16 18:18
 */
@Slf4j
@Component
public class AccessTokenUtil {

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private WechatConfig wechatConfig;

    public static final String ACCESS_TOKEN_KEY = "wx:access-token";
    public static final String COMPONENT_ACCESS_TOKEN_KEY = "wx:component_access_token";
    public static final String TICKET_KEY = "wx:ticket";

    /**
     * 请求AccessToken
     * @throws IOException  请求异常
     * @return 请求结果
     */
    private JSONObject requestAccessToken() throws IOException {
        Map<String, Object> param = new HashMap<>();
        param.put("grant_type", "client_credential");
        param.put("appid", wechatConfig.getAppId());
        param.put("secret", wechatConfig.getAppSecret());
        return HttpRequestUtil.get("https://api.weixin.qq.com/cgi-bin/token", param);
    }


    /**
     *请求token并存入redis
     * @return 是否请求成功
     */
    public boolean saveAccessToken() {
        JSONObject json = null;
        try {
            json = this.requestAccessToken();
            log.info("请求微信access-token结果：{}", json);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        if (json==null || json.isEmpty()) {
            return false;
        } else {
            String accessToken = (String) json.get("access_token");
            long expires = Long.parseLong(json.getString("expires_in"));
            this.saveAccessToken(accessToken, expires);
            return true;
        }
    }

    /**
     * 存储access-token 2h
     * @param token access-token
     * @return
     */
    public boolean saveAccessToken(String token, long time) {
        return redisUtil.set(ACCESS_TOKEN_KEY, token, time);
    }

    /**
     * 获取当前access-token
     * @return token
     */
    public String getAccessToken() {
        return (String) redisUtil.get(ACCESS_TOKEN_KEY);
    }

    /**
     * 请求component_access_token并存入redis
     * @param ticket    component_verify_ticket
     * @return  是否请求成功
     */
    public boolean saveVerifyTicket(String ticket) {
        return redisUtil.set(TICKET_KEY, ticket);
    }

    /**
     * 获取component_verify_ticket
     * @return  ticket
     */
    public String getVerifyTicket() {
        return (String) redisUtil.get(TICKET_KEY);
    }

    /**
     * 请求component_access_token
     * @return  JsonObject 请求结果
     */
    private JSONObject requestComponentAccessToken() {
        String url = "https://api.weixin.qq.com/cgi-bin/component/api_component_token";
        JSONObject json = new JSONObject();
        json.put("component_appid", wechatConfig.getAppId());
        json.put("component_appsecret", wechatConfig.getAppSecret());
        json.put("component_verify_ticket", redisUtil.get(TICKET_KEY));
        return HttpRequestUtil.post(url, json.toJSONString(), new HashMap<>(0));
    }

    /**
     * 请求component_access_token并存入redis
     * @return  是否请求成功
     */
    public boolean saveComponentAccessToken() {
        JSONObject json = this.requestComponentAccessToken();
        if (json==null || json.isEmpty()) {
            return false;
        } else {
            String accessToken = (String) json.get("component_access_token");
            long expires = Long.parseLong(json.getString("expires_in"));
            return redisUtil.set(COMPONENT_ACCESS_TOKEN_KEY, accessToken, expires);
        }
    }

    public String getComponentAccessToken() {
        return (String) redisUtil.get(COMPONENT_ACCESS_TOKEN_KEY);
    }

    public boolean isComponentAccessTokenExist() {
        return redisUtil.hasKey(COMPONENT_ACCESS_TOKEN_KEY);
    }


}
