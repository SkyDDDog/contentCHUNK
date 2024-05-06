package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;


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

    private String name;

    private String url;


}
