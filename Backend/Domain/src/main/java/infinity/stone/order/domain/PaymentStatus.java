package infinity.stone.order.domain;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum PaymentStatus {
	UNPAID(1), PARTIALLY_PAID(2), PAID(3);

	private static final Map<Integer, PaymentStatus> lookup = new HashMap<Integer, PaymentStatus>();

	static {
		for (PaymentStatus s : EnumSet.allOf(PaymentStatus.class))
			lookup.put(s.getCode(), s);
	}

	private int code;

	private PaymentStatus(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static PaymentStatus get(int code) {
		return lookup.get(code);
	}

}
