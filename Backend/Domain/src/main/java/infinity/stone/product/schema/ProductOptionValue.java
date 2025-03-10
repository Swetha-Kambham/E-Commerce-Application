package infinity.stone.product.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.product.domain.ProductOptionValue2;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class ProductOptionValue extends SchemaBase {

	public static schema.definition.ProductOptionValue table = new schema.definition.ProductOptionValue();
	public static final String tableName = schema.definition.ProductOptionValue.class.getSimpleName();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 ProductOptionId = new Field2(tableName, "ProductOptionId", FieldTypes.Binary);
	public static Field2 ValueName = new Field2(tableName, "ValueName", FieldTypes.String);

	@Override
	public String getTableName() {
		return ProductOptionValue.tableName;
	}

	@Override
	public Object getTable() {
		return ProductOptionValue.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) ProductOptionValue.Id.clone(),
				(Field2) ProductOptionValue.ProductOptionId.clone(), (Field2) ProductOptionValue.ValueName.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		ProductOptionValue2 productOptionValue = (ProductOptionValue2) object;

		Field2 id = (Field2) ProductOptionValue.Id.clone();
		Field2 productOptionId = (Field2) ProductOptionValue.ProductOptionId.clone();
		Field2 valueName = (Field2) ProductOptionValue.ValueName.clone();

		id.setValue(productOptionValue.getId());
		productOptionId.setValue(productOptionValue.getProductOption().getId());
		valueName.setValue(productOptionValue.getValueName());

		return new Field2[] { id, productOptionId, valueName };
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return ProductOptionValue2.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) ProductOptionValue.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		ProductOptionValue2 productOptionValue = (ProductOptionValue2) object;
		return FieldValue2.sqlBinary(productOptionValue.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return ProductOptionValue2.getPersistedObject(queryResult);
	}

}
