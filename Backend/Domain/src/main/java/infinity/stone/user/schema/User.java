package infinity.stone.user.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class User extends SchemaBase {

	public static final schema.definition.User table = new schema.definition.User();
	public static final String tableName = table.getClass().getSimpleName();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 Name = new Field2(tableName, "Name", FieldTypes.String);
	public static Field2 EmailAddress = new Field2(tableName, "EmailAddress", FieldTypes.String);
	public static Field2 PhoneNumber = new Field2(tableName, "PhoneNumber", FieldTypes.String);
	public static Field2 Role = new Field2(tableName, "Role", FieldTypes.Integer);
	public static Field2 KeyValues = new Field2(tableName, "KeyValues", FieldTypes.Json);

	@Override
	public String getTableName() {
		return User.tableName;
	}

	@Override
	public Object getTable() {
		return User.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) User.Id.clone(), (Field2) User.Name.clone(), (Field2) User.EmailAddress.clone(),
				(Field2) User.PhoneNumber.clone(), (Field2) User.Role.clone(), (Field2) KeyValues.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {

		infinity.stone.user.domain.User user = (infinity.stone.user.domain.User) object;

		Field2 id = (Field2) User.Id.clone();
		Field2 name = (Field2) User.Name.clone();
		Field2 phoneNumber = (Field2) User.PhoneNumber.clone();
		Field2 emailAddress = (Field2) User.EmailAddress.clone();
		Field2 role = (Field2) User.Role.clone();
		Field2 keyValues = (Field2) User.KeyValues.clone();

		id.setValue(user.getId());
		name.setValue(user.getName());
		phoneNumber.setValue(user.getPhoneNumber().getFullPhoneNumber());
		emailAddress.setValue(user.getEmailAddress());
		role.setValue(user.getRole().getId());
		keyValues.setValue(user.getKeyValues());

		return new Field2[] { id, name, phoneNumber, emailAddress, role, keyValues };
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return infinity.stone.user.domain.User.getPersistedObject(queryResult);
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return infinity.stone.user.domain.User.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		infinity.stone.user.domain.User userInfo = (infinity.stone.user.domain.User) object;
		return FieldValue2.sqlBinary(userInfo.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

}
