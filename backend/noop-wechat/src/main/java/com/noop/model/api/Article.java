package com.noop.model.api;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * 微信草稿箱文章
 * <a href="https://developers.weixin.qq.com/doc/offiaccount/Draft_Box/Add_draft.html">微信官方文档</a>
 * @author 天狗
 * @version 1.0
 * @since 2024/5/16 17:25
 */
@Data
@Accessors(chain = true)
public class Article {

    /**
     * 文章标题 (必填)
     */
    private String title;

    /**
     * 文章作者
     */
    private String author;

    /**
     * 	图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空。如果本字段为没有填写，则默认抓取正文前54个字。
     */
    private String digest;

    /**
     * 图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS,涉及图片url必须来源 "上传图文消息内的图片获取URL"接口获取。外部图片url将被过滤。
     * (必填)
     */
    private String content;

    /**
     * 图文消息的原文地址，即点击“阅读原文”后的URL
     */
    private String content_source_url;

    /**
     * 图文消息的封面图片素材id（必须是永久MediaID） (必填)
     */
    private String thumb_media_id;

    /**
     * Uint32 是否打开评论，0不打开(默认)，1打开
     */
    private String need_open_comment;

    /**
     * Uint32 是否粉丝才可评论，0所有人可评论(默认)，1粉丝才可评论
     */
    private String only_fans_can_comment;

    /**
     * 封面裁剪为2.35:1规格的坐标字段。以原始图片（thumb_media_id）左上角（0,0），右下角（1,1）建立平面坐标系，经过裁剪后的图片，其左上角所在的坐标即为（X1,Y1）,右下角所在的坐标则为（X2,Y2），用分隔符_拼接为X1_Y1_X2_Y2，每个坐标值的精度为不超过小数点后6位数字。示例见下图，图中(X1,Y1) 等于（0.1945,0）,(X2,Y2)等于（1,0.5236），所以请求参数值为0.1945_0_1_0.5236。
     */
    private String pic_crop_235_1;

    /**
     * 封面裁剪为1:1规格的坐标字段，裁剪原理同pic_crop_235_1，裁剪后的图片必须符合规格要求。
     */
    private String pic_crop_1_1;

}
