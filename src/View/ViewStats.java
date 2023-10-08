
package View;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.swing.JOptionPane;

import Model.MydbConnection;
import java.util.HashMap;
import java.util.Map;
import javax.swing.table.DefaultTableModel;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JRDesignQuery;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import net.sf.jasperreports.view.JasperViewer;


public class ViewStats extends javax.swing.JFrame {

MainUi mainUi = new MainUi();

    public ViewStats() {
        initComponents();
        
    }


    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jTextField7 = new javax.swing.JTextField();
        jTextField9 = new javax.swing.JTextField();
        jLabel1 = new javax.swing.JLabel();
        lblDisplayHome = new javax.swing.JTextField();
        jLabel2 = new javax.swing.JLabel();
        HomeTotal = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        VisitorTotal = new javax.swing.JTextField();
        jLabel4 = new javax.swing.JLabel();
        lblDisplayVisitor = new javax.swing.JTextField();
        jLabel7 = new javax.swing.JLabel();
        HNoOfSixes = new javax.swing.JTextField();
        HNoOfFours = new javax.swing.JTextField();
        HNoOfNoBalls = new javax.swing.JTextField();
        HNoOfiWckz = new javax.swing.JTextField();
        jLabel8 = new javax.swing.JLabel();
        jLabel9 = new javax.swing.JLabel();
        jLabel10 = new javax.swing.JLabel();
        jLabel11 = new javax.swing.JLabel();
        VNoOfFours = new javax.swing.JTextField();
        VNoOfNoBalls = new javax.swing.JTextField();
        VNoOfiWckz = new javax.swing.JTextField();
        jLabel12 = new javax.swing.JLabel();
        jLabel13 = new javax.swing.JLabel();
        jLabel14 = new javax.swing.JLabel();
        jLabel15 = new javax.swing.JLabel();
        jLabel16 = new javax.swing.JLabel();
        VNoOfSixes = new javax.swing.JTextField();
        btnStats = new javax.swing.JButton();
        FinalizeandSendToDB = new javax.swing.JButton();
        HNoOFWides = new javax.swing.JTextField();
        jLabel17 = new javax.swing.JLabel();
        jLabel18 = new javax.swing.JLabel();
        VNoOfRuns = new javax.swing.JTextField();
        VNoOFWides = new javax.swing.JTextField();
        jLabel19 = new javax.swing.JLabel();
        jLabel20 = new javax.swing.JLabel();
        HNoOfRuns = new javax.swing.JTextField();
        jScrollPane1 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        btnGenReport = new javax.swing.JButton();
        jLabel5 = new javax.swing.JLabel();

        jTextField7.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jTextField7ActionPerformed(evt);
            }
        });

        jTextField9.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jTextField9ActionPerformed(evt);
            }
        });

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jLabel1.setFont(new java.awt.Font("Segoe UI Semibold", 1, 12)); // NOI18N
        jLabel1.setText("Home Country Name");

        lblDisplayHome.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                lblDisplayHomeActionPerformed(evt);
            }
        });

        jLabel2.setFont(new java.awt.Font("Segoe UI Semibold", 1, 12)); // NOI18N
        jLabel2.setText("Home Country Total");

        HomeTotal.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HomeTotalActionPerformed(evt);
            }
        });

        jLabel3.setFont(new java.awt.Font("Segoe UI Semibold", 1, 12)); // NOI18N
        jLabel3.setText("Visitor Country Total");

        VisitorTotal.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VisitorTotalActionPerformed(evt);
            }
        });

        jLabel4.setFont(new java.awt.Font("Segoe UI Semibold", 1, 12)); // NOI18N
        jLabel4.setText("Visitor Country Name");

        lblDisplayVisitor.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                lblDisplayVisitorActionPerformed(evt);
            }
        });

        jLabel7.setText("No. of ");

        HNoOfSixes.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HNoOfSixesActionPerformed(evt);
            }
        });

        HNoOfFours.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HNoOfFoursActionPerformed(evt);
            }
        });

        HNoOfNoBalls.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HNoOfNoBallsActionPerformed(evt);
            }
        });

        HNoOfiWckz.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HNoOfiWckzActionPerformed(evt);
            }
        });

        jLabel8.setText("Sixes");

        jLabel9.setText("Fours");

        jLabel10.setText("Wickets");

        jLabel11.setText("No Balls");

        VNoOfFours.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VNoOfFoursActionPerformed(evt);
            }
        });

        VNoOfNoBalls.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VNoOfNoBallsActionPerformed(evt);
            }
        });

        VNoOfiWckz.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VNoOfiWckzActionPerformed(evt);
            }
        });

        jLabel12.setText("Sixes");

        jLabel13.setText("Fours");

        jLabel14.setText("Wickets");

        jLabel15.setText("No Balls");

        jLabel16.setText("No. of ");

        VNoOfSixes.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VNoOfSixesActionPerformed(evt);
            }
        });

        btnStats.setText("Load History");
        btnStats.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnStatsActionPerformed(evt);
            }
        });

        FinalizeandSendToDB.setText("Send to Database");
        FinalizeandSendToDB.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                FinalizeandSendToDBActionPerformed(evt);
            }
        });

        HNoOFWides.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HNoOFWidesActionPerformed(evt);
            }
        });

        jLabel17.setText("Wide");

        jLabel18.setText("Runs");

        VNoOfRuns.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VNoOfRunsActionPerformed(evt);
            }
        });

        VNoOFWides.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VNoOFWidesActionPerformed(evt);
            }
        });

        jLabel19.setText("Wide");

        jLabel20.setText("Runs");

        HNoOfRuns.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HNoOfRunsActionPerformed(evt);
            }
        });

        jTable1.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null}
            },
            new String [] {
                "Game ID ", "Game Name ", "Match Date", "Home Total", "Visitor Total"
            }
        ));
        jScrollPane1.setViewportView(jTable1);

        btnGenReport.setText("Generate Report ");
        btnGenReport.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnGenReportActionPerformed(evt);
            }
        });

        jLabel5.setFont(new java.awt.Font("Segoe UI", 0, 24)); // NOI18N
        jLabel5.setText("Statistics");

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(91, 91, 91)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(btnGenReport)
                            .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel5, javax.swing.GroupLayout.PREFERRED_SIZE, 112, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(0, 0, Short.MAX_VALUE))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jLabel7, javax.swing.GroupLayout.PREFERRED_SIZE, 57, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(18, 18, 18)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jLabel8, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(HNoOfSixes, javax.swing.GroupLayout.PREFERRED_SIZE, 42, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jLabel9, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(HNoOfFours, javax.swing.GroupLayout.PREFERRED_SIZE, 42, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(HNoOfiWckz, javax.swing.GroupLayout.PREFERRED_SIZE, 42, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(30, 30, 30))
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jLabel10, javax.swing.GroupLayout.DEFAULT_SIZE, 54, Short.MAX_VALUE)
                                .addGap(31, 31, 31)))
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jLabel11, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addGap(18, 18, 18)
                                .addComponent(jLabel17, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addGap(20, 20, 20))
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(HNoOfNoBalls, javax.swing.GroupLayout.PREFERRED_SIZE, 42, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(HNoOFWides, javax.swing.GroupLayout.PREFERRED_SIZE, 42, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addGap(30, 30, 30)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(HNoOfRuns, javax.swing.GroupLayout.PREFERRED_SIZE, 41, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel20, javax.swing.GroupLayout.PREFERRED_SIZE, 56, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(37, 37, 37))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addGroup(layout.createSequentialGroup()
                                    .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 126, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                    .addComponent(lblDisplayHome, javax.swing.GroupLayout.PREFERRED_SIZE, 135, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addGroup(layout.createSequentialGroup()
                                    .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 126, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addGap(70, 70, 70)
                                    .addComponent(HomeTotal, javax.swing.GroupLayout.PREFERRED_SIZE, 71, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                    .addComponent(jLabel3, javax.swing.GroupLayout.PREFERRED_SIZE, 126, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addGap(70, 70, 70)
                                    .addComponent(VisitorTotal, javax.swing.GroupLayout.PREFERRED_SIZE, 71, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addGroup(layout.createSequentialGroup()
                                    .addComponent(jLabel4, javax.swing.GroupLayout.PREFERRED_SIZE, 126, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                    .addComponent(lblDisplayVisitor, javax.swing.GroupLayout.PREFERRED_SIZE, 135, javax.swing.GroupLayout.PREFERRED_SIZE)))
                            .addGroup(layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addGroup(layout.createSequentialGroup()
                                        .addComponent(jLabel16, javax.swing.GroupLayout.PREFERRED_SIZE, 57, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addGap(18, 18, 18)
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                            .addComponent(jLabel12, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                            .addComponent(VNoOfSixes, javax.swing.GroupLayout.PREFERRED_SIZE, 42, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                    .addComponent(FinalizeandSendToDB, javax.swing.GroupLayout.PREFERRED_SIZE, 144, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                    .addGroup(layout.createSequentialGroup()
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                            .addComponent(jLabel13, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                            .addComponent(VNoOfFours, javax.swing.GroupLayout.PREFERRED_SIZE, 42, javax.swing.GroupLayout.PREFERRED_SIZE))
                                        .addGap(18, 18, 18)
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(jLabel14, javax.swing.GroupLayout.PREFERRED_SIZE, 50, javax.swing.GroupLayout.PREFERRED_SIZE)
                                            .addComponent(VNoOfiWckz, javax.swing.GroupLayout.PREFERRED_SIZE, 42, javax.swing.GroupLayout.PREFERRED_SIZE))
                                        .addGap(32, 32, 32)
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                            .addComponent(VNoOfNoBalls, javax.swing.GroupLayout.PREFERRED_SIZE, 42, javax.swing.GroupLayout.PREFERRED_SIZE)
                                            .addComponent(jLabel15))
                                        .addGap(18, 18, 18)
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(VNoOFWides, javax.swing.GroupLayout.PREFERRED_SIZE, 42, javax.swing.GroupLayout.PREFERRED_SIZE)
                                            .addComponent(jLabel19, javax.swing.GroupLayout.PREFERRED_SIZE, 56, javax.swing.GroupLayout.PREFERRED_SIZE))
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(VNoOfRuns, javax.swing.GroupLayout.PREFERRED_SIZE, 41, javax.swing.GroupLayout.PREFERRED_SIZE)
                                            .addComponent(jLabel18, javax.swing.GroupLayout.PREFERRED_SIZE, 56, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                    .addComponent(btnStats, javax.swing.GroupLayout.PREFERRED_SIZE, 135, javax.swing.GroupLayout.PREFERRED_SIZE))))
                        .addContainerGap(41, Short.MAX_VALUE))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(25, 25, 25)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel1)
                    .addComponent(lblDisplayHome, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(11, 11, 11)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel2)
                    .addComponent(HomeTotal, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(HNoOfSixes, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(HNoOfFours, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(HNoOfiWckz, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(HNoOfNoBalls, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel7)
                            .addComponent(HNoOFWides, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(HNoOfRuns, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel8)
                            .addComponent(jLabel20, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                        .addComponent(jLabel9, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(jLabel10, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(jLabel11, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(jLabel17, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addGap(28, 28, 28)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel4)
                    .addComponent(lblDisplayVisitor, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(16, 16, 16)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel3)
                    .addComponent(VisitorTotal, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(VNoOfSixes, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(VNoOfFours, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(VNoOfiWckz, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(VNoOfNoBalls, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel16)
                            .addComponent(VNoOfRuns, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(VNoOFWides, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel12)
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                .addComponent(jLabel18, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(jLabel19, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE))))
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                        .addComponent(jLabel13, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(jLabel14, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(jLabel15, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addGap(18, 18, 18)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(FinalizeandSendToDB)
                    .addComponent(btnStats))
                .addGap(18, 18, 18)
                .addComponent(jLabel5)
                .addGap(18, 18, 18)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 137, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 38, Short.MAX_VALUE)
                .addComponent(btnGenReport)
                .addGap(20, 20, 20))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents
     // Method to update the total click count label
    
    // Method to update the "HNoOfRuns" label with the total click count
    public void updateLabelWithHRClickCount(int clickCount) {
        HNoOfRuns.setText(String.valueOf(clickCount));

    }
    public void updateLabelWithH6ClickCount(int clickCount) {
        HNoOfSixes.setText(String.valueOf(clickCount));

    }
    public void updateLabelWithH4ClickCount(int clickCount) {
        HNoOfFours.setText(String.valueOf(clickCount));

    }
    public void updateLabelWithHWickClickCount(int clickCount) {
        HNoOfiWckz.setText(String.valueOf(clickCount));

    }
    public void updateLabelWithHWideClickCount(int clickCount) {
        HNoOFWides.setText(String.valueOf(clickCount));

    }
    public void updateLabelWithHNoBallClickCount(int clickCount) {
        HNoOfNoBalls.setText(String.valueOf(clickCount));

    }
    // Method to update the "VNoOfRuns" label with the total click count
    public void updateLabelWithVRClickCount(int clickCount) {
        VNoOfRuns.setText(String.valueOf(clickCount));

    }
    public void updateLabelWithV6ClickCount(int clickCount) {
        VNoOfSixes.setText(String.valueOf(clickCount));

    }
    public void updateLabelWithV4ClickCount(int clickCount) {
        VNoOfFours.setText(String.valueOf(clickCount));

    }
    public void updateLabelWithVWickClickCount(int clickCount) {
        VNoOfiWckz.setText(String.valueOf(clickCount));

    }
    public void updateLabelWithVWideClickCount(int clickCount) {
        VNoOFWides.setText(String.valueOf(clickCount));

    }
    public void updateLabelWithVNoBallClickCount(int clickCount) {
        VNoOfNoBalls.setText(String.valueOf(clickCount));

    }
    public void setHomeLabelText(String text) {
    lblDisplayHome.setText(text);
}

public void setHomeTotalText(String text) {
    HomeTotal.setText(text);
}

public void setVisitorLabelText(String text) {
    VisitorTotal.setText(text);
}
// Method to update lblDisplayHome with the passed text
    public void updateLblDisplayHome(String text) {
        lblDisplayHome.setText(text);
    }
    public void updateLblDisplayVisitor(String text) {
        lblDisplayVisitor.setText(text);
    }
    // Method to update the "HomeTotal" label in ViewStats
    public void updateHomeTotalLabel(String text) {
        HomeTotal.setText(text);
    }

    // Method to update the "VisitorTotal" label in ViewStats
    public void updateVisitorTotalLabel(String text) {
        VisitorTotal.setText(text);
    }
    
    //end
    private void lblDisplayHomeActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_lblDisplayHomeActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_lblDisplayHomeActionPerformed

    private void HomeTotalActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HomeTotalActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_HomeTotalActionPerformed

    private void VisitorTotalActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VisitorTotalActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_VisitorTotalActionPerformed

    private void lblDisplayVisitorActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_lblDisplayVisitorActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_lblDisplayVisitorActionPerformed

    private void HNoOfSixesActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HNoOfSixesActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_HNoOfSixesActionPerformed

    private void HNoOfFoursActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HNoOfFoursActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_HNoOfFoursActionPerformed

    private void jTextField7ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jTextField7ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jTextField7ActionPerformed

    private void HNoOfNoBallsActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HNoOfNoBallsActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_HNoOfNoBallsActionPerformed

    private void jTextField9ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jTextField9ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jTextField9ActionPerformed

    private void HNoOfiWckzActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HNoOfiWckzActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_HNoOfiWckzActionPerformed

    private void VNoOfFoursActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VNoOfFoursActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_VNoOfFoursActionPerformed

    private void VNoOfNoBallsActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VNoOfNoBallsActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_VNoOfNoBallsActionPerformed

    private void VNoOfiWckzActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VNoOfiWckzActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_VNoOfiWckzActionPerformed

    private void VNoOfSixesActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VNoOfSixesActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_VNoOfSixesActionPerformed

    private void FinalizeandSendToDBActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_FinalizeandSendToDBActionPerformed
        String HCountryName = lblDisplayHome.getText();
        int homeTotalValue  = Integer.parseInt(HomeTotal.getText());
        int HNoOfSixesValue = Integer.parseInt(HNoOfSixes.getText());
        int HNoOfFoursValue = Integer.parseInt(HNoOfFours.getText());
        int HNoOfiWckzValue = Integer.parseInt(HNoOfiWckz.getText());
        int HNoOfNoBallsValue = Integer.parseInt(HNoOfNoBalls.getText());
        int HNoOFWidesValue =  Integer.parseInt(HNoOFWides.getText());
        int HNoOfRunsVAlue =  Integer.parseInt(HNoOfRuns.getText());
        
        String VCountryName = lblDisplayVisitor.getText();
        int visitorTotalValue  = Integer.parseInt(VisitorTotal.getText());
        int VNoOfSixesValue = Integer.parseInt(VNoOfSixes.getText());
        int VNoOfFoursValue = Integer.parseInt(VNoOfFours.getText());
        int VNoOfiWckzValue = Integer.parseInt(VNoOfiWckz.getText());
        int VNoOfNoBallsValue = Integer.parseInt(VNoOfNoBalls.getText());
        int VNoOFWidesValue =  Integer.parseInt(VNoOFWides.getText());
        int VNoOfRunsVAlue =  Integer.parseInt(VNoOfRuns.getText());
        
         try (Connection connection = MydbConnection.getMyConnection()) {
        // Insert data into the "Game" table
        String insertGameQuery = "INSERT INTO Game (GameName, MatchDate, HomeTotal, VisitorTotal) VALUES (?, ?, ?, ?)";
        PreparedStatement gameStatement = connection.prepareStatement(insertGameQuery, Statement.RETURN_GENERATED_KEYS);
        gameStatement.setString(1, "ICC World Cup"); // This is manually set later in future versioning expecting to give this a value from a UI screen 
        gameStatement.setDate(2, new java.sql.Date(System.currentTimeMillis())); 
        gameStatement.setInt(3, homeTotalValue); 
        gameStatement.setInt(4, visitorTotalValue); 

        int rowsAffected = gameStatement.executeUpdate();

        if (rowsAffected == 1) {
            // Get the generated GameID
            ResultSet generatedKeys = gameStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                int gameId = generatedKeys.getInt(1);

                // Insert data into the "HomeTeamStatistics" table
                String insertHomeStatsQuery = "INSERT INTO HomeTeamStatistics (HomeCountryName, Wickets, NoBalls, Runs, Fours, Sixes, GameID) VALUES (?, ?, ?, ?, ?, ?, ?)";
                PreparedStatement homeStatsStatement = connection.prepareStatement(insertHomeStatsQuery);
                homeStatsStatement.setString(1, HCountryName);
                homeStatsStatement.setInt(2, HNoOfiWckzValue);
                homeStatsStatement.setInt(3, HNoOfNoBallsValue);
                homeStatsStatement.setInt(4, HNoOfRunsVAlue);
                homeStatsStatement.setInt(5, HNoOfFoursValue);
                homeStatsStatement.setInt(6, HNoOfSixesValue);
                homeStatsStatement.setInt(7, gameId);

                homeStatsStatement.executeUpdate();

                // Insert data into the "VisitorTeamStatistics" table
                String insertVisitorStatsQuery = "INSERT INTO VisitorTeamStatistics (VisitorCountryName, Wickets, NoBalls, Runs, Fours, Sixes, GameID) VALUES (?, ?, ?, ?, ?, ?, ?)";
                PreparedStatement visitorStatsStatement = connection.prepareStatement(insertVisitorStatsQuery);
                visitorStatsStatement.setString(1, VCountryName);
                visitorStatsStatement.setInt(2, VNoOfiWckzValue);
                visitorStatsStatement.setInt(3, VNoOfNoBallsValue);
                visitorStatsStatement.setInt(4, VNoOfRunsVAlue);
                visitorStatsStatement.setInt(5, VNoOfFoursValue);
                visitorStatsStatement.setInt(6, VNoOfSixesValue);
                visitorStatsStatement.setInt(7, gameId);

                visitorStatsStatement.executeUpdate();

                JOptionPane.showMessageDialog(this, "Data inserted successfully.");
            } else {
                JOptionPane.showMessageDialog(this, "Failed to retrieve GameID.");
            }
        } else {
            JOptionPane.showMessageDialog(this, "Data insertion into the Game table failed.");
        }
    } catch (SQLException ex) {
        ex.printStackTrace();
        JOptionPane.showMessageDialog(this, "Database error: " + ex.getMessage());
    }
    }//GEN-LAST:event_FinalizeandSendToDBActionPerformed

    private void HNoOFWidesActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HNoOFWidesActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_HNoOFWidesActionPerformed

    private void VNoOfRunsActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VNoOfRunsActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_VNoOfRunsActionPerformed

    private void VNoOFWidesActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VNoOFWidesActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_VNoOFWidesActionPerformed

    private void HNoOfRunsActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HNoOfRunsActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_HNoOfRunsActionPerformed

    private void btnStatsActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnStatsActionPerformed
       // Assuming that jTable1 uses a DefaultTableModel
DefaultTableModel tableModel = (DefaultTableModel) jTable1.getModel();

// Use the existing database connection from MydbConnection class
Connection connection = MydbConnection.getMyConnection();

try {
    // Create a SQL statement
    Statement statement = connection.createStatement();

    // Execute the SQL query to fetch data
    ResultSet resultSet = statement.executeQuery("SELECT * FROM Game");

    // Clear existing table data
    tableModel.setRowCount(0);

    // Populate the JTable with data
    while (resultSet.next()) {
        int gameID = resultSet.getInt("GameID");
        String gameName = resultSet.getString("GameName");
        String matchDate = resultSet.getString("MatchDate");
        int homeTotal = resultSet.getInt("HomeTotal");
        int visitorTotal = resultSet.getInt("VisitorTotal");

        // Add a new row to the tableModel
        tableModel.addRow(new Object[]{gameID, gameName, matchDate, homeTotal, visitorTotal});
    }

    // Close resources
    resultSet.close();
    statement.close();
} catch (SQLException e) {
    e.printStackTrace();
}

    }//GEN-LAST:event_btnStatsActionPerformed

    private void btnGenReportActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnGenReportActionPerformed
        int selectedRow = jTable1.getSelectedRow();

    if (selectedRow != -1) {
        try {
            Connection connection = MydbConnection.getMyConnection();

            // Get the selected row's data
            int gameID = (int) jTable1.getValueAt(selectedRow, 0);

            // Modify your SQL query to retrieve data based on the selected row's information
            String sqlquery = "SELECT * FROM Game WHERE GameID = " + gameID;

            JasperDesign jasDesign = JRXmlLoader.load("C:\\Users\\udaba\\OneDrive\\Documents\\NetBeansProjects\\ScoreBoard\\src\\View\\report1.jrxml");
            JRDesignQuery desquery = new JRDesignQuery();
            desquery.setText(sqlquery);
            jasDesign.setQuery(desquery);

            JasperReport jasreport = JasperCompileManager.compileReport(jasDesign);
            Map<String, Object> parameters = new HashMap<>();
parameters.put("gameID", gameID);
            JasperPrint jasprint = JasperFillManager.fillReport(jasreport, null, connection);
            JasperViewer.viewReport(jasprint);
        } catch (Exception e) {
            e.printStackTrace();
        }
    } else {
        JOptionPane.showMessageDialog(this, "Please select a row to generate a report.");
    }
    }//GEN-LAST:event_btnGenReportActionPerformed

 

// Method to update HNoOfRuns
    public void updateHNoOfRuns(int count) {
        //HNoOfRuns.setText(Integer.toString(count));
    }

    // ...

    public static void main(String args[]) {
       
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new ViewStats().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton FinalizeandSendToDB;
    private javax.swing.JTextField HNoOFWides;
    private javax.swing.JTextField HNoOfFours;
    private javax.swing.JTextField HNoOfNoBalls;
    private javax.swing.JTextField HNoOfRuns;
    private javax.swing.JTextField HNoOfSixes;
    private javax.swing.JTextField HNoOfiWckz;
    private javax.swing.JTextField HomeTotal;
    private javax.swing.JTextField VNoOFWides;
    private javax.swing.JTextField VNoOfFours;
    private javax.swing.JTextField VNoOfNoBalls;
    private javax.swing.JTextField VNoOfRuns;
    private javax.swing.JTextField VNoOfSixes;
    private javax.swing.JTextField VNoOfiWckz;
    private javax.swing.JTextField VisitorTotal;
    private javax.swing.JButton btnGenReport;
    private javax.swing.JButton btnStats;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel11;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel13;
    private javax.swing.JLabel jLabel14;
    private javax.swing.JLabel jLabel15;
    private javax.swing.JLabel jLabel16;
    private javax.swing.JLabel jLabel17;
    private javax.swing.JLabel jLabel18;
    private javax.swing.JLabel jLabel19;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel20;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTable jTable1;
    private javax.swing.JTextField jTextField7;
    private javax.swing.JTextField jTextField9;
    private javax.swing.JTextField lblDisplayHome;
    private javax.swing.JTextField lblDisplayVisitor;
    // End of variables declaration//GEN-END:variables
}
