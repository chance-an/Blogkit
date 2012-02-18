/**
 * User: anch
 * Date: 12/6/11
 * Time: 2:17 AM
 */
Ext.define('BKAdmin.controller.User', {
    extend: 'Ext.app.Controller',
    model: null,

    constructor: function(){
        this.callParent(arguments);

        this.model = Ext.create('BKAdmin.model.User')
    },


    login: function(record){
        console.log('User::login');
        var request = new $.Deferred();

        this.model.set('password', record['password']);
        this.model.set('username', record['username']);

        request.resolve();
        return request;
    }
});