package infinity.stone.order.domain;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.Currency;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.MappingType;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.domain.base.Relationship;
import infinity.stone.domain.base.Relationships;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.order.schema.OrderDetail;
import infinity.stone.product.domain.Product2;
import infinity.stone.product.domain.ProductSKU2;
import infinity.stone.sql.helper.Field2;

@DomainObject(schemaType = infinity.stone.order.schema.OrderDetail.class)
@Relationships({ @Relationship(to = Order2.class, mapping = MappingType.ONE_AND_ONE),
		@Relationship(to = Product2.class, mapping = MappingType.ONE_AND_ONE),
		@Relationship(to = ProductSKU2.class, mapping = MappingType.ONE_AND_ONE) })
public class OrderItem extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private Order2 Order;

	@PropertyField
	private Product2 Product;

	@PropertyField
	private ProductSKU2 ProductSKU;

	@PropertyField
	private Integer Quantity;

	@PropertyField
	private Double PricePerUnit;

	@PropertyField
	private Double TotalPrice;

	@PropertyField
	private infinity.stone.domain.Currency Currency;

	@PropertyField
	private OrderItemStatus Status;

	@PropertyField
	private JsonObject KeyValues;

	private Integer OrderIdInternal;

	private UUID ProductIdInternal;

	private UUID ProductSKUIdInternal;

	private String CurrencyIdInternal;

	public OrderItem() {
		super(new OrderDetail());
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		propertyChangeListener(OrderDetail.Id.getFieldName(), id);
	}

	public Order2 getOrder() {
		if (OrderIdInternal == null) {
			return null;
		}

		if (this.Order != null) {
			return this.Order;
		}

		this.Order = Order2.getPersistedObject(super.getData(), OrderIdInternal);

		if (this.Order == null) {
			this.Order = ObjectLoader.loadObject(Order2.class, OrderIdInternal);
		}

		return this.Order;
	}

	public void setOrder(Order2 order) {
		OrderIdInternal = order != null ? order.getId() : null;
		Order = order;
		propertyChangeListener(OrderDetail.OrderId.getFieldName(), OrderIdInternal);
	}

	public Product2 getProduct() {
		if (ProductIdInternal == null) {
			return null;
		}

		if (this.Product != null) {
			return this.Product;
		}

		this.Product = Product2.getPersistedObject(super.getData(), ProductIdInternal);

		if (this.Product == null) {
			this.Product = ObjectLoader.loadObject(Product2.class, ProductIdInternal);
		}

		return this.Product;
	}

	public void setProduct(Product2 product) {
		ProductIdInternal = product != null ? product.getId() : null;
		Product = product;
		propertyChangeListener(OrderDetail.ProductId.getFieldName(), ProductIdInternal);
	}

	public ProductSKU2 getProductSKU() {
		if (ProductSKUIdInternal == null) {
			return null;
		}

		if (this.ProductSKU != null) {
			return this.ProductSKU;
		}

		this.ProductSKU = ProductSKU2.getPersistedObject(super.getData(), ProductSKUIdInternal);

		if (this.ProductSKU == null) {
			this.ProductSKU = ObjectLoader.loadObject(ProductSKU2.class, ProductSKUIdInternal);
		}

		return this.ProductSKU;
	}

	public void setProductSKU(ProductSKU2 productSKU) {
		ProductSKUIdInternal = productSKU != null ? productSKU.getId() : null;
		ProductSKU = productSKU;
		propertyChangeListener(OrderDetail.ProductSKUId.getFieldName(), ProductSKUIdInternal);
	}

	public Integer getQuantity() {
		return Quantity;
	}

	public void setQuantity(Integer quantity) {
		Quantity = quantity;
		propertyChangeListener(OrderDetail.Quantity.getFieldName(), quantity);
	}

	public Double getPricePerUnit() {
		return PricePerUnit;
	}

	public void setPricePerUnit(Double pricePerUnit) {
		PricePerUnit = pricePerUnit;
		propertyChangeListener(OrderDetail.PricePerUnit.getFieldName(), pricePerUnit);
	}

	public Double getTotalPrice() {
		return TotalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		TotalPrice = totalPrice;
		propertyChangeListener(OrderDetail.TotalPrice.getFieldName(), totalPrice);
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

	public void setCurrency(Currency currency) {
		this.CurrencyIdInternal = currency != null ? currency.getId() : null;
		this.Currency = currency;
		propertyChangeListener(OrderDetail.CurrencyId.getFieldName(), CurrencyIdInternal);
	}

	public OrderItemStatus getStatus() {
		return Status;
	}

	public void setStatus(OrderItemStatus status) {
		Status = status;
		propertyChangeListener(OrderDetail.Status.getFieldName(), status);
	}

	public String getKeyValues() {
		return KeyValues != null ? KeyValues.getJsonString() : null;
	}

	public void setKeyValues(JsonObject keyValues) {
		KeyValues = keyValues;
		propertyChangeListener(OrderDetail.KeyValues.getFieldName(), keyValues);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		OrderItem orderItem = (OrderItem) obj;

		return this.Id.equals(orderItem.Id);
	}

	public void setDefaultValues() {
		setId(UUID.randomUUID());
		setStatus(OrderItemStatus.DRAFT);
	}

	@Override
	public int hashCode() {
		return this.Id.hashCode();
	}

	private void setObjectAsPersisted() {
		super.setPersisted(true);
	}

	private void saveInternal() {
		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);
			super.save(this);
			if (this.ProductSKU != null) {
				this.ProductSKU.save();
			}

			if (wasAutoCommitFlagSet) {
				connection.commit();
				super.setPersisted(true);
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private void deleteInternal() {
		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);
			super.delete(this);
			connection.commit();
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
		setObjectAsPersisted();
	}

	@Override
	public void delete() {
		deleteInternal();
	}

	public static OrderItem getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		OrderItem orderItem = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, OrderDetail.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				orderItem = new OrderItem();

				orderItem.Id = (UUID) id;
				orderItem.OrderIdInternal = findField(queryResultFields, OrderDetail.OrderId).getInteger();
				orderItem.ProductIdInternal = findField(queryResultFields, OrderDetail.ProductId).getUUID();
				orderItem.ProductSKUIdInternal = findField(queryResultFields, OrderDetail.ProductSKUId).getUUID();
				orderItem.Quantity = findField(queryResultFields, OrderDetail.Quantity).getInteger();
				orderItem.PricePerUnit = findField(queryResultFields, OrderDetail.PricePerUnit).getNumeric();
				orderItem.TotalPrice = findField(queryResultFields, OrderDetail.TotalPrice).getNumeric();
				orderItem.CurrencyIdInternal = findField(queryResultFields, OrderDetail.CurrencyId).getString();
				orderItem.Status = OrderItemStatus.get(findField(queryResultFields, OrderDetail.Status).getInteger());
				orderItem.KeyValues = new JsonObject(findField(queryResultFields, OrderDetail.KeyValues).getJson());

				orderItem.setPersisted(true);
				orderItem.setData(queryResult);

				return orderItem;
			}
		}

		return orderItem;
	}

	public static OrderItem getPersistedObject(HashMap<String, Field2> queryResult) {
		OrderItem orderItem = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, OrderDetail.Id);

		if (idField.getUUID() != null) {
			orderItem = new OrderItem();

			orderItem.Id = idField.getUUID();
			orderItem.OrderIdInternal = findField(queryResultFields, OrderDetail.OrderId).getInteger();
			orderItem.ProductIdInternal = findField(queryResultFields, OrderDetail.ProductId).getUUID();
			orderItem.ProductSKUIdInternal = findField(queryResultFields, OrderDetail.ProductSKUId).getUUID();
			orderItem.Quantity = findField(queryResultFields, OrderDetail.Quantity).getInteger();
			orderItem.PricePerUnit = findField(queryResultFields, OrderDetail.PricePerUnit).getNumeric();
			orderItem.TotalPrice = findField(queryResultFields, OrderDetail.TotalPrice).getNumeric();
			orderItem.CurrencyIdInternal = findField(queryResultFields, OrderDetail.CurrencyId).getString();
			orderItem.Status = OrderItemStatus.get(findField(queryResultFields, OrderDetail.Status).getInteger());
			orderItem.KeyValues = new JsonObject(findField(queryResultFields, OrderDetail.KeyValues).getJson());

			orderItem.setPersisted(true);
			orderItem.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return orderItem;
		}

		return orderItem;
	}

}
