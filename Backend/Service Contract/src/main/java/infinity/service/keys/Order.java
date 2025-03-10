package infinity.service.keys;

import java.util.HashMap;

public class Order {

	public static class Status {
		public static final String drafts = "draft";
		public static final String pending = "pending";
		public static final String confirmed = "confirmed";
		public static final String cancelled = "cancelled";
		public static final String partiallyCancelled = "partially-cancelled";
		public static final String complete = "complete";
		public static final String archived = "archived";

		public static final HashMap<infinity.stone.order.domain.OrderStatus, String> statuses = new HashMap<infinity.stone.order.domain.OrderStatus, String>() {
			/**
			 * 
			 */
			private static final long serialVersionUID = 1703843561034988020L;

			{
				put(infinity.stone.order.domain.OrderStatus.DRAFT, drafts);
				put(infinity.stone.order.domain.OrderStatus.PENDING, pending);
				put(infinity.stone.order.domain.OrderStatus.CONFIRMED, confirmed);
				put(infinity.stone.order.domain.OrderStatus.PARTIALLY_CANCELLED, partiallyCancelled);
				put(infinity.stone.order.domain.OrderStatus.CANCELLED, cancelled);
				put(infinity.stone.order.domain.OrderStatus.COMPLETE, complete);
				put(infinity.stone.order.domain.OrderStatus.ARCHIVED, archived);
			}
		};

	}

	public static class PaymentMethods {
		public static final String payOnDelivery = "pay-on-delivery";
	}

	public static class Address {
		public static final String address = "address";

		public static final String id = "id";
		public static final String name = "name";
		public static final String addressLine1 = "address-line-1";
		public static final String addressLine2 = "address-line-2";
		public static final String addressLine3 = "address-line-3";
		public static final String city = "city";
		public static final String pinCode = "pin-code";
		public static final String state = "state";
		public static final String phoneNumber = "phone-number";
		public static final String landmark = "landmark";

	}

	public static class CashFreePaymentStatus {
		public static final String success = "SUCCESS";
		public static final String flagged = "FLAGGED";
		public static final String pending = "PENDING";
		public static final String failed = "FAILED";
		public static final String cancelled = "CANCELLED";
		public static final String userDropped = "USER_DROPPED";
	}

	public static class CashFreeOrderStatus {
		public static final String active = "ACTIVE";
		public static final String paid = "PAID";
		public static final String expired = "EXPIRED";
	}

	public static class CashFreeOrder {
		public static final String cashFreeOrder = "cash-free-order";

		public static final String orderId = "cf_order_id";
		public static final String orderToken = "order_token";
		public static final String orderStatus = "order_status";

		public static final String orderMeta = "order_meta";
		public static final String paymentMethods = "payment_methods";
	}

}