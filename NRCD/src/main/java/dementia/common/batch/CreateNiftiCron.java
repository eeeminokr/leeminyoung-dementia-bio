package dementia.common.batch;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermissions;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;
import org.apache.commons.io.FilenameUtils;
import dementia.framework.util.StringUtil;
import dementia.dicomgrp.service.DicomGrpMstVO;

public class CreateNiftiCron {
	
	final static String pbCashDir = "/tmp";
	final static String mriPath="/home/medic/mri_data";
	final static String petPath="/home/medic/pet_data";
	
	String procOption = new String();
	String fromDt = new String();
	String toDt = new String();

		// 1. JDBC Driver Class
		final String driver = "com.mysql.jdbc.Driver";
		
		/**
		 * CSBRAIN2 DB INFO
		 */
		// 운영
//		String csbrain2Url = "jdbc:mysql://220.67.213.201:3306/csbrain2?useSSL=false"
//				+"&characterEncoding=UTF-8&serverTimezone=UTC&autoReconnect=true";
//		String csbrain2User = "root";
//		String csbrain2Pw = "chosun";
		// 테스트
		String csbrain2Url = "jdbc:mysql://192.168.0.244:3306/csbrain2?useSSL=false"
				+"&characterEncoding=UTF-8&serverTimezone=UTC&autoReconnect=true";
		String csbrain2User = "nrcd";
		String csbrain2Pw = "eco0517";
		
		/**
		 * NRCD DB INFO
		 */ 
		// 운영
//		String nrcdUrl = "jdbc:mysql://220.67.213.201:3306/nrcd?useSSL=false"
//				+"&characterEncoding=UTF-8&serverTimezone=UTC&autoReconnect=true";
//		String nrcdUser = "root";
//		String nrcdPw = "chosun";
		// 테스트
		String nrcdUrl = "jdbc:mysql://192.168.0.244:3306/nrcd?useSSL=false"
				+"&characterEncoding=UTF-8&serverTimezone=UTC&autoReconnect=true";
		String nrcdUser = "nrcd";
		String nrcdPw = "eco0517";

		
		/**
		 * ssh common port
		 */
		static int sshPort1 = 22;	//운영
//		static int sshPort1 = 2222;	//테스트
		static int sshPort7 = 2222;
		/**
		 * medic1 ssh Info
		 */
//		static String medic1host = "192.168.0.83";
//		static String medic1User = "root";
//		static String medic1Passwd = "ecowelcome1";
		static String medic1host = "220.67.213.202";
		static String medic1User = "medic";
		static String medic1Passwd = "Chosun!@34";
		/**
		 * medic7 ssh Info
		 */
//		static String medic7host = "192.168.0.84";
//		static String medic7User = "root";
//		static String medic7Passwd = "ecowelcome1";
		static String medic7host = "210.107.187.16";
		static String medic7User = "medic";
		static String medic7Passwd = "Chosun!@34";
		
		static Connection csbrain2Conn;
		static Connection nrcdConn;
	
	static String[] prohibitArr = {
			"_Eq_"
			,"fat_shift"
			,"ADC"
			,"SENSE"
	};
	
	private static final ArrayList<String> EXTENSIONS = new ArrayList<>(Arrays.asList(".gz",".nii"));
	
	/**
	 * DB Connect
	 * @param url
	 * @param dbuser
	 * @param dbPw
	 */	
	protected Connection dbConn(String url, String dbuser, String dbPw) {
		Connection conn = null;
		try {
			// 1. JDBC 드라이버 로딩 
			 Class.forName(driver); 
			 // 2. Connection 객체 생성 
			conn = DriverManager.getConnection(url, dbuser, dbPw);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	/**
	 * DB Disconnect
	 * @param conn
	 */	
	protected void dbDisConn(Connection conn) {
		try {
			if(!conn.isClosed())conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	/**
     * Zip 압축 풀기
     * @param zipFile - 압축 풀 Zip 파일
     * @param targetDir - 압축 푼 파일이 들어간 디렉토리
     */
	public String unZip(File zipFile, String targetDir) throws Exception {
		FileInputStream fis = null;
        ZipInputStream zis = null;
        ZipEntry zentry = null;
        
        try {
            fis = new FileInputStream(zipFile); // FileInputStream
            zis = new ZipInputStream(fis); // ZipInputStream

            while ((zentry = zis.getNextEntry()) != null) {
                String fileNameToUnzip = zentry.getName();
                
                File targetFile = new File(targetDir, fileNameToUnzip);

                unzipEntry(zis, targetFile);

            }
        } finally {
            if (zis != null) {
                zis.close();
            }
            if (fis != null) {
                fis.close();
            }
        }
		return targetDir; // unzipPath
	}
	
	 /**
     * Zip 파일의 한 개 엔트리의 압축 풀기
     *
     * @param zis - Zip Input Stream
     * @param filePath - 압축 풀린 파일의 경로
     * @return
     * @throws Exception
     */
    protected static File unzipEntry(ZipInputStream zis, File targetFile) throws Exception {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(targetFile);

            byte[] buffer = new byte[2048];
            int len = 0;
            while ((len = zis.read(buffer)) != -1) {
                fos.write(buffer, 0, len);
            }
        } finally {
            if (fos != null) {
                fos.close();
            }
        }
        return targetFile;
    }
    
    /**
     * 해당 디렉토리 압축파일 생성 후 삭제
     *
     * @param baseDirectory - 디렉토리
     * @param zipName - 파일명
     * @return
     * @throws Exception
     */
    public static File makeZip(String baseDirectory, String zipName) throws Exception {
		baseDirectory = baseDirectory + PathSep("");
		// 디렉토리 위로 zip 생성하기 꺼내기..
		File zipFile = new File(baseDirectory,zipName+".zip");
		if(zipFile.exists()) {
			grantFileAuth(zipFile);
			zipFile.delete();
		}
		boolean tf = zipFile.createNewFile();
		if(tf) {
			FileOutputStream fos = new FileOutputStream(zipFile);
			BufferedOutputStream bos = new BufferedOutputStream(fos);
			ZipOutputStream zos = new ZipOutputStream(bos);
			zos.setLevel(8);	//default
			File[] files = new File(baseDirectory+zipName).listFiles();
			for (File f : files) {
				ZipEntry zipEntry = new ZipEntry(f.getName());
				zipEntry.setTime(f.lastModified());
				zos.putNextEntry(zipEntry);
	
				BufferedInputStream bis = new BufferedInputStream(new FileInputStream(f));
				byte[] b = new byte[1024];
				int cnt = 0;
				while ((cnt = bis.read(b, 0, b.length)) != -1) {
					zos.write(b, 0, cnt);
				}
				zos.closeEntry();
				bis.close();
			}
			zos.close();
			bos.close();
			fos.close();
		}
		return zipFile;
	}
    
    public static boolean grantAuth(String path) {
		boolean tf = false;
		try {
			String cmd = "chmod 777 -R " + path;
			Runtime rt = Runtime.getRuntime();
			Process prc = rt.exec(cmd);
			prc.waitFor();
			tf = true;
		}catch(Exception e) {
			tf = false;
			e.printStackTrace();
		}
		return tf;
	}
	
    public static boolean grantFileAuth(File oFile) {
    	boolean tf = false;
    	try {
    		oFile.setReadable(true, false);
    		oFile.setWritable(true, false);
    		oFile.setExecutable(true, false);
    		tf = true;
    	}catch(Exception e) {
    		tf = false;
    		e.printStackTrace();
    	}
    	
    	return tf;
	}
    
    public static boolean isThisNii(String seriesDesc, String[] strArr){
		for(int i =0; i < strArr.length; i++){
			if(seriesDesc.toUpperCase().contains(strArr[i].toUpperCase()))return false;
		} 
		return true; 
	}
    
    public static String PathSep(String name) {
		if("".equals(name))return "/";
		else return "/" + name;
	}
    
	public void createNifti(String unzipPath) {
//		System.out.println("createNifti : " + unzipPath);

		Process p = null;
		List<String> cmd = null;
		ProcessBuilder pb = null;
		String PathForNii = new String();
		String zipName = "";
		String parentPath = "";
		try {
			//create niiPath dcm2niix execute...
			makeDir(unzipPath+"_nii"); // nii파일 저장할 폴더 생성
			
			File pathFile = new File(unzipPath);
			
			PathForNii = pathFile.getAbsolutePath().replace("_dicom", "_nii");
//			File niiPath = new File(PathForNii);
			File niiPath = new File(unzipPath+"_nii");
			
			if(!niiPath.exists()) {
				Path np = Paths.get(niiPath.getAbsolutePath());
				Files.createDirectories(np);
				Files.setPosixFilePermissions(np, PosixFilePermissions.fromString("rwxrwxrwx"));
			}
			cmd = new ArrayList<String>();
			cmd.add("dcm2niix");
			cmd.add("-f");
			cmd.add("%p");
			cmd.add("-a");
			cmd.add("y");
			cmd.add("-z");
			cmd.add("y");
			cmd.add("-o");
			cmd.add(niiPath.getAbsolutePath());
			cmd.add(unzipPath);
				
			pb = new ProcessBuilder(cmd);
			pb = pb.directory(new File(pbCashDir)); // tmp
			p = pb.start();  
				 
			while(p.waitFor() > 0) {
//				System.out.println("p.waitFor ===> " + p.waitFor());
			};
			p.getErrorStream().close();
			p.getInputStream().close();
			p.getOutputStream().close();

			zipName = niiPath.getName();
			parentPath = pathFile.getParentFile().getAbsolutePath();
			
			insertNiftiPath(niiPath.getAbsolutePath());
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void insertNiftiPath(String niiPath) {
//		System.out.println("패스넣을때 ? niiPath : " + niiPath);
		// 폴더 경로 /home/medic/mri_data/20190403/19040301_nii/19040301_E0078458_MRI_9715_Local_nii
		DicomGrpMstVO vo = new DicomGrpMstVO();
		
		try {
			File dir = new File(niiPath);
			//File files[] = dir.listFiles();
			String str[];
			String str2[];
			String path[];
			String medicId="";
			String seriesId="";
			String nii="";
			ArrayList<String> files = extensionFilter(dir);
			
			for (int i = 0; i < files.size(); i++) {
			   
			    // medic id
			    str = niiPath.split("/");
			    str2 = str[str.length-1].split("_");
			    medicId = str2[0];
			    
			    // list
				//System.out.println("file?? -> "+files.get(i));
			    
			    // series id & nii path
			    if(niiPath.contains("T1_MPR")) {
			    	seriesId = "T1_MPR";
			    	nii = files.get(i);
//			    	if(files.size() == 1) { // 1) 파일이 하나 있을 때
//			    		nii = files.get(i);
//			    	}else { // 2) 파일이 두개 이상 있을 때
//			    		path = files.get(i).split("/");
//			    		if((path[path.length - 1]).contains("MPR") || (path[path.length - 1]).contains("Tra")) {
//			    			nii = files.get(i);
//			    		}else {
//			    			nii = "";
//			    		}
//			    	}
			    }else if(niiPath.contains("Flair")) {
			    	seriesId = "Flair";
			    	nii = files.get(i);
			    }else if(niiPath.contains("fMRI")) {
			    	seriesId = "fMRI";
			    	nii = files.get(i);
			    }else if(niiPath.contains("T2sag")) {
			    	seriesId = "T2sag";
			    	nii = files.get(i);
			    }else if(niiPath.contains("Local")) { // localizer, localizera, localizerb
			    	seriesId = "Local";
			    	nii = files.get(i);
//			    	if(files.size() == 1) { // 1) 파일이 하나 있을 때
//			    		nii = files.get(i);
//			    	}else { // 2) 파일이 두개 이상 있을 때
//			    		path = files.get(i).split("/");
//			    		
//			    	}
			    	
			    }else if(niiPath.contains("T2_MPR")) {
			    	seriesId = "T2_MPR";
			    	nii = files.get(i);
			    }else if(niiPath.contains("T1sag")) {
			    	seriesId = "T1sag";
			    	nii = files.get(i);
			    }else {
			    	seriesId = "";
			    	nii = "";
			    }
			    
			    System.out.println("!! 최종 파일 nii -> "+nii);
			    
			    vo.setSeriesId(seriesId);
			    vo.setNiiPath(nii);
			    vo.setMedicId(medicId);
			    
			    // DB Insert
			    nrcdConn = dbConn(nrcdUrl, nrcdUser, nrcdPw);
			    updateNiiPath(nrcdConn,vo);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Master table insert process
	 * @param conn
	 * @param oDicomGrpMstVO
	 */
	private int updateNiiPath(Connection conn, DicomGrpMstVO oDicomGrpMstVO) {
		PreparedStatement pStmt = null;
	    StringBuilder sb = new StringBuilder();
	    int result = 0;
	    String insSql = sb.append("UPDATE RD_DICOMGRP_MST").append("\n")
	    	    .append("SET NII_PATH = ?").append("\n")
	    	    .append("WHERE 1 = 1").append("\n")
	    	    .append("AND MEDIC_ID = ?").append("\n")
	    	    .append("AND SERIES_ID = ?").toString();
	    insSql = insSql.replaceAll("'", "\'");
	    try {
	    	 pStmt = conn.prepareStatement(insSql);
			 pStmt.setString(1, oDicomGrpMstVO.getNiiPath());
			 pStmt.setString(2, oDicomGrpMstVO.getMedicId());
			 pStmt.setString(3, oDicomGrpMstVO.getSeriesId());
			 result = pStmt.executeUpdate();
			 
			 System.out.println("insDicomGrpMst ===> "+pStmt.toString());
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }finally {
	    	if(pStmt != null){try{pStmt.close();}catch(SQLException e){e.printStackTrace();}}
	    }
	    return result;
	}
	
	private ArrayList<String> extensionFilter(File folder) {
		  ArrayList<String> result = new ArrayList<>();

		  File[] files = folder.listFiles();

		  if (files != null) {
		    for (File file : files) {
		      if (file.isDirectory()) {
		        result.addAll(extensionFilter(file));
		      }
		      else {
		        if (EXTENSIONS.contains(file.getName().substring(file.getName().lastIndexOf(".")))) {
		          result.add(file.toString());
		        }
		      }
		    }
		  }

		  return result;
		}
	
	public static void deleteDir(String path) {
    	File oldF = new File(path);
    	if(oldF.exists()) {
    		grantAuth(oldF.getAbsolutePath());
			//폴더내 파일을 배열로 가져온다. 
			File[] tempFile = oldF.listFiles();
			if(tempFile != null) {
				if(tempFile.length >0){
				      for (int i = 0; i < tempFile.length; i++) {
				         if(tempFile[i].isFile()){
				            tempFile[i].delete(); // 디렉토리 안의 내용물을 지운다.
				         }else {
				        	 deleteDir(tempFile[i].getPath());
				         }
				         tempFile[i].delete();
				      } // for
				   }
			}
		    oldF.delete();
    	}
    }
	
	public void niftiProcess(String path) {
		File inFile = new File(path);
		String unZipPath = new String();
		String mkDirStr;
		try {
			File[] dts = inFile.listFiles();
			if(dts != null) {
				for(int i = 0 ; i < dts.length ; i++) {
					if(dts[i].isFile()
							&& "ZIP".equals(FilenameUtils.getExtension(dts[i].getName()).toUpperCase())) {
						
						// 0. 압축 풀 폴더 생성 ※3
						mkDirStr = (dts[i].getAbsolutePath()).replace("/"+dts[i].getName(), "");
						makeDir(mkDirStr+"_nii/"+(dts[i].getName()).replace(".zip", "")); // 삭제할 폴더
						
						// 1. 압축 해제
						unZipPath = unZip(dts[i], mkDirStr+"_nii/"+(dts[i].getName()).replace(".zip", ""));
						
						// 2. dcm to nii Conversion
						createNifti(unZipPath);
						
						// 3. 압축해제한 dcm 폴더 삭제
						deleteDir(unZipPath);
						
					}
				}
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void targetDirs(String path) {
		File inFile = new File(path);
		try {
			File[] targetDir = inFile.listFiles();
			if(targetDir != null) {
				for(int i = 0 ; i < targetDir.length ; i++) {
					if(targetDir[i].isDirectory()) {
//						System.out.println("폴더이름 -> "+targetDir[i].getName());
						niftiProcess(targetDir[i].getAbsolutePath());
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * Directory maker
	 * @param createPath
	 */
	public static boolean makeDir(String createPath) {
		
		Path path = Paths.get(createPath);
		boolean tf = false;
		if(!Files.exists(path)) {
		    try {
		      Files.createDirectories(path);
		      tf = true;
//		      System.out.println("폴더생성 패스 -> "+createPath);
		    }catch (IOException e) {
		      e.printStackTrace();
		    }
		}else tf = true;
		return tf;
	}
	
	/**
	 * main
	 * @param args[0] kinds	영상종류 m:mri p:pet
	 * @param args[1] procOption	d:일자 p:기간	
	 * @param args[2] fromDt	시작일자
	 * @param args[3] toDt	종료일자
	 * ex) m d 20190405
	 */
	public static void main(String[] args) {
		CreateNiftiCron oCreateNiftiCron = new CreateNiftiCron();
		SimpleDateFormat fm = new SimpleDateFormat("yyyyMMdd");
		String srcPath = new String();
		try {
			System.out.println("===== niftiProcess started !!! =====");
			if("m".equals(args[0]))srcPath = mriPath;
			else if("p".equals(args[0])) srcPath = petPath;
			else new Exception("args[0] must be m or p...");
			if("d".equals(args[1])) {
				oCreateNiftiCron.targetDirs(srcPath+StringUtil.PathSep(args[2])); // ex) /home/medic/mri_data + /20190405
				System.out.println("path : "+ srcPath+StringUtil.PathSep(args[2]));
			}else if("p".equals(args[1])) {
				String fYmd = args[2];
				String tYmd = args[3];
				if("".equals(args[2])||"".equals(args[3]))new Exception("reconfirm args[2] args[3] parameter...");
				Date fDate;
				Date tDate = fm.parse(args[3]);
				tDate.setTime(tDate.getTime() + ( (long) 1000 * 60 * 60 * 24 ));
				tYmd = fm.format(tDate);
				while(!fYmd.equals(tYmd)) {
					oCreateNiftiCron.targetDirs(srcPath+StringUtil.PathSep(fYmd));
					fDate = fm.parse(fYmd);
					fDate.setTime(fDate.getTime() + ( (long) 1000 * 60 * 60 * 24 ));
					fYmd = fm.format(fDate);
				}
			}else {
				new Exception("reconfirm args[1] parameter...");
			}
			System.out.println("===== niftiProcess finished !!! =====");
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
