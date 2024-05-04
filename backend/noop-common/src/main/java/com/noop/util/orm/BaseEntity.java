package com.noop.util.orm;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import lombok.Data;
import lombok.experimental.Accessors;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;


/**
 * 数据库orm映射对象基类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/4
 */
@Data
@Accessors(chain = true)
public abstract class BaseEntity<T> {

    public static final String DEL_FLAG_NORMAL = "0";
    public static final String DEL_FLAG_DELETE = "1";

    /**
     * 数据库主键
     */
    protected String id;

    /**
     * 是否为新纪录(涉及逻辑删除)
     */
    @TableField(exist = false)
    protected boolean isNewRecord = false;

    public BaseEntity() {
    }

    public BaseEntity(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public abstract void preInsert();

    public abstract void preUpdate();

    public boolean isNewRecord() {
        return this.isNewRecord || StringUtils.isBlank(this.getId());
    }

    public void setNewRecord(boolean newRecord) {
        this.isNewRecord = newRecord;
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this);
    }

}
