package com.noop.model.vo;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * 知识库视图对象
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 21:26
 */
@Data
@Accessors(chain = true)
public class KnowledgeVO {

    private String id;
    private String type;
    private String title;
    private List<KnowledgeVO> children;

}
