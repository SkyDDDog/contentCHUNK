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

    public static final String FILE = "1";
    public static final String FOLDER = "0";

    @Serial
    private static final long serialVersionUID = -2888536681344995071L;

    /**
     * 文件夹的父id (根目录则取用户id)
     */
    private String parentId;

    /**
     * 类型 0-文件夹 1-文件
     */
    private String type;

    private String title;
}
