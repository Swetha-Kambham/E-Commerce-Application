package infinity.stone.sql.helper;

public class SqlUtil {

	protected static String encloseBetweenBackTicks(String value) {
		return value != null && value.length() > 0 ? SqlTokens.backTick + value + SqlTokens.backTick
				: SqlTokens.emptyString;
	}

	private static String removeCommaAndSpaceFromEndIfExists(String str) {
		int index = str.lastIndexOf(SqlTokens.comma + SqlTokens.space);

		return index == -1 ? str : str.substring(0, index);
	}

	public static String getCreatePlaceHolderForValues(int n) {
		String result = SqlTokens.emptyString;

		for (int i = 0; i < n - 1; i++) {
			result += SqlTokens.questionMark + SqlTokens.comma + SqlTokens.space;
		}

		result += SqlTokens.questionMark;

		return result;
	}

	public static String getCreatePlaceHolderForValues(int n, int m) {
		String result = SqlTokens.emptyString;

		for (int i = 0; i < n; i++) {
			result += SqlTokens.openingParen + getCreatePlaceHolderForValues(m) + SqlTokens.closingParen
					+ SqlTokens.comma + SqlTokens.space;
		}

		return removeCommaAndSpaceFromEndIfExists(result);
	}

//	private static String formatColumnsIntoCommaSeperated(Field[] fields) {
//		String result = SqlTokens.emptyString;
//
//		for (Field field : fields) {
//			result += encloseBetweenBackTicks(field.getFieldName()) + SqlTokens.comma + SqlTokens.space;
//		}
//
//		return removeCommaAndSpaceFromEndIfExists(result);
//	}

	private static String formatColumnsIntoCommaSeperated(Field2[] fields) {
		String result = SqlTokens.emptyString;

		for (int i = 0; i < fields.length; i++) {
			Field2 field = fields[i];
			if (i > 0) {
				result += SqlTokens.comma + SqlTokens.space;
			}
			result += encloseBetweenBackTicks(field.getFieldName());
		}

		return result;
	}

//	public static String addCondition(String query, List<String> allTables, QueryOperation qo) {
//		if (qo == null)
//			return query;
//
//		String ex = qo.getExpression();
//
//		for (Field f : qo.getFields()) {
//			int index = allTables.indexOf(f.getReferenceName());
//			ex = ex.replace(String.format("%d", f.getColumnIndex()),
//					String.format("%s%d%s%s", f.getReferenceName(), index, SqlTokens.dot, f.getFieldName()));
//		}
//
//		return query + SqlTokens.space + SqlTokens.where + SqlTokens.space + ex;
//	}

//	public static String getCreateSqlInsertStatement(String table, Field[] fields) {
//		return SqlTokens.insert + SqlTokens.space + SqlTokens.into + SqlTokens.space + encloseBetweenBackTicks(table)
//				+ SqlTokens.space + SqlTokens.openingParen + formatColumnsIntoCommaSeperated(fields)
//				+ SqlTokens.closingParen + SqlTokens.space + SqlTokens.values + SqlTokens.openingParen
//				+ getCreatePlaceHolderForValues(fields.length) + SqlTokens.closingParen;
//	}

	public static String getCreateSqlInsertStatement(String table, Field2[] fields) {
		return SqlTokens.insert + SqlTokens.space + SqlTokens.into + SqlTokens.space + encloseBetweenBackTicks(table)
				+ SqlTokens.space + SqlTokens.openingParen + formatColumnsIntoCommaSeperated(fields)
				+ SqlTokens.closingParen + SqlTokens.space + SqlTokens.values + SqlTokens.space + SqlTokens.openingParen
				+ getCreatePlaceHolderForValues(fields.length) + SqlTokens.closingParen;
	}

//	public static String getCreateBulkSqlInsertStatement(String table, Field[][] fields) {
//		return SqlTokens.insert + SqlTokens.space + SqlTokens.into + SqlTokens.space + encloseBetweenBackTicks(table)
//				+ SqlTokens.space + SqlTokens.openingParen + formatColumnsIntoCommaSeperated(fields[0])
//				+ SqlTokens.closingParen + SqlTokens.space + SqlTokens.values + SqlTokens.space
//				+ getCreatePlaceHolderForValues(fields.length, fields[0].length);
//	}

//	public static String getCreateSqlUpdateStatement(String table, Field[] fields) {
//		String sqlUpdateStatement = SqlTokens.update + SqlTokens.space + encloseBetweenBackTicks(table)
//				+ SqlTokens.space + SqlTokens.set + SqlTokens.space;
//
//		for (Field f : fields) {
//			sqlUpdateStatement = sqlUpdateStatement + encloseBetweenBackTicks(f.getFieldName()) + SqlTokens.space
//					+ SqlTokens.equals + SqlTokens.space + SqlTokens.questionMark + SqlTokens.comma + SqlTokens.space;
//		}
//
//		return removeCommaAndSpaceFromEndIfExists(sqlUpdateStatement);
//	}

	public static String getCreateSqlUpdateStatement(String table, Field2[] fields) {
		String sqlUpdateStatement = SqlTokens.update + SqlTokens.space + encloseBetweenBackTicks(table)
				+ SqlTokens.space + SqlTokens.set + SqlTokens.space;

		for (int i = 0; i < fields.length; i++) {
			Field2 f = fields[i];
			if (i > 0) {
				sqlUpdateStatement += SqlTokens.comma + SqlTokens.space;
			}
			sqlUpdateStatement += encloseBetweenBackTicks(f.getFieldName()) + SqlTokens.space + SqlTokens.equals
					+ SqlTokens.space + SqlTokens.questionMark;
		}

		return sqlUpdateStatement;
	}

//	public static String addCondition(String updateStatement, QueryOperation qo) {
//		if (qo == null)
//			return updateStatement;
//
//		String ex = qo.getExpression();
//
//		for (Field f : qo.getFields()) {
//			ex = ex.replace(String.format("%d", f.getColumnIndex()), encloseBetweenBackTicks(f.getFieldName()));
//		}
//
//		return updateStatement + SqlTokens.space + SqlTokens.where + SqlTokens.space + ex;
//	}

	public static String addCondition(String query, String condition) {
		if (condition == null || condition.length() == 0)
			return query;

		return query + SqlTokens.space + SqlTokens.where + SqlTokens.space + condition;
	}

	public static String getCreateSqlDeleteStatement(String tableName) {
		return SqlTokens.delete + SqlTokens.space + SqlTokens.from + SqlTokens.space
				+ encloseBetweenBackTicks(tableName);
	}
}
