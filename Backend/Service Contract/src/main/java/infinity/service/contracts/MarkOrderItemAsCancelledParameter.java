package infinity.service.contracts;

import infinity.service.contracts.order.OrderItemTargetParameter1;
import infinity.service.contracts.order.OrderTargetParameter1;

public class MarkOrderItemAsCancelledParameter {

	public OrderTargetParameter1 order;

	public OrderItemTargetParameter1 orderItem;

	public String reasonForCancel;

}
