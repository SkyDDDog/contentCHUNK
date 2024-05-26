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
 * @date 2024/1/22 16:11
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("sys_user")
@ToString(callSuper = true)
public class SysUser extends DataEntity<SysUser> {

    @Serial
    private static final long serialVersionUID = -4863592397325535302L;

    private String username;

    private String password;



}
