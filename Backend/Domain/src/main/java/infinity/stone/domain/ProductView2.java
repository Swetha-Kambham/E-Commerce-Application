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

@DomainObject(schemaType = infinity.stone.schema.ProductView.class)
public class ProductView2 extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private String Name;

	@PropertyField
	private String Description;

	@PropertyField
	private String Summary;

	@PropertyField
	private Integer Priority;

	@PropertyField
	private Boolean Enabled;

	@PropertyField
	private JsonObject KeyValues;

	public ProductView2() {
		super(new infinity.stone.schema.ProductView());
		this.Id = UUID.randomUUID();
		this.Enabled = true;
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		super.propertyChangeListener(infinity.stone.schema.ProductView.Id.getFieldName(), id);
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
		super.propertyChangeListener(infinity.stone.schema.ProductView.Name.getFieldName(), name);
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
		super.propertyChangeListener(infinity.stone.schema.ProductView.Description.getFieldName(), description);
	}

	public String getSummary() {
		return Summary;
	}

	public void setSummary(String summary) {
		Summary = summary;
		super.propertyChangeListener(infinity.stone.schema.ProductView.Summary.getFieldName(), Summary);
	}

	public Integer getPriority() {
		return Priority;
	}

	public void setPriority(Integer priority) {
		Priority = priority;
		super.propertyChangeListener(infinity.stone.schema.ProductView.Priority.getFieldName(), priority);
	}

	public Boolean getEnabled() {
		return Enabled;
	}

	public String getKeyValues() {
		return KeyValues != null ? KeyValues.getJsonString() : null;
	}

	public void setKeyValues(JsonObject keyValues) {
		KeyValues = keyValues;
		propertyChangeListener(infinity.stone.schema.ProductView.KeyValues.getFieldName(), keyValues);
	}

	public void setEnabled(Boolean enabled) {
		Enabled = enabled;
		super.propertyChangeListener(infinity.stone.schema.ProductView.Enabled.getFieldName(), enabled);
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

		ProductView2 productView = (ProductView2) obj;

		return productView.Id.equals(this.Id);
	}

	public static ProductView2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		ProductView2 productView = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.schema.ProductView.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {

				productView = new ProductView2();
				productView.Id = (UUID) id;
				productView.Name = findField(queryResultFields, infinity.stone.schema.ProductView.Name).getString();
				productView.Description = findField(queryResultFields, infinity.stone.schema.ProductView.Description).getString();
				productView.Summary = findField(queryResultFields, infinity.stone.schema.ProductView.Summary).getString();
				productView.Priority = findField(queryResultFields, infinity.stone.schema.ProductView.Priority).getInteger();
				productView.Enabled = findField(queryResultFields, infinity.stone.schema.ProductView.Enabled).getBool();
				productView.KeyValues = new JsonObject(
						findField(queryResultFields, infinity.stone.schema.ProductView.KeyValues).getJson());

				productView.setData(queryResult);
				productView.setPersisted(true);

				return productView;
			}
		}

		return productView;
	}

	public static ProductView2 getPersistedObject(HashMap<String, Field2> queryResult) {
		ProductView2 productView = null;
		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.schema.ProductView.Id);

		if (idField.getUUID() != null) {
			productView = new ProductView2();
			productView.Id = findField(queryResultFields, infinity.stone.schema.ProductView.Id).getUUID();
			productView.Name = findField(queryResultFields, infinity.stone.schema.ProductView.Name).getString();
			productView.Description = findField(queryResultFields, infinity.stone.schema.ProductView.Description).getString();
			productView.Summary = findField(queryResultFields, infinity.stone.schema.ProductView.Summary).getString();
			productView.Priority = findField(queryResultFields, infinity.stone.schema.ProductView.Priority).getInteger();
			productView.Enabled = findField(queryResultFields, infinity.stone.schema.ProductView.Enabled).getBool();
			productView.KeyValues = new JsonObject(
					findField(queryResultFields, infinity.stone.schema.ProductView.KeyValues).getJson());

			productView.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));
			productView.setPersisted(true);

			return productView;
		}

		return productView;
	}

}
