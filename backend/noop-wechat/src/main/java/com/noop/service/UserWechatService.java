package com.noop.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.noop.mapper.UserWechatMapper;
import com.noop.model.entity.UserWechat;
import com.noop.util.orm.CrudService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 用户-微信关联服务
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/22 13:03
 */
@Service
public class UserWechatService extends CrudService<UserWechatMapper, UserWechat> {

    public int insert(String userId, String appId, String refreshToken) {
        UserWechat userWechat = new UserWechat();
        userWechat.setId(userId);
        userWechat.setAppId(appId);
        userWechat.setAuthorizerRefreshToken(refreshToken);
        userWechat.setNewRecord(true);
        return this.save(userWechat);
    }

    public UserWechat getByAppId(String appId) {
        QueryWrapper<UserWechat> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(UserWechat::getAppId, appId);
        List<UserWechat> list = this.findList(wrapper);
        return list.isEmpty() ? null : list.get(0);
    }

}
