package com.noop.util;

import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 基于Hutool的Http请求工具类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/4
 */
public class HttpRequestUtil {

    public static JSONObject get(String url, Map<String, Object> queryParams) throws IOException {
        return get(url, queryParams, new HashMap<>(1));
    }

    public static JSONObject get(String url, Map<String, Object> queryParams, Map<String, String> headers) throws IOException {
        String body = HttpRequest.get(url).form(queryParams).addHeaders(headers).execute().body();
        return JSONObject.parseObject(body);
    }

    public static JSONObject post(String url, String json, Map<String, String> headers) {
        String body = HttpRequest.post(url).body(json).addHeaders(headers).execute().body();
        return JSONObject.parseObject(body);
    }


}
