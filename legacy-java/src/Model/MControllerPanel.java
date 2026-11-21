
package Model;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.sql.PreparedStatement; // Add this import
import javax.swing.JOptionPane;


public class MControllerPanel {
   public boolean LogIn(int userID,String password) {
        try {
            Connection conn = MydbConnection.getMyConnection();
            
            String query = "SELECT * FROM users WHERE UserID = ? AND Password = ?";
            PreparedStatement preparedStatement = conn.prepareStatement(query);
            preparedStatement.setInt(1, userID);
            preparedStatement.setString(2, password);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                // If a matching record is found, login is successful
                return true;
            } else {
                // If no matching record is found, login fails
                return false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Database error: " + e.getMessage());
            return false;
        }
    }
}
