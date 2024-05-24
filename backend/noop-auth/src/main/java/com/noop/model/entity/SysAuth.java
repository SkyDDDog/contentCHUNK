package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * RBAC权限表
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/22 22:22
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("sys_auth")
@ToString(callSuper = true)
public class SysAuth extends DataEntity<SysAuth> {

    @Serial
    private static final long serialVersionUID = -5686446189026162162L;

    private String name;

    private String url;


}
