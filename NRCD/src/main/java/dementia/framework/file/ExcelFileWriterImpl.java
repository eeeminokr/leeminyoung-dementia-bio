package dementia.framework.file;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.util.Assert;

import dementia.dataIntegration.service.impl.DataIntegrationWriterMapper;
import dementia.framework.file.mapping.CellWriterMapper;

public class ExcelFileWriterImpl<T> extends ExcelFileWriter<T> implements InitializingBean {
	private CellWriterMapper<T> cellMapper = null;

	@Override
	public ExcelFile excelWrite(List<T> list, int version) {
		boolean isXlsx = version == ExcelFile.XLSX;
		Workbook workbook = null;

		if (isXlsx == true) {
			workbook = new SXSSFWorkbook();
		} else {
			workbook = new HSSFWorkbook();
		}

		// init style
		createCellStyle(workbook);
		// create sheet
		Sheet sheet = workbook.createSheet();
		sheet.createFreezePane(0, 1);
		
		//데이터 통합 정보 분석 header설정
		if ( cellMapper instanceof DataIntegrationWriterMapper ) {
			sheet.createFreezePane(0, 2);
		}
		
		
		
		int rowIdx = 0;
		for (T t : list) {
			if (isXlsx == false && rowIdx == 65535) {
				sheet = workbook.createSheet();
				rowIdx = 0;
			}

			if (rowIdx == 0) {
				// header
				Row headerRow = sheet.createRow(0);		
				if (this.getHeader().isEmpty() == false) {
					int size = this.getHeader().size();
					for (int i = 0; i < size; i++) {
						Cell cell = headerRow.createCell(i);
						cell.setCellValue(this.getHeader().get(i));
					}
				} else {
					cellMapper.mapHeader(headerRow, t);
				}
				applyHeaderStyle(headerRow);
				
				//데이터 통합 정보 분석 header설정
				if ( cellMapper instanceof DataIntegrationWriterMapper ) {
					Row headerRow2 = sheet.createRow(1);
					cellMapper.mapHeader(headerRow2, t);
					rowIdx = 1;
					dataIntegrationCellStyle(workbook,headerRow);
					dataIntegrationCellStyle(workbook,headerRow2);
					dataIntegrationCellMerge(sheet) ;
				}
			}

			Row row = sheet.createRow(rowIdx + 1);
			cellMapper.mapRow(row, t);
			applyStyle(row);

			rowIdx++;
		}

		ByteArrayOutputStream out = null;

		try {
			out = new ByteArrayOutputStream();
			workbook.write(out);

			ExcelFile excelFile = new ExcelFile();
			excelFile.setBytes(out.toByteArray());
			excelFile.setVersion(isXlsx ? ExcelFile.XLSX : ExcelFile.XLS);

			return excelFile;
		} catch (IOException e) {
			throw new ExcelFileWriterException(e.getMessage());
		} finally {
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {

				}
			}
		}

	}

	private void applyHeaderStyle(Row row) {
		Iterator<Cell> headerCells = row.cellIterator();
		while (headerCells.hasNext()) {
			Cell cell = headerCells.next();
			cell.setCellStyle(super.getHeaderStyle());
		}
	}

	private void applyStyle(Row row) {
		Iterator<Cell> cells = row.cellIterator();
		while (cells.hasNext()) {
			Cell cell = cells.next();
			cell.setCellStyle(super.getDefaultStyle());
		}
	}

	public void setCellMapper(CellWriterMapper<T> cellMapper) {
		this.cellMapper = cellMapper;
	}

	public void afterPropertiesSet() throws Exception {
		Assert.notNull(this.cellMapper, "CellMapper is required.");
	}

	private void applySetStyle(Row row, CellStyle cellStyle) {
		Iterator<Cell> headerCells = row.cellIterator();
		while (headerCells.hasNext()) {
			Cell cell = headerCells.next();
			cell.setCellStyle(cellStyle);
		}
	}
	private void dataIntegrationCellStyle(Workbook workbook, Row row) {
		//셀 스타일
		CellStyle headerStyle = workbook.createCellStyle();
		headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
		headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		headerStyle.setFillPattern((short) 17);
		headerStyle.setFillForegroundColor(new HSSFColor.GREY_25_PERCENT().getIndex());
		headerStyle.setFillBackgroundColor(new HSSFColor.GREY_25_PERCENT().getIndex());
		//테두리 선 (우,좌,위,아래)
		headerStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
		headerStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		headerStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
		headerStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		applySetStyle(row,headerStyle);
		
	}
	private void dataIntegrationCellMerge(Sheet sheet) { 
		//병합 영역 설정
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));	//순번
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));	//SUBJECT ID
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));	//연령
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));	//진단횟수
//		sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));	//임상진단
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));	//진단나이
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));	//진단년월
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));	//Global CDR
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));	//진단자
//		sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 11));	//신경심리검사
//		sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 16));	//영상
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));	//학력
//		sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 19));	//유전체
//		sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 22));	//검체시료
//		sheet.addMergedRegion(new CellRangeAddress(0, 1, 23, 23));	//EEG/ERP
	
		//병합 영역 설정
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
		
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
		
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 11));
	   
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 16));

		sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 18, 18));
		
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 20));
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 23));		
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 24, 24));
		
		
	}
}
