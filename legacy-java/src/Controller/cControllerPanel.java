package Controller;
import Model.MControllerPanel;

public class cControllerPanel {
    public boolean LogIn(int userID, String password) {
        MControllerPanel model = new MControllerPanel();
        return model.LogIn(userID, password);
    }
}
