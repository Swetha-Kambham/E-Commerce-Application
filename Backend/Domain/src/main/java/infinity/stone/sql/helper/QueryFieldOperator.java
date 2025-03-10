package infinity.stone.sql.helper;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum QueryFieldOperator {

	REPLACE("REPLACE");

	private static final Map<String, QueryFieldOperator> lookup = new HashMap<String, QueryFieldOperator>();

	static {
		for (QueryFieldOperator s : EnumSet.allOf(QueryFieldOperator.class))
			lookup.put(s.getValue(), s);
	}

	private String value;

	private QueryFieldOperator(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	public static QueryFieldOperator get(String value) {
		return lookup.get(value);
	}
}
