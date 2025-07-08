package dementia.dataIntegration.service.impl;

import java.util.ArrayList;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;

import dementia.dataIntegration.service.DataIntegrationVO;
import dementia.framework.file.mapping.CellWriterMapper;
import dementia.framework.util.StringUtil;

public class DataIntegrationWriterMapper implements CellWriterMapper<DataIntegrationVO>{
	@Override
	public void mapHeader(Row row, DataIntegrationVO vo) {
		Cell cell = null;
		int i = 0;
		
		int rowNum = row.getRowNum();
		if(rowNum==0) {
		cell = row.createCell(0);
		cell.setCellValue("순번");
		
		cell = row.createCell(1);
		cell.setCellValue("SUBJECT ID");

		cell = row.createCell(2);
		cell.setCellValue("연령");		

		cell = row.createCell(3);
		cell.setCellValue("진단횟수");

		cell = row.createCell(4);
		cell.setCellValue("임상진단");		
		cell = row.createCell(5);
		
		cell = row.createCell(6);
		cell.setCellValue("진단나이");

		cell = row.createCell(7);
		cell.setCellValue("진단년월");

		cell = row.createCell(8);
		cell.setCellValue("Global CDR");

		cell = row.createCell(9);
		cell.setCellValue("진단자");

		cell = row.createCell(10);
		cell.setCellValue("신경심리검사");
		cell = row.createCell(11);

		cell = row.createCell(12);
		cell.setCellValue("영상");
		cell = row.createCell(13);
		cell = row.createCell(14);
		cell = row.createCell(15);
		cell = row.createCell(16);
		
		
		cell = row.createCell(17);
		cell.setCellValue("판독자");
			
		cell = row.createCell(18);
		cell.setCellValue("학력");
	
		
		cell = row.createCell(19);
		cell.setCellValue("유전체");
		cell = row.createCell(20);

		cell = row.createCell(21);
		cell.setCellValue("검체시료");
		cell = row.createCell(22);
		cell = row.createCell(23);
		
		cell = row.createCell(24);	
		cell.setCellValue("EEG/ERP");	

		}
		if(rowNum==1) {
			cell = row.createCell(0);		//순번
			
			cell = row.createCell(1);		//SUBJECT ID
			
			cell = row.createCell(2);		//연령
			
			cell = row.createCell(3);		//진단횟수
			
			cell = row.createCell(4);		//임상진단
			cell.setCellValue("증세");
			cell = row.createCell(5);
			cell.setCellValue("원인");
			
			cell = row.createCell(6);		//진단나이
			
			cell = row.createCell(7);		//진단년월
			
			cell = row.createCell(8);		//Global CDR
			
			cell = row.createCell(9);		//진단자
			
			cell = row.createCell(10);		//신경심리검사
			cell.setCellValue("MMSE");
			cell = row.createCell(11);
			cell.setCellValue("SNSB");
			
			cell = row.createCell(12);		//영상
			cell.setCellValue("MRI");
			cell = row.createCell(13);
			cell.setCellValue("PET");
			cell = row.createCell(14);
			cell.setCellValue("SUVR");
			cell = row.createCell(15);
			cell.setCellValue("SUVR-A");
			cell = row.createCell(16);
			cell.setCellValue("PET 결과");
			
			cell = row.createCell(17); //판독자 PET SUBJECT
			
			cell = row.createCell(18);		//학력
			
			cell = row.createCell(19);		//유전체
			cell.setCellValue("Kchip");
			cell = row.createCell(20);
			cell.setCellValue("APOE");
			
			cell = row.createCell(21);		//검체시료
			cell.setCellValue("ABO");
			cell = row.createCell(22);
			cell.setCellValue("혈액");
			cell = row.createCell(23);
			cell.setCellValue("CSF");
			
			cell = row.createCell(24);		//EEG/ERP
		}
	}

	@Override
	public void mapRow(Row row, DataIntegrationVO vo) {
		Cell cell = null;
		int i = 0;
		int rowNum = row.getRowNum();
		
		cell = row.createCell(i++);					//순번 0
		cell.setCellValue((rowNum-1));
		
		cell = row.createCell(i++);					//SUBJECT ID 1
		cell.setCellValue(vo.getSubjectId());

		cell = row.createCell(i++);					//연령 2
		cell.setCellValue(vo.getAge());
		
		cell = row.createCell(i++);					//진단횟수 3
		cell.setCellValue(vo.getDiagLastSeq());
		
		
		String seq = vo.getDiagSeq();
		String diagNm1 = "";
		String diagNm2 = "";
		String doctorName = "";
		String mmse = "";
		String snsb = "";
		String mri = "";
		String pet = "";
		String blood = "";
		String csf = "";
		String brainwave = "";
		String diagAge = "";
		String diagDate = "";
		String diagDateT = "";
		String cdrStep = "";
		
		String[] seqArr = seq.split(",",-1);
		String[] diagNm1Arr = vo.getDiagNm1().split(",",-1);
		String[] diagNm2Arr = vo.getDiagNm2().split(",",-1);
		String[] doctorNameArr = vo.getDoctorName().split(",",-1);
		String[] diagAgeArr = vo.getDiagAge().split(",",-1);
		String[] diagDateArr = vo.getDiagDate().split(",",-1);
		mmse = dataCheckAge(vo.getMmse(),seqArr);
		snsb = dataCheckAge(vo.getSnsb(),seqArr);
		mri = dataSplitMri(vo.getMri());
		pet = dataSplitAge(vo.getPet());
		blood = dataSplitAge(vo.getBlood());
		csf = dataSplitAge(vo.getCsf());
		brainwave = dataSplitAge(vo.getBrainwave());
		cdrStep = dataCheckAge(vo.getCdrStep(),seqArr);
		
		for(int j=0; j < seqArr.length; j++) {
			if(j!=0) seqArr[j] = ", " + seqArr[j];
			diagNm1 += seqArr[j] + "차 : " + strYnCheck(diagNm1Arr[j]);
			diagNm2 += seqArr[j] + "차 : " + strYnCheck(diagNm2Arr[j]);
			doctorName += seqArr[j] + "차 : " + strYnCheck(doctorNameArr[j]);
			diagAge += seqArr[j] + "차 : " + strYnCheck(diagAgeArr[j]);
			diagDateT = diagDateArr[j];
			if(diagDateT.length() == 8)  diagDateT = diagDateT.substring(0, 6);
			diagDate += seqArr[j] + "차 : " + strYnCheck(diagDateT);
		}
		
			
			
		cell = row.createCell(i++);					//임상진단 
		cell.setCellValue(diagNm1);					//증세 4
 		cell = row.createCell(i++); 
		cell.setCellValue(diagNm2);					//원인 5
		
		cell = row.createCell(i++);					//진단나이 6
		cell.setCellValue(diagAge);
		
		cell = row.createCell(i++);					//진단년월 7
		cell.setCellValue(diagDate);
		
		cell = row.createCell(i++);					//Global CDR 8
		cell.setCellValue(cdrStep);
		
		cell = row.createCell(i++);					//진단자 9
		cell.setCellValue(doctorName);
		
		cell = row.createCell(i++);					//신경심리검사
		cell.setCellValue(mmse);					//MMSE 10
		cell = row.createCell(i++);			
		cell.setCellValue(snsb);					//SNSB 11
		
		cell = row.createCell(i++);					//영상 
		cell.setCellValue(mri);						//MRI 12
		cell = row.createCell(i++);
		cell.setCellValue(pet);						//PET 13
		cell = row.createCell(i++);                       
		cell.setCellValue(vo.getPetSuvr());			//SUVR 14
		cell = row.createCell(i++);
		cell.setCellValue(vo.getPetAiSuvr());		//AI SUVR 15
		cell = row.createCell(i++);
		cell.setCellValue(vo.getPetResult());		//PET 결과
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getPetSubject());		//PET 판독자
		
		cell = row.createCell(i++);					//학력
		cell.setCellValue(vo.getEduLevel());
		
		cell = row.createCell(i++);					//유전체
		cell.setCellValue(vo.getGenomeChipNm());	//Kchip
		cell = row.createCell(i++);
		cell.setCellValue(vo.getApoeCd());			//APOE
		
		cell = row.createCell(i++);					//검체시료
		cell.setCellValue(vo.getAbo());				//ABO
		cell = row.createCell(i++);
		cell.setCellValue(blood);					//혈액
		cell = row.createCell(i++);
		cell.setCellValue(csf);						//CSF
		
		cell = row.createCell(i++);					//EEG/ERP
		cell.setCellValue(brainwave);
		

	}
	
	private String strYnCheck(String str) {
		if(!StringUtil.isEmptyString(str)) {
			return str;
		}else {
			return "없음";
		}
	}
	
	private String dataCheckAge(String str,String[] seq) {
		ArrayList<String> strList = new ArrayList();
		String[] strArr;
		String returnStr ="";
		
		strArr = str.split(",",-1);
		for(int i=0; i<strArr.length; i++) {
			int cnt = Integer.parseInt(seq[i].substring(0));
			
			if(strList.size()<cnt) strList.add("");
			if("".equals(strList.get(cnt-1))){
				if(strArr[i] !=null && !"".equals(strArr[i])) { 
					strList.set((cnt-1), strArr[i]); 
				}
				else {
					strList.set((cnt-1), "없음");
				}
			}
		}
		for(int j=0; j<strList.size(); j++) {
			if(j!=0) returnStr += ", " ;
			returnStr += (j+1)+"차 : "+strList.get(j);
		}
		
		
		return returnStr;
	}
	
	private String dataSplitAge(String str) {
		String[] strArr = str.split(",",-1);
		String returnStr ="";
		
		for(int i=0; i<strArr.length; i++) {
			if(strArr[i] == "") continue;
			String a = strArr[i];
			boolean t = strArr[i] == "";
			if(returnStr != "") returnStr += " : ";
			returnStr += strArr[i];
		}
		
		return returnStr;
	}
	
	private String dataSplitMri(String str) {
		String[] strArr = str.split(",",-1);
		String returnStr ="";
		for(int i=0; i<strArr.length; i++) {
			if(strArr[i] == "") continue;
			String[] msStr = strArr[i].split("\\|",-1);
			if(returnStr != "") returnStr += " : ";
			returnStr += msStr[0];
		}
		
		return returnStr;
	}
	
	
//	@Override
//	public void cellMerge(Sheet sheet) {
//		//병합 영역 설정
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//		
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
//		sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
//		
//		sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 11));
//	   
//		sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 16));
//
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 18, 18));
//		
//		sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 20));
//		sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 23));		
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 24, 24));
//		
//	}
	

}
