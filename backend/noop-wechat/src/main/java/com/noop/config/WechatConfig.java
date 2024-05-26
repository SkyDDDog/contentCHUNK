package com.noop.config;

import lombok.Data;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * 微信公众号配置类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/15 13:53
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "wechat")
public class WechatConfig {

    private String appId;

    private String appSecret;

    private String token;

    private String encodeKey;
}
