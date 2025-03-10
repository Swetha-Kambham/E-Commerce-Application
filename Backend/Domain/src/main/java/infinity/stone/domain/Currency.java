package infinity.stone.domain;

import java.util.HashMap;

public class Currency {

	private String id, symbol, name, code;

	private static final Currency baseCurrency = new Currency("1", "INR", "₹", "Indian Rupee");

	public static final HashMap<String, Currency> currencies = new HashMap<String, Currency>() {
		/**
		 * 
		 */
		private static final long serialVersionUID = 403898457852283347L;

		{
			put(baseCurrency.id, baseCurrency);
		}
	};

	public Currency() {

	}

	public Currency(String id, String code, String symbol, String name) {
		this.id = id;
		this.code = code;
		this.symbol = symbol;
		this.setName(name);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public static Currency getBasecurrency() {
		return baseCurrency;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		Currency currency = (Currency) obj;

		return this.id.equals(currency.id);
	}

	@Override
	public int hashCode() {
		return this.id.hashCode();
	}

}
