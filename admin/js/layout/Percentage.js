/**
 * User: anch
 * Date: 11/9/11
 * Time: 10:36 PM
 */

Ext.define('BKAdmin.layout.Percentage', {
    extend: 'Ext.layout.container.Fit',
    alias: 'layout.percentage',
// private
    setItemSize : function(item, width, height) {
        this.owner.addCls('layout-center');
        item.addCls('layout-center-item');
        if (item && height > 0) {
            if (width) {
                width = item.width;
                if (Ext.isNumber(item.widthRatio)) {
                    width = Math.round(this.owner.el.getWidth() * item.widthRatio);
                }
            }
            item.setSize(width, height);
        }
    }
});

