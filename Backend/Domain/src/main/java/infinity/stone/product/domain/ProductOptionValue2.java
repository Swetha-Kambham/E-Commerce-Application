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

@DomainObject(schemaType = infinity.stone.product.schema.ProductOptionValue.class)
public class ProductOptionValue2 extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private ProductOption2 ProductOption;

	@PropertyField
	private String ValueName;

	private UUID ProductOptionIdInternal;

	public ProductOptionValue2() {
		super(new infinity.stone.product.schema.ProductOptionValue());
		this.Id = UUID.randomUUID();
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		propertyChangeListener(infinity.stone.product.schema.ProductOptionValue.Id.getFieldName(), id);
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
		propertyChangeListener(infinity.stone.product.schema.ProductOptionValue.ProductOptionId.getFieldName(), ProductOptionIdInternal);
	}

	public String getValueName() {
		return ValueName;
	}

	public void setValueName(String valueName) {
		ValueName = valueName;
		propertyChangeListener(infinity.stone.product.schema.ProductOptionValue.ValueName.getFieldName(), valueName);
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

		ProductOptionValue2 productOptionValue2 = (ProductOptionValue2) obj;

		return productOptionValue2.Id.equals(this.Id);
	}

	@Override
	public void save() {
		super.save(this);
	}

	@Override
	public void delete() {
		super.delete(this);
	}

	public static ProductOptionValue2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		ProductOptionValue2 productOptionValue = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.product.schema.ProductOptionValue.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {

				productOptionValue = new ProductOptionValue2();

				productOptionValue.Id = (UUID) (id);
				productOptionValue.ProductOptionIdInternal = findField(queryResultFields,
						infinity.stone.product.schema.ProductOptionValue.ProductOptionId).getUUID();
				productOptionValue.ValueName = findField(queryResultFields, infinity.stone.product.schema.ProductOptionValue.ValueName)
						.getString();

				productOptionValue.setPersisted(true);
				productOptionValue.setData(queryResult);

				return productOptionValue;
			}
		}

		return productOptionValue;
	}

	public static ProductOptionValue2 getPersistedObject(HashMap<String, Field2> queryResult) {
		ProductOptionValue2 productOptionValue = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.product.schema.ProductOptionValue.Id);

		if (idField.getUUID() != null) {

			productOptionValue = new ProductOptionValue2();

			productOptionValue.Id = idField.getUUID();
			productOptionValue.ProductOptionIdInternal = findField(queryResultFields,
					infinity.stone.product.schema.ProductOptionValue.ProductOptionId).getUUID();
			productOptionValue.ValueName = findField(queryResultFields, infinity.stone.product.schema.ProductOptionValue.ValueName)
					.getString();

			productOptionValue.setPersisted(true);
			productOptionValue.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return productOptionValue;
		}

		return productOptionValue;
	}

}
