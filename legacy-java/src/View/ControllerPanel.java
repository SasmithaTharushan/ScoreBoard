
package View;
import javax.swing.JOptionPane;

public class ControllerPanel extends javax.swing.JFrame {
  //Total Clicks to [ass to ViewStats
    private ViewStats viewStatsFrame; // Reference to the ViewStats JFrame
    private int HtotalRClicks = 0; // Total click count
    private int Htotal4Clicks = 0; // Total click count
    private int Htotal6Clicks = 0; // Total click count
    private int HtotalClicks = 0; // Total click count
    private int HtotalWickClicks = 0; // Total click count
    private int HtotalWideBallClicks = 0; // Total click count
    private int HtotalNoBAllClicks = 0; // Total click count
    private int VtotalRClicks = 0; // Total click count
    private int Vtotal4Clicks = 0; // Total click count
    private int Vtotal6Clicks = 0; // Total click count
    private int VtotalWickClicks = 0; // Total click count
    private int VtotalWideBallClicks = 0; // Total click count
    private int VtotalNoBAllClicks = 0; // Total click count
    //end
    
    private MainUi mainUi; //referencing main ui 
    //private ViewStats viewStats;
    private int homeTotal = 0;
    private int visitorTotal = 0;
    //wickets iniialization
    private int HomeWick=0;
    private int VisitorWick=0;
    //Button Clicked count
    
    public ControllerPanel(ViewStats viewStatsFrame) {
        this.viewStatsFrame = viewStatsFrame;
        this.mainUi = mainUi;
        initComponents();
        
          java.awt.EventQueue.invokeLater(() -> {
              ;
        });
        // Initialize the mainUi reference (assuming MainUi is the name of the second JFrame)
        mainUi = new MainUi();
        // Set up an action listener for the MainUiCheckBox
        MainUiCheckBox.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                MainUiCheckBoxActionPerformed(evt);
            }
        });
          
    }


    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jTextField1 = new javax.swing.JTextField();
        jInternalFrame1 = new javax.swing.JInternalFrame();
        HbtnMarkRun = new javax.swing.JButton();
        HbtnMarkSix = new javax.swing.JButton();
        btnNoBall = new javax.swing.JButton();
        jLabel1 = new javax.swing.JLabel();
        HbtnMarkFour = new javax.swing.JButton();
        VbtnMarkRun = new javax.swing.JButton();
        jLabel2 = new javax.swing.JLabel();
        VbtnMarkSix = new javax.swing.JButton();
        VbtnMarkFour = new javax.swing.JButton();
        HWideBall = new javax.swing.JButton();
        jSeparator1 = new javax.swing.JSeparator();
        btnHomeWick = new javax.swing.JButton();
        VNoOfNoBAlls = new javax.swing.JButton();
        VWideBall = new javax.swing.JButton();
        btnVisitorWick = new javax.swing.JButton();
        BtnPlayers = new javax.swing.JButton();
        jSeparator2 = new javax.swing.JSeparator();
        txtHomeCountryName = new javax.swing.JTextField();
        txtVisitorCountryName = new javax.swing.JTextField();
        btnPassVisitorName = new javax.swing.JButton();
        jLabel3 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        btnPasshomeName = new javax.swing.JButton();
        btnLogOut = new javax.swing.JButton();
        MainUiCheckBox = new javax.swing.JCheckBox();
        jSeparator3 = new javax.swing.JSeparator();
        jLabel7 = new javax.swing.JLabel();
        btnSaveStats = new javax.swing.JButton();

        jTextField1.setText("jTextField1");

        jInternalFrame1.setVisible(true);

        javax.swing.GroupLayout jInternalFrame1Layout = new javax.swing.GroupLayout(jInternalFrame1.getContentPane());
        jInternalFrame1.getContentPane().setLayout(jInternalFrame1Layout);
        jInternalFrame1Layout.setHorizontalGroup(
            jInternalFrame1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 0, Short.MAX_VALUE)
        );
        jInternalFrame1Layout.setVerticalGroup(
            jInternalFrame1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 0, Short.MAX_VALUE)
        );

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setResizable(false);

        HbtnMarkRun.setText("+ Run ");
        HbtnMarkRun.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HbtnMarkRunActionPerformed(evt);
            }
        });

        HbtnMarkSix.setText("+6");
        HbtnMarkSix.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HbtnMarkSixActionPerformed(evt);
            }
        });

        btnNoBall.setText("No Ball");
        btnNoBall.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnNoBallActionPerformed(evt);
            }
        });

        jLabel1.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        jLabel1.setText("Home Section");

        HbtnMarkFour.setText("+4");
        HbtnMarkFour.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HbtnMarkFourActionPerformed(evt);
            }
        });

        VbtnMarkRun.setText("+ Run");
        VbtnMarkRun.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VbtnMarkRunActionPerformed(evt);
            }
        });

        jLabel2.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        jLabel2.setText("Vistor Section");

        VbtnMarkSix.setText("+6");
        VbtnMarkSix.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VbtnMarkSixActionPerformed(evt);
            }
        });

        VbtnMarkFour.setText("+4");
        VbtnMarkFour.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VbtnMarkFourActionPerformed(evt);
            }
        });

        HWideBall.setText("Wide Ball");
        HWideBall.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HWideBallActionPerformed(evt);
            }
        });

        btnHomeWick.setText("Wicket + ");
        btnHomeWick.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnHomeWickActionPerformed(evt);
            }
        });

        VNoOfNoBAlls.setText("No Ball");
        VNoOfNoBAlls.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VNoOfNoBAllsActionPerformed(evt);
            }
        });

        VWideBall.setText("Wide Ball");
        VWideBall.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                VWideBallActionPerformed(evt);
            }
        });

        btnVisitorWick.setText("Wicket + ");
        btnVisitorWick.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnVisitorWickActionPerformed(evt);
            }
        });

        BtnPlayers.setText("View Players");
        BtnPlayers.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                BtnPlayersActionPerformed(evt);
            }
        });

        txtHomeCountryName.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtHomeCountryNameActionPerformed(evt);
            }
        });

        btnPassVisitorName.setText("Pass To Board");
        btnPassVisitorName.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnPassVisitorNameActionPerformed(evt);
            }
        });

        jLabel3.setText("Batting");

        jLabel4.setText("Balling");

        jLabel5.setText("Batting");

        jLabel6.setText("Balling");

        btnPasshomeName.setText("Pass To Board");
        btnPasshomeName.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnPasshomeNameActionPerformed(evt);
            }
        });

        btnLogOut.setText("Log Out");
        btnLogOut.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnLogOutActionPerformed(evt);
            }
        });

        MainUiCheckBox.setText("View Scoreboard");
        MainUiCheckBox.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                MainUiCheckBoxActionPerformed(evt);
            }
        });

        jLabel7.setText("Save Match Data ? ");

        btnSaveStats.setText("Save");
        btnSaveStats.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnSaveStatsActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(23, 23, 23)
                .addComponent(BtnPlayers, javax.swing.GroupLayout.PREFERRED_SIZE, 115, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(35, 35, 35)
                .addComponent(MainUiCheckBox)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(jSeparator1, javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jSeparator3, javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addContainerGap()
                        .addComponent(jSeparator2))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addGroup(layout.createSequentialGroup()
                                .addGap(25, 25, 25)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jLabel3, javax.swing.GroupLayout.PREFERRED_SIZE, 47, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addGroup(layout.createSequentialGroup()
                                        .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 81, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                        .addComponent(txtHomeCountryName, javax.swing.GroupLayout.PREFERRED_SIZE, 116, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addGap(33, 33, 33)
                                        .addComponent(btnPasshomeName, javax.swing.GroupLayout.PREFERRED_SIZE, 126, javax.swing.GroupLayout.PREFERRED_SIZE))))
                            .addGroup(layout.createSequentialGroup()
                                .addGap(22, 22, 22)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addGroup(layout.createSequentialGroup()
                                        .addComponent(VbtnMarkRun, javax.swing.GroupLayout.PREFERRED_SIZE, 81, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addGap(18, 18, 18)
                                        .addComponent(VbtnMarkSix, javax.swing.GroupLayout.PREFERRED_SIZE, 44, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addGap(18, 18, 18)
                                        .addComponent(VbtnMarkFour, javax.swing.GroupLayout.PREFERRED_SIZE, 44, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                        .addComponent(btnVisitorWick, javax.swing.GroupLayout.PREFERRED_SIZE, 115, javax.swing.GroupLayout.PREFERRED_SIZE))
                                    .addGroup(layout.createSequentialGroup()
                                        .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 81, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addGap(18, 18, 18)
                                        .addComponent(txtVisitorCountryName, javax.swing.GroupLayout.PREFERRED_SIZE, 115, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addGap(34, 34, 34)
                                        .addComponent(btnPassVisitorName, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                    .addComponent(jLabel5, javax.swing.GroupLayout.PREFERRED_SIZE, 47, javax.swing.GroupLayout.PREFERRED_SIZE)))
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                .addGap(16, 16, 16)
                                .addComponent(HbtnMarkRun, javax.swing.GroupLayout.PREFERRED_SIZE, 81, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(HbtnMarkSix, javax.swing.GroupLayout.PREFERRED_SIZE, 44, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(HbtnMarkFour, javax.swing.GroupLayout.PREFERRED_SIZE, 44, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(btnHomeWick, javax.swing.GroupLayout.PREFERRED_SIZE, 115, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 78, Short.MAX_VALUE)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel4, javax.swing.GroupLayout.PREFERRED_SIZE, 81, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(HWideBall, javax.swing.GroupLayout.PREFERRED_SIZE, 105, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(btnNoBall, javax.swing.GroupLayout.PREFERRED_SIZE, 80, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(109, 109, 109)))
                .addContainerGap())
            .addGroup(layout.createSequentialGroup()
                .addGap(21, 21, 21)
                .addComponent(jLabel7, javax.swing.GroupLayout.PREFERRED_SIZE, 121, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(btnSaveStats, javax.swing.GroupLayout.PREFERRED_SIZE, 83, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(btnLogOut, javax.swing.GroupLayout.PREFERRED_SIZE, 83, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(72, 72, 72))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(jLabel6, javax.swing.GroupLayout.PREFERRED_SIZE, 115, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addComponent(VNoOfNoBAlls, javax.swing.GroupLayout.PREFERRED_SIZE, 86, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(VWideBall, javax.swing.GroupLayout.PREFERRED_SIZE, 104, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addGap(114, 114, 114))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(27, 27, 27)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(BtnPlayers)
                    .addComponent(MainUiCheckBox))
                .addGap(37, 37, 37)
                .addComponent(jSeparator3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(javax.swing.GroupLayout.Alignment.LEADING, layout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel1)
                            .addComponent(txtHomeCountryName, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(btnPasshomeName))
                        .addGap(30, 30, 30)
                        .addComponent(jLabel3)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(HbtnMarkRun, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(HbtnMarkSix, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(HbtnMarkFour, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(btnHomeWick, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(javax.swing.GroupLayout.Alignment.LEADING, layout.createSequentialGroup()
                        .addGap(26, 26, 26)
                        .addComponent(jLabel4)
                        .addGap(52, 52, 52)
                        .addComponent(HWideBall)))
                .addGap(21, 21, 21)
                .addComponent(btnNoBall)
                .addGap(18, 18, 18)
                .addComponent(jSeparator1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 35, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(btnPassVisitorName)
                            .addComponent(txtVisitorCountryName, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel2))
                        .addGap(37, 37, 37))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(jLabel6)
                        .addGap(22, 22, 22)))
                .addComponent(jLabel5)
                .addGap(25, 25, 25)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                        .addComponent(VbtnMarkRun, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(VbtnMarkSix, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(VbtnMarkFour, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(btnVisitorWick, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(VWideBall))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 19, Short.MAX_VALUE)
                .addComponent(VNoOfNoBAlls)
                .addGap(18, 18, 18)
                .addComponent(jSeparator2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(32, 32, 32)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel7)
                    .addComponent(btnSaveStats)
                    .addComponent(btnLogOut))
                .addContainerGap())
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void HbtnMarkRunActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HbtnMarkRunActionPerformed
        // Increment the total by one
        homeTotal += 1;
        // Update the HomeTotal label in MainUi with the new total value
        mainUi.updateHomeTotalLabel(Integer.toString(homeTotal));
         // Increment the total click count
        // Increment the total click count
        
        HtotalRClicks ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithHRClickCount(HtotalRClicks );
        // Get the text from txtHomeCountryName
        String homeName = txtHomeCountryName.getText();

        

    }//GEN-LAST:event_HbtnMarkRunActionPerformed

    private void HbtnMarkSixActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HbtnMarkSixActionPerformed
        // Increment the total by six
        homeTotal += 6;
        // Update the HomeTotal label in MainUi with the new total value
        mainUi.updateHomeTotalLabel(Integer.toString(homeTotal));
        
        Htotal6Clicks++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithH6ClickCount(Htotal6Clicks);
    }//GEN-LAST:event_HbtnMarkSixActionPerformed

    private void HbtnMarkFourActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HbtnMarkFourActionPerformed
        // Increment the total by four
        homeTotal += 4;
        // Update the HomeTotal label in MainUi with the new total value
        mainUi.updateHomeTotalLabel(Integer.toString(homeTotal));
        
        Htotal4Clicks ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithH4ClickCount(Htotal4Clicks );
    }//GEN-LAST:event_HbtnMarkFourActionPerformed

    private void VbtnMarkRunActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VbtnMarkRunActionPerformed
        // visitorTotal
        visitorTotal += 1;
        // Update the HomeTotal label in MainUi with the new total value
        
        mainUi.updateVisitorTotalLabel(Integer.toString(visitorTotal));
       
        VtotalRClicks  ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithVRClickCount(VtotalRClicks  );
        String VisitorName = txtVisitorCountryName.getText();
    }//GEN-LAST:event_VbtnMarkRunActionPerformed

    private void VbtnMarkSixActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VbtnMarkSixActionPerformed
        visitorTotal += 6;
        // Update the HomeTotal label in MainUi with the new total value
        mainUi.updateVisitorTotalLabel(Integer.toString(visitorTotal));
        
        
        Vtotal6Clicks   ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithV6ClickCount(Vtotal6Clicks   );
    }//GEN-LAST:event_VbtnMarkSixActionPerformed

    private void VbtnMarkFourActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VbtnMarkFourActionPerformed
        visitorTotal += 4;
        // Update the HomeTotal label in MainUi with the new total value
        mainUi.updateVisitorTotalLabel(Integer.toString(visitorTotal));
        
        Vtotal4Clicks    ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithV4ClickCount(Vtotal4Clicks    );
    }//GEN-LAST:event_VbtnMarkFourActionPerformed

    private void HWideBallActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HWideBallActionPerformed
        HtotalWideBallClicks  ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithHWideClickCount(HtotalWideBallClicks  );
    }//GEN-LAST:event_HWideBallActionPerformed

    private void VWideBallActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VWideBallActionPerformed
        VtotalWideBallClicks  ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithVWideClickCount(VtotalWideBallClicks  );
    }//GEN-LAST:event_VWideBallActionPerformed

    private void BtnPlayersActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_BtnPlayersActionPerformed
        
    }//GEN-LAST:event_BtnPlayersActionPerformed

    private void btnLogOutActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnLogOutActionPerformed
     int dialogResult = JOptionPane.showConfirmDialog(null, "Are you sure you want to log out?", "Logout Confirmation", JOptionPane.YES_NO_OPTION);
    if (dialogResult == JOptionPane.YES_OPTION) {
        // Close the MainUi window using the reference
        if (mainUi != null) {
            mainUi.dispose();
        }
        
        // Close the ControllerPanel window
        this.dispose();

        // Create and open the VLogin window
        VLogin vLogin = new VLogin();
        vLogin.setVisible(true);
    }
    }//GEN-LAST:event_btnLogOutActionPerformed

    private void MainUiCheckBoxActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_MainUiCheckBoxActionPerformed
 // Check if the mainUi reference is not null
        if (mainUi != null) {
            if (MainUiCheckBox.isSelected()) {
                // Checkbox is checked, show the MainUi window
                mainUi.setVisible(true);
            } else {
                // Checkbox is unchecked, hide the MainUi window
                mainUi.setVisible(false);
            }
        }
    }//GEN-LAST:event_MainUiCheckBoxActionPerformed

    private void btnPasshomeNameActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnPasshomeNameActionPerformed
        // Get the text from txtHomeCountryName
        String homeCountryName = txtHomeCountryName.getText();
        
        // Call the updateHomeLabel method in MainUi to update the label text
        mainUi.updateDisplayHomeLabel(homeCountryName);
        // Retrieve the text from txtHomeCountryName
        String homeName = txtHomeCountryName.getText();

        // Pass the text to ViewStats frame
        viewStatsFrame.updateLblDisplayHome(homeName);
        
        
    }//GEN-LAST:event_btnPasshomeNameActionPerformed

    private void btnPassVisitorNameActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnPassVisitorNameActionPerformed
        // Get the text from txtHomeCountryName
        String visitorCountryName = txtVisitorCountryName.getText();
        
        // Call the updateHomeLabel method in MainUi to update the label text
        mainUi.updateVisitotLabel(visitorCountryName);
        String visitorName = txtVisitorCountryName.getText();

        // Pass the text to ViewStats frame
        viewStatsFrame.updateLblDisplayVisitor(visitorName);
    }//GEN-LAST:event_btnPassVisitorNameActionPerformed

    private void btnHomeWickActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnHomeWickActionPerformed
        // HomeWick
        HomeWick += 1;
        // Update the HomeWick label in MainUi with the new total value
        mainUi.updateHomeWickLabel(Integer.toString(HomeWick));
        HtotalWickClicks ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithHWickClickCount(HtotalWickClicks );
    }//GEN-LAST:event_btnHomeWickActionPerformed

    private void btnVisitorWickActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnVisitorWickActionPerformed
        // HomeWick
        VisitorWick += 1;
        // Update the VisitorWick label in MainUi with the new total value
        mainUi.updateVisitorWickLabel(Integer.toString(VisitorWick));
        
        VtotalWickClicks  ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithVWickClickCount(VtotalWickClicks  );
    }//GEN-LAST:event_btnVisitorWickActionPerformed

    private void btnSaveStatsActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnSaveStatsActionPerformed
        
         // Get the HomeTotal value from the MainUi frame
    String homeTotalValue = mainUi.getHomeTotalText();

    // Set the HomeTotal value in the ViewStats frame
    viewStatsFrame.setHomeTotalText(homeTotalValue);

    // Get the VisitorTotal value from the MainUi frame
    String visitorTotalValue = mainUi.getVisitorTotalText();

    // Set the VisitorTotal value in the ViewStats frame
    viewStatsFrame.setVisitorLabelText(visitorTotalValue);
    
    // Show the ViewStats frame
   // viewStatsFrame.setVisible(true);
        viewStatsFrame.setVisible(true);
        
   

    }//GEN-LAST:event_btnSaveStatsActionPerformed

    private void btnNoBallActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnNoBallActionPerformed
        HtotalNoBAllClicks   ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithHNoBallClickCount(HtotalNoBAllClicks   );
    }//GEN-LAST:event_btnNoBallActionPerformed

    private void VNoOfNoBAllsActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_VNoOfNoBAllsActionPerformed
        VtotalNoBAllClicks   ++;
        // Update the total click count in the ViewStats frame
        viewStatsFrame.updateLabelWithVNoBallClickCount(VtotalNoBAllClicks   );
    }//GEN-LAST:event_VNoOfNoBAllsActionPerformed

    private void txtHomeCountryNameActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtHomeCountryNameActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtHomeCountryNameActionPerformed

    
    public static void main(String args[]) {
        
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                ViewStats viewStatsFrame = new ViewStats();
                
                new ControllerPanel(viewStatsFrame).setVisible(true);

            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton BtnPlayers;
    private javax.swing.JButton HWideBall;
    private javax.swing.JButton HbtnMarkFour;
    private javax.swing.JButton HbtnMarkRun;
    private javax.swing.JButton HbtnMarkSix;
    private javax.swing.JCheckBox MainUiCheckBox;
    private javax.swing.JButton VNoOfNoBAlls;
    private javax.swing.JButton VWideBall;
    private javax.swing.JButton VbtnMarkFour;
    private javax.swing.JButton VbtnMarkRun;
    private javax.swing.JButton VbtnMarkSix;
    private javax.swing.JButton btnHomeWick;
    private javax.swing.JButton btnLogOut;
    private javax.swing.JButton btnNoBall;
    private javax.swing.JButton btnPassVisitorName;
    private javax.swing.JButton btnPasshomeName;
    private javax.swing.JButton btnSaveStats;
    private javax.swing.JButton btnVisitorWick;
    private javax.swing.JInternalFrame jInternalFrame1;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JSeparator jSeparator1;
    private javax.swing.JSeparator jSeparator2;
    private javax.swing.JSeparator jSeparator3;
    private javax.swing.JTextField jTextField1;
    private javax.swing.JTextField txtHomeCountryName;
    private javax.swing.JTextField txtVisitorCountryName;
    // End of variables declaration//GEN-END:variables
}

