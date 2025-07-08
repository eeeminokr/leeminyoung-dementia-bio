package dementia.dataIntegration.service;

import dementia.framework.vo.KoriginCommonVO;

public class DataIntegrationVO extends KoriginCommonVO{

	/**
	 * 
	 */
	private static final long serialVersionUID = -9142151026636107708L;
	private String objectId;
	private String subjectId;
	private String patientSex;
	private String age;
	private String diagSeq;
	private String beforeDiagSeq;
	private String diagLastSeq;
	private String diagNm1;
	private String diagNm2;
	private String diagAge;
	private String diagDate;
	private String doctorName;
	private String mmse;
	private String snsb;
	private String mri;
	private String pet;
	private String blood;
	private String csf;
	private String brainwave;
	private String genomeChipNm;
	private int seqMaxNum; 
	private int seqDupNum;
	private String rowDupNum;
	private String diagSelect;
	private String startAge;
	private String endAge;
	private String schKeyWord;
	private String diagNmMaxLen;
	private String petResultV;
	private String petResult;
	private String petSubject;
	private String cdrStep;
	private String grade;
	private String diagNmBgColor;
	private String diagNmColor;
	private String downType;
	private String instCode;
	private String abo;
	private String apoeCd;
	private String kChip;
	private int maxMri;
	private int maxPet;
	private int maxBlood;
	private int maxCsf;
	private int maxBrainwave;
	private String petSuvr;
	private String petAiSuvr;
	private String eduLevel;
	private String brainwaveSearch;
	
	public String getPetSuvr() {
		return petSuvr;
	}
	public void setPetSuvr(String petSuvr) {
		this.petSuvr = petSuvr;
	}	
	public String getEduLevel() {
		return eduLevel;
	}
	public void setEduLevel(String eduLevel) {
		this.eduLevel = eduLevel;
	}
	public String getkChip() {
		return kChip;
	}
	public void setkChip(String kChip) {
		this.kChip = kChip;
	}
	public String getApoeCd() {
		return apoeCd;
	}
	public void setApoeCd(String apoeCd) {
		this.apoeCd = apoeCd;
	}
	public String getObjectId() {
		return objectId;
	}
	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}
	public String getSubjectId() {
		return subjectId;
	}
	public void setSubjectId(String subjectId) {
		this.subjectId = subjectId;
	}
	public String getPatientSex() {
		return patientSex;
	}
	public void setPatientSex(String patientSex) {
		this.patientSex = patientSex;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getDiagSeq() {
		return diagSeq;
	}
	public void setDiagSeq(String diagSeq) {
		this.diagSeq = diagSeq;
	}
	public String getBeforeDiagSeq() {
		return beforeDiagSeq;
	}
	public void setBeforeDiagSeq(String beforeDiagSeq) {
		this.beforeDiagSeq = beforeDiagSeq;
	}
	public String getDiagLastSeq() {
		return diagLastSeq;
	}
	public void setDiagLastSeq(String diagLastSeq) {
		this.diagLastSeq = diagLastSeq;
	}
	public String getDiagNm1() {
		return diagNm1;
	}
	public void setDiagNm1(String diagNm1) {
		this.diagNm1 = diagNm1;
	}
	public String getDiagNm2() {
		return diagNm2;
	}
	public void setDiagNm2(String diagNm2) {
		this.diagNm2 = diagNm2;
	}
	public String getDiagAge() {
		return diagAge;
	}
	public void setDiagAge(String diagAge) {
		this.diagAge = diagAge;
	}
	public String getDiagDate() {
		return diagDate;
	}
	public void setDiagDate(String diagDate) {
		this.diagDate = diagDate;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public String getMmse() {
		return mmse;
	}
	public void setMmse(String mmse) {
		this.mmse = mmse;
	}
	public String getSnsb() {
		return snsb;
	}
	public void setSnsb(String snsb) {
		this.snsb = snsb;
	}
	public String getMri() {
		return mri;
	}
	public void setMri(String mri) {
		this.mri = mri;
	}
	public String getPet() {
		return pet;
	}
	public void setPet(String pet) {
		this.pet = pet;
	}
	public String getBlood() {
		return blood;
	}
	public void setBlood(String blood) {
		this.blood = blood;
	}
	public String getCsf() {
		return csf;
	}
	public void setCsf(String csf) {
		this.csf = csf;
	}
	public String getBrainwave() {
		return brainwave;
	}
	public void setBrainwave(String brainwave) {
		this.brainwave = brainwave;
	}
	public String getGenomeChipNm() {
		return genomeChipNm;
	}
	public void setGenomeChipNm(String genomeChipNm) {
		this.genomeChipNm = genomeChipNm;
	}
	public int getSeqMaxNum() {
		return seqMaxNum;
	}
	public void setSeqMaxNum(int seqMaxNum) {
		this.seqMaxNum = seqMaxNum;
	}
	public int getSeqDupNum() {
		return seqDupNum;
	}
	public void setSeqDupNum(int seqDupNum) {
		this.seqDupNum = seqDupNum;
	}
	public String getRowDupNum() {
		return rowDupNum;
	}
	public void setRowDupNum(String rowDupNum) {
		this.rowDupNum = rowDupNum;
	}
	public String getDiagSelect() {
		return diagSelect;
	}
	public void setDiagSelect(String diagSelect) {
		this.diagSelect = diagSelect;
	}
	public String getStartAge() {
		return startAge;
	}
	public void setStartAge(String startAge) {
		this.startAge = startAge;
	}
	public String getEndAge() {
		return endAge;
	}
	public void setEndAge(String endAge) {
		this.endAge = endAge;
	}
	public String getSchKeyWord() {
		return schKeyWord;
	}
	public void setSchKeyWord(String schKeyWord) {
		this.schKeyWord = schKeyWord;
	}
	public String getDiagNmMaxLen() {
		return diagNmMaxLen;
	}
	public void setDiagNmMaxLen(String diagNmMaxLen) {
		this.diagNmMaxLen = diagNmMaxLen;
	}
	public String getPetResult() {
		return petResult;
	}
	public void setPetResult(String petResult) {
		this.petResult = petResult;
	}
	public String getPetResultV() {
		return petResultV;
	}
	public void setPetResultV(String petResultV) {
		this.petResultV = petResultV;
	}
	public String getPetSubject() {
		return petSubject;
	}
	public void setPetSubject(String petSubject) {
		this.petSubject = petSubject;
	}
	public String getCdrStep() {
		return cdrStep;
	}
	public void setCdrStep(String cdrStep) {
		this.cdrStep = cdrStep;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public String getDiagNmBgColor() {
		return diagNmBgColor;
	}
	public void setDiagNmBgColor(String diagNmBgColor) {
		this.diagNmBgColor = diagNmBgColor;
	}
	public String getDiagNmColor() {
		return diagNmColor;
	}
	public void setDiagNmColor(String diagNmColor) {
		this.diagNmColor = diagNmColor;
	}
	public String getDownType() {
		return downType;
	}
	public void setDownType(String downType) {
		this.downType = downType;
	}
	public String getInstCode() {
		return instCode;
	}
	public void setInstCode(String instCode) {
		this.instCode = instCode;
	}
	public String getAbo() {
		return abo;
	}
	public void setAbo(String abo) {
		this.abo = abo;
	}
	public int getMaxMri() {
		return maxMri;
	}
	public void setMaxMri(int maxMri) {
		this.maxMri = maxMri;
	}
	public int getMaxPet() {
		return maxPet;
	}
	public void setMaxPet(int maxPet) {
		this.maxPet = maxPet;
	}
	public int getMaxBlood() {
		return maxBlood;
	}
	public void setMaxBlood(int maxBlood) {
		this.maxBlood = maxBlood;
	}
	public int getMaxCsf() {
		return maxCsf;
	}
	public void setMaxCsf(int maxCsf) {
		this.maxCsf = maxCsf;
	}
	public int getMaxBrainwave() {
		return maxBrainwave;
	}
	public void setMaxBrainwave(int maxBrainwave) {
		this.maxBrainwave = maxBrainwave;
	}
	public String getBrainwaveSearch() {
		return brainwaveSearch;
	}
	public void setBrainwaveSearch(String brainwaveSearch) {
		this.brainwaveSearch = brainwaveSearch;
	}
	public String getPetAiSuvr() {
		return petAiSuvr;
	}
	public void setPetAiSuvr(String petAiSuvr) {
		this.petAiSuvr = petAiSuvr;
	}
	
	
	
}

