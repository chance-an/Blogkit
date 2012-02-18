/**
 * User: anch
 * Date: 11/30/11
 * Time: 2:23 AM
 */
Ext.define('BKAdmin.view.TabPanelLogin', {
    id: 'TabPanelLogin',
    extend: 'Ext.panel.Panel',

    title: 'Login',
    html: 'Welcome please login',

    isolatedItems: {},

    constructor: function(){
        this.callParent(arguments);
    },

    initComponent: function(){
        this.callParent(arguments);
        this.on('added', this.deploy, this);
    },

    deploy: function(){
        var request = Blogkit.util.TemplateManager.requestTemplate('login.main');
        request.done(Ext.bind(this.installTemplate, this));
        request.done(Ext.bind(this.bindEvents, this));
        request.done(Ext.bind(function(){ this.fireEvent('deployed'); }, this));
    },

    installTemplate: function(template){
        this.update(template);

        this.isolatedItems['form'] = Ext.create('Ext.form.Panel', {
            ui: 'plain',
            renderTo: $('#login .row2')[0],
            defaultType: 'textfield',
            items: [
                {
                    fieldLabel: 'USERNAME',
                    name: 'username'
                },
                {
                    fieldLabel: 'PASSWORD',
                    name: 'password',
                    inputType: 'password'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Date of Birth',
                    name: 'birthDate'
                }
            ]
        });

        this.isolatedItems['button'] = Ext.create('Ext.button.Button', {
            text: 'LOGIN',
            scale: 'medium',
            renderTo: $('#login .row3')[0]
        });
    },

    bindEvents: function(){
        this.on('resize', this.Events.resize, this);
        this.fireEvent('resize');

    },

    Events:{
        resize: function(){
            var $panel = $(this.getEl().dom).find('[role="form"]');
            $panel.css( 'margin-top', -$panel.height() / 2 );
        }
    }
});
