package com.noop.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.noop.model.entity.Knowledge;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:26
 */
@Mapper
public interface KnowledgeMapper extends BaseMapper<Knowledge> {
}
