package com.goodfor.web.sejong;

public enum SSQL {
	
	CREATE_SUMMARY, DROP_SUMMARY, SELECT_TCASE_SUMMARY, SELECT_TAMOUNT_SUMMARY;
	
	public String toString() {
		String result = "";
		switch(this) {
		case CREATE_SUMMARY : 
			result = "CREATE TABLE SUMMARY \r\n" + 
					"(SUMMARYSEQ INT(5) PRIMARY KEY AUTO_INCREMENT,\r\n" + 
					"CACCOUNT VARCHAR(10),\r\n" + 
					"STOCKCODE VARCHAR(10),\r\n" + 
					"TRADETYPE VARCHAR(10),\r\n" + 
					"ORDERTYPE VARCHAR(10),\r\n" + 
					"TCOUNT INT(10),\r\n" + 
					"TAMOUNT INT(10),\r\n" + 
					"FTAMOUNT INT(10),\r\n" + 
					"CREATEDATE VARCHAR(10))";
			break;
		case DROP_SUMMARY : 
			result = "DROP TABLE SUMMARY";
			break;		
		case SELECT_TCASE_SUMMARY : 
			result = "SELECT SUM(TCOUNT) FROM SUMMARY";
			break;
		case SELECT_TAMOUNT_SUMMARY : 
			result = "SELECT SUM(TAMOUNT) FROM SUMMARY";
			break;
		}
		return result;
	}

}
