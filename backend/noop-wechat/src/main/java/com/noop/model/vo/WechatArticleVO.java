package com.noop.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * 微信文章VO
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/27 22:42
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class WechatArticleVO {
    private String articleId;
    private String title;
    private String author;
    private String content;
    private String url;
    private String publishId;
}
