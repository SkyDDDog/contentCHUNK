package com.noop.service.impl;

import com.noop.mapper.SysAuthMapper;
import com.noop.model.entity.SysAuth;
import com.noop.model.entity.SysRole;
import com.noop.model.entity.SysRoleAuth;
import com.noop.model.vo.AuthUrlRoleVO;
import com.noop.service.SysAuthService;
import com.noop.util.JwtTokenUtil;
import com.noop.util.orm.CrudService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 权限服务实现类
 * @author 天狗
 * @version 1.0
 * @date 2024/1/22 22:38
 */
@Service
public class SysAuthServiceImpl extends CrudService<SysAuthMapper, SysAuth> implements SysAuthService {

    @Resource
    private SysRoleAuthServiceImpl sysRoleAuthService;
    @Resource
    private SysRoleServiceImpl sysRoleService;
    @Resource
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public AuthUrlRoleVO getPermittedRoleByAuth(String authId) {
        List<SysRoleAuth> roleAuthList = sysRoleAuthService.findByAuthId(authId);
        AuthUrlRoleVO result = new AuthUrlRoleVO();
        SysAuth auth = this.get(authId);
        List<String> roleList = new ArrayList<>(roleAuthList.size());
        for (SysRoleAuth roleAuth : roleAuthList) {
            SysRole role = sysRoleService.get(roleAuth.getRoleId());
            roleList.add(role.getName());
        }
        result.setAuth(auth.getName())
                .setUrl(auth.getUrl())
                .setRole(roleList);
        return result;
    }

    @Override
    public List<AuthUrlRoleVO> listRolePermission() {
        List<SysAuth> authList = this.findAll();
        List<AuthUrlRoleVO> result = new ArrayList<>(authList.size());
        for (SysAuth auth : authList) {
            AuthUrlRoleVO permittedRoleByAuth = this.getPermittedRoleByAuth(auth.getId());
            result.add(permittedRoleByAuth);
        }
        return result;
    }

    @Override
    public String issueTestToken() {
        return jwtTokenUtil.generateTestToken();
    }
}
