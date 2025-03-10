package infinity.service.utils;

import infinity.service.contracts.common.CurrencyReference1;
import infinity.service.contracts.state.StateReference1;
import infinity.stone.domain.Currency;
import infinity.stone.domain.State;

public class MappingUtils {

	public static CurrencyReference1 mapToCurrencyReference1(String currencyId) {
		Currency currency = Currency.currencies.get(currencyId);

		if (currency != null) {
			CurrencyReference1 currencyRef = new CurrencyReference1();
			currencyRef.id = currency.getId();
			currencyRef.name = currency.getName();
			currencyRef.symbol = currency.getSymbol();
			currencyRef.code = currency.getCode();

			return currencyRef;
		}
		return null;
	}

	public static CurrencyReference1 mapToCurrencyReference1(Currency currency) {
		if (currency != null) {
			CurrencyReference1 currencyRef = new CurrencyReference1();
			currencyRef.id = currency.getId();
			currencyRef.name = currency.getName();
			currencyRef.symbol = currency.getSymbol();
			currencyRef.code = currency.getCode();

			return currencyRef;
		}
		return null;
	}

	public static StateReference1 mapToStateReference1(State state) {
		StateReference1 stateReference = new StateReference1();
		stateReference.id = state.getId();
		stateReference.name = state.getName();

		return stateReference;
	}

}
