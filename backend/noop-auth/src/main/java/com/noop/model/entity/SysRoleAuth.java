package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

/**
 * RBAC角色-权限表
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/6
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("sys_role_auth")
@ToString(callSuper = true)
public class SysRoleAuth extends DataEntity<SysRoleAuth> {
    private String roleId;

    private String authId;

}
