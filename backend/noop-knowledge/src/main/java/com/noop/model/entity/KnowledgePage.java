package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * 知识库-page表
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:17
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("knowledge_page")
@ToString(callSuper = true)
public class KnowledgePage extends DataEntity<KnowledgePage> {
    @Serial
    private static final long serialVersionUID = 8352587734855825318L;

    private String knowledgeId;

    private String pageId;

}
