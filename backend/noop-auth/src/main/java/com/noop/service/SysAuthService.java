package com.noop.service;


import com.noop.model.vo.AuthUrlRoleVO;

import java.util.List;

/**
 * 权限服务接口类
 * @author 天狗
 * @version 1.0
 * @date 2024/1/22 22:38
 */
public interface SysAuthService {

    /**
     * 根据权限ID获取权限对应的角色
     * @param authId 权限ID
     * @return 角色列表
     */
    AuthUrlRoleVO getPermittedRoleByAuth(String authId);

    /**
     * 获取所有权限对应的角色
     * @return  角色列表
     */
    public List<AuthUrlRoleVO> listRolePermission();

    /**
     * 签发一个测试用的长期可用最高权限token
     */
    String issueTestToken();

}
