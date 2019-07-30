L.ui.alpha_view.extend({

	_data: {},
	packages: ['system','minidlna'],

	userDel: L.rpc.declare({
		object: '/useraccount',
		method: 'userdel',
		params: ['user_username','index']
	}),

	userAdd: L.rpc.declare({
		object: '/useraccount',
		method: 'useradd',
		params: ['user_username','user_password','user_enabled']
	}),

	userSet: L.rpc.declare({
		object: '/useraccount',
		method: 'userset',
		params: ['user_username','user_password','user_enabled','index']
	}),

	getFolder: L.rpc.declare({
		object: '/minidlna',
		method: 'folder_tree',
		params: ['path']
	}),

	validation: function(){
		var self = this;
		$.observable(self._data['data']).setProperty('unameError', '');
		$.observable(self._data['data']).setProperty('pwdError', '');
		$.observable(self._data['data']).setProperty('cpwdError', '');
		var reg = /[\w]{6,32}/ig,
			regName = /[\w]+/ig;

		if(!regName.test(self._data['data']['uname'])){
			$.observable(self._data['data']).setProperty('unameError', L.tr('User names cannot be empty and can only be Numbers, letters, and underscores'));
			return;
		}
		if(!reg.test(self._data['data']['pwd'])){
			$.observable(self._data['data']).setProperty('pwdError', L.tr('Passwords must be 6-32 bits, contain alphanumeric or underscore characters, and do not include special characters'));
			return;
		}
		if(self._data['data']['pwd']!=self._data['data']['cpwd']){
			$.observable(self._data['data']).setProperty('cpwdError', L.tr('The passwords must be the same'));
			return;
		}
		return true;
	},

	isRepeat: function(){
		var self = this;
		if(!self._data['data']['isEidt']){
			for(var i = 0; i < self._data['table'].length; i ++){
				if(self._data['table'][i]['users'] == self._data['data']['uname']){
					$.observable(self._data['data']).setProperty('unameError',L.tr('The user name already exists!'));
					return false;
				}
			}
			if(i == self._data['table'].length){
				return true;
			}
		}else{
			for(var i = 0; i < self._data['table'].length; i ++){
				if(i != self._data['data']['index']){
					if(self._data['table'][i]['users'] == self._data['data']['uname']){
						$.observable(self._data['data']).setProperty('unameError',L.tr('The user name already exists!'));
						return false;
					}
				}
			}
			if(i == self._data['table'].length){
				return true;
			}
		}
	},

	save: function() {
		var self = this;
		L.ui.loading(true);
		L.uci.save().then(function() {
			if (L.globals.commit_button) {
                L.ui.loading(false);
                self.render()
            } else {
                L.commitFunc()
            }
		});
	},

	toIntEn: function(val) {
		return val ? '1' : '0';
	},

	toBoolEn: function(val) {
		if (val == 1 && val != '')
			return true;
		else
			return false;
	},

	modify: function(){
		var self = this;
		// self._data['data']['isEidt'] = true; 
		if(!self.validation())return;
		if(!self.isRepeat())return;
		// L.ui.loading(true);
		// self.userSet(self._data['data']['uname'],self._data['data']['pwd'],self._data['data']['enable'],self._data['data']['index']).done(function(){
		// 	self.save();
		// })
		var sid = self._data['modify_sid'];
		L.uci.alpha_set('system',sid,'name',self._data['data']['uname']);
		L.uci.alpha_set('system',sid,'password',self._data['data']['pwd']);
		// L.uci.alpha_set('system',sid,'enabled',self._data['data']['enable']);

		L.uci.alpha_set('system',sid,'samba_enabled',self.toIntEn(self._data['samba_status']));
		L.uci.alpha_set('system',sid,'samba_folder',self._data['folder_samba']);
		L.uci.alpha_set('system',sid,'samba_permission',self._data['samba_allow']);

		L.uci.alpha_set('system',sid,'ftp_enabled',self.toIntEn(self._data['ftp_status']));
		L.uci.alpha_set('system',sid,'ftp_folder',self._data['folder_ftp']);
		L.uci.alpha_set('system',sid,'ftp_permission',self._data['ftp_allow']);

		// L.uci.alpha_set('system',sid,'vpn_enabled',self.toIntEn(self._data['vpn_status']));
		// self.save();
	},

	add: function(){
		var self = this;
		// self._data['data']['isEidt'] = false; 

		if(!self.validation())return;
		if(!self.isRepeat())return;
		if(self._data['table']['length'] >= self._data['data']['max']){
			L.ui.dialog(L.tr('The error message'),$('<p />').text(L.tr('Set the number of entries to no more than 20')),{
				style:'close'
			})
			return;
		}

		$.observable(self._data['data']).setProperty('enable','1');

		// L.ui.loading(true);
		// self.userAdd(self._data['data']['uname'],self._data['data']['pwd'],self._data['data']['enable']).done(function(){
		// 	self.save();
		// });
		var sid = L.uci.add('system','account');
		$.observable(self._data).setProperty('sid',sid);

		L.uci.alpha_set('system',sid,'name',self._data['data']['uname']);
		L.uci.alpha_set('system',sid,'password',self._data['data']['pwd']);
		// L.uci.alpha_set('system',sid,'enabled','1');

		L.uci.alpha_set('system',sid,'samba_enabled',self.toIntEn(self._data['samba_status']));
		L.uci.alpha_set('system',sid,'samba_folder',self._data['folder_samba']);
		L.uci.alpha_set('system',sid,'samba_permission',self._data['samba_allow']);

		L.uci.alpha_set('system',sid,'ftp_enabled',self.toIntEn(self._data['ftp_status']));
		L.uci.alpha_set('system',sid,'ftp_folder',self._data['folder_ftp']);
		L.uci.alpha_set('system',sid,'ftp_permission',self._data['ftp_allow']);

		// L.uci.alpha_set('system',sid,'vpn_enabled',self.toIntEn(self._data['vpn_status']));
		// self.save();
	},

	delete: function(ev){
		var self = this;
		var _d = self._data['table'][ev.target.id];
		// L.ui.loading(true);
		// self.userDel(_d['users'],_d['index']-1).done(function(){
		// 	self.save();
		// });
		L.uci.remove('system',_d['sid']);
		self.save();
	},

	user_init: function(){
    	var self = this;
    	var template = $.templates("#temp");
		var userList =  L.uci.sections('system');
		self._data = {
			folder_samba: '',
			folder_ftp: '',
			samba_status: false,
			samba_allow: 'rw',
			ftp_status: false,
			ftp_allow: 'rw',
			vpn_status: 0,
			modify_sid: '',
			sid: ''
		}
		self._data['table'] = [];
		self._data['data'] = {
			uname: '',
			pwd: '',
			cpwd: '',
			enable: '0',
			isEidt: false,
			index: '',
			max: 20
		}
		

		var i = 0;
		for(var key in userList){
			var em = userList[key];
			if(em['.type'] == 'account'){
				i++;
				var temp = {
					enabled :em['enabled'],
					users :em['name'],
					pwd: em['password'],
					index: i,
					sid:em['.name'],
					samba_enabled: em['samba_enabled'],
					samba_folder: em['samba_folder'],
					samba_permission: em['samba_permission'],
					ftp_enabled: em['ftp_enabled'],
					ftp_folder: em['ftp_folder'],
					ftp_permission: em['ftp_permission']
				};
				self._data['table'].push(temp);
			}
		}
		var eventBindings = {
			show: function(){
				$('#addbox').show();
			},
			appends: function(){
				self.add();
			},
			apply: function () {
				if(self._data.sid != ''){
					L.uci.alpha_set('system',self._data.sid,'enabled',self._data['data']['enable']);
				}
				self.save();
			},
			confirm: function(){
				if(self._data['data']['isEidt']){
					self.modify()
				}else{
					self.add();
				}
				$('#apply').attr('disabled',false).addClass('green').removeClass('gray');
				$('#addbox').hide();
			},
			remove: function (ev) {
				self.delete(ev)
			},
			edit: function(ev){
				// $('#apply').attr({
				// 	disabled: false,
				// 	class: 'card-btn green'
				// });
				var _d = self._data['table'][ev.target.id];
				self._data['data']['isEidt'] = true;
				self._data['modify_sid'] = _d.sid;
				$('#showname').attr('disabled',true);
				$('#addbox').show();

				self._data['data']['index'] = ev.target.id;
				$.observable(self._data['data']).setProperty('uname',_d['users']);
				$.observable(self._data['data']).setProperty('pwd',_d['pwd']);
				$.observable(self._data['data']).setProperty('cpwd',_d['pwd']);

				if(_d['users']==undefined){
					$.observable(self._data['data']).setProperty('uname','');
				}
				
				if(_d['pwd']==undefined){
					$.observable(self._data['data']).setProperty('pwd','');
					$.observable(self._data['data']).setProperty('cpwd','');
				}
				$.observable(self._data['data']).setProperty('enable',_d['enabled']);

				$.observable(self._data).setProperty('samba_status',self.toBoolEn(_d['samba_enabled']));
				$.observable(self._data).setProperty('samba_allow',_d['samba_permission']);
				$.observable(self._data).setProperty('folder_samba',_d['samba_folder']);

				$.observable(self._data).setProperty('ftp_status',self.toBoolEn(_d['ftp_enabled']));
				$.observable(self._data).setProperty('ftp_allow',_d['ftp_permission']);
				$.observable(self._data).setProperty('folder_ftp',_d['ftp_folder']);


			},
			refresh: function(){
				$.observable(self._data['data']).setProperty('unameError', '');
				$.observable(self._data['data']).setProperty('pwdError', '');
				$.observable(self._data['data']).setProperty('cpwdError', '');
				self.render();
			},
			scan1: function(){
				$('#tree_samba').toggle();
			},
			scan2: function(){
				$('#tree_ftp').toggle();
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


		function createLi(path,obj,span,flag){
			var liArr = [];
			L.rpc.batch();
			self.getFolder(path);

			L.rpc.flush().then(function(folders){
				var result = folders[0]; 
				if(result['error']){
					span.remove();
					return;
				}
				for(var attr in result){
					var em = result[attr];
					var li = $('<li />').append(
						$('<div />').addClass('close_menu')
									.append(
										$('<span />').on('mousedown',function(e){
											if(e.which != 1)return;
											var path = $(this).next().attr('path');
											var nextFolder = createLi(path,$(this).parent().next(),$(this),flag);
											// console.log(666)
											// $(this).parent().next().append(createLi(path));
											// $(this).off('mousedown');
											// $.getScript('tree.js');
										})
									
									)
									.append($('<a />').attr({'title':attr,'path':em['path'].replace(/\/mnt\/storage/,'')}).text(attr).click(function(e){
										var folder = $(this).attr('path');
										$.observable(self._data).setProperty(flag,folder);
									}))
					).append('<ul />')
					liArr.push(li);
					obj.append(li);
				}
				span.off('mousedown');
				$.getScript('luci2/tree.js')
				return liArr;
			})
		}

		L.rpc.batch();
		self.getFolder('/mnt');

		L.rpc.flush().then(function(tree){
			//改进代码
			var result = tree[0];
			if(result['error'])return;
			for(var attr in result){
				var em = result[attr];
				$('#tree_samba .tree>ul').append(
					$('<li />').append(
						$('<div />').addClass('close_menu')
									.append(
										$('<span />').on('mousedown',function(e){
											if(e.which != 1)return;
											var path = $(this).next().attr('path');
											var nextFolder = createLi(path,$(this).parent().next(),$(this),'folder_samba');
										})
									)
									.append($('<a />').attr({'title':attr,'path':em['path'].replace(/\/mnt\/storage/,'')}).text(attr).click(function(e){
										var folder = $(this).attr('path');
										$.observable(self._data).setProperty('folder_samba',folder);
									}))
					).append($('<ul />'))
				);
				$('#tree_ftp .tree>ul').append(
					$('<li />').append(
						$('<div />').addClass('close_menu')
									.append(
										$('<span />').on('mousedown',function(e){
											if(e.which != 1)return;
											var path = $(this).next().attr('path');
											var nextFolder = createLi(path,$(this).parent().next(),$(this),'folder_ftp');
										})
									)
									.append($('<a />').attr({'title':attr,'path':em['path'].replace(/\/mnt\/storage/,'')}).text(attr).click(function(e){
										var folder = $(this).attr('path');
										$.observable(self._data).setProperty('folder_ftp',folder);
									}))
					).append($('<ul />'))
				);
			}
	
			$.getScript('luci2/tree.js');
		})
		
		template.link("#map", self._data, eventBindings);

		$('#data_table input[type="checkbox"]').each(function(){
			$(this).change(function(){
				var index = $(this).attr('index');
				var sid = self._data['table'][index]['sid'];
				var enabled = $(this).is(':checked')?'1':'0';
				$.observable(self._data['data']).setProperty('enable',enabled);
				$.observable(self._data).setProperty('sid',sid);
				// self.save();
				$('#apply').attr('disabled',false).addClass('green').removeClass('gray');
			})
		})

	},
	execute: function() {
		var self = this;
		self.user_init();
		$('#addbox').hide();
	}	
});

