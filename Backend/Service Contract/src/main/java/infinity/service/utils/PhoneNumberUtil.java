package infinity.service.utils;

import infinity.service.contracts.common.PhoneNumberParameter1;
import infinity.service.contracts.common.PhoneNumberReference1;
import infinity.service.keys.CountryCodes;
import infinity.stone.helper.domain.PhoneNumber;

public class PhoneNumberUtil {

	@Deprecated
	public static String formatPhoneNumber(String countryCode, String phoneNumber) {
		if (phoneNumber == null)
			return null;

		if (countryCode == null)
			return String.format("%s %s", CountryCodes.INDIA, phoneNumber);

		return String.format("%s %s", countryCode, phoneNumber);
	}

	@Deprecated
	public static String formatPhoneNumber(PhoneNumberParameter1 phoneNumber) {
		return formatPhoneNumber(phoneNumber.countryCode, phoneNumber.phoneNumber);
	}

	@Deprecated
	public static PhoneNumberReference1 mapToPhoneNumberReference1(String phoneNumber) {
		if (phoneNumber == null)
			return null;

		PhoneNumberReference1 reference = new PhoneNumberReference1();

		String[] p = phoneNumber.split(" ");

		if (p.length == 2) {
			reference.countryCode = p[0];
			reference.phoneNumber = p[1];
		}

		return reference;
	}

	public static PhoneNumberReference1 mapToPhoneNumberReference1(PhoneNumber phoneNumber) {
		if (phoneNumber == null)
			return null;

		PhoneNumberReference1 reference = new PhoneNumberReference1();

		reference.countryCode = phoneNumber.getCountryCode();
		reference.phoneNumber = phoneNumber.getPhoneNumber();

		return reference;
	}

	public static PhoneNumberParameter1 mapToPhoneNumberParameter1(PhoneNumber phoneNumber) {
		if (phoneNumber == null)
			return null;

		PhoneNumberParameter1 parameter = new PhoneNumberParameter1();

		parameter.countryCode = phoneNumber.getCountryCode();
		parameter.phoneNumber = phoneNumber.getPhoneNumber();

		return parameter;
	}

	@Deprecated
	public static String getCountryCode(String phoneNumber) {
		if (phoneNumber == null)
			return null;

		return phoneNumber.split(" ")[0];
	}

	@Deprecated
	public static String getPhoneNumber(String phoneNumber) {
		if (phoneNumber == null)
			return null;

		return phoneNumber.split(" ")[1];
	}

	@Deprecated
	public static String getFullPhoneNumber(String phoneNumber) {
		if (phoneNumber == null)
			return null;

		return phoneNumber.replace(" ", "");
	}

	public static String getFullNumber(String countryCode, String phoneNumber) {
		if (phoneNumber == null)
			return null;

		if (countryCode == null)
			return String.format("%s%s", CountryCodes.INDIA, phoneNumber);

		return String.format("%s%s", countryCode, phoneNumber);
	}

}
