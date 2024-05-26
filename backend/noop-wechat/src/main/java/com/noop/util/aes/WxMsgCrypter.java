package com.noop.util.aes;

import com.noop.config.WechatConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

/**
 * 将微信加解密工具注册入spring bean
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/21 18:17
 */
@Slf4j
@Component
public class WxMsgCrypter {

    @Autowired
    private WechatConfig wechatConfig;
    @Bean
    public WXBizMsgCrypt wxBizMsgCrypt() {
        WXBizMsgCrypt crypt = null;
        try {
            log.info("token:{}, encodeKey:{}, appId:{}", wechatConfig.getToken(), wechatConfig.getEncodeKey(), wechatConfig.getAppId());
            crypt = new WXBizMsgCrypt(wechatConfig.getToken(), wechatConfig.getEncodeKey(), wechatConfig.getAppId());
        } catch (AesException e) {
            log.info("微信加解密工具注入失败");
            throw new RuntimeException(e);
        }
        log.info("微信加解密工具注入成功。crypt:{}", crypt.toString());
        return crypt;
    }

}
