package infinity.service.contracts;

import infinity.service.contracts.order.OrderFilterParameter1;
import infinity.service.contracts.user.UserTargetParameter1;

public class GetOrderItemsForUserParameter {
	public Integer page;

	public Integer pageSize;

	public UserTargetParameter1 user;

	public OrderFilterParameter1 filters;

}
