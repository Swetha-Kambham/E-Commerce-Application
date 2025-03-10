package infinity.service.keys;

import java.util.HashMap;

public class OrderItem {

	public static final String originalPricePerUnit = "original-price-per-unit";
	public static final String itemSequence = "item-sequence";

	public static final String reasonForCancel = "reason-for-cancel";

	public static class ItemStatus {
		public static final String drafts = "draft";
		public static final String pending = "pending";
		public static final String confirmed = "confirmed";
		public static final String cancelled = "cancelled";
		public static final String readyForShip = "ready-for-ship";
		public static final String shipped = "shipped";
		public static final String inTransit = "in-transit";
		public static final String delivered = "delivered";
		public static final String archived = "archived";

		public static final HashMap<infinity.stone.order.domain.OrderItemStatus, String> statuses = new HashMap<infinity.stone.order.domain.OrderItemStatus, String>() {

			/**
			 * 
			 */
			private static final long serialVersionUID = -7212897935845779929L;

			{
				put(infinity.stone.order.domain.OrderItemStatus.DRAFT, drafts);
				put(infinity.stone.order.domain.OrderItemStatus.PENDING, pending);
				put(infinity.stone.order.domain.OrderItemStatus.CONFIRMED, confirmed);
				put(infinity.stone.order.domain.OrderItemStatus.CANCELLED, cancelled);
				put(infinity.stone.order.domain.OrderItemStatus.READY_FOR_SHIP, readyForShip);
				put(infinity.stone.order.domain.OrderItemStatus.SHIPPED, shipped);
				put(infinity.stone.order.domain.OrderItemStatus.IN_TRANSIT, inTransit);
				put(infinity.stone.order.domain.OrderItemStatus.DELIVERED, delivered);
				put(infinity.stone.order.domain.OrderItemStatus.ARCHIVED, archived);
			}
		};

		public static final HashMap<String, infinity.stone.order.domain.OrderItemStatus> statusObjects = new HashMap<String, infinity.stone.order.domain.OrderItemStatus>() {
			/**
			 * 
			 */
			private static final long serialVersionUID = -346031211124578598L;

			{
				put(drafts, infinity.stone.order.domain.OrderItemStatus.DRAFT);
				put(pending, infinity.stone.order.domain.OrderItemStatus.PENDING);
				put(confirmed, infinity.stone.order.domain.OrderItemStatus.CONFIRMED);
				put(cancelled, infinity.stone.order.domain.OrderItemStatus.CANCELLED);
				put(readyForShip, infinity.stone.order.domain.OrderItemStatus.READY_FOR_SHIP);
				put(shipped, infinity.stone.order.domain.OrderItemStatus.SHIPPED);
				put(inTransit, infinity.stone.order.domain.OrderItemStatus.IN_TRANSIT);
				put(delivered, infinity.stone.order.domain.OrderItemStatus.DELIVERED);
				put(archived, infinity.stone.order.domain.OrderItemStatus.ARCHIVED);
			}
		};

	}

}
