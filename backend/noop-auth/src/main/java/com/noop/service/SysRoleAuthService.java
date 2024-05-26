package com.noop.service;

import com.noop.model.entity.SysRoleAuth;

import java.util.List;

/**
 * 角色权限服务接口类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/25 14:11
 */
public interface SysRoleAuthService {

    /**
     * 根据角色ID获取角色权限列表
     * @param roleId 角色ID
     * @return 角色权限对象列表
     */
    List<SysRoleAuth> findByRoleId(String roleId);

    /**
     * 根据权限ID获取角色权限列表
     * @param authId    权限ID
     * @return  角色权限对象列表
     */
    List<SysRoleAuth> findByAuthId(String authId);

}
