package com.noop.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.*;
import org.springframework.util.StringUtils;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport {

    /**
     * 重写缓存Key生成策略。
     * 包名+方法名+参数列表。防止缓存Key冲突
     */
    @Bean
    @Override
    public KeyGenerator keyGenerator() {
        return (target, method, params) -> {
            // 存放最终结果
            StringBuilder resultStringBuilder = new StringBuilder("cache:key:");
            // 执行方法所在的类
            resultStringBuilder.append(target.getClass().getName()).append(".");
            // 执行的方法名称
            resultStringBuilder.append(method.getName()).append("(");

            // 存放参数
            StringBuilder paramStringBuilder = new StringBuilder();
            for (Object param : params) {
                if (param == null) {
                    paramStringBuilder.append("java.lang.Object[null],");
                } else {
                    paramStringBuilder
                            .append(param.getClass().getName())
                            .append("[")
                            .append(String.valueOf(param))
                            .append("],");
                }
            }
            if (StringUtils.hasText(paramStringBuilder.toString())) {
                // 去掉最后的逗号
                String trimLastComma = paramStringBuilder.substring(0, paramStringBuilder.length() - 1);
                resultStringBuilder.append(trimLastComma);
            }

            return resultStringBuilder.append(")").toString();
        };
    }

//    @Bean
//    public CacheManager cacheManager(RedisConnectionFactory factory) {
//        Map<String, RedisCacheConfiguration> configurationMap = new HashMap<>();
//
//        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
//                .entryTtl(Duration.ofMinutes(5))
//                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(keySerializer()))
//                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(valueSerializer()))
//                .disableCachingNullValues();
//
//        return RedisCacheManager.builder(factory)
//                .initialCacheNames(configurationMap.keySet())
//                .withInitialCacheConfigurations(configurationMap)
//                .cacheDefaults(config)
//                .build();
//    }

    /**
     * @desc 设置RedisTemplate规则
     * @param redisConnectionFactory
     * @return
     */
    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);

        //解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        // 指定要序列化的域，field,get和set,以及修饰符范围，ANY是都有包括private和public
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 指定序列化输入的类型，类必须是非final修饰的，final修饰的类，比如String,Integer等会跑出异常
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);

        //序列号key value
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);

        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    /**
     * @desc 设置CacheManager缓存规则
     * @param factory
     * @return
     */
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);

        //解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);

        // 配置序列化（解决乱码的问题）,过期时间600秒
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(600))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer))
                .disableCachingNullValues();

        RedisCacheManager cacheManager = RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
        return cacheManager;
    }


//    @Bean
//    public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory factory) {
//        RedisTemplate<Object, Object> template = new RedisTemplate<>();
//        template.setConnectionFactory(factory);
//
//        template.setKeySerializer(keySerializer());
//        template.setValueSerializer(valueSerializer());
//
//        template.setHashKeySerializer(keySerializer());
//        template.setHashValueSerializer(valueSerializer());
//
//        template.afterPropertiesSet();
//        return template;
//    }
//
//    private RedisSerializer<String> keySerializer() {
//        return new StringRedisSerializer();
//    }
//
//    private RedisSerializer<Object> valueSerializer() {
//        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer =
//                new Jackson2JsonRedisSerializer<>(Object.class);
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
//
//        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);
//
//        return jackson2JsonRedisSerializer;
//    }
}