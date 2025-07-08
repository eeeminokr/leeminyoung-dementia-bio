var pageSize =  parameter['pageSize'];
var bioTakeMgtListStore;
var bioTakeMgtListGrid;
var searchParams;
var activePage = parameter['activePage'];
var mask={};
var getCookieValue='N';
var selectObj = 0;
var sm =new Ext.selection.CheckboxModel({
	headerWidth:40,
	checkOnly: true,
	listeners: {
    	deselect: function(model, record, index) {
    		selectObj--;
    		$("#result").html(selectObj);
    	},
        select: function(model, record, index) {
        	selectObj++;
        	$("#result").html(selectObj.toLocaleString());
        }
    }
});

bioTakeMgtListGrid = function() {
	Ext.create("Ext.panel.Panel", {
		height : '580px',
		region : 'center',
		layout : 'border',
		renderTo : 'ContentsDiv',
		border : false,
		items : [ {
			xtype : 'grid',
			id : 'bioTakeMgtListGrid-grid',
			region : 'center',
			autoExpandColumn : 'subject',
			store : bioTakeMgtListStore,
			rowNumberer : true,
			trackMouseOver : true,
			autoScroll : true,
			columnLines : true,
			stripeRows : true,
			loadMask : true,
			border : true,
			singleSelect: true,
			selModel: sm/*{
	            type: 'checkboxmodel',
	            checkOnly: true
	        }*/,
	        viewConfig: {
	            enableTextSelection: true,
//	            emptyText: '표시할 데이터가 없습니다.'
	        },
			columns : [ {
				dataIndex : 'takeDate',
				// width : 100,
				flex: 8 / 100,
				header : '채취일자',
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'biomatKind',
				// width : 120,
				flex: 12 / 100,
				header : '검체시료종류',
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'objectId',
				header : 'Object ID',
				// width : 100,
				flex: 8 / 100,
				align : 'center',
		    	menuDisabled : true
			}
			/*
			, {
				dataIndex : 'name',
				header : '이름',
				// width : 100,
				flex: 8 / 100,
				align : 'center',
		    	menuDisabled : true
			}
			*/
			, {
				dataIndex : 'birth',
				header : '출생년월',
				// width : 100,
				flex: 8 / 100,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'biomatId',
				header : '검체시료ID',
				// width : 150,
				flex: 14 / 100,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'takeAgency',
				header : '채취기관',
				// width : 100,
				flex: 8 / 100,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'remarks',
				header : '비고',
				// width : 150,
				flex: 14 / 100,
				align : 'left',
		    	menuDisabled : true
			}, {
				dataIndex : 'dtlCnt',
				header : '상세건수',
				// width : 100,
				flex: 8 / 100,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'createDate',
				header : '등록일자',
				// width : 120,
				flex: 12 / 100,
				align : 'center',
		    	menuDisabled : true
			}],
			listeners: {//row click 이벤트
				rowdblclick: function(grid, row, e) {
					var checkBiomatKind = row.data.biomatKind;
					if(checkBiomatKind == '혈액'){
						checkBiomatKind = 'A001'
					}else if(checkBiomatKind == '뇌척수액'){
						checkBiomatKind = 'A019'
					}
					var url = GLOBAL_CONTEXT_PATH+'/dementia/bioMaterial/bioTakeMgt/bioTakeDtl.view';
					url += '?pageNum=' + pageLoad.getParameter('pageNum');
					url += '&sub=' + pageLoad.getParameter('sub');
					url += '&takeDate=' + row.data.takeDate;
					url += '&objectId=' + row.data.objectId;
					url += '&biomatId=' + row.data.biomatId;
					url += '&biomatKind=' + checkBiomatKind;
					url += '&biomatKindName=' + row.data.biomatKind;
					url += '&name=' + row.data.name;
					url += '&takeAgency=' + row.data.takeAgency;
					url += '&remarks=' + row.data.remarks;
					url += '&sizeKind=' + row.data.sizeKind;
					location.href = url; 
				}
			}
		} ],
		bbar: new Ext.PagingToolbar({
        	id: 'bioTakeMgtListGrid-grid-page',
            pageSize: pageSize,
            store: bioTakeMgtListStore,
			displayInfo: true,
			displayMsg: '<div style="text-align:right;"><span style="margin-right:30px !important;">선택: ' +'<span id ="result">'+selectObj+'</span>'+' 건 ' +'/ 전체 {2}중 {0} - {1}</span></div> ',
			items: ['->'],
            prependButtons: true,
            plugins : [new Ext.ux.plugin.PagingToolbarResizer()],
			listeners : {
				change : function(p, pageData) {
					if (pageData.total == 0) {
						return;
					}
					selectObj = 0;
					activePage = pageData.activePage;
				},
				changevalue : function (p, value) {
					pageSize = value;
				}
			}
        })
		
	});
}

Ext.onReady(function() {
	Ext.QuickTips.init();

	bioTakeMgtListStore = Ext.create('Ext.data.Store', {
		storeId : 'Staging',
		autoLoad : false,
		pageSize : pageSize,
		proxy : {
			type : 'ajax',
			url : GLOBAL_CONTEXT_PATH
					+ '/dementia/bioTakeMgt/selectBioTakeMstList.do',
			reader : {
				type : 'json',
				root : 'result',
				totalProperty: 'total'
			}

		},
		listeners : {
			load : function() {
					
			}
		}
	});
	

	Ext.create('Ext.form.field.Date',{
		id : 'startDate',
		cls : 'dateField',
        renderTo : 'startDateField',
        format : 'Ymd',
	    submitFormat : 'Ymd',
	    width : '100px',
        maxLength : 8,
        listeners: {
        	change: function(el,type) {
            }                         
       }
	});
	
	Ext.create('Ext.form.field.Date',{
		id : 'endDate',
		cls : 'dateField',
        renderTo : 'endDateField',
        format : 'Ymd',
	    submitFormat : 'Ymd',
	    width : '100px',
        maxLength : 8,
        listeners: {
        	change: function(el,type) {
            }                         
       }
	});
	
	new bioTakeMgtListGrid();
	
	getCookieValue = pageLoad.getParameter('getCookieValue');
	if(getCookieValue=="Y"){
		// 쿠키에 저장되어있는 검색/페이지 값을 폼에 적용시킨다.
		applyCookieSearchValue();
		doSearch();
	}else{
		// 쿠키 삭제
		removeCookieSearchValue();
	}
});

function doSearch() {

	var biomatKind = document.getElementById("biomatKind").value;
	var objectId = document.getElementById('objectId').value;
	var name = document.getElementById('name').value;
	var biomatId = document.getElementById('biomatId').value;
	var instiCode = document.getElementById('instiCode').value;
	var startDate = document.getElementById('startDate-inputEl').value;
	var endDate = document.getElementById('endDate-inputEl').value;
	if(!searchCheck(startDate)){
		if(searchCheck(endDate)){
			Ext.Msg.alert('알림', '채취일자 조회 기간을 모두 입력하세요');
	        return false;
		}
	}
	if(!searchCheck(endDate)){
		if(searchCheck(startDate)){
			Ext.Msg.alert('알림', '채취일자 조회 기간을 모두 입력하세요');
	        return false;
		}
	}	
	if(Number(endDate) < Number(startDate)){
		Ext.Msg.alert('알림', '채취일자 조회 기간을 확인하세요');
        return false;
	}
	
	searchParams = {
			biomatKind : biomatKind
			, objectId : objectId
			, name : name
			, biomatId : biomatId
			, takeAgency : instiCode
			, startDate : startDate
			, endDate : endDate
	}
	
	bioTakeMgtListStore.proxy.actionMethods.read = "POST"
	bioTakeMgtListStore.proxy.extraParams = searchParams;
	
	var pageParams = {
		start : 0,
		limit : pageSize
	};

	bioTakeMgtListStore.on('load', function(store, records, successful){
		});
	
	bioTakeMgtListStore.load({
		params : pageParams
	});
	schKeyField = '';
	 //쿠키값 저장
	saveCookieSearchValue();
}
//ObjectID 조회 추가
function openObjectIdPopup(){
	objectIdReset();
	objectIdListPopup = new ObjectIdPopup.PopupWindow();
	objectIdListPopup.show();
}
// ObjectID 엑셀 업로드
function objectIdUploadFile(){
	var objectIdUploadWin = new ObjectIdUploadPanel();
	objectIdUploadWin.show();
}
// ObjectID 리셋
function objectIdReset(){
	$("#objectId").val("");
	selectObjID=new Array();
}
// ObjectID 엑셀 양식 다운로드
function objectIdExcelSampleDownload() {
	location.href = GLOBAL_CONTEXT_PATH + '/downFile.view?dir=file.sample.dir&fileName=ObjectID.xls';
}
//ObjectID 추가
ObjectIdUploadPanel = function(){
	ObjectIdUploadPanel.superclass.constructor.call(this, {
		id: 'ObjectIdExcelFile-upload',
		closeAction: 'destroy',
		title: 'Object ID 파일 업로드',
		plain: false,
		width: 400,
		autoHeight: true,
		maximizable: false,
		modal: true,
		border : false,
		resizable : false,
		layout : 'fit',
		items: [
			 Ext.create('Ext.form.Panel',{
		        fileUpload: true,
		        frame: true,
		        autoHeight: true,
				labelWidth: 150,
				style : "padding-top: 25px;",
		        items: [{
		        	msgTarget: 'side',
		        	allowBlank: false,
      				//inputType: 'file',
					id: 'objectIdFile',
					name: 'objectIdFile',
					fieldLabel: 'Object ID (ObjectID.xls)',
					blankText: 'ObjectID.xls 파일을 선택하세요',
					anchor: '95%',
					required: true,
					autoShow: true,
					xtype: 'filefield',
					width : 350
		        }],
		        buttonAlign: 'center',
		        buttons: [{
		            text: '업로드',
		            handler: function(btn){
		            	var win = btn.up('window');
		                var formO = win.down('form');
		            	ufpo =formO.getForm();
		            	if(ufpo.isValid()){
		            		objectIdReset
		            		 Ext.MessageBox.show({
		            		       msg: '데이터 업로드 중..',
		            		       progressText: '잠시만 기다려주세요..',
		            		       width:300,
		            		       wait:true,
		            		       waitConfig: {interval:200},
		            		       icon:'ext-mb-download', 
		            		       animEl: 'buttonID'
		            		   });	
		            		ufpo.submit({
			                	url: GLOBAL_CONTEXT_PATH + '/dementia/imageryInfoMgt/objectIdUpload.do',
			                   // waitMsg: '데이터 업로드 중..',
	                           //   waitTitle : '잠시만 기다려주세요..',
	                              success: function(response, opts){
	                            	  Ext.MessageBox.hide();
								      var obj = Ext.decode(response.responseText);
								      var json = Ext.util.JSON.decode(opts.response.responseText);
								      if(json.message != "" && json.message != undefined){
								    	  Ext.Msg.show({
		                                      title: '알림',
		                                      msg: json.message, 
		                                      buttons: Ext.Msg.OK,
		                                      fn: function(btn, text) {
		                                      }
		                                  });
								      }else{
	                            	  $("#objectId").val(json.objectIdList);
	                                  Ext.Msg.show({
	                                      title: '알림',
	                                      msg: '파일 업로드를 성공하였습니다.', 
	                                      buttons: Ext.Msg.OK,
	                                      fn: function(btn, text) {
	                                          if (btn == 'ok') {
	                                        	  Ext.getCmp('ObjectIdExcelFile-upload').close();
	                                          }
	                                      }
	                                  });
								    }
	                              },
	                              failure : function(response, opts) {
	                            	  Ext.MessageBox.hide();
	                              	var json = Ext.util.JSON.decode(opts.response.responseText);
	                                  Ext.Msg.alert('알림', '<b>' + json.message + '</b>');
	                              }
			                });
		                }
		            }
		        },{
					text: '취소',
					handler: function(){
						Ext.getCmp('ObjectIdExcelFile-upload').close();
						
					}
				}]
			})
		]
	});
};
Ext.extend(ObjectIdUploadPanel, Ext.Window, {
});



var prev="";
function numCheck(obj) { 
	var regexp = /^\d*(\.\d{0,2})?$/; 
    if(obj.value.search(regexp)==-1 || obj.value>99999999) { 
        obj.value = prev; 
    } 
    else { 
        prev = obj.value; 
    } 
} 

function searchCheck(obj){
	var check = $.trim(obj);
	if(check == undefined || check == "" || check == "선택"){
		return false;
	}
	return true;
}

function deleteBioTakeMst(){
	Ext.Msg.confirm('알림', '선택한 데이터를 삭제하시겠습니까?', function(btn) {
	    if (btn == 'yes') {
	    	var list = [];
	    	var s = sm.getSelection();
	    	if (s < 1) {
	    		Ext.Msg.alert('알림', '데이터를 선택해주세요.');
	    		return;
	    	}
	    	
	    	Ext.each(s, function(rec) {
	    		bioTakeMstVO = {
	    				biomatId : rec.get('biomatId'),
	    				objectId : rec.get('objectId'),
	    				takeDate : rec.get('takeDate')
	    				
	    		};
	    		list.push(bioTakeMstVO);
	    	});
	    	Ext.Ajax.request({
	    	    url : makeUrl('/dementia/bioTakeMgt/deleteBioTakeMst.do'),
	    	    headers : {
                    'Content-Type' : 'application/json'
                },
                method : 'post',
                jsonData : {bioTakeList : list},
                success : function(resp) {
                    var obj = Ext.decode(resp.responseText);
                    if (obj.success) {
                          Ext.Msg.alert('알림', '데이터가 삭제되었습니다.');
                    } else {
                          Ext.Msg.alert('알림', '데이터 삭제에 실패했습니다.<br/><b>'+ obj.errors.reason+'</b>');
                    }
                },
                callback : function() {
                	bioTakeMgtListStore.load();
                }
	    	});
	    }
	});
}

function searchCntCheck(){
	if(bioTakeMgtListStore.getCount() == 0){
		Ext.Msg.alert('알림', '조회된 데이터가 없습니다.');
	}
}

function bytesToSize(bytes) {
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Byte';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	};

function goReg(){
	location.href=makeUrl('/dementia/bioMaterial/bioTakeMgt/bioTakeReg.view');
}

function doSearchListReset() {
	
	//페이징 리셋
	var paging = Ext.getCmp('bioTakeMgtListGrid-grid-page');
	paging.plugins[0].recordsPerPageCmb.setValue(pageSize);
	paging.store.pageSize = pageSize;
	paging.store.currentPage=1;
	
	doReset();
	Ext.getCmp("startDate").setValue("");
	Ext.getCmp("endDate").setValue("");
	
	Ext.getCmp('bioTakeMgtListGrid-grid').getView().emptyText="";
	bioTakeMgtListStore.removeAll();
	Ext.getCmp('bioTakeMgtListGrid-grid').getView().refresh();
	Ext.getCmp('bioTakeMgtListGrid-grid').getView().emptyText='<div class="x-grid-empty">표시할 데이터가 없습니다.</div>';
}




