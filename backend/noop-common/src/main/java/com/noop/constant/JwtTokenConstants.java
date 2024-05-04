package com.noop.constant;

/**
 * 有关JwtToken的相关常量
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/23 22:33
 */
public class JwtTokenConstants {

    public static final String JWT_CACHE_KEY = "jwt:userId:";
    public static final String USER_ID = "userId";
    public static final String USER_NAME = "username";
    public static final String ROLES = "roles";
    public static final String ACCESS_TOKEN = "access_token";
    public static final String REFRESH_TOKEN = "refresh_token";
    public static final String EXPIRE_IN = "expire_in";


    public static String buildJwtCacheKey(String userId) {
        return JWT_CACHE_KEY + userId;
    }

}
