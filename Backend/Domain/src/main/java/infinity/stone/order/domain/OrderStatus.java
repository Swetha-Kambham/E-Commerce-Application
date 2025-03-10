package infinity.stone.order.domain;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum OrderStatus {
	DRAFT(1), PENDING(2), CONFIRMED(3), PARTIALLY_CANCELLED(4), CANCELLED(5), COMPLETE(6), ARCHIVED(11);

	private static final Map<Integer, OrderStatus> lookup = new HashMap<Integer, OrderStatus>();

	static {
		for (OrderStatus s : EnumSet.allOf(OrderStatus.class))
			lookup.put(s.getCode(), s);
	}

	private int code;

	private OrderStatus(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static OrderStatus get(int code) {
		return lookup.get(code);
	}

}
