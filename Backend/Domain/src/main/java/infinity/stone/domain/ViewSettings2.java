package infinity.stone.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.sql.helper.Field2;

@DomainObject(schemaType = infinity.stone.schema.ViewSettings.class)
public class ViewSettings2 extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private UUID UserId;

	@PropertyField
	private String Name;

	@PropertyField
	private Boolean Enabled;

	@PropertyField
	private JsonObject KeyValues;

	public ViewSettings2() {
		super(new infinity.stone.schema.ViewSettings());
		this.Id = UUID.randomUUID();
		this.Enabled = true;
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		super.propertyChangeListener(infinity.stone.schema.ViewSettings.Id.getFieldName(), id);
	}

	public UUID getUserId() {
		return UserId;
	}

	public void setUserId(UUID userId) {
		UserId = userId;
		super.propertyChangeListener(infinity.stone.schema.ViewSettings.UserId.getFieldName(), userId);
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
		super.propertyChangeListener(infinity.stone.schema.ViewSettings.Name.getFieldName(), name);
	}

	public Boolean getEnabled() {
		return Enabled;
	}

	public void setEnabled(Boolean enabled) {
		Enabled = enabled;
		super.propertyChangeListener(infinity.stone.schema.ViewSettings.Enabled.getFieldName(), enabled);
	}

	public String getKeyValues() {
		return KeyValues != null ? KeyValues.getJsonString() : null;
	}

	public void setKeyValues(JsonObject keyValues) {
		KeyValues = keyValues;
		propertyChangeListener(infinity.stone.schema.ViewSettings.KeyValues.getFieldName(), keyValues);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		ViewSettings2 viewSettings = (ViewSettings2) obj;

		return this.Id.equals(viewSettings.Id);
	}

	@Override
	public int hashCode() {
		return this.Id.hashCode();
	}

	@Override
	public void save() {
		super.save(this);
	}

	@Override
	public void delete() {
		super.delete(this);
	}

	public static ViewSettings2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		ViewSettings2 viewSettings = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.schema.ViewSettings.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				viewSettings = new ViewSettings2();
				viewSettings.Id = (UUID) id;
				viewSettings.Name = findField(queryResultFields, infinity.stone.schema.ViewSettings.Name).getString();
				viewSettings.UserId = findField(queryResultFields, infinity.stone.schema.ViewSettings.UserId).getUUID();
				viewSettings.Enabled = findField(queryResultFields, infinity.stone.schema.ViewSettings.Enabled).getBool();
				viewSettings.KeyValues = new JsonObject(
						findField(queryResultFields, infinity.stone.schema.ViewSettings.KeyValues).getJson());

				viewSettings.setPersisted(true);
				viewSettings.setData(queryResult);

				return viewSettings;
			}
		}

		return viewSettings;
	}

	public static ViewSettings2 getPersistedObject(HashMap<String, Field2> queryResult) {
		ViewSettings2 viewSettings = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.schema.ViewSettings.Id);

		if (idField.getUUID() != null) {
			viewSettings = new ViewSettings2();
			viewSettings.Id = idField.getUUID();
			viewSettings.Name = findField(queryResultFields, infinity.stone.schema.ViewSettings.Name).getString();
			viewSettings.UserId = findField(queryResultFields, infinity.stone.schema.ViewSettings.UserId).getUUID();
			viewSettings.Enabled = findField(queryResultFields, infinity.stone.schema.ViewSettings.Enabled).getBool();
			viewSettings.KeyValues = new JsonObject(
					findField(queryResultFields, infinity.stone.schema.ViewSettings.KeyValues).getJson());

			viewSettings.setPersisted(true);
			viewSettings.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return viewSettings;
		}

		return viewSettings;
	}

}
