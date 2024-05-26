package com.noop.service;

import com.alibaba.fastjson.JSONObject;
import com.noop.config.WechatConfig;
import com.noop.model.entity.UserWechat;
import com.noop.util.AccessTokenUtil;
import com.noop.util.HttpRequestUtil;
import com.noop.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.HashMap;

/**
 * 微信开放平台对接服务
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/21 21:00
 */
@Slf4j
@Service
public class OpenService {

    @Autowired
    private WechatConfig wechatConfig;
    @Autowired
    private UserWechatService userWechatService;
    @Autowired
    private AccessTokenUtil tokenUtil;
    @Autowired
    private RedisUtil redisUtil;

    private final String AUTHORIZER_ACCESS_TOKEN_PREFIX = "wx:access-token-";
    private final String FAKE_ACCESS_TOKEN_PREFIX = "fake:access-token";

    public String buildAuthorizerAccessTokenKey(String appId) {
        return AUTHORIZER_ACCESS_TOKEN_PREFIX + appId;
    }

    public String getPreAuthCode() {
        String componentAccessToken = tokenUtil.getComponentAccessToken();
        String url = "https://api.weixin.qq.com/cgi-bin/component/api_create_preauthcode?component_access_token=" + componentAccessToken;
        JSONObject json = new JSONObject();
        json.put("component_appid", wechatConfig.getAppId());
        JSONObject resp = HttpRequestUtil.post(url, json.toString(), new HashMap<>(1));
        log.info("获取预授权码结果：{}", resp.toJSONString());
        return resp.getString("pre_auth_code");
    }

    public String buildAuthUrl(String redirectUrl) {
        String preAuthCode = this.getPreAuthCode();
        return "https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=" + wechatConfig.getAppId() + "&pre_auth_code=" + preAuthCode + "&redirect_uri=" + redirectUrl + "&auth_type=1";
    }

    private JSONObject requestAuthorizerToken(String authCode) {
        String url = "https://api.weixin.qq.com/cgi-bin/component/api_query_auth?component_access_token=" + tokenUtil.getComponentAccessToken();
        JSONObject postData = new JSONObject();
        postData.put("component_appid", wechatConfig.getAppId());
        postData.put("authorization_code", authCode);
        return HttpRequestUtil.post(url, postData.toString(), new HashMap<>(1));
    }

    public boolean saveAuthorizerToken(String authCode, String userId) {
        JSONObject resp = this.requestAuthorizerToken(authCode);
        JSONObject info = resp.getJSONObject("authorization_info");
        String appId = info.getString("authorizer_appid");
        String accessToken = info.getString("authorizer_access_token");
        Long expiresIn = info.getLong("expires_in");
        boolean set = this.saveAuthorizerToken(appId, accessToken, expiresIn);
        String refreshToken = info.getString("authorizer_refresh_token");
        int insert = userWechatService.insert(userId, appId, refreshToken);
        return set && insert > 0;
    }

    private boolean saveAuthorizerToken(String appId, String accessToken, long expiresIn) {
        return redisUtil.set(this.buildAuthorizerAccessTokenKey(appId), accessToken, expiresIn);
    }

    private JSONObject requestAuthorizerAccessToken(String appId, String refreshToken) {
        String url = "https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token=" + tokenUtil.getComponentAccessToken();
        JSONObject postData = new JSONObject();
        postData.put("component_appid", wechatConfig.getAppId());
        postData.put("authorizer_appid", appId);
        postData.put("authorizer_refresh_token", refreshToken);
        return HttpRequestUtil.post(url, postData.toString(), new HashMap<>(1));
    }

//    /**
//     * 获取授权方access token
//     * @param userId    用户id
//     * @return access token
//     */
//    public String getAuthorizerAccessToken(String userId) {
//        UserWechat uw = userWechatService.get(userId);
//        String appId = uw.getAppId();
//        String accessToken = (String) redisUtil.get(this.buildAuthorizerAccessTokenKey(appId));
//        if (!StringUtils.hasLength(accessToken)) {
//            JSONObject resp = this.requestAuthorizerAccessToken(appId, uw.getAuthorizerRefreshToken());
//            accessToken = resp.getString("authorizer_access_token");
//            Long expiresIn = resp.getLong("expires_in");
//            this.saveAuthorizerToken(appId, accessToken, expiresIn);
//            String refreshToken = resp.getString("authorizer_refresh_token");
//            uw.setNewRecord(false);
//            uw.setAuthorizerRefreshToken(refreshToken);
//            userWechatService.save(uw);
//        }
//        return accessToken;
//    }

    /**
     * 一个写死的access token测试方法
     * @return  access token
     */
    public String getAuthorizerAccessToken(String userId) {
        String appId = "wx1b49318a38452444";
        String appSecret = "de08cec2db83064093abe4aa553f9c8f";
        String accessToken = (String) redisUtil.get(this.FAKE_ACCESS_TOKEN_PREFIX);
        if (!StringUtils.hasLength(accessToken)) {
            String url = "https://api.weixin.qq.com/cgi-bin/token";
            HashMap<String, Object> params = new HashMap<>();
            params.put("grant_type", "client_credential");
            params.put("appid", appId);
            params.put("secret", appSecret);
            JSONObject resp = null;
            try {
                resp = HttpRequestUtil.get(url, params, new HashMap<>(1));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            accessToken = resp.getString("access_token");
            Long expireIn = resp.getLong("expires_in");
            redisUtil.set(this.FAKE_ACCESS_TOKEN_PREFIX, accessToken, expireIn);
        }
        return accessToken;
    }

}
