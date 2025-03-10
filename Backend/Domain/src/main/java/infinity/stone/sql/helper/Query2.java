package infinity.stone.sql.helper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import schema.connection.SqlConnection;

public class Query2 {

	private String queryString;

	private static int allFieldCount = 0;

	private static int allTableCount = 0;

	private TableReference factTable;

	private Set<TableReference> allTables;

	private QueryOperation2 queryOperation;

	private HashMap<TableReference, LinkedHashSet<TableReference>> joins;

	private List<FieldValue2> values;

	private Integer limit;
	private Integer offset;

	public Query2() {
		this.allTables = new LinkedHashSet<TableReference>();
		this.joins = new HashMap<TableReference, LinkedHashSet<TableReference>>();
		this.queryOperation = new QueryOperation2();
		this.values = new ArrayList<FieldValue2>();
	}

	public TableReference getFactTable() {
		return factTable;
	}

	public Set<TableReference> getAllTables() {
		return allTables;
	}

	public static Query2 select(String tableName) {
		if (tableName == null || tableName.length() == 0)
			return null;

		Query2 q = new Query2();

		TableReference tableRef = q.addTable(tableName);
		q.factTable = tableRef;

		return q;
	}

	public QueryFieldReference addField(Field2 field) {
		TableReference tableRef = findTableReference(field);

		if (tableRef == null)
			return null;

		return addFieldInternal(findTableReference(tableRef), field, false, OrderBy.NONE);
	}

	public QueryFieldReference[] addFields(Field2... fields) {
		QueryFieldReference[] references = new QueryFieldReference[fields.length];

		for (int i = 0; i < references.length; i++) {
			references[i] = addField(fields[i]);
		}

		return references;
	}

	public QueryFieldReference addField(Field2 field, Boolean isGroupBy) {
		TableReference tableRef = findTableReference(field);

		if (tableRef == null)
			return null;

		return addFieldInternal(findTableReference(tableRef), field, isGroupBy, OrderBy.NONE);
	}

	public QueryFieldReference addField(Field2 field, OrderBy orderBy) {
		TableReference tableRef = findTableReference(field);

		if (tableRef == null)
			return null;

		return addFieldInternal(findTableReference(tableRef), field, false, orderBy);
	}

	public QueryFieldReference addField(Field2 field, Boolean isGroupBy, OrderBy orderBy) {
		TableReference tableRef = findTableReference(field);

		if (tableRef == null)
			return null;

		return addFieldInternal(findTableReference(tableRef), field, isGroupBy, orderBy);
	}

	public QueryFieldReference addField(TableReference tableRef, Field2 field) {
		if (tableRef == null || !this.allTables.contains(tableRef))
			return null;

		return addFieldInternal(findTableReference(tableRef), field, false, OrderBy.NONE);
	}

	public QueryFieldReference addField(TableReference tableRef, Field2 field, Boolean isGroupBy) {
		if (tableRef == null || !this.allTables.contains(tableRef))
			return null;

		return addFieldInternal(findTableReference(tableRef), field, isGroupBy, OrderBy.NONE);
	}

	public QueryFieldReference addField(TableReference tableRef, Field2 field, OrderBy orderBy) {
		if (tableRef == null || !this.allTables.contains(tableRef))
			return null;

		return addFieldInternal(findTableReference(tableRef), field, false, orderBy);
	}

	public QueryFieldReference addField(TableReference tableRef, Field2 field, Boolean isGroupBy, OrderBy orderBy) {
		if (tableRef == null || !this.allTables.contains(tableRef))
			return null;

		return addFieldInternal(findTableReference(tableRef), field, isGroupBy, orderBy);
	}

	private QueryFieldReference addFieldInternal(TableReference tableRef, Field2 field, Boolean isGroupBy,
			OrderBy orderBy) {

		Field2 queryField = (Field2) field.clone();
		queryField.setTableNameAlias(tableRef.getAlias());
		queryField.setFieldNameAlias(QueryUtil.getCreateAlias(queryField.getFieldName(), allFieldCount));
		queryField.setIsGroupingField(isGroupBy);
		queryField.setOrderBy(orderBy);
		tableRef.addField(queryField);
		allFieldCount++;

		return new QueryFieldReference(queryField.getFieldNameAlias());
	}

	public TableReference leftJoin(String rightTableName, Field2 leftField, Field2 rightField) {
		return join(rightTableName, leftField, rightField, JoinType.LEFT_JOIN);
	}

	public TableReference leftJoin(TableReference leftTable, String rightTableName, Field2 leftField,
			Field2 rightField) {
		return join(leftTable, rightTableName, leftField, rightField, JoinType.LEFT_JOIN);
	}

	public TableReference innerJoin(String rightTableName, Field2 leftField, Field2 rightField) {
		return join(rightTableName, leftField, rightField, JoinType.INNER_JOIN);
	}

	public TableReference innerJoin(TableReference leftTable, String rightTableName, Field2 leftField,
			Field2 rightField) {
		return join(leftTable, rightTableName, leftField, rightField, JoinType.INNER_JOIN);
	}

	public TableReference rightJoin(String rightTableName, Field2 leftField, Field2 rightField) {
		return join(rightTableName, leftField, rightField, JoinType.RIGHT_JOIN);
	}

	public TableReference rightJoin(TableReference leftTable, String rightTableName, Field2 leftField,
			Field2 rightField) {
		return join(leftTable, rightTableName, leftField, rightField, JoinType.RIGHT_JOIN);
	}

	public TableReference fullJoin(String rightTableName, Field2 leftField, Field2 rightField) {
		return join(rightTableName, leftField, rightField, JoinType.FULL_JOIN);
	}

	public TableReference fullJoin(TableReference leftTable, String rightTableName, Field2 leftField,
			Field2 rightField) {
		return join(leftTable, rightTableName, leftField, rightField, JoinType.FULL_JOIN);
	}

	public Query2 whereClause(QueryOperation2 qo) {
		this.queryOperation = qo;
		return this;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public void setOffset(Integer offset) {
		this.offset = offset;
	}

	public Query2 whereAndClause(QueryOperation2 qo) {
		this.queryOperation = QueryOperation2.and(this.queryOperation, qo);
		return this;
	}

	public String getQueryString() {
		return queryString;
	}

	private TableReference join(TableReference leftTable, String rightTableName, Field2 leftField, Field2 rightField,
			JoinType joinType) {
		if (!this.allTables.contains(leftTable) || !rightField.getReferenceName().equals(rightTableName))
			return null;

		TableReference leftTableRef = findTableReference(leftTable);
		TableReference rightTableRef = addTable(rightTableName);

		join(leftTableRef, rightTableRef, leftField, rightField, joinType);

		return rightTableRef;
	}

	private TableReference join(String rightTableName, Field2 leftField, Field2 rightField, JoinType joinType) {

		if (!rightField.getReferenceName().equals(rightTableName))
			return null;

		TableReference leftTableRef = findTableReference(leftField.getReferenceName());

		if (leftTableRef == null)
			return null;

		TableReference rightTableRef = addTable(rightTableName);

		join(leftTableRef, rightTableRef, leftField, rightField, joinType);

		return rightTableRef;
	}

	private void join(TableReference leftTableRef, TableReference rightTableRef, Field2 leftField, Field2 rightField,
			JoinType joinType) {
		leftField.setTableNameAlias(leftTableRef.getAlias());
		rightField.setTableNameAlias(rightTableRef.getAlias());

		rightTableRef.setJoinType(joinType);
		rightTableRef.setLeftField(leftField);
		rightTableRef.setRightField(rightField);

		addToTableJoins(leftTableRef, rightTableRef);
	}

	private TableReference addTable(String tableName) {
		TableReference tableRef = new TableReference(tableName, QueryUtil.getCreateAlias(tableName, allTableCount));
		this.allTables.add(tableRef);
		allTableCount++;

		return tableRef;
	}

	private void addToTableJoins(TableReference key, TableReference value) {
		if (this.joins.containsKey(key)) {
			this.joins.get(key).add(value);
		} else {
			LinkedHashSet<TableReference> values = new LinkedHashSet<TableReference>();
			values.add(value);
			this.joins.put(key, values);
		}
	}

	private String generateJoins(TableReference node) {
		// uses BFS algorithm
		String joinResult = SqlTokens.emptyString;

		Set<TableReference> visited = new HashSet<TableReference>();

		LinkedList<TableReference> queue = new LinkedList<TableReference>();

		visited.add(node);
		queue.add(node);

		while (queue.size() != 0) {
			TableReference current = queue.poll();

			if (current == null || !this.joins.containsKey(current)) {
				continue;
			}

			for (TableReference neighbour : this.joins.get(current)) {
				if (!visited.contains(neighbour)) {
					joinResult += SqlTokens.space + QueryUtil.getCreateSqlJoin(neighbour.getJoinType().value,
							current.getAlias(), neighbour.getTable(), neighbour.getAlias(),
							neighbour.getLeftField().getFieldName(), neighbour.getRightField().getFieldName());

					visited.add(neighbour);
					queue.add(neighbour);
				}
			}
		}

		return joinResult;
	}

	private TableReference findTableReference(String tableName) {
		for (TableReference tr : this.allTables) {
			if (tr.getTable().equals(tableName))
				return tr;
		}
		return null;
	}

	private TableReference findTableReference(TableReference tableReference) {
		for (TableReference tr : this.allTables) {
			if (tr.equals(tableReference))
				return tr;
		}
		return null;
	}

	private TableReference findTableReference(Field2 field) {
		for (TableReference tr : this.allTables) {
			if (tr.getTable().equals(field.getReferenceName()))
				return tr;
		}
		return null;
	}

	private String generateFilterConditions() {
		String expressionResult = SqlTokens.emptyString;

		List<Object> expression = this.queryOperation.evaluate();
		for (Object item : expression) {
			if (item.getClass().equals(Field2.class)) {
				Field2 f = Field2.class.cast(item);
				TableReference tr = findTableReference(f.getReferenceName());
				expressionResult += QueryUtil.getCreateQualifiedFieldName(tr.getAlias(), f.getFieldName());
				continue;
			}
			if (item.getClass().equals(QueryOperators.class)) {
				expressionResult += SqlTokens.space + QueryOperators.class.cast(item).value + SqlTokens.space;
				continue;
			}
			if (item.getClass().equals(FieldValue2.class)) {
				FieldValue2 fv = FieldValue2.class.cast(item);
				expressionResult += SqlTokens.space + SqlTokens.questionMark + SqlTokens.space;
				this.values.add(fv);
			}
			if (item.getClass().equals(Query2.class)) {
				Query2 subQuery = Query2.class.cast(item);
				expressionResult += subQuery.generateQuery();
				this.values.addAll(subQuery.values);
			}
		}

		return expressionResult;
	}

	public List<Field2> getQueryFields() {
		List<Field2> queryFields = new ArrayList<Field2>();

		for (TableReference tc : this.allTables) {
			queryFields.addAll(tc.getQueryFields());
		}

		return queryFields;
	}

	private String generateQuery() {
		List<Field2> queryFields = getQueryFields();

		String queryString = QueryUtil.getCreateSqlSelectAllStatement(factTable.getTable(), factTable.getAlias());
		queryString = QueryUtil.addJoins(queryString, this.generateJoins(factTable));
		queryString = QueryUtil.addCondition(queryString, this.generateFilterConditions());
		queryString = QueryUtil.addGroupByDefinition(queryString, queryFields);
		queryString = QueryUtil.addOrderByDefinition(queryString, queryFields);
		queryString = QueryUtil.setLimit(queryString, this.limit);
		queryString = QueryUtil.setOffset(queryString, this.offset);
		queryString = QueryUtil.replaceAsteriskWithQueryFields(queryString, queryFields);

		this.queryString = queryString;

		return queryString;
	}

	private static void setBinary(FieldValue2 value, Integer position, PreparedStatement ps) throws SQLException {
		if (value == null) {
			ps.setNull(position, java.sql.Types.BINARY);
			return;
		}
		ps.setBytes(position, value.getBytes());
	}

	private static void setBoolean(FieldValue2 value, Integer position, PreparedStatement ps) throws SQLException {
		if (value == null) {
			ps.setNull(position, java.sql.Types.BOOLEAN);
			return;
		}
		ps.setBoolean(position, value.getBool());
	}

	private static void setDate(FieldValue2 value, Integer position, PreparedStatement ps) throws SQLException {
		if (value == null) {
			ps.setNull(position, java.sql.Types.DATE);
			return;
		}
		ps.setDate(position, value.getDate());
	}

	private static void setDouble(FieldValue2 value, Integer position, PreparedStatement ps) throws SQLException {
		if (value == null) {
			ps.setNull(position, java.sql.Types.DOUBLE);
			return;
		}
		ps.setDouble(position, value.getNumeric());
	}

	private static void setInteger(FieldValue2 value, Integer position, PreparedStatement ps) throws SQLException {
		if (value == null) {
			ps.setNull(position, java.sql.Types.INTEGER);
			return;
		}
		ps.setInt(position, value.getInteger());
	}

	private static void setJson(FieldValue2 value, Integer position, PreparedStatement ps) throws SQLException {
		if (value == null) {
			ps.setNull(position, java.sql.Types.VARCHAR);
			return;
		}
		ps.setString(position, value.getJson());
	}

	private static void setString(FieldValue2 value, Integer position, PreparedStatement ps) throws SQLException {
		if (value == null) {
			ps.setNull(position, java.sql.Types.VARCHAR);
			return;
		}
		ps.setString(position, value.getString());
	}

	private static void setTime(FieldValue2 value, Integer position, PreparedStatement ps) throws SQLException {
		if (value == null) {
			ps.setNull(position, java.sql.Types.TIME);
			return;
		}
		ps.setTime(position, value.getTime());
	}

	private static void setTimestamp(FieldValue2 value, Integer position, PreparedStatement ps) throws SQLException {
		if (value == null) {
			ps.setNull(position, java.sql.Types.TIMESTAMP);
			return;
		}
		ps.setTimestamp(position, value.getDateTime());
	}

	// for Field2

	private static void setBinary(Field2 field, Integer position, PreparedStatement ps) throws SQLException {
		if (field.getBytes() == null) {
			ps.setNull(position, java.sql.Types.BINARY);
			return;
		}
		ps.setBytes(position, field.getBytes());
	}

	private static void setBoolean(Field2 field, Integer position, PreparedStatement ps) throws SQLException {
		if (field.getBool() == null) {
			ps.setNull(position, java.sql.Types.BOOLEAN);
			return;
		}
		ps.setBoolean(position, field.getBool());
	}

	private static void setDate(Field2 field, Integer position, PreparedStatement ps) throws SQLException {
		if (field.getDate() == null) {
			ps.setNull(position, java.sql.Types.DATE);
			return;
		}
		ps.setDate(position, field.getDate());
	}

	private static void setDouble(Field2 field, Integer position, PreparedStatement ps) throws SQLException {
		if (field.getNumeric() == null) {
			ps.setNull(position, java.sql.Types.DOUBLE);
			return;
		}
		ps.setDouble(position, field.getNumeric());
	}

	private static void setInteger(Field2 field, Integer position, PreparedStatement ps) throws SQLException {
		if (field.getInteger() == null) {
			ps.setNull(position, java.sql.Types.INTEGER);
			return;
		}
		ps.setInt(position, field.getInteger());
	}

	private static void setJson(Field2 field, Integer position, PreparedStatement ps) throws SQLException {
		if (field.getJson() == null) {
			ps.setNull(position, java.sql.Types.VARCHAR);
			return;
		}
		ps.setString(position, field.getJson());
	}

	private static void setString(Field2 field, Integer position, PreparedStatement ps) throws SQLException {
		if (field.getString() == null) {
			ps.setNull(position, java.sql.Types.VARCHAR);
			return;
		}
		ps.setString(position, field.getString());
	}

	private static void setTime(Field2 field, Integer position, PreparedStatement ps) throws SQLException {
		if (field.getTime() == null) {
			ps.setNull(position, java.sql.Types.TIME);
			return;
		}
		ps.setTime(position, field.getTime());
	}

	private static void setTimestamp(Field2 field, Integer position, PreparedStatement ps) throws SQLException {
		if (field.getDateTime() == null) {
			ps.setNull(position, java.sql.Types.TIMESTAMP);
			return;
		}
		ps.setTimestamp(position, field.getDateTime());
	}
	//

	private static void setBinary(Field2 field, ResultSet rs, String key) throws SQLException {
		field.setValue(rs.getBytes(key));

		if (rs.wasNull()) {
			field.setValue(null);
		}
	}

	private static void setBoolean(Field2 field, ResultSet rs, String key) throws SQLException {
		field.setValue(rs.getBoolean(key));

		if (rs.wasNull()) {
			field.setValue(null);
		}
	}

	private static void setDate(Field2 field, ResultSet rs, String key) throws SQLException {
		field.setValue(rs.getDate(key));

		if (rs.wasNull()) {
			field.setValue(null);
		}
	}

	private static void setDouble(Field2 field, ResultSet rs, String key) throws SQLException {
		field.setValue(rs.getDouble(key));

		if (rs.wasNull()) {
			field.setValue(null);
		}
	}

	private static void setInteger(Field2 field, ResultSet rs, String key) throws SQLException {
		field.setValue(rs.getInt(key));

		if (rs.wasNull()) {
			field.setValue(null);
		}
	}

	private static void setJson(Field2 field, ResultSet rs, String key) throws SQLException {
		field.setValue(rs.getString(key));

		if (rs.wasNull()) {
			field.setValue(null);
		}
	}

	private static void setString(Field2 field, ResultSet rs, String key) throws SQLException {
		field.setValue(rs.getString(key));

		if (rs.wasNull()) {
			field.setValue(null);
		}
	}

	private static void setTime(Field2 field, ResultSet rs, String key) throws SQLException {
		field.setValue(rs.getTime(key));

		if (rs.wasNull()) {
			field.setValue(null);
		}
	}

	private static void setTimestamp(Field2 field, ResultSet rs, String key) throws SQLException {
		field.setValue(rs.getTimestamp(key));

		if (rs.wasNull()) {
			field.setValue(null);
		}
	}

	public static void addValue(FieldValue2 value, Integer position, PreparedStatement ps) throws SQLException {

		switch (value.getType()) {
		case Binary:
			setBinary(value, position, ps);
			break;
		case Boolean:
			setBoolean(value, position, ps);
			break;
		case Date:
			setDate(value, position, ps);
			break;
		case Double:
			setDouble(value, position, ps);
			break;
		case Integer:
			setInteger(value, position, ps);
			break;
		case Json:
			setJson(value, position, ps);
			break;
		case String:
			setString(value, position, ps);
			break;
		case Time:
			setTime(value, position, ps);
			break;
		case Timestamp:
			setTimestamp(value, position, ps);
			break;
		default:
			break;
		}
	}

	public static void addFieldValue(Field2 field, Integer position, PreparedStatement ps) throws SQLException {

		switch (field.getType()) {
		case Binary:
			setBinary(field, position, ps);
			break;
		case Boolean:
			setBoolean(field, position, ps);
			break;
		case Date:
			setDate(field, position, ps);
			break;
		case Double:
			setDouble(field, position, ps);
			break;
		case Integer:
			setInteger(field, position, ps);
			break;
		case Json:
			setJson(field, position, ps);
			break;
		case String:
			setString(field, position, ps);
			break;
		case Time:
			setTime(field, position, ps);
			break;
		case Timestamp:
			setTimestamp(field, position, ps);
			break;
		default:
			break;
		}
	}

	public static void setFieldValue(Field2 field, ResultSet rs, String key) throws SQLException {

		switch (field.getType()) {
		case Binary:
			setBinary(field, rs, key);
			break;
		case Boolean:
			setBoolean(field, rs, key);
			break;
		case Date:
			setDate(field, rs, key);
			break;
		case Double:
			setDouble(field, rs, key);
			break;
		case Integer:
			setInteger(field, rs, key);
			break;
		case Json:
			setJson(field, rs, key);
			break;
		case String:
			setString(field, rs, key);
			break;
		case Time:
			setTime(field, rs, key);
			break;
		case Timestamp:
			setTimestamp(field, rs, key);
			break;
		default:
			break;
		}
	}

	public PreparedStatement getPreparedStatement() {
		String query = generateQuery();
		try {
			Connection connection = SqlConnection.getOrCreateNewConnection();
			PreparedStatement pstmt = connection.prepareStatement(query);
			for (int index = 0; index < this.values.size(); index++) {
				addValue(values.get(index), index + 1, pstmt);
			}
			return pstmt;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<HashMap<String, Field2>> executeQuery() {
		String query = generateQuery();
		try {
			Connection connection = SqlConnection.getOrCreateNewConnection();
			PreparedStatement pstmt = connection.prepareStatement(query);
			for (int index = 0; index < this.values.size(); index++) {
				addValue(values.get(index), index + 1, pstmt);
			}
			System.out.println(pstmt);
			List<HashMap<String, Field2>> finalResult = mapResultSetToFields(pstmt.executeQuery());
			pstmt.close();
			return finalResult;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<HashMap<String, Field2>> mapResultSetToFields(ResultSet resultSet) {
		List<HashMap<String, Field2>> rows = new ArrayList<HashMap<String, Field2>>();
		List<Field2> queryFields = getQueryFields();
		try {
			while (resultSet.next()) {
				HashMap<String, Field2> columns = new HashMap<String, Field2>();
				for (Field2 f : queryFields) {
					String key = f.getFieldNameAlias();
					Field2 result = (Field2) f.clone();
					setFieldValue(result, resultSet, key);
					columns.put(key, result);
				}
				rows.add(columns);
			}
			resultSet.close();

			return rows;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String toString() {
		return generateQuery();
	}

}
