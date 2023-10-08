package Model;
import java.sql.*;
import javax.swing.JOptionPane;

public class MydbConnection {
    private static Connection con;//static variable
    
    public static Connection getMyConnection()//called inside a static connection
    {
        try
        {
            String dbpath = "jdbc:mysql://localhost:3306/ScoreBoard?characterEncoding=utf8";//dbpath
            con = DriverManager.getConnection(dbpath,"root","");
        }
        catch(SQLException e)
        {
            JOptionPane.showMessageDialog(null,e.getMessage());
        }
        return con;
    }
}
