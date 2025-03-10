package schema.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import schema.enums.SchemaNames;

public class SqlConnection {

	private static final String driver = "com.mysql.jdbc.Driver";
	private static final String unicode = "useSSL=false&autoReconnect=true&useUnicode=yes&characterEncoding=UTF-8";

	private static String url = "jdbc:mysql://localhost:3306/infinity_stone?";
	private static String user = "root";
	private static String password = "rootuser";

	public static void initializeConfig() {

		String url = System.getenv("MYSQL_URL");
		String user = System.getenv("MYSQL_USER");
		String password = System.getenv("MYSQL_PASSWORD");

		if (url != null) {
			SqlConnection.url = url;
		}

		if (user != null) {
			SqlConnection.user = user;
		}

		if (password != null) {
			SqlConnection.password = password;
		}
	}

	private static Connection connection;

	public static Connection getOrCreateNewConnection() {
		try {

			if (connection != null && !connection.isClosed())
				return connection;

			Class.forName(driver);
			connection = DriverManager.getConnection(url + unicode, user, password);
			connection.setAutoCommit(true);

			return connection;
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static Connection createNewConnection() {
		try {

			if (connection != null && !connection.isClosed()) {
				connection.close();
			}

			Class.forName(driver);
			connection = DriverManager.getConnection(url + unicode, user, password);
			connection.setAutoCommit(true);

			return connection;
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static String getDataBaseName() {
		return SchemaNames.INFINITY_STONE.getValue();
	}

	public static void closeConnection() {
		try {
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
