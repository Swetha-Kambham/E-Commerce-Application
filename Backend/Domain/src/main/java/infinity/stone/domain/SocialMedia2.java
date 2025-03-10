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
import infinity.stone.schema.SocialMedia;
import infinity.stone.sql.helper.Field2;

@DomainObject(schemaType = SocialMedia.class)
public class SocialMedia2 extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private String Name;

	@PropertyField
	private String Url;

	@PropertyField
	private Boolean Enabled;

	public SocialMedia2() {
		super(new SocialMedia());
		this.Id = UUID.randomUUID();
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		propertyChangeListener(infinity.stone.schema.SocialMedia.Id.getFieldName(), id);
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
		propertyChangeListener(infinity.stone.schema.SocialMedia.Name.getFieldName(), name);
	}

	public String getUrl() {
		return Url;
	}

	public void setUrl(String url) {
		Url = url;
		propertyChangeListener(infinity.stone.schema.SocialMedia.Url.getFieldName(), url);
	}

	public Boolean getEnabled() {
		return Enabled;
	}

	public void setEnabled(Boolean enabled) {
		Enabled = enabled;
		propertyChangeListener(infinity.stone.schema.SocialMedia.Enabled.getFieldName(), enabled);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		SocialMedia2 socialMedia = (SocialMedia2) obj;

		return this.Id.equals(socialMedia.Id);
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

	public static SocialMedia2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		SocialMedia2 socialMedia = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, SocialMedia.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				socialMedia = new SocialMedia2();
				socialMedia.Id = (UUID) id;
				socialMedia.Name = findField(queryResultFields, SocialMedia.Name).getString();
				socialMedia.Url = findField(queryResultFields, SocialMedia.Url).getString();
				socialMedia.Enabled = findField(queryResultFields, SocialMedia.Enabled).getBool();

				socialMedia.setPersisted(true);
				socialMedia.setData(queryResult);

				return socialMedia;
			}
		}

		return socialMedia;
	}

	public static SocialMedia2 getPersistedObject(HashMap<String, Field2> queryResult) {
		SocialMedia2 socialMedia = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, SocialMedia.Id);

		if (idField.getUUID() != null) {
			socialMedia = new SocialMedia2();
			socialMedia.Id = idField.getUUID();
			socialMedia.Name = findField(queryResultFields, SocialMedia.Name).getString();
			socialMedia.Url = findField(queryResultFields, SocialMedia.Url).getString();
			socialMedia.Enabled = findField(queryResultFields, SocialMedia.Enabled).getBool();

			socialMedia.setPersisted(true);
			socialMedia.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return socialMedia;
		}

		return socialMedia;
	}

}
