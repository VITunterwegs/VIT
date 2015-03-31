/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author Sven
 */
@WebServlet("/saveNotification")
public class SaveNotification extends HttpServlet {

    static final long serialVersionUID = 1L;
    
    private Connection connect = null;
    private Statement statement = null;
    private PreparedStatement preparedStatement = null;
    private ResultSet resultSet = null;
    
    private String dbhost = "db567968652.db.1and1.com";
    private String dbport = "3306";
    private String dbname = "db567968652";
    private String dbuser = "dbo567968652";
    private String dbpw = "VITIstCool14";
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet SaveNotification</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet SaveNotification at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }
    
    private void saveData(String lineID, 
                          String lastStop,
                          String arrTimeLastStop,
                          String timestamp,
                          String notifStop,
                          int delay,
                          
                         ){
        try {
           
            Class.forName("com.mysql.jdbc.Driver");
           
            connect = DriverManager
              .getConnection("jdbc:mysql://"+ dbhost + ":"+dbport+"/"+ dbname+"?"
                + "user=" + dbuser + "&password=" + dbpw);
           
            statement = connect.createStatement();
           
            preparedStatement = connect
              .prepareStatement("insert into " + dbname + ".Verspaetungen values (default, ?, ?, ?, ? , ?, ?)");
           
            preparedStatement.setString(1, lineID);
            preparedStatement.setString(2, lastStop);
            preparedStatement.setString(3, arrTimeLastStop);
            preparedStatement.setString(4, timestamp);
            preparedStatement.setString(5, notifStop);
            preparedStatement.setInteger(6, delay);
            preparedStatement.executeUpdate();
      
        } catch (Exception e) {
            throw e;
        } finally {
            close();
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.get
    }

    
    @Override
    public String getServletInfo() {
        return "speichert eine Verspätungsmeldung in einer sql-Datenbank";
    }// </editor-fold>

}
