package weather.dao;

import weather.domain.DateInterval;
import weather.domain.WeatherData;
import weather.utils.MyStringUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class SearchWeatherData {

    //获取数据的行数
    public static int getRowsCount(DateInterval dateInterval,String cityName, String dataType,String checkedBase)
    {
        String databaseName = cityName;
        if("interval".equals(dataType))
        {
            if(checkedBase == null || checkedBase.equals("")) checkedBase = "日区间";
            databaseName = cityName + "_" + checkedBase;
        }
        else if("middle".equals(dataType))
        {
            if(checkedBase == null || checkedBase.equals("")) checkedBase = "日中值";
            databaseName = cityName + "_" + checkedBase;
        }

        Connection conn = JDBCUtilsDruid.getConnection();
        PreparedStatement prestat = null;
        ResultSet rs = null;
        String rowsCountSql = "";

        try {
            if("年".equals(dateInterval.getYearFrom()) == false)
            {
                if("年".equals(dateInterval.getYearTo()) == false)
                {
                    rowsCountSql = "select count(Date) from "+ databaseName +" where date between ? and ? ";
                    prestat = conn.prepareStatement(rowsCountSql);
                    String dateFrom = dateInterval.getYearFrom() + "-" + dateInterval.getMonthFrom() + "-" + dateInterval.getDayFrom();
                    int end = Integer.parseInt(dateInterval.getDayTo()) + 1;
                    String ends = MyStringUtils.getDoubleDigitDate(String.valueOf(end));
                    String dateTo = dateInterval.getYearTo() + "-" + dateInterval.getMonthTo() + "-" + ends;
                    prestat.setString(1,dateFrom);
                    prestat.setString(2,dateTo);

                }
                else { //yearFrom不是年，yearTo是年，所以是年---形式
                    if("月".equals(dateInterval.getMonthFrom()) == false) // 年月---
                    {
                        if("日".equals(dateInterval.getDayFrom()) == false) // 年月日
                        {
                            rowsCountSql = "select count(Date) from "+ databaseName +" where substr(date,1,10) = ? ";
                            prestat = conn.prepareStatement(rowsCountSql);
                            String date = dateInterval.getYearFrom() + "-" + dateInterval.getMonthFrom() + "-" + dateInterval.getDayFrom();
                            prestat.setString(1,date);
                        }
                        else { //年月
                            rowsCountSql = "select count(Date) from "+ databaseName +" where substr(date,1,7) = ? ";
                            prestat = conn.prepareStatement(rowsCountSql);
                            String date = dateInterval.getYearFrom() + "-" + dateInterval.getMonthFrom();
                            prestat.setString(1,date);
                        }

                    }
                    else { // 年
                        rowsCountSql = "select count(Date) from "+ databaseName +" where substr(date,1,4) = ? ";
                        prestat = conn.prepareStatement(rowsCountSql);
                        prestat.setString(1,dateInterval.getYearFrom());
                    }
                }
            }
            else if("月".equals(dateInterval.getMonthFrom()) ==  false)
            {
                if("月".equals(dateInterval.getMonthTo()) == false)
                {
                    rowsCountSql = "select count(Date) from " + databaseName + " where substr(date,6,2) between ? and ? ";
                    prestat = conn.prepareStatement(rowsCountSql);
                    prestat.setString(1, dateInterval.getMonthFrom());
                    int end = Integer.parseInt(dateInterval.getMonthTo()) + 1;
                    String ends = MyStringUtils.getDoubleDigitDate(String.valueOf(end));
                    prestat.setString(2,ends);
                }

                else {
                    rowsCountSql = "select count(Date) from "+ databaseName +" where substr(date,6,2) = ? ";
                    prestat = conn.prepareStatement(rowsCountSql);
                    prestat.setString(1,dateInterval.getMonthFrom());
                }
            }
            else if( "日".equals(dateInterval.getDayFrom()) ==  false)
            {
                if("日".equals(dateInterval.getDayTo()) == false)
                {
                    rowsCountSql = "select count(Date) from "+ databaseName +" where substr(date,7,2) between ? and ? ";
                    prestat = conn.prepareStatement(rowsCountSql);
                    prestat.setString(1,dateInterval.getDayFrom());
                    int end = Integer.parseInt(dateInterval.getDayTo()) + 1;
                    String ends = MyStringUtils.getDoubleDigitDate(String.valueOf(end));
                    prestat.setString(2, ends);

                }
                else {
                    rowsCountSql = "select count(Date) from "+ databaseName +" where substr(date,7,2) = ? ";
                    prestat = conn.prepareStatement(rowsCountSql);
                    prestat.setString(1,dateInterval.getDayFrom());
                }
            }
            rs = prestat.executeQuery();
            rs.first();
            int rowsCount = rs.getInt(1);

            return rowsCount;
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            JDBCUtilsDruid.close(conn,prestat,rs);
        }
        return 0;
    }

    /**
     *  获取分页的天气数据
     * @param dateInterval
     * @param page
     * @param cityName
     * @param dataType
     * @param checkedBase
     * @return
     */
    public static ArrayList<WeatherData> getData(DateInterval dateInterval,int page,String cityName, String dataType,String checkedBase)
    {

        String databaseName = cityName;
        if("interval".equals(dataType))
        {
            if(checkedBase == null || checkedBase.equals("")) checkedBase = "日区间";
            databaseName = cityName + "_" + checkedBase;
        }
        else if("middle".equals(dataType))
        {
            if(checkedBase == null || checkedBase.equals("")) checkedBase = "日中值";
            databaseName = cityName + "_" + checkedBase;
        }
        System.out.println("basename:" + databaseName);
        Connection conn = JDBCUtilsDruid.getConnection();
        PreparedStatement prestat = null;
        ResultSet rs = null;
        String sql = "";
        ArrayList<WeatherData> dataList = new ArrayList<>();
        try {
            if("年".equals(dateInterval.getYearFrom()) == false)
            {
                if("年".equals(dateInterval.getYearTo()) == false) //yearTo不是年
                {
                    sql = "select * from "+ databaseName +" where date between ? and ? limit ?,9";
                    prestat = conn.prepareStatement(sql);
                    String dateFrom = dateInterval.getYearFrom() + "-" + dateInterval.getMonthFrom() + "-" + dateInterval.getDayFrom();
                    int end = Integer.parseInt(dateInterval.getDayTo()) + 1;
                    String ends = MyStringUtils.getDoubleDigitDate(String.valueOf(end));
                    String dateTo = dateInterval.getYearTo() + "-" + dateInterval.getMonthTo() + "-" + ends;
                    prestat.setString(1,dateFrom);
                    prestat.setString(2,dateTo);
                    prestat.setInt(3,(page-1) * 9);

                }

                else { //yearFrom不是年，yearTo是年，所以是年---形式
                    if("月".equals(dateInterval.getMonthFrom()) == false) // 年月---
                    {
                        if("日".equals(dateInterval.getDayFrom()) == false) // 年月日
                        {
                            sql = "select * from "+ databaseName +" where substr(date,1,10) = ? limit ?,9";
                            prestat = conn.prepareStatement(sql);
                            String date = dateInterval.getYearFrom() + "-" + dateInterval.getMonthFrom() + "-" + dateInterval.getDayFrom();
                            prestat.setString(1,date);
                            prestat.setInt(2, (page - 1) * 9);
                        }
                        else { //年月
                            sql = "select * from "+ databaseName +" where substr(date,1,7) = ? limit ?,9";
                            prestat = conn.prepareStatement(sql);
                            String date = dateInterval.getYearFrom() + "-" + dateInterval.getMonthFrom();
                            prestat.setString(1,date);
                            prestat.setInt(2, (page - 1) * 9);
                        }

                    }
                   else { // 年
                        sql = "select * from "+ databaseName +" where substr(date,1,4) = ? limit ?,9";
                        prestat = conn.prepareStatement(sql);
                        prestat.setString(1,dateInterval.getYearFrom());
                        prestat.setInt(2,(page-1) * 9);
                    }
                }
            }
            else if("月".equals(dateInterval.getMonthFrom()) ==  false)
            {
                if("月".equals(dateInterval.getMonthTo()) == false)
                {
                    sql = "select * from " + databaseName + " where substr(date,6,2) between ? and ? limit ?,9";
                    prestat = conn.prepareStatement(sql);
                    prestat.setString(1, dateInterval.getMonthFrom());
                    int end = Integer.parseInt(dateInterval.getMonthTo()) + 1;
                    String ends = MyStringUtils.getDoubleDigitDate(String.valueOf(end));
                    prestat.setString(2,ends);
                    prestat.setInt(3,(page-1) * 9);
                }

                else {
                    sql = "select * from "+ databaseName +" where substr(date,6,2) = ? limit ?,9";
                    prestat = conn.prepareStatement(sql);
                    prestat.setString(1,dateInterval.getMonthFrom());
                    prestat.setInt(2,(page-1) * 9);
                }
            }
            else if( "日".equals(dateInterval.getDayFrom()) ==  false)
            {
                if("日".equals(dateInterval.getDayTo()) == false)
                {
                    sql = "select * from "+ databaseName +" where substr(date,7,2) between ? and ? limit ?,9";
                    prestat = conn.prepareStatement(sql);
                    prestat.setString(1,dateInterval.getDayFrom());
                    int end = Integer.parseInt(dateInterval.getDayTo()) + 1;
                    String ends = MyStringUtils.getDoubleDigitDate(String.valueOf(end));
                    prestat.setString(2, ends);
                    prestat.setInt(3,(page-1) * 9);

                }
                else {
                    sql = "select * from "+ databaseName +" where substr(date,7,2) = ? limit ?,9";
                    prestat = conn.prepareStatement(sql);
                    prestat.setString(1,dateInterval.getDayFrom());
                    prestat.setInt(2,(page-1) * 9);
                }
            }
            rs = prestat.executeQuery();
            if(checkedBase.contains("区间"))
            {
                while(rs.next())
                {
                    WeatherData wd = new WeatherData();
                    wd.setDate(rs.getString(1));
                    wd.setT("[" + rs.getString(2) + "," + rs.getString(3) + "]");
                    wd.setPo("[" + rs.getString(4) + "," + rs.getString(5) + "]");
                    wd.setU("[" + rs.getString(6) + "," + rs.getString(7) + "]");
                    wd.setVv("[" + rs.getString(8) + "," + rs.getString(9) + "]");
                    wd.setTd("[" + rs.getString(10) + "," + rs.getString(11) + "]");
                    dataList.add(wd);
                }
            }
            else {
                while (rs.next()) {
                    WeatherData wd = new WeatherData();
                    wd.setDate(rs.getString(1));
                    wd.setT(rs.getString(2));
                    wd.setPo(rs.getString(3));
                    wd.setU(rs.getString(4));
                    wd.setVv(rs.getString(5));
                    wd.setTd(rs.getString(6));

                    dataList.add(wd);
                }
            }

            return dataList;
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            JDBCUtilsDruid.close(conn,prestat,rs);
        }
        return null;
    }
/*
 获取所有的天气数据，不分页

 dataType:initial,interval，middle
 checked:日中值，月中值...
 */
    public static ArrayList<WeatherData> getAllData(DateInterval dateInterval,String cityName, String dataType,String checkedBase)
    {
        String databaseName = cityName;
        if("interval".equals(dataType))
        {
            if(checkedBase == null || checkedBase.equals("")) checkedBase = "日区间";
            databaseName = cityName + "_" + checkedBase;
        }
        else if("middle".equals(dataType))
        {
            if(checkedBase == null || checkedBase.equals("")) checkedBase = "日中值";
            databaseName = cityName + "_" + checkedBase;
        }

        Connection conn = JDBCUtilsDruid.getConnection();
        PreparedStatement prestat = null;
        ResultSet rs = null;
        String sql = "";

        try {
            if("年".equals(dateInterval.getYearFrom()) == false)
            {
                if("年".equals(dateInterval.getYearTo()) == false)
                {
                    sql = "select * from "+ databaseName +" where date between ? and ? ";
                    prestat = conn.prepareStatement(sql);
                    String dateFrom = dateInterval.getYearFrom() + "-" + dateInterval.getMonthFrom() + "-" + dateInterval.getDayFrom();
                    int end = Integer.parseInt(dateInterval.getDayTo()) + 1;
                    String ends = MyStringUtils.getDoubleDigitDate(String.valueOf(end));
                    String dateTo = dateInterval.getYearTo() + "-" + dateInterval.getMonthTo() + "-" + ends;
                    prestat.setString(1,dateFrom);
                    prestat.setString(2,dateTo);

                }
                else { //yearFrom不是年，yearTo是年，所以是年---形式
                    if("月".equals(dateInterval.getMonthFrom()) == false) // 年月---
                    {
                        if("日".equals(dateInterval.getDayFrom()) == false) // 年月日
                        {
                            sql = "select * from "+ databaseName +" where substr(date,1,10) = ? ";
                            prestat = conn.prepareStatement(sql);
                            String date = dateInterval.getYearFrom() + "-" + dateInterval.getMonthFrom() + "-" + dateInterval.getDayFrom();
                            prestat.setString(1,date);
                        }
                        else { //年月
                            sql = "select * from "+ databaseName +" where substr(date,1,7) = ? ";
                            prestat = conn.prepareStatement(sql);
                            String date = dateInterval.getYearFrom() + "-" + dateInterval.getMonthFrom();
                            prestat.setString(1,date);
                        }

                    }
                    else { // 年
                        sql = "select * from "+ databaseName +" where substr(date,1,4) = ? ";
                        prestat = conn.prepareStatement(sql);
                        prestat.setString(1,dateInterval.getYearFrom());
                    }
                }
            }
            else if("月".equals(dateInterval.getMonthFrom()) ==  false)
            {
                if("月".equals(dateInterval.getMonthTo()) == false)
                {
                    sql = "select * from " + databaseName + " where substr(date,6,2) between ? and ? ";
                    prestat = conn.prepareStatement(sql);
                    prestat.setString(1, dateInterval.getMonthFrom());
                    int end = Integer.parseInt(dateInterval.getMonthTo()) + 1;
                    String ends = MyStringUtils.getDoubleDigitDate(String.valueOf(end));
                    prestat.setString(2,ends);
                }

                else {
                    sql = "select * from "+ databaseName +" where substr(date,6,2) = ? ";
                    prestat = conn.prepareStatement(sql);
                    prestat.setString(1,dateInterval.getMonthFrom());
                }
            }
            else if( "日".equals(dateInterval.getDayFrom()) ==  false)
            {
                if("日".equals(dateInterval.getDayTo()) == false)
                {
                    sql = "select * from "+ databaseName +" where substr(date,7,2) between ? and ? ";
                    prestat = conn.prepareStatement(sql);
                    prestat.setString(1,dateInterval.getDayFrom());
                    int end = Integer.parseInt(dateInterval.getDayTo()) + 1;
                    String ends = MyStringUtils.getDoubleDigitDate(String.valueOf(end));
                    prestat.setString(2, ends);

                }
                else {
                    sql = "select * from "+ databaseName +" where substr(date,7,2) = ? ";
                    prestat = conn.prepareStatement(sql);
                    prestat.setString(1,dateInterval.getDayFrom());
                }
            }
            rs = prestat.executeQuery();
            ArrayList<WeatherData> dataList = new ArrayList<>();
            if(checkedBase.contains("区间"))
            {
                while(rs.next())
                {
                    WeatherData wd = new WeatherData();
                    wd.setDate(rs.getString(1));
                    wd.setT("[" + rs.getString(2) + "," + rs.getString(3) + "]");
                    wd.setPo("[" + rs.getString(4) + "," + rs.getString(5) + "]");
                    wd.setU("[" + rs.getString(6) + "," + rs.getString(7) + "]");
                    wd.setVv("[" + rs.getString(8) + "," + rs.getString(9) + "]");
                    wd.setTd("[" + rs.getString(10) + "," + rs.getString(11) + "]");
                    dataList.add(wd);
                }
            }
            else {
                while (rs.next()) {
                    WeatherData wd = new WeatherData();
                    wd.setDate(rs.getString(1));
                    wd.setT(rs.getString(2));
                    wd.setPo(rs.getString(3));
                    wd.setU(rs.getString(4));
                    wd.setVv(rs.getString(5));
                    wd.setTd(rs.getString(6));

                    dataList.add(wd);
                }
            }
            return dataList;
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            JDBCUtilsDruid.close(conn,prestat,rs);
        }
        return null;
    }




}
