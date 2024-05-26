package com.noop.controller;

import com.noop.common.CommonResult;
import com.noop.service.OpenService;
import com.noop.service.WechatService;
import com.noop.util.AccessTokenUtil;
import com.noop.util.ElementUtil;
import com.noop.util.aes.AesException;
import com.noop.util.aes.WXBizMsgCrypt;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

/**
 * 微信开放平台对接控制器
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/21 16:23
 */
@Tag(name = "OpenController", description = "微信开放平台对接控制器")
@Slf4j
@CrossOrigin("*")
@RestController()
@RequestMapping(value = "/open")
@SecurityRequirement(name = "Bearer Authentication")
public class OpenController {


    @Autowired
    private WechatService wechatService;
    @Autowired
    private OpenService openService;
    @Autowired
    private AccessTokenUtil tokenUtil;
    @Autowired
    private WXBizMsgCrypt wxBizMsgCrypt;

    @Operation(summary = "微信开放平台服务器消息回调接口")
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
                              @RequestParam(required = false) String encrypt_type,
                              @RequestParam(required = false) String msg_signature,
                              @RequestBody(required = false) String msg)  {
        log.info("有请求接入微信服务器，signature：{}，timestamp：{}，nonce：{}，echostr：{}", signature, timestamp, nonce, echostr);
//        log.info("加密类型：{}", encrypt_type);
//        log.info("消息签名：{}", msg_signature);
//        log.info("请求消息：{}", msg);
        try {
            String decryptMsg = wxBizMsgCrypt.decryptMsg(msg_signature, timestamp, nonce, msg);
            ElementUtil element = new ElementUtil(decryptMsg);
            String infoType = element.get("InfoType");
            if ("component_verify_ticket".equals(infoType)) {
                String ticket = element.get("ComponentVerifyTicket");
                log.info("微信开放平台推送的component_verify_ticket：{}", ticket);
                tokenUtil.saveVerifyTicket(ticket);
                if (!tokenUtil.isComponentAccessTokenExist()) {
                    log.info("component_access_token不存在，重新获取");
                    tokenUtil.saveComponentAccessToken();
                }
            }
        } catch (Exception e) {
            return "error";
        }
        return "success";
    }

    @Operation(summary = "获取用户授权地址")
    @Parameters(
            @Parameter(name = "redirectUrl", description = "授权成功后的回调地址(填写格式为https://xxx)" +
                    "管理员授权确认之后会自动跳转进入回调 URI，并在 URL 参数中返回授权码和过期时间(redirect_url?auth_code=xxx&expires_in=600)" +
                    "重定向后调另一个接口来传给我授权码", required = true)
    )
    @RequestMapping(value = "/auth", method = RequestMethod.GET)
    public CommonResult getAuthUrl(@RequestParam String redirectUrl) {
        CommonResult result = new CommonResult().init();
        String authUrl = openService.buildAuthUrl(redirectUrl);
        result.success("authUrl", authUrl);
        return (CommonResult) result.end();
    }

    @Operation(summary = "给后端传递授权码")
    @Parameters({
            @Parameter(name = "userId", description = "用户id", required = true),
            @Parameter(name = "authCode", description = "授权码", required = true),
            @Parameter(name = "expiresIn", description = "过期时间", required = false)
    })
    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public CommonResult auth(@RequestParam String userId, @RequestParam String authCode, @RequestParam(required = false) int expiresIn) {
        CommonResult result = new CommonResult().init();
        boolean b = openService.saveAuthorizerToken(authCode, userId);
        if (!b) {
            log.info("授权数据保存失败");
        }

        result.success();
        return (CommonResult) result.end();
    }

}
