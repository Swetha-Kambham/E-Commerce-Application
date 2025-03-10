package infinity.service.contracts;

import infinity.service.contracts.product.ProductSKUTargetParameter1;
import infinity.service.contracts.product.ProductTargetParameter1;
import infinity.service.contracts.user.UserTargetParameter1;

public class PutProductPreferenceParameter {

	public UserTargetParameter1 user;

	public ProductTargetParameter1 product;

	public ProductSKUTargetParameter1 sku;

	public Integer quantity;

	public String type;

}
