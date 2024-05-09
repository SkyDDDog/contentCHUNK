package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * 知识库表
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:10
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("knowledge")
@ToString(callSuper = true)
public class Knowledge extends DataEntity<Knowledge> {
    @Serial
    private static final long serialVersionUID = -2888536681344995071L;

    private String title;
}
