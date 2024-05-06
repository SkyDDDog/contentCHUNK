package com.noop.service;

/**
 * 角色服务接口类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/6
 */
public interface SysRoleService {

    /**
     * 根据用户ID获取用户角色
     * @param userId    用户ID
     * @return  角色名
     */
    String getRoleByUserId(String userId);
}
