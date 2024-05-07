package com.noop.model.dto;

import com.noop.config.ValidGroup;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.experimental.Accessors;

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

    @Schema(description = "用户ID", example = "1749837707132424193")
    @NotBlank(message = "用户ID不能为空", groups = {ValidGroup.Create.class})
    private String userId;

    @Schema(description = "知识库ID")
    @NotBlank(message = "知识库ID不能为空", groups = {ValidGroup.Update.class})
    private String knowledgeId;

    @Schema(description = "知识库标题", example = "this is a title")
    @NotBlank(message = "知识库标题不能为空")
    private String title;
}
