package infinity.stone.sql.helper;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum OrderBy {

	NONE(0), ASCENDING(1), DESCENDING(2);

	private static final Map<Integer, OrderBy> lookup = new HashMap<Integer, OrderBy>();

	static {
		for (OrderBy s : EnumSet.allOf(OrderBy.class))
			lookup.put(s.getCode(), s);
	}

	private int code;

	private OrderBy(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static OrderBy get(int code) {
		return lookup.get(code);
	}
}
