var urlConfig = {
	'add':'/fist/staff_care/index/add_sms_view',
	'edit':'/fist/staff_care/index/edit_sms_view',
	'get':'/fist/staff_care/index/get_sms_view',
	'upload':'/fist/staff_care/index/add_excel',
	'download':'/fist/staff_care/down_load/down_load'
};

$('#btnUpload').on('click', function(){
	var $upload = $('#uploadFile');
		$upload.click();
});


$('#uploadFile').change(function(){
	var id = $(this).attr("id");
	$.ajaxFileUpload({
		url:urlConfig['upload'],
		secureuri:false,
		fileElementId:id,
		dataType: 'json',
		success: function (d){
		    if (d.errno == '0'){
		    	var pop = FormValidator.showInfo('success','上传成功');
				 $(pop).on('remove.pop', function(){
				 	window.location.href = location.href;
				 });
		    }else{
		    	var pop = FormValidator.showInfo(d.errmsg);
		    	$(pop).on('remove.pop', function(){
				 	window.location.href = location.href;
				 });
		    }
		},
		error: function(data, status, e){
		    alert('上传失败');
		}
	});
});

var myMoudel = angular.module('myApp',[]);
myMoudel.controller('showInfo', ['$scope', function($scope){
	function showData(id){
		$.ajax({
			url:urlConfig['get'],
			dataType:'json',
			data:{id:id}
		}).done(function(d){
			$scope.$apply(function(){
				$scope.data = d.data;
			});
			$('#selType').attr('disabled','disabled');
			$('#txtSubject').attr('disabled','disabled');
			$('#modal').modal('show');
		});
	}

	function save(data,operateMsg){
		$.ajax({
			url:data['id'] ? urlConfig['edit'] : urlConfig['add'],
			data:data,
			dataType:'json',
			type:'POST'
		}).done(function(d){
			if (d.errno == '0'){
				var pop = FormValidator.showInfo('success',operateMsg);
				$(pop).on('remove.pop', function(){
					window.location.href = location.href;
				});
			}else{
				FormValidator.showInfo(d.errmsg);
				return false;
			}
			
		});
	}

	$('.mainList').on('click','.edit', function(){
		var id = $(this).data('id');
		showData(id);
		
	});

	$('#modal').on('hidden.bs.modal', function(){
		$scope.$apply(function(){
			$scope.data = {};
		});
	});

	$('#btnSave').on('click', function(){
		var data = $scope.data;
		save(data, data['id'] ? '修改成功' : '添加成功');
	});
	
}]);

myMoudel.controller('search', ['$scope', function($scope){
	$scope.search = function(){
		$.ajax({
			url:urlConfig['search'],
			data:$scope.searchData,
			type:'POST'
		}).done(function(e){

		});
	}
}]);



$('#btnAdd').on('click', function(){
	$('#modal').modal('show');
});

angular.bootstrap(document,['myApp']);