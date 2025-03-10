package infinity.stone.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.ProductView2;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class ProductView extends SchemaBase {

	public static final String tableName = schema.definition.ProductView.class.getSimpleName();
	public static schema.definition.ProductView table = new schema.definition.ProductView();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 Name = new Field2(tableName, "Name", FieldTypes.String);
	public static Field2 Description = new Field2(tableName, "Description", FieldTypes.String);
	public static Field2 Summary = new Field2(tableName, "Summary", FieldTypes.String);
	public static Field2 Priority = new Field2(tableName, "Priority", FieldTypes.Integer);
	public static Field2 Enabled = new Field2(tableName, "Enabled", FieldTypes.Boolean);
	public static Field2 KeyValues = new Field2(tableName, "KeyValues", FieldTypes.Json);

	@Override
	public String getTableName() {
		return ProductView.tableName;
	}

	@Override
	public Object getTable() {
		return ProductView.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) ProductView.Id.clone(), (Field2) ProductView.Name.clone(),
				(Field2) ProductView.Description.clone(), (Field2) ProductView.Summary.clone(),
				(Field2) ProductView.Priority.clone(), (Field2) ProductView.Enabled.clone(),
				(Field2) ProductView.KeyValues.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		ProductView2 productView = (ProductView2) object;

		Field2 id = (Field2) ProductView.Id.clone();
		Field2 name = (Field2) ProductView.Name.clone();
		Field2 description = (Field2) ProductView.Description.clone();
		Field2 summary = (Field2) ProductView.Summary.clone();
		Field2 priority = (Field2) ProductView.Priority.clone();
		Field2 enabled = (Field2) ProductView.Enabled.clone();
		Field2 keyValues = (Field2) ProductView.KeyValues.clone();

		id.setValue(productView.getId());
		name.setValue(productView.getName());
		description.setValue(productView.getDescription());
		summary.setValue(productView.getSummary());
		priority.setValue(productView.getPriority());
		enabled.setValue(productView.getEnabled());
		keyValues.setValue(productView.getKeyValues());

		return new Field2[] { id, name, description, summary, priority, enabled, keyValues };
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return ProductView2.getPersistedObject(queryResult);
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return ProductView2.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) ProductView.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		return FieldValue2.sqlBinary(((ProductView2) object).getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

}
