package infinity.service.contracts.product;

import infinity.service.contracts.seller.SellerReference3;

public class ProductReference3 {

	public String id;
	
	public String name;
	
	public String slug;
	
	public String commonName;
	
	public String description;
	
	public String [] tags;
	
	public String categoryId;
	
	public SellerReference3 seller;
	
	public String [] locationTags;
	
	public String consumer;
	
	public Double percentageDiscount;
	
	public Double flatDiscount;
	
	public ProductOptionValuesDetails1 [] options;
	
	public ProductSKUDetails1 [] skus;
	
	public Boolean enabled;
	
}
