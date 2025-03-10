package infinity.service.implementation;

import java.net.URI;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.databind.node.ObjectNode;

import infinity.service.IOrderService1;
import infinity.service.configuration.AppConfiguration;
import infinity.service.contracts.ArchiveOrderParameter;
import infinity.service.contracts.CreatePaymentTokenParameter;
import infinity.service.contracts.DraftOrderParameter;
import infinity.service.contracts.GetInvoiceDetailsParameter;
import infinity.service.contracts.GetOrderItemDetailsParameter;
import infinity.service.contracts.GetOrderItemsForSellerParameter;
import infinity.service.contracts.GetOrderItemsForUserParameter;
import infinity.service.contracts.GetOrderItemsParameter;
import infinity.service.contracts.GetOrderPreviewParameter;
import infinity.service.contracts.GetPaymentStatusParameter;
import infinity.service.contracts.GetProductUnitReferenceForOrderItem;
import infinity.service.contracts.MarkOrderAsCancelledParameter;
import infinity.service.contracts.MarkOrderAsConfirmedParameter;
import infinity.service.contracts.MarkOrderAsPendingParameter;
import infinity.service.contracts.MarkOrderItemAsCancelledParameter;
import infinity.service.contracts.PutOrderAddressParameter;
import infinity.service.contracts.common.AddressReference1;
import infinity.service.contracts.common.UserDetails2;
import infinity.service.contracts.order.CashFreeCreatePaymentRequestParameter;
import infinity.service.contracts.order.OrderItemDetail2;
import infinity.service.contracts.order.OrderItemDetail3;
import infinity.service.contracts.order.OrderItemDetail1;
import infinity.service.contracts.order.OrderItemParameter1;
import infinity.service.contracts.order.OrderFilterParameter1;
import infinity.service.contracts.order.OrderItemTargetParameter1;
import infinity.service.contracts.order.OrderParameter1;
import infinity.service.contracts.order.OrderPreview;
import infinity.service.contracts.order.OrderReference1;
import infinity.service.contracts.order.OrderTargetParameter1;
import infinity.service.contracts.product.ProductUnitReference1;
import infinity.service.contracts.order.CashFreeOrderDetails;
import infinity.service.contracts.order.InvoiceDetails1;
import infinity.service.contracts.seller.SellerReference3;
import infinity.service.contracts.seller.SellerTargetParameter1;
import infinity.service.contracts.state.StateReference1;
import infinity.service.contracts.user.UserAddressTargetParameter1;
import infinity.service.contracts.user.UserTargetParameter1;
import infinity.service.exception.FaultException;
import infinity.service.exception.InvalidInputException;
import infinity.service.exception.ProductOutOfStockException;
import infinity.service.keys.Order.CashFreeOrder;
import infinity.service.keys.Order.CashFreeOrderStatus;
import infinity.service.keys.Order.PaymentMethods;
import infinity.service.utils.NumberUtil;
import infinity.service.utils.PhoneNumberUtil;
import infinity.stone.domain.State;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.exception.ResourceNotFoundException;
import infinity.stone.domain.exception.ValidationException;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.helper.domain.PhoneNumber;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.order.domain.Order2;
import infinity.stone.order.domain.OrderItemStatus;
import infinity.stone.order.domain.OrderItem;
import infinity.stone.order.domain.OrderStatus;
import infinity.stone.product.domain.Product2;
import infinity.stone.product.domain.ProductSKU2;
import infinity.stone.seller.domain.Seller;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.OrderBy;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryFieldReference;
import infinity.stone.sql.helper.QueryOperation2;
import infinity.stone.user.domain.Address;
import infinity.stone.user.domain.User;
import infinity.service.utils.HttpRequestUtil;
import infinity.service.utils.MappingUtils;

@Controller
public class OrderService1 implements IOrderService1 {
	private static final long orderIdPrefix = 1000000000l;

	private static final Set<String> excludeOrderItemsWithStatusesForSeller = new HashSet<String>(Arrays.asList(
			infinity.service.keys.OrderItem.ItemStatus.drafts, infinity.service.keys.OrderItem.ItemStatus.pending,
			infinity.service.keys.OrderItem.ItemStatus.archived));

	private static final Set<String> excludeOrderItemsWithStatusesForUser = new HashSet<String>(Arrays.asList(
			infinity.service.keys.OrderItem.ItemStatus.drafts, infinity.service.keys.OrderItem.ItemStatus.archived));

	@Autowired
	private AppConfiguration appConfig;

	private static String getOrderIdFromOriginalId(int orderId) {
		return String.format("OD%d", orderIdPrefix + orderId);
	}

	private static int getOriginalIdFromOrderId(String orderId) {
		Long res = (Long.parseLong(orderId.substring(2)) - orderIdPrefix);
		return res.intValue();
	}

	@Override
	public OrderReference1 draftOrder(DraftOrderParameter input) {
		return draftOrder(input.order);
	}

	@Override
	public OrderPreview getOrderPreview(GetOrderPreviewParameter input) throws FaultException {
		return getOrderPreview(input.order);
	}

	@Override
	public void markOrderAsPending(MarkOrderAsPendingParameter input) {
		markOrderAsPending(input.order);
	}

	@Override
	public void archiveOrder(ArchiveOrderParameter input) {
		archiveOrder(input.order);
	}

	@Override
	public CashFreeOrderDetails createPaymentToken(CreatePaymentTokenParameter input) {
		return createPaymentToken(input.order, input.parameters);
	}

	@Override
	public void markOrderAsConfirmed(MarkOrderAsConfirmedParameter input) {
		markOrderAsConfirmed(input.order, input.isPayOnDeliveryOrder);
	}

	@Override
	public void markOrderAsCancelled(MarkOrderAsCancelledParameter input) {
		markOrderAsCancelled(input.order, input.reasonForCancel);
	}

	@Override
	public void markOrderItemAsCancelled(MarkOrderItemAsCancelledParameter input) {
		markOrderItemAsCancelled(input.order, input.orderItem, input.reasonForCancel);
	}

	@Override
	public OrderItemDetail2[] getOrderItems(GetOrderItemsParameter input) {
		return getOrderItems(input.page, input.pageSize, input.filters);
	}

	@Override
	public OrderItemDetail2[] getOrderItemsForUser(GetOrderItemsForUserParameter input) {
		return getOrderItemsForUser(input.page, input.pageSize, input.user, input.filters);
	}

	@Override
	public OrderItemDetail2[] getOrderItemsForSeller(GetOrderItemsForSellerParameter input) {
		return getOrderItemsForSeller(input.page, input.pageSize, input.seller, input.filters);
	}

	@Override
	public OrderItemDetail3 getOrderItemDetails(GetOrderItemDetailsParameter input) {
		return getOrderItemDetails(input.orderItem);
	}

	@Override
	public void putOrderAddress(PutOrderAddressParameter input) {
		putOrderAddress(input.order, input.userAddress);
	}

	@Override
	public ProductUnitReference1 getProductUnitReferenceForOrderItem(GetProductUnitReferenceForOrderItem input) {
		return getProductUnitReferenceForOrderItem(input.order, UUID.fromString(input.orderItem.id));
	}

	@Override
	public InvoiceDetails1 getInvoiceDetails(GetInvoiceDetailsParameter input) {
		return getInvoiceDetails(input.order, UUID.fromString(input.orderItem.id));
	}

	@Override
	public CashFreeOrderDetails getPaymentStatus(GetPaymentStatusParameter input) {
		int orderId = resolveOrderId(input.order);
		JsonObject paymentDetails = getPaymentDetails(orderId);

		if (paymentDetails != null) {
			CashFreeOrderDetails details = new CashFreeOrderDetails();
			details.orderId = getOrderIdFromOriginalId(orderId);
			details.orderStatus = paymentDetails.getPropertyAsString(CashFreeOrder.orderStatus);
			details.cashFreeOrderId = paymentDetails.getPropertyAsString(CashFreeOrder.orderId);

			return details;
		}

		throw new ResourceNotFoundException("Order not created yet");
	}

	private OrderReference1 mapToOrderReference1(Order2 order) {
		return new OrderReference1() {
			{
				id = order.getId();
			}
		};
	}

	public OrderReference1 draftOrder(OrderParameter1 order) {
		Set<UUID> skuIds = new HashSet<UUID>();

		for (OrderItemParameter1 item : order.details) {
			skuIds.add(UUID.fromString(item.productSKUId));
		}

		ProductSKU2[] productUnits = ObjectLoader.loadObjects(ProductSKU2.class,
				skuIds.toArray(new UUID[skuIds.size()]));

		if (productUnits.length == 0)
			throw new ResourceNotFoundException("Product not found.");

		User user = ObjectLoader.loadObject(User.class, UUID.fromString(order.userId));

		HashMap<UUID, ProductSKU2> skuMap = new HashMap<UUID, ProductSKU2>();

		for (ProductSKU2 sku : productUnits)
			skuMap.put(sku.getId(), sku);

		Order2 orderObj = new Order2();
		orderObj.setOrderDate(new Timestamp(System.currentTimeMillis()));
		orderObj.setUser(user);
		orderObj.setDefaultValues();
		orderObj.setIsPayOnDelivery(false);

		Double orderTotal = 0.0;

		List<OrderItem> orderItems = orderObj.getOrderItems();

		int index = 1;
		for (OrderItemParameter1 itemToAdd : order.details) {

			ProductSKU2 sku = skuMap.get(UUID.fromString(itemToAdd.productSKUId));

			if (!sku.getCurrency().equals(orderObj.getCurrency()))
				throw new FaultException("Can not create order for the selected product(s)");

			int quantity = itemToAdd.quantity != null ? itemToAdd.quantity : 1;

			if (sku.getQuantityInStock() < quantity)
				throw new ProductOutOfStockException("Can not create order for requested quantity");

			OrderItem orderItem = new OrderItem();

			Double totalPrice = quantity * sku.getSellingPricePerUnit();
			orderTotal += totalPrice;

			orderItem.setDefaultValues();
			orderItem.setCurrency(sku.getCurrency());
			orderItem.setOrder(orderObj);
			orderItem.setPricePerUnit(sku.getSellingPricePerUnit());
			orderItem.setQuantity(quantity);
			orderItem.setTotalPrice(totalPrice);
			orderItem.setStatus(OrderItemStatus.DRAFT);
			orderItem.setProduct(sku.getProduct());
			orderItem.setProductSKU(sku);

			JsonObject keyValues = new JsonObject();
			keyValues.addProperty(infinity.service.keys.OrderItem.originalPricePerUnit, sku.getPricePerUnit());
			keyValues.addProperty(infinity.service.keys.OrderItem.itemSequence, index++);
			orderItem.setKeyValues(keyValues);
			orderItems.add(orderItem);
		}

		orderObj.setTotalPrice(orderTotal);
		orderObj.save();

		return mapToOrderReference1(orderObj);
	}

	private static AddressReference1 getAddressReference1(String json) {
		AddressReference1 address = new AddressReference1();
		JsonObject kv = new JsonObject();
		kv.setObjectNode(json);

		ObjectNode addr = (ObjectNode) kv.getProperty(infinity.service.keys.Order.Address.address);

		if (addr == null)
			return null;

		address.id = addr.get(infinity.service.keys.Order.Address.id).asText();
		address.name = addr.get(infinity.service.keys.Order.Address.name).asText();
		address.addressLine1 = addr.get(infinity.service.keys.Order.Address.addressLine1).asText();
		address.addressLine2 = addr.get(infinity.service.keys.Order.Address.addressLine2).asText();
		address.addressLine3 = addr.get(infinity.service.keys.Order.Address.addressLine3).asText();
		address.city = addr.get(infinity.service.keys.Order.Address.city).asText();
		address.landmark = addr.get(infinity.service.keys.Order.Address.landmark).asText();
		address.state = new StateReference1();
		address.state.name = addr.get(infinity.service.keys.Order.Address.state).asText();

		address.phoneNumber = PhoneNumberUtil.mapToPhoneNumberReference1(
				new PhoneNumber(addr.get(infinity.service.keys.Order.Address.phoneNumber).asText()));

		return address;
	}

	static Query2 getOrderDetailsQuery(Set<Class<? extends DomainBase>> relationshipToLoad) {
		Query2 q = Query2.select(infinity.stone.order.schema.Order.tableName);
		q.addFields(new infinity.stone.order.schema.Order().getAllFields());

		if (relationshipToLoad.contains(OrderItem.class)) {
			q.leftJoin(infinity.stone.order.schema.OrderDetail.tableName, infinity.stone.order.schema.Order.Id, infinity.stone.order.schema.OrderDetail.OrderId);
			q.addFields(new infinity.stone.order.schema.OrderDetail().getAllFields());

			if (relationshipToLoad.contains(Product2.class)) {
				q.leftJoin(infinity.stone.product.schema.Product.tableName, infinity.stone.order.schema.OrderDetail.ProductId, infinity.stone.product.schema.Product.Id);
				q.addFields(new infinity.stone.product.schema.Product().getAllFields());
			}

			if (relationshipToLoad.contains(ProductSKU2.class)) {
				q.leftJoin(infinity.stone.product.schema.ProductSKU.tableName, infinity.stone.order.schema.OrderDetail.ProductSKUId,
						infinity.stone.product.schema.ProductSKU.Id);
				q.addFields(new infinity.stone.product.schema.ProductSKU().getAllFields());
			}
		}

		if (relationshipToLoad.contains(User.class)) {
//			q.innerJoin(infinity.stone.security.schema.Login.tableName, domain.sql.Order.UserId, infinity.stone.security.schema.Login.Id);
			q.addFields(new infinity.stone.security.schema.Login().getAllFields());

			if (relationshipToLoad.contains(Address.class)) {
//				q.leftJoin(infinity.stone.user.schema.Address.tableName, infinity.stone.security.schema.Login.Id, infinity.stone.user.schema.Address.UserId);
//				q.addFields(new infinity.stone.user.schema.Address().getAllFields());

				if (relationshipToLoad.contains(State.class)) {
					q.leftJoin(infinity.stone.schema.State.tableName, infinity.stone.user.schema.Address.StateId,
							infinity.stone.schema.State.Id);
					q.addFields(new infinity.stone.schema.State().getAllFields());
				}
			}
		}

		return q;
	}

	static Order2 getOrderDetails(Integer orderId, Set<Class<? extends DomainBase>> relationshipToLoad) {
		Query2 q = getOrderDetailsQuery(relationshipToLoad);

		q.whereClause(QueryOperation2.equal(infinity.stone.order.schema.Order.Id, FieldValue2.sqlInt(orderId)));

		return ObjectLoader.loadObject(Order2.class, orderId, q);
	}

	static OrderItemDetail1 mapToOrderItemDetail1(OrderItem orderItem) {
		JsonObject kv = new JsonObject(orderItem.getKeyValues());

		OrderItemDetail1 detail = new OrderItemDetail1();
		detail.id = orderItem.getId().toString();
		detail.productName = orderItem.getProduct().getName();
		detail.quantity = orderItem.getQuantity();
		detail.currency = MappingUtils.mapToCurrencyReference1(orderItem.getCurrency());
		detail.totalPrice = orderItem.getTotalPrice();
		detail.sellingPrice = orderItem.getPricePerUnit();
		detail.originalPrice = kv.getPropertyAsNumeric(infinity.service.keys.OrderItem.originalPricePerUnit);

		return detail;
	}

	static OrderPreview mapToOrderPreview(Order2 orderObj) {
		OrderPreview preview = new OrderPreview();

		preview.draftId = orderObj.getId();
		preview.status = infinity.service.keys.Order.Status.statuses.get(orderObj.getStatus());
		preview.orderTotal = orderObj.getTotalPrice();
		preview.currency = MappingUtils.mapToCurrencyReference1(orderObj.getCurrency());

		User userObj = orderObj.getUser();
		preview.user = new UserDetails2();
		preview.user.id = userObj.getId().toString();
		preview.user.emailAddress = userObj.getEmailAddress();
		preview.user.phoneNumber = PhoneNumberUtil.mapToPhoneNumberReference1(userObj.getPhoneNumber());
		preview.user.name = userObj.getName();

		String jsonKeyValues = orderObj.getKeyValues();

		AddressReference1 address = getAddressReference1(jsonKeyValues);
		preview.billingAddress = address;
		preview.shippingAddress = address;

		List<OrderItem> orderItems = orderObj.getOrderItems();

		preview.orderItems = new OrderItemDetail1[orderItems.size()];

		for (int i = 0; i < orderItems.size(); i++) {
			preview.orderItems[i] = mapToOrderItemDetail1(orderItems.get(i));
		}

		return preview;
	}

	public OrderPreview getOrderPreview(OrderTargetParameter1 order) {
		Integer orderId = resolveOrderId(order);

		Order2 orderObj = getOrderDetails(orderId,
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(OrderItem.class, User.class, Product2.class)));

		return mapToOrderPreview(orderObj);
	}

	public void markOrderAsPending(OrderTargetParameter1 order) {
		Integer orderId = resolveOrderId(order);

		Order2 orderObj = getOrderDetails(orderId,
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(OrderItem.class, ProductSKU2.class)));

		if (orderObj.getStatus().equals(OrderStatus.PENDING)) {
			return;
		}

		if (!orderObj.getStatus().equals(OrderStatus.DRAFT)) {
			throw new ValidationException("Order status can not be changed");
		}

		orderObj.setStatus(OrderStatus.PENDING);
		List<OrderItem> orderItems = orderObj.getOrderItems();

		for (OrderItem orderItem : orderItems) {
			orderItem.setStatus(OrderItemStatus.PENDING);
			ProductSKU2 productSKU = orderItem.getProductSKU();
			productSKU.setQuantityInStock(productSKU.getQuantityInStock() - orderItem.getQuantity());
		}

		orderObj.save();

	};

	public void archiveOrder(OrderTargetParameter1 order) {
		Integer orderId = resolveOrderId(order);

		Order2 orderObj = getOrderDetails(orderId,
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(OrderItem.class, ProductSKU2.class)));

		if (orderObj.getStatus().equals(OrderStatus.ARCHIVED)) {
			return;
		}

		if (!orderObj.getStatus().equals(OrderStatus.PENDING)) {
			throw new ValidationException("Order status can not be changed");
		}

		orderObj.setStatus(OrderStatus.ARCHIVED);
		List<OrderItem> orderItems = orderObj.getOrderItems();

		for (OrderItem orderItem : orderItems) {
			orderItem.setStatus(OrderItemStatus.ARCHIVED);
			ProductSKU2 productSKU = orderItem.getProductSKU();
			productSKU.setQuantityInStock(productSKU.getQuantityInStock() + orderItem.getQuantity());
		}

		orderObj.save();

	};

	static Integer resolveOrderId(OrderTargetParameter1 order) {
		if (order == null || (order.draftId == null && order.orderId == null))
			throw new InvalidInputException("order id is required");

		Integer orderId = null;

		if (order.draftId != null)
			orderId = order.draftId;
		else
			orderId = getOriginalIdFromOrderId(order.orderId);

		return orderId;
	}

	public void markOrderAsConfirmed(OrderTargetParameter1 order, Boolean isPayOnDeliveryOrder) {
		Integer orderId = resolveOrderId(order);

		Order2 orderObj = getOrderDetails(orderId,
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(OrderItem.class)));

		if (!orderObj.getStatus().equals(OrderStatus.DRAFT) && !orderObj.getStatus().equals(OrderStatus.PENDING))
			throw new ValidationException("Order status can not be changed");

		if (isPayOnDeliveryOrder == null || !isPayOnDeliveryOrder) {
			JsonObject paymentDetails = getPaymentDetails(orderObj.getId());

			if (paymentDetails == null
					|| !paymentDetails.getPropertyAsString(CashFreeOrder.orderStatus).equals(CashFreeOrderStatus.paid))
				throw new FaultException("Payment not found");

			JsonObject kv = new JsonObject();
			kv.addProperty(CashFreeOrder.orderId, paymentDetails.getPropertyAsString(CashFreeOrder.orderId));
			kv.addProperty(CashFreeOrder.orderStatus, paymentDetails.getPropertyAsString(CashFreeOrder.orderStatus));
			kv.addProperty(CashFreeOrder.orderToken, paymentDetails.getPropertyAsString(CashFreeOrder.orderToken));

			ObjectNode orderMeta = (ObjectNode) paymentDetails.getProperty(CashFreeOrder.orderMeta);
			orderObj.setTransactionMethod(orderMeta.get(CashFreeOrder.paymentMethods).asText());
			orderObj.setTransactionReference(paymentDetails.getPropertyAsString(CashFreeOrder.orderId));

			JsonObject keyValues = new JsonObject(orderObj.getKeyValues());
			keyValues.addOrUpdateProperty(CashFreeOrder.cashFreeOrder, kv.getJson());

			orderObj.setKeyValues(keyValues);
		} else {
			orderObj.setTransactionMethod(PaymentMethods.payOnDelivery);
			orderObj.setTransactionReference(null);
		}

		orderObj.setStatus(OrderStatus.CONFIRMED);
		List<OrderItem> orderItems = orderObj.getOrderItems();

		for (OrderItem orderItem : orderItems) {
			orderItem.setStatus(OrderItemStatus.CONFIRMED);
		}

		orderObj.save();
	}

	public void markOrderAsCancelled(OrderTargetParameter1 order, String reasonForCancel) {
		Integer orderId = resolveOrderId(order);

		Order2 orderObj = getOrderDetails(orderId,
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(OrderItem.class)));

		if (orderObj.getStatus().equals(OrderStatus.COMPLETE)) {
			throw new ValidationException("Order can not be cancelled");
		}

		orderObj.setStatus(OrderStatus.CANCELLED);
		for (OrderItem orderItem : orderObj.getOrderItems()) {
			JsonObject kv = new JsonObject(orderItem.getKeyValues());
			kv.addOrUpdateProperty(infinity.service.keys.OrderItem.reasonForCancel, reasonForCancel);

			orderItem.setStatus(OrderItemStatus.CANCELLED);
			orderItem.setKeyValues(kv);
		}
		orderObj.save();

	}

	public void markOrderItemAsCancelled(OrderTargetParameter1 order, OrderItemTargetParameter1 orderItemTarget,
			String reasonForCancel) {
		UUID orderItemId = resolveOrderItemId(orderItemTarget);
		Integer orderId = resolveOrderId(order);

		Query2 q = Query2.select(infinity.stone.order.schema.Order.tableName);
		q.leftJoin(infinity.stone.order.schema.OrderDetail.tableName, infinity.stone.order.schema.Order.Id, infinity.stone.order.schema.OrderDetail.OrderId);
		q.addFields(new infinity.stone.order.schema.Order().getAllFields());
		q.addFields(new infinity.stone.order.schema.OrderDetail().getAllFields());

		q.whereClause(QueryOperation2.equal(infinity.stone.order.schema.Order.Id, FieldValue2.sqlInt(orderId)));

		Order2 orderObj = ObjectLoader.loadObject(Order2.class, orderId, q);

		if (orderObj.getStatus().equals(OrderStatus.COMPLETE) || orderObj.getStatus().equals(OrderStatus.ARCHIVED)) {
			throw new ValidationException("Order can not be cancelled");
		}

		List<OrderItem> orderItems = orderObj.getOrderItems();
		int cancelledItemCount = 0;
		for (OrderItem orderItem : orderItems) {
			if (orderItem.getId().equals(orderItemId)) {
				JsonObject kv = new JsonObject(orderItem.getKeyValues());
				kv.addOrUpdateProperty(infinity.service.keys.OrderItem.reasonForCancel, reasonForCancel);

				orderItem.setStatus(OrderItemStatus.CANCELLED);
				orderItem.setKeyValues(kv);
			}

			if (orderItem.getStatus().equals(OrderItemStatus.CANCELLED)) {
				cancelledItemCount++;
			}
		}

		if (cancelledItemCount == orderItems.size()) {
			orderObj.setStatus(OrderStatus.CANCELLED);
		} else if (cancelledItemCount > 0 && cancelledItemCount < orderItems.size()) {
			orderObj.setStatus(OrderStatus.PARTIALLY_CANCELLED);
		}

		orderObj.save();
	}

	public CashFreeOrderDetails createPaymentToken(OrderTargetParameter1 order,
			CashFreeCreatePaymentRequestParameter parameters) {

		Order2 orderObj = getOrderDetails(resolveOrderId(order),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(OrderItem.class, User.class)));

		User u = orderObj.getUser();

		String appId = appConfig.getCashfreeAppId();
		String secretKey = appConfig.getCashfreeSecretKey();
		String orderId = getOrderIdFromOriginalId(orderObj.getId());
		String orderAmount = NumberUtil.round(orderObj.getTotalPrice(), 2).toString();
//		String customerEmail = u.getEmailAddress();
//		String customerPhone = u.getPhoneNumber().getFullPhoneNumber();
//		String orderCurrency = orderObj.getCurrency().getCode();
//		String customerId = u.getId().toString();
//		String customerName = u.getName();

		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("order_id", orderId);
		jsonObject.addProperty("order_amount", orderAmount);
//		jsonObject.addProperty("order_currency", orderCurrency);
//
//		JsonObject customerDetails = new JsonObject();
//		customerDetails.addProperty("customer_id", customerId);
//		customerDetails.addProperty("customer_email", customerEmail);
//		customerDetails.addProperty("customer_phone", customerPhone);
//		customerDetails.addProperty("customer_name", customerName);

//		jsonObject.addProperty("customer_details", customerDetails.getJson());

		JsonObject meta = new JsonObject();
//		meta.addProperty("notify_url", "/OrderService1/something");
		if (parameters != null && parameters.returnUrl != null)
			meta.addProperty("return_url", parameters.returnUrl);
		if (parameters != null && parameters.paymentMethods != null)
			meta.addProperty("payment_methods", parameters.paymentMethods);

		jsonObject.addProperty("order_meta", meta.getJson());

		HashMap<String, String> headers = new HashMap<String, String>();
		headers.put("Content-Type", "application/json; utf-8");
		headers.put("x-api-version", "2021-05-21");
		headers.put("x-client-id", appId);
		headers.put("x-client-secret", secretKey);

		URI uri = URI.create(appConfig.getCashfreeOrderUrl());

		CashFreeOrderDetails sign = new CashFreeOrderDetails();
		sign.orderId = orderId;

		JsonObject orderMetadata = new JsonObject(orderObj.getKeyValues());

		if (orderMetadata.getPropertyAsString(CashFreeOrder.cashFreeOrder) == null) {
			JsonObject response = HttpRequestUtil.post(uri, headers, jsonObject);

			if (response != null) {
				String cashFreeOrderId = response.getPropertyAsString(CashFreeOrder.orderId);
				String orderStatus = response.getPropertyAsString(CashFreeOrder.orderStatus);
				String orderToken = response.getPropertyAsString(CashFreeOrder.orderToken);

				JsonObject cashfreeOrder = new JsonObject();
				cashfreeOrder.addProperty(CashFreeOrder.orderId, cashFreeOrderId);
				cashfreeOrder.addProperty(CashFreeOrder.orderStatus, orderStatus);
				cashfreeOrder.addProperty(CashFreeOrder.orderToken, orderToken);

				orderMetadata.addProperty(CashFreeOrder.cashFreeOrder, cashfreeOrder.getJson());

				sign.cashFreeOrderId = cashFreeOrderId;
				sign.orderStatus = orderStatus;
				sign.orderToken = orderToken;

			}
		} else {
			ObjectNode cashFreeOrder = (ObjectNode) orderMetadata.getProperty(CashFreeOrder.cashFreeOrder);
			sign.cashFreeOrderId = cashFreeOrder.get(CashFreeOrder.orderId).asText();
			sign.orderToken = cashFreeOrder.get(CashFreeOrder.orderToken).asText();
			sign.orderStatus = cashFreeOrder.get(CashFreeOrder.orderStatus).asText();
		}

		orderObj.setKeyValues(orderMetadata);
		orderObj.save();

		return sign;
	}

	private JsonObject getPaymentDetails(Integer orderId) {
		String appId = appConfig.getCashfreeAppId();
		String secretKey = appConfig.getCashfreeSecretKey();

		HashMap<String, String> headers = new HashMap<String, String>();
		headers.put("Content-Type", "application/json; utf-8");
		headers.put("x-api-version", "2021-05-21");
		headers.put("x-client-id", appId);
		headers.put("x-client-secret", secretKey);

		URI uri = URI.create(appConfig.getCashfreeOrderUrl() + "/" + getOrderIdFromOriginalId(orderId));

		return HttpRequestUtil.get(uri, headers);

	}

	public void putOrderAddress(OrderTargetParameter1 order, UserAddressTargetParameter1 userAddress) {

		Order2 orderObj = getOrderDetails(resolveOrderId(order), new HashSet<Class<? extends DomainBase>>(
				Arrays.asList(OrderItem.class, User.class, Address.class, State.class)));

		if (!orderObj.getStatus().equals(OrderStatus.DRAFT) && !orderObj.getStatus().equals(OrderStatus.PENDING)) {
			throw new ValidationException(
					"Address can not be changed for the order(s) which are not in draft or pending state");
		}

		Address address = null;

		List<Address> addresses = orderObj.getUser().getAddresses();

		for (Address addr : addresses) {
			if (addr.getId().toString().equals(userAddress.id)) {
				address = addr;
				break;
			}
		}

		if (address == null)
			throw new ResourceNotFoundException("Address not found");

		JsonObject orderMetadata = new JsonObject(orderObj.getKeyValues());

		ObjectNode existingAddress = (ObjectNode) orderMetadata
				.getProperty(infinity.service.keys.Order.Address.address);

		if (existingAddress != null && existingAddress.get(infinity.service.keys.Order.Address.id).asText()
				.equals(address.getId().toString())) {
			return;
		}

		JsonObject addressKeyValue = new JsonObject();
		addressKeyValue.addProperty(infinity.service.keys.Order.Address.id, address.getId().toString());
		addressKeyValue.addProperty(infinity.service.keys.Order.Address.addressLine1, address.getAddressLine1());
		addressKeyValue.addProperty(infinity.service.keys.Order.Address.addressLine2, address.getAddressLine2());
		addressKeyValue.addProperty(infinity.service.keys.Order.Address.addressLine3, address.getAddressLine3());
		addressKeyValue.addProperty(infinity.service.keys.Order.Address.city, address.getCity());
		addressKeyValue.addProperty(infinity.service.keys.Order.Address.landmark, address.getLandmark());
		addressKeyValue.addProperty(infinity.service.keys.Order.Address.phoneNumber,
				address.getPhoneNumber().getFullPhoneNumber());
		addressKeyValue.addProperty(infinity.service.keys.Order.Address.name, address.getName());
		addressKeyValue.addProperty(infinity.service.keys.Order.Address.pinCode, address.getPinCode());
		addressKeyValue.addProperty(infinity.service.keys.Order.Address.state, address.getState().getName());

		orderMetadata.addOrUpdateProperty(infinity.service.keys.Order.Address.address, addressKeyValue.getJson());
		orderObj.setKeyValues(orderMetadata);
		orderObj.save();
	}

	private static FieldValue2[] convertIdsToFieldValues(String[] ids) {
		FieldValue2[] values = new FieldValue2[ids.length];

		for (int i = 0; i < ids.length; i++) {
			values[i] = FieldValue2.sqlBinary(UUID.fromString(ids[i]));
		}

		return values;
	}

	private static FieldValue2[] convertOrderItemStatusesToFieldValues(String[] statuses) {

		FieldValue2[] values = new FieldValue2[statuses.length];

		for (int i = 0; i < statuses.length; i++) {
			values[i] = FieldValue2
					.sqlInt(infinity.service.keys.OrderItem.ItemStatus.statusObjects.get(statuses[i]).getCode());
		}

		return values;
	}

	private static void applyFiltersToOrderQuery(Query2 q, OrderFilterParameter1 filters) {
		if (filters == null)
			return;

		q.whereClause(QueryOperation2.equal(FieldValue2.sqlInt(1), FieldValue2.sqlInt(1)));

//		if (filters.userIds != null && filters.userIds.length > 0)
//			q.whereAndClause(QueryOperation2.in(infinity.stone.security.schema.Login.Id, convertIdsToFieldValues(filters.userIds)));

		if (filters.sellerIds != null && filters.sellerIds.length > 0)
			q.whereAndClause(
					QueryOperation2.in(infinity.stone.product.schema.Product.SellerId, convertIdsToFieldValues(filters.sellerIds)));

		if (filters.orderItemStatuses != null && filters.orderItemStatuses.length > 0) {
			q.whereAndClause(QueryOperation2.in(infinity.stone.order.schema.OrderDetail.Status,
					convertOrderItemStatusesToFieldValues(filters.orderItemStatuses)));
		}

		if (filters.dateRange != null && filters.dateRange.startDate != null) {
			Date startDate = filters.dateRange.startDate;

			q.whereAndClause(QueryOperation2.ge(infinity.stone.order.schema.Order.OrderDate,
					FieldValue2.sqlDateTime(new Timestamp(startDate.getTime()))));
		}

		if (filters.dateRange != null && filters.dateRange.endDate != null) {
			Date endDate = filters.dateRange.endDate;

			q.whereAndClause(QueryOperation2.le(infinity.stone.order.schema.Order.OrderDate,
					FieldValue2.sqlDateTime(new Timestamp(endDate.getTime()))));
		}
	}

	static OrderItemDetail2[] getOrderItemsInternal(Integer page, Integer pageSize, OrderFilterParameter1 filters) {
		Query2 q = Query2.select(infinity.stone.order.schema.OrderDetail.tableName);
		q.innerJoin(infinity.stone.order.schema.Order.tableName, infinity.stone.order.schema.OrderDetail.OrderId, infinity.stone.order.schema.Order.Id);
		q.innerJoin(infinity.stone.user.schema.User.tableName, infinity.stone.order.schema.Order.UserId,
				infinity.stone.user.schema.User.Id);
		q.innerJoin(infinity.stone.product.schema.Product.tableName, infinity.stone.order.schema.OrderDetail.ProductId, infinity.stone.product.schema.Product.Id);
		q.innerJoin(infinity.stone.seller.schema.Seller.tableName, infinity.stone.product.schema.Product.SellerId,
				infinity.stone.seller.schema.Seller.Id);

		QueryFieldReference itemId = q.addField(infinity.stone.order.schema.OrderDetail.Id);
		QueryFieldReference totalPrice = q.addField(infinity.stone.order.schema.OrderDetail.TotalPrice);
		QueryFieldReference currencyId = q.addField(infinity.stone.order.schema.OrderDetail.CurrencyId);
		QueryFieldReference orderItemStatus = q.addField(infinity.stone.order.schema.OrderDetail.Status);

		QueryFieldReference id = q.addField(infinity.stone.order.schema.Order.Id);
		QueryFieldReference orderDate = q.addField(infinity.stone.order.schema.Order.OrderDate, OrderBy.DESCENDING);

		QueryFieldReference userId = q.addField(infinity.stone.user.schema.User.Id);
		QueryFieldReference userName = q.addField(infinity.stone.user.schema.User.Name);
		QueryFieldReference emailAddress = q.addField(infinity.stone.user.schema.User.EmailAddress);
		QueryFieldReference phoneNumber = q.addField(infinity.stone.user.schema.User.PhoneNumber);

		QueryFieldReference productName = q.addField(infinity.stone.product.schema.Product.Name);

		QueryFieldReference sellerId = q.addField(infinity.stone.seller.schema.Seller.Id);
//		QueryFieldReference sellerName = q.addField(infinity.stone.seller.schema.Seller.Name);
		QueryFieldReference storeName = q.addField(infinity.stone.seller.schema.Seller.StoreName);

		applyFiltersToOrderQuery(q, filters);

		q.setLimit(pageSize);
		q.setOffset(pageSize * (page - 1));

		List<HashMap<String, Field2>> result = q.executeQuery();

		OrderItemDetail2[] orders = new OrderItemDetail2[result.size()];

		for (int i = 0; i < result.size(); i++) {
			OrderItemDetail2 od = new OrderItemDetail2();
			od.id = itemId.getValue(result.get(i)).getUUID().toString();
			od.orderId = getOrderIdFromOriginalId(id.getValue(result.get(i)).getInteger());
			od.orderItemStatus = infinity.service.keys.OrderItem.ItemStatus.statuses
					.get(OrderItemStatus.get(orderItemStatus.getValue(result.get(i)).getInteger()));
			od.totalPrice = totalPrice.getValue(result.get(i)).getNumeric();
			od.currencyId = currencyId.getValue(result.get(i)).getString();

			od.orderDate = new Date(orderDate.getValue(result.get(i)).getDateTime().getTime());

			od.user = new UserDetails2();
			od.user.id = userId.getValue(result.get(i)).getUUID().toString();
			od.user.name = userName.getValue(result.get(i)).getString();
			od.user.emailAddress = emailAddress.getValue(result.get(i)).getString();
			od.user.phoneNumber = PhoneNumberUtil
					.mapToPhoneNumberReference1(new PhoneNumber(phoneNumber.getValue(result.get(i)).getString()));

			od.productName = productName.getValue(result.get(i)).getString();

			od.seller = new SellerReference3();
			od.seller.id = sellerId.getValue(result.get(i)).getUUID().toString();
//			od.seller.name = sellerName.getValue(result.get(i)).getString();
			od.seller.storeName = storeName.getValue(result.get(i)).getString();

			orders[i] = od;
		}

		return orders;
	}

	public OrderItemDetail2[] getOrderItems(Integer page, Integer pageSize, OrderFilterParameter1 filters) {
		if (page == null || pageSize == null)
			throw new InvalidInputException("page and pageSize are required");

		if (page == 0 || pageSize == 0)
			return new OrderItemDetail2[0];

		return getOrderItemsInternal(page, pageSize, filters);
	}

	private static String[] getStatusFilterForUser(String[] orderItemStatuses) {
		String[] statuses = { infinity.service.keys.OrderItem.ItemStatus.pending,
				infinity.service.keys.OrderItem.ItemStatus.confirmed,
				infinity.service.keys.OrderItem.ItemStatus.cancelled,
				infinity.service.keys.OrderItem.ItemStatus.readyForShip,
				infinity.service.keys.OrderItem.ItemStatus.shipped,
				infinity.service.keys.OrderItem.ItemStatus.inTransit,
				infinity.service.keys.OrderItem.ItemStatus.delivered };

		if (orderItemStatuses == null || orderItemStatuses.length == 0) {
			return statuses;
		}

		List<String> res = new ArrayList<String>();

		for (String status : orderItemStatuses) {
			if (!excludeOrderItemsWithStatusesForUser.contains(status)) {
				res.add(status);
			}
		}

		return res.toArray(new String[res.size()]);
	}

	public OrderItemDetail2[] getOrderItemsForUser(Integer page, Integer pageSize, UserTargetParameter1 user,
			OrderFilterParameter1 filters) {
		if (page == null || pageSize == null || user == null || user.id == null)
			throw new InvalidInputException("page, pageSize and userId are required");

		if (page == 0 || pageSize == 0)
			return new OrderItemDetail2[0];

		OrderFilterParameter1 orderFilters = new OrderFilterParameter1();
		if (filters != null) {
			orderFilters.sellerIds = filters.sellerIds;
			orderFilters.dateRange = filters.dateRange;
			orderFilters.orderItemStatuses = getStatusFilterForUser(filters.orderItemStatuses);
		}
		orderFilters.userIds = new String[1];
//		orderFilters.userIds[0] = userObj.getId().toString();

		return getOrderItemsInternal(page, pageSize, orderFilters);
	}

	private static String[] getStatusFilterForSeller(String[] orderItemStatuses) {
		String[] statuses = { infinity.service.keys.OrderItem.ItemStatus.confirmed,
				infinity.service.keys.OrderItem.ItemStatus.cancelled,
				infinity.service.keys.OrderItem.ItemStatus.delivered,
				infinity.service.keys.OrderItem.ItemStatus.inTransit,
				infinity.service.keys.OrderItem.ItemStatus.readyForShip,
				infinity.service.keys.OrderItem.ItemStatus.shipped };

		if (orderItemStatuses == null || orderItemStatuses.length == 0) {
			return statuses;
		}

		List<String> res = new ArrayList<String>();

		for (String status : orderItemStatuses) {
			if (!excludeOrderItemsWithStatusesForSeller.contains(status)) {
				res.add(status);
			}
		}

		return res.toArray(new String[res.size()]);
	}

	public OrderItemDetail2[] getOrderItemsForSeller(Integer page, Integer pageSize, SellerTargetParameter1 seller,
			OrderFilterParameter1 filters) {
		if (page == null || pageSize == null || seller == null || seller.id == null)
			throw new InvalidInputException("page, pageSize and sellerId are required");

		if (page == 0 || pageSize == 0)
			return new OrderItemDetail2[0];

		Seller sellerObj = ObjectLoader.loadObject(Seller.class, UUID.fromString(seller.id));

		OrderFilterParameter1 orderFilters = new OrderFilterParameter1();
		if (filters != null) {
			orderFilters.userIds = filters.userIds;
			orderFilters.dateRange = filters.dateRange;
			orderFilters.orderItemStatuses = getStatusFilterForSeller(filters.orderItemStatuses);
		}
		orderFilters.sellerIds = new String[1];
		orderFilters.sellerIds[0] = sellerObj.getId().toString();

		return getOrderItemsInternal(page, pageSize, orderFilters);
	}

	static UUID resolveOrderItemId(OrderItemTargetParameter1 orderItemTarget) {
		if (orderItemTarget == null || orderItemTarget.id == null)
			throw new InvalidInputException("Order Item Id is required");

		return UUID.fromString(orderItemTarget.id);
	}

	static SellerReference3 mapToSellerReference3(Seller seller) {
		SellerReference3 reference = new SellerReference3();
		reference.id = seller.getId().toString();
//		reference.name = seller.getName();
//		reference.storeName = seller.getName();
		return reference;
	}

	static OrderItemDetail3 mapToOrderDetail3(OrderItem orderItem) {
		OrderItemDetail3 details = new OrderItemDetail3();

		Order2 orderObj = orderItem.getOrder();

		JsonObject orderItemMetadata = new JsonObject(orderItem.getKeyValues());

		details.id = orderItem.getId().toString();
		details.orderId = getOrderIdFromOriginalId(orderObj.getId());
		details.orderItemStatus = infinity.service.keys.OrderItem.ItemStatus.statuses.get(orderItem.getStatus());
		details.orderDate = new Date(orderObj.getOrderDate().getTime());
		details.productName = orderItem.getProduct().getName();
		details.sellingPrice = orderItem.getPricePerUnit();
		details.quantity = orderItem.getQuantity();
		details.totalPrice = orderItem.getTotalPrice();
		details.originalPrice = orderItemMetadata
				.getPropertyAsNumeric(infinity.service.keys.OrderItem.originalPricePerUnit);
		details.currency = MappingUtils.mapToCurrencyReference1(orderItem.getCurrency());
		details.seller = mapToSellerReference3(orderItem.getProduct().getSeller());
//		details.user = UserService1.mapToUserDetails2(orderObj.getUser());
		AddressReference1 addr = getAddressReference1(orderObj.getKeyValues());
		details.billingAddress = addr;
		details.shipingAddress = addr;

		return details;
	}

	public OrderItemDetail3 getOrderItemDetails(OrderItemTargetParameter1 orderItemTarget) {

		UUID orderItemId = resolveOrderItemId(orderItemTarget);

		Query2 q = Query2.select(infinity.stone.order.schema.OrderDetail.tableName);
		q.innerJoin(infinity.stone.order.schema.Order.tableName, infinity.stone.order.schema.OrderDetail.OrderId, infinity.stone.order.schema.Order.Id);
//		q.innerJoin(infinity.stone.security.schema.Login.tableName, domain.sql.Order.UserId, infinity.stone.security.schema.Login.Id);
		q.innerJoin(infinity.stone.product.schema.Product.tableName, infinity.stone.order.schema.OrderDetail.ProductId, infinity.stone.product.schema.Product.Id);
		q.innerJoin(infinity.stone.seller.schema.Seller.tableName, infinity.stone.product.schema.Product.SellerId,
				infinity.stone.seller.schema.Seller.Id);

		q.addFields(new infinity.stone.order.schema.OrderDetail().getAllFields());
		q.addFields(new infinity.stone.order.schema.Order().getAllFields());
		q.addFields(new infinity.stone.security.schema.Login().getAllFields());
		q.addFields(new infinity.stone.product.schema.Product().getAllFields());
		q.addFields(new infinity.stone.seller.schema.Seller().getAllFields());

		q.whereClause(QueryOperation2.equal(infinity.stone.order.schema.OrderDetail.Id, FieldValue2.sqlBinary(orderItemId)));

		OrderItem orderItem = ObjectLoader.loadObject(OrderItem.class, orderItemId, q);

		return mapToOrderDetail3(orderItem);
	}

	public ProductUnitReference1 getProductUnitReferenceForOrderItem(OrderTargetParameter1 order, UUID orderItemId) {
		Integer orderId = resolveOrderId(order);

		Query2 orderQuery = getOrderDetailsQuery(new HashSet<Class<? extends DomainBase>>(
				Arrays.asList(OrderItem.class, Product2.class, ProductSKU2.class)));
		orderQuery.whereClause(QueryOperation2.equal(infinity.stone.order.schema.Order.Id, FieldValue2.sqlInt(orderId)));
		orderQuery.whereAndClause(QueryOperation2.equal(infinity.stone.order.schema.OrderDetail.Id, FieldValue2.sqlBinary(orderItemId)));

		Order2 orderObj = ObjectLoader.loadObject(Order2.class, orderId, orderQuery);
		List<OrderItem> orderItems = orderObj.getOrderItems();

		OrderItem orderItem = null;

		for (OrderItem oItem : orderItems) {
			if (oItem.getId().equals(orderItemId)) {
				orderItem = oItem;
			}
		}

		if (orderItem == null) {
			return null;
		}

		Product2 p = orderItem.getProduct();
		ProductSKU2 pSKU = orderItem.getProductSKU();

		ProductUnitReference1 reference = new ProductUnitReference1();

		reference.productId = p != null ? p.getId().toString() : null;
		reference.slug = p != null ? p.getSlug() : null;
		reference.skuId = pSKU != null ? pSKU.getId().toString() : null;
		reference.sku = pSKU != null ? pSKU.getSKU() : null;

		return reference;
	}

	public InvoiceDetails1 getInvoiceDetails(OrderTargetParameter1 order, UUID orderItemId) {
		Integer orderId = resolveOrderId(order);

		Query2 orderQuery = getOrderDetailsQuery(
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(OrderItem.class, Product2.class)));
		orderQuery.whereClause(QueryOperation2.equal(infinity.stone.order.schema.Order.Id, FieldValue2.sqlInt(orderId)));
		orderQuery.whereAndClause(QueryOperation2.equal(infinity.stone.order.schema.OrderDetail.Id, FieldValue2.sqlBinary(orderItemId)));

		Order2 orderObj = ObjectLoader.loadObject(Order2.class, orderId, orderQuery);
		List<OrderItem> orderItems = orderObj.getOrderItems();

		OrderItem orderItem = null;

		for (OrderItem oItem : orderItems) {
			if (oItem.getId().equals(orderItemId)) {
				orderItem = oItem;
			}
		}

		if (!orderItem.getStatus().equals(infinity.stone.order.domain.OrderItemStatus.DELIVERED)) {
			throw new InvalidInputException("Invoice not issued.");
		}

		JsonObject kv = new JsonObject(orderItem.getKeyValues());

		InvoiceDetails1 invoiceDetails = new InvoiceDetails1();
		invoiceDetails.invoiceNumber = orderObj.getId().toString()
				+ kv.getPropertyAsString(infinity.service.keys.OrderItem.itemSequence);
		invoiceDetails.invoiceDate = orderObj.getOrderDate();
		invoiceDetails.orderNumber = getOrderIdFromOriginalId(orderObj.getId());
		invoiceDetails.orderDate = orderObj.getOrderDate();
		invoiceDetails.customerAddress = getAddressReference1(orderObj.getKeyValues());
//		invoiceDetails.sellerAddress = SellerService1.getSellerAddress(orderItem.getProduct().getSeller());
		invoiceDetails.orderTotal = orderObj.getTotalPrice();
		invoiceDetails.currency = MappingUtils.mapToCurrencyReference1(orderObj.getCurrency());

		invoiceDetails.orderItems = new OrderItemDetail1[1];

		invoiceDetails.orderItems[0] = new OrderItemDetail1();
		invoiceDetails.orderItems[0].id = orderItem.getId().toString();
		invoiceDetails.orderItems[0].productName = orderItem.getProduct().getName();
		invoiceDetails.orderItems[0].quantity = orderItem.getQuantity();
		invoiceDetails.orderItems[0].sellingPrice = orderItem.getPricePerUnit();
		invoiceDetails.orderItems[0].totalPrice = orderItem.getTotalPrice();
		invoiceDetails.orderItems[0].originalPrice = kv
				.getPropertyAsNumeric(infinity.service.keys.OrderItem.originalPricePerUnit);
		invoiceDetails.orderItems[0].currency = infinity.service.utils.MappingUtils
				.mapToCurrencyReference1(orderItem.getCurrency());

		return invoiceDetails;
	}

}
