St.MainMenu = Ext.extend(Ext.tree.TreePanel, {
    
    initComponent: function(config){
        Ext.apply(this,{
            rootVisible: false,
//            lines: false,
            singleExpand: true,
            useArrows: false,
            root: this.getRootItems()
        });
        
        St.MainMenu.superclass.initComponent.call(this, config);
    },
    
    getRootItems : function(){
        var menuItems = [];
    
        if (St.isMainOffice) {
            menuItems.push({
                text    : 'Просмотр сайта',
                leaf    : true,
                iconCls : 'icon-picture_empty',
                href    : 'javascript:void(0)',
                listeners: {
                    click   : function(){
                        window.open(window.location.origin, '_blank'); return false;
                    }
                }
            }, {
                text    : 'Новости',
                iconCls : 'icon-news_icon',
                name    : 'St.view.News',
                href    : 'javascript:void(0)',
                leaf    : true,
                listeners: {
                    click   : this.showView
                }
            }, {
                text    : 'Страницы сайта',
                name    : 'St.view.Pages',
                leaf    : true,
                href    : 'javascript:void(0)',
                allowChildren: false,
                iconCls : 'icon-application_side_boxes',
                listeners: {
                    click   : this.showView
                }
            }, {
                text    : 'Комментарии',
                name    : 'St.view.Comments',
                iconCls : 'icon-user_comment',
                leaf    : true,
                href    : 'javascript:void(0)',
                listeners: {
                    click   : this.showView
                }
            });
        }
        
        menuItems.push({
            text    : 'Менеджеры',
            iconCls : 'icon-user',
            name    : 'St.view.Managers',
            leaf    : true,
            href    : 'javascript:void(0)',
            listeners: {
                click   : this.showView
            }
        }, {
            text    : 'Преподаватели',
            iconCls : 'icon-user',
            name    : 'St.view.Teachers',
            leaf    : true,
            href    : 'javascript:void(0)',
            listeners: {
                click   : this.showView
            }
        }, {
            text    : 'Пользователи',
            iconCls : 'icon-user',
            name    : 'St.view.Users',
            leaf    : true,
            href    : 'javascript:void(0)',
            listeners: {
                click   : this.showView
            }
        }, {
            text    : 'Расписание',
            iconCls : 'icon-date',
            name    : 'St.view.Calendar',
            href    : 'javascript:void(0)',
            leaf    : true,
            listeners: {
                click   : this.showView
            }
        });
        
        if (St.isMainOffice) {
            menuItems.push({
                text    : 'Темы уроков',
                iconCls : 'icon-date',
                name    : 'St.view.Topics',
                href    : 'javascript:void(0)',
                leaf    : true,
                listeners: {
                    click   : this.showView
                }
            }, {
                text    : 'Акции',
                name    : 'St.view.HotNews',
                href    : 'javascript:void(0)',
                leaf    : true,
                listeners: {
                    click   : this.showView
                }
            });
        }
        
        menuItems.push({
            text    : 'Абонементы',
            name    : 'St.view.Abonementy',
            href    : 'javascript:void(0)',
            leaf    : true,
            listeners: {
                click   : this.showView
            }
        }, {
            text    : 'Аудитории',
            name    : 'St.view.Rooms',
            href    : 'javascript:void(0)',
            leaf    : true,
            listeners: {
                click   : this.showView
            }
        }, {
            text    : 'Опросы',
            name    : 'St.view.Polls',
            href    : 'javascript:void(0)',
            leaf    : true,
            listeners: {
                click   : this.showView
            }
        });
        
        if (St.isMainOffice) {
            menuItems.push({
                text    : 'Тесты',
                name    : 'St.view.Tests',
                href    : 'javascript:void(0)',
                leaf    : true,
                listeners: {
                    click   : this.showView
                }
            }, {
                text        : 'Результаты тестов',
                expanded    : true,
                children    : [{
                    text    : 'Переход на след. уровень',
                    name    : 'St.view.TestResults',
                    href    : 'javascript:void(0)',
                    leaf    : true,
                    listeners: {
                        click   : this.showView
                    }
                }, {
                    text    : 'Тренировочный',
                    name    : 'St.view.TestResults',
                    href    : 'javascript:void(0)',
                    leaf    : true,
                    listeners: {
                        click   : this.showView
                    }
                }, {
                    text    : 'Входящий',
                    name    : 'St.view.TestResults',
                    href    : 'javascript:void(0)',
                    leaf    : true,
                    listeners: {
                        click   : this.showView
                    }
                }]
            }, {
                text    : 'Настройки системы',
                name    : 'St.view.Settings',
                href    : 'javascript:void(0)',
                leaf    : true,
                listeners: {
                    click   : this.showView
                }
            });
            }
        return {
            children: menuItems
        };
    },
    
    showView : function(menuItem) {
        Ext.getCmp('stMainContent').showView(menuItem.attributes);
    }
});

Ext.reg('St.MainMenu', St.MainMenu);