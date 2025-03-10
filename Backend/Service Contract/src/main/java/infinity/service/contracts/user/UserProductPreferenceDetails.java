package infinity.service.contracts.user;

import infinity.service.contracts.category.CategoryReference2;
import infinity.service.contracts.common.CurrencyReference1;
import infinity.service.contracts.seller.SellerReference3;

public class UserProductPreferenceDetails {

	public String id;

	public String type;

	public String userId;

	public String skuId;

	public String productId;

	public String productName;

	public String productSlug;

	public String productCommonName;

	public String productDescription;

	public SellerReference3 seller;

	public CategoryReference2 category;

	public CurrencyReference1 currency;

	public Double pricePerUnit;

	public Double sellingPricePerUnit;

	public Integer quantity;

}
