package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * 用户-文章关联实体数据库映射类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/24 10:31
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("user_article")
@ToString(callSuper = true)
public class UserArticle extends DataEntity<UserArticle> {
    @Serial
    private static final long serialVersionUID = -7833659857735737395L;

    private String userId;

    private String title;;

    private String platform;

    public final static String PLATFORM_WECHAT = "微信";

}
