package dementia.dataIntegration.service.impl;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import dementia.dataIntegration.service.DataIntegrationPetResultVO;
import dementia.framework.file.mapping.CellWriterMapper;

public class DataIntegrationPetResultWriterMapper implements CellWriterMapper<DataIntegrationPetResultVO>{
	@Override
	public void mapHeader(Row row, DataIntegrationPetResultVO vo) {
		Cell cell = null;
		int i = 0;
		
		cell = row.createCell(i++);
		cell.setCellValue("순번");
		
		cell = row.createCell(i++);
		cell.setCellValue("Object ID");

		cell = row.createCell(i++);
		cell.setCellValue("PET ID");
		
		cell = row.createCell(i++);
		cell.setCellValue("차수");
		
		cell = row.createCell(i++);
		cell.setCellValue("아밀로이드 베타");

		cell = row.createCell(i++);
		cell.setCellValue("비고");
		
		cell = row.createCell(i++);
		cell.setCellValue("외측두엽(좌)");
								
		cell = row.createCell(i++);
		cell.setCellValue("외측두엽(우)");

		cell = row.createCell(i++);
		cell.setCellValue("전두엽(좌)");

		cell = row.createCell(i++);
		cell.setCellValue("전두엽(우)");

		cell = row.createCell(i++);
		cell.setCellValue("두정엽(좌)");

		cell = row.createCell(i++);
		cell.setCellValue("두정엽(우)");

		cell = row.createCell(i++);
		cell.setCellValue("후 대상피질/쐐기앞소엽");

		cell = row.createCell(i++);
		cell.setCellValue("BAPL 평가");

		
		cell = row.createCell(i++);
		cell.setCellValue("SUVR");
		
		cell = row.createCell(i++);
		cell.setCellValue("SUVR-A");
		
		cell = row.createCell(i++);
		cell.setCellValue("검사일자");

		
	}

	@Override
	public void mapRow(Row row, DataIntegrationPetResultVO vo) {
		Cell cell = null;
		int i = 0;
		int rowNum = row.getRowNum();
		cell = row.createCell(i++);
		cell.setCellValue(rowNum);

		cell = row.createCell(i++);
		cell.setCellValue(vo.getObjectId());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getPetid());

		cell = row.createCell(i++);
		cell.setCellValue(vo.getDiagSeq());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getPetResult());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getRctuRemark());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getRctu03l());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getRctu03r());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getRctu04l());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getRctu04r());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getRctu05l());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getRctu05r());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getRctu06());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getRctuBapl());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getPetSuvr());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getPetAiSuvr());
		
		cell = row.createCell(i++);
		cell.setCellValue(vo.getTestDay());
		
	

	}
	
	
}

