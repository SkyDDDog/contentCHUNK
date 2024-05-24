package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * RBAC用户-角色表
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/22 22:27
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("sys_user_role")
@ToString(callSuper = true)
public class SysUserRole extends DataEntity<SysUserRole> {
    @Serial
    private static final long serialVersionUID = 2391594394389608630L;

    private String userId;

    private String roleId;
}
