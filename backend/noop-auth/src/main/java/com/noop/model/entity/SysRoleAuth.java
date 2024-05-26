package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * RBAC角色-权限表
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/22 22:25
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("sys_role_auth")
@ToString(callSuper = true)
public class SysRoleAuth extends DataEntity<SysRoleAuth> {
    @Serial
    private static final long serialVersionUID = 442849214989654042L;

    private String roleId;

    private String authId;

}
