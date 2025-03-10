package infinity.stone.schema.base;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;

public abstract class SchemaBase {

	public abstract String getTableName();

	public abstract Object getTable();

	public abstract Field2[] getAllFields();

	public abstract Field2[] mapObjectToSchemaFields(DomainBase object);

	public abstract Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult);

	public abstract Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id);

	public abstract Field2 getPrimaryKeyField();

	public abstract FieldValue2 getPrimaryKeyFieldValue(DomainBase object);

	public abstract FieldValue2 getPrimaryKeyFieldValue(Object object);

	protected static Field2 findField(Collection<Field2> resultFields, Field2 fieldToFind) {
		for (Field2 f : resultFields) {
			if (f.equals(fieldToFind)) {
				return f;
			}
		}
		return fieldToFind;
	}

	protected static Field2 findField(Collection<Field2> resultFields, Field2 fieldToFind, Object valueToMatch) {
		for (Field2 f : resultFields) {
			if (f.equals(fieldToFind) && f.getValue().equals(valueToMatch)) {
				return f;
			}
		}
		return fieldToFind;
	}

}
