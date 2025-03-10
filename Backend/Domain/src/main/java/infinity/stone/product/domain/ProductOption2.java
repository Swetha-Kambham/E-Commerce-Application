package infinity.stone.product.domain;

import java.sql.Connection;
import java.sql.SQLException;
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
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryOperation2;

@DomainObject(schemaType = infinity.stone.product.schema.ProductOption.class)
@Relationships({ @Relationship(to = ProductOption2.class, mapping = MappingType.ZERO_OR_MORE) })
public class ProductOption2 extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private Product2 Product;

	@PropertyField
	private String OptionName;

	@RelationshipField
	private DomainObjectCollection<ProductOptionValue2> ProductOptionValues;

	private UUID ProductIdInternal;

	public ProductOption2() {
		super(new infinity.stone.product.schema.ProductOption());
		this.Id = UUID.randomUUID();
		this.ProductOptionValues = new DomainObjectCollection<ProductOptionValue2>();
	}

	public DomainObjectCollection<ProductOptionValue2> getProductOptionValues() {
		if (!isPersisted()) {
			this.ProductOptionValues.setLoaded(true);
			return this.ProductOptionValues;
		}

		if (!this.ProductOptionValues.isLoaded()) {

			ProductOptionValue2[] ProductOptionValues = retreiveData(ProductOptionValue2.class);
			if (ProductOptionValues != null) {

				for (ProductOptionValue2 productOptionValue : ProductOptionValues) {
					if (productOptionValue.getProductOption().equals(this)) {
						this.ProductOptionValues.add(productOptionValue);
					}
				}
				this.ProductOptionValues.setLoaded(true);
				return this.ProductOptionValues;
			}

			Query2 q = Query2.select(infinity.stone.product.schema.ProductOptionValue.tableName);
			q.innerJoin(infinity.stone.product.schema.ProductOption.tableName, infinity.stone.product.schema.ProductOptionValue.ProductOptionId,
					infinity.stone.product.schema.ProductOption.Id);
			q.whereClause(QueryOperation2.equal(infinity.stone.product.schema.ProductOption.Id, FieldValue2.sqlBinary(getId())));
			q.addFields(new infinity.stone.product.schema.ProductOptionValue().getAllFields());
			q.addFields(new infinity.stone.product.schema.ProductOption().getAllFields());
			ProductOptionValue2[] res = ObjectLoader.loadObjects(ProductOptionValue2.class, q);
			this.ProductOptionValues.addAll(Arrays.asList(res));
			this.ProductOptionValues.setLoaded(true);
		}

		return this.ProductOptionValues;
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		propertyChangeListener(infinity.stone.product.schema.ProductOption.Id.getFieldName(), id);
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
		propertyChangeListener(infinity.stone.product.schema.ProductOption.ProductId.getFieldName(), ProductIdInternal);
	}

	public String getOptionName() {
		return OptionName;
	}

	public void setOptionName(String optionName) {
		OptionName = optionName;
		propertyChangeListener(infinity.stone.product.schema.ProductOption.OptionName.getFieldName(), optionName);
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

		ProductOption2 productOption = (ProductOption2) obj;

		return productOption.Id.equals(this.Id);
	}

	private void saveInternal() {
		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);
			super.save(this);

			this.ProductOptionValues.saveAll();

			if (wasAutoCommitFlagSet) {
				connection.commit();
				setPersisted(true);
				for (ProductOptionValue2 productOptionValue : this.getProductOptionValues()) {
					productOptionValue.setPersisted(true);
				}
				this.ProductOptionValues.setDirty(false);
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

	public static ProductOption2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		ProductOption2 productOption = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.product.schema.ProductOption.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				productOption = new ProductOption2();
				productOption.Id = (UUID) id;
				productOption.ProductIdInternal = findField(queryResultFields, infinity.stone.product.schema.ProductOption.ProductId)
						.getUUID();
				productOption.OptionName = findField(queryResultFields, infinity.stone.product.schema.ProductOption.OptionName)
						.getString();

				productOption.setPersisted(true);
				productOption.setData(queryResult);

				return productOption;
			}
		}

		return productOption;
	}

	public static ProductOption2 getPersistedObject(HashMap<String, Field2> queryResult) {
		ProductOption2 productOption = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.product.schema.ProductOption.Id);

		if (idField.getUUID() != null) {
			productOption = new ProductOption2();
			productOption.Id = idField.getUUID();
			productOption.ProductIdInternal = findField(queryResultFields, infinity.stone.product.schema.ProductOption.ProductId)
					.getUUID();
			productOption.OptionName = findField(queryResultFields, infinity.stone.product.schema.ProductOption.OptionName).getString();

			productOption.setPersisted(true);
			productOption.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));
			return productOption;
		}

		return productOption;
	}

}
