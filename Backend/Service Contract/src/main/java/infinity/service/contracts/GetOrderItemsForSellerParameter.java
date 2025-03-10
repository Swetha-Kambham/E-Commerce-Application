package infinity.service.contracts;

import infinity.service.contracts.order.OrderFilterParameter1;
import infinity.service.contracts.seller.SellerTargetParameter1;

public class GetOrderItemsForSellerParameter {
	public Integer page;

	public Integer pageSize;

	public SellerTargetParameter1 seller;

	public OrderFilterParameter1 filters;

}
