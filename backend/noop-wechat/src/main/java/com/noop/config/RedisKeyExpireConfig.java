package com.noop.config;

import com.noop.util.AccessTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.listener.KeyExpirationEventMessageListener;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

/**
 * 监听access_token过期自动更新
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/17 15:52
 */
@Slf4j
@Component
public class RedisKeyExpireConfig extends KeyExpirationEventMessageListener {


    @Autowired
    private AccessTokenUtil tokenUtil;

    public RedisKeyExpireConfig(RedisMessageListenerContainer listenerContainer) {
        super(listenerContainer);
    }


    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String key = new String(message.getBody(), StandardCharsets.UTF_8);
            if (AccessTokenUtil.COMPONENT_ACCESS_TOKEN_KEY.equals(key)) {
                log.info("access_token 更新中...");
                tokenUtil.saveComponentAccessToken();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
