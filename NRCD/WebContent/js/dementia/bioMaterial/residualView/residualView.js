var pageSize =  parameter['pageSize'];
var residualViewMainListStore;
var residualViewMainListGrid;
var searchParams;
var activePage = parameter['activePage'];
var outDate;
var getCookieValue='N';
var biomatKindStore;
var biomatTypeStore;
var bkCode;

residualViewMainListGrid = function() {
	Ext.create("Ext.panel.Panel", {
		// 'resizable-panel',
		height : '580px',
		region : 'center',
		layout : 'border',
		renderTo : 'ContentsDiv',
		border : false,
		items : [ {
			xtype : 'grid',
			id : 'residualViewMainListGrid-grid',
			region : 'center',
			autoExpandColumn : 'subject',
			store : residualViewMainListStore,
			rowNumberer : true,
			trackMouseOver : true,
			autoScroll : true,
			columnLines : true,
			stripeRows : true,
			loadMask : true,
			border : true,
			singleSelect: true,
	        viewConfig: {
	            enableTextSelection: true,
//	            emptyText: '표시할 데이터가 없습니다.'
	        },
			columns : [ {
				dataIndex : 'biomatKindCode',
				// width : 130,
				flex: 14 / 100,
				header : '검체시료종류코드',
				hidden : true,
				align : 'center',
		    	menuDisabled : true
			},{
				dataIndex : 'biomatKind',
				// width : 130,
				flex: 14 / 100,
				header : '검체시료종류',
				hidden : false,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'objectId',
				// width : 120,
				flex: 12 / 100,
				header : 'Object ID',
				hidden : false,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'takeDate',
				width : 120,
				header : '채취일자',
				hidden : true
			}
			/*
			, {
				dataIndex : 'name',
				// width : 120,
				flex: 12 / 100,
				header : '이름',
				align : 'center',
		    	menuDisabled : true
			}
			*/
			, {
				dataIndex : 'birth',
				// width : 120,
				flex: 12 / 100,
				header : '출생년월',
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'biomatId',
				header : '검체시료ID',
				// width : 120,
				flex: 12 / 100,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'takeAgencyCode',
				header : '채취기관코드',
				hidden : true,
				// width : 120,
				flex: 12 / 100,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'takeAgency',
				header : '채취기관',
				// width : 120,
				flex: 12 / 100,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'biomatTypeCode',
				header : '시료타입코드',
				hidden : true,
				// width : 120,
				flex: 12 / 100,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'biomatType',
				header : '시료타입',
				// width : 120,
				flex: 12 / 100,
				align : 'center',
		    	menuDisabled : true
			}, {
				dataIndex : 'mainTotQuantity',
				header : '잔여량 합계',
				// width : 120,
				flex: 12 / 100,
				align : 'center',
		    	menuDisabled : true,
		    	renderer : Ext.util.Format.numberRenderer('0,000')
			}, {
				dataIndex : 'mainTakeQuantity',
				// width : 120,
				flex: 12 / 100,
				header : '채취합계',
				hidden : true,
				align : 'center',
		    	menuDisabled : true,
		    	renderer : Ext.util.Format.numberRenderer('0,000')
			}, {
				dataIndex : 'mainBiooutQuantity',
				// width : 120,
				flex: 12 / 100,
				header : '반출합계',
				hidden : true,
				align : 'center',
		    	menuDisabled : true,
		    	renderer : Ext.util.Format.numberRenderer('0,000')
			}],
			listeners: {//row click 이벤트
				rowdblclick: function(grid, row, e) {
					var url = GLOBAL_CONTEXT_PATH+'/dementia/bioMaterial/residualView/residualViewDtl.view';
					url += '?pageNum=' + pageLoad.getParameter('pageNum');
					url += '&sub=' + pageLoad.getParameter('sub');
					url += '&biomatKind=' + row.data.biomatKind;
					url += '&biomatKindCode=' + row.data.biomatKindCode;
					url += '&objectId=' + row.data.objectId;
					url += '&name=' + row.data.name;
					url += '&biomatId=' + row.data.biomatId;
					url += '&takeAgency=' + row.data.takeAgency;
					url += '&takeAgencyCode=' + row.data.takeAgencyCode;
					url += '&biomatType=' + row.data.biomatType;
					url += '&biomatTypeCode=' + row.data.biomatTypeCode;
					url += '&birth=' + row.data.birth;
					url += '&outDate=' + outDate;
					url += '&mainTotQuantity=' + row.data.mainTotQuantity;
					url += '&mainTakeQuantity=' + row.data.mainTakeQuantity;
					url += '&mainBiooutQuantity=' + row.data.mainBiooutQuantity;
					if(searchCheck(document.getElementById('sizeKind').value)) url += '&sizeKind=' + document.getElementById('sizeKind').value;
					location.href = url; 
				 }
			}
		} ],
		bbar: new Ext.PagingToolbar({
        	id: 'residualViewMainList-grid-page',
            pageSize: pageSize,
            store: residualViewMainListStore,
			displayInfo: true,
			items: ['->'],
            prependButtons: true,
            plugins : [new Ext.ux.plugin.PagingToolbarResizer()],
			listeners : {
				change : function(p, pageData) {
					if (pageData.total == 0) {
						return;
					}
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

	residualViewMainListStore = Ext.create('Ext.data.Store', {
		storeId : 'Staging',
		autoLoad : false,
		pageSize : pageSize,
		proxy : {
			type : 'ajax',
			timeout : 100000000,
			url : GLOBAL_CONTEXT_PATH
					+ '/dementia/residualView/selectResidualViewMainList.do',
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
		id : 'outDate',
		cls : 'dateField',
        renderTo : 'outDateField',
        format : 'Ymd',
        value: Ext.Date.format(new Date(), 'Y-m-d'),
	    submitFormat : 'Ymd',
	    width : '100px',
        maxLength : 8,
        listeners: {
        	change: function(el,type) {
            }                         
        }
	});
	
	bioKindStore = Ext.create('Ext.data.Store', {
		storeId : 'biomatKindStore',
		autoLoad : true,
		proxy : {
				type : 'ajax',
				async : false,
				extraParams : {'bioCombo' : 'C014'},
				url : GLOBAL_CONTEXT_PATH
						+ '/dementia/bioTakeMgt/selectBioComboList.do',
				reader : {
					type : 'json',
					root : 'result'
				}	
		},
		listeners: {
	        load: function(store) {
//	            store.add({ cdnm: '전체', cdbs: '' });
	            store.insert(0, [{cdnm: '전체', cdbs: ''}]);
	        }
	    }
	});
	
	biomatTypeStore = Ext.create('Ext.data.Store', {
		storeId : 'biomatTypeStore',
		autoLoad : true,
		proxy : {
				type : 'ajax',
				async : false,
				url : GLOBAL_CONTEXT_PATH
						+ '/dementia/bioTakeMgt/selectBioComboList.do',
				reader : {
					type : 'json',
					root : 'result'
				}	
		},
		listeners: {
	        load: function(store) {
//	            store.add({ cdnm: '전체', cdbs: '' });
	            store.insert(0, [{cdnm: '전체', cdbs: ''}]);
	        }
	    }
	});
		
	Ext.create('Ext.form.ComboBox', {
	    id: 'biomatKind',
	    renderTo: 'biomatKindCombo',
		displayField: 'cdnm',
		valueField: 'cdbs',
		editable: false,
		mode : 'local',
		emptyText: '전체',
	    store: bioKindStore,
        listeners: {
        	'click': {
       		 element: 'el',
                delegate: '#biomatKind-bodyEl',
                fn: function(){
                	bioKindStore.load();
                }        		
        	},
        	'change': {
            	fn: function () {

            		bkCode = Ext.getCmp('biomatKind').getValue();

	            	var biomatTypeParams = { bioCombo : bkCode }
            		            		
	            	biomatTypeStore.removeAll();
	            	biomatTypeStore.proxy.extraParams = biomatTypeParams;
	            	biomatTypeStore.load();
	            	document.getElementById('biomatKindCode').value = Ext.getCmp('biomatKind').getValue();
	            	if(getCookieValue=='N'){
	            			Ext.getCmp('biomatType').setValue('');
		            		document.getElementById('biomatKindCode').value = Ext.getCmp('biomatKind').getValue();
	            	}
	            	getCookieValue='N';
            	}
            }                
        }
	});
	
	Ext.create('Ext.form.ComboBox', {
	    id: 'biomatType',
	    renderTo: 'biomatTypeCombo',
		displayField: 'cdnm',
		valueField: 'cdbs',
		editable: false,
		mode : 'local',
		emptyText: '전체',
		store: biomatTypeStore,
        listeners: {
        	'click': {
        		 element: 'el',
                 delegate: '#biomatType-bodyEl',
                 fn: function(){
                	 if(!searchCheck(Ext.getCmp('biomatKind').getValue())){
             			Ext.Msg.alert('알림', '검체시료종류를 먼저 선택 해주세요.'); 
             			return false;
             		}
                 }        		
        	},
        	'change': {
            	fn: function () {
            		if(getCookieValue=='N'){
            			document.getElementById('biomatTypeCode').value = Ext.getCmp('biomatType').getValue();
            		}
            	}
            }
        }
	});
	var cookieBiomatKind = document.getElementById('biomatKindCode').value;
	var cookieParams = { bioCombo : cookieBiomatKind }
	
	biomatTypeStore.proxy.extraParams = cookieParams;
		
	new residualViewMainListGrid();

	getCookieValue = pageLoad.getParameter('getCookieValue');
	if(getCookieValue=="Y"){
		// 쿠키에 저장되어있는 검색/페이지 값을 폼에 적용시킨다.
		applyCookieSearchValue();
		bioKindStore.load();
		doSearch();
	}else{
		// 쿠키 삭제
		removeCookieSearchValue();
	}

});

function doSearch() {
	bioKindStore.load();
	outDate = document.getElementById('outDate-inputEl').value;
	if(!searchCheck(outDate)){
		Ext.Msg.alert('알림', '기준일자를 입력하세요');
        return false;		
	}
	if(getCookieValue=='Y'){
		if(document.getElementById('biomatTypeCode').value == '전체'){
			biomatTypeStore.removeAll();
			document.getElementById('biomatTypeCode').value = '';
		}
		if(document.getElementById('biomatKindCode').value == '혈액'){
			document.getElementById('biomatKindCode').value = 'A001';
		}else if(document.getElementById('biomatKindCode').value == '뇌척수액'){
			document.getElementById('biomatKindCode').value = 'A019';
		}
		var biomatTypeParams = { bioCombo : document.getElementById('biomatKindCode').value }
		
		biomatTypeStore.removeAll();
		biomatTypeStore.proxy.extraParams = biomatTypeParams;
		biomatTypeStore.load();
	}
	
//	var biomatKind = Ext.getCmp('biomatKind').getValue();
	var biomatKind = document.getElementById('biomatKindCode').value;
	var objectId = document.getElementById('objectId').value;
	var name = document.getElementById('name').value;
	var biomatId = document.getElementById('biomatId').value;	
//	var biomatType = Ext.getCmp('biomatType').getValue();
	var biomatType = document.getElementById('biomatTypeCode').value;
	var takeAgency = document.getElementById('instiCode').value;
	var sizeKind = document.getElementById('sizeKind').value;
	
	if(biomatKind =="" && objectId =="" && name =="" && biomatId =="" && biomatType =="" && takeAgency ==""){
		Ext.Msg.alert('알림', '검색조건을 1개 이상 추가해주세요.');
        return false;		
	}
	searchParams = {
			outDate : outDate
			, biomatKind : biomatKind
			, objectId : objectId
			, name : name
			, biomatId : biomatId
			, biomatType : biomatType
			, takeAgency : takeAgency
			, sizeKind : sizeKind
	}
	
	residualViewMainListStore.proxy.actionMethods.read = "POST"
	residualViewMainListStore.proxy.extraParams = searchParams;
	
	var pageParams = {
		start : 0,
		limit : pageSize
	};

	residualViewMainListStore.on('load', function(store, records, successful){
//			searchCntCheck();
		});
	
	residualViewMainListStore.load({
		params : pageParams
	});
	schKeyField = '';
	 //쿠키값 저장
	saveCookieSearchValue();
	biomatTypeStore.load();
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
					width : 350,
					listeners:{
						change : function( obj, value, eOpts ){
							obj.setRawValue(value.replace(/C:\\fakepath\\/g, ''));
						}
					}
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

function searchCntCheck(){
	if(residualViewMainListStore.getCount() == 0){
		Ext.Msg.alert('알림', '조회된 데이터가 없습니다.');
	}
}

function firstResidualExcelSampleDownload() {
	location.href = GLOBAL_CONTEXT_PATH + '/downFile.view?dir=file.sample.dir&fileName=firstResidualReg.xlsx';
}

function excelUploadFile(){
	var excelUploadWin = new ExcelUploadPanel();
	excelUploadWin.show();
}

ExcelUploadPanel = function(){
	ExcelUploadPanel.superclass.constructor.call(this, {
		id: 'ExcelDataFile-upload',
		closeAction: 'destroy',
		title: '잔여량 초기등록',
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
					id: 'residualFile',
					name: 'residualFile',
					fieldLabel: '업로드파일 *',
					blankText: '*.xls 파일을 선택하세요',
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
		            	
		            	var arr = document.getElementById("residualFile-inputEl").value.split(".");
		            	var arrSize = arr.length;
		            	if(!searchCheck(arr[0])){
		            		Ext.Msg.alert('알림', '업로드할 *.xlsx 파일을 선택해주세요.');
		            		return false;
		            	}
		            	
		            	if(arr[arrSize-1].toUpperCase() != "XLSX"){
		            		Ext.Msg.alert('알림', '지원하지 않는 파일 확장자입니다.');
		            		return false;
		            	}	            	
		            			            	
		            	if(ufpo.isValid()){
		            		Ext.MessageBox.show({
		            		       msg: 'Excel 데이터 업로드 중..',
		            		       progressText: '잠시만 기다려주세요..',
		            		       width:300,
		            		       wait:true,
		            		       waitConfig: {interval:200},
		            		       icon:'ext-mb-download', 
		            		       animEl: 'buttonID'
		            		   });	
		            		ufpo.submit({
			                	url: GLOBAL_CONTEXT_PATH + '/dementia/residualView/firstResidualUpload.do',
			                    waitMsg: 'Excel 데이터 업로드 중..',
	                              waitTitle : '잠시만 기다려주세요..',
	                              success: function(response, opts){
	                            	  Ext.MessageBox.hide();
								      var obj = Ext.decode(response.responseText);
								      var json = Ext.util.JSON.decode(opts.response.responseText);
	                                  Ext.Msg.show({
	                                      title: '알림',
	                                      msg: 'Excel 파일 업로드를 성공하였습니다.', 
	                                      buttons: Ext.Msg.OK,
	                                      fn: function(btn, text) {
	                                          if (btn == 'ok') {
	                                        	  Ext.getCmp('ExcelDataFile-upload').close();
	                                          }
	                                      }
	                                  });
	                                  genomeInfoListStore.load();
	                              },
	                              failure : function(response, opts) {
	                            	  Ext.MessageBox.hide();
	                              	var json = Ext.util.JSON.decode(opts.response.responseText);
	                                  Ext.Msg.alert('알림', json.message);
	                              }
			                });
		                }
		            }
		        },{
					text: '돌아가기',
					handler: function(){
						Ext.getCmp('ExcelDataFile-upload').close();
						
					}
				}]
			})
		]
	});
};

Ext.extend(ExcelUploadPanel, Ext.Window, {
});

function searchCheck(obj){
	var check = $.trim(obj);
	if(check == undefined || check == "" || check == "선택"){
		return false;
	}
	return true;
}

function doSearchListReset() {
	
	//페이징 리셋
	var paging = Ext.getCmp('residualViewMainList-grid-page');
	paging.plugins[0].recordsPerPageCmb.setValue(pageSize);
	paging.store.pageSize = pageSize;
	paging.store.currentPage=1;
	
	doReset();
	Ext.getCmp("outDate").setValue(Ext.Date.format(new Date(), 'Y-m-d'));
	
	Ext.getCmp('residualViewMainListGrid-grid').getView().emptyText="";
	residualViewMainListStore.removeAll();
	Ext.getCmp('residualViewMainListGrid-grid').getView().refresh();
	Ext.getCmp('residualViewMainListGrid-grid').getView().emptyText='<div class="x-grid-empty">표시할 데이터가 없습니다.</div>';
}

function goFirstResidual(){
	location.href=makeUrl('/dementia/bioMaterial/residualView/firstResidual.view');
}
