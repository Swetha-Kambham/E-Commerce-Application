package infinity.stone.seller.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class Seller extends SchemaBase {

	public static final String tableName = schema.definition.Seller.class.getSimpleName();
	public static schema.definition.Seller table = new schema.definition.Seller();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 StoreName = new Field2(tableName, "StoreName", FieldTypes.String);
	public static Field2 GstNumber = new Field2(tableName, "GSTNumber", FieldTypes.String);
	public static Field2 Description = new Field2(tableName, "Description", FieldTypes.String);
	public static Field2 KeyValues = new Field2(tableName, "KeyValues", FieldTypes.Json);

	@Override
	public String getTableName() {
		return Seller.tableName;
	}

	@Override
	public Object getTable() {
		return Seller.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) Seller.Id.clone(), (Field2) Seller.StoreName.clone(),
				(Field2) Seller.GstNumber.clone(), (Field2) Seller.Description.clone(),
				(Field2) Seller.KeyValues.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		infinity.stone.seller.domain.Seller seller = (infinity.stone.seller.domain.Seller) object;

		Field2 id = (Field2) Seller.Id.clone();
		Field2 storeName = (Field2) Seller.StoreName.clone();
		Field2 gstNumber = (Field2) Seller.GstNumber.clone();
		Field2 description = (Field2) Seller.Description.clone();
		Field2 keyValues = (Field2) Seller.KeyValues.clone();

		id.setValue(seller.getId());
		storeName.setValue(seller.getStoreName());
		gstNumber.setValue(seller.getGSTNumber());
		description.setValue(seller.getDescription());
		keyValues.setValue(seller.getKeyValues());

		return new Field2[] { id, storeName, gstNumber, description, keyValues };
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return infinity.stone.seller.domain.Seller.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) Seller.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		infinity.stone.seller.domain.Seller seller = (infinity.stone.seller.domain.Seller) object;
		return FieldValue2.sqlBinary(seller.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return infinity.stone.seller.domain.Seller.getPersistedObject(queryResult);
	}

}
