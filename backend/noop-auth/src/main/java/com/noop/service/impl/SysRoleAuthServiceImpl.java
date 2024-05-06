package com.noop.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.noop.mapper.SysRoleAuthMapper;
import com.noop.model.entity.SysRoleAuth;
import com.noop.service.SysRoleAuthService;
import com.noop.util.orm.CrudService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 角色权限服务实现类
 * @author 天狗
 * @version 1.0
 * @since 2024/5/6
 */
@Service
public class SysRoleAuthServiceImpl extends CrudService<SysRoleAuthMapper, SysRoleAuth> implements SysRoleAuthService {

    @Override
    public List<SysRoleAuth> findByRoleId(String roleId) {
        QueryWrapper<SysRoleAuth> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(SysRoleAuth::getRoleId, roleId);
        return this.findList(wrapper);
    }

    @Override
    public List<SysRoleAuth> findByAuthId(String authId) {
        QueryWrapper<SysRoleAuth> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(SysRoleAuth::getAuthId, authId);
        return this.findList(wrapper);
    }

}
