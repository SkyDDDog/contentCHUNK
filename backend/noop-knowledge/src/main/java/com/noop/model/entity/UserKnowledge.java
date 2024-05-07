package com.noop.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.noop.util.orm.DataEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serial;

/**
 * 用户-知识库表
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 18:46
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName("user_knowledge")
@ToString(callSuper = true)
public class UserKnowledge extends DataEntity<UserKnowledge> {

    @Serial
    private static final long serialVersionUID = -1993747810784096600L;

   private String userId;

   private String knowledgeId;
}
