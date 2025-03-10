package infinity.stone.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.ViewSettings2;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class ViewSettings extends SchemaBase {

	public static schema.definition.ViewSettings table = new schema.definition.ViewSettings();
	public static final String tableName = table.getClass().getSimpleName();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 Name = new Field2(tableName, "Name", FieldTypes.String);
	public static Field2 UserId = new Field2(tableName, "UserId", FieldTypes.Binary);
	public static Field2 Enabled = new Field2(tableName, "Enabled", FieldTypes.Boolean);
	public static Field2 KeyValues = new Field2(tableName, "KeyValues", FieldTypes.Json);

	@Override
	public String getTableName() {
		return ViewSettings.tableName;
	}

	@Override
	public Object getTable() {
		return ViewSettings.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) ViewSettings.Id.clone(), (Field2) ViewSettings.Name.clone(),
				(Field2) ViewSettings.UserId.clone(), (Field2) ViewSettings.Enabled.clone(),
				(Field2) ViewSettings.KeyValues.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		ViewSettings2 viewSettings = (ViewSettings2) object;

		Field2 id = (Field2) ViewSettings.Id.clone();
		Field2 name = (Field2) ViewSettings.Name.clone();
		Field2 userId = (Field2) ViewSettings.UserId.clone();
		Field2 enabled = (Field2) ViewSettings.Enabled.clone();
		Field2 keyValues = (Field2) ViewSettings.KeyValues.clone();

		id.setValue(viewSettings.getId());
		name.setValue(viewSettings.getName());
		userId.setValue(viewSettings.getUserId());
		enabled.setValue(viewSettings.getEnabled());
		keyValues.setValue(viewSettings.getKeyValues());

		return new Field2[] { id, name, userId, enabled, keyValues };
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return ViewSettings2.getPersistedObject(queryResult);
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return ViewSettings2.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) ViewSettings.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		return FieldValue2.sqlBinary(((ViewSettings2) object).getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}
}
