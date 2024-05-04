package com.noop.constant;

import lombok.Data;

/**
 * 权限常量
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/4
 */
@Data
public class AuthConstants {

    public static final String ROLE_PREFIX = "ROLE_";

    // 默认角色
    public static final String DEFAULT_ROLE = "ROLE_USER";
    public static final String DEFAULT_ROLE_ID = "1";

    // 超级管理员角色(最高权限)
    public static final String ROOT_ROLE = "ROLE_ROOT";

    public static final String AUTH_CACHE_KEY = "auth_url";


}
