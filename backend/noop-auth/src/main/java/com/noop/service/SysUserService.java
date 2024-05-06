package com.noop.service;

import com.noop.model.entity.SysUser;

/**
 * 用户服务接口类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/6
 */
public interface SysUserService {

    /**
     * 注册用户
     * @param username  用户名
     * @param rawPassword   未加密的密码
     * @return  是否注册成功
     */
    boolean register(String username, String rawPassword);

    /**
     * 判断用户名是否重复
     * @param username  用户名
     * @return  true-重复，false-不重复
     */
    boolean isUsernameDuplicated(String username);

    /**
     * 根据用户名获取用户信息
     * @param username  用户名
     * @return  用户对象
     */
    SysUser getByUsername(String username);


}
