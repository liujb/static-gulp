var urlConfig={add:"/fist/staff_care/index/add_sms_view",edit:"/fist/staff_care/index/edit_sms_view",get:"/fist/staff_care/index/get_sms_view",upload:"/fist/staff_care/index/add_excel",download:"/fist/staff_care/down_load/down_load"};$("#btnUpload").on("click",function(){var o=$("#uploadFile");o.click()}),$("#uploadFile").change(function(){var o=$(this).attr("id");$.ajaxFileUpload({url:urlConfig.upload,secureuri:!1,fileElementId:o,dataType:"json",success:function(o){if("0"==o.errno){var a=FormValidator.showInfo("success","上传成功");$(a).on("remove.pop",function(){window.location.href=location.href})}else{var a=FormValidator.showInfo(o.errmsg);$(a).on("remove.pop",function(){window.location.href=location.href})}},error:function(o,a,n){alert("上传失败")}})});var myMoudel=angular.module("myApp",[]);myMoudel.controller("showInfo",["$scope",function(o){function a(a){$.ajax({url:urlConfig.get,dataType:"json",data:{id:a}}).done(function(a){o.$apply(function(){o.data=a.data}),$("#selType").attr("disabled","disabled"),$("#txtSubject").attr("disabled","disabled"),$("#modal").modal("show")})}function n(o,a){$.ajax({url:o.id?urlConfig.edit:urlConfig.add,data:o,dataType:"json",type:"POST"}).done(function(o){if("0"!=o.errno)return FormValidator.showInfo(o.errmsg),!1;var n=FormValidator.showInfo("success",a);$(n).on("remove.pop",function(){window.location.href=location.href})})}$(".mainList").on("click",".edit",function(){var o=$(this).data("id");a(o)}),$("#modal").on("hidden.bs.modal",function(){o.$apply(function(){o.data={}})}),$("#btnSave").on("click",function(){var a=o.data;n(a,a.id?"修改成功":"添加成功")})}]),myMoudel.controller("search",["$scope",function(o){o.search=function(){$.ajax({url:urlConfig.search,data:o.searchData,type:"POST"}).done(function(o){})}}]),$("#btnAdd").on("click",function(){$("#modal").modal("show")}),angular.bootstrap(document,["myApp"]);