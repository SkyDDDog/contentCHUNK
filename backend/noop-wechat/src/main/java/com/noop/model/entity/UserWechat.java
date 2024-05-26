package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * 用户-微信关联实体数据库映射类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/22 12:37
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("user_wechat")
@ToString(callSuper = true)
public class UserWechat extends DataEntity<UserWechat> {


    @Serial
    private static final long serialVersionUID = -2777502937201053733L;

    private String appId;

    private String authorizerRefreshToken;

}
