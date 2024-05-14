package com.noop.service;

import com.noop.model.dto.KnowledgeDTO;
import com.noop.model.vo.KnowledgeVO;

import java.util.List;

/**
 * 知识库服务接口类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:40
 */
public interface KnowledgeService {

    /**
     * 根据用户ID获取用户知识库列表
     * @param userId    用户ID
     * @return  知识库列表
     */
    List<KnowledgeVO> getKnowledgeListByUserId(String userId);

    /**
     * 更新知识库
     * @param userId    用户ID
     * @param knowledgeDTO  知识库数据传输对象
     * @return
     */
    boolean updateKnowledge(String userId, KnowledgeDTO knowledgeDTO);

    boolean deleteKnowledge(String knowledgeId);

}