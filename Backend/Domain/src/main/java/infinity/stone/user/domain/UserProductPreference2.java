package infinity.stone.user.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.domain.exception.ValidationException;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.product.domain.Product2;
import infinity.stone.product.domain.ProductSKU2;
import infinity.stone.sql.helper.Field2;

@DomainObject(schemaType = infinity.stone.user.schema.UserProductPreference.class)
public class UserProductPreference2 extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private User User;

	@PropertyField
	private Product2 Product;

	@PropertyField
	private ProductSKU2 ProductSKU;

	@PropertyField
	private Integer Quantity;

	@PropertyField
	private UserProductPreferenceTypes Type;

	@PropertyField
	private infinity.stone.domain.Currency Currency;

	@PropertyField
	private Double PricePerUnit;

	private UUID userIdInternal;

	private String CurrencyIdInternal;

	private UUID ProductIdInternal;

	private UUID ProductSkuIdInternal;

	public UserProductPreference2() {
		super(new infinity.stone.user.schema.UserProductPreference());
		this.Id = UUID.randomUUID();
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		propertyChangeListener(infinity.stone.user.schema.UserProductPreference.Id.getFieldName(), id);
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
		this.User = user;
		propertyChangeListener(infinity.stone.user.schema.UserProductPreference.UserId.getFieldName(), userIdInternal);
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
		propertyChangeListener(infinity.stone.user.schema.UserProductPreference.ProductId.getFieldName(),
				ProductIdInternal);
	}

	public ProductSKU2 getProductSku() {
		if (ProductSkuIdInternal == null) {
			return null;
		}

		if (this.ProductSKU != null) {
			return this.ProductSKU;
		}

		this.ProductSKU = ProductSKU2.getPersistedObject(super.getData(), ProductSkuIdInternal);

		if (this.ProductSKU == null) {
			this.ProductSKU = ObjectLoader.loadObject(ProductSKU2.class, ProductSkuIdInternal);
		}

		return this.ProductSKU;
	}

	public void setProductSKU(ProductSKU2 productSKU) {
		ProductSkuIdInternal = productSKU != null ? productSKU.getId() : null;
		ProductSKU = productSKU;
		propertyChangeListener(infinity.stone.user.schema.UserProductPreference.ProductSkuId.getFieldName(),
				ProductSkuIdInternal);

		if (productSKU != null) {
			setPricePerUnit(productSKU.getPricePerUnit());
		}

	}

	public Integer getQuantity() {
		return Quantity;
	}

	public void setQuantity(Integer quantity) {
		Quantity = quantity;
		propertyChangeListener(infinity.stone.user.schema.UserProductPreference.Quantity.getFieldName(), quantity);
	}

	public UserProductPreferenceTypes getType() {
		return Type;
	}

	public void setType(UserProductPreferenceTypes type) {
		Type = type;
		propertyChangeListener(infinity.stone.user.schema.UserProductPreference.Type.getFieldName(), type);
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
		propertyChangeListener(infinity.stone.user.schema.UserProductPreference.CurrencyId.getFieldName(),
				this.CurrencyIdInternal);
	}

	public Double getPricePerUnit() {
		return PricePerUnit;
	}

	private void setPricePerUnit(Double pricePerUnit) {
		PricePerUnit = pricePerUnit;
		propertyChangeListener(infinity.stone.user.schema.UserProductPreference.PricePerUnit.getFieldName(),
				pricePerUnit);
	}

	public void validate() {
		if (Type.equals(UserProductPreferenceTypes.CART) && Quantity > getProductSku().getQuantityInStock()) {
			throw new ValidationException("Requested quantity for product(s) can not be added to preference");
		}
	}

	@Override
	public void save() {
		validate();
		super.save(this);
	}

	@Override
	public void delete() {
		super.delete(this);
	}

	@Override
	public int hashCode() {
		return this.Id.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null || obj.getClass() != this.getClass())
			return false;

		UserProductPreference2 userProductPreference = (UserProductPreference2) obj;

		return userProductPreference.Id.equals(this.Id);
	}

	public static UserProductPreference2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		UserProductPreference2 productPreference = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.user.schema.UserProductPreference.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				productPreference = new UserProductPreference2();

				productPreference.Id = (UUID) id;
				productPreference.userIdInternal = findField(queryResultFields,
						infinity.stone.user.schema.UserProductPreference.UserId).getUUID();
				productPreference.ProductIdInternal = findField(queryResultFields,
						infinity.stone.user.schema.UserProductPreference.ProductId).getUUID();
				productPreference.ProductSkuIdInternal = findField(queryResultFields,
						infinity.stone.user.schema.UserProductPreference.ProductSkuId).getUUID();
				productPreference.PricePerUnit = findField(queryResultFields,
						infinity.stone.user.schema.UserProductPreference.PricePerUnit).getNumeric();
				productPreference.CurrencyIdInternal = findField(queryResultFields,
						infinity.stone.user.schema.UserProductPreference.CurrencyId).getString();
				productPreference.Quantity = findField(queryResultFields,
						infinity.stone.user.schema.UserProductPreference.Quantity).getInteger();
				productPreference.Type = UserProductPreferenceTypes
						.get(findField(queryResultFields, infinity.stone.user.schema.UserProductPreference.Type)
								.getInteger());

				productPreference.setPersisted(true);
				productPreference.setData(queryResult);

				return productPreference;
			}
		}

		return productPreference;
	}

	public static UserProductPreference2 getPersistedObject(HashMap<String, Field2> queryResult) {
		UserProductPreference2 productPreference = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.user.schema.UserProductPreference.Id);

		if (idField.getUUID() != null) {
			productPreference = new UserProductPreference2();

			productPreference.Id = findField(queryResultFields, infinity.stone.user.schema.UserProductPreference.Id)
					.getUUID();
			productPreference.userIdInternal = findField(queryResultFields,
					infinity.stone.user.schema.UserProductPreference.UserId).getUUID();
			productPreference.ProductIdInternal = findField(queryResultFields,
					infinity.stone.user.schema.UserProductPreference.ProductId).getUUID();
			productPreference.ProductSkuIdInternal = findField(queryResultFields,
					infinity.stone.user.schema.UserProductPreference.ProductSkuId).getUUID();
			productPreference.PricePerUnit = findField(queryResultFields,
					infinity.stone.user.schema.UserProductPreference.PricePerUnit).getNumeric();
			productPreference.CurrencyIdInternal = findField(queryResultFields,
					infinity.stone.user.schema.UserProductPreference.CurrencyId).getString();
			productPreference.Quantity = findField(queryResultFields,
					infinity.stone.user.schema.UserProductPreference.Quantity).getInteger();
			productPreference.Type = UserProductPreferenceTypes.get(
					findField(queryResultFields, infinity.stone.user.schema.UserProductPreference.Type).getInteger());

			productPreference.setPersisted(true);
			productPreference.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return productPreference;
		}

		return productPreference;
	}

}
