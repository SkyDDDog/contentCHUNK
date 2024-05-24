package com.noop.service;

import cn.hutool.crypto.OpensslKeyUtil;
import cn.hutool.http.HttpUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.noop.model.api.Article;
import com.noop.util.AccessTokenUtil;
import com.noop.util.FileTransUtil;
import com.noop.util.HttpRequestUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 发布公众号文章服务
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/16 21:40
 */
@Slf4j
@Service
public class PublishService {

//    @Autowired
//    private AccessTokenUtil tokenUtil;
    @Autowired
    private OpenService openService;
    @Autowired
    private UserArticleService userArticleService;

    private JSONObject addDraft(Article article, String userId) {
        String accessToken = openService.getAuthorizerAccessToken(userId);
//        String accessToken = tokenUtil.getAccessToken();
        String url = "https://api.weixin.qq.com/cgi-bin/draft/add?access_token=" + accessToken;
        List<Article> articles = new ArrayList<>();
        articles.add(article);
        JSONObject postData = new JSONObject();
        postData.put("articles", articles);
        log.info("请求草稿箱参数：{}", postData.toJSONString());
        JSONObject resp = HttpRequestUtil.post(url, postData.toJSONString(), new HashMap<>(1));

        return resp;
    }

    private JSONObject sendToAll(String mediaId, String userId) {
        String accessToken = openService.getAuthorizerAccessToken(userId);
        String url = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=" + accessToken;
        JSONObject postData = new JSONObject();
        JSONObject filter = new JSONObject();
        filter.put("is_to_all", true);
        postData.put("filter", filter);
        JSONObject mpnews = new JSONObject();
        mpnews.put("media_id", mediaId);
        postData.put("mpnews", mpnews);
        postData.put("msgtype", "mpnews");
        return HttpRequestUtil.post(url, postData.toJSONString(), new HashMap<>(1));
    }

    /**
     * 发布草稿
     * @param mediaId   草稿id
     * @return  发布结果
     */
    private JSONObject publishDraft(String mediaId, String userId) {
        String accessToken = openService.getAuthorizerAccessToken(userId);
//        String accessToken = tokenUtil.getAccessToken();
        String url = "https://api.weixin.qq.com/cgi-bin/freepublish/submit?access_token=" + accessToken;
//        String jsonStr = "{\"media_id\":\"" + mediaId + "\"}";
        JSONObject postData = new JSONObject();
        postData.put("media_id", mediaId);
        JSONObject resp = HttpRequestUtil.post(url, postData.toJSONString(), new HashMap<>(1));

        return resp;
    }

    /**
     * 删除已发布的文章
     * @param articleId 文章id
     * @return  删除结果
     */
    private JSONObject freePublish(String articleId, String userId) {
        String accessToken = openService.getAuthorizerAccessToken(userId);
//        String accessToken = tokenUtil.getAccessToken();
        String url = "https://api.weixin.qq.com/cgi-bin/freepublish/delete?access_token=" + accessToken;
        String jsonStr = "{\"article_id\":\"" + articleId + "\",\"index\":1}";
        JSONObject resp = HttpRequestUtil.post(url, jsonStr, new HashMap<>(1));
        return  resp;
    }

    /**
     * 上传临时图片素材
     * @param imgFile  图片文件
     * @return  上传结果
     */
    private JSONObject uploadImage(File imgFile, String userId) {
        String accessToken = openService.getAuthorizerAccessToken(userId);
        log.info("accessToken: {}", accessToken);
//        String accessToken = tokenUtil.getAccessToken();
        String url = "https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=" + accessToken;
        Map<String, Object> formData = new HashMap<>();
        formData.put("media", imgFile);
        JSONObject resp = HttpRequestUtil.post(url, formData, new HashMap<>(1));
        return resp;
    }

//    private JSONObject getImage(String mediaId, String userId) {
//        String accessToken = openService.getAuthorizerAccessToken(userId);
////        String accessToken = tokenUtil.getAccessToken();
//        String url = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=" + accessToken + "&media_id=" + mediaId;
////        Map<String, Object> params = new HashMap<>();
////        params.put("access_token", accessToken);
////        params.put("media_id", mediaId);
//        JSONObject resp = null;
//        try {
//            HttpUtil.download(url, )
////            resp = HttpRequestUtil.get(url, params);
////            log.info("获取图片结果：{}", resp.toJSONString());
//        } catch (IOException e) {
//            return null;
//        }
//        return resp;
//    }

    /**
     * 发布文章
     * @param article   文章
     * @param userId    用户id
     * @return  publish_id
     */
    public String publish(Article article, String userId) {
        JSONObject json = this.addDraft(article, userId);
        log.info("请求草稿箱结果: {}", json.toJSONString());
        String mediaId = json.getString("media_id");
        JSONObject resp = this.publishDraft(mediaId, userId);
        log.info("请求发布文章结果: {}", resp.toJSONString());
        return resp.getString("publish_id");
    }

    /**
     * 群发文章
     * @param article   文章
     * @param userId    用户id
     * @return  msg_id
     */
    public boolean send(Article article, String userId) {
        JSONObject json = this.addDraft(article, userId);
        log.info("请求草稿箱结果: {}", json.toJSONString());
        String mediaId = json.getString("media_id");
        JSONObject resp = this.sendToAll(mediaId, userId);
        log.info("sendToAll: {}", resp.toJSONString());
        // 数据插入数据库
        userArticleService.insertWechatArticle(userId, article.getTitle());
        return resp.getInteger("errcode") == 0;
    }

    public void freeArticle(String articleId, String userId) {
        String s = this.freePublish(articleId, userId).toJSONString();
        log.info(s);
    }

    public String uploadImg(MultipartFile multipartFile, String userId) {
        File file = FileTransUtil.multipartFileToFile(multipartFile);
        JSONObject jsonObj = this.uploadImage(file, userId);
        log.info("uploadImage: {}", jsonObj.toJSONString());
        return jsonObj.getString("url");
    }

    public String checkPublishId(String publishId, String userId) {
        String accessToken = openService.getAuthorizerAccessToken(userId);
        String url = "https://api.weixin.qq.com/cgi-bin/freepublish/get?access_token=" + accessToken;
        JSONObject postData = new JSONObject();
        postData.put("publish_id", publishId);
        JSONObject resp = HttpRequestUtil.post(url, postData.toJSONString(), new HashMap<>(1));
        log.info("发布状态轮询接口结果：{}", resp.toJSONString());
        JSONObject item = resp.getJSONObject("article_detail").getJSONArray("item").getJSONObject(0);
        return item.getString("article_url");

    }



}
