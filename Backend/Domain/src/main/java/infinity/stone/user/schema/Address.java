package infinity.stone.user.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class Address extends SchemaBase {

	public static final schema.definition.Address table = new schema.definition.Address();
	public static final String tableName = table.getClass().getSimpleName();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 UserId = new Field2(tableName, "UserId", FieldTypes.Binary);
	public static Field2 Name = new Field2(tableName, "Name", FieldTypes.String);
	public static Field2 PhoneNumber = new Field2(tableName, "PhoneNumber", FieldTypes.String);
	public static Field2 AddressLine1 = new Field2(tableName, "AddressLine1", FieldTypes.String);
	public static Field2 AddressLine2 = new Field2(tableName, "AddressLine2", FieldTypes.String);
	public static Field2 AddressLine3 = new Field2(tableName, "AddressLine3", FieldTypes.String);
	public static Field2 Landmark = new Field2(tableName, "Landmark", FieldTypes.String);
	public static Field2 City = new Field2(tableName, "City", FieldTypes.String);
	public static Field2 StateId = new Field2(tableName, "StateId", FieldTypes.Integer);
	public static Field2 PinCode = new Field2(tableName, "PinCode", FieldTypes.String);
	public static Field2 Enabled = new Field2(tableName, "Enabled", FieldTypes.Boolean);

	@Override
	public String getTableName() {
		return Address.tableName;
	}

	@Override
	public Object getTable() {
		return Address.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) Id.clone(), (Field2) UserId.clone(), (Field2) Name.clone(),
				(Field2) PhoneNumber.clone(), (Field2) AddressLine1.clone(), (Field2) AddressLine2.clone(),
				(Field2) AddressLine3.clone(), (Field2) Landmark.clone(), (Field2) City.clone(),
				(Field2) StateId.clone(), (Field2) PinCode.clone(), (Field2) Enabled.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		infinity.stone.user.domain.Address address = (infinity.stone.user.domain.Address) object;

		Field2 id = (Field2) Address.Id.clone();
		Field2 userId = (Field2) Address.UserId.clone();
		Field2 name = (Field2) Address.Name.clone();
		Field2 phoneNumber = (Field2) Address.PhoneNumber.clone();
		Field2 addressLine1 = (Field2) Address.AddressLine1.clone();
		Field2 addressLine2 = (Field2) Address.AddressLine2.clone();
		Field2 addressLine3 = (Field2) Address.AddressLine3.clone();
		Field2 landmark = (Field2) Address.Landmark.clone();
		Field2 city = (Field2) Address.City.clone();
		Field2 stateId = (Field2) Address.StateId.clone();
		Field2 pinCode = (Field2) Address.PinCode.clone();
		Field2 enabled = (Field2) Address.Enabled.clone();

		id.setValue(address.getId());
		userId.setValue(address.getUser().getId());
		name.setValue(address.getName());
		phoneNumber.setValue(address.getPhoneNumber().getFullPhoneNumber());
		addressLine1.setValue(address.getAddressLine1());
		addressLine2.setValue(address.getAddressLine2());
		addressLine3.setValue(address.getAddressLine3());
		landmark.setValue(address.getLandmark());
		city.setValue(address.getCity());
		stateId.setValue(address.getState().getId());
		pinCode.setValue(address.getPinCode());
		enabled.setValue(address.getEnabled());

		return new Field2[] { id, userId, name, phoneNumber, addressLine1, addressLine2, addressLine3, landmark, city,
				stateId, pinCode, enabled };
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return infinity.stone.user.domain.Address.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) Address.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		infinity.stone.user.domain.Address userAddress = (infinity.stone.user.domain.Address) object;
		return FieldValue2.sqlBinary(userAddress.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		UUID id = (UUID) object;
		return FieldValue2.sqlBinary(id);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return infinity.stone.user.domain.Address.getPersistedObject(queryResult);
	}

}
