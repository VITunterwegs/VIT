package Database.Connection;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author D060312
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class Database {

    private String username = "";
    private String password = "";
    private String url = "";

    private Connection con = null;
    private static Database db = null;


    private Database(String username, String password, String url) throws SQLException, ClassNotFoundException{
        this.username = username;
        this.password = password;
        this.url = url;
        
        connect();
    }
    
    public static Database getInstance(String username, String password, String url) throws SQLException, ClassNotFoundException{
        if(db == null){
            db = new Database(username, password, url);
            return db;
        }else return db;
    }
    
    private Connection connect() throws SQLException, ClassNotFoundException{
        Class.forName("com.mysql.jdbc.Driver");
        return con = DriverManager.getConnection(url, username, password);
    }
    
    public Connection getConnection(){
        return con;
    }
    
    public void closeConnection() throws SQLException{
        con.close();
    }
}
