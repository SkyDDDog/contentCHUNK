package com.noop.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.noop.exception.BusinessException;
import com.noop.mapper.KnowledgeMapper;
import com.noop.model.dto.KnowledgeDTO;
import com.noop.model.entity.Knowledge;
import com.noop.model.vo.KnowledgeVO;
import com.noop.service.KnowledgeService;
import com.noop.util.BeanCustomUtil;
import com.noop.util.orm.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 知识库服务实现类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:45
 */
@Service
public class KnowledgeServiceImpl extends CrudService<KnowledgeMapper, Knowledge> implements KnowledgeService {

    @Autowired
    private UserKnowledgeServiceImpl userKnowledgeService;
    @Override
    public List<KnowledgeVO> getKnowledgeListByUserId(String userId) {
        List<KnowledgeVO> result = dfsKnowledge(userId);
        return result;
    }

    @Transactional(rollbackFor = BusinessException.class)
    @Override
    public boolean updateKnowledge(String parentId, KnowledgeDTO dto) {
        Knowledge knowledge = this.get(dto.getId());
        if (knowledge == null) {
            knowledge = new Knowledge();
            knowledge.setNewRecord(true);
        } else {
            knowledge.setNewRecord(false);
        }
        knowledge.setType(dto.getType());
        knowledge.setTitle(dto.getTitle());
        knowledge.setParentId(parentId);
        this.save(knowledge);
        List<KnowledgeDTO> children = dto.getChildren();
        for (KnowledgeDTO child : children) {
            updateKnowledge(knowledge.getId(), child);
        }
        return true;
    }

    @Override
    public boolean deleteKnowledge(String knowledgeId) {
        Knowledge knowledge = this.get(knowledgeId);
        this.delete(knowledge);
        QueryWrapper<Knowledge> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(Knowledge::getParentId, knowledgeId);
        List<Knowledge> list = this.findList(wrapper);
        for (Knowledge k : list) {
            this.deleteKnowledge(k.getId());
        }
        return true;
    }

    /**
     * 递归查询知识库
     * @param parentId  父ID
     * @return
     */
    private List<KnowledgeVO> dfsKnowledge(String parentId) {
        QueryWrapper<Knowledge> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(Knowledge::getParentId, parentId);
        List<Knowledge> list = this.findList(wrapper);
        List<KnowledgeVO> result = new ArrayList<>(list.size());
        if (CollectionUtils.isEmpty(list)) {
            return result;
        }
        for (Knowledge k : list) {
            KnowledgeVO vo = new KnowledgeVO();
            BeanCustomUtil.copyProperties(k, vo);
            vo.setChildren(dfsKnowledge(k.getId()));
            result.add(vo);
        }
        return result;
    }

}
