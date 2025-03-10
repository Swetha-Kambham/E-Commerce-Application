package infinity.stone.user.domain;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum UserProductPreferenceTypes {
	CART(1), WISHLIST(2);

	private static final Map<Integer, UserProductPreferenceTypes> lookup = new HashMap<Integer, UserProductPreferenceTypes>();

	static {
		for (UserProductPreferenceTypes s : EnumSet.allOf(UserProductPreferenceTypes.class))
			lookup.put(s.getCode(), s);
	}

	private int code;

	private UserProductPreferenceTypes(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static UserProductPreferenceTypes get(int code) {
		return lookup.get(code);
	}
}
