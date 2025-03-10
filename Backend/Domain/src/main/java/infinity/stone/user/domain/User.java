package infinity.stone.user.domain;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.DomainObjectCollection;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.domain.base.RelationshipField;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryOperation2;

@DomainObject(schemaType = infinity.stone.user.schema.User.class)
public class User extends DomainBase implements IUser {

	@PropertyField
	private UUID Id;

	@PropertyField
	private String Name;

	@PropertyField
	private String EmailAddress;

	@PropertyField
	private infinity.stone.helper.domain.PhoneNumber PhoneNumber;

	@PropertyField
	private infinity.stone.user.domain.Role Role;

	@PropertyField
	private JsonObject KeyValues;

	@RelationshipField
	private DomainObjectCollection<Address> addresses;

	public User() {
		super(new infinity.stone.user.schema.User());
		setDefaults();
	}

	private void setDefaults() {
		UUID id = UUID.randomUUID();
		super.setObjectId(id);
		this.setId(id);
		addresses = new DomainObjectCollection<Address>();
	}

	@Override
	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		super.setObjectId(id);
		propertyChangeListener(infinity.stone.user.schema.User.Id.getFieldName(), id);
	}

	@Override
	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
		propertyChangeListener(infinity.stone.user.schema.User.Name.getFieldName(), name);
	}

	@Override
	public String getEmailAddress() {
		return EmailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		EmailAddress = emailAddress;
		propertyChangeListener(infinity.stone.user.schema.User.EmailAddress.getFieldName(), emailAddress);
	}

	@Override
	public infinity.stone.helper.domain.PhoneNumber getPhoneNumber() {
		return PhoneNumber;
	}

	public void setPhoneNumber(infinity.stone.helper.domain.PhoneNumber phoneNumber) {
		PhoneNumber = phoneNumber;
		propertyChangeListener(infinity.stone.user.schema.User.PhoneNumber.getFieldName(), phoneNumber);
	}

	public String getKeyValues() {
		return KeyValues != null ? KeyValues.getJsonString() : null;
	}

	public void setKeyValues(JsonObject keyValues) {
		KeyValues = keyValues;
		propertyChangeListener(infinity.stone.user.schema.User.KeyValues.getFieldName(), keyValues);
	}

	@Override
	public infinity.stone.user.domain.Role getRole() {
		return Role;
	}

	public void setRole(infinity.stone.user.domain.Role role) {
		Role = role;
		propertyChangeListener(infinity.stone.user.schema.User.Role.getFieldName(), role);
	}

	public DomainObjectCollection<Address> getAddresses() {
		if (!isPersisted()) {
			this.addresses.setLoaded(true);
			return this.addresses;
		}

		if (!this.addresses.isLoaded()) {

			Address[] addresses = retreiveData(Address.class);
			if (addresses != null) {

				for (Address address : addresses) {
					if (address.getUser().equals(this)) {
						this.addresses.add(address);
					}
				}
				this.addresses.setLoaded(true);
				return this.addresses;
			}

			Query2 q = Query2.select(infinity.stone.user.schema.Address.tableName);
			q.innerJoin(infinity.stone.user.schema.User.tableName, infinity.stone.user.schema.Address.UserId,
					infinity.stone.user.schema.User.Id);
			q.addFields(new infinity.stone.user.schema.User().getAllFields());
			q.addFields(new infinity.stone.user.schema.Address().getAllFields());
			q.whereClause(QueryOperation2.equal(infinity.stone.user.schema.User.Id, FieldValue2.sqlBinary(Id)));
			Address[] res = ObjectLoader.loadObjects(Address.class, q);
			this.addresses.addAll(Arrays.asList(res));
			this.addresses.setLoaded(true);
		}

		return this.addresses;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		User user = (User) obj;

		return this.Id.equals(user.Id);
	}

	@Override
	public int hashCode() {
		return Id.hashCode();
	}

	private void saveInternal() {
		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);

			super.save(this);
			addresses.saveAll();
			if (wasAutoCommitFlagSet) {
				connection.commit();
				setPersisted(true);
				connection.close();
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private void deleteInternal() {
		if (!isPersisted())
			return;

		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();

		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);
			this.addresses.deleteAll();
			super.delete(this);
			if (wasAutoCommitFlagSet) {
				connection.commit();
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void save() {
		saveInternal();
	}

	@Override
	public void delete() {
		deleteInternal();
	}

	public static User getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		User userObj = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.user.schema.User.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				userObj = new User();
				userObj.setObjectId((UUID) id);

				userObj.Id = (UUID) id;
				userObj.Name = findField(queryResultFields, infinity.stone.user.schema.User.Name).getString();
				userObj.PhoneNumber = new infinity.stone.helper.domain.PhoneNumber(
						findField(queryResultFields, infinity.stone.user.schema.User.PhoneNumber).getString());
				userObj.EmailAddress = findField(queryResultFields, infinity.stone.user.schema.User.EmailAddress)
						.getString();
				userObj.Role = infinity.stone.user.domain.Role
						.get(findField(queryResultFields, infinity.stone.user.schema.User.Role).getInteger());
				userObj.KeyValues = new JsonObject(
						findField(queryResultFields, infinity.stone.user.schema.User.KeyValues).getJson());

				userObj.setPersisted(true);
				userObj.setData(queryResult);

				return userObj;
			}
		}

		return userObj;
	}

	public static User getPersistedObject(HashMap<String, Field2> queryResult) {
		User userObj = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.user.schema.User.Id);

		if (idField.getUUID() != null) {
			userObj = new User();
			userObj.setObjectId(idField.getUUID());

			userObj.Id = idField.getUUID();
			userObj.Name = findField(queryResultFields, infinity.stone.user.schema.User.Name).getString();
			userObj.PhoneNumber = new infinity.stone.helper.domain.PhoneNumber(
					findField(queryResultFields, infinity.stone.user.schema.User.PhoneNumber).getString());
			userObj.EmailAddress = findField(queryResultFields, infinity.stone.user.schema.User.EmailAddress)
					.getString();
			userObj.Role = infinity.stone.user.domain.Role
					.get(findField(queryResultFields, infinity.stone.user.schema.User.Role).getInteger());
			userObj.KeyValues = new JsonObject(
					findField(queryResultFields, infinity.stone.user.schema.User.KeyValues).getJson());

			userObj.setPersisted(true);
			userObj.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return userObj;
		}

		return userObj;
	}

}
