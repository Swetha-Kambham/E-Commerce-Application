package infinity.stone.sql.helper;

public enum QueryOperators {
	IN("IN"), NOT_IN("NOT IN"), GT(">"), LT("<"), GE(">="), LE("<="), EQUAL("="), NOT_EQUAL("<>"), LIKE("LIKE"),
	GREATEST("GREATEST"), AND("AND"), OR("OR"), OPENING_PARENTHESIS("("), CLOSING_PARENTHESIS(")"), COMMA(",");

	public String value;

	QueryOperators(String value) {
		this.value = value;
	}
}
