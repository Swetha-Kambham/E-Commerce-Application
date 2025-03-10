package infinity.stone.product.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.product.domain.ProductSKUValue2;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class ProductSKUValue extends SchemaBase {

	public static final String tableName = schema.definition.ProductSKUValue.class.getSimpleName();
	public static schema.definition.ProductSKUValue table = new schema.definition.ProductSKUValue();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 ProductSKUId = new Field2(tableName, "ProductSKUId", FieldTypes.Binary);
	public static Field2 ProductOptionId = new Field2(tableName, "ProductOptionId", FieldTypes.Binary);
	public static Field2 ProductOptionValueId = new Field2(tableName, "ProductOptionValueId", FieldTypes.Binary);

	@Override
	public String getTableName() {
		return ProductSKUValue.tableName;
	}

	@Override
	public Object getTable() {
		return ProductSKUValue.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) ProductSKUValue.Id.clone(), (Field2) ProductSKUValue.ProductSKUId.clone(),
				(Field2) ProductSKUValue.ProductOptionId.clone(),
				(Field2) ProductSKUValue.ProductOptionValueId.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		ProductSKUValue2 skuValue = (ProductSKUValue2) object;

		Field2 id = (Field2) ProductSKUValue.Id.clone();
		Field2 productSKUId = (Field2) ProductSKUValue.ProductSKUId.clone();
		Field2 productOptionId = (Field2) ProductSKUValue.ProductOptionId.clone();
		Field2 productOptionValueId = (Field2) ProductSKUValue.ProductOptionValueId.clone();

		id.setValue(skuValue.getId());
		productSKUId.setValue(skuValue.getProductSKU().getId());
		productOptionId.setValue(skuValue.getProductOption().getId());
		productOptionValueId.setValue(skuValue.getProductOptionValue().getId());

		return new Field2[] { id, productSKUId, productOptionId, productOptionValueId };
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return ProductSKUValue2.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) ProductSKUValue.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		ProductSKUValue2 skuValue = (ProductSKUValue2) object;
		return FieldValue2.sqlBinary(skuValue.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return ProductSKUValue2.getPersistedObject(queryResult);
	}

}
