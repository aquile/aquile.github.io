St.Renderer = {
    userRowHighlight: function (value, meta, record) {
        var userTypeID = record.get('userTypeID');
        meta.css += 'user_type' + userTypeID;
        return value;
    },

    linkedEntity: function (value, meta, record) {
        var store = St.StoreMgr.getStore(this.linkedEntity.storeEntity),
            rec = store.getById(value);
            
        if (rec && Ext.isFunction(this.linkedEntity.valueFn)) {
            return this.linkedEntity.valueFn(rec.data);
        } else {
            return value;
        }
    },
    isActive: function (value, meta, record) {
        if (value) {
            if (record.get('isBlocked')) {
                return 'Заблокирован';
            }
            return 'Активный';
        } else {
            return 'Неактивный';
        }
    }
};