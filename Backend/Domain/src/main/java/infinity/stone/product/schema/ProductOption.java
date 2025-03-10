package infinity.stone.product.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.product.domain.ProductOption2;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class ProductOption extends SchemaBase {

	public static schema.definition.ProductOption table = new schema.definition.ProductOption();
	public static final String tableName = schema.definition.ProductOption.class.getSimpleName();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 ProductId = new Field2(tableName, "ProductId", FieldTypes.Binary);
	public static Field2 OptionName = new Field2(tableName, "OptionName", FieldTypes.String);

	@Override
	public String getTableName() {
		return ProductOption.tableName;
	}

	@Override
	public Object getTable() {
		return ProductOption.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) ProductOption.Id.clone(), (Field2) ProductOption.ProductId.clone(),
				(Field2) ProductOption.OptionName.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		ProductOption2 productOption = (ProductOption2) object;

		Field2 id = (Field2) ProductOption.Id.clone();
		Field2 productId = (Field2) ProductOption.ProductId.clone();
		Field2 optionName = (Field2) ProductOption.OptionName.clone();

		id.setValue(productOption.getId());
		productId.setValue(productOption.getProduct().getId());
		optionName.setValue(productOption.getOptionName());

		return new Field2[] { id, productId, optionName };
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) ProductOption.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		ProductOption2 productOption = (ProductOption2) object;
		return FieldValue2.sqlBinary(productOption.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return ProductOption2.getPersistedObject(queryResult, id);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return ProductOption2.getPersistedObject(queryResult);
	}

}
