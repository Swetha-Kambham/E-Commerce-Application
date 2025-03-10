package infinity.stone.helper.domain;

public class PhoneNumber {

	private String countryCode;
	private String phoneNumber;

	private static final String seperator = " ";

	@SuppressWarnings("unused")
	private PhoneNumber() {
	}

	public PhoneNumber(String fullPhoneNumber) {
		if (fullPhoneNumber == null)
			return;

		String[] phoneNumber = fullPhoneNumber.split(seperator);

		if (phoneNumber.length == 2) {
			this.countryCode = phoneNumber[0];
			this.phoneNumber = phoneNumber[1];
		}

	}

	public PhoneNumber(String countryCode, String phoneNumber) {
		this.countryCode = countryCode;
		this.phoneNumber = phoneNumber;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		PhoneNumber phoneNumber = (PhoneNumber) obj;

		return this.getFullPhoneNumber().equals(phoneNumber.getFullPhoneNumber());
	}

	@Override
	public int hashCode() {
		return (countryCode + seperator + phoneNumber).hashCode();
	}

	public String getCountryCode() {
		return countryCode;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public String getFullPhoneNumber() {
		return countryCode + seperator + phoneNumber;
	}

}
