package com.noop.service.impl;

import com.noop.mapper.KnowledgePageMapper;
import com.noop.model.entity.KnowledgePage;
import com.noop.service.KnowledgePageService;
import com.noop.util.orm.CrudService;
import org.springframework.stereotype.Service;

/**
 * 知识库页面服务实现类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:42
 */
@Service
public class KnowledgePageServiceImpl extends CrudService<KnowledgePageMapper, KnowledgePage> implements KnowledgePageService {

}
