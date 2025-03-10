package infinity.stone.product.domain;

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
import infinity.stone.domain.base.DomainObjectCollection;
import infinity.stone.domain.base.MappingType;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.domain.base.Relationship;
import infinity.stone.domain.base.RelationshipField;
import infinity.stone.domain.base.Relationships;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.product.schema.ProductSKU;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryOperation2;

@DomainObject(schemaType = infinity.stone.product.schema.ProductSKU.class)
@Relationships({ @Relationship(to = ProductSKUValue2.class, mapping = MappingType.ZERO_OR_MORE) })
public class ProductSKU2 extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private Product2 Product;

	@PropertyField
	private String SKU;

	@PropertyField
	private infinity.stone.domain.Currency Currency;

	@PropertyField
	private Double PricePerUnit;

	@PropertyField
	private Double SellingPricePerUnit;

	@PropertyField
	private Integer QuantityInStock;

	@PropertyField
	private JsonObject KeyValues;

	@RelationshipField
	private DomainObjectCollection<ProductSKUValue2> ProductSKUValues;

	private UUID ProductIdInternal;

	private String CurrencyIdInternal;

	public ProductSKU2() {
		super(new ProductSKU());
		this.Id = UUID.randomUUID();
		this.ProductSKUValues = new DomainObjectCollection<ProductSKUValue2>();
	}

	public DomainObjectCollection<ProductSKUValue2> getProductSKUValues() {
		if (!isPersisted()) {
			this.ProductSKUValues.setLoaded(true);
			return this.ProductSKUValues;
		}

		if (!this.ProductSKUValues.isLoaded()) {

			ProductSKUValue2[] ProductSKUValues = retreiveData(ProductSKUValue2.class);
			if (ProductSKUValues != null) {

				for (ProductSKUValue2 productSKUValue : ProductSKUValues) {
					if (productSKUValue.getProductSKU().equals(this)) {
						this.ProductSKUValues.add(productSKUValue);
					}
				}
				this.ProductSKUValues.setLoaded(true);
				return this.ProductSKUValues;
			}

			Query2 q = Query2.select(infinity.stone.product.schema.ProductSKUValue.tableName);
			q.innerJoin(infinity.stone.product.schema.ProductSKU.tableName, infinity.stone.product.schema.ProductSKUValue.ProductSKUId,
					infinity.stone.product.schema.ProductSKU.Id);
			q.whereClause(QueryOperation2.equal(infinity.stone.product.schema.ProductSKU.Id, FieldValue2.sqlBinary(getId())));
			q.addFields(new infinity.stone.product.schema.ProductSKU().getAllFields());
			q.addFields(new infinity.stone.product.schema.ProductSKUValue().getAllFields());
			ProductSKUValue2[] res = ObjectLoader.loadObjects(ProductSKUValue2.class, q);
			this.ProductSKUValues.addAll(Arrays.asList(res));
			this.ProductSKUValues.setLoaded(true);
		}

		return this.ProductSKUValues;
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		propertyChangeListener(infinity.stone.product.schema.ProductSKU.Id.getFieldName(), id);
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
		propertyChangeListener(infinity.stone.product.schema.ProductSKU.ProductId.getFieldName(), ProductIdInternal);
	}

	public String getSKU() {
		return SKU;
	}

	public void setSKU(String sku) {
		SKU = sku;
		propertyChangeListener(infinity.stone.product.schema.ProductSKU.Sku.getFieldName(), sku);
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
		CurrencyIdInternal = currency != null ? currency.getId() : null;
		Currency = currency;
		propertyChangeListener(infinity.stone.product.schema.ProductSKU.CurrencyId.getFieldName(), CurrencyIdInternal);
	}

	public Double getPricePerUnit() {
		return PricePerUnit;
	}

	public void setPricePerUnit(Double pricePerUnit) {
		PricePerUnit = pricePerUnit;
		propertyChangeListener(infinity.stone.product.schema.ProductSKU.PricePerUnit.getFieldName(), pricePerUnit);
	}

	public Double getSellingPricePerUnit() {
		return SellingPricePerUnit;
	}

	public void setSellingPricePerUnit(Double sellingPricePerUnit) {
		SellingPricePerUnit = sellingPricePerUnit;
		propertyChangeListener(infinity.stone.product.schema.ProductSKU.SellingPricePerUnit.getFieldName(), sellingPricePerUnit);
	}

	public Integer getQuantityInStock() {
		return QuantityInStock;
	}

	public void setQuantityInStock(Integer quantityInStock) {
		QuantityInStock = quantityInStock;
		propertyChangeListener(infinity.stone.product.schema.ProductSKU.QuantityInStock.getFieldName(), quantityInStock);
	}

	public String getKeyValues() {
		return KeyValues != null ? KeyValues.getJsonString() : null;
	}

	public void setKeyValues(JsonObject keyValues) {
		KeyValues = keyValues;
		propertyChangeListener(infinity.stone.product.schema.ProductSKU.KeyValues.getFieldName(), keyValues);
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

		ProductSKU2 productSKU = (ProductSKU2) obj;

		return productSKU.Id.equals(this.Id);
	}

	private void saveInternal() {
		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);
			super.save(this);

			this.ProductSKUValues.saveAll();

			if (wasAutoCommitFlagSet) {
				connection.commit();
				setPersisted(true);
				for (ProductSKUValue2 productSKUValue : this.getProductSKUValues()) {
					productSKUValue.setPersisted(true);
				}
				this.getProductSKUValues().setDirty(false);
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
			this.getProductSKUValues().deleteAll();
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

	public static ProductSKU2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		ProductSKU2 productSKU = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, ProductSKU.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				productSKU = new ProductSKU2();
				productSKU.Id = findField(queryResultFields, ProductSKU.Id).getUUID();
				productSKU.ProductIdInternal = findField(queryResultFields, ProductSKU.ProductId).getUUID();
				productSKU.SKU = findField(queryResultFields, ProductSKU.Sku).getString();
				productSKU.PricePerUnit = findField(queryResultFields, ProductSKU.PricePerUnit).getNumeric();
				productSKU.SellingPricePerUnit = findField(queryResultFields, ProductSKU.SellingPricePerUnit)
						.getNumeric();
				productSKU.CurrencyIdInternal = findField(queryResultFields, ProductSKU.CurrencyId).getString();
				productSKU.QuantityInStock = findField(queryResultFields, ProductSKU.QuantityInStock).getInteger();
				productSKU.KeyValues = new JsonObject(findField(queryResultFields, ProductSKU.KeyValues).getJson());

				productSKU.setData(queryResult);
				productSKU.setPersisted(true);

				return productSKU;

			}
		}

		return productSKU;
	}

	public static ProductSKU2 getPersistedObject(HashMap<String, Field2> queryResult) {
		ProductSKU2 productSKU = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, ProductSKU.Id);

		if (idField.getUUID() != null) {
			productSKU = new ProductSKU2();
			productSKU.Id = idField.getUUID();
			productSKU.ProductIdInternal = findField(queryResultFields, ProductSKU.ProductId).getUUID();
			productSKU.SKU = findField(queryResultFields, ProductSKU.Sku).getString();
			productSKU.PricePerUnit = findField(queryResultFields, ProductSKU.PricePerUnit).getNumeric();
			productSKU.SellingPricePerUnit = findField(queryResultFields, ProductSKU.SellingPricePerUnit).getNumeric();
			productSKU.CurrencyIdInternal = findField(queryResultFields, ProductSKU.CurrencyId).getString();
			productSKU.QuantityInStock = findField(queryResultFields, ProductSKU.QuantityInStock).getInteger();
			productSKU.KeyValues = new JsonObject(findField(queryResultFields, ProductSKU.KeyValues).getJson());

			productSKU.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));
			productSKU.setPersisted(true);

			return productSKU;

		}

		return productSKU;
	}

}
