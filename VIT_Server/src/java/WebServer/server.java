package WebServer;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Database.SQL.SQL_Handler;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author D060312
 */
@WebServlet(urlPatterns = {"/server"})
public class server extends HttpServlet {
    
    private Database.Connection.Database db = null;
    private Database.SQL.SQL_Handler sql_handler = null;
    
    

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
            
            try{
            db = Database.Connection.Database.getInstance("admin", "Fabian93", "jdbc:mysql://schoeneborn-online.de:110/vit_unterwegs");
            sql_handler = new SQL_Handler(db.getConnection());
            
            out.println("test");
            switch (request.getAttribute("operation").toString()) {
                case "login":
                    
                    String email = request.getAttribute("email").toString();
                    String password = request.getAttribute("password").toString();
                    
                    ResultSet rs = null;
                    
                    rs = sql_handler.handleSQL("SELECT password FROM benutzer WHERE email=" + email);
                    
                    if(rs.next()){
                        out.print(rs.getString("password"));
                    }

                    break;
                case "test":
                    break;
            }
            }catch(Exception e){
                out.print(e.getMessage());
            }

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
        processRequest(request, response);
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

}
