

import java.io.*;
import java.sql.*;
import java.util.logging.*;
import java.util.*;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.*;

/**
 * Servlet implementation class GetFavorit
 */
@WebServlet("/GetFavorit")
public class GetFavorit extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Connection connect = null;
    private Statement statement = null;
    private PreparedStatement preparedStatement = null;
    private ResultSet res = null;
    
    private String dbhost = "schoeneborn-online.de";
    private String dbport = "110";
    private String dbname = "vit";
    private String dbuser = "vit";
    private String dbpw = "vitistcool";
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException, SQLException, JSONException {
        Exception exception;            //Exception-Variable für das FehlerHandling
        
        try {  
           
            Class.forName("com.mysql.jdbc.Driver");
           
            connect = DriverManager
              .getConnection("jdbc:mysql://"+ dbhost + ":"+dbport+"/"+ dbname+"?"
                + "user=" + dbuser + "&password=" + dbpw);
           
            statement = connect.createStatement();
            
            java.util.Date now = new java.util.Date();
            java.sql.Timestamp timestamp = new java.sql.Timestamp(now.getTime());
            java.sql.Timestamp pastTimestamp = new java.sql.Timestamp(now.getTime()-3600000);
            
            preparedStatement = connect
              .prepareStatement("SELECT * FROM favorit " + 
                      dbname + ".Verspaetung WHERE USERID=1");
            res = preparedStatement.executeQuery();
            
            JSONArray json = ResultSetConverter.convert(res);
      
        } catch (ClassNotFoundException | SQLException e) {
            throw e;
        } finally {
            close();
        }
        
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException | SQLException | JSONException ex) {
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException | SQLException | JSONException ex) {
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
    
    private void close() throws SQLException{
        try {
            this.connect.close();
        } catch (SQLException ex) {
            throw ex;
        }
    }

}