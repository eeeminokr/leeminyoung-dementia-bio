var DataIntegration = {};
var pageSize = parameter['pageSize'];
var dataIntegrationListStore;
var diagNmCombo1;
var diagNmComboStore1;
var dataIntegrationListPanel;
var integrationPanel;
var addViewYn="N";
var sm =new Ext.selection.CheckboxModel({headerWidth:40});
var searchParams = {};
var diagNmStore;
var diagNmSubStore;
var cloneNum = 0;
var selectObj = 0;
var noDiagSearchCfg = getConfigUI('noDiagSearch');
var mciBGColorStore;
var excelDownGrade;
var diagLastSeqData;

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

DataIntegration.DataIntegrationListPanel  = function() {
	DataIntegration.DataIntegrationListPanel.superclass.constructor.call(this, {
		xtype : 'grid',
		id: 'DataIntegrationList-grid',
		region: 'center',
		renderTo : 'ContentsDiv',
		height : '585px',
		store: dataIntegrationListStore,
        autoScroll: true,
        columnLines: true,
        loadMask: true,
        selModel: sm,
        columns : [{
				dataIndex : 'objectId',
				header : 'OBJECT ID',
				width : 80,
				align : 'center',
				cls : 'column-header-title',
				//sortable: false,
				hidden : true,
				menuDisabled : true
			},{
				dataIndex : 'subjectId',
				header : 'SUBJECT ID',
				width : 84,
//				flex : 5/100,
				align : 'center',
				cls : 'column-header-title',
				sortable: false,
				resizable : false,
				menuDisabled : true
			},{
				dataIndex : 'patientSex',
				header : '성별',
				width : 50,
				align : 'center',
				cls : 'column-header-title',
				sortable: false,
				menuDisabled : true,
				hidden : true,
				renderer : function(value,metadata,record,rowIndex,colIndex,view ){
					if(value == 'F') return "여";
					else return "남";
				}
			},{
				dataIndex : 'age',
				header : '연령',
				width : 50,
//				flex : 2/100,
				align : 'center',
				cls : 'column-header-title',
				sortable: false,
				resizable : false,
				menuDisabled : true
			},{
				dataIndex : 'petResult',
				header : 'PET결과',
				width : 90,
//				flex : 7/100,
				align : 'center',
				cls : 'column-header-title',
				sortable: false,
				menuDisabled : true,
				hidden : true,
				renderer: function(value, metaData, record, rowIdx, colIdx, store) {
					metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
					return value;
				}
			},{
				dataIndex : 'diagLastSeq',
				header : '진단<br/>횟수',
				width : 50,
//				flex : 2/100,
				align : 'center',
				cls : 'column-header-title',
				sortable: false,
				resizable : false,
				menuDisabled : true
			},{ 
				dataIndex : 'diagNm1',
				header : '임상진단',
				align : 'left',
				resizable : false,
				cls : 'column-header-title',
				width : 332,
//				flex : 18/100,
				sortable: false,
				menuDisabled : true,
				renderer : function(value,metadata,record,rowIndex,colIndex,view ){
					metadata.tdCls = 'grid-cell-pd';
					var dupSeq = record.data.seqDupNum; //중복차수
					var rowDupNum = record.data.rowDupNum; //중복이름,중복차수
					var cnt=0; 
					var diagSeq = record.data.diagSeq;	//차수
					var diagNm2 = record.data.diagNm2;
					var diagLastSeq = record.data.diagLastSeq; //최종차수
					var diagAge = record.data.diagAge; //진단나이
					var diagDate = record.data.diagDate; //진단년월
					var maxSeq = record.data.seqMaxNum;	//검색결과에서 최대차수
					var diagNmBgColor = record.data.diagNmBgColor; // 진단명 배경색상
					var diagNmColor = record.data.diagNmColor; // 진단명 폰트색상
					var snsbStr = record.data.snsb;
					var returnStr="";
					var valArr =[];
					var seqArr =[];
					var nmArr2 =[];
					var ageArr =[];
					var dateArr =[];
					var rowdupArr =[];
					var bgColorArr =[];
					var fontColorArr =[];
					if(rowDupNum.indexOf(',')!= -1){
						rowdupArr = rowDupNum.split(',');
					}else{
						rowdupArr.push(rowDupNum); 
					}
					valArr = value.split(',');
					seqArr = diagSeq.split(',');
					nmArr2 = diagNm2.split(',');
					ageArr = diagAge.split(',');
					dateArr = diagDate.split(',');
					bgColorArr = diagNmBgColor.split(',');
					fontColorArr = diagNmColor.split(',');
					
					var retArray = new Array();
					var chkN = 0;
					for(var i=0 ; i < valArr.length ; i++){
						cnt += 1;
						var str = valArr[i];
						var nmStr2 = nmArr2[i]; 
						var l = seqArr[i];
						var rowCnt = parseInt(rowdupArr[cnt-1]);
						var spanStr = "";
						var ageDateStr = "";
						var styleStr = "";
						if(str==""){ 
//							if(snsbStr==""){
								str="미진단";
//							}else{
//								str="진단중";
//							}
							ageDateStr ="'";
						}else{
							ageDateStr = "\n진단나이: "+ageArr[chkN]+"\n진단년월: "+dateArr[chkN].substr(0,6)+"'";
						}
						styleStr = "style='background-color:"+bgColorArr[chkN]+";color:"+fontColorArr[chkN]+";'";
						spanStr += "<span class='span-inner-name-cell '>";
						var title ="";
						
						//같은차수, 같은 진단자 처리
						if(str.indexOf('|')!= -1){
							strArr = str.split('|');
							strNmArr2 = nmStr2.split('|');
							str = "";
							
							
							for(var s in strArr){
								if(s!=0){
									spanStr += "<br />";
									chkN++;
								}
								str = strArr[s];
								if(str==""){ 
//									if(snsbStr==""){
										str="미진단";
//									}else{
//										str="진단중";
//									}
									ageDateStr ="'";
								}else{
									ageDateStr = "\n진단나이: "+ageArr[chkN]+"\n진단년월: "+dateArr[chkN].substr(0,6)+"'";
								}
								styleStr = "style='background-color:"+bgColorArr[chkN]+";color:"+fontColorArr[chkN]+";'";
								if(strNmArr2[s]!="") title="title='원인: "+strNmArr2[s];
								else if(strArr[s]!="" && strArr[s] !="&nbsp;") title="title='원인: 없음";
								title += ageDateStr;
								
								spanStr += "<span "+title+" class='bg_gray' "+styleStr+">"+str;
								spanStr += "</span>"; 
							}
						}else{
							
							if(nmStr2!="") title="title='원인: "+nmStr2;
							else if(str!="" && str !="&nbsp;") title="title='원인: 없음";
							title += ageDateStr;
							spanStr += "<span "+title+" class='bg_gray' "+styleStr+">"+str ;
							spanStr += "</span>";
							for(var j=0 ; j<(rowCnt-1);j++){
								spanStr += "<br />&nbsp;";
							}
						}
						spanStr += "</span>";
						
						if(retArray[cnt-1] == undefined) retArray[cnt-1] ="";
						retArray[cnt-1] += spanStr;
						//다음 차수로 넘어가기 전 빈칸 채우기
						if(seqArr[(i+1)] == undefined || l.substr(0,1) != seqArr[(i+1)].substr(0,1)){
							if(cnt < dupSeq){
								for(var j=cnt ; j<dupSeq ; j++){	//진단명 빈칸
									var strT = "<span class='span-inner-name-cell '><span class='bg_blank'>&nbsp;</span></span>";
									if(retArray[j] == undefined) retArray[j] ="";
									retArray[j] += strT;
								}
							}
							cnt=0;
						}
						chkN++;
					}
					for(s in retArray){
						if(s!=0) returnStr += "<br />";
						returnStr += retArray[s];
					}
					
					return returnStr;
						
        		}
			},{
				dataIndex : 'cdrStep',
				header : 'Global CDR',
				width : 128,
//				flex : 7/100,
				align : 'left',
				cls : 'column-header-title',
				sortable: false,
				menuDisabled : true,
				resizable : false,
				renderer: function(value, metaData, record, rowIdx, colIdx, store) {
					//metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
					var diagSeq = record.data.beforeDiagSeq;
					var diagLastSeq = record.data.diagLastSeq; //최종차수
					var valArr =[];
					var seqArr =[];
					var bgColor = "";
					var resultStr = "";
					
					if(diagSeq.indexOf(',')!= -1){
						valArr = value.split(',');
						seqArr = diagSeq.split(',');
					}else{
						valArr.push(value);
						seqArr.push(diagSeq);
					}
					var resultArr= new Array();
					var cdrReClsArr= new Array();
					for(var i=0; i< valArr.length; i++){
						var num=seqArr[i].substr(0,1);
						if(resultArr[(num-1)]==undefined){
							resultArr[(num-1)]=valArr[i];
							if(valArr[i]!=""){
								if(valArr[i] == 0){
									cdrReClsArr[(num-1)] = "bg_number_green";
								}else if(valArr[i] == 0.5){
									resultArr[(num-1)] = ".5";
									cdrReClsArr[(num-1)] = "bg_number_orange";
								}else if(valArr[i] >= 1){
									cdrReClsArr[(num-1)] = "bg_number_red" ;
								}
							}
							if(cdrReClsArr[(num-1)]==undefined){
								cdrReClsArr[(num-1)] = "bg_number";
							}
						}
					}
					var bgCls = "bg_number";
					for(var j=0; j<diagLastSeq; j++){
						if(resultArr[j]!=""){
							bgCls =cdrReClsArr[j];
							resultStr+="<span class='"+bgCls+"' >"+resultArr[j]+"</span>";
						}else{
							resultStr+="<span class='bg_number_N' >-</span>";
						}
					}
					return resultStr;
					
					
				}
			}, {
				text: '진단자',
				width : 126,
//				flex : 6/100,
				dataIndex : 'doctorName',
				resizable : false,
				cls : 'column-header-title',
				menuDisabled : true,
				sortable: false,
				renderer : function(value,metadata,record,rowIndex,colIndex,view ){
						metadata.tdCls = 'grid-cell-pd';
					
						var dupSeq = record.data.seqDupNum; //중복차수
						var rowDupNum = record.data.rowDupNum; //중복이름,중복차수
						var cnt=0; 
						var diagSeq = record.data.diagSeq;	//차수
						var diagLastSeq = record.data.diagLastSeq; //최종차수
						var maxSeq = '6';	//검색결과에서 최대차수
						
						var returnStr="";
						var valArr =[];
						var seqArr =[];
						var rowdupArr =[];
						if(rowDupNum.indexOf(',')!= -1){ //중복차수 확인
							rowdupArr = rowDupNum.split(',');
						}else{
							rowdupArr.push(rowDupNum); 
						}
						if(diagSeq.indexOf(',')!= -1){
							valArr = value.split(',');
							seqArr = diagSeq.split(',');
						}else{
							valArr.push(value);
							seqArr.push(diagSeq);
						}
						returnStr += "<div class='div-inner-cell' >";
							
						for(var i=0 ; i < valArr.length ; i++){
							cnt += 1;
							var str = valArr[i];
							var rowCnt = parseInt(rowdupArr[cnt-1]);
							if(str=="") str="&nbsp;";
							if(str.indexOf('|')!= -1){
								
								strArr = str.split('|');
								str = "";
								for(var s in strArr){
									if(s!=0) str += "<br />";
									str += strArr[s]; 
								}
								if(strArr.length<rowCnt){
									for(var j=strArr.length ; j<(rowCnt);j++){
										str += "<br />&nbsp;";
									}
								}
							}else{
								for(var j=0 ; j<(rowCnt-1);j++){
									str += "<br />&nbsp;";
								}
							}
							var l = seqArr[i];
							
							returnStr += "<span class='span-inner-cell'>"+str+"</span>";
							
							//한 차수의 마지막이면 진행
							if(seqArr[(i+1)] == undefined || l.substr(0,1) != seqArr[(i+1)].substr(0,1)){
								//빈값 넣어주기
								if(dupSeq != cnt){
									for(var j=cnt ; j<dupSeq ; j++){
										returnStr += "<span class='span-inner-cell' >&nbsp;</span>"
									}
								}
								cnt=0;
								//다음 차수가 존재하면 <div> 추가
								if(seqArr[(i+1)] != undefined){
									returnStr += "</div><div class='div-inner-cell'>";
								}else{
									returnStr += "</div>";
								}
							}
						}
						
						
						//차수 빈칸 채우기
						if(diagLastSeq<maxSeq){
							for( var k = (diagLastSeq); k<maxSeq; k++){
								returnStr += "<div class='div-inner-cell' >";
								for(var kk=0; kk < dupSeq; kk++){
									returnStr += "<span class='span-inner-cell' >&nbsp;"
									for(var jj=0 ; jj<(rowdupArr[kk]-1);jj++){
										returnStr += "<br />&nbsp;";
									}
									returnStr += "</span>";
								}
								returnStr += "</div>";
							}
						}
						return returnStr;
        		}
					
			},{
				text: '신경심리검사',
				cls : 'column-header-container',
//				flex : 14/100,
				menuDisabled : true,
				columns : [{
					dataIndex : 'mmse',
					header : 'MMSE',
					width : 136,
//					flex : 7/100,
					cls : 'column-top',
					align : 'left',
					resizable : false,
					menuDisabled : true,
					sortable: false,
					renderer : checkDataYN
				},{
					dataIndex : 'snsb',
					header : 'SNSB',
					width : 136,
//					flex : 7/100,
					align : 'left',
					resizable : false,
					menuDisabled : true,
					sortable: false,
					renderer : checkDataYN
				}]
			},{
					text:'MRI',
					dataIndex : 'mri',
					header : 'MRI',
					width : 120,
					cls : 'column-header-title',
//					flex : 6/100,
					resizable : false,
					//width : 180,
					align : 'left',
					sortable: false,
					menuDisabled : true,
					renderer : function (value,metadata,record,rowIndex,colIndex,view ){
							var resultStr="";
							var bgCls="";
							
							var valArr = value.split(',');
							if(valArr[0]=="") return '';
							for(var i=0; i< valArr.length; i++){
								var mgnVal = valArr[i].split('|')[1];
								bgCls = "bg_number";
								//자기세기 1.5 인 경우 연한보라색
								if(mgnVal=="O"){
									bgCls = "bg_number_purple";
								}
								if(i !=0 && i%5==0) resultStr+= "<br/>";
								resultStr+="<span class='"+bgCls+"' >"+valArr[i].split('|')[0]+"</span>";
							}
							return resultStr;
					}
					
				},{
				text: 'FBB PET',
				menuDisabled : true,
				cls : 'column-header-container',
//				flex : 16/100,
				columns : [{
					dataIndex : 'pet',
					header : '판독의',
					width : 85,
//					flex : 6/100,
					align : 'left',
					resizable : false,
					sortable: false,
					menuDisabled : true,
					renderer : valueSplit
				},{
					dataIndex : 'petSuvr',
					header : 'SUVR',
					width : 85,
//					flex : 4/100,
					align : 'center',
					resizable : false,
					sortable: false,
					menuDisabled : true,
					renderer : valueSplit2
						
					
				},{
					dataIndex : 'petAiSuvr',
					header : 'SUVR-A',
					width : 85,
//					flex : 4/100,
					align : 'center',
					resizable : false,
					sortable: false,
					menuDisabled : true,
					renderer : valueSplit3
				}]
			},{
				dataIndex : 'eduLevel',
				header : '학력',
				width : 52,
//				flex : 2/100,
				align : 'center',
				cls : 'column-header-title',
				menuDisabled : true,
				resizable : false,
				sortable: false
			},{
				text: '유전체',
				menuDisabled : true,
				cls : 'column-header-container',
//				flex : 6/100,
				columns : [{
					dataIndex : 'genomeChipNm',
					header : 'Kchip',
					width : 62,
//					flex : 3/100,
					align : 'center',
					resizable : false,
					sortable: false,
					menuDisabled : true,
					renderer : function (value,metadata,record,rowIndex,colIndex,view ){
						var resultStr="";
						var bgCls="";
						var valArr = value.split(',');
	
						if(valArr[0]=="") return '';
						
						
						for(var i=0; i< valArr.length; i++){
							bgCls = "bg_number";
							if(valArr[i] == "1.1"){
								bgCls = "bg_number_purple";
							}
							resultStr+="<span class='"+bgCls+"' >"+valArr[i]+"</span>";
						}
						
						return resultStr;
					}
				},{
					dataIndex : 'apoeCd',
					header : 'APOE',
					width : 62,
//					flex : 3/100,
					align : 'center',
					resizable : false,
					sortable: false,
					menuDisabled : true,
					renderer : function (value,metadata,record,rowIndex,colIndex,view ){
						var resultStr='';
						var str1=value.substr(0,1);
						var str2=value.substr(2,1);
						var mciBGColorRec = mciBGColorStore.getAt(0);
						var mciBgColor = mciBGColorRec.get('desc2');
						
						if(value=='') return '';
						
						if(str1 == '4'){
							resultStr += "<span style='color:" + mciBgColor + ";'>"+str1+"</span>" +'/';
						}else{
							resultStr += str1 + '/';
						}
						
						if(str2 == '4'){
							resultStr += "<span style='color:" + mciBgColor + ";'>"+str2+"</span>";
						}else{
							resultStr += str2;
						}
						return resultStr;
					}
				}]
			},{
				text: '검체시료',
				menuDisabled : true,
				cls : 'column-header-container',
//				flex : 12/100,
				columns : [{
					dataIndex : 'abo',
					header : 'ABO',
					width : 62,
//					flex : 3/100,
					align : 'center',
					resizable : false,
					sortable: false,
					menuDisabled : true
					
				},{
					dataIndex : 'blood',
					header : '혈액',
					width : 120,
//					flex : 6/100,
					align : 'left',
					resizable : false,
					sortable: false,
					menuDisabled : true,
					renderer : valueSplit
					
				},{
					dataIndex : 'csf',
					header : 'CSF',
					width : 62,
//					flex : 3/100,
					align : 'left',
					resizable : false,
					sortable: false,
					menuDisabled : true,
					renderer : valueSplit
				}]
			},{
			dataIndex : 'brainwave',
			header : 'EEG/ERP',
			width : 62,
//			flex : 3/100,
			align : 'left',
			cls : 'column-header-title',
			menuDisabled : true,
			sortable: false,
			resizable : false,
			renderer : valueSplit
		}],
			bbar: new Ext.PagingToolbar({
	        	id: 'DataIntegrationList-grid-page',
	            pageSize: pageSize,
	            store: dataIntegrationListStore,
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
	        }),
			listeners: {
    				afterrender : function(p) {
    				}
        	}
	}); // End Of Constructor
};

Ext.extend(DataIntegration.DataIntegrationListPanel, Ext.grid.GridPanel, {
});
//////////////////////////////////////////////////////////////////////////////////////////////
/*
 * Ext.onReady()
 *
 */
Ext.onReady(function(){
	Ext.QuickTips.init();
	
	//진단횟수 콤보박스
	Ext.Ajax.request({
 		url : GLOBAL_CONTEXT_PATH + '/dementia/dataIntegration/dataIntegrationListMaxSeq.do',
 	    method : 'POST',
 	   params :{
 		   grade : 'G1',
           limit: 0   
        },
 	    timeout : 100000000,
        success : function(response, opts) {
        	
        	var obj = Ext.decode(response.responseText);
        	if(obj.success){
	        	var maxSeq = obj.maxSeq;
	        	diagLastSeqData = [];
	        	for(var i=0 ; i<maxSeq; i++){
	        		diagLastSeqData.push([(i+1), (i+1)<3?(i+1)+'회':(i+1)+'회 이상']);
	        		if((i+1) == maxSeq){
	        			Ext.create('LovCombo',{    //다중선택콤보
	        	    		id : 'diagLastSeqCombo',
	        	    		//cls : 'selectInstComboCls',
	        	    		width : 150,
	        	    		style : 'display:inline;vertical-align:middle;border:none;',
	        	        	editable: false, 
	        	        	emptyText:'전체',
	        		        	queryMode: 'local',
	        		        	hideOnSelect : false,
	        		        	triggerAction : 'all',
	        		            renderTo:'diagLastSeqSpan',
	        		            valueField:'seqVal',
	        		            displayField:'seqNm',
	        		            store: Ext.create('Ext.data.ArrayStore', {
	        		                fields: ['seqVal', 'seqNm'],
	        		                data : diagLastSeqData
	        		            })
	        		        });
	        				//전체 선택		
	        				//Ext.getCmp("diagLastSeqCombo").select(Ext.getCmp("diagLastSeqCombo").getStore(). collect (Ext.getCmp("diagLastSeqCombo").valueField));
	        			
//	        			Ext.create('Ext.form.ComboBox', {	//단일선택 콤보
//	                	    id: 'diagLastSeqCombo',
//	                	    width : 150,
//	        	    		style : 'display:inline;vertical-align:middle;border:none;border:0px;width:146px;',
//	                	    renderTo: 'diagLastSeqSpan',
//	                	    queryMode: 'local',
//        		        	hideOnSelect : false,
//        		        	triggerAction : 'all',
//	                		displayField: 'seqVal',
//	                		valueField: 'seqVal',
//	                		editable: false,
//	                		mode : 'local',
//	                		emptyText: '전체',
//        		            store: Ext.create('Ext.data.ArrayStore', {
//        		                fields: ['seqVal'],
//        		                data : diagLastSeqData
//        		            })
//	                	});
	        		}
	        	}
        	}
        },
        failure : function(){
        },
        callback : function() {
        }
 	});	
	//진단횟수 콤보박스 end	
	var downYnVal = document.getElementsByClassName('downYn')[0].value;
	if(downYnVal == "Y"){
		var contextMenu = new Ext.menu.Menu({
			renderTo : 'dropdown',
			style : 'margin-top : 25px',
			items : [{
				text : '선택다운로드',
				style : 'text-align:left',
				handler : function() {
						excelDownload();
					}
				},{
					text : '전체다운로드',
					style : 'text-align:left',
					handler : function() {
						excelDownloadAll();
					}
				}]
			});
			
		$('button#dropdown').click(function() {
		    	contextMenu.show(this);
		});
		
		//통합 다운로드
		if(userGrade != 'G4' && userGrade != 'G5'){
			var integrateContextMenu = new Ext.menu.Menu({
				renderTo : 'integrateDropdown',
				style : 'margin-top : 25px',
				items : [{
					text : '선택다운로드',
					style : 'text-align:left',
					handler : function() {
						integrateDownload('select');
					}
				},{
					text : '전체다운로드',
					style : 'text-align:left',
					handler : function() {
						integrateDownload('all');
					}
				}]
			});
			
			$('button#integrateDropdown').click(function() {
				integrateContextMenu.show(this);
			});
		}
	}
	
	// MMSE/미진단 검색 권한 확인
	if(noDiagSearchCfg[0] == 'N' || !checkGrade(noDiagSearchCfg[1],userGrade)){
		$(".noDiagSearchCls").hide();
	}
		
	dataIntegrationListStore = Ext.create('Ext.data.Store', {
		storeId : 'Staging',
		autoLoad : false,
		pageSize : pageSize,
		proxy : {
			type : 'ajax',
			url : GLOBAL_CONTEXT_PATH
					+ '/dementia/dataIntegration/dataIntegrationList.do',
			reader : {
				type : 'json',
				root : 'result',
				totalProperty: 'total'
			}

		},
		listeners : {
			load : function(store) {
//				if(store.data.length !=0){  //동적 컬럼 너비 미사용으로인한 주석처리 SS.KANG 2020.09.14
//					var maxNum = store.data.items[0].data.seqMaxNum;
//					var nmMaxStr = store.data.items[0].data.diagNmMaxLen;
//					var maxMri = store.data.items[0].data.maxMri;
//					var maxPet = store.data.items[0].data.maxPet;
//					var maxBlood = store.data.items[0].data.maxBlood;
//					var maxCsf = store.data.items[0].data.maxCsf;
//					var maxBrainwave = store.data.items[0].data.maxBrainwave;
//					
//					var nmsize = 55 * Number(maxNum);
//					var grid = Ext.getCmp('DataIntegrationList-grid');
//					//if(maxNum < 2 )maxNum = 2;
//					grid.columns[6].setWidth((nmsize));
//					grid.columns[8].setWidth((20*maxNum)+4); 
//					//5차 이상이면 width 값 변경
//					var mmWidth = (maxNum > 3)?(23*maxNum)+4 : 100;
//					var cdrWidth = (maxNum > 3)?(21*maxNum+2) : 65;
//					grid.columns[7].setWidth(cdrWidth);
//					grid.columns[9].setWidth(mmWidth);
//					grid.columns[10].setWidth(mmWidth);
//					grid.columns[11].setWidth((23*maxMri)+4);
//					grid.columns[12].setWidth((23*maxPet)+4);
//					grid.columns[16].setWidth((23*maxBlood)+4);
//					grid.columns[17].setWidth((23*maxCsf)+4);
//					grid.columns[18].setWidth((23*maxBrainwave)+4);
//					Ext.getCmp('DataIntegrationList-grid').getView().refresh();
//				}			
			}
		}
	});
	new DataIntegration.DataIntegrationListPanel();
	//doSearch();
	
	//추가조회부분 숨기기
	$(".addView").hide();
	//추가조회 조건 END
	$("select[name=condition]").eq(0).val("end");

	 //스크롤 여부 확인
	 if($("html").hasScrollBar()){
	     $(".btn_add").addClass('scroll_on');
	     
	 }
	 
	 //증세,원인 추가조회
	 diagNmStore = Ext.create('Ext.data.Store', {
			autoLoad : true,
			proxy : {
					type : 'ajax',
					async : false,
					url : GLOBAL_CONTEXT_PATH
							+ '/dementia/commoninfo/selectNRCDcodeList.do',
					reader : {
						type : 'json',
						root : 'result'
					},
					extraParams : {category : 'A001'},
			},
			
			listeners : {
				load : function(store) {
				}
			}
			
		});
	 
	  diagNmSubStore = Ext.create('Ext.data.Store', {
			autoLoad : true,
			proxy : {
					type : 'ajax',
					async : false,
					url : GLOBAL_CONTEXT_PATH
							+ '/dementia/commoninfo/selectNRCDcodeList.do',
					reader : {
						type : 'json',
						root : 'result'
					},
					extraParams : {category : 'A002'}
			},
			
			listeners : {
				load : function(store) {
				}
			}
			
		});
		
		Ext.define('LovCombo',{
		    extend:'Ext.form.field.ComboBox',
		    initComponent:function() {
		    	var me = this;
		   		Ext.apply(me,{
		    		userCls:'lovcombo',
		            multiSelect:true,
		            remoteSort : true,
		            listConfig:{
		                userCls:'lovcombo'
		            }
		            
				});
		    	me.callParent(arguments);
			}
		});

		Ext.util.CSS.createStyleSheet([
		    '.lovcombo .x-boundlist-item::before { font:16px FontAwesome; padding-right:8px; content:"\\f096" }',
		    '.lovcombo .x-boundlist-item.x-boundlist-selected::before { content:"\\f046" }'
		].join(''),"x");
		
		Ext.application({
		    name : 'Fiddle',
		    launch : function() {
		    	Ext.create('LovCombo',{
		    		id : 'selectDiagNmCombo',
		    		width : 150,
		    		style : 'display:inline;vertical-align:middle;border:none;',
		        	editable: false, 
		        	emptyText:'증세',
		        	cls : 'selectDiagNmComboCls',
		        	hideOnSelect : false,
		        	triggerAction : 'all',
		        	queryMode: 'local',
		            renderTo:'condiDiagNm',
		            valueField:'codeName',
		            displayField:'codeName',
		            store: diagNmStore,
		        });
		    	Ext.create('LovCombo',{
		    		id : 'selectDiagNmSubCombo',
		    		cls : 'selectDiagNmSubComboCls',
		    		width : 150,
		    		style : 'display:inline;vertical-align:middle;border:none;',
		        	editable: false, 
		        	emptyText:'원인',
		        	queryMode: 'local',
		        	hideOnSelect : false,
		        	triggerAction : 'all',
		            renderTo:'condiDiagNmSub',
		            valueField:'codeName',
		            displayField:'codeName',
		            store: diagNmSubStore,
		        })
		    }
		 }); 
		 // 증세,원인 추가조회 end
		
		 //기관 콤보박스 
		 var instStore = Ext.create('Ext.data.Store', {
				autoLoad : true,
				proxy : {
						type : 'ajax',
						async : false,
						url : GLOBAL_CONTEXT_PATH
								+ '/dementia/commoninfo/selectCodeDetailSearchCondition.do',
						reader : {
							type : 'json',
							root : 'result'
						},
						extraParams : {kdcd : 'D003'},
				},
				
				listeners : {
					load : function(store) {
						//전체 선택 삭제
						//Ext.getCmp("selectInstCombo").select(Ext.getCmp("selectInstCombo").getStore(). collect (Ext.getCmp("selectInstCombo").valueField));
					    
					
					}
				}
				
			});
			Ext.create('LovCombo',{
	    		id : 'selectInstCombo',
	    		//cls : 'selectInstComboCls',
	    		width : 150,
	    		style : 'display:inline;vertical-align:middle;border:none;',
	        	editable: false, 
	        	emptyText:'전체',
	        	queryMode: 'local',
	        	hideOnSelect : false,
	        	triggerAction : 'all',
	            renderTo:'instSpan',
	            valueField:'cdbs',
	            displayField:'cdnm',
	            store: instStore,
	        });
			
		//기관 콤보박스 end
			

	 
		//진단자 콤보박스 
		 var diagDoctorStore = Ext.create('Ext.data.Store', {
				autoLoad : true,
				proxy : {
						type : 'ajax',
						async : false,
						url : GLOBAL_CONTEXT_PATH
								+ '/dementia/commoninfo/selectCodeDetailSearchCondition.do',
						reader : {
							type : 'json',
							root : 'result'
						},
						extraParams : {kdcd : 'D001'},
				},
				
				listeners : {
					load : function(store) {
						//권한에 따라 진단자 콤보값 변경 
						var display;
						for(var i=0; i< store.data.length; i++){
							if(userGrade == "G1" || userGrade == "G2"){
								display = store.data.items[i].data.cdbs +" ("+store.data.items[i].data.cdnm+")";
							}else{
								display = store.data.items[i].data.cdbs;
							}
							store.data.items[i].data.display = display;
						}
					}
				}
				
			});
			Ext.create('LovCombo',{
	    		id : 'selectDiagDoctorCombo',
	    		//cls : 'selectInstComboCls',
	    		width : 150,
	    		style : 'display:inline;vertical-align:middle;border:none;',
	        	editable: false, 
	        	emptyText:'전체',
	        	queryMode: 'local',
	        	hideOnSelect : false,
	        	triggerAction : 'all',
	            renderTo:'diagDoctorSpan',
	            valueField:'cdbs',
	            displayField:'display',
	            store: diagDoctorStore,
	        });
			
		//진단자 콤보박스 end
			
		//추가조회 콤보박스 
		Ext.create('LovCombo',{
    		id : 'condiDiagSelectCombo0',
    		cls : 'condiDiagSelectComboCls',
    		width : 150,
    		style : 'display:inline;vertical-align:middle;border:none;',
        	editable: false, 
        	emptyText:'진단구분',
        	queryMode: 'local',
        	hideOnSelect : false,
        	triggerAction : 'all',
            renderTo:'condiSelectSpan',
            valueField:'value',
            displayField:'display',
            store: Ext.create('Ext.data.ArrayStore', {
                fields: ['display','value'],
                data : [['최초진단','firstDiag'],['중간진단','middleDiag'],['최종진단','lastDiag']]
            })
        });
		//진단자 콤보박스 end
		
		/** PET결과, Kchip, 혈액형, CDR 콤보박스 추가 **/
		//PET결과 콤보박스 
		Ext.create('LovCombo',{
    		id : 'petResultCombo',
    		//cls : 'selectInstComboCls',
    		width : 150,
    		style : 'display:inline;vertical-align:middle;border:none;',
        	editable: false, 
        	emptyText:'전체',
	        	queryMode: 'local',
	        	hideOnSelect : false,
	        	triggerAction : 'all',
	            renderTo:'petResultSpan',
	            valueField:'value',
	            displayField:'value',
	            store: Ext.create('Ext.data.ArrayStore', {
	                fields: ['value'],
	                data : [['+'],['-'],['미판독']]
	            })
	        });
		//PET결과 콤보박스 end
		
		//Kchip 콤보박스 
		 var kChipStore = Ext.create('Ext.data.Store', {
				autoLoad : true,
				proxy : {
						type : 'ajax',
						async : false,
						url : GLOBAL_CONTEXT_PATH
								+ '/dementia/commoninfo/selectCodeDetailSearchCondition.do',
						reader : {
							type : 'json',
							root : 'result'
						},
						extraParams : {kdcd : 'C004'},
				},
				
				listeners : {
					load : function(store) {
					
					}
				}
				
			});
			Ext.create('LovCombo',{
	    		id : 'selectKChipCombo',
	    		//cls : 'selectInstComboCls',
	    		width : 100,
	    		style : 'display:inline;vertical-align:middle;border:none;',
	        	editable: false, 
	        	emptyText:'전체',
	        	queryMode: 'local',
	        	hideOnSelect : false,
	        	triggerAction : 'all',
	            renderTo:'kChipSpan',
	            valueField:'cdnm',
	            displayField:'cdnm',
	            store: kChipStore,
	        });
			
		//Kchip 콤보박스 end
			
		//APOE 콤보박스 
		var apoeStore = Ext.create('Ext.data.Store', {
			autoLoad : true,
			proxy : {
				type : 'ajax',
				async : false,
				url : GLOBAL_CONTEXT_PATH
				+ '/dementia/commoninfo/selectCodeDetailSearchCondition.do',
				reader : {
					type : 'json',
					root : 'result'
				},
				extraParams : {kdcd : 'C020'},
			},
			
			listeners : {
				load : function(store) {
					
				}
			}
			
		});
		
		//APOE FontColor
		mciBGColorStore = Ext.create('Ext.data.Store', {
			autoLoad : true,
			proxy : {
				type : 'ajax',
				async : false,
				url : GLOBAL_CONTEXT_PATH
				+ '/dementia/commoninfo/selectCodeDetailSearchCondition.do',
				reader : {
					type : 'json',
					root : 'result'
				},
				extraParams : {
					kdcd : 'D002',
					cdbs : '60'
				},
			},
			
			listeners : {
				load : function(store) {
					
				}
			}
			
		});
		Ext.create('LovCombo',{
			id : 'apoeCombo',
			//cls : 'selectInstComboCls',
			width : 150,
			style : 'display:inline;vertical-align:middle;border:none;',
			editable: false, 
			emptyText:'전체',
			queryMode: 'local',
			hideOnSelect : false,
			triggerAction : 'all',
			renderTo:'apoeSpan',
			valueField:'cdbs',
			displayField:'cdnm',
			store: apoeStore,
		});
		
		//APOE 콤보박스 end
			
		//혈액형 콤보박스 
		Ext.create('LovCombo',{
    		id : 'aboCombo',
    		width : 150,
    		style : 'display:inline;vertical-align:middle;border:none;',
        	editable: false, 
        	emptyText:'전체',
	        	queryMode: 'local',
	        	hideOnSelect : false,
	        	triggerAction : 'all',
	            renderTo:'aboSpan',
	            valueField:'cdnm',
	            displayField:'cdnm',
	            store: Ext.create('Ext.data.Store', {
					autoLoad : true,
					proxy : {
							type : 'ajax',
							async : false,
							url : GLOBAL_CONTEXT_PATH
									+ '/dementia/commoninfo/selectCodeDetailSearchCondition.do',
							reader : {
								type : 'json',
								root : 'result'
							},
							extraParams : {kdcd : 'C018'},
					}
				})
	    });
		//혈액형 콤보박스 end
		
		//CDR 콤보박스 
		Ext.create('LovCombo',{
    		id : 'cdrCombo',
    		width : 150,
    		style : 'display:inline;vertical-align:middle;border:none;',
        	editable: false, 
        	emptyText:'전체',
	        	queryMode: 'local',
	        	hideOnSelect : false,
	        	triggerAction : 'all',
	            renderTo:'cdrSpan',
	            valueField:'cdnm',
	            displayField:'cdnm',
	            store: Ext.create('Ext.data.Store', {
					autoLoad : true,
					proxy : {
							type : 'ajax',
							async : false,
							url : GLOBAL_CONTEXT_PATH
									+ '/dementia/commoninfo/selectCodeDetailSearchCondition.do',
							reader : {
								type : 'json',
								root : 'result'
							},
							extraParams : {kdcd : 'C019'},
					}
			})
        });
		//CDR 콤보박스 end
		
		//학력 콤보박스 
		 var eduLevelStore = Ext.create('Ext.data.Store', {
				autoLoad : true,
				proxy : {
						type : 'ajax',
						async : false,
						url : GLOBAL_CONTEXT_PATH
								+ '/dementia/commoninfo/selectCodeDetailSearchCondition.do',
						reader : {
							type : 'json',
							root : 'result'
						},
						extraParams : {kdcd : 'C021'},
				},
				listeners : {
					load : function(store) {
						//권한에 따라 진단자 콤보값 변경 
						var display;
						for(var i=0; i< store.data.length; i++){
							display = store.data.items[i].data.cdbs +" ("+store.data.items[i].data.cdnm+")";
							store.data.items[i].data.display = display;
						}
					}
				}
			});
			Ext.create('LovCombo',{
	    		id : 'eduLevelCombo',
	    		//cls : 'selectInstComboCls',
	    		width : 150,
	    		style : 'display:inline;vertical-align:middle;border:none;',
	        	editable: false, 
	        	emptyText:'전체',
	        	queryMode: 'local',
	        	hideOnSelect : false,
	        	triggerAction : 'all',
	            renderTo:'eduLevelSpan',
	            valueField:'cdbs',
	            displayField:'display',
	            store: eduLevelStore,
	        });
			
		//학력 콤보박스 end
		
});

function doSearch() {
	var schKeyWord = makeSearchCondition();
	if(addViewYn=="Y"){
		var diagNm1="", diagNm2="";
		$("input[name='diagNmCheck1']:checked").each(function(i){
			var nmVal = $(this).val();
			if(i!=0) diagNm1 += ' OR ';
			diagNm1 += makeExistsStr("R2.DIAG_NM1 = '"+nmVal+"'");
			
		});
		$("input[name='diagNmCheck2']:checked").each(function(i){
			var nmVal = $(this).val();
			if(i!=0) diagNm2 += ' OR ';
			diagNm2 += makeExistsStr("R2.DIAG_NM2 = '"+nmVal+"'");;
		});
		
		
		if((schKeyWord=="false" && diagNm1=="" && diagNm2=="")
				|| ($("select[name=condiSelect]").length!=1 && schKeyWord=="false")){
			Ext.Msg.alert('알림', '추가조회 조건을 선택해 주세요.');
			return false;
		}
		if(schKeyWord=="false") schKeyWord="";
	}
	var objectId = document.getElementById("objectId").value;
	var instCode = "", diagLastSeq = "", petResult = "", genomeChipNm = "", abo = "", cdr = "", apoeCd = "", eduLevel = "";
	 
	//기관코드
	if(Ext.getCmp("selectInstCombo").value.length != Ext.getCmp("selectInstCombo").getStore().getTotalCount()){
		for(var i=0;i<Ext.getCmp("selectInstCombo").value.length;i++){
			if(i!=0) instCode += ",";
			instCode += "'"+Ext.getCmp("selectInstCombo").value[i]+"'";
		}
	}
	//진단횟수 다중선택
	var diagMaxSeq = diagLastSeqData.length;
//	console.log('diagMaxSeq: ' + diagMaxSeq);
	if(Ext.getCmp("diagLastSeqCombo").value == null) Ext.getCmp("diagLastSeqCombo").value = [];
	if(Ext.getCmp("diagLastSeqCombo").value.length != Ext.getCmp("diagLastSeqCombo").getStore().getTotalCount()){
		for(var i=0;i<Ext.getCmp("diagLastSeqCombo").value.length;i++){
//			console.log('value: ' + Ext.getCmp("diagLastSeqCombo").value[i]);
			if(Ext.getCmp("diagLastSeqCombo").value[i] < 4){
				if(i!=0) diagLastSeq += ",";
				diagLastSeq += "'"+Ext.getCmp("diagLastSeqCombo").value[i]+"'";
			}else{
				for(var j=Ext.getCmp("diagLastSeqCombo").value[i];j<=diagMaxSeq;j++){	//4차수 이상이므로 for문과 indexOf 사용하여 문자열에 없는 차수만 추가해준다.
					if(diagLastSeq.indexOf(j) == -1){
						if(diagLastSeq != '') diagLastSeq += ",";
						diagLastSeq += "'"+j+"'";
					}
				}
			}
//			console.log('diagLastSeq1 : ' + diagLastSeq);
		}
//		console.log('diagLastSeq2 : ' + diagLastSeq);
	}
	//진단횟수 단일선택
//	for(var i=1;i<=Ext.getCmp("diagLastSeqCombo").value;i++){
//		if(i!=1) diagLastSeq += ",";
//		diagLastSeq += "'"+i+"'";
//	}
	//PET결과
	if(Ext.getCmp("petResultCombo").value == null) Ext.getCmp("petResultCombo").value = [];
	if(Ext.getCmp("petResultCombo").value.length != Ext.getCmp("petResultCombo").getStore().getTotalCount()){
		if(Ext.getCmp("petResultCombo").value.length != 0){
			petResult = "EXISTS( SELECT 1 FROM ( SELECT OBJECT_ID, PET_RESULT ";
			petResult += "                       FROM (SELECT MRS.OBJECT_IDX OBJECT_ID ";
			petResult += "                       ,(SELECT RCTU_01  FROM csbrain2.mb_rctu MR WHERE FLAG ='U' AND MR.OBJECT_IDX = MRS.OBJECT_IDX AND DATE_FORMAT(MR.TEST_DAY,'%Y%m%d') BETWEEN DATE_FORMAT(DATE_SUB(MRS.RESEDATE, INTERVAL 1 MONTH),'%Y%m%d') ";
			petResult += "                       AND DATE_FORMAT(DATE_ADD(MRS.RESEDATE,INTERVAL 10 MONTH),'%Y%m%d') ORDER BY MR.TEST_DAY LIMIT 0,1) PET_RESULT";
			petResult += "                       FROM csbrain2.mb_resepet MRS where instr(petid,'P')>0 ) MRS";
			petResult += "                       WHERE ";
			for(var i=0;i<Ext.getCmp("petResultCombo").value.length;i++){
				if(i!=0) petResult += " OR ";
				var petR = Ext.getCmp("petResultCombo").value[i];
				if(petR == "+") petResult += "PET_RESULT = '1'";
				else if(petR == "-") petResult += "PET_RESULT = '0' OR PET_RESULT = '0.5' ";
				else if(petR == "미판독") petResult += "PET_RESULT IS NULL ";
			}
			petResult += "                      )A  WHERE A.OBJECT_ID = RII.OBJECT_ID) ";
		}			
		
	}
	
	//kChip 검색조건
	if(Ext.getCmp("selectKChipCombo").value == null) Ext.getCmp("selectKChipCombo").value = [];
	if(Ext.getCmp("selectKChipCombo").value.length != 0){
		if(Ext.getCmp("selectKChipCombo").value.length == Ext.getCmp("selectKChipCombo").getStore().getTotalCount()){
			genomeChipNm = " IFNULL(GENOME_CHIP_NM,'')!='' ";
		}else{
			for(var i=0;i<Ext.getCmp("selectKChipCombo").value.length;i++){
				if(i!=0) genomeChipNm += " OR ";
				genomeChipNm += "INSTR(GENOME_CHIP_NM,'"+Ext.getCmp("selectKChipCombo").value[i]+"') > 0";
			}
			genomeChipNm = makeExistsStr(genomeChipNm);
		}
	}

	//apoe 검색조건
	if(Ext.getCmp("apoeCombo").value == null) Ext.getCmp("apoeCombo").value = [];
	if(Ext.getCmp("apoeCombo").value.length != 0){
		var apoeTmp; 
		//전체 선택 시 값이 존재하는 데이터 검색
		if(Ext.getCmp("apoeCombo").value.length == Ext.getCmp("apoeCombo").getStore().getTotalCount()){
			apoeCd = "ALL";
		}else{
			for(var i=0;i<Ext.getCmp("apoeCombo").value.length;i++){
				if(i!=0) apoeCd += " OR ";
				apoeTmp = Ext.getCmp("apoeCombo").value[i];
				apoeCd += " APOE_CD = '" + apoeTmp + "'";
			}
		}
	}
	
	//eduLevel 검색조건
	if(Ext.getCmp("eduLevelCombo").value == null) Ext.getCmp("eduLevelCombo").value = [];
	if(Ext.getCmp("eduLevelCombo").value.length != 0){
		var eduLevelTmp; 
		//전체 선택 시 값이 존재하는 데이터 검색
		if(Ext.getCmp("eduLevelCombo").value.length == Ext.getCmp("eduLevelCombo").getStore().getTotalCount()){
			eduLevel = "ALL";
		}else{
			for(var i=0;i<Ext.getCmp("eduLevelCombo").value.length;i++){
				if(i!=0) eduLevel += " OR ";
				eduLevelTmp = Ext.getCmp("eduLevelCombo").value[i];
				eduLevel += " EDU_LEVEL = '" + eduLevelTmp + "'";
			}
		}
	}
	
	//혈액형 검색조건
	if(Ext.getCmp("aboCombo").value == null) Ext.getCmp("aboCombo").value = [];
	if(Ext.getCmp("aboCombo").value.length != 0){
		var aboTmp; 
		//전체 선택 시 값이 존재하는 데이터 검색
		if(Ext.getCmp("aboCombo").value.length == Ext.getCmp("aboCombo").getStore().getTotalCount()){
			abo = "ALL";
		}else{
			for(var i=0;i<Ext.getCmp("aboCombo").value.length;i++){
				if(i!=0) abo += " OR ";
				aboTmp = Ext.getCmp("aboCombo").value[i];
				if(aboTmp == "A") abo += " (INSTR(ABO,'AB') = 0  AND INSTR(ABO,'A') > 0) ";
				if(aboTmp == "B") abo += " (INSTR(ABO,'AB') = 0  AND INSTR(ABO,'B') > 0) ";
				if(aboTmp == "O") abo += " INSTR(ABO,'O') > 0 ";
				if(aboTmp == "AB") abo += " INSTR(ABO,'AB') > 0 ";
			}
		}
	}
	 
	//CDR 검색조건
	if(Ext.getCmp("cdrCombo").value == null) Ext.getCmp("cdrCombo").value = [];
	if(Ext.getCmp("cdrCombo").value.length != 0){
		if(Ext.getCmp("cdrCombo").value.length == Ext.getCmp("cdrCombo").getStore().getTotalCount() ){
			cdr = makeExistsStr(" IFNULL(CDR_STEP,'') = '' ") ;
		}else{
			for(var i=0;i<Ext.getCmp("cdrCombo").value.length;i++){
				if(i!=0) cdr += ",";
				cdr += "'"+Ext.getCmp("cdrCombo").value[i]+"'";
			}
			cdr = makeExistsStr(" CDR_STEP IN ("+cdr+")");
		}
	}
	
	var grade = "";
	// MMSE/미진단 검색 권한 확인
	if(noDiagSearchCfg[0] == 'N' || !checkGrade(noDiagSearchCfg[1],userGrade)){
		//권한 없는 경우 제외건만
		grade = "002";
		excelDownGrade = "002";
	}else{
		grade = $("#noDiagSearch").val();
		excelDownGrade = $("#noDiagSearch").val();
	}
	
	searchParams = {
			objectId : objectId,
			startAge : document.getElementById("startAge").value,
			endAge : document.getElementById("endAge").value,
			patientSex : document.getElementById("patientSex").value,
			schKeyWord : schKeyWord,
			diagNm1 : diagNm1,
			diagNm2 : diagNm2,
			grade : userGrade,
			instCode : instCode,
			diagLastSeq : diagLastSeq,
			petResult : petResult,
			genomeChipNm : genomeChipNm,
			abo : abo,
			cdrStep : cdr,
			grade : grade,
			apoeCd : apoeCd,
			eduLevel : eduLevel,
			brainwaveSearch : document.getElementById("brainwaveSearch").value
			}
	dataIntegrationListStore.proxy.actionMethods.read = "POST"
	dataIntegrationListStore.proxy.extraParams = searchParams;
	var pageParams = {
		start : 0,
		limit : pageSize
	};

	dataIntegrationListStore.load({
		params : pageParams
	});
	var paging = Ext.getCmp('DataIntegrationList-grid-page');
	paging.moveFirst();
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

var prev="";
function numCheck(obj) {
	var regexp = /^\d*(\.\d{0,2})?$/; 
    if(obj.value.search(regexp)==-1 || obj.value>9999) {
        obj.value = prev; 
    } 
    else {
        prev = obj.value; 
    } 
} 

function checkDataYN(value,metadata,record,rowIndex,colIndex,view ){
		var diagSeq = record.data.beforeDiagSeq;
		var diagLastSeq = record.data.diagLastSeq;
		
		var valArr =[];
		var seqArr =[];
		var petResultArr =[];
		var resultStr="";
		
		
				
		if(diagSeq.indexOf(',')!= -1){
			valArr = value.split(',');
			seqArr = diagSeq.split(',');
		}else{
			valArr.push(value);
			seqArr.push(diagSeq);
		}
		
		var resultArr= new Array();
		var petReClsArr= new Array();
		for(var i=0; i< valArr.length; i++){
			var num=seqArr[i].substr(0,1);
			if(resultArr[(num-1)]==undefined){
				resultArr[(num-1)]=valArr[i];
			}
		}
		
		var bgCls = "bg_number";
		for(var j=0; j<diagLastSeq; j++){
			if(resultArr[j]!=""){
				resultStr+="<span class='"+bgCls+"' >"+resultArr[j]+"</span>";
			}else{
				resultStr+="<span class='bg_number_N' >-</span>";
			}
		}
		return resultStr;
	}

function valueSplit(value,metadata,record,rowIndex,colIndex,view ){
	var resultStr="";
	var bgCls="";
	var petResult = record.data.petResultV;
	var petResultArr = petResult.split(',');
	var petSubjArr;
	var title = '';
	//hidden 컬럼 때문에 (colIndex-1)
	var colName = Ext.getCmp('DataIntegrationList-grid').columns[colIndex-1].text;
	var valArr = value.split(',');
	var petResult = petResult.split(',');
	if(valArr[0]=="") return '';
	
	for(var i=0; i< valArr.length; i++){
		bgCls = "bg_number";
		title = "";
		if(colName == '판독의'){
			title = "title = '";
			petSubjArr = petResultArr[i].split('|');
			
			if(petSubjArr[0] == "0"){
				bgCls = "bg_number_green";
				title += "PET 결과: Negative (-)";
			}else if(petSubjArr[0] == "0.5"){
				bgCls = "bg_number_green";
				title += "PET 결과: Negative (0.5)";	
				console.log(petSubjArr[0]+":0.5값Negative (-)")
			}else if(petSubjArr[0] == "1"){
			
				bgCls= "bg_number_red";
				title += "PET 결과: Positive (+)";
			}else{
				bgCls= "bg_number_N";
				title += "PET 결과: 미판독";
			}
			title += "\n";
			if(petSubjArr.length == 2){
				//판독자 툴팁 추가
				title += "판독자: "+petSubjArr[1]+"'";
			}else{
				title += "판독자: 없음'";
			}
		}
		if(i !=0 && i%5==0) resultStr+= "<br/>";
		resultStr+="<span class='"+bgCls+"' "+title+">"+valArr[i]+"</span>";
		
	}
	return resultStr;
}



function valueSplit2(value,metadata,record,rowIndex,colIndex,view ){
	var resultStr="";
	var bgCls="";
	var petSuvr = record.data.petSuvr;
	var petSuvrArr = petSuvr.split(',');
	var petSsubjArr;
	var title = '';
	//hidden 컬럼 때문에 (colIndex-1)
	var colName = Ext.getCmp('DataIntegrationList-grid').columns[colIndex-1].text;
	var valArr = value.split(',');
	var petSuvr = petSuvr.split(',');
	if(valArr[0]=="") return '';

	
	var pet = record.data.pet;
	var petArr = pet.split(',');
	
	for(var i=0; i< valArr.length; i++){
		bgCls = "bg_number";
		title = "";
		if(colName == 'SUVR'){
			title = "title = '";
			petSsubjArr = petSuvrArr[i].split('|');

			if(parseFloat(petSsubjArr[0]) < 1.11){
				bgCls = "bg_number_green";
				title += "PET 결과: Negative (-)";
			//	valArr[i] = "ne";
				console.log(petSsubjArr[0]+":ne")
			}else if(parseFloat(petSsubjArr[0]) < 1.11){
				bgCls = "bg_number_green";
				title += "PET 결과: Negative (0.5)";	
			//	console.log(petSubjArr[0]+":0.5값Negative (-)")
			}else if(parseFloat(petSsubjArr[0]) >= 1.11){
				bgCls= "bg_number_red";
				title += "PET 결과: Positive (+)"	
			//	valArr[i] = "po";
				console.log(petSsubjArr[0]+":po")
			}else{
				bgCls= "bg_number_N";
				title += "PET 결과: 미판독";
			}
			title += "\n";
			if(petSsubjArr.length == 2){
				//판독자 툴팁 추가
				title += "판독자: "+petSubjArr[1]+"'";
			}else{
				title += "판독자: 없음'";
			}
		}
		if(i !=0 && i%5==0) resultStr+= "<br/>";
//		
//		if(parseFloat(valArr[i])<1.11){
//			var suvr = valArr[i];
//			suvr = "ne";
//		}else if(parseFloat(valArr[i])>=1.11){
//			suvr = "po";	
//		}else{
//			suvr =""
//		}
		
		
		if(valArr[i]== "0.00"  || valArr[i]== ''){
			
			resultStr+="<span class='"+bgCls+"' "+title+" style ='margin-right: 5px;'>"+petArr[i]+"</span><span</span><span style ='margin-left:15px;'>-&nbsp&nbsp</span><br/>";
			}else{
				resultStr+="<span class='"+bgCls+"' "+title+">"+petArr[i]+"</span><span style ='margin-left:5px;'>"+valArr[i]+"</span><br/>";
			}
	
//		console.log(petArr[i]+ "값이들어오느냐?")
//		resultStr+="<span class='"+bgCls+"' "+title+">"+petArr[i]+"</span><span>"+valArr[i]+"</span><br/>";
	//	resultStr+="<span class='"+bgCls+"' "+title+">"+suvr+"</span><span>"+valArr[i]+"</span><br/>";   
		
	}
	return resultStr;
}

function valueSplit3(value,metadata,record,rowIndex,colIndex,view ){
	var resultStr="";
	var bgCls="";
	var petAiSuvr = record.data.petAiSuvr;
	var petAiSuvrArr = petAiSuvr.split(',');
	var petAiSsubjArr;
	var title = '';
	//hidden 컬럼 때문에 (colIndex-1)
	var colName = Ext.getCmp('DataIntegrationList-grid').columns[colIndex-1].text;
	var valArr = value.split(',');
	var petAiSuvr = petAiSuvr.split(',');
	if(valArr[0]=="") return '';
	console.log(colName+"coleNAME")
	
	var pet = record.data.pet;
	var petArr = pet.split(',');
	for(var i=0; i< valArr.length; i++){
		bgCls = "bg_number";
		title = "";
		if(colName == 'SUVR-A'){
			title = "title = '";
			petAiSsubjArr = petAiSuvrArr[i].split('|');
			if(parseFloat(petAiSsubjArr[0]) < 1.4){
				bgCls = "bg_number_green";
				title +=  "PET 결과: Negative (-)";
				//valArr[i] ="ne";
			}else if(parseFloat(petAiSsubjArr[0]) >= 1.4){
				bgCls = "bg_number_red";
				title +=  "PET 결과: Positive (+)";
			//	valArr[i] ="po";
				console.log(petAiSsubjArr[0]+":po")
			}else{
				bgCls= "bg_number_N";
				title += "PET 결과: 미판독";
			}
			title += "\n";
			if(petAiSsubjArr.length == 2){
				//판독자 툴팁 추가
				title += "판독자: "+petAiSsubjArr[1]+"'";
			}else{
				title += "판독자: 없음'";
			}
		}
//		if(i !=0 && i%4==0) resultStr+= "<br/>";
//		
//		if(parseFloat(valArr[i])<1.4){
//			var suvr = valArr[i];
//			suvr = "ne";
//		}else if(parseFloat(valArr[i])>=1.4){
//			suvr = "po";	
//		}else{
//			suvr =""
//		}
		console.log(petArr[i]+ "값이들어오느냐?")
		
		
		if(valArr[i]== "0.00"  || valArr[i]== ''){
			
		resultStr+="<span class='"+bgCls+"' "+title+" style ='margin-right: 5px;'>"+petArr[i]+"</span><span</span><span style ='margin-left:15px;'>-&nbsp&nbsp</span><br/>";
		}else{
			resultStr+="<span class='"+bgCls+"' "+title+">"+petArr[i]+"</span><span style ='margin-left:5px;'>"+valArr[i]+"</span><br/>";
		}
		//	resultStr+="<span class='"+bgCls+"' "+title+">"+suvr+"</span><span>"+valArr[i]+"</span><br/>";   
		
	}
	return resultStr;
}
function addView(){
	
	
	
	if($('.addView').css("display")=="none"){
		//$('#addButton').removeClass("blue");
		//$('#addButton').addClass("cyan");
		$('.addView').show();
		addViewYn="Y";
		
		//데이터 초기화 삭제
		/*
		//기존 조회조건 초기화
		$("#diagSelect").val("");
		$("#diagNm1").val("");
		$("#diagNm2").val("");
		$("#diagDoctor").val("");
		*/

	}else{
		//$('#addButton').removeClass("cyan");
		//$('#addButton').addClass("blue");
		$('.addViewCl').val("");
		$('.addView').hide();
		addViewYn="N";
		
		//데이터 초기화 삭제
		/*
		//추가조회조건 초기화
		$("select[name=condiSelect]").each(function(i){
			
			if(i==0){
				$("select[name=condiSelect]").eq(i).val("");
				$("select[name=condiDiagNm1]").eq(i).val("");
				$("select[name=condiDiagNm2]").eq(i).val("");
				$("select[name=condiDiagDoctor]").eq(i).val("");
				$("select[name=condition]").eq(i).val("end");
				$("select[name=condiDiagNm1]").eq(i).hide();
				$("select[name=condiDiagNm2]").eq(i).hide();
				$("select[name=condiDiagDoctor]").eq(i).hide();
			}else{
				$(".div_condi").eq(1).remove();
				
			}
		});
		//증세, 원인 체크박스 초기화
		$("input[name='diagNmCheck1']:checked").each(function(i){
			$(this).attr("checked",false);
		});
		$("input[name='diagNmCheck2']:checked").each(function(i){
			$(this).attr("checked",false);
		});
		*/
	}
	
	 //스크롤 여부 확인
	 if($("html").hasScrollBar()){
	        $(".btn_add").addClass('scroll_on');
     } else {
        $(".btn_add").removeClass('scroll_on')
     }
}

function conditionChg(val){
	var value=val.value;
	var index = $("select[name=condition]").index(val);
	index += 1;
	if(value=="end"){
		$("select[name=condition]").each(function(i){
			if(index<=i){
				$(".div_condi").eq(index).remove();
			}
		});
		
	}else if(value=="and" || value=="or"){
		cloneNum++;
		var nextVal = $("select[name=condition]").eq(index);
		if(!nextVal.length){
			var condiTd = document.getElementById('condiTd');
			var condiChild = condiTd.childNodes[1];
			var cloneTd = condiChild.cloneNode(true);
			
			var spanImg = document.createElement('button');
			var spanCondiDiagSel = document.createElement('span');
			var spanNm1 = document.createElement('span');
			var spanNm2 = document.createElement('span');
			spanCondiDiagSel.setAttribute('id','condiDiagSelect'+cloneNum);
			spanCondiDiagSel.setAttribute('class','condiDiagSelect');
			spanNm1.setAttribute('id','condiDiagNm'+cloneNum);
			spanNm1.setAttribute('class','condiDiagNm');
			spanNm2.setAttribute('id','condiDiagNmSub'+cloneNum);
			spanNm2.setAttribute('class','condiDiagNmSub');
			spanImg.setAttribute('class','removeBtn');
			spanImg.setAttribute('type','button');
			spanImg.setAttribute('onClick','removeCondi(this)');
			spanImg.innerHTML = '<img src="'+GLOBAL_CONTEXT_PATH+'/images/img/target_x_s.png" />'; 
			
			
			//검색조건 생성
			var tdDiv = document.createElement('div');
			tdDiv.setAttribute('class','ser_li div_condi');
			var labelSpan = document.getElementById('condiTd').childNodes[1].childNodes[1].cloneNode(true);
			var cloneCondi = document.getElementById('condiTd').childNodes[1].childNodes[9].cloneNode(true);
			
			tdDiv.appendChild(labelSpan);
			tdDiv.appendChild(spanCondiDiagSel);
			tdDiv.append(' ');
			tdDiv.appendChild(spanNm1);
			tdDiv.append(' ');
			tdDiv.appendChild(spanNm2);
			tdDiv.append(' ');
			tdDiv.appendChild(cloneCondi);
			tdDiv.append(' ');
			tdDiv.appendChild(spanImg);
			condiTd.appendChild(tdDiv);
			//조건 END 
			var condiLen = $("select[name=condition]").length;
			$("select[name=condition]").eq(condiLen-1).val("end");
			
			
			Ext.create('LovCombo',{
	    		id : 'selectDiagNmCombo'+cloneNum,
	    		cls : 'selectDiagNmComboCls',
	    		width : 150,
	    		style : 'display:inline;    vertical-align: middle;border: none;',
	        	editable: false, 
	        	hideOnSelect : false,
	        	queryMode: 'local',
	        	emptyText:'증세',
	        	triggerAction : 'all',
	            valueField:'codeName',
	            renderTo : 'condiDiagNm'+cloneNum,
	            displayField:'codeName',
	            store: diagNmStore,
	        });
			
			Ext.create('LovCombo',{
	    		id : 'selectDiagNmSubCombo'+cloneNum,
	    		cls : 'selectDiagNmSubComboCls',
	    		width : 150,
	    		style : 'display:inline;    vertical-align: middle;border: none;',
	        	editable: false, 
	        	hideOnSelect : false,
	        	queryMode: 'local',
	        	emptyText:'원인',
	        	triggerAction : 'all',
	            valueField:'codeName',
	            renderTo : 'condiDiagNmSub'+cloneNum,
	            displayField:'codeName',
	            store: diagNmSubStore,
	        });
			
			//추가조회 콤보박스 
			Ext.create('LovCombo',{
	    		id : 'condiDiagSelectCombo'+cloneNum,
	    		cls : 'condiDiagSelectComboCls',
	    		width : 150,
	    		style : 'display:inline;    vertical-align: middle;border: none;',
	        	editable: false, 
	        	emptyText:'진단구분',
	        	queryMode: 'local',
	        	hideOnSelect : false,
	        	triggerAction : 'all',
	            renderTo:'condiDiagSelect'+cloneNum,
	            valueField:'value',
	            displayField:'display',
	            store: Ext.create('Ext.data.ArrayStore', {
	                fields: ['display','value'],
	                data : [['최초진단','firstDiag'],['중간진단','middleDiag'],['최종진단','lastDiag']]
	            })
	        });
			//진단자 콤보박스 end
		}
		 
	}
	
	
}

function removeCondi(btn){
	var index = $("button[class=removeBtn]").index(btn);
	index +=1;
	//마지막 조건일 경우
	var condi = $("select[name=condition]").eq(index).val();
	if(condi=="end"){
		$("select[name=condition]").eq(index-1).val("end");
	}
	$(".div_condi").eq(index).remove();
}



function makeExistsStr(str){
	var mStr = " EXISTS (SELECT 1 FROM (SELECT OBJECT_ID FROM RD_INTEGRATION_INFO R2 WHERE "
				+ str
				+ " )R2 WHERE RII.OBJECT_ID = R2.OBJECT_ID) ";
	return mStr;
}

function makeSearchCondition(){
	var searchTemp = "";
	var searchStr = "";
	var value, condition, condiSel;
	
	
	//진단자
	var diagDoctor = ""; 
	
	if(Ext.getCmp("selectDiagDoctorCombo").value == null) Ext.getCmp("selectDiagDoctorCombo").value = [];
	if(Ext.getCmp("selectDiagDoctorCombo").value.length != Ext.getCmp("selectDiagDoctorCombo").getStore().getTotalCount()){
		for(var i=0;i<Ext.getCmp("selectDiagDoctorCombo").value.length;i++){
			if(i!=0) diagDoctor += ",";
			diagDoctor += "'"+Ext.getCmp("selectDiagDoctorCombo").value[i]+"'";
		}
	}
		
	if(diagDoctor!=""){
		searchTemp = "";
		searchTemp += " ( R2.DOCTOR_NAME IN (" + diagDoctor + ") )";
		if(searchStr!="") searchStr += " AND ";
		searchStr +=  makeExistsStr(searchTemp);
		
	}
	
	
	//추가조회부분
	if(addViewYn=="Y"){
		if(searchStr==""){ searchStr += " ( ";
		}else searchStr += " AND (";
			
			$("select[name=condition]").each(function(index){
				
					//진단조건
				    var condiSelect = $("select[name=condition]").eq(index).parents().find(".condiDiagSelectComboCls").eq(0).find("input").val();
				    var getId = $("select[name=condition]").eq(index).parents().find(".condiDiagSelectComboCls").eq(0).attr("id");
				    var idIndex = getId.substr(20);
				    var condiSelectArr = condiSelect.split(',');
				    //진단조건 전체선택이 아닌 경우
				    if(condiSelectArr.length == Ext.getCmp("condiDiagSelectCombo"+idIndex).getStore().getTotalCount()){
				    	condiSelect = "";
				    }
				    
					condition = $("select[name=condition]").eq(index).val();
					
					searchTemp = "";
					
					if( Ext.getCmp("condiDiagSelectCombo"+idIndex).value == null || Ext.getCmp("condiDiagSelectCombo"+index).value.length == 0){
						searchStr = "false";
				        return false;
					}
					
					//진단명 조회
					var diagNm1 = $("select[name=condition]").eq(index).parents().find(".selectDiagNmComboCls").eq(0).find("input").val();
					var diagNm2 = $("select[name=condition]").eq(index).parents().find(".selectDiagNmSubComboCls").eq(0).find("input").val();
					if(diagNm1=="" && diagNm2 ==""){
						searchStr = "false";
				        return false;
					}
					if(condiSelect == ""){
						//진단조건 전체
						searchTemp += "(";
						if(diagNm1!=""){
							var diagNm1Arr = diagNm1.split(',');
							var nmStr1 ="";
							for(nm in diagNm1Arr){
								if(nm!=0) nmStr1 +=",";
								nmStr1 += "'"+diagNm1Arr[nm].replace(/^\s+|\s+$/g,"")+"'";
							}
							searchTemp += " R2.DIAG_NM1 in ("+nmStr1+")";
						}
						if(diagNm2!=""){
							var diagNm2Arr = diagNm2.split(',');
							var nmStr2 ="";
							for(nm in diagNm2Arr){
								if(nm!=0) nmStr2 +=",";
								nmStr2 += "'"+diagNm2Arr[nm].replace(/^\s+|\s+$/g,"")+"'";
							}
							if(diagNm1!="") searchTemp += " AND ";
							searchTemp += "  R2.DIAG_NM2 in ("+nmStr2+")";
						}
						searchTemp += ")";
						
						searchStr +=  makeExistsStr(searchTemp);
					}else{
					
						//진단조건만큼 반복
						var comboLength = condiSelectArr.length;
						searchStr += "(";
						for(var i=0; i<comboLength; i++){
							searchTemp = "";
							condiSelect = condiSelectArr[i].replace(/^\s+|\s+$/g,"");
							if(condiSelect=="최초진단")  searchTemp += "(R2.DIAG_SEQ=1  ";
							if(condiSelect=="중간진단") searchTemp += "(R2.DIAG_SEQ!=R2.DIAG_LAST_SEQ AND R2.DIAG_SEQ!=1 ";
							if(condiSelect=="최종진단")   searchTemp += "(R2.DIAG_SEQ=R2.DIAG_LAST_SEQ  ";
							if(diagNm1!=""){
								var diagNm1Arr = diagNm1.split(',');
								var nmStr1 ="";
								for(nm in diagNm1Arr){
									if(nm!=0) nmStr1 +=",";
									nmStr1 += "'"+diagNm1Arr[nm].replace(/^\s+|\s+$/g,"")+"'";
								}
								searchTemp += " AND R2.DIAG_NM1 in ("+nmStr1+")";
							}
							if(diagNm2!=""){
								var diagNm2Arr = diagNm2.split(',');
								var nmStr2 ="";
								for(nm in diagNm2Arr){
									if(nm!=0) nmStr2 +=",";
									nmStr2 += "'"+diagNm2Arr[nm].replace(/^\s+|\s+$/g,"")+"'";
								}
								searchTemp += " AND R2.DIAG_NM2 in ("+nmStr2+")";
							}
							searchTemp += ")";
							
							searchStr +=  makeExistsStr(searchTemp);
							if((i+1) != comboLength){
								searchStr += " OR ";
							}
						}
						searchStr += ")";
						
					}
					

					if(condition == "and") searchStr += " AND ";
					if(condition == "or") searchStr += " OR ";
			});
			
			if(searchStr!="false") searchStr += " ) ";
	}
	
	return searchStr;
	
}

function listReset(){
	doReset();
	//추가조회조건 초기화
	
	
	$(".div_condi").each(function(i){
		
		if(i==0){
			$("select[name=condition]").eq(0).val("end");
			//document.getElementsByName("condition")[0].options[2].removeAttribute('selected');
			//document.getElementsByName("condition")[0].options[2].selected = true;
		}else{
			$(".div_condi").eq(1).remove();
			
		}
	});
	
	if(addViewYn=="Y"){
		addView();
	}
	//기관, 진단횟수, 진단자,PET결과, Kchip, CDR 혈액형,  전체선택
	Ext.getCmp("selectInstCombo").clearValue();
	Ext.getCmp("diagLastSeqCombo").clearValue();
	Ext.getCmp("selectDiagDoctorCombo").clearValue();
	Ext.getCmp("condiDiagSelectCombo0").clearValue();
	Ext.getCmp("petResultCombo").clearValue();
	Ext.getCmp("selectKChipCombo").clearValue();
	Ext.getCmp("aboCombo").clearValue();
	Ext.getCmp("cdrCombo").clearValue();
	Ext.getCmp("apoeCombo").clearValue();
	Ext.getCmp("eduLevelCombo").clearValue();
	

	
	Ext.getCmp('DataIntegrationList-grid').getView().emptyText='';
	dataIntegrationListStore.removeAll();
	Ext.getCmp('DataIntegrationList-grid').getView().refresh();
	Ext.getCmp('DataIntegrationList-grid').getView().emptyText='<div class="x-grid-empty">표시할 데이터가 없습니다.</div>';
	
	//페이징 리셋
	var paging = Ext.getCmp('DataIntegrationList-grid-page');
	
	/*paging.moveFirst();
	paging.plugins[0].recordsPerPageCmb.setValue(pageSize);
	paging.store.pageSize = pageSize;*/
	
}

function excelDownload(){
	
	 var objectList = [];
	 var s = sm.getSelection();
	 if (s < 1) {
		Ext.Msg.alert('알림', '데이터를 선택해주세요.');
		return false;
		}
	 Ext.each(s, function(rec) {
		 objectList.push(rec.get('objectId'));
	 });
	 
	 var popParams = {
				objectIdList : objectList,
				grade : userGrade,
				limit : 60000
	        } 
		Ext.DomHelper.append(Ext.getBody(), {
		      tag:          'iframe', 
		      frameBorder:  0, 
		      width:        0, 
		      height:       0, 
		      css:          'display:none;visibility:hidden;height:0px;', 
		      src:          makeUrl('/dementia/dataIntegration/dataIntegrationExcelList.do', popParams)
		    });
	 //document.location.href = makeUrl('/dementia/dataIntegration/dataIntegrationExcelList.do', searchParams);
	
}



function excelDownloadAll(){
	 if(dataIntegrationListStore.getCount() == 0) {
        Ext.Msg.alert('Warning', '결과자료가 없습니다.');
        return false;
     }
	 searchParams.objectIdList='';
	 searchParams.grade = excelDownGrade;
	 searchParams.limit= 60000;
	 document.location.href = makeUrl('/dementia/dataIntegration/dataIntegrationExcelList.do', searchParams);
	 searchParams.limit=pageSize;
}

function snsbExcelDownload(){
	
	 var objectList = [];
	 var s = sm.getSelection();
	 if (s < 1) {
		Ext.Msg.alert('알림', '데이터를 선택해주세요.');
		return false;
		}
	 
	 Ext.each(s, function(rec) {
		 objectList.push(rec.get('objectId'));
	 });
	 searchParams = {
			objectIdList : objectList,
			limit : 60000
				
			}
	popupDownload('/dementia/dataIntegration/snsbExcelDownloadList.do', searchParams);
	
}

function mmseExcelDownload(){
	
	 var objectList = [];
	 var s = sm.getSelection();
	 if (s < 1) {
		Ext.Msg.alert('알림', '데이터를 선택해주세요.');
		return false;
		}
	 
	 Ext.each(s, function(rec) {
		 objectList.push(rec.get('objectId'));
	 });
	 searchParams = {
			objectIdList : objectList,
			limit : 60000
				
			}
	popupDownload('/dementia/dataIntegration/mmseExcelDownloadList.do', searchParams);
	
}

function integrateDownload(downType){
	 
	if(downType=="select"){
		 var s = sm.getSelection();
		 if (s < 1) {
			Ext.Msg.alert('알림', '데이터를 선택해주세요.');
			return false;
			}
	}else{
		if(dataIntegrationListStore.getCount() == 0) {
	        Ext.Msg.alert('Warning', '결과자료가 없습니다.');
	        return false;
	    }
	}
	 
	
	var selectDownPopup = new SelectDownload.PopupWindow(downType);
	selectDownPopup.show();
	
	
}

/*
 * 통합 다운로드 팝업
 * */


var SelectDownload ={};


SelectDownload.PopupWindow = function(downType) { 
    
    var downType = downType;
    
    SelectDownload.PopupWindow.superclass.constructor.call(this, {

		id: 'selectDownload-window',
	    layout: 'border',
	    title: '통합 다운로드',
	    modal : true,
	    frame: true,
	    closeAction : 'destroy',
	    width: 380,
	    height: 250,
	    resizable : false,
	    draggable: false,
	    items: [{
	        xtype: 'panel',
	        width: 380,
		    height: 230,
		    style : "padding: 10px 45px 0",
	        id : 'selectDownload-field',
	        items: [{
	            xtype: 'container',
	            layout: 'hbox',
	            margin: '5',
				width : 350,
				style : "padding: 5px 0 0;",
	            items: [{
	            	xtype: 'checkbox',
		            fieldLabel: '전체',
		            id : 'selectAll',
		            width: 150,
		            listeners : {
						change : function(checkbox, newValue, oldValue, eOpts) {
							if(newValue){
								Ext.getCmp('mmseCheck').setValue(true);
								Ext.getCmp('snsbCheck').setValue(true);
								Ext.getCmp('mriCheck').setValue(true);
								Ext.getCmp('bioCheck').setValue(true);
								Ext.getCmp('brainwaveCheck').setValue(true);
								Ext.getCmp('petResult').setValue(true);
								Ext.getCmp('cdr').setValue(true);
							}else{
								Ext.getCmp('mmseCheck').setValue(false);
								Ext.getCmp('snsbCheck').setValue(false);
								Ext.getCmp('mriCheck').setValue(false);
								Ext.getCmp('bioCheck').setValue(false);
								Ext.getCmp('brainwaveCheck').setValue(false);
								Ext.getCmp('petResult').setValue(false);
								Ext.getCmp('cdr').setValue(false);
							}							
						}
					}
		            
	            },{
	            	xtype: 'checkbox',
		            fieldLabel: 'MMSE',
		            id : 'mmseCheck',
		            width: 150
	            }]
	        }, {
	            xtype: 'container',
	            layout: 'hbox',
	            defaultType: 'textfield',
	            margin: '5',
	            width : 350,
	            items: [{
	            	xtype:'checkbox',
	                fieldLabel: 'SNSB',
	                id : 'snsbCheck',
	                width: 150
	                //labelWidth: 110,
	            }, {
	            	xtype: 'checkbox',
	                fieldLabel: 'MRI ROI',
	                id : 'mriCheck',
	                width: 150
	            }]
	        },{
	            xtype: 'container',
	            layout: 'hbox',
	            defaultType: 'textfield',
	            margin: '5',
	            width : 350,
	            items: [{
	            	xtype:'checkbox',
	                fieldLabel: '혈액검사정보',
	                id : 'bioCheck',
	                width: 150
	            }, {
	                fieldLabel: '뇌파',
	                xtype:'checkbox',
	                id : 'brainwaveCheck',
	                width: 150
	            }]
	        },{
	            xtype: 'container',
	            layout: 'hbox',
	            defaultType: 'textfield',
	            margin: '5',
	            width : 350,
	            items: [{
	            	xtype:'checkbox',
	                fieldLabel: 'PET결과',
	                id : 'petResult',
	                width: 150
	            }, {
	                fieldLabel: 'CDR',
	                xtype:'checkbox',
	                id : 'cdr',
	                width: 150
	            }]
	        }, {
	            xtype: 'container',
	            layout: 'hbox',
	            defaultType: 'button',
				width : 350,
				style : "padding: 15px 10px;",
	            items: [{
	            	xtype : 'panel',
	            	width : 40
	            },{
	            	xtype : 'button',
	            	text : '다운로드',
	            	width  : 100,
	            	handler : function(){
	            		 
	            		 var mmseCheck = Ext.getCmp('mmseCheck').getValue();
				 		 var snsbCheck = Ext.getCmp('snsbCheck').getValue();
				 		 var mriCheck = Ext.getCmp('mriCheck').getValue();
				 		 var bioCheck = Ext.getCmp('bioCheck').getValue();
				 		 var brainwaveCheck = Ext.getCmp('brainwaveCheck').getValue();
				 		 var petResult = Ext.getCmp('petResult').getValue()==false?'':Ext.getCmp('petResult').getValue();
				 		 var cdr = Ext.getCmp('cdr').getValue();
				 		 var objectList = [];
				 		 if(!mmseCheck && !snsbCheck && !mriCheck && !bioCheck && !brainwaveCheck
				 				 && !petResult && !cdr){
				 			 Ext.Msg.alert('알림', '다운로드 항목을 선택해 주세요.');
				 			 return false;
				 		 }
				 		 
	            		 
	            		
	            		
	            		 /* progress info */
	            		 var taskId = ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1) + new Date().getMilliseconds();
	            		 var getProgressBoo=true;	// a boolean flag to decide when to stop checking progress
	            		 Ext.MessageBox.show({
	            	         title: 'Please wait',
	            	         msg: '<Label id="proTitle">진행중입니다</Label>',
	            	         progressText: 'Initializing...',
	            	         width:300,
	            	         progress:true,
	            	         closable:false
	            	     });
	            		 var calculation = function(proCnt,totCnt){
	            	         return function(){
	            	         	if(proCnt == totCnt){
	            	         		Ext.MessageBox.updateProgress(100, '100% completed');
	            	         	}else{
	            	         		var avg = isNaN(proCnt/totCnt)==true?0:proCnt/totCnt;
	            	         		Ext.MessageBox.updateProgress(avg, Math.round(100*avg)+'% completed');
	            	         	}
	            	        };
	            	    };
	            	    var task = {
	            				   run: function(){
	            				      if(getProgressBoo){
	            				         // make another Ajax request to get the latest status
	            				         Ext.Ajax.request({
	            				            url : GLOBAL_CONTEXT_PATH + '/ProgressMonitor',
	            				            timeout: 100000000,
	            				            method: 'POST',
	            				            params :{
	            				               taskIdentity: taskId   // use the same taskId which was used while submitting task
	            				            },
	            				            success: function (response, options) {
	            				            	
	            				               var obj = Ext.decode(response.responseText);
	            				               
	            				               
	            				               // get the number of total items and total processed..
	            				               // for a task with 5 steps, totalItems would be 5 and totalProcessed will
	            				               // vary from 0 to 5..
	            				               var totalSize = obj.total;
	            				               var totalProcessed = obj.totalProcessed;
	            				               var taskName="";
	            				               if(obj.taskNum == 1)taskName = 'MMSE 조회 중';
	            				               else if(obj.taskNum == 2)taskName = 'SNSB1 리스트 조회 중';
	            				               else if(obj.taskNum == 3)taskName = 'SNSB2 리스트 조회 중';
	            				               else if(obj.taskNum == 4)taskName = 'MRI_subcortical 리스트 조회 중';
	            				               else if(obj.taskNum == 5)taskName = 'MRI_surface 리스트 조회 중';
	            				               else if(obj.taskNum == 6)taskName = 'MRI_thickness 리스트 조회 중';
	            				               else if(obj.taskNum == 7)taskName = 'Biological Material 리스트 조회 중';
	            				               else if(obj.taskNum == 8)taskName = 'BRAINWAVE_BEAM 리스트 조회 중';
	            				               else if(obj.taskNum == 9)taskName = 'BRAINWAVE_SENSORY_ERP 리스트 조회 중';
	            				               else if(obj.taskNum == 10)taskName = 'BRAINWAVE_ATTENTION_P300 리스트 조회 중';
	            				               else if(obj.taskNum == 11)taskName = 'PET결과 리스트 조회 중';
	            				               else if(obj.taskNum == 12)taskName = 'CDR 리스트 조회 중';
	            				               
	            				               else if(obj.taskNum == 13)taskName = 'MMSE 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 14)taskName = 'SNSB1 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 15)taskName = 'SNSB2 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 16)taskName = 'MRI_subcortical 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 17)taskName = 'MRI_surface 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 18)taskName = 'MRI_thickness 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 19)taskName = 'Biological Material 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 20)taskName = 'BRAINWAVE_BEAM 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 21)taskName = 'BRAINWAVE_SENSORY_ERP 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 22)taskName = 'BRAINWAVE_ATTENTION_P300 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 23)taskName = 'PET결과 엑셀파일 생성 중';
	            				               else if(obj.taskNum == 24)taskName = 'CDR 엑셀파일 생성 중';
	            				               
	            				               if(totalProcessed == 0 && totalSize==0){
	            			            		   document.getElementById("proTitle").innerHTML = "진행중입니다";
	            			            	   }else{
	            			            		   document.getElementById("proTitle").innerHTML = taskName;
	            			            	   }
	            				               if(totalProcessed==999){ 
	            				            	   getProgressBoo= false;
	            				            	   Ext.MessageBox.hide();
	            				               }
	            				               if(totalProcessed==888){ 
	            				            	   getProgressBoo= false;
	            				            	   Ext.MessageBox.hide();
	            				            	   Ext.Msg.alert('알림', '다운로드 할 데이터가 없습니다.');
	            				            	   
	            				               }
	            				               if(totalProcessed==777){ 
	            				            	   getProgressBoo= false;
	            				            	   Ext.MessageBox.hide();
	            				            	   Ext.Msg.alert('알림', '다운로드 실패하였습니다.');
	            				            	   
	            				               }
	            				               setTimeout(calculation(totalProcessed, totalSize), 100);
	            				            }
	            				         });
	            				      }else{
	            				         // stop the TaskRunner when the 'getProgressBoo' is false
	            				         runner.stop(task);
	            				      }
	            				 },
	            				 interval: 100 // monitor the progress every 200 milliseconds
	            		};
	            	    // start the TaskRunner
	            		var runner = new Ext.util.TaskRunner();
	            		runner.start(task);
	            		
	            		var popParams = {
        						objectIdList : objectList,
        				 		mmseCheck :mmseCheck,
        				 		snsbCheck : snsbCheck,
        				 		mriCheck : mriCheck,
        				 		bioCheck : bioCheck,
        				 		brainwaveCheck : brainwaveCheck,
        				 		petResult : petResult,
        				 		cdr : cdr,
        				 		taskId : taskId,
        				 		downType : downType
        			        }
			 		 
	            		 if(downType == "select"){
	            			 var s = sm.getSelection();
		            		 Ext.each(s, function(rec) {
		            			 objectList.push(rec.get('objectId'));
		            		 });
	            		 }else{
	            			 
	            			 popParams.objectId = searchParams.objectId;
	            			 popParams.startAge = searchParams.startAge;
	            			 popParams.endAge = searchParams.endAge;
	            			 popParams.patientSex = searchParams.patientSex;
	            			 popParams.schKeyWord = searchParams.schKeyWord;
	            			 popParams.diagNm1 = searchParams.diagNm1;
	            			 popParams.diagNm2 = searchParams.diagNm2;
	            			 popParams.grade = searchParams.grade;
	            			 popParams.instCode= searchParams.instCode;
	            			 popParams.diagLastSeq = searchParams.diagLastSeq;
	            			 popParams.genomeChipNm = searchParams.genomeChipNm;
	            			 popParams.abo = searchParams.abo;
	            			 popParams.cdrStep = searchParams.cdrStep;
	            			 popParams.grade = searchParams.grade;
	            			 popParams.apoeCd = searchParams.apoeCd;
	            			 popParams.eduLevel = searchParams.eduLevel;
	            			 
	            		 }
	            		Ext.DomHelper.append(Ext.getBody(), {
		  	    		      tag:          'iframe', 
		  	    		      frameBorder:  0, 
		  	    		      width:        0, 
		  	    		      height:       0, 
		  	    		      css:          'display:none;visibility:hidden;height:0px;', 
		  	    		      src:          makeUrl('/dementia/dataIntegration/dataIntegrationExcelDownload.do', popParams)
		  	    		    });				
	            		Ext.getCmp('selectDownload-window').close();
	            	}
	            }, {
	            	xtype : 'button',
	            	text : '닫기',
	            	width  : 100,
	            	style : 'margin : 0 5px',
	            	handler : function(){
	            		Ext.getCmp('selectDownload-window').close();
	            		
	            	}
	            }]
	        }]
	        
	    }]
    
	
    });
    
};


Ext.extend(SelectDownload.PopupWindow,Ext.Window,{
});
