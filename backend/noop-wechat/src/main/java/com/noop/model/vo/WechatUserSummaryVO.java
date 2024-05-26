package com.noop.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * 微信用户增减数据VO
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/24 13:43
 */
@Accessors(chain = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WechatUserSummaryVO {

    /**
     * 数据统计日期
     */
    private String refDate;
    /**
     * 新增用户
     */
    private Integer newUser;
    /**
     * 取消关注用户
     */
    private Integer cancelUser;

}
