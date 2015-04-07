

import java.io.*;
import java.sql.*;
import java.util.*;
import java.util.logging.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class GetNotification
 */
@WebServlet("/GetNotification")
public class GetNotification extends HttpServlet {
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
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet GetNotification</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet GetNotification at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
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
            String linie, direction, originArr;
            linie = request.getParameter("linie");
            direction = request.getParameter("dir");
            originArr = request.getParameter("originArr");
            getNotification(request, response, linie, direction, originArr);
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(GetNotification.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void getNotification(HttpServletRequest request, HttpServletResponse response, String linie, String direction, String originArr) throws ClassNotFoundException, SQLException, IOException{
        Exception exception;            //Exception-Variable für das FehlerHandling
        
        try {  
           
            Class.forName("com.mysql.jdbc.Driver");
           
            connect = DriverManager
              .getConnection("jdbc:mysql://"+ dbhost + ":"+dbport+"/"+ dbname+"?"
                + "user=" + dbuser + "&password=" + dbpw);
           
            statement = connect.createStatement();
            java.util.Date now;
            now = new java.util.Date();
            preparedStatement = connect
              .prepareStatement("select * from Verspaetung where linie=? "
                      + "and direction=? "
                      + "and regulaere_Ankunftszeit=?"
                      + "and timestamp between " /* + (now -<1 Stunde>) */+ "and "+ now );
           
            preparedStatement.setString(1, linie);
            preparedStatement.setString(2, direction);
            preparedStatement.setString(3, originArr);
            resultSet = preparedStatement.executeQuery();
            
            Integer del = 0;
            Integer no_entries = 0;
            
            while (resultSet.next()){
                del = new Integer(resultSet.getString("verspaetung_minuten"));
                no_entries++;
            }
            
            if (del > 0){
            del = del / no_entries;
            }
            
            PrintWriter out = response.getWriter();
            
            
      
        } catch (ClassNotFoundException | SQLException e) {
            throw e;
        } finally {
            close();
        }
    }
    
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
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
