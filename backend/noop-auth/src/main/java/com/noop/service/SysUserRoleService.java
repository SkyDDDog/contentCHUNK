package com.noop.service;

import com.noop.model.entity.SysUserRole;

import java.util.List;

/**
 * 用户角色服务接口类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/6
 */
public interface SysUserRoleService {

    /**
     * 根据用户ID获取用户角色列表
     * @param userId    用户ID
     * @return  用户角色对象列表
     */
    List<SysUserRole> findByUserId(String userId);

}
