package com.noop.model.vo;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * 权限认证url-角色封装对象
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/24 20:03
 */
@Data
@Accessors(chain = true)
public class AuthUrlRoleVO {

    private String auth;
    private String url;
    private List<String> role;

}
