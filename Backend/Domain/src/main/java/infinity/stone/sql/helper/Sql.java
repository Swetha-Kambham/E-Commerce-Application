package infinity.stone.sql.helper;

//import java.lang.reflect.InvocationTargetException;
//import java.lang.reflect.Method;
import java.sql.Connection;
import schema.connection.SqlConnection;
//import java.sql.Date;
//import java.sql.Time;
//import java.sql.Timestamp;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
//import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Sql {

//	public String getValuePlaceHolder(int length) {
//		if (length < 0)
//			return "";
//
//		String placeHolder = " (";
//
//		for (int i = 0; i < length - 1; i++) {
//			placeHolder += "?,";
//		}
//		placeHolder += "? )";
//
//		return placeHolder;
//	}
//
//	public String getValuePlaceHolderForMultpleRows(int rows, int columns) {
//		String placeHolder = "";
//		for (int i = 0; i < rows - 1; i++) {
//			placeHolder += getValuePlaceHolder(columns) + ",";
//		}
//		placeHolder += getValuePlaceHolder(columns);
//
//		return placeHolder;
//	}
//
//	public void addValue(Field field, int position, PreparedStatement ps) {
//
//		Class<? extends Field> cls = field.getClass();
//
//		try {
//			Method method = cls.getDeclaredMethod(field.getMethodName());
//
//			switch (field.getMethodReturnType()) {
//			case String:
//				ps.setString(position, (String) method.invoke(field));
//				break;
//
//			case Binary:
//				byte[] value = (byte[]) method.invoke(field);
//				if (value != null)
//					ps.setBytes(position, value);
//				else
//					ps.setNull(position, java.sql.Types.BINARY);
//				break;
//
//			case Boolean:
//				if (method.invoke(field) != null)
//					ps.setBoolean(position, (Boolean) method.invoke(field));
//				else
//					ps.setNull(position, java.sql.Types.BOOLEAN);
//				break;
//
//			case Integer:
//				if (method.invoke(field) != null)
//					ps.setInt(position, (Integer) method.invoke(field));
//				else
//					ps.setNull(position, java.sql.Types.INTEGER);
//				break;
//
//			case Double:
//				if (method.invoke(field) != null)
//					ps.setDouble(position, (Double) method.invoke(field));
//				else
//					ps.setNull(position, java.sql.Types.DOUBLE);
//				break;
//
//			case Date:
//				ps.setDate(position, (Date) method.invoke(field));
//				break;
//
//			case Time:
//				ps.setTime(position, (Time) method.invoke(field));
//				break;
//
//			case Timestamp:
//				ps.setTimestamp(position, (Timestamp) method.invoke(field));
//				break;
//			default:
//				break;
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//	}
//
//	public void addValue(FieldValue value, int position, PreparedStatement ps) {
//
//		try {
//			switch (value.getType()) {
//			case String:
//				ps.setString(position, value.getString());
//				break;
//
//			case Binary:
//				Binary binary = value.getBinary();
//				ps.setBytes(position, binary.getField());
//				break;
//
//			case Boolean:
//				if (value.getBool() != null)
//					ps.setBoolean(position, value.getBool());
//				else
//					ps.setNull(position, java.sql.Types.BOOLEAN);
//				break;
//
//			case Integer:
//				if (value.getInteger() != null)
//					ps.setInt(position, value.getInteger());
//				else
//					ps.setNull(position, java.sql.Types.INTEGER);
//				break;
//
//			case Double:
//				if (value.getNumeric() != null)
//					ps.setDouble(position, value.getNumeric());
//				else
//					ps.setNull(position, java.sql.Types.DOUBLE);
//				break;
//
//			case Date:
//				ps.setDate(position, value.getDate());
//				break;
//
//			case Time:
//				ps.setTime(position, value.getTime());
//				break;
//
//			case Timestamp:
//				ps.setTimestamp(position, value.getDateTime());
//				break;
//			default:
//				break;
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//	}
//
//	private String encloseBeweenBackTicks(String value) {
//		return "`" + value + "`";
//	}
//
//	public void insertOrUpdate(String tableName, Field[] fields) throws Exception {
//		// use this in case of not sure to row is existing or not
//		// fieldsToUpdate are the indexes of fields to update in case of duplicate row
//
//		String columns = " ( ";
//		String columnsToUpdate = "";
//
//		HashMap<Integer, Field> placeHolderValueMap = new HashMap<Integer, Field>();
//
//		int totalColumns = fields.length;
//		int columnsIndex = 1;
//		int updatableColumnsIndex = totalColumns + 1;
//		boolean visited = false;
//
//		for (int i = 0; i < totalColumns - 1; i++) {
//			columns += encloseBeweenBackTicks(fields[i].getFieldName()) + ", ";
//			placeHolderValueMap.put(columnsIndex++, fields[i]);
//
//			if (fields[i].getIsUpdatable()) {
//
//				if (visited)
//					columnsToUpdate += "," + encloseBeweenBackTicks(fields[i].getFieldName()) + QueryOperator.equal
//							+ "? ";
//				else
//					columnsToUpdate += encloseBeweenBackTicks(fields[i].getFieldName()) + QueryOperator.equal + "? ";
//
//				placeHolderValueMap.put(updatableColumnsIndex++, fields[i]);
//				visited = true;
//			}
//		}
//
//		columns += encloseBeweenBackTicks(fields[totalColumns - 1].getFieldName()) + " ) ";
//		placeHolderValueMap.put(columnsIndex++, fields[totalColumns - 1]);
//
//		if (fields[totalColumns - 1].getIsUpdatable()) {
//
//			if (visited)
//				columnsToUpdate += ",";
//
//			columnsToUpdate += encloseBeweenBackTicks(fields[totalColumns - 1].getFieldName()) + QueryOperator.equal
//					+ "? ";
//			placeHolderValueMap.put(updatableColumnsIndex++, fields[totalColumns - 1]);
//		}
//
//		Connection connection = SqlConnection.getOrCreateNewConnection();
//		String sqlCreateStatement = "INSERT INTO " + tableName + columns + " VALUES "
//				+ getValuePlaceHolder(fields.length) + " ON DUPLICATE KEY UPDATE " + columnsToUpdate;
//		PreparedStatement pstmt = connection.prepareStatement(sqlCreateStatement);
//
//		for (Map.Entry<Integer, Field> entry : placeHolderValueMap.entrySet()) {
//			addValue(entry.getValue(), entry.getKey(), pstmt);
//		}
//
//		if (connection != null) {
//			pstmt.executeUpdate();
//			connection.close();
//		}
//	}
//
//	public PreparedStatement getCreateInsertOrUpdateSqlStatement(Connection connection, String tableName,
//			Field[] fields) throws Exception {
//		// use this in case of not sure to row is existing or not
//		// fieldsToUpdate are the indexes of fields to update in case of duplicate row
//
//		String columns = " ( ";
//		String columnsToUpdate = "";
//
//		HashMap<Integer, Field> placeHolderValueMap = new HashMap<Integer, Field>();
//
//		int totalColumns = fields.length;
//		int columnsIndex = 1;
//		int updatableColumnsIndex = totalColumns + 1;
//		boolean visited = false;
//
//		for (int i = 0; i < totalColumns - 1; i++) {
//			columns += encloseBeweenBackTicks(fields[i].getFieldName()) + ", ";
//			placeHolderValueMap.put(columnsIndex++, fields[i]);
//
//			if (fields[i].getIsUpdatable()) {
//
//				if (visited)
//					columnsToUpdate += "," + encloseBeweenBackTicks(fields[i].getFieldName()) + QueryOperator.equal
//							+ "? ";
//				else
//					columnsToUpdate += encloseBeweenBackTicks(fields[i].getFieldName()) + QueryOperator.equal + "? ";
//
//				placeHolderValueMap.put(updatableColumnsIndex++, fields[i]);
//				visited = true;
//			}
//		}
//
//		columns += encloseBeweenBackTicks(fields[totalColumns - 1].getFieldName()) + " ) ";
//		placeHolderValueMap.put(columnsIndex++, fields[totalColumns - 1]);
//
//		if (fields[totalColumns - 1].getIsUpdatable()) {
//
//			if (visited)
//				columnsToUpdate += ",";
//
//			columnsToUpdate += encloseBeweenBackTicks(fields[totalColumns - 1].getFieldName()) + QueryOperator.equal
//					+ "? ";
//			placeHolderValueMap.put(updatableColumnsIndex++, fields[totalColumns - 1]);
//		}
//
//		String sqlCreateStatement = "INSERT INTO " + tableName + columns + " VALUES "
//				+ getValuePlaceHolder(fields.length) + " ON DUPLICATE KEY UPDATE " + columnsToUpdate;
//		PreparedStatement pstmt = connection.prepareStatement(sqlCreateStatement);
//
//		for (Map.Entry<Integer, Field> entry : placeHolderValueMap.entrySet()) {
//			addValue(entry.getValue(), entry.getKey(), pstmt);
//		}
//
//		return pstmt;
//	}
//
//	public void insert(String tableName, Field... fields) throws Exception {
//		String columns = " ( ";
//
//		int totalColumns = fields.length;
//		for (int i = 0; i < totalColumns - 1; i++) {
//			columns += encloseBeweenBackTicks(fields[i].getFieldName()) + ", ";
//		}
//		columns += encloseBeweenBackTicks(fields[totalColumns - 1].getFieldName()) + " ) ";
//
//		Connection connection = SqlConnection.getOrCreateNewConnection();
//		String sqlCreateStatement = "INSERT INTO " + tableName + columns + " VALUES "
//				+ getValuePlaceHolder(fields.length);
//		PreparedStatement pstmt = connection.prepareStatement(sqlCreateStatement);
//		int i = 1;
//		for (Field field : fields) {
//			addValue(field, i++, pstmt);
//		}
//
//		if (connection != null) {
//			pstmt.executeUpdate();
//			connection.close();
//		}
//	}
//
//	public PreparedStatement getCreateInsertSqlStatement(Connection connection, String tableName, Field... fields)
//			throws Exception {
//
//		String columns = " ( ";
//
//		int totalColumns = fields.length;
//		for (int i = 0; i < totalColumns - 1; i++) {
//			columns += encloseBeweenBackTicks(fields[i].getFieldName()) + ", ";
//		}
//		columns += encloseBeweenBackTicks(fields[totalColumns - 1].getFieldName()) + " ) ";
//
//		String sqlCreateStatement = "INSERT INTO " + tableName + columns + " VALUES "
//				+ getValuePlaceHolder(fields.length);
//		PreparedStatement pstmt = connection.prepareStatement(sqlCreateStatement, Statement.RETURN_GENERATED_KEYS);
//		int i = 1;
//		for (Field field : fields) {
//			addValue(field, i++, pstmt);
//		}
//
//		return pstmt;
//	}
//
//	public void bulkInsert(String tableName, List<List<Field>> rows) throws Exception {
//		int totalRows = rows.size();
//
//		if (totalRows <= 0)
//			return;
//
//		List<Field> firstRow = rows.get(0);
//		int totalColumns = firstRow.size();
//
//		String columns = " ( ";
//
//		for (int i = 0; i < totalColumns - 1; i++) {
//			columns += encloseBeweenBackTicks(firstRow.get(i).getFieldName()) + ", ";
//		}
//		columns += encloseBeweenBackTicks(firstRow.get(totalColumns - 1).getFieldName()) + " ) ";
//
//		Connection connection = SqlConnection.getOrCreateNewConnection();
//		String sqlCreateStatement = "INSERT INTO " + tableName + columns + " VALUES "
//				+ getValuePlaceHolderForMultpleRows(totalRows, totalColumns);
//		PreparedStatement pstmt = connection.prepareStatement(sqlCreateStatement);
//
//		for (int i = 0; i < totalRows; i++) {
//			List<Field> row = rows.get(i);
//			if (row.size() != totalColumns)
//				throw new Exception("rows are not compatitable with columns");
//
//			for (int j = 0; j < row.size(); j++) {
//				if (row.get(j).getFieldName() != firstRow.get(j).getFieldName())
//					throw new Exception("rows are not compatitable with columns");
//
//				addValue(row.get(j), i * totalColumns + j + 1, pstmt);
//			}
//		}
//
//		if (connection != null) {
//			pstmt.executeUpdate();
//			connection.close();
//		}
//	}
//
//	public PreparedStatement bulkGetCreateInsertSQLStatment(Connection connection, String tableName,
//			List<List<Field>> rows) throws Exception {
//		int totalRows = rows.size();
//
//		if (totalRows <= 0)
//			return null;
//
//		List<Field> firstRow = rows.get(0);
//		int totalColumns = firstRow.size();
//
//		String columns = " ( ";
//
//		for (int i = 0; i < totalColumns - 1; i++) {
//			columns += encloseBeweenBackTicks(firstRow.get(i).getFieldName()) + ", ";
//		}
//		columns += encloseBeweenBackTicks(firstRow.get(totalColumns - 1).getFieldName()) + " ) ";
//
//		String sqlCreateStatement = "INSERT INTO " + tableName + columns + " VALUES "
//				+ getValuePlaceHolderForMultpleRows(totalRows, totalColumns);
//		PreparedStatement pstmt = connection.prepareStatement(sqlCreateStatement);
//
//		for (int i = 0; i < totalRows; i++) {
//			List<Field> row = rows.get(i);
//			if (row.size() != totalColumns)
//				throw new Exception("rows are not compatitable with columns");
//
//			for (int j = 0; j < row.size(); j++) {
//				if (row.get(j).getFieldName() != firstRow.get(j).getFieldName())
//					throw new Exception("rows are not compatitable with columns");
//
//				addValue(row.get(j), i * totalColumns + j + 1, pstmt);
//			}
//		}
//
//		return pstmt;
//	}
//
//	public void update(String tableName, String condition, HashMap<Integer, FieldValue> placeHolderValueMap,
//			Field... fields) throws Exception {
//		// Condition will be like "WHERE col1 = ? AND col2 in ( ?, ? )"
//		// placeHolderValueMap is values for above place holder
//
//		String columns = "";
//		int totalFields = fields.length;
//
//		for (int i = 0; i < totalFields - 1; i++) {
//			columns += encloseBeweenBackTicks(fields[i].getFieldName()) + " = ? , ";
//		}
//
//		columns += encloseBeweenBackTicks(fields[totalFields - 1].getFieldName()) + " = ? ";
//
//		Connection connection = SqlConnection.getOrCreateNewConnection();
//		String sqlUpdateStatement = "UPDATE " + tableName + " SET " + columns + " WHERE " + condition;
//
//		PreparedStatement pstmt = connection.prepareStatement(sqlUpdateStatement);
//
//		int position = 1;
//		for (Field field : fields) {
//			addValue(field, position++, pstmt);
//		}
//
//		for (Map.Entry<Integer, FieldValue> entry : placeHolderValueMap.entrySet()) {
//			addValue(entry.getValue(), totalFields + entry.getKey(), pstmt);
//		}
//
//		if (connection != null) {
//			pstmt.executeUpdate();
//			connection.close();
//		}
//	}
//
//	public PreparedStatement getCreateUpdateStatement(Connection connection, String tableName, String condition,
//			HashMap<Integer, FieldValue> placeHolderValueMap, Field... fields) throws Exception {
//		// Condition will be like "WHERE col1 = ? AND col2 in ( ?, ? )"
//		// placeHolderValueMap is values for above place holder
//
//		String columns = "";
//		int totalFields = fields.length;
//
//		for (int i = 0; i < totalFields - 1; i++) {
//			columns += encloseBeweenBackTicks(fields[i].getFieldName()) + " = ? , ";
//		}
//
//		columns += encloseBeweenBackTicks(fields[totalFields - 1].getFieldName()) + " = ? ";
//
//		String sqlUpdateStatement = "UPDATE " + tableName + " SET " + columns + " WHERE " + condition;
//
//		PreparedStatement pstmt = connection.prepareStatement(sqlUpdateStatement);
//
//		int position = 1;
//		for (Field field : fields) {
//			addValue(field, position++, pstmt);
//		}
//
//		for (Map.Entry<Integer, FieldValue> entry : placeHolderValueMap.entrySet()) {
//			addValue(entry.getValue(), totalFields + entry.getKey(), pstmt);
//		}
//
//		return pstmt;
//	}
//
//	public void delete(String tableName, Field keyField) throws Exception {
//		Connection connection = SqlConnection.getOrCreateNewConnection();
//		String sqlDeleteStatement = "DELETE FROM " + tableName + " WHERE " + keyField.getFieldName()
//				+ QueryOperator.equal + "?";
//
//		PreparedStatement pstmt = connection.prepareStatement(sqlDeleteStatement);
//		addValue(keyField, 1, pstmt);
//
//		if (connection != null) {
//			pstmt.executeUpdate();
//			connection.close();
//		}
//	}
//
//	public void delete(String tableName, String condition, HashMap<Integer, FieldValue> placeHolderValueMap)
//			throws Exception {
//		// Condition will be like "WHERE col1 = ? AND col2 in ( ?, ? )"
//		// placeHolderValueMap is values for above place holder
//		Connection connection = SqlConnection.getOrCreateNewConnection();
//		String sqlDeleteStatement = "DELETE FROM " + tableName + " WHERE " + condition;
//
//		PreparedStatement pstmt = connection.prepareStatement(sqlDeleteStatement);
//
//		for (Map.Entry<Integer, FieldValue> entry : placeHolderValueMap.entrySet()) {
//			addValue(entry.getValue(), entry.getKey(), pstmt);
//		}
//
//		if (connection != null) {
//			pstmt.executeUpdate();
//			connection.close();
//		}
//	}
//
//	public PreparedStatement getCreateDeleteSqlStatement(Connection connection, String tableName, String condition,
//			HashMap<Integer, FieldValue> placeHolderValueMap) throws Exception {
//		// Condition will be like "WHERE col1 = ? AND col2 in ( ?, ? )"
//		// placeHolderValueMap is values for above place holder
//		String sqlDeleteStatement = "DELETE FROM " + tableName + " WHERE " + condition;
//
//		PreparedStatement pstmt = connection.prepareStatement(sqlDeleteStatement);
//
//		for (Map.Entry<Integer, FieldValue> entry : placeHolderValueMap.entrySet()) {
//			addValue(entry.getValue(), entry.getKey(), pstmt);
//		}
//
//		return pstmt;
//	}
//
//	public static int _insert(String tableName, Field... fields) {
//		Connection connection = SqlConnection.getOrCreateNewConnection();
//
//		try {
//			PreparedStatement pstmt = getCreateSqlInsertStatement(connection, tableName, fields);
//			int result = pstmt.executeUpdate();
//			connection.close();
//			return result;
//
//		} catch (SQLException | SecurityException | IllegalArgumentException e) {
//			e.printStackTrace();
//
//			return -1;
//		}
//	}
//
//	public static PreparedStatement getCreateSqlInsertStatement(Connection connection, String tableName,
//			Field... fields) {
//
//		Field[] columns = Field.cloneFields(fields);
//		String createStatement = SqlUtil.getCreateSqlInsertStatement(tableName, columns);
//
//		try {
//
//			PreparedStatement pstmt = connection.prepareStatement(createStatement, Statement.RETURN_GENERATED_KEYS);
//
//			for (Field field : columns) {
//				Object value = field.getGetterMethod().invoke(field);
//
//				if (value == null) {
//					field.getSqlSetterMethod().invoke(pstmt, field.getColumnIndex() + 1, field.getSqlType());
//					continue;
//				}
//
//				field.getSqlSetterMethod().invoke(pstmt, field.getColumnIndex() + 1, value);
//			}
//
//			return pstmt;
//
//		} catch (SQLException | SecurityException | IllegalAccessException | IllegalArgumentException
//				| InvocationTargetException e) {
//			e.printStackTrace();
//
//			return null;
//		}
//	}
//
//	/**
//	 * Column name and order should be same for all rows.
//	 */
//	public static int bulkInsert(String tableName, Field[][] fields) {
//		Connection connection = SqlConnection.getOrCreateNewConnection();
//
//		try {
//			PreparedStatement pstmt = getCreateSqlBulkInsertStatement(connection, tableName, fields);
//			int result = pstmt.executeUpdate();
//			connection.close();
//			return result;
//
//		} catch (SQLException | SecurityException | IllegalArgumentException e) {
//			e.printStackTrace();
//
//			return -1;
//		}
//	}
//
//	/**
//	 * Column name and order should be same for all rows.
//	 */
//	public static PreparedStatement getCreateSqlBulkInsertStatement(Connection connection, String tableName,
//			Field[][] fields) {
//		if (fields == null || fields.length == 0)
//			return null;
//
//		int rowCount = fields.length;
//		int columnCount = fields[0].length;
//
//		Field[][] columns = new Field[rowCount][columnCount];
//
//		for (int i = 0; i < rowCount; i++) {
//			columns[i] = Field.cloneFields(fields[i]);
//		}
//
//		String createStatement = SqlUtil.getCreateBulkSqlInsertStatement(tableName, columns);
//
//		try {
//
//			PreparedStatement pstmt = connection.prepareStatement(createStatement, Statement.RETURN_GENERATED_KEYS);
//
//			for (int row = 0; row < rowCount; row++) {
//				Field[] cols = columns[row];
//				for (Field field : cols) {
//					Object value = field.getGetterMethod().invoke(field);
//
//					if (value == null) {
//						field.getSqlSetterMethod().invoke(pstmt, row * columnCount + field.getColumnIndex() + 1,
//								field.getSqlType());
//						continue;
//					}
//
//					field.getSqlSetterMethod().invoke(pstmt, row * columnCount + field.getColumnIndex() + 1, value);
//				}
//			}
//
//			return pstmt;
//
//		} catch (SQLException | SecurityException | IllegalAccessException | IllegalArgumentException
//				| InvocationTargetException e) {
//			e.printStackTrace();
//
//			return null;
//		}
//	}
//
//	public static int _update(String tableName, QueryOperation whereClause, Field... fieldsToUpdate) {
//		Connection connection = SqlConnection.getOrCreateNewConnection();
//
//		try {
//			PreparedStatement pstmt = getCreateSqlUpdateStatement(connection, tableName, whereClause, fieldsToUpdate);
//			int result = pstmt.executeUpdate();
//			pstmt.close();
//			return result;
//
//		} catch (SQLException | SecurityException | IllegalArgumentException e) {
//			e.printStackTrace();
//
//			return -1;
//		}
//
//	}
//
//	public static PreparedStatement getCreateSqlUpdateStatement(Connection connection, String tableName,
//			QueryOperation whereClause, Field... fieldsToUpdate) {
//		if (connection == null || tableName == null || fieldsToUpdate == null || fieldsToUpdate.length == 0)
//			return null;
//
//		Field[] columns = Field.cloneFields(fieldsToUpdate);
//
//		String updateStatement = SqlUtil.getCreateSqlUpdateStatement(tableName, columns);
//
//		QueryOperation qo = QueryOperation.and(whereClause);
//		List<FieldValue> placeHolderValues = qo != null ? qo.getFieldValues() : new ArrayList<FieldValue>();
//
//		updateStatement = SqlUtil.addCondition(updateStatement, qo);
//
//		try {
//
//			PreparedStatement pstmt = connection.prepareStatement(updateStatement);
//
//			for (Field field : columns) {
//				Object value = field.getGetterMethod().invoke(field);
//
//				if (value == null) {
//					field.getSqlSetterMethod().invoke(pstmt, field.getColumnIndex() + 1, field.getSqlType());
//					continue;
//				}
//
//				field.getSqlSetterMethod().invoke(pstmt, field.getColumnIndex() + 1, value);
//			}
//
//			for (FieldValue f : placeHolderValues) {
//				Object value = f.getGetterMethod().invoke(f);
//				f.getSqlSetterMethod().invoke(pstmt, columns.length + f.getValueIndex() + 1, value);
//			}
//
//			return pstmt;
//
//		} catch (SQLException | SecurityException | IllegalAccessException | IllegalArgumentException
//				| InvocationTargetException e) {
//			e.printStackTrace();
//
//			return null;
//		}
//
//	}
//
//	public static int _delete(String tableName, QueryOperation whereClause) {
//		if (tableName == null)
//			return 0;
//
//		Connection connection = SqlConnection.getOrCreateNewConnection();
//
//		try {
//			PreparedStatement pstmt = getCreateSqlDeleteStatement(connection, tableName, whereClause);
//			int result = pstmt.executeUpdate();
//			pstmt.close();
//			return result;
//
//		} catch (SQLException | SecurityException | IllegalArgumentException e) {
//			e.printStackTrace();
//
//			return -1;
//		}
//
//	}
//
//	public static PreparedStatement getCreateSqlDeleteStatement(Connection connection, String tableName,
//			QueryOperation whereClause) {
//		String deleteStatement = SqlUtil.getCreateSqlDeleteStatement(tableName);
//
//		QueryOperation qo = QueryOperation.and(whereClause);
//		List<FieldValue> placeHolderValues = qo != null ? qo.getFieldValues() : new ArrayList<FieldValue>();
//
//		deleteStatement = SqlUtil.addCondition(deleteStatement, qo);
//
//		try {
//
//			PreparedStatement pstmt = connection.prepareStatement(deleteStatement);
//
//			for (FieldValue f : placeHolderValues) {
//				Object value = f.getGetterMethod().invoke(f);
//				f.getSqlSetterMethod().invoke(pstmt, f.getValueIndex() + 1, value);
//			}
//
//			return pstmt;
//
//		} catch (SQLException | SecurityException | IllegalAccessException | IllegalArgumentException
//				| InvocationTargetException e) {
//			e.printStackTrace();
//			return null;
//		}
//
//	}

	// new insert method

	public static int insert(String tableName, Field2... fields) {
		Connection connection = SqlConnection.getOrCreateNewConnection();
		try {
			PreparedStatement pstmt = getPrepareInsertStatement(connection, tableName, fields);
			int result = pstmt.executeUpdate();
			pstmt.close();
			if (connection.getAutoCommit()) {
				connection.close();
			}
			return result;
		} catch (SQLException | SecurityException | IllegalArgumentException e) {
			e.printStackTrace();

			return -1;
		}
	}

	public static PreparedStatement getPrepareInsertStatement(Connection connection, String tableName,
			Field2... fields) {
		String sqlInsertStatement = SqlUtil.getCreateSqlInsertStatement(tableName, fields);
		try {
			PreparedStatement pstmt = connection.prepareStatement(sqlInsertStatement, Statement.RETURN_GENERATED_KEYS);
			for (int i = 0; i < fields.length; i++) {
				Query2.addFieldValue(fields[i], i + 1, pstmt);
			}
			System.out.println(pstmt);
			return pstmt;
		} catch (SQLException | SecurityException | IllegalArgumentException e) {
			e.printStackTrace();

			return null;
		}
	}

	// new insert method end

	// new update method

	public static int update(String tableName, QueryOperation2 condition, Field2... fieldsToUpdate) {
		Connection connection = SqlConnection.getOrCreateNewConnection();
		try {
			PreparedStatement pstmt = getPrepareUpdateStatement(connection, tableName, condition, fieldsToUpdate);
			int result = pstmt.executeUpdate();
			pstmt.close();
			if (connection.getAutoCommit()) {
				connection.close();
			}
			return result;
		} catch (SQLException | SecurityException | IllegalArgumentException e) {
			e.printStackTrace();

			return -1;
		}
	}

	public static PreparedStatement getPrepareUpdateStatement(Connection connection, String tableName,
			QueryOperation2 condition, Field2... fieldsToUpdate) {
		HashMap<Integer, FieldValue2> fieldValueIndexMap = new HashMap<Integer, FieldValue2>();
		String updateStatment = SqlUtil.getCreateSqlUpdateStatement(tableName, fieldsToUpdate);
		updateStatment = SqlUtil.addCondition(updateStatment,
				generateFilterConditions(condition, fieldValueIndexMap, fieldsToUpdate.length + 1));
		try {
			PreparedStatement pstmt = connection.prepareStatement(updateStatment);
			for (int i = 0; i < fieldsToUpdate.length; i++) {
				Query2.addFieldValue(fieldsToUpdate[i], i + 1, pstmt);
			}

			for (Map.Entry<Integer, FieldValue2> fv : fieldValueIndexMap.entrySet()) {
				Query2.addValue(fv.getValue(), fv.getKey(), pstmt);
			}

			System.out.println(pstmt);
			return pstmt;
		} catch (SQLException | SecurityException | IllegalArgumentException e) {
			e.printStackTrace();

			return null;
		}
	}

	// new update method end

	// new delete method

	public static int delete(String tableName, QueryOperation2 condition) {
		Connection connection = SqlConnection.getOrCreateNewConnection();
		try {
			PreparedStatement pstmt = getPrepareDeleteStatement(connection, tableName, condition);
			int result = pstmt.executeUpdate();
			pstmt.close();
			if (connection.getAutoCommit()) {
				connection.close();
			}
			return result;
		} catch (SQLException | SecurityException | IllegalArgumentException e) {
			e.printStackTrace();

			return -1;
		}
	}

	public static PreparedStatement getPrepareDeleteStatement(Connection connection, String tableName,
			QueryOperation2 condition) {
		HashMap<Integer, FieldValue2> fieldValueIndexMap = new HashMap<Integer, FieldValue2>();
		String deleteStatment = SqlUtil.getCreateSqlDeleteStatement(tableName);
		deleteStatment = SqlUtil.addCondition(deleteStatment,
				generateFilterConditions(condition, fieldValueIndexMap, 1));
		try {
			PreparedStatement pstmt = connection.prepareStatement(deleteStatment);

			for (Map.Entry<Integer, FieldValue2> fv : fieldValueIndexMap.entrySet()) {
				Query2.addValue(fv.getValue(), fv.getKey(), pstmt);
			}
			System.out.println(pstmt);
			return pstmt;
		} catch (SQLException | SecurityException | IllegalArgumentException e) {
			e.printStackTrace();

			return null;
		}
	}

	// delete method end

	// helper function
	private static String generateFilterConditions(QueryOperation2 queryOperation,
			HashMap<Integer, FieldValue2> fieldValueIndexMap, int offsetIndex) {
		String expressionResult = SqlTokens.emptyString;

		List<Object> expression = queryOperation.evaluate();
		int index = offsetIndex;
		for (Object item : expression) {
			if (item.getClass().equals(Field2.class)) {
				Field2 f = Field2.class.cast(item);
				expressionResult += QueryUtil.getCreateQualifiedFieldName(f.getReferenceName(), f.getFieldName());
				continue;
			}
			if (item.getClass().equals(QueryOperators.class)) {
				expressionResult += SqlTokens.space + QueryOperators.class.cast(item).value + SqlTokens.space;
				continue;
			}
			if (item.getClass().equals(FieldValue2.class)) {
				FieldValue2 fv = FieldValue2.class.cast(item);
				expressionResult += SqlTokens.space + SqlTokens.questionMark + SqlTokens.space;
				fieldValueIndexMap.put(index, fv);
				index++;
			}
		}

		return expressionResult;
	}

	// helper function end

}
