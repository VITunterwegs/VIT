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
import java.util.logging.Level;
import java.util.logging.Logger;

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
    
    private String dbhost = "schoeneborn-online.de";
    private String dbport = "110";
    private String dbname = "vit";
    private String dbuser = "vit";
    private String dbpw = "vitistcool";
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
    }
    
    private void saveData(String userId,
                          String timestamp, 
                          String type,
                          String stop,
                          String lastStop,
                          String line,
                          String track,
                          String direction,
                          String originArr,
                          int delay,
                          boolean cancelled,
                          String currArr)
                    throws ClassNotFoundException, SQLException{
        
        Exception exception;            //Exception-Variable für das FehlerHandling
        
        try {  
           
            Class.forName("com.mysql.jdbc.Driver");
           
            connect = DriverManager
              .getConnection("jdbc:mysql://"+ dbhost + ":"+dbport+"/"+ dbname+"?"
                + "user=" + dbuser + "&password=" + dbpw);
           
            statement = connect.createStatement();
           
            preparedStatement = connect
              .prepareStatement("insert into " + 
                      dbname + ".Verspaetung values (?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?)");
           
            preparedStatement.setString(1, userId);
            preparedStatement.setString(2, timestamp);
            preparedStatement.setString(3, type);
            preparedStatement.setString(4, stop);
            preparedStatement.setString(5, lastStop);
            preparedStatement.setString(6, line);
            preparedStatement.setString(7, track);
            preparedStatement.setString(8, direction);
            preparedStatement.setString(9, originArr);
            preparedStatement.setInt(10, delay);
            preparedStatement.setBoolean(11, cancelled);
            preparedStatement.setString(12, currArr);
            preparedStatement.executeUpdate();
      
        } catch (ClassNotFoundException | SQLException e) {
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
        
        Boolean canc = false;
        
        if (request.getParameter("cancelled").equals("true")){
            canc = true;
        }
        try {
            this.saveData(
                    request.getParameter("timestamp"),
                    request.getParameter("type"),
                    request.getParameter("stop"),
                    request.getParameter("lastStop"),
                    request.getParameter("line"),
                    request.getParameter("track"),
                    request.getParameter("direction"),
                    request.getParameter("originArr"),
                    new Integer(request.getParameter("delay")),
                    canc,
                    request.getParameter("currArr")
            );
            
        } catch (ClassNotFoundException | SQLException ex){
            PrintWriter out = response.getWriter();
            out.print("<html>"
                    + "<head>"
                    + "</head>"
                    + "<body>"
                    + "<h1>Es ist ein Feher aufgetreten</h1><br>"
                    + ex.toString()
                    + "</body>"
                    + "</html>");
        }
    }

    
    @Override
    public String getServletInfo() {
        return "speichert eine VerspÃ¤tungsmeldung in einer sql-Datenbank";
    }// </editor-fold>

    
    private void close() throws SQLException{
        try {
            this.connect.close();
        } catch (SQLException ex) {
            throw ex;
        }
    }
    
}
