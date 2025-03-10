package infinity.stone.security.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class Login extends SchemaBase {

	public static final schema.definition.Login table = new schema.definition.Login();
	public static final String tableName = table.getClass().getSimpleName();

	public static Field2 UserId = new Field2(tableName, "UserId", FieldTypes.Binary);
	public static Field2 LoginName = new Field2(tableName, "LoginName", FieldTypes.String);
	public static Field2 Password = new Field2(tableName, "Password", FieldTypes.String);
	public static Field2 Enabled = new Field2(tableName, "Enabled", FieldTypes.Boolean);

	@Override
	public String getTableName() {
		return Login.tableName;
	}

	@Override
	public Object getTable() {
		return Login.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) UserId.clone(), (Field2) LoginName.clone(), (Field2) Password.clone(),
				(Field2) Enabled.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		infinity.stone.security.domain.User login = (infinity.stone.security.domain.User) object;

		Field2 userId = (Field2) Login.UserId.clone();
		Field2 loginName = (Field2) Login.LoginName.clone();
		Field2 password = (Field2) Login.Password.clone();
		Field2 enabled = (Field2) Login.Enabled.clone();

		userId.setValue(login.getUser().getId());
		loginName.setValue(login.getLoginName());
		password.setValue(login.getPassword());
		enabled.setValue(login.getEnabled());

		return new Field2[] { userId, loginName, password, enabled };
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object userId) {
		return infinity.stone.security.domain.User.getPersistedObject(queryResult, userId);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return infinity.stone.security.domain.User.getPersistedObject(queryResult);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) Login.UserId.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		infinity.stone.security.domain.User user = (infinity.stone.security.domain.User) object;
		return FieldValue2.sqlBinary(user.getUser().getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		UUID userId = (UUID) object;
		return FieldValue2.sqlBinary(userId);
	}

}
