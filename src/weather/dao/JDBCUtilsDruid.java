package weather.dao;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

import javax.sql.DataSource;

import com.alibaba.druid.pool.DruidDataSourceFactory;

public class JDBCUtilsDruid {
	
	
	private static DataSource ds = null;

	static {
		
		try {
			Properties pro = new Properties();
			pro.load(JDBCUtilsDruid.class.getClassLoader().getResourceAsStream("druid.properties"));
			ds = DruidDataSourceFactory.createDataSource(pro);
			
			
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
	public static Connection getConnection()
	{
		try {
			return ds.getConnection();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;

	}

	
	
	public static DataSource getDataSource()
	{
		return ds;
	}
	
	public static void close(Connection conn,Statement statement, ResultSet rset)
	{
		if(rset != null)
		{
			try {
				rset.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if(statement != null)
		{
			try {
				statement.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if(conn != null)
		{
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	public static void close(Connection conn, Statement stat)
	{
		close(conn, stat, null);
	}
	
}
