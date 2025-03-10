package infinity.stone.helper.domain;

public class OrderedMultiValueText {

	private String[] values;

	private static final String seperator = "|";
	private static final String regex = "\\|";

	@SuppressWarnings("unused")
	private OrderedMultiValueText() {

	}

	public OrderedMultiValueText(String[] values) {
		this.values = values;
	}

	public OrderedMultiValueText(String value) {
		if (value != null) {
			this.values = value.split(regex);
		}
	}

	private static String join(String[] values, String seperator) {
		String res = "";

		for (int i = 0; i < values.length; i++) {
			if (i > 0) {
				res += seperator;
			}

			res += values[i];
		}

		return res;
	}

	public String getValue() {
		if (this.values != null) {
			return join(this.values, seperator);
		}

		return null;
	}

	public String[] getValues() {
		return values;
	}

	@Override
	public int hashCode() {
		return this.values != null ? this.values.hashCode() : 1;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null || obj.getClass() != this.getClass())
			return false;

		OrderedMultiValueText multiValueText = (OrderedMultiValueText) obj;

		return multiValueText.getValue() != null ? multiValueText.getValue().equals(this.getValue())
				: this.getValue() == null;
	}

}
