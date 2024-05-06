package com.noop.controller;

import com.noop.common.CommonResult;
import com.noop.common.MsgCodeUtil;
import com.noop.constant.AuthConstants;
import com.noop.exception.BusinessException;
import com.noop.model.dto.LoginDTO;
import com.noop.model.dto.RegisterDTO;
import com.noop.model.entity.SysUser;
import com.noop.service.SysRoleService;
import com.noop.service.SysUserService;
import com.noop.util.JwtTokenUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

/**
 * 认证控制器
 * 负责登录、注册、刷新token等
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/6
 */
@Tag(name = "AuthController", description = "认证控制器")
@Slf4j
@CrossOrigin("*")
@RestController()
@RequestMapping(value = "/auth")
public class AuthController {

    @Resource
    private SysUserService sysUserService;
    @Resource
    private SysRoleService sysRoleService;
    @Resource
    private JwtTokenUtil jwtTokenUtil;

    @Operation(summary = "用户注册")
    @PostMapping(value = "/register")
    public CommonResult register(@Validated @RequestBody RegisterDTO dto, BindingResult bindingResult) {
        CommonResult result = new CommonResult().init();
        // 参数验证
        if (bindingResult.hasErrors()) {
            throw new BusinessException(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT, MsgCodeUtil.getIllegalArgumentMessage(bindingResult.getFieldErrors()));
        }
        if (sysUserService.isUsernameDuplicated(dto.getUsername())) {
            return (CommonResult) result.failCustom(MsgCodeUtil.MSG_CODE_SYSTEM_USER_NAME_EXIST, "用户名已存在").end();
        }
        if (sysUserService.register(dto.getUsername(), dto.getPassword())) {
            SysUser user = sysUserService.getByUsername(dto.getUsername());
            Map<String, Object> token = jwtTokenUtil.generateTokenAndRefreshToken(user.getId(), user.getUsername(), AuthConstants.DEFAULT_ROLE);
            result.success("token", token);
            result.putItem("user", user);
            log.info("用户注册成功，用户ID：{}", user.getId());
        }
        return (CommonResult) result.end();
    }

    @Operation(summary = "用户登录")
    @PostMapping(value = "/login")
    public CommonResult login(@Validated @RequestBody LoginDTO dto, BindingResult bindingResult) {
        CommonResult result = new CommonResult().init();
        // 参数验证
        if (bindingResult.hasErrors()) {
            throw new BusinessException(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT, MsgCodeUtil.getIllegalArgumentMessage(bindingResult.getFieldErrors()));
        }
        SysUser user = sysUserService.getByUsername(dto.getUsername());
        if (Objects.nonNull(user)) {
            Map<String, Object> token = jwtTokenUtil.generateTokenAndRefreshToken(user.getId(), user.getUsername(), sysRoleService.getRoleByUserId(user.getId()));
            result.success("token", token);
            result.putItem("user", user);
            log.info("用户登录成功，用户ID：{}", user.getId());
        } else {
            result.failCustom(MsgCodeUtil.MSG_CODE_DATA_NOT_EXIST, "用户不存在");
            log.error("用户登录失败，用户不存在，用户名：{}", dto.getUsername());
        }
        return (CommonResult) result.end();
    }

    @Operation(summary = "刷新token")
    @Parameters({
            @Parameter(name = "refreshToken"
                    , description = "刷新token"
                    , required = true)
    })
    @PostMapping(value = "/token/refresh")
    public CommonResult refreshToken(@RequestParam(required = true) String refreshToken) {
        CommonResult result = new CommonResult().init();
        // 参数校验
        if (!StringUtils.hasLength(refreshToken)) {
            throw new BusinessException(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT, "refreshToken不能为空");
        }
        // 判断token是否过期
        if (jwtTokenUtil.isTokenExpired(refreshToken)) {
            result.failCustom(MsgCodeUtil.MSG_CODE_DATA_NOT_EXIST, "refresh_token已过期");
            return (CommonResult) result.end();
        }
        // 判断token是否非法

        String userId = jwtTokenUtil.getUserIdFromToken(refreshToken);
        String username = jwtTokenUtil.getUserNameFromToken(refreshToken);
        String role = jwtTokenUtil.getUserRoleFromToken(refreshToken);
        if (!StringUtils.hasLength(userId)) {
            result.failCustom(MsgCodeUtil.MSG_CODE_JWT_TOKEN_UNSUPPORTED, "refresh_token非法");
            return (CommonResult) result.end();
        }
        // 这里为了保证 refreshToken 只能用一次，刷新后，会从 redis 中删除。
        // 如果用的不是 redis 中的 refreshToken 进行刷新令牌，则不能刷新。
        // 如果使用 redis 中已过期的 refreshToken 也不能刷新令牌。
        if (jwtTokenUtil.isRefreshTokenNotExistCache(refreshToken)) {
            result.failCustom(MsgCodeUtil.MSG_CODE_JWT_TOKEN_UNSUPPORTED, "该refresh_token已使用过或非法");
            return (CommonResult) result.end();
        }

        Map<String, Object> tokenMap = jwtTokenUtil.refreshTokenAndGenerateToken(userId, username, role);
        result.success("token", tokenMap);
        return (CommonResult) result.end();
    }


}
