package infinity.stone.domain.base;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum MappingType {
	ZERO_OR_ONE(1), ZERO_OR_MORE(2), ONE_AND_ONE(3), ONE_OR_MORE(4);

	private static final Map<Integer, MappingType> lookup = new HashMap<Integer, MappingType>();

	static {
		for (MappingType s : EnumSet.allOf(MappingType.class))
			lookup.put(s.getCode(), s);
	}

	private int code;

	private MappingType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static MappingType get(int code) {
		return lookup.get(code);
	}

}
