package infinity.service.contracts.product;

import infinity.service.contracts.common.CurrencyReference1;
import infinity.service.contracts.common.GenericKeyValue;

public class ProductSKUDetails1 {

	public String id;

	public String sku;

	public Integer quantity;

	public CurrencyReference1 currency;

	public Double pricePerUnit;

	public Double sellingPricePerUnit;

	public OptionValueReference1[] specifications;

	public GenericKeyValue[] metadata;

}
