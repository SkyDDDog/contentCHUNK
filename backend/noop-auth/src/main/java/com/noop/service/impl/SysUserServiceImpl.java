package com.noop.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.noop.constant.AuthConstants;
import com.noop.exception.BusinessException;
import com.noop.mapper.SysUserMapper;
import com.noop.model.entity.SysUser;
import com.noop.model.entity.SysUserRole;
import com.noop.service.SysUserService;
import com.noop.util.orm.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

/**
 * RBAC用户服务实现类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/22 21:28
 */
@Service
public class SysUserServiceImpl extends CrudService<SysUserMapper, SysUser> implements SysUserService {

    /**
     * 加密算法，在配置类中注入IOC，这里直接使用
     */
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SysAuthServiceImpl sysAuthService;
    @Autowired
    private SysRoleAuthServiceImpl sysRoleAuthService;
    @Autowired
    private SysRoleServiceImpl sysRoleService;
    @Autowired
    private SysUserRoleServiceImpl sysUserRoleService;



    /**
     * 注册
     * @param username  用户名
     * @param rawPassword   原始密码
     * @return  true-注册成功，false-注册失败
     */
    @Transactional(rollbackFor = BusinessException.class)
    @Override
    public boolean register(String username, String rawPassword) {

        SysUser user = new SysUser()
                .setUsername(username)
                .setPassword(passwordEncoder.encode(rawPassword));
        user.setNewRecord(true);
        String userId = IdWorker.getIdStr(user);
        user.setId(userId);
        SysUserRole userRole = new SysUserRole()
                .setRoleId(AuthConstants.DEFAULT_ROLE_ID)
                .setUserId(userId);
        userRole.setNewRecord(true);
        if (0 >= sysUserRoleService.save(userRole)) {
            throw new BusinessException("注册失败:保存用户角色失败");
        }
        if (0 >= this.save(user)) {
            throw new BusinessException("注册失败:保存用户信息失败");
        }
        return true;
    }

    /**
     * 判断用户名是否重复
     * @param username 用户名
     * @return true-重复，false-不重复
     */
    @Override
    public boolean isUsernameDuplicated(String username) {
        return Objects.nonNull(this.getByUsername(username));
    }



    /**
     * 根据用户名查询用户信息
     *
     * @param username 用户名
     * @return 用户信息
     */
    @Override
    public SysUser getByUsername(String username) {
        QueryWrapper<SysUser> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(SysUser::getUsername, username);
        List<SysUser> list = this.findList(wrapper);
        return list.isEmpty() ? null : list.get(0);
    }





}
