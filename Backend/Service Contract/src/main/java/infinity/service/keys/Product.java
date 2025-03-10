package infinity.service.keys;

import java.util.HashMap;

public class Product {

	public static final String consumer = "consumer";
	public static final String percentageDiscount = "percentage-discount";
	public static final String flatDiscount = "flat-discount";

	public static class Status {
		public static final String newProduct = "new";
		public static final String underReview = "under-review";
		public static final String approved = "approved";
		public static final String rejected = "rejected";
		public static final String edited = "edited";
		public static final String live = "live";

		public static final HashMap<infinity.stone.product.domain.ProductStatus, String> statuses = new HashMap<infinity.stone.product.domain.ProductStatus, String>() {

			/**
			 * 
			 */
			private static final long serialVersionUID = 4112372785805816808L;

			{
				put(infinity.stone.product.domain.ProductStatus.NEW, newProduct);
				put(infinity.stone.product.domain.ProductStatus.UNDER_REVIEW, underReview);
				put(infinity.stone.product.domain.ProductStatus.APPROVED, approved);
				put(infinity.stone.product.domain.ProductStatus.REJECTED, rejected);
				put(infinity.stone.product.domain.ProductStatus.EDITED, edited);
				put(infinity.stone.product.domain.ProductStatus.LIVE, live);
			}
		};

	}

}