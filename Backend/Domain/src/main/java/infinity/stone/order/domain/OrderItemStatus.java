package infinity.stone.order.domain;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum OrderItemStatus {
	DRAFT(1), PENDING(2), CONFIRMED(3), READY_FOR_SHIP(4), SHIPPED(5), IN_TRANSIT(6), DELIVERED(7), CANCELLED(8),
	ARCHIVED(11);

	private static final Map<Integer, OrderItemStatus> lookup = new HashMap<Integer, OrderItemStatus>();

	static {
		for (OrderItemStatus s : EnumSet.allOf(OrderItemStatus.class))
			lookup.put(s.getCode(), s);
	}

	private int code;

	private OrderItemStatus(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static OrderItemStatus get(int code) {
		return lookup.get(code);
	}

}
