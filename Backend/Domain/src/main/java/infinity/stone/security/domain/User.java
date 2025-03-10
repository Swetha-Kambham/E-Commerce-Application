package infinity.stone.security.domain;

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
import infinity.stone.domain.base.MappingType;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.domain.base.Relationship;
import infinity.stone.domain.base.Relationships;
import infinity.stone.domain.util.PasswordEncoder;
import infinity.stone.helper.domain.PhoneNumber;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryOperation2;

@DomainObject(schemaType = infinity.stone.security.schema.Login.class)
@Relationships({ @Relationship(to = infinity.stone.user.domain.User.class, mapping = MappingType.ONE_AND_ONE) })
public class User extends DomainBase {

	@PropertyField
	private infinity.stone.user.domain.User User;

	@PropertyField
	private String LoginName;

	@PropertyField
	private String Password;

	@PropertyField
	private Boolean Enabled;

	private UUID userIdInternal;

	private User() {
		super(new infinity.stone.security.schema.Login());
	}

	public User(infinity.stone.user.domain.User user) {
		super(new infinity.stone.security.schema.Login());
		setDefaults(user);
	}

	private void setDefaults(infinity.stone.user.domain.User user) {
		if (user != null) {
			this.setUser(user);
			this.setLoginName(user.getEmailAddress());
			this.setEnabled(true);
		}
	}

	public String getLoginName() {
		return LoginName;
	}

	private void setLoginName(String loginName) {
		LoginName = loginName;
		propertyChangeListener(infinity.stone.security.schema.Login.LoginName.getFieldName(), loginName);
	}

	public String getPassword() {
		return Password;
	}

	public void setPassword(String rawPassword) {
		Password = PasswordEncoder.hashPassword(rawPassword);
		propertyChangeListener(infinity.stone.security.schema.Login.Password.getFieldName(), this.Password);
	}

	public infinity.stone.user.domain.User getUser() {
		if (userIdInternal == null) {
			return null;
		}

		if (this.User != null) {
			return this.User;
		}

		this.User = infinity.stone.user.domain.User.getPersistedObject(super.getData(), userIdInternal);

		if (this.User == null) {
			this.User = ObjectLoader.loadObject(infinity.stone.user.domain.User.class, userIdInternal);
		}

		return this.User;
	}

	public void setUser(infinity.stone.user.domain.User user) {
		userIdInternal = user != null ? user.getId() : null;
		User = user;
		propertyChangeListener(infinity.stone.security.schema.Login.UserId.getFieldName(), userIdInternal);
	}

	public Boolean getEnabled() {
		return Enabled;
	}

	public void setEnabled(Boolean enabled) {
		Enabled = enabled;
		propertyChangeListener(infinity.stone.security.schema.Login.Enabled.getFieldName(), enabled);
	}

	private void saveInternal() {
		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);

			super.save(this);

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
			super.delete(this);
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

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		User user = (User) obj;

		return this.userIdInternal.equals(user.userIdInternal);
	}

	@Override
	public int hashCode() {
		return this.userIdInternal.hashCode();
	}

	public static User getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		User user = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.security.schema.Login.UserId);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				user = new User();
				user.userIdInternal = (UUID) id;
				user.LoginName = findField(queryResultFields, infinity.stone.security.schema.Login.LoginName)
						.getString();
				user.Password = findField(queryResultFields, infinity.stone.security.schema.Login.Password).getString();
				user.Enabled = findField(queryResultFields, infinity.stone.security.schema.Login.Enabled).getBool();

				user.setPersisted(true);
				user.setData(queryResult);

				return user;
			}
		}

		return user;
	}

	public static User getPersistedObject(HashMap<String, Field2> queryResult) {
		User user = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.security.schema.Login.UserId);

		if (idField.getUUID() != null) {
			user = new User();
			user.userIdInternal = idField.getUUID();
			user.LoginName = findField(queryResultFields, infinity.stone.security.schema.Login.LoginName).getString();
			user.Password = findField(queryResultFields, infinity.stone.security.schema.Login.Password).getString();
			user.Enabled = findField(queryResultFields, infinity.stone.security.schema.Login.Enabled).getBool();

			user.setPersisted(true);
			user.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return user;
		}

		return user;
	}

	public boolean matchPassword(String rawPassword) {
		return this.Password.equals(PasswordEncoder.hashPassword(rawPassword));
	}

	public static User loadUserById(UUID id) {
		Query2 q = Query2.select(infinity.stone.security.schema.Login.tableName);
		q.innerJoin(infinity.stone.user.schema.User.tableName, infinity.stone.security.schema.Login.UserId,
				infinity.stone.user.schema.User.Id);

		q.whereClause(QueryOperation2.equal(infinity.stone.security.schema.Login.UserId, FieldValue2.sqlBinary(id)));
		q.addFields(new infinity.stone.security.schema.Login().getAllFields());
		q.addFields(new infinity.stone.user.schema.User().getAllFields());

		List<HashMap<String, Field2>> result = q.executeQuery();
		if (result.size() == 1)
			return getPersistedObject(result.get(0));

		return null;
	}

	public static User loadUserByLoginName(String loginName) {
		Query2 q = Query2.select(infinity.stone.security.schema.Login.tableName);
		q.innerJoin(infinity.stone.user.schema.User.tableName, infinity.stone.security.schema.Login.UserId,
				infinity.stone.user.schema.User.Id);

		q.whereClause(QueryOperation2.equal(infinity.stone.security.schema.Login.LoginName,
				FieldValue2.sqlString(loginName)));
		q.addFields(new infinity.stone.security.schema.Login().getAllFields());
		q.addFields(new infinity.stone.user.schema.User().getAllFields());

		List<HashMap<String, Field2>> result = q.executeQuery();
		if (result.size() == 1)
			return getPersistedObject(result.get(0));

		return null;
	}

	public static User loadUserByEmail(String emailAddress) {
		Query2 q = Query2.select(infinity.stone.security.schema.Login.tableName);
		q.innerJoin(infinity.stone.user.schema.User.tableName, infinity.stone.security.schema.Login.UserId,
				infinity.stone.user.schema.User.Id);

		q.whereClause(QueryOperation2.equal(infinity.stone.user.schema.User.EmailAddress,
				FieldValue2.sqlString(emailAddress)));
		q.addFields(new infinity.stone.security.schema.Login().getAllFields());
		q.addFields(new infinity.stone.user.schema.User().getAllFields());

		List<HashMap<String, Field2>> result = q.executeQuery();
		if (result.size() == 1)
			return getPersistedObject(result.get(0));

		return null;
	}

	public static User loadUserByPhoneNumber(PhoneNumber phoneNumber) {
		Query2 q = Query2.select(infinity.stone.security.schema.Login.tableName);
		q.innerJoin(infinity.stone.user.schema.User.tableName, infinity.stone.security.schema.Login.UserId,
				infinity.stone.user.schema.User.Id);

		q.whereClause(QueryOperation2.equal(infinity.stone.user.schema.User.PhoneNumber,
				FieldValue2.sqlString(phoneNumber.getFullPhoneNumber())));
		q.addFields(new infinity.stone.security.schema.Login().getAllFields());
		q.addFields(new infinity.stone.user.schema.User().getAllFields());

		List<HashMap<String, Field2>> result = q.executeQuery();
		if (result.size() == 1)
			return getPersistedObject(result.get(0));

		return null;
	}

}
