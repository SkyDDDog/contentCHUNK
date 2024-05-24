package com.noop.service;

import cn.hutool.json.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.nacos.shaded.com.google.gson.JsonObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.noop.mapper.UserArticleMapper;
import com.noop.model.entity.UserArticle;
import com.noop.model.vo.WechatUserSummaryVO;
import com.noop.util.HttpRequestUtil;
import com.noop.util.orm.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * 用户-文章关联服务
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/24 10:37
 */
@Service
public class UserArticleService extends CrudService<UserArticleMapper, UserArticle> {


    public int insertWechatArticle(String userId, String title) {
        UserArticle userArticle = new UserArticle();
        userArticle.setUserId(userId);
        userArticle.setTitle(title);
        userArticle.setPlatform(UserArticle.PLATFORM_WECHAT);
        userArticle.setNewRecord(true);
        return this.save(userArticle);
    }

    public List<String> getWechatArticleDateByUserId(String userId) {
        QueryWrapper<UserArticle> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(UserArticle::getUserId, userId)
                .eq(UserArticle::getPlatform, UserArticle.PLATFORM_WECHAT);
        List<UserArticle> list = this.findList(wrapper);
        List<String> dateList = new ArrayList<>();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        LocalDate today = LocalDate.now();
        Date todayDate = Date.from(today.atTime(LocalTime.MIDNIGHT).atZone(ZoneId.systemDefault()).toInstant());

        for (UserArticle ua : list) {
            Date date = ua.getCreateDate();
            if (todayDate.before(date)) {
                continue;
            }
            dateList.add(sdf.format(date));
        }
        return dateList;
    }



}
