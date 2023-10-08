
package View;

import java.awt.Image;
import javax.swing.ImageIcon;


public class MainUi extends javax.swing.JFrame {
private ViewStats viewStats; // Add this instance variable
   public void scaleimg() {
       //APPLING A BG PIC ADDING A LBL
   try {
       ImageIcon icon = new ImageIcon("C:\\Users\\udaba\\OneDrive\\Documents\\NetBeansProjects\\ScoreBoard\\src\\View\\Images\\MainUiImage.jpg");
       Image img=icon.getImage();
       Image imgscl=img.getScaledInstance(jLabel7.getWidth(), jLabel7.getHeight(), Image.SCALE_SMOOTH);
       ImageIcon sclit = new ImageIcon(imgscl);
       jLabel7.setIcon(sclit);
   }
   catch (Exception e) {
        // Handle any exceptions that may occur (e.g., file not found)
        e.printStackTrace();
           }}
    public MainUi() {
        initComponents();
        scaleimg();
        // Set the initial value of the "HomeTotal" label to 0
        HomeTotal.setText("0");
        // Set the initial value of the "VisitorTotal" label to 0
        VisitorTotal.setText("0");
        //Setting Home Wickets
        lblHomeWickets.setText("0");
        //Setting Visitor Wickets
        lblVisitorWickets.setText("0");
    }
    // Method to update the label text
    public void updateHomeLabel(String text) {
        lblDisplayHome.setText(text);
    }
    
    public void updateVisitotLabel(String text) {
        lblDisplayVisitor.setText(text);
    }
    // Method to update the HomeTotal label text
    public void updateHomeTotalLabel(String text) {
        HomeTotal.setText(text);
    }
    public void updateVisitorTotalLabel(String text) {
        VisitorTotal.setText(text);
    }
    public void updateHomeWickLabel(String text) {
        lblHomeWickets.setText(text);
    }
    public void updateVisitorWickLabel(String text) {
        lblVisitorWickets.setText(text);
    }
    
    public String getHomeLabelText() {
    return lblDisplayHome.getText();
}
//methods to get the values from the labels and text fields
public String getHomeTotalText() {
    return HomeTotal.getText();
}

public String getVisitorLabelText() {
    return lblDisplayVisitor.getText();
}

public String getVisitorTotalText() {
    return VisitorTotal.getText();
}
// Method to update lblDisplayHome with the passed text
    public void updateDisplayHomeLabel(String text) {
        lblDisplayHome.setText(text);
    }
// Method to update the labels in ViewStats
    public void updateViewStatsLabels() {
        String homeTotalText = HomeTotal.getText(); // Get text from HomeTotal label in MainUi
        String visitorTotalText = VisitorTotal.getText(); // Get text from VisitorTotal label in MainUi

        // Call the update methods in ViewStats
        viewStats.updateHomeTotalLabel(homeTotalText);
        viewStats.updateVisitorTotalLabel(visitorTotalText);
    }


    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jSplitPane1 = new javax.swing.JSplitPane();
        jScrollPane5 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        jScrollPane1 = new javax.swing.JScrollPane();
        jTable2 = new javax.swing.JTable();
        jScrollPane2 = new javax.swing.JScrollPane();
        jTable3 = new javax.swing.JTable();
        jLabel1 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        HomeTotal = new javax.swing.JTextField();
        jLabel4 = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        VisitorTotal = new javax.swing.JTextField();
        lblDisplayHome = new javax.swing.JLabel();
        lblDisplayVisitor = new javax.swing.JLabel();
        jLabel8 = new javax.swing.JLabel();
        jLabel9 = new javax.swing.JLabel();
        jLabel12 = new javax.swing.JLabel();
        jLabel13 = new javax.swing.JLabel();
        lblHomeWickets = new javax.swing.JLabel();
        lblVisitorWickets = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();

        jTable1.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane5.setViewportView(jTable1);

        jTable2.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane1.setViewportView(jTable2);

        jTable3.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane2.setViewportView(jTable3);

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setResizable(false);
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jLabel1.setBackground(new java.awt.Color(255, 255, 255));
        jLabel1.setFont(new java.awt.Font("Segoe UI Semibold", 0, 36)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(255, 255, 255));
        jLabel1.setText("Home");
        getContentPane().add(jLabel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(110, 80, 160, -1));

        jLabel3.setBackground(new java.awt.Color(255, 255, 255));
        jLabel3.setFont(new java.awt.Font("Segoe UI Semibold", 0, 36)); // NOI18N
        jLabel3.setForeground(new java.awt.Color(255, 255, 255));
        jLabel3.setText("Visitor ");
        getContentPane().add(jLabel3, new org.netbeans.lib.awtextra.AbsoluteConstraints(520, 80, 180, -1));

        HomeTotal.setEditable(false);
        HomeTotal.setFont(new java.awt.Font("Segoe UI", 0, 48)); // NOI18N
        HomeTotal.setBorder(null);
        HomeTotal.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        HomeTotal.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HomeTotalActionPerformed(evt);
            }
        });
        getContentPane().add(HomeTotal, new org.netbeans.lib.awtextra.AbsoluteConstraints(110, 200, 140, 60));

        jLabel4.setBackground(new java.awt.Color(255, 255, 255));
        jLabel4.setFont(new java.awt.Font("Segoe UI Semibold", 0, 24)); // NOI18N
        jLabel4.setForeground(new java.awt.Color(255, 255, 255));
        jLabel4.setText("Wickets");
        getContentPane().add(jLabel4, new org.netbeans.lib.awtextra.AbsoluteConstraints(160, 310, 94, -1));

        jLabel6.setBackground(new java.awt.Color(255, 255, 255));
        jLabel6.setFont(new java.awt.Font("Segoe UI Semibold", 0, 24)); // NOI18N
        jLabel6.setForeground(new java.awt.Color(255, 255, 255));
        jLabel6.setText("For ");
        getContentPane().add(jLabel6, new org.netbeans.lib.awtextra.AbsoluteConstraints(110, 310, -1, -1));

        VisitorTotal.setEditable(false);
        VisitorTotal.setFont(new java.awt.Font("Segoe UI", 0, 48)); // NOI18N
        VisitorTotal.setBorder(null);
        VisitorTotal.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VisitorTotalActionPerformed(evt);
            }
        });
        getContentPane().add(VisitorTotal, new org.netbeans.lib.awtextra.AbsoluteConstraints(510, 200, 140, 60));

        lblDisplayHome.setBackground(new java.awt.Color(255, 255, 255));
        lblDisplayHome.setFont(new java.awt.Font("Segoe UI Semibold", 0, 18)); // NOI18N
        lblDisplayHome.setForeground(new java.awt.Color(255, 255, 255));
        getContentPane().add(lblDisplayHome, new org.netbeans.lib.awtextra.AbsoluteConstraints(110, 140, 140, 60));

        lblDisplayVisitor.setBackground(new java.awt.Color(255, 255, 255));
        lblDisplayVisitor.setFont(new java.awt.Font("Segoe UI Semibold", 0, 18)); // NOI18N
        lblDisplayVisitor.setForeground(new java.awt.Color(255, 255, 255));
        getContentPane().add(lblDisplayVisitor, new org.netbeans.lib.awtextra.AbsoluteConstraints(510, 140, 140, 60));

        jLabel8.setBackground(new java.awt.Color(255, 255, 255));
        jLabel8.setFont(new java.awt.Font("Segoe UI Semibold", 0, 24)); // NOI18N
        jLabel8.setForeground(new java.awt.Color(255, 255, 255));
        jLabel8.setText("Wickets");
        getContentPane().add(jLabel8, new org.netbeans.lib.awtextra.AbsoluteConstraints(570, 310, 94, -1));

        jLabel9.setBackground(new java.awt.Color(255, 255, 255));
        jLabel9.setFont(new java.awt.Font("Segoe UI Semibold", 0, 24)); // NOI18N
        jLabel9.setForeground(new java.awt.Color(255, 255, 255));
        jLabel9.setText("For ");
        getContentPane().add(jLabel9, new org.netbeans.lib.awtextra.AbsoluteConstraints(520, 310, -1, -1));

        jLabel12.setFont(new java.awt.Font("Segoe UI", 0, 18)); // NOI18N
        getContentPane().add(jLabel12, new org.netbeans.lib.awtextra.AbsoluteConstraints(673, 234, -1, 25));

        jLabel13.setFont(new java.awt.Font("Segoe UI", 0, 18)); // NOI18N
        getContentPane().add(jLabel13, new org.netbeans.lib.awtextra.AbsoluteConstraints(65, 234, -1, -1));

        lblHomeWickets.setBackground(new java.awt.Color(255, 255, 255));
        lblHomeWickets.setFont(new java.awt.Font("Segoe UI", 0, 48)); // NOI18N
        lblHomeWickets.setForeground(new java.awt.Color(255, 255, 255));
        lblHomeWickets.setText("0");
        getContentPane().add(lblHomeWickets, new org.netbeans.lib.awtextra.AbsoluteConstraints(150, 340, 31, -1));

        lblVisitorWickets.setBackground(new java.awt.Color(255, 255, 255));
        lblVisitorWickets.setFont(new java.awt.Font("Segoe UI", 0, 48)); // NOI18N
        lblVisitorWickets.setForeground(new java.awt.Color(255, 255, 255));
        lblVisitorWickets.setText("0");
        getContentPane().add(lblVisitorWickets, new org.netbeans.lib.awtextra.AbsoluteConstraints(560, 350, 37, -1));
        getContentPane().add(jLabel7, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, -10, 780, 510));

        jLabel2.setText("jLabel2");
        getContentPane().add(jLabel2, new org.netbeans.lib.awtextra.AbsoluteConstraints(140, 400, -1, -1));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void VisitorTotalActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VisitorTotalActionPerformed
        
    }//GEN-LAST:event_VisitorTotalActionPerformed

    private void HomeTotalActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HomeTotalActionPerformed
        
    }//GEN-LAST:event_HomeTotalActionPerformed

    
    public static void main(String args[]) {
       
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new MainUi().setVisible(true);
            }
        });
        
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JTextField HomeTotal;
    private javax.swing.JTextField VisitorTotal;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel13;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JScrollPane jScrollPane5;
    private javax.swing.JSplitPane jSplitPane1;
    private javax.swing.JTable jTable1;
    private javax.swing.JTable jTable2;
    private javax.swing.JTable jTable3;
    private javax.swing.JLabel lblDisplayHome;
    private javax.swing.JLabel lblDisplayVisitor;
    private javax.swing.JLabel lblHomeWickets;
    private javax.swing.JLabel lblVisitorWickets;
    // End of variables declaration//GEN-END:variables
}
