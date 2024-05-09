package com.noop.model.vo;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * page视图对象
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 23:23
 */
@Data
@Accessors(chain = true)
public class PageVO {

    private String pageId;

    private String content;

}
