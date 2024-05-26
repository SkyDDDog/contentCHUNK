package com.noop.util.orm;

import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.Accessors;

import java.io.Serial;
import java.util.Date;

/**
 * 数据库orm映射对象扩展基类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/20 22:16
 */
@Getter
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
public abstract class DataEntity<T> extends BaseEntity<T> {

    @Serial
    private static final long serialVersionUID = -3203149607445361388L;

    /**
     * 备注信息
     */
    protected String remarks;
    /**
     * 创建日期
     */
    protected Date createDate;
    /**
     * 更新日期
     */
    protected Date updateDate;

    /**
     * 删除标记(用于逻辑删除)
     */
    protected String delFlag;


    public DataEntity() {
        this.delFlag = "0";
    }

    public DataEntity(String id) {
        super(id);
    }

    @Override
    public void preInsert() {
        if (!this.isNewRecord) {
            this.setId(IdWorker.getId(this)+"");
        }
        this.updateDate = new Date();
        this.createDate = this.updateDate;
    }

    @Override
    public void preUpdate() {
        this.updateDate = new Date();
    }


    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }


    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }


    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

}
