package schema.utils;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import schema.annotation.AutoIncreament;
import schema.annotation.Check;
import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.connection.SqlConnection;
import schema.enums.SchemaNames;

public class CreateTable {

	private static final String emptyString = "";
	private static final String createTable = "CREATE TABLE";
	private static final String ifNotExists = "IF NOT EXISTS";
	private static final String select = "SELECT";
	private static final String from = "FROM";
	private static final String equals = "=";
	private static final String where = "WHERE";
	private static final String and = "AND";
	private static final String limit = "LIMIT";
	private static final String count = "COUNT";
	private static final String asterisk = "*";
	private static final String space = " ";
	private static final String openingParen = "(";
	private static final String closingParen = ")";
	private static final String comma = ",";
	private static final String backTick = "`";
	private static final String singleQuote = "'";
	private static final String colon = ":";
	private static final String primaryKey = "PRIMARY KEY";
	private static final String foreignKey = "FOREIGN KEY";
	private static final String unique = "UNIQUE";
	private static final String check = "CHECK";
	private static final String references = "REFERENCES";
	private static final String autoIncreament = "AUTO_INCREMENT";
	private static final String notNull = "NOT NULL";
	private static final String onDelete = "ON DELETE";
	private static final String onUpdate = "ON UPDATE";
	private static final String constraint = "CONSTRAINT";

	private static final String tableAlreadyExists = "Table Already Exists";
	private static final String tablesuccessfullycreated = "Table successfully created";

	private String schemaName;
	private String tableName;

	private List<Field> columns = new ArrayList<Field>();
	//This constraints might not be used, remove it 
	private List<Field> constraints = new ArrayList<Field>();

	private static String formatSize(int size) {
		return String.format("(%d)", size);
	}

	private static String formatSize(int size, int precision) {
		return String.format("(%d,%d)", size, precision);
	}

	private static String encloseBetweenBackTicks(String value) {
		return value != null && value.length() > 0 ? backTick + value + backTick : emptyString;
	}

	private static String encloseBeweenSingleQuote(String value) {
		return value != null && value.length() > 0 ? singleQuote + value + singleQuote : emptyString;
	}

	private static String getSize(Field field) {
		int size = field.getAnnotation(Column.class).size();
		int precision = field.getAnnotation(Column.class).precision();

		String choise = field.getType().getSimpleName();

		switch (choise) {
		case "BigInt":
			return "";
		case "Binary":
			return formatSize(size);
		case "Boolean":
			return "";
		case "Date":
			return "";
		case "DateTime":
			return "";
		case "Decimal":
			return formatSize(size, precision);
		case "Double":
			return "";
		case "Int":
			return "";
		case "MediumInt":
			return "";
		case "SmallInt":
			return "";
		case "Text":
			return "";
		case "Time":
			return "";
		case "TinyInt":
			return "";
		case "Varchar":
			return formatSize(size);
		case "Json":
			return "";

		default:
			break;
		}

		return "";
	}

	private static String getColumns(CreateTable createTable) {
		String columnDefinitions = new String(emptyString);

		for (Field field : createTable.columns) {

			columnDefinitions += encloseBetweenBackTicks(field.getName()) + space + field.getType().getSimpleName()
					+ space + getSize(field);

			if (field.isAnnotationPresent(NotNull.class))
				columnDefinitions += space + notNull;

			if (field.isAnnotationPresent(AutoIncreament.class))
				columnDefinitions += space + autoIncreament;

			columnDefinitions += comma + space;
		}

		return removeCommaAndSpaceFromEndIfExists(columnDefinitions);
	}

	private static String getPrimaryKeyConstraint(CreateTable createTable) {

		String primaryKeyConstraints = new String(emptyString);

		List<Field> fields = new ArrayList<Field>();
		fields.addAll(createTable.columns);
		fields.addAll(createTable.constraints);

		for (Field field : fields) {

			if (field.isAnnotationPresent(PrimaryKey.class)) {

				primaryKeyConstraints += constraint + space
						+ encloseBetweenBackTicks(field.getAnnotation(PrimaryKey.class).name()) + space + primaryKey
						+ space + openingParen + field.getName() + closingParen + comma + space;

			}

		}

		return removeCommaAndSpaceFromEndIfExists(primaryKeyConstraints);
	}

	private static String getForeignKeyConstraint(CreateTable createTable) {

		String foreignKeyConstraints = new String(emptyString);

		List<Field> fields = new ArrayList<Field>();
		fields.addAll(createTable.columns);
		fields.addAll(createTable.constraints);

		for (Field field : fields) {
			if (field.isAnnotationPresent(ForeignKey.class)) {
				foreignKeyConstraints += constraint + space
						+ encloseBetweenBackTicks(field.getAnnotation(ForeignKey.class).name()) + space + foreignKey
						+ space + openingParen + encloseBetweenBackTicks(field.getName()) + closingParen + space
						+ references + space
						+ encloseBetweenBackTicks(field.getAnnotation(ForeignKey.class).referenceTable()) + openingParen
						+ encloseBetweenBackTicks(field.getAnnotation(ForeignKey.class).referenceField()) + closingParen
						+ space + onUpdate + space + field.getAnnotation(ForeignKey.class).onUpdate().value + space
						+ onDelete + space + field.getAnnotation(ForeignKey.class).onDelete().value + comma + space;

			}

		}

		return removeCommaAndSpaceFromEndIfExists(foreignKeyConstraints);
	}

	private static String join(String[] values, String ch) {
		String res = "";
		for (int i = 0; i < values.length; i++) {
			if (i > 0) {
				res += ch;
			}
			res += values[i];
		}

		return res;
	}

	private static String getUniqueKeyConstraint(CreateTable createTable) {

		String uniqueKeyConstraints = new String(emptyString);

		List<Field> fields = new ArrayList<Field>();
		fields.addAll(createTable.columns);
		fields.addAll(createTable.constraints);

		HashMap<Integer, List<String>> uniqueColumnsMap = new HashMap<Integer, List<String>>();

		for (Field field : fields) {

			if (field.isAnnotationPresent(Unique.class)) {

				int groupIndex = field.getAnnotation(Unique.class).groupIndex();

				if (!uniqueColumnsMap.containsKey(groupIndex)) {
					uniqueColumnsMap.put(groupIndex, new ArrayList<String>());
				}

				uniqueColumnsMap.get(groupIndex).add(field.getName());

			}

		}

		int index = 0;
		for (Map.Entry<Integer, List<String>> entry : uniqueColumnsMap.entrySet()) {
			if (index > 0) {
				uniqueKeyConstraints += comma + space;
			}

			String[] cols = entry.getValue().toArray(new String[entry.getValue().size()]);

			uniqueKeyConstraints += constraint + space + unique + space + join(cols, "_") + space + openingParen
					+ formatIntoCommaSeperated(cols, true) + closingParen;

			index++;
		}

		return uniqueKeyConstraints;
	}

	private static String formatIntoCommaSeperated(String[] str, boolean shouldEncloseBetweenBackTicks) {
		String result = emptyString;
		for (String s : str) {
			if (shouldEncloseBetweenBackTicks)
				result += encloseBetweenBackTicks(s) + comma + space;
			else
				result += s + comma + space;
		}

		return removeCommaAndSpaceFromEndIfExists(result);
	}

	private static String removeCommaAndSpaceFromEndIfExists(String str) {
		int index = str.lastIndexOf(comma + space);

		return index == -1 ? str : str.substring(0, index);
	}

	private static String getChecks(CreateTable createTable) {

		String checks = new String(emptyString);

		List<Field> fields = new ArrayList<Field>();
		fields.addAll(createTable.columns);
		fields.addAll(createTable.constraints);

		for (Field field : fields) {
			if (field.isAnnotationPresent(Check.class)) {
				checks += constraint + space + encloseBetweenBackTicks(field.getAnnotation(Check.class).name()) + check
						+ space + openingParen + field.getAnnotation(Check.class).expression() + closingParen + comma
						+ space;

			}

		}

		return removeCommaAndSpaceFromEndIfExists(checks);
	}

	private static String getCreateTableStatement(CreateTable createTable) {

		String stmnt = CreateTable.createTable + space + ifNotExists + space
				+ encloseBetweenBackTicks(createTable.tableName) + space + openingParen + getColumns(createTable);

		String primaryKeyConstraint = getPrimaryKeyConstraint(createTable);
		String foreignKeyConstraint = getForeignKeyConstraint(createTable);
		String uniqueKeyConstraint = getUniqueKeyConstraint(createTable);
		String checks = getChecks(createTable);

		if (primaryKeyConstraint != null && primaryKeyConstraint.length() > 0)
			stmnt += comma + space + primaryKeyConstraint;

		if (foreignKeyConstraint != null && foreignKeyConstraint.length() > 0)
			stmnt += comma + space + foreignKeyConstraint;

		if (uniqueKeyConstraint != null && uniqueKeyConstraint.length() > 0)
			stmnt += comma + space + uniqueKeyConstraint;

		if (checks != null && checks.length() > 0)
			stmnt += comma + space + checks;

		stmnt += closingParen;

		return stmnt;

	}

	private static String isTableExistsQuery(CreateTable createTable) {

		return select + space + count + openingParen + asterisk + closingParen + space + from + space
				+ encloseBetweenBackTicks("tables") + space + space + where + space
				+ encloseBetweenBackTicks("table_schema") + equals + encloseBeweenSingleQuote(createTable.schemaName)
				+ space + and + space + encloseBetweenBackTicks("table_name") + equals
				+ encloseBeweenSingleQuote(createTable.tableName) + space + limit + space + 1;

	}

	private static boolean isTableExists(CreateTable createTable, Connection connection) throws SQLException {
		String query = isTableExistsQuery(createTable);

		connection.setCatalog(SchemaNames.INFORMATION_SCHEMA.toString());
		Statement statement = connection.createStatement();

		ResultSet resultSet = statement.executeQuery(query);

		return resultSet.next() && resultSet.getInt(1) == 1;
	}

	private static void createTableIfNotExists(CreateTable createTable) {
		try {
			Connection connection = SqlConnection.getOrCreateNewConnection();

			if (isTableExists(createTable, connection)) {
				System.out.println(createTable.tableName + space + colon + space + tableAlreadyExists);
			} else {
				connection.setCatalog(createTable.schemaName);
				Statement statement = connection.createStatement();
				String insetStmnt = getCreateTableStatement(createTable);
				statement.executeUpdate(insetStmnt);

				System.out.println(createTable.tableName + space + colon + space + tablesuccessfullycreated);
			}

			connection.close();

		} catch (Exception e) {
			System.out.println("Exception: " + e);
			e.printStackTrace();
		}
	}

	public static void createTable(String schemaName, Object ob) {
		CreateTable createTable = new CreateTable();

		createTable.schemaName = schemaName;

		if (ob.getClass().isAnnotationPresent(Table.class)) {
			createTable.tableName = ob.getClass().getSimpleName();
		}

		for (Field field : ob.getClass().getDeclaredFields()) {
			if (field.isAnnotationPresent(Column.class))
				createTable.columns.add(field);
		}

		for (Field field : ob.getClass().getSuperclass().getDeclaredFields()) {
			if (field.isAnnotationPresent(Column.class))
				createTable.columns.add(field);
		}

		createTableIfNotExists(createTable);

	}

}
