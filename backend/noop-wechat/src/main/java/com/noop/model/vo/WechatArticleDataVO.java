package com.noop.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * 微信文章数据VO
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/24 12:49
 */
@Accessors(chain = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WechatArticleDataVO {

    /**
     * 数据统计日期
     */
    private String refDate;

    /**
     * 发布时间
     */
    private String publishDate;

    /**
     * 文章标题
     */
    private String title;

//    /**
//     * 发布账号
//     */
//    private String account;

    /**
     * 发布平台
     */
    private String platform;

//    /**
//     * 点赞
//     */
//    private Integer like;

    /**
     * 收藏
     */
    private Integer collect;

//    /**
//     * 评论
//     */
//    private Integer comment;

    /**
     * 阅读量
     */
    private Integer read;

    private Integer share;
}
