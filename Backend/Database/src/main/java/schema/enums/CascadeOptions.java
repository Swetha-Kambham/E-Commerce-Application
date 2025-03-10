package schema.enums;

public enum CascadeOptions {
	CASCADE("CASCADE"), RESTRICT("RESTRICT"), NO_ACTION("NO ACTION"), SET_NULL("SET NULL"), SET_DEFAULT("SET DEFAULT");

	public String value;

	CascadeOptions(String value) {
		this.value = value;
	}
}