package infinity.service.contracts.product;

import infinity.service.contracts.category.CategoryReference2;
import infinity.service.contracts.common.GenericKeyValue;
import infinity.service.contracts.seller.SellerReference3;

public class ProductDetails1 {

	public String id;

	public String slug;

	public String name;

	public String commonName;

	public String description;

	public String[] tags;

	public String[] locationTags;

	public CategoryReference2 category;

	public SellerReference3 seller;

	public String status;

	public String statusRemark;

	public Boolean enabled;

	public ProductOptionValuesDetails1[] options;

	public ProductSKUDetails1[] productSKUs;

	public GenericKeyValue[] metadata;

}
