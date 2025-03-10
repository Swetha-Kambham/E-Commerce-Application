package infinity.stone.user.domain;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum Role {
	ADMIN(1, "ADMIN", "Admin", "Admin User"), SELLER(2, "SELLER", "Seller", "Seller"),
	USER(3, "USER", "User", "Normal User");

	private static final Map<Integer, Role> lookup = new HashMap<Integer, Role>();

	static {
		for (Role r : EnumSet.allOf(Role.class))
			lookup.put(r.getId(), r);
	}

	private int id;
	private String code;
	private String name;
	private String description;

	private Role(int id, String code, String name, String description) {
		this.id = id;
		this.code = code;
		this.name = name;
		this.description = description;
	}

	private Role(int id) {
		this.id = id;
	}

	public int getId() {
		return this.id;
	}

	public String getCode() {
		return this.code;
	}

	public String getName() {
		return this.name;
	}

	public String getDescription() {
		return this.description;
	}

	public static Role get(int code) {
		return lookup.get(code);
	}

}
