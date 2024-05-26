package com.noop.controller;

import cn.hutool.core.util.HexUtil;
import cn.hutool.crypto.digest.DigestUtil;
import com.noop.service.WechatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

/**
 * 微信基本对接控制器
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/15 13:29
 */
@Tag(name = "WechatController", description = "微信基本对接控制器")
@Slf4j
@CrossOrigin("*")
@RestController()
@RequestMapping(value = "/")
@SecurityRequirement(name = "Bearer Authentication")
public class WechatController {

    @Autowired
    private WechatService wechatService;

    @Operation(summary = "验证微信服务器回调")
    @Parameters({
            @Parameter(name = "signature", description = "微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。", required = true),
            @Parameter(name = "timestamp", description = "时间戳", required = true),
            @Parameter(name = "nonce", description = "随机数", required = true),
            @Parameter(name = "echostr", description = "随机字符串", required = false),
    })
    @RequestMapping("")
    public String checkWechat(@RequestParam String signature,
                              @RequestParam String timestamp,
                              @RequestParam String nonce,
                              @RequestParam(required = false) String echostr,
                              @RequestBody(required = false) String msg) {
        log.info("有请求接入微信服务器，signature：{}，timestamp：{}，nonce：{}，echostr：{}", signature, timestamp, nonce, echostr);

        if (wechatService.checkSignature(signature, timestamp, nonce)) {
            if (StringUtils.hasLength(msg)) {
                log.info("请求消息：{}", msg);
                wechatService.handleCallBack(msg);
            }
            return echostr;
        } else {
            return "error";
        }
    }


}
