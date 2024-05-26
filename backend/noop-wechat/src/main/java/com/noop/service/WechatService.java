package com.noop.service;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import cn.hutool.log.Log;
import com.noop.config.WechatConfig;
import com.noop.util.ElementUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;

/**
 * 微信基础对接服务
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/15 13:28
 */
@Slf4j
@Service
public class WechatService {

    @Autowired
    private WechatConfig wechatConfig;

    /**
     * 验证微信服务器消息
     * @param signature 微信加密签名
     * @param timestamp 时间戳
     * @param nonce 随机数
     * @return  验证结果
     */
    public boolean checkSignature(String signature, String timestamp, String nonce) {
        return this.checkToken(signature, timestamp, nonce, wechatConfig.getToken());
    }

    private boolean checkToken(String signature, String timestamp, String nonce, String token) {
        if (StrUtil.hasBlank(signature, timestamp, nonce, token)) {
            throw new IllegalArgumentException("微信公众号非法请求参数，请核实");
        }
        // 1. 将token、timestamp、nonce三个参数进行字典序排序
        String[] strArr = new String[]{timestamp, nonce, token};
        Arrays.sort(strArr);
        // 2. 将三个参数字符串拼接成一个字符串进行sha1加密
        StringBuilder builder = new StringBuilder();
        for (String s : strArr) {
            builder.append(s);
        }
        // 3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
        return signature.equals(SecureUtil.sha1(builder.toString()));
    }

    public void handleCallBack(String msg) {
        ElementUtil element = null;
        try {
            element = new ElementUtil(msg);
            String msgType = element.get("MsgType");
            switch (msgType){
                case "text":
                    //处理消息回调
                    //TODO
//                    this.handleWxTextCallBack(element);
                    break;
                case "event":
                    //处理事件回调
                    this.handleWxEventCallBack(element);
                    break;
                default:
                    break;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    private void handleWxEventCallBack(ElementUtil element) {
        String event = element.get("Event");
        switch (event){
            case "PUBLISHJOBFINISH":
                //处理订阅事件
                this.handlePublishEvent(element);
                break;
            default:
                break;
        }
    }

    private void handlePublishEvent(ElementUtil element) {
        String eventInfo = element.get("PublishEventInfo");
        log.info(eventInfo);
        //TODO

    }

}
