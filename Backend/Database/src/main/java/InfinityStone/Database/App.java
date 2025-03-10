package InfinityStone.Database;

import java.sql.*;

import schema.definition.SocialMedia;
import schema.definition.State;
import schema.definition.Login;
import schema.definition.User;
import schema.definition.Address;
import schema.definition.UserProductPreference;
import schema.definition.ViewSettings;
import schema.definition.ViewSettingsMetadata;
import schema.definition.Category;
import schema.definition.Order;
import schema.definition.OrderItem;
import schema.definition.Product;
import schema.definition.ProductMetadata;
import schema.definition.ProductOption;
import schema.definition.ProductOptionValue;
import schema.definition.ProductRating;
import schema.definition.ProductRatingMetadata;
import schema.definition.ProductSKU;
import schema.definition.ProductSKUValue;
import schema.definition.ProductView;
import schema.definition.Seller;
import schema.definition.SellerFinancialDetails;
import schema.utils.CreateTable;
import schema.connection.SqlConnection;

public class App {
	public static void main(String[] args) throws SQLException {

		CreateTable.createTable(SqlConnection.getDataBaseName(), new User());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new Login());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new State());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new Address());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new Seller());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new SellerFinancialDetails());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new SocialMedia());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new Category());

		CreateTable.createTable(SqlConnection.getDataBaseName(), new Product());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new ProductMetadata());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new ProductOption());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new ProductOptionValue());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new ProductSKU());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new ProductSKUValue());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new ProductRating());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new ProductRatingMetadata());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new ProductView());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new Order());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new OrderItem());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new UserProductPreference());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new ViewSettings());
		CreateTable.createTable(SqlConnection.getDataBaseName(), new ViewSettingsMetadata());

	}
}
