package com.noop.model.dto;

import com.noop.config.ValidGroup;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * Page数据传输对象
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 23:19
 */
@Data
@Accessors(chain = true)
public class PageDTO {

//    @Schema(description = "知识库ID")
//    @NotBlank(message = "知识库ID不能为空", groups = {ValidGroup.Create.class})
//    private String knowledgeId;

    @Schema(description = "页面ID")
    @NotBlank(message = "页面ID不能为空", groups = {ValidGroup.Update.class})
    private String pageId;

    @Schema(description = "页面内容")
    @NotBlank(message = "页面内容不能为空")
    private String content;

}
