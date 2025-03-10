package infinity.service.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class NumberUtil {

	public static Double round(Double value, int places) {
		if (places < 0)
			throw new IllegalArgumentException();

		BigDecimal bd = BigDecimal.valueOf(value);
		bd = bd.setScale(places, RoundingMode.HALF_UP);
		return bd.doubleValue();
	}

}
