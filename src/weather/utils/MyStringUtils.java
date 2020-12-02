package weather.utils;

public class MyStringUtils {
    /**
     * 将月份和日期小于10的变为01，02，03...这样的字符串
     */
    public static String getDoubleDigitDate(String date)
    {
        int d = Integer.parseInt(date);
        if(d < 10)
            date = "0" + date;
        return date;
    }

}
