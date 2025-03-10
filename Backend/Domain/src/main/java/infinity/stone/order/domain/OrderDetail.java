package infinity.stone.order.domain;

import java.util.UUID;

import infinity.stone.domain.exception.ValidationException;
import infinity.stone.helper.domain.JsonObject;

public class OrderDetail extends infinity.stone.order.schema.OrderDetail {

	private UUID id, productId, productSKUId;
	private Integer orderId, quantity;
	private Double pricePerUnit, totalPrice;
	private String currencyId;
	private OrderItemStatus status;

	private JsonObject keyValues = new JsonObject();

	public OrderDetail() {
		this.id = UUID.randomUUID();
		this.status = OrderItemStatus.DRAFT;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public UUID getProductId() {
		return productId;
	}

	public void setProductId(UUID productId) {
		this.productId = productId;
	}

	public UUID getProductSKUId() {
		return productSKUId;
	}

	public void setProductSKUId(UUID productSKUId) {
		this.productSKUId = productSKUId;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getPricePerUnit() {
		return pricePerUnit;
	}

	public void setPricePerUnit(Double pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getCurrencyId() {
		return currencyId;
	}

	public void setCurrencyId(String currencyId) {
		this.currencyId = currencyId;
	}

	public OrderItemStatus getStatus() {
		return status;
	}

	public void setStatus(OrderItemStatus status) {
		this.status = status;
	}

	public JsonObject getKeyValues() {
		return keyValues;
	}

	public void validate() {
		if (this.pricePerUnit == null)
			throw new ValidationException("Price Per Unit can not be null");
		if (this.quantity == null)
			throw new ValidationException("Quantity can not be null");
		if (this.currencyId == null)
			throw new ValidationException("currencyId can not be null");
		if (this.productId == null)
			throw new ValidationException("productId can not be null");
		if (this.productSKUId == null)
			throw new ValidationException("productSKUId can not be null");
		if (this.totalPrice == null)
			throw new ValidationException("totalPrice can not be null");
	}

}
