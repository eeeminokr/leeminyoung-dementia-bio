package dementia.dataIntegration.service.impl;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;

import dementia.dataIntegration.service.DataIntegrationSnsbVO2;
import dementia.framework.file.mapping.CellWriterMapper;

public class DataIntegrationSnsbWriterMapper2 implements CellWriterMapper<DataIntegrationSnsbVO2>{
	@Override
	public void mapHeader(Row row, DataIntegrationSnsbVO2 vo) {
		Cell cell = null;
		int i = 0;
		cell = row.createCell(i++);
		cell.setCellValue("순번");
		
		cell = row.createCell(i++);
		cell.setCellValue("mri_id");

		cell = row.createCell(i++);
		cell.setCellValue("family_id");

		cell = row.createCell(i++);
		cell.setCellValue("individual_id");

		cell = row.createCell(i++);
		cell.setCellValue("object_idx");

		cell = row.createCell(i++);
		cell.setCellValue("차수");
		
		//진단자, 진단명 추가
		cell = row.createCell(i++);
		cell.setCellValue("진단 증세");
						
		cell = row.createCell(i++);
		cell.setCellValue("진단 원인");
		
		cell = row.createCell(i++);
		cell.setCellValue("진단자");
		
		cell = row.createCell(i++);
		cell.setCellValue("Unum");

		cell = row.createCell(i++);
		cell.setCellValue("CDT_Contour");

		cell = row.createCell(i++);
		cell.setCellValue("CDT_Numbers");

		cell = row.createCell(i++);
		cell.setCellValue("CDT_time_setting");

		cell = row.createCell(i++);
		cell.setCellValue("CDT_Total_score");

		cell = row.createCell(i++);
		cell.setCellValue("CDT_Total_score_p");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Wordreading_correct");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Wordreading_correct_p");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Wordreading_error");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Wordreading_error_p");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Wordresponse_time");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Colorreading_correct");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Colorreading_correct_p");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Colorreading_correct_z");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Colorreading_correct_s");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Colorreading_error");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Colorreading_error_p");

		cell = row.createCell(i++);
		cell.setCellValue("K_CWST_60_Colorresponse_time");

		cell = row.createCell(i++);
		cell.setCellValue("DSC_correct");

		cell = row.createCell(i++);
		cell.setCellValue("DSC_correct_p");

		cell = row.createCell(i++);
		cell.setCellValue("DSC_correct_z");

		cell = row.createCell(i++);
		cell.setCellValue("DSC_correct_s");

		cell = row.createCell(i++);
		cell.setCellValue("DSC_error");

		cell = row.createCell(i++);
		cell.setCellValue("DSC_error_p");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_A_success");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_A_time");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_A_time_p");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_A_time_z");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_A_time_s");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_A_error");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_B_success");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_B_time");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_B_time_p");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_B_time_z");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_B_time_s");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_B_error");

		cell = row.createCell(i++);
		cell.setCellValue("K_TMT_E_B_error_p");

		cell = row.createCell(i++);
		cell.setCellValue("RCFT_recognition_discriminability_index_s");

		cell = row.createCell(i++);
		cell.setCellValue("COWAT_animal_s");

		cell = row.createCell(i++);
		cell.setCellValue("COWAT_siut_s");

		cell = row.createCell(i++);
		cell.setCellValue("Fist_edge_palm_right");

		cell = row.createCell(i++);
		cell.setCellValue("Fist_edge_palm_left");

		cell = row.createCell(i++);
		cell.setCellValue("COWAT_animal_giut_p");

		cell = row.createCell(i++);
		cell.setCellValue("COWAT_animal_giut_z");

		cell = row.createCell(i++);
		cell.setCellValue("COWAT_animal_giut_s");

		cell = row.createCell(i++);
		cell.setCellValue("SGDS");

		cell = row.createCell(i++);
		cell.setCellValue("K_IADL_Total_score");

		cell = row.createCell(i++);
		cell.setCellValue("K_IADL_Xcount");

		cell = row.createCell(i++);
		cell.setCellValue("K_IADL_Score");

		cell = row.createCell(i++);
		cell.setCellValue("Global_DS");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Attention");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Attention_p");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Attention_z");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Attention_t");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Attention_s");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Language");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Language_p");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Language_z");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Language_t");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Language_s");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Visuospatial");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Visuospatial_p");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Visuospatial_z");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Visuospatial_t");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Visuospatial_s");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Memory");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Memory_p");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Memory_z");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Memory_t");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Memory_s");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Frontal");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Frontal_p");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Frontal_z");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Frontal_t");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_II_Domain_Frontal_s");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_C_Ani_giut");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_C_Ani_giut_p");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_C_Ani_giut_z");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_C_Ani_giut_t");

		cell = row.createCell(i++);
		cell.setCellValue("SNSB_C_Ani_giut_s");

		cell = row.createCell(i++);
		cell.setCellValue("DM");

		cell = row.createCell(i++);
		cell.setCellValue("HiBP");

		cell = row.createCell(i++);
		cell.setCellValue("HyLipid");

		cell = row.createCell(i++);
		cell.setCellValue("CardiacDs");

		cell = row.createCell(i++);
		cell.setCellValue("Stroke");

		cell = row.createCell(i++);
		cell.setCellValue("BrDamageAcc");

		cell = row.createCell(i++);
		cell.setCellValue("CO");

		cell = row.createCell(i++);
		cell.setCellValue("BrainSurgery");

		cell = row.createCell(i++);
		cell.setCellValue("Syphi");

		cell = row.createCell(i++);
		cell.setCellValue("Thyroid");

		cell = row.createCell(i++);
		cell.setCellValue("Encephalitis");

		cell = row.createCell(i++);
		cell.setCellValue("LiverDis");

		cell = row.createCell(i++);
		cell.setCellValue("Depression");

		cell = row.createCell(i++);
		cell.setCellValue("KidneyDis");

		cell = row.createCell(i++);
		cell.setCellValue("LungDis");

		cell = row.createCell(i++);
		cell.setCellValue("Arthritis");

		cell = row.createCell(i++);
		cell.setCellValue("SleepDis");

		cell = row.createCell(i++);
		cell.setCellValue("FamHis");

		cell = row.createCell(i++);
		cell.setCellValue("MetabBrDis");

		cell = row.createCell(i++);
		cell.setCellValue("MentalDis");

		cell = row.createCell(i++);
		cell.setCellValue("MentalRet");

		cell = row.createCell(i++);
		cell.setCellValue("BrainTumor");

		cell = row.createCell(i++);
		cell.setCellValue("GastroDis");

		cell = row.createCell(i++);
		cell.setCellValue("Cancer");

		cell = row.createCell(i++);
		cell.setCellValue("Fracture");

		cell = row.createCell(i++);
		cell.setCellValue("Anemia");

		cell = row.createCell(i++);
		cell.setCellValue("Epilepsy");

		cell = row.createCell(i++);
		cell.setCellValue("DrugAbu");

		cell = row.createCell(i++);
		cell.setCellValue("AlcoAbu");

		cell = row.createCell(i++);
		cell.setCellValue("LossConsc");

		cell = row.createCell(i++);
		cell.setCellValue("Other");

		cell = row.createCell(i++);
		cell.setCellValue("Insert_Date");

		cell = row.createCell(i++);
		cell.setCellValue("Insert_UserID");

		cell = row.createCell(i++);
		cell.setCellValue("Update_Date");

		cell = row.createCell(i++);
		cell.setCellValue("Update_UserID");


		
	}

	@Override
	public void mapRow(Row row, DataIntegrationSnsbVO2 vo) {
		Cell cell = null;
		int i = 0;
		int rowNum = row.getRowNum();
		
		cell = row.createCell(i++);
		cell.setCellValue(rowNum);
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getMriId());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getFamilyId());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getIndividualId());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getObjectIdx());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDiagSeq());
		
		cell = row.createCell(i++);						 // 진단명, 진단자 추가
		cell.setCellValue(vo.getDiagNm1());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDiagNm2());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getDoctorName());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getUnum());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCdtContour());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCdtNumbers());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCdtTimeSetting());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCdtTotalScore());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCdtTotalScoreP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60WordreadingCorrect());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60WordreadingCorrectP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60WordreadingError());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60WordreadingErrorP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60WordresponseTime());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60ColorreadingCorrect());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60ColorreadingCorrectP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60ColorreadingCorrectZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60ColorreadingCorrectS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60ColorreadingError());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60ColorreadingErrorP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkCwst60ColorresponseTime());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDscCorrect());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDscCorrectP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDscCorrectZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDscCorrectS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDscError());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDscErrorP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtEASuccess());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtEATime());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtEATimeP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtEATimeZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtEATimeS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtEAError());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtE_bSuccess());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtE_bTime());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtE_bTimeP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtE_bTimeZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtE_bTimeS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtE_bError());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkTmtE_bErrorP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getRcftRecognitionDiscriminabilityIndexS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCowatAnimalS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCowatSiutS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getFistEdgePalmRight());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getFistEdgePalmLeft());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCowatAnimalGiutP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCowatAnimalGiutZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCowatAnimalGiutS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSgds());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkIadlTotalScore());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkIadlXcount());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getkIadlScore());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getGlobalDs());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainAttention());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainAttentionP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainAttentionZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainAttentionT());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainAttentionS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainLanguage());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainLanguageP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainLanguageZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainLanguageT());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainLanguageS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainVisuospatial());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainVisuospatialP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainVisuospatialZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainVisuospatialT());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainVisuospatialS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainMemory());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainMemoryP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainMemoryZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainMemoryT());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainMemoryS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainFrontal());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainFrontalP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainFrontalZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainFrontalT());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbIiDomainFrontalS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbCAniGiut());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbCAniGiutP());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbCAniGiutZ());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbCAniGiutT());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSnsbCAniGiutS());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDm());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getHibp());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getHylipid());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCardiacds());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getStroke());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getBrdamageacc());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCo());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getBrainsurgery());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSyphi());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getThyroid());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getEncephalitis());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getLiverdis());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDepression());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getKidneydis());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getLungdis());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getArthritis());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getSleepdis());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getFamhis());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getMetabbrdis());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getMentaldis());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getMentalret());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getBraintumor());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getGastrodis());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getCancer());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getFracture());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getAnemia());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getEpilepsy());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDrugabu());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getAlcoabu());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getLossconsc());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getOther());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getInsertDate());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getInsertUserid());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getUpdateDate());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getUpdateUserid());


	

	}


	
	
}

