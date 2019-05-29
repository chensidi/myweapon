L.ui.alpha_view.extend({
    packages:['demopackage'],
    _data: {},

    demoMethod: L.rpc.declare({
        object: 'demo',
        method: 'demoMethods',
        params: ['p1','p2'],
        //
    }),

    add: function(){
        var self = this;
        if(!self.validation())return;
        L.uci.alpha_set('demopackage','config','option',self._data['data']['val']);
        //...
        self.save();
    },

    del: function(id){
        var self = this;
        var name = self._data['table'][id]['name'];
        L.uic.remove('demopackage',name);
        //..
        self.save();
    },

    modify: function(){
        var self = this;
        if(!self.validation())return;
        L.uci.alpha_set('demopackage','config','option',self._data['data']['val']);
        //...
        self.save();
    },

    refresh: function(){
        var self = this;
        $.observable(self._data['data']).setProperty('demoerr','');
        //...
        self.render();
    },

    validation: function(){
        var self = this;
        //...
    },

    save: function() {
		var self = this;
		L.ui.loading(true);
		L.uci.save().then(function() {
			L.ui.loading(false)
            self.render()
		});
    },
    
    demoInit: function(){
        var self = this;
        self._data = {};
        self._data['table'] = [];
        var demoSection = L.uci.section('demopackage');
        for(var key in demoSection){
            //var em = demoSection[key];
            //self._data['table].push(em);
            //...
        }

        var eventBindings = {
            apply: function(){
                if(self._data['data']['.name']!=undefined){
                    self.modify();
                }else{
                    self.add();
                }
            },
            edit: function(ev){
                var id = ev.target.id;
                var _d = self._data['table'][id];
                for(var key in _d){
                    if(key=='.name'){
                        self._data['data']['name'] = _d['key'];
                        //...
                    }else{
                        self._data['data'][key] = _d['key'];
                        $.observable(self._data['data']).setProperty(key,_d['key']);
                    }
                }
            },
            doRefresh: function(){
                self.refresh();
            },
            delete: function(ev){
                self.del(ev.target.id);
            }
        }

        $.views.converters({
			toBool: function(val) {
				if (val == 0 && val != '')
					return true;
				else
					return false;
    		},
    		toInt: function(val) {
    			return val ? '0' : '1';
    		},
    		toBoolEn: function(val) {
				if (val == 1 && val != '')
					return true;
				else
					return false;
    		},
    		toIntEn: function(val) {
    			return val ? '1' : '0';
    		}
        })
        
        var temp = $.templates('#temp');
        temp.link('#map',self._data,eventBindings);
    },

    execute: function(){
        var self = this;
        self.demoInit();
    }
})