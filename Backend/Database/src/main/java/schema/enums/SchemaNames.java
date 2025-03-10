package schema.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum SchemaNames {
	INFINITY_STONE("infinity_stone"), INFORMATION_SCHEMA("information_schema");

	private static final Map<String, SchemaNames> lookup = new HashMap<String, SchemaNames>();

	static {
		for (SchemaNames s : EnumSet.allOf(SchemaNames.class))
			lookup.put(s.getValue(), s);
	}

	private String value;

	private SchemaNames(String code) {
		this.value = code;
	}

	public String getValue() {
		return value;
	}

	public static SchemaNames get(String code) {
		return lookup.get(code);
	}
}
