package infinity.stone.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import infinity.stone.category.schema.Category;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.sql.helper.Field2;

@DomainObject(schemaType = infinity.stone.schema.State.class)
public class State extends DomainBase {

	@PropertyField
	private Integer Id;

	@PropertyField
	private String Name;

	public State() {
		super(new infinity.stone.schema.State());
	}

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
		propertyChangeListener(infinity.stone.schema.State.Id.getFieldName(), id);
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
		propertyChangeListener(infinity.stone.schema.State.Name.getFieldName(), name);
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
		return this.Id;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null || obj.getClass() != this.getClass())
			return false;

		State state = (State) obj;

		return (state.Id == this.Id);
	}

	public static State getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		State state = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.schema.State.Id);

			if (idField.getInteger() != null && idField.getInteger().equals(id)) {
				state = new State();
				state.Id = (Integer) id;
				state.Name = findField(queryResultFields, infinity.stone.schema.State.Name).getString();

				state.setPersisted(true);
				state.setData(queryResult);

				return state;
			}
		}

		return state;
	}

	public static State getPersistedObject(HashMap<String, Field2> queryResult) {
		State state = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.schema.State.Id);

		if (idField.getInteger() != null) {
			state = new State();
			state.Id = idField.getInteger();
			state.Name = findField(queryResultFields, infinity.stone.schema.State.Name).getString();

			state.setPersisted(true);
			state.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return state;
		}

		return state;
	}

}
