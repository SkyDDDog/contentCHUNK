package com.noop.service;

import com.noop.constant.AuthConstants;
import com.noop.model.vo.AuthUrlRoleVO;
import com.noop.service.impl.SysAuthServiceImpl;
import com.noop.util.RedisUtil;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 在项目启动时读取数据库中role-permission表的数据，加载到redis中
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/6
 */
@Service
public class LoadRolePermissionService {

    @Resource
    private RedisUtil redisUtil;
    @Resource
    private SysAuthServiceImpl sysAuthService;



    @PostConstruct
    public void init() {
        // 获取所有权限
        List<AuthUrlRoleVO> list = sysAuthService.listRolePermission();
        for (AuthUrlRoleVO vo : list) {
            redisUtil.hset(AuthConstants.AUTH_CACHE_KEY, vo.getUrl(), vo.getRole());
        }
    }


}
