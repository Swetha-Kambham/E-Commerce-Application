package infinity.stone.sql.helper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

public class QueryOperation2 {

	private List<Object> expression;

	public QueryOperation2() {
		expression = new ArrayList<Object>();
	}

	private static QueryOperation2 createSimpleExpression(Field2 field, FieldValue2 value, QueryOperators operator) {
		QueryOperation2 queryOperation = new QueryOperation2();

		queryOperation.expression.add(field);
		queryOperation.expression.add(operator);
		queryOperation.expression.add(value);

		return queryOperation;
	}

	private static QueryOperation2 createSimpleExpression(FieldValue2 value1, FieldValue2 value2,
			QueryOperators operator) {
		QueryOperation2 queryOperation = new QueryOperation2();

		queryOperation.expression.add(value1);
		queryOperation.expression.add(operator);
		queryOperation.expression.add(value2);

		return queryOperation;
	}

	private static QueryOperation2 createSimpleExpression(Field2 field, HashSet<FieldValue2> values,
			QueryOperators operator) {
		QueryOperation2 queryOperation = new QueryOperation2();

		queryOperation.expression.add(field);
		queryOperation.expression.add(operator);
		queryOperation.expression.add(QueryOperators.OPENING_PARENTHESIS);

		int index = 0;
		for (FieldValue2 fv : values) {
			if (index > 0) {
				queryOperation.expression.add(QueryOperators.COMMA);
			}
			queryOperation.expression.add(fv);
			index++;
		}

		queryOperation.expression.add(QueryOperators.CLOSING_PARENTHESIS);

		return queryOperation;
	}

	public static QueryOperation2 combineQueryOperations(QueryOperators operator, QueryOperation2... qos) {
		if (qos.length == 1)
			return qos[0];

		QueryOperation2 queryOperation = new QueryOperation2();

		queryOperation.expression.add(QueryOperators.OPENING_PARENTHESIS);
		queryOperation.expression.add(qos[0]);

		for (int i = 1; i < qos.length; i++) {
			queryOperation.expression.add(operator);
			queryOperation.expression.add(qos[i]);
		}
		queryOperation.expression.add(QueryOperators.CLOSING_PARENTHESIS);

		return queryOperation;
	}

	public static QueryOperation2 equal(Field2 field, FieldValue2 value) {
		return createSimpleExpression(field, value, QueryOperators.EQUAL);
	}

	public static QueryOperation2 equal(FieldValue2 value1, FieldValue2 value2) {
		return createSimpleExpression(value1, value2, QueryOperators.EQUAL);
	}

	public static QueryOperation2 notEqual(Field2 field, FieldValue2 value) {
		return createSimpleExpression(field, value, QueryOperators.NOT_EQUAL);
	}

	public static QueryOperation2 notEqual(FieldValue2 value1, FieldValue2 value2) {
		return createSimpleExpression(value1, value2, QueryOperators.NOT_EQUAL);
	}

	public static QueryOperation2 gt(Field2 field, FieldValue2 value) {
		return createSimpleExpression(field, value, QueryOperators.GT);
	}

	public static QueryOperation2 gt(FieldValue2 value1, FieldValue2 value2) {
		return createSimpleExpression(value1, value2, QueryOperators.GT);
	}

	public static QueryOperation2 lt(Field2 field, FieldValue2 value) {
		return createSimpleExpression(field, value, QueryOperators.LT);
	}

	public static QueryOperation2 lt(FieldValue2 value1, FieldValue2 value2) {
		return createSimpleExpression(value1, value2, QueryOperators.LT);
	}

	public static QueryOperation2 le(Field2 field, FieldValue2 value) {
		return createSimpleExpression(field, value, QueryOperators.LE);
	}

	public static QueryOperation2 le(FieldValue2 value1, FieldValue2 value2) {
		return createSimpleExpression(value1, value2, QueryOperators.LE);
	}

	public static QueryOperation2 ge(Field2 field, FieldValue2 value) {
		return createSimpleExpression(field, value, QueryOperators.GE);
	}

	public static QueryOperation2 ge(FieldValue2 value1, FieldValue2 value2) {
		return createSimpleExpression(value1, value2, QueryOperators.GE);
	}

	public static QueryOperation2 in(Field2 field, FieldValue2... values) {
		return createSimpleExpression(field, new HashSet<FieldValue2>(Arrays.asList(values)), QueryOperators.IN);
	}

	public static QueryOperation2 in(Field2 field, Query2 q) {
		QueryOperation2 queryOperation = new QueryOperation2();

		queryOperation.expression.add(field);
		queryOperation.expression.add(QueryOperators.IN);
		queryOperation.expression.add(QueryOperators.OPENING_PARENTHESIS);
		queryOperation.expression.add(q);
		queryOperation.expression.add(QueryOperators.CLOSING_PARENTHESIS);

		return queryOperation;
	}

	public static QueryOperation2 notIn(Field2 field, FieldValue2... values) {
		return createSimpleExpression(field, new HashSet<FieldValue2>(Arrays.asList(values)), QueryOperators.NOT_IN);
	}

	public static QueryOperation2 and(QueryOperation2... qos) {
		return combineQueryOperations(QueryOperators.AND, qos);
	}

	public static QueryOperation2 or(QueryOperation2... qos) {
		return combineQueryOperations(QueryOperators.OR, qos);
	}

	public static QueryOperation2 contains(Field2 field, String value) {
		if (!field.getType().equals(FieldTypes.String)) {
			return null;
		}
		return createSimpleExpression(field,
				new FieldValue2(FieldTypes.String,
						String.format("%s%s%s", SqlTokens.percentSign, value, SqlTokens.percentSign)),
				QueryOperators.LIKE);
	}

	public List<Object> evaluate() {
		List<Object> result = new ArrayList<Object>();

		for (Object item : this.expression) {
			if (item.getClass().equals(QueryOperation2.class)) {
				result.addAll(QueryOperation2.class.cast(item).evaluate());
				continue;
			}
			result.add(item);
		}
		return result;
	}

}
