package infinity.stone.order.domain;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.DomainObjectCollection;
import infinity.stone.domain.base.MappingType;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.domain.base.Relationship;
import infinity.stone.domain.base.RelationshipField;
import infinity.stone.domain.base.Relationships;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.order.schema.Order;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryOperation2;
import infinity.stone.user.domain.User;

@DomainObject(schemaType = infinity.stone.order.schema.Order.class)
@Relationships({ @Relationship(to = OrderItem.class, mapping = MappingType.ZERO_OR_MORE),
		@Relationship(to = User.class, mapping = MappingType.ONE_AND_ONE) })
public class Order2 extends DomainBase {

	@PropertyField
	private Integer Id;

	@PropertyField
	private User User;

	@PropertyField
	private Timestamp OrderDate;

	@PropertyField
	private Double TotalPrice;

	@PropertyField
	private infinity.stone.domain.Currency Currency;

	@PropertyField
	private String TransactionMethod;

	@PropertyField
	private String TransactionReference;

	@PropertyField
	private Boolean IsPayOnDelivery;

	@PropertyField
	private PaymentStatus PaymentStatus;

	@PropertyField
	private OrderStatus Status;

	@PropertyField
	private JsonObject KeyValues;

	@RelationshipField
	private DomainObjectCollection<OrderItem> orderItems;

	private UUID userIdInternal;

	private String CurrencyIdInternal;

	public Order2() {
		super(new Order());
		orderItems = new DomainObjectCollection<OrderItem>();
	}

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
		propertyChangeListener(Order.Id.getFieldName(), id);
	}

	public User getUser() {
		if (userIdInternal == null) {
			return null;
		}

		if (this.User != null) {
			return this.User;
		}

		this.User = infinity.stone.user.domain.User.getPersistedObject(super.getData(), userIdInternal);

		if (this.User == null) {
			this.User = ObjectLoader.loadObject(User.class, userIdInternal);
		}

		return this.User;
	}

	public void setUser(User user) {
		userIdInternal = user != null ? user.getId() : null;
		User = user;
		propertyChangeListener(Order.UserId.getFieldName(), userIdInternal);
	}

	public Timestamp getOrderDate() {
		return OrderDate;
	}

	public void setOrderDate(Timestamp orderDate) {
		OrderDate = orderDate;
		propertyChangeListener(Order.OrderDate.getFieldName(), orderDate);
	}

	public Double getTotalPrice() {
		return TotalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		TotalPrice = totalPrice;
		propertyChangeListener(Order.TotalPrice.getFieldName(), totalPrice);
	}

	public infinity.stone.domain.Currency getCurrency() {
		if (this.CurrencyIdInternal == null) {
			return null;
		}
		if (this.Currency != null) {
			return this.Currency;
		}
		return infinity.stone.domain.Currency.currencies.get(this.CurrencyIdInternal);
	}

	public void setCurrency(infinity.stone.domain.Currency currency) {
		this.CurrencyIdInternal = currency != null ? currency.getId() : null;
		this.Currency = currency;
		propertyChangeListener(Order.CurrencyId.getFieldName(), this.CurrencyIdInternal);
	}

	public String getTransactionMethod() {
		return TransactionMethod;
	}

	public void setTransactionMethod(String transactionMethod) {
		TransactionMethod = transactionMethod;
		propertyChangeListener(Order.TransactionMethod.getFieldName(), transactionMethod);
	}

	public String getTransactionReference() {
		return TransactionReference;
	}

	public void setTransactionReference(String transactionReference) {
		TransactionReference = transactionReference;
		propertyChangeListener(Order.TransactionReference.getFieldName(), transactionReference);
	}

	public Boolean getIsPayOnDelivery() {
		return IsPayOnDelivery;
	}

	public void setIsPayOnDelivery(Boolean isPayOnDelivery) {
		IsPayOnDelivery = isPayOnDelivery;
		propertyChangeListener(Order.IsPayOnDelivery.getFieldName(), isPayOnDelivery);
	}

	public PaymentStatus getPaymentStatus() {
		return PaymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		propertyChangeListener(Order.PaymentStatus.getFieldName(), paymentStatus.getCode());
		PaymentStatus = paymentStatus;
	}

	public OrderStatus getStatus() {
		return Status;
	}

	public void setStatus(OrderStatus status) {
		Status = status;
		propertyChangeListener(Order.Status.getFieldName(), status);
	}

	public String getKeyValues() {
		return KeyValues != null ? KeyValues.getJsonString() : null;
	}

	public void setKeyValues(JsonObject keyValues) {
		KeyValues = keyValues;
		propertyChangeListener(Order.KeyValues.getFieldName(), keyValues);
	}

	public DomainObjectCollection<OrderItem> getOrderItems() {
		if (!isPersisted()) {
			this.orderItems.setLoaded(true);
			return this.orderItems;
		}

		if (!this.orderItems.isLoaded()) {

			OrderItem[] orderItems = retreiveData(OrderItem.class);
			if (orderItems != null) {

				for (OrderItem item : orderItems) {
					if (item.getOrder().equals(this)) {
						this.orderItems.add(item);
					}
				}
				this.orderItems.setLoaded(true);
				return this.orderItems;
			}

			Query2 q = Query2.select(infinity.stone.order.schema.OrderDetail.tableName);
			q.innerJoin(infinity.stone.order.schema.Order.tableName, infinity.stone.order.schema.OrderDetail.OrderId, infinity.stone.order.schema.Order.Id);
			q.addFields(new infinity.stone.order.schema.Order().getAllFields());
			q.addFields(new infinity.stone.order.schema.OrderDetail().getAllFields());
			q.whereClause(QueryOperation2.equal(infinity.stone.order.schema.Order.Id, FieldValue2.sqlInt(getId())));
			OrderItem[] res = ObjectLoader.loadObjects(OrderItem.class, q);
			this.orderItems.addAll(Arrays.asList(res));
			this.orderItems.setLoaded(true);
		}

		return this.orderItems;
	}

	public void setDefaultValues() {
		setStatus(OrderStatus.DRAFT);
		setPaymentStatus(infinity.stone.order.domain.PaymentStatus.UNPAID);
		setCurrency(infinity.stone.domain.Currency.getBasecurrency());
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		Order2 order = (Order2) obj;

		return this.Id.equals(order.Id);
	}

	@Override
	public int hashCode() {
		return this.Id;
	}

	private void saveInternal() {
		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);
			super.save(this);

			if (!isPersisted()) {
				this.setId(getGeneratedKey());
				for (OrderItem item : this.orderItems) {
					item.setOrder(this);
				}
			}

			this.orderItems.saveAll();

			if (wasAutoCommitFlagSet) {
				connection.commit();
				setPersisted(true);
				for (OrderItem item : this.orderItems) {
					item.setPersisted(true);
				}
				this.orderItems.setDirty(false);
				connection.close();
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private void deleteInternal() {
		if (!isPersisted())
			return;

		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();

		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);
			this.getOrderItems().deleteAll();
			super.delete(this);
			if (wasAutoCommitFlagSet) {
				connection.commit();
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void save() {
		saveInternal();
	}

	@Override
	public void delete() {
		deleteInternal();
	}

	public static Order2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		Order2 order = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, Order.Id);

			if (idField.getInteger() != null && idField.getInteger().equals(id)) {
				order = new Order2();
				order.Id = (Integer) id;
				order.userIdInternal = findField(queryResultFields, Order.UserId).getUUID();
				order.OrderDate = findField(queryResultFields, Order.OrderDate).getDateTime();
				order.TotalPrice = findField(queryResultFields, Order.TotalPrice).getNumeric();
				order.CurrencyIdInternal = findField(queryResultFields, Order.CurrencyId).getString();
				order.TransactionMethod = findField(queryResultFields, Order.TransactionMethod).getString();
				order.TransactionReference = findField(queryResultFields, Order.TransactionReference).getString();
				order.IsPayOnDelivery = findField(queryResultFields, Order.IsPayOnDelivery).getBool();
				order.PaymentStatus = infinity.stone.order.domain.PaymentStatus
						.get(findField(queryResultFields, Order.PaymentStatus).getInteger());
				order.Status = OrderStatus.get(findField(queryResultFields, Order.Status).getInteger());
				order.KeyValues = new JsonObject(findField(queryResultFields, Order.KeyValues).getJson());

				order.setPersisted(true);
				order.setData(queryResult);

				return order;
			}
		}

		return order;
	}

	public static Order2 getPersistedObject(HashMap<String, Field2> queryResult) {
		Order2 order = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, Order.Id);

		if (idField.getInteger() != null) {
			order = new Order2();
			order.Id = idField.getInteger();
			order.userIdInternal = findField(queryResultFields, Order.UserId).getUUID();
			order.OrderDate = findField(queryResultFields, Order.OrderDate).getDateTime();
			order.TotalPrice = findField(queryResultFields, Order.TotalPrice).getNumeric();
			order.CurrencyIdInternal = findField(queryResultFields, Order.CurrencyId).getString();
			order.TransactionMethod = findField(queryResultFields, Order.TransactionMethod).getString();
			order.TransactionReference = findField(queryResultFields, Order.TransactionReference).getString();
			order.IsPayOnDelivery = findField(queryResultFields, Order.IsPayOnDelivery).getBool();
			order.PaymentStatus = infinity.stone.order.domain.PaymentStatus
					.get(findField(queryResultFields, Order.PaymentStatus).getInteger());
			order.Status = OrderStatus.get(findField(queryResultFields, Order.Status).getInteger());
			order.KeyValues = new JsonObject(findField(queryResultFields, Order.KeyValues).getJson());

			order.setPersisted(true);
			order.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return order;
		}

		return order;
	}

}
