package com.noop.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.noop.mapper.SysUserRoleMapper;
import com.noop.model.entity.SysUserRole;
import com.noop.service.SysUserRoleService;
import com.noop.util.orm.CrudService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 用户角色服务实现类
 * @author 天狗
 * @version 1.0
 * @date 2024/1/22 22:40
 */
@Service
public class SysUserRoleServiceImpl extends CrudService<SysUserRoleMapper, SysUserRole> implements SysUserRoleService {

    @Override
    public List<SysUserRole> findByUserId(String userId) {
        QueryWrapper<SysUserRole> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(SysUserRole::getUserId, userId);
        return this.findList(wrapper);
    }

}
