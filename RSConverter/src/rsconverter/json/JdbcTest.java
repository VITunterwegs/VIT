package rsconverter.json;

/**
 * Imports all entries from the java.sql library. 
 * Improve on this by only importing needed classes. 
 * E.g.:
 * import java.sql.Connection
 * import java.sql.Statement
 * ...
 */
import java.sql.*;

public class JdbcTest{
	
	public static ResultSet res;
	
    public static void main(String[] args){
        
        /**
         * 3306 is the default port for MySQL in XAMPP. Note both the 
         * MySQL server and Apache must be running. 
         */
        String url = "jdbc:mysql://schoeneborn-online.de:110/vit";
        
        /**
         * The MySQL user.
         */
        String user = "vit";
        
        /**
         * Password for the above MySQL user. If no password has been 
         * set (as is the default for the root user in XAMPP's MySQL),
         * an empty string can be used.
         */
        String password = "vitistcool";
        
        try
        {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection con = DriverManager.getConnection(url, user, password);
            
            Statement stt = con.createStatement();
            
            /**
             * Create and select a database for use. 
             */
            stt.execute("USE vit");
            
            res = stt.executeQuery("SELECT * FROM user");
            
            /**
             * Iterate over the result set from the above query
             */
            while (res.next())
            {
                System.out.println(res.getString("fname") + " " + res.getString("lname"));
            }
            System.out.println("");
            
            
            /**
             * Free all opened resources
             */
            
            JSONArray json = ResultSetConverter.convert(res);
            
            System.out.println(json);
            
            res.close();
            stt.close();
            prep.close();
            con.close();
            
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}