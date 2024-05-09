package com.noop.service.impl;

import com.noop.mapper.UserKnowledgeMapper;
import com.noop.model.entity.UserKnowledge;
import com.noop.service.UserKnowledgeService;
import com.noop.util.orm.CrudService;
import org.springframework.stereotype.Service;

/**
 * 用户知识库服务实现类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:46
 */
@Service
public class UserKnowledgeServiceImpl extends CrudService<UserKnowledgeMapper, UserKnowledge> implements UserKnowledgeService {


}
