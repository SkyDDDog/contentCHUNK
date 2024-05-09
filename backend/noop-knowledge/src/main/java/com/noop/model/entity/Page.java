package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * page表
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:23
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("page")
@ToString(callSuper = true)
public class Page extends DataEntity<Page> {
    @Serial
    private static final long serialVersionUID = -8211633498550990720L;

    private String content;
}
