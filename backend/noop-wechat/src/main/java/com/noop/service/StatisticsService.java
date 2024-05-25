package com.noop.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.noop.model.entity.UserArticle;
import com.noop.model.vo.WechatArticleDataVO;
import com.noop.model.vo.WechatUserSummaryVO;
import com.noop.util.HttpRequestUtil;
import com.noop.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

import static org.bouncycastle.asn1.pkcs.PKCSObjectIdentifiers.data;

/**
 * 微信统计数据服务
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/24 11:06
 */
@Slf4j
@Service
public class StatisticsService {
    @Autowired
    private OpenService openService;
    @Autowired
    private UserArticleService userArticleService;
    @Autowired
    private RedisUtil redisUtil;

    private final String ARTICLE_TOTAL_KEY = "wechat:article-total";
    private final String USER_SUMMARY_KEY = "wechat:user-summary";



    private JSONObject requestArticleTotal(String sendDate, String accessToken) {
        String url = "https://api.weixin.qq.com/datacube/getarticletotal?access_token=" + accessToken;
        JSONObject postData = new JSONObject();
//        LocalDate nowDate = LocalDate.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        String date = nowDate.format(formatter);
        postData.put("begin_date", sendDate);
        postData.put("end_date", sendDate);
        return HttpRequestUtil.post(url, postData.toJSONString(), new HashMap<>(1));
    }

    public List<WechatArticleDataVO> getArticleTotalData(String userId) {
        List<WechatArticleDataVO> data = (List<WechatArticleDataVO>) redisUtil.hget(ARTICLE_TOTAL_KEY, userId);
        if (data == null || data.isEmpty()) {
            data = this.requestArticleTotalData(userId);
            redisUtil.hset(ARTICLE_TOTAL_KEY, userId, data, 60*60*24);
        }
        return data;
    }

    public List<WechatArticleDataVO> requestArticleTotalData(String userId) {
        String accessToken = openService.getAuthorizerAccessToken(userId);
        List<String> dateList = userArticleService.getWechatArticleDateByUserId(userId);
        List<WechatArticleDataVO> result = new ArrayList<>();
        for (String date : dateList) {
            JSONObject json = this.requestArticleTotal(date, accessToken);
            log.info("获取文章总数据结果：{}", json.toJSONString());
            try {
                JSONArray list = json.getJSONArray("list");
                for (Object o : list) {
                    WechatArticleDataVO vo = new WechatArticleDataVO();
                    JSONObject item = (JSONObject) o;
                    String publishDate = item.getString("ref_date");
                    String title = item.getString("title");
                    JSONArray details = item.getJSONArray("details");
                    JSONObject detail = details.getJSONObject(0);
                    String refDate = detail.getString("stat_date");
                    Integer collect = detail.getInteger("add_to_fav_count");
                    Integer read = detail.getInteger("int_page_from_session_read_count");
                    Integer share = detail.getInteger("share_count");
                    vo.setRefDate(refDate)
                            .setPublishDate(publishDate)
                            .setTitle(title)
//                        .setAccount("微信公众号")
                            .setPlatform("微信公众号")
                            .setCollect(collect)
                            .setRead(read)
                            .setShare(share);
                    result.add(vo);
                }
            } catch (Exception e) {
                continue;
            }

        }
        return result;
    }

    public WechatUserSummaryVO getUserSummary(String userId) {
        WechatUserSummaryVO data = (WechatUserSummaryVO) redisUtil.hget(USER_SUMMARY_KEY, userId);
        if (data == null) {
            data = this.requestUserSummary(userId);
            redisUtil.hset(USER_SUMMARY_KEY, userId, data, 60*60*24);
        }
        return data;
    }

    public WechatUserSummaryVO requestUserSummary(String userId) {
        String accessToken = openService.getAuthorizerAccessToken(userId);
        String url = "https://api.weixin.qq.com/datacube/getusersummary?access_token=" + accessToken;
        // 获取上周日期
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTimeInMillis(System.currentTimeMillis());
        c2.setTimeInMillis(System.currentTimeMillis());
        int dayOfWeek = c1.get(Calendar.DAY_OF_WEEK) - 1;
        if (dayOfWeek == 0) {
            dayOfWeek = 7;
        }
        int offset1 = 1- dayOfWeek;
        int offset2 = 7 - dayOfWeek;
        c1.add(Calendar.DATE, offset1 - 7);
        c2.add(Calendar.DATE, offset2 - 7);
        String beginDate = sdf.format(c1.getTime());
        String endDate = sdf.format(c2.getTime());
        // 封装post数据
        JSONObject postData = new JSONObject();
        postData.put("begin_date", beginDate);
        postData.put("end_date", endDate);
        JSONObject resp = HttpRequestUtil.post(url, postData.toJSONString(), new HashMap<>(1));
        log.info("获取上周用户变化量结果：{}", resp.toJSONString());
        WechatUserSummaryVO vo = new WechatUserSummaryVO();
        JSONArray list = resp.getJSONArray("list");
        if (list.isEmpty()) {
            return vo;
        }
        JSONObject data = list.getJSONObject(0);
        vo.setRefDate(data.getString("ref_date"))
                .setNewUser(data.getInteger("new_user"))
                .setCancelUser(data.getInteger("cancel_user"));
        return vo;
    }
}
