package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * RBAC角色表
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/22 22:24
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("sys_role")
@ToString(callSuper = true)
public class SysRole extends DataEntity<SysRole> {
    @Serial
    private static final long serialVersionUID = 700061867932298935L;

    private String name;

}
