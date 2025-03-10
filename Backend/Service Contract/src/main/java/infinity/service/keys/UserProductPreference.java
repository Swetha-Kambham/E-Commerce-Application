package infinity.service.keys;

import infinity.stone.user.domain.UserProductPreferenceTypes;

public class UserProductPreference {
	public static final String cart = "cart";
	public static final String wishList = "wish-list";

	public static UserProductPreferenceTypes getPreferenceType(String value) {

		if (value.equals(cart))
			return UserProductPreferenceTypes.CART;

		if (value.equals(wishList))
			return UserProductPreferenceTypes.WISHLIST;

		return null;
	}

	public static String getPreferenceType(Integer value) {

		if (value == UserProductPreferenceTypes.CART.getCode())
			return cart;

		if (value == UserProductPreferenceTypes.WISHLIST.getCode())
			return wishList;

		return null;
	}
}
