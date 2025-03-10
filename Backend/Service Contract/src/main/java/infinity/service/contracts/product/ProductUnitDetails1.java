package infinity.service.contracts.product;

import infinity.service.contracts.category.CategoryReference2;
import infinity.service.contracts.common.CurrencyReference1;
import infinity.service.contracts.seller.SellerReference3;

public class ProductUnitDetails1 {

	public String productId;

	public String slug;

	public String skuId;

	public String sku;

	public Integer quantityInStock;

	public CurrencyReference1 currency;

	public Double pricePerUnit;

	public Double sellingPricePerUnit;

	public String name;

	public String commonName;

	public String description;

	public CategoryReference2 category;

	public SellerReference3 seller;

	public OptionValueReference1[] specifications;

}
