package infinity.stone.user.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.State;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.MappingType;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.domain.base.Relationship;
import infinity.stone.domain.base.Relationships;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;

@DomainObject(schemaType = infinity.stone.user.schema.Address.class)
@Relationships({ @Relationship(to = State.class, mapping = MappingType.ONE_AND_ONE) })
public class Address extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private User User;

	@PropertyField
	private String Name;

	@PropertyField
	private infinity.stone.helper.domain.PhoneNumber PhoneNumber;

	@PropertyField
	private String AddressLine1;

	@PropertyField
	private String AddressLine2;

	@PropertyField
	private String AddressLine3;

	@PropertyField
	private String Landmark;

	@PropertyField
	private String City;

	@PropertyField
	private infinity.stone.domain.State State;

	@PropertyField
	private String PinCode;

	@PropertyField
	private Boolean Enabled;

	private UUID userIdInternal;

	private Integer stateIdInternal;

	public Address() {
		super(new infinity.stone.user.schema.Address());
		setDefaults();
	}

	public Address(User user) {
		super(new infinity.stone.user.schema.Address());
		setDefaults(user);
	}

	private void setDefaults() {
		UUID id = UUID.randomUUID();
		super.setObjectId(id);
		this.setId(id);
		this.setEnabled(true);
	}

	private void setDefaults(User user) {
		UUID id = UUID.randomUUID();
		this.setId(id);
		super.setObjectId(id);
		this.setUser(user);
		this.setEnabled(true);
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		super.setObjectId(id);
		propertyChangeListener(infinity.stone.user.schema.Address.Id.getFieldName(), id);
	}

	public User getUser() {
		if (userIdInternal == null) {
			return null;
		}

		if (this.User != null) {
			return this.User;
		}

		this.User = infinity.stone.user.domain.User.getPersistedObject(super.getData(), userIdInternal);

		if (this.User == null) {
			this.User = ObjectLoader.loadObject(User.class, userIdInternal);
		}

		return this.User;
	}

	public void setUser(User user) {
		userIdInternal = user != null ? user.getId() : null;
		User = user;
		propertyChangeListener(infinity.stone.user.schema.Address.UserId.getFieldName(), userIdInternal);
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
		propertyChangeListener(infinity.stone.user.schema.Address.Name.getFieldName(), name);
	}

	public infinity.stone.helper.domain.PhoneNumber getPhoneNumber() {
		return PhoneNumber;
	}

	public void setPhoneNumber(infinity.stone.helper.domain.PhoneNumber phoneNumber) {
		PhoneNumber = phoneNumber;
		propertyChangeListener(infinity.stone.user.schema.Address.PhoneNumber.getFieldName(), phoneNumber);
	}

	public String getAddressLine1() {
		return AddressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		AddressLine1 = addressLine1;
		propertyChangeListener(infinity.stone.user.schema.Address.AddressLine1.getFieldName(), addressLine1);
	}

	public String getAddressLine2() {
		return AddressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		AddressLine2 = addressLine2;
		propertyChangeListener(infinity.stone.user.schema.Address.AddressLine2.getFieldName(), addressLine2);
	}

	public String getAddressLine3() {
		return AddressLine3;
	}

	public void setAddressLine3(String addressLine3) {
		AddressLine3 = addressLine3;
		propertyChangeListener(infinity.stone.user.schema.Address.AddressLine3.getFieldName(), addressLine3);
	}

	public String getLandmark() {
		return Landmark;
	}

	public void setLandmark(String landmark) {
		Landmark = landmark;
		propertyChangeListener(infinity.stone.user.schema.Address.Landmark.getFieldName(), landmark);
	}

	public String getCity() {
		return City;
	}

	public void setCity(String city) {
		City = city;
		propertyChangeListener(infinity.stone.user.schema.Address.City.getFieldName(), city);
	}

	public String getPinCode() {
		return PinCode;
	}

	public void setPinCode(String pinCode) {
		PinCode = pinCode;
		propertyChangeListener(infinity.stone.user.schema.Address.PinCode.getFieldName(), pinCode);
	}

	public Boolean getEnabled() {
		return Enabled;
	}

	public void setEnabled(Boolean enabled) {
		Enabled = enabled;
		propertyChangeListener(infinity.stone.user.schema.Address.Enabled.getFieldName(), enabled);
	}

	public State getState() {
		if (stateIdInternal == null) {
			return null;
		}

		if (this.State != null) {
			return this.State;
		}

		this.State = infinity.stone.domain.State.getPersistedObject(super.getData(), stateIdInternal);

		if (this.State == null) {
			this.State = ObjectLoader.loadObject(State.class, stateIdInternal);
		}

		return this.State;
	}

	public void setState(State state) {
		stateIdInternal = state != null ? state.getId() : null;
		State = state;
		propertyChangeListener(infinity.stone.user.schema.Address.StateId.getFieldName(), stateIdInternal);
	}

	@Override
	public void save() {
		super.save(this);
	}

	@Override
	public void delete() {
		super.delete(this);
	}

	@Override
	public int hashCode() {
		return this.Id.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null || obj.getClass() != this.getClass())
			return false;

		Address userAddress = (Address) obj;

		return userAddress.Id.equals(this.Id);
	}

	public static Address getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		Address address = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.user.schema.Address.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				address = new Address();

				address.setObjectId((UUID) id);

				address.Id = (UUID) id;
				address.userIdInternal = findField(queryResultFields, infinity.stone.user.schema.Address.UserId)
						.getUUID();
				address.Name = findField(queryResultFields, infinity.stone.user.schema.Address.Name).getString();
				address.PhoneNumber = new infinity.stone.helper.domain.PhoneNumber(
						findField(queryResultFields, infinity.stone.user.schema.Address.PhoneNumber).getString());
				address.AddressLine1 = findField(queryResultFields, infinity.stone.user.schema.Address.AddressLine1)
						.getString();
				address.AddressLine2 = findField(queryResultFields, infinity.stone.user.schema.Address.AddressLine2)
						.getString();
				address.AddressLine3 = findField(queryResultFields, infinity.stone.user.schema.Address.AddressLine3)
						.getString();
				address.Landmark = findField(queryResultFields, infinity.stone.user.schema.Address.Landmark)
						.getString();
				address.City = findField(queryResultFields, infinity.stone.user.schema.Address.City).getString();
				address.stateIdInternal = findField(queryResultFields, infinity.stone.user.schema.Address.StateId)
						.getInteger();
				address.PinCode = findField(queryResultFields, infinity.stone.user.schema.Address.PinCode).getString();
				address.Enabled = findField(queryResultFields, infinity.stone.user.schema.Address.Enabled).getBool();

				address.setPersisted(true);
				address.setData(queryResult);

				return address;
			}
		}

		return address;
	}

	public static Address getPersistedObject(HashMap<String, Field2> queryResult) {
		Address address = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.user.schema.Address.Id);

		if (idField.getUUID() != null) {
			address = new Address();
			address.setObjectId(idField.getUUID());

			address.Id = idField.getUUID();
			address.userIdInternal = findField(queryResultFields, infinity.stone.user.schema.Address.UserId).getUUID();
			address.Name = findField(queryResultFields, infinity.stone.user.schema.Address.Name).getString();
			address.PhoneNumber = new infinity.stone.helper.domain.PhoneNumber(
					findField(queryResultFields, infinity.stone.user.schema.Address.PhoneNumber).getString());
			address.AddressLine1 = findField(queryResultFields, infinity.stone.user.schema.Address.AddressLine1)
					.getString();
			address.AddressLine2 = findField(queryResultFields, infinity.stone.user.schema.Address.AddressLine2)
					.getString();
			address.AddressLine3 = findField(queryResultFields, infinity.stone.user.schema.Address.AddressLine3)
					.getString();
			address.Landmark = findField(queryResultFields, infinity.stone.user.schema.Address.Landmark).getString();
			address.City = findField(queryResultFields, infinity.stone.user.schema.Address.City).getString();
			address.stateIdInternal = findField(queryResultFields, infinity.stone.user.schema.Address.StateId)
					.getInteger();
			address.PinCode = findField(queryResultFields, infinity.stone.user.schema.Address.PinCode).getString();
			address.Enabled = findField(queryResultFields, infinity.stone.user.schema.Address.Enabled).getBool();

			address.setPersisted(true);
			address.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return address;
		}

		return address;
	}

}
