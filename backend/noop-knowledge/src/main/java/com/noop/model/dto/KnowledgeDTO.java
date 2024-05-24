package com.noop.model.dto;

import com.noop.config.ValidGroup;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * 知识库数据传输对象
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 21:58
 */
@Data
@Accessors(chain = true)
public class KnowledgeDTO {

    private String id;

    private String type;

    private List<KnowledgeDTO> children;

    @Schema(description = "知识库标题", example = "this is a title")
    @NotBlank(message = "知识库标题不能为空")
    private String title;

    /**
     * 是否有子节点
     * @return  是否有子节点
     */
    private boolean hasChildren() {
        return children != null && !children.isEmpty();
    }
}
