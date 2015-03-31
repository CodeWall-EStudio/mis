//主题创建,删除等操作
var data;
var sCreate = {};
var cgi,
	tmpl;
module.exports = sCreate;

var createDom = $("#createSubject"),
	nowManageDom = $("#nowManage");

function bindAction(){
	createDom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action'),
			role = target.data('role'),
			type = target.data('type');

		if(action){
			var amap = action.split('-');

			if(amap.length === 2 && window.striker[amap[0]][amap[1]]){
				window.striker[amap[0]][amap[1]](target);
			}
			return;
		}
		if(role){
			target.parents('.tag').remove();
			return;
		}
		if(type === 'submit'){
			var tit = $("#subjectTitle").val(),
				mark = $("#subjectMark").val(),
				open = $("#subjectOpen").prop('checked')?1:0,
				guest = $("#subjectGuest").prop('checked')?1:0;

			var mlist = [];
			$("#nowManage .tag").each(function(e){
				var target = $(e.target),
					id = target.data('id');
				if(id){
					mlist.push(id);
				}
			});

			var llist = [];
			$("#nowSubLabel .tag").each(function(e){
				var target = $(e.target),
					id = target.data('id');
				if(id){
					llist.push(id);
				}				
			})

			var param = {
				title : tit,
				mark : mark,
				private : open,
				guest : guest,
				members : mlist,
				subjectLabels : llist,
				articleLabels : [],
				resources : []
			}

			if(param.title !== '' && param.mark !== ''){
				cgi.create(param,function(res){
					if(res.code === 0){
						createDom.modal('hide');
						
						var html = tmpl.list({
							list : [res.data]
						});
						$("#mySubject").prepend(html);
					}
				});
			}
		}
	});
}

sCreate.init = function(type,module,tmp){
	cgi = module;
	tmpl = tmp;

	createDom.on('show.bs.modal', function (e) {
		striker.user.addDefManage();
	})

	nowManageDom;

	bindAction();
}

sCreate.create = function(param,cb){

}