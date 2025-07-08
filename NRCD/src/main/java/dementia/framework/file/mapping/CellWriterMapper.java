/**
 * 
 */
package dementia.framework.file.mapping;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;

public interface CellWriterMapper<T> {
	
	void mapHeader(Row row, T vo);

	void mapRow(Row row, T vo);

//	void cellMerge(Sheet sheet);

}
