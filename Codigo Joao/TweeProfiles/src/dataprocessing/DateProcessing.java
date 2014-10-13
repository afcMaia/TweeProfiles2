package dataprocessing;

import java.util.Calendar;

public class DateProcessing {
	
	public static double getWeekDay(String date){
		String[] ymd = date.split(" ")[0].split("-");
		
		Calendar cal = Calendar.getInstance();
		
		cal.set(Calendar.YEAR, Integer.parseInt(ymd[0]));
		cal.set(Calendar.MONTH, Integer.parseInt(ymd[1])-1);
		cal.set(Calendar.DATE, Integer.parseInt(ymd[2]));
		
		return (double)cal.get(Calendar.DAY_OF_WEEK);
	}
	
	public static double getHour(String date){
		return Double.parseDouble(date.split(" ")[1].split(":")[0]);
		//return Double.parseDouble(date.split("T")[1].split(":")[0]);
	}

	public static String getYM(String date){
		String[] ymd = date.split(" ")[0].split("-");
		
		String res = Integer.parseInt(ymd[0])+""+Integer.parseInt(ymd[1]);
		
		return res;
	}
}
