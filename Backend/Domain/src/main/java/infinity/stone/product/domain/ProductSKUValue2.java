package infinity.stone.product.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;

@DomainObject(schemaType = infinity.stone.product.schema.ProductSKUValue.class)
public class ProductSKUValue2 extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private ProductSKU2 ProductSKU;

	@PropertyField
	private ProductOption2 ProductOption;

	@PropertyField
	private ProductOptionValue2 ProductOptionValue;

	private UUID ProductSKUIdInternal;

	private UUID ProductOptionIdInternal;

	private UUID ProductOptionValueIdInternal;

	public ProductSKUValue2() {
		super(new infinity.stone.product.schema.ProductSKUValue());
		this.Id = UUID.randomUUID();
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		this.Id = id;
		propertyChangeListener(infinity.stone.product.schema.ProductSKUValue.Id.getFieldName(), id);
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
		propertyChangeListener(infinity.stone.product.schema.ProductSKUValue.ProductSKUId.getFieldName(), ProductSKUIdInternal);
	}

	public ProductOption2 getProductOption() {
		if (ProductOptionIdInternal == null) {
			return null;
		}

		if (this.ProductOption != null) {
			return this.ProductOption;
		}

		this.ProductOption = ProductOption2.getPersistedObject(super.getData(), ProductOptionIdInternal);

		if (this.ProductOption == null) {
			this.ProductOption = ObjectLoader.loadObject(ProductOption2.class, ProductOptionIdInternal);
		}

		return this.ProductOption;
	}

	public void setProductOption(ProductOption2 productOption) {
		ProductOptionIdInternal = productOption.getId() != null ? productOption.getId() : null;
		ProductOption = productOption;
		propertyChangeListener(infinity.stone.product.schema.ProductSKUValue.ProductOptionId.getFieldName(), ProductOptionIdInternal);
	}

	public ProductOptionValue2 getProductOptionValue() {
		if (ProductOptionValueIdInternal == null) {
			return null;
		}

		if (this.ProductOptionValue != null) {
			return this.ProductOptionValue;
		}

		this.ProductOptionValue = ProductOptionValue2.getPersistedObject(super.getData(), ProductOptionValueIdInternal);

		if (this.ProductOptionValue == null) {
			this.ProductOptionValue = ObjectLoader.loadObject(ProductOptionValue2.class, ProductOptionValueIdInternal);
		}

		return this.ProductOptionValue;
	}

	public void setProductOptionValue(ProductOptionValue2 productOptionValue) {
		ProductOptionValueIdInternal = productOptionValue.getId() != null ? productOptionValue.getId() : null;
		ProductOptionValue = productOptionValue;
		propertyChangeListener(infinity.stone.product.schema.ProductSKUValue.ProductOptionValueId.getFieldName(),
				ProductOptionValueIdInternal);
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

		ProductSKUValue2 productSKUValue = (ProductSKUValue2) obj;

		return productSKUValue.Id.equals(this.Id);
	}

	@Override
	public void save() {
		super.save(this);
	}

	@Override
	public void delete() {
		super.delete(this);
	}

	public static ProductSKUValue2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		ProductSKUValue2 productSKUValue = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.product.schema.ProductSKUValue.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {

				productSKUValue = new ProductSKUValue2();
				productSKUValue.Id = (UUID) id;
				productSKUValue.ProductSKUIdInternal = findField(queryResultFields,
						infinity.stone.product.schema.ProductSKUValue.ProductSKUId).getUUID();
				productSKUValue.ProductOptionIdInternal = findField(queryResultFields,
						infinity.stone.product.schema.ProductSKUValue.ProductOptionId).getUUID();

				productSKUValue.ProductOptionValueIdInternal = findField(queryResultFields,
						infinity.stone.product.schema.ProductSKUValue.ProductOptionValueId).getUUID();

				productSKUValue.setData(queryResult);
				productSKUValue.setPersisted(true);

				return productSKUValue;
			}
		}

		return productSKUValue;
	}

	public static ProductSKUValue2 getPersistedObject(HashMap<String, Field2> queryResult) {
		ProductSKUValue2 productSKUValue = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.product.schema.ProductSKUValue.Id);

		if (idField.getUUID() != null) {

			productSKUValue = new ProductSKUValue2();
			productSKUValue.Id = idField.getUUID();
			productSKUValue.ProductSKUIdInternal = findField(queryResultFields, infinity.stone.product.schema.ProductSKUValue.ProductSKUId)
					.getUUID();
			productSKUValue.ProductOptionIdInternal = findField(queryResultFields,
					infinity.stone.product.schema.ProductSKUValue.ProductOptionId).getUUID();

			productSKUValue.ProductOptionValueIdInternal = findField(queryResultFields,
					infinity.stone.product.schema.ProductSKUValue.ProductOptionValueId).getUUID();

			productSKUValue.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));
			productSKUValue.setPersisted(true);

			return productSKUValue;
		}

		return productSKUValue;
	}

}
