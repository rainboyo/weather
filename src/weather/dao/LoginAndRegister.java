package weather.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class LoginAndRegister {


    public static boolean login(String username, String password)
    {
        Connection conn = JDBCUtilsDruid.getConnection();
        PreparedStatement prestat = null;
        ResultSet rs = null;

        try {

            String sql = "select count(id) from userinfo where name = ? and password = ?";
            prestat = conn.prepareStatement(sql);
            prestat.setString(1,username);
            prestat.setString(2,password);

            rs = prestat.executeQuery();
            rs.first();
            if(rs.getInt(1) != 0)
                return true;
            return false;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        finally {
            JDBCUtilsDruid.close(conn,prestat,rs);
        }
        return true;
    }
    public static boolean register(String username, String password)
    {
        Connection conn = JDBCUtilsDruid.getConnection();
        PreparedStatement prestat = null;
        ResultSet rs = null;

        try {

            String sql = "insert into userinfo(name,password) values(?,?)";
            prestat = conn.prepareStatement(sql);
            prestat.setString(1,username);
            prestat.setString(2,password);

            int r = prestat.executeUpdate();
            if(r != 0)
                return true;
            return false;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        finally {
            JDBCUtilsDruid.close(conn,prestat);
        }
        return true;
    }
}
