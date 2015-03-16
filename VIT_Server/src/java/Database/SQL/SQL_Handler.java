/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Database.SQL;

/**
 *
 * @author D060312
 */
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SQL_Handler {

    private Connection con = null;
    private ResultSet rs = null;

    public SQL_Handler(Connection con) {
        this.con = con;        
    }
    
    public ResultSet handleSQL(String sql) throws SQLException{
        Statement st = con.createStatement();
        
       if(st.execute(sql)){
           rs = st.getResultSet();
           return rs;
       }else{
           return null;
       }
    }

}
