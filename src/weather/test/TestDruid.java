package weather.test;

import weather.dao.JDBCUtilsDruid;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TestDruid {

	public static void main(String[] args) {
		
//		Connection conn = null;
//		PreparedStatement prestat = null;
//		ResultSet rSet = null;
//		try {
//			conn = JDBCUtilsDruid.getConnection();
//			String sql = "select * from 北京 where T < ?";
//			prestat = conn.prepareStatement(sql);
//			prestat.setInt(1, 20);
//			rSet = prestat.executeQuery();
//			while(rSet.next())
//			{
//				System.out.println(rSet.getString(2));
//			}
//		} catch (SQLException e) {
//			e.printStackTrace();
//		}
//		finally {
//			JDBCUtilsDruid.close(conn, prestat, rSet);
//		}
		String s = "03";
		int i = Integer.parseInt(s) + 1;
		System.out.println(i);

	}

}
