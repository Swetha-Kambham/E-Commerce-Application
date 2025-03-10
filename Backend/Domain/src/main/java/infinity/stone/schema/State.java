package infinity.stone.schema;

import java.util.HashMap;
import java.util.List;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class State extends SchemaBase {
	public static final schema.definition.State table = new schema.definition.State();
	public static final String tableName = table.getClass().getSimpleName();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Integer);
	public static Field2 Name = new Field2(tableName, "Name", FieldTypes.String);

	@Override
	public String getTableName() {
		return State.tableName;
	}

	@Override
	public Object getTable() {
		return State.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) State.Id.clone(), (Field2) State.Name.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {

		infinity.stone.domain.State state = (infinity.stone.domain.State) object;

		Field2 id = (Field2) State.Id.clone();
		Field2 name = (Field2) State.Name.clone();

		id.setValue(state.getId());
		name.setValue(state.getName());

		return new Field2[] { id, name };
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return infinity.stone.domain.State.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) State.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		infinity.stone.domain.State state = (infinity.stone.domain.State) object;
		return FieldValue2.sqlInt(state.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlInt((Integer) object);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return infinity.stone.domain.State.getPersistedObject(queryResult);
	}
}
