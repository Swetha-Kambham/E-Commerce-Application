package infinity.stone.product.domain;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum ProductStatus {
	NEW(1), UNDER_REVIEW(2), APPROVED(3), REJECTED(4), EDITED(5), LIVE(6);

	private static final Map<Integer, ProductStatus> lookup = new HashMap<Integer, ProductStatus>();

	static {
		for (ProductStatus s : EnumSet.allOf(ProductStatus.class))
			lookup.put(s.getCode(), s);
	}

	private int code;

	private ProductStatus(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static ProductStatus get(int code) {
		return lookup.get(code);
	}
}
