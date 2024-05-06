package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * RBAC用户表
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/6
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("sys_user")
@ToString(callSuper = true)
public class SysUser extends DataEntity<SysUser> {

    private String username;

    private String password;



}
