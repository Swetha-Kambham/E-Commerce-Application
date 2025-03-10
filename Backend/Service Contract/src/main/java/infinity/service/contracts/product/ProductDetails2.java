package infinity.service.contracts.product;

import infinity.service.contracts.category.CategoryReference2;
import infinity.service.contracts.seller.SellerReference3;

public class ProductDetails2 {

	public String id;
	
	public String name;
	
	public String slug;
	
	public String commonName;
	
	public String description;
	
	public String [] tags;
	
	public CategoryReference2 category;
	
	public SellerReference3 seller;
	
	public String [] locationTags;
	
	public String status;
	
	public Boolean enabled;
	
}
