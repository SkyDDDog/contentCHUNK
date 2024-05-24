package com.noop.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.noop.mapper.SysRoleMapper;
import com.noop.model.entity.SysRole;
import com.noop.model.entity.SysUserRole;
import com.noop.service.SysRoleService;
import com.noop.util.orm.CrudService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

/**
 * 角色服务实现类
 * @author 天狗
 * @version 1.0
 * @date 2024/1/22 22:39
 */
@Service
public class SysRoleServiceImpl extends CrudService<SysRoleMapper, SysRole> implements SysRoleService {

    @Resource
    private SysUserRoleServiceImpl sysUserRoleService;

    @Override
    public String getRoleByUserId(String userId) {
        QueryWrapper<SysUserRole> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(SysUserRole::getUserId, userId);
        List<SysUserRole> list = sysUserRoleService.findList(wrapper);
        if (list.isEmpty()) {
            return "";
        }
        SysUserRole userRole = list.get(0);
        SysRole sysRole = this.get(userRole.getRoleId());
        if (Objects.nonNull(sysRole)) {
            return sysRole.getName();
        } else {
            return "";
        }
    }


}
