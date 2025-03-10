package infinity.stone.sql.helper;

import java.util.List;

public class QueryUtil {

	protected static String encloseBetweenBackTicks(String value) {
		return value != null && value.length() > 0 ? SqlTokens.backTick + value + SqlTokens.backTick
				: SqlTokens.emptyString;
	}

	private static String removeCommaAndSpaceFromEndIfExists(String str) {
		int index = str.lastIndexOf(SqlTokens.comma + SqlTokens.space);

		return index == -1 ? str : str.substring(0, index);
	}

	public static String formatIntoDotSeperatedValue(String left, String right) {
		if (left != null && left.length() > 0 && right != null && right.length() > 0)
			return String.format("%s%s%s", left, SqlTokens.dot, right);

		return SqlTokens.emptyString;
	}

	public static String getCreatePlaceHolderForValues(int n) {
		String result = SqlTokens.emptyString;

		for (int i = 0; i < n - 1; i++) {
			result += SqlTokens.questionMark + SqlTokens.comma + SqlTokens.space;
		}

		result += SqlTokens.questionMark;

		return result;
	}

	private static String formatColumnsIntoCommaSeperated(List<String> values) {
		String result = SqlTokens.emptyString;

		for (String value : values) {
			result += value + SqlTokens.comma + SqlTokens.space;
		}

		return removeCommaAndSpaceFromEndIfExists(result);
	}

	private static String formatColumnsIntoCommaSeperatedWithCustomString(List<String> values, String customString) {
		String result = SqlTokens.emptyString;

		for (String value : values) {
			result += value + SqlTokens.space + customString + SqlTokens.comma + SqlTokens.space;
		}

		return removeCommaAndSpaceFromEndIfExists(result);
	}

	public static String findFirstNonNegativeIntegerAndReplaceWithGivenNumber(String str, int n) {
		String s = str.trim();
		String num = SqlTokens.emptyString;
		for (int index = 0; index < s.length(); index++) {
			if (s.charAt(index) >= '0' && s.charAt(index) <= '9') {
				num += s.charAt(index);
				continue;
			}
			if (num != SqlTokens.emptyString) {
				break;
			}
			num = SqlTokens.emptyString;
		}

		return str.replace(num, String.format("%d", n));
	}

	public static String setLimit(String query, Integer limit) {
		if (limit == null)
			return query;

		return String.format("%s%s%s%s%d", query, SqlTokens.space, SqlTokens.limit, SqlTokens.space, limit);
	}

	public static String setOffset(String query, Integer offset) {
		if (offset == null)
			return query;

		return String.format("%s%s%s%s%d", query, SqlTokens.space, SqlTokens.offset, SqlTokens.space, offset);
	}

	public static String addGrouping(String query, List<String> groupByColumns) {
		if (groupByColumns == null || groupByColumns.size() == 0)
			return query;

		return String.format("%s%s%s%s%s", query, SqlTokens.space, SqlTokens.groupBy, SqlTokens.space,
				formatColumnsIntoCommaSeperated(groupByColumns));
	}

	public static String getCreateAlias(String name, int index) {
		return String.format("%s%d", name, index);
	}

	public static String formatIntoSpaceSeperated(String left, String right) {
		return String.format("%s%s%s", left, SqlTokens.space, right);
	}

	public static String addOrder(String query, List<String> ascendingOrderByColumns,
			List<String> desendingOrderByColumns) {
		if ((ascendingOrderByColumns == null || ascendingOrderByColumns.size() == 0)
				&& (desendingOrderByColumns == null || desendingOrderByColumns.size() == 0))
			return query;

		String ascColumns = formatColumnsIntoCommaSeperatedWithCustomString(ascendingOrderByColumns, SqlTokens.asc);
		String descColumns = formatColumnsIntoCommaSeperatedWithCustomString(desendingOrderByColumns, SqlTokens.desc);
		String res = ascColumns != SqlTokens.emptyString
				? (descColumns != SqlTokens.emptyString ? ascColumns + SqlTokens.comma + SqlTokens.space + descColumns
						: ascColumns)
				: descColumns;

		return String.format("%s%s%s%s%s", query, SqlTokens.space, SqlTokens.orderBy, SqlTokens.space, res);
	}

	public static String getCreateSqlSelectAllStatement(String table, String alias) {
		return SqlTokens.select + SqlTokens.space + SqlTokens.asterisk + SqlTokens.space + SqlTokens.from
				+ SqlTokens.space + encloseBetweenBackTicks(table) + SqlTokens.space + SqlTokens.as + SqlTokens.space
				+ encloseBetweenBackTicks(alias);
	}

	public static String getCreateSqlJoin(String join, String leftTableAlias, String rightTable, String rightTableAlias,
			String leftField, String rightField) {
		return join + SqlTokens.space + encloseBetweenBackTicks(rightTable) + SqlTokens.space + SqlTokens.as
				+ SqlTokens.space + encloseBetweenBackTicks(rightTableAlias) + SqlTokens.space + SqlTokens.on
				+ SqlTokens.space
				+ formatIntoDotSeperatedValue(encloseBetweenBackTicks(leftTableAlias),
						encloseBetweenBackTicks(leftField))
				+ SqlTokens.space + SqlTokens.equals + SqlTokens.space + formatIntoDotSeperatedValue(
						encloseBetweenBackTicks(rightTableAlias), encloseBetweenBackTicks(rightField));
	}

	public static String getCreateQualifiedFieldName(String tableAlias, String fieldName) {
		return formatIntoDotSeperatedValue(encloseBetweenBackTicks(tableAlias), encloseBetweenBackTicks(fieldName));
	}

	public static String replaceAsteriskWithQueryFields(String query, List<Field2> fields) {
		if (fields.size() == 0)
			return query;

		String queryFields = SqlTokens.emptyString;

		for (int i = 0; i < fields.size(); i++) {
			Field2 f = fields.get(i);

			if (i > 0) {
				queryFields += SqlTokens.comma + SqlTokens.space;
			}

			queryFields += formatIntoDotSeperatedValue(encloseBetweenBackTicks(f.getTableNameAlias()),
					encloseBetweenBackTicks(f.getFieldName())) + SqlTokens.space + SqlTokens.as + SqlTokens.space
					+ encloseBetweenBackTicks(f.getFieldNameAlias());
		}

		return query.replace(SqlTokens.asterisk, queryFields);
	}

	public static String addGroupByDefinition(String query, List<Field2> fields) {
		String groupByFields = SqlTokens.emptyString;

		int i = 0;
		for (Field2 f : fields) {

			if (!f.getIsGroupingField()) {
				continue;
			}

			if (i > 0 && f.getIsGroupingField()) {
				groupByFields += SqlTokens.comma + SqlTokens.space;
			}

			groupByFields += SqlTokens.groupBy + SqlTokens.space + formatIntoDotSeperatedValue(
					encloseBetweenBackTicks(f.getTableNameAlias()), encloseBetweenBackTicks(f.getFieldName()));

			i++;
		}

		return query + SqlTokens.space + groupByFields;
	}

	public static String addOrderByDefinition(String query, List<Field2> fields) {
		String orderByFields = SqlTokens.emptyString;

		int i = 0;
		for (Field2 f : fields) {

			if (f.getOrderBy() == OrderBy.NONE) {
				continue;
			}

			if (i > 0 && f.getOrderBy() != OrderBy.NONE) {
				orderByFields += SqlTokens.comma + SqlTokens.space;
			}

			orderByFields += SqlTokens.orderBy + SqlTokens.space
					+ formatIntoDotSeperatedValue(encloseBetweenBackTicks(f.getTableNameAlias()),
							encloseBetweenBackTicks(f.getFieldName()))
					+ SqlTokens.space;

			orderByFields += f.getOrderBy() == OrderBy.ASCENDING ? SqlTokens.asc : SqlTokens.desc;

			i++;
		}

		return query + SqlTokens.space + orderByFields;
	}

	public static String addCondition(String query, String condition) {
		if (condition == null || condition.length() == 0)
			return query;

		return query + SqlTokens.space + SqlTokens.where + SqlTokens.space + condition;
	}

	public static String addJoins(String query, String joinString) {
		if (joinString == null || joinString.length() == 0)
			return query;

		return query + SqlTokens.space + joinString;
	}

}
