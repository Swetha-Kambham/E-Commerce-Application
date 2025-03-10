package infinity.stone.domain.base;

import java.lang.reflect.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.QueryOperation2;
import infinity.stone.sql.helper.Sql;

public abstract class DomainBase {

	private Object objectId;

	private Integer generatedKey;

	private boolean isDirty;
	private boolean isPersisted;
	private HashMap<String, Object> properties;
	private Set<String> dirtyFields;
	private List<HashMap<String, Field2>> data;

	private SchemaBase domainSchemaMapper;

	private DomainBase() {
		isDirty = false;
		isPersisted = false;
		properties = new HashMap<String, Object>();
		dirtyFields = new HashSet<String>();
		data = new ArrayList<HashMap<String, Field2>>();
	}

	public DomainBase(SchemaBase domainSchemaMapper) {
		this();
		this.domainSchemaMapper = domainSchemaMapper;
	}

	public Object getObjectId() {
		return objectId;
	}

	protected void setObjectId(Object objectId) {
		this.objectId = objectId;
	}

	protected Integer getGeneratedKey() {
		return generatedKey;
	}

	public Set<String> getDirtyFields() {
		return dirtyFields;
	}

	public boolean isPersisted() {
		return isPersisted;
	}

	protected void resetDirtyFields() {
		this.dirtyFields = new HashSet<String>();
	}

	public void setPersisted(boolean isPersisted) {
		this.isPersisted = isPersisted;
		if (isPersisted == true) {
			setIsDirty(false);
			resetDirtyFields();
		}
	}

	public boolean isDirty() {
		return isDirty;
	}

	protected void setIsDirty(boolean isDirty) {
		this.isDirty = isDirty;
	}

	protected List<HashMap<String, Field2>> getData() {
		return data;
	}

	@SuppressWarnings("unchecked")
	protected <T extends DomainBase> T[] retreiveData(Class<T> type) {
		SchemaBase schemaObj = ObjectLoader.getDomainSchemaMapperObject(type);

		boolean isObjectExistsInData = false;
		Set<T> result = new LinkedHashSet<T>();

		for (HashMap<String, Field2> row : this.data) {
			if (row.values().contains(schemaObj.getPrimaryKeyField())) {
				isObjectExistsInData = true;
				T object = type.cast(schemaObj.mapSchemaFieldsToObject(row));
				if (object != null) {
					object.setData(data);
					object.setPersisted(true);
					result.add(object);
				}
			}
		}

		if (!isObjectExistsInData)
			return null;

		return result.toArray((T[]) Array.newInstance(type, result.size()));
	}

	protected void setData(List<HashMap<String, Field2>> data) {
		this.data = data;
	}

	public void setDefaultValues() {
	}

	protected void insert(DomainBase object) {

		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();

		try {

			PreparedStatement ps = Sql.getPrepareInsertStatement(connection, this.domainSchemaMapper.getTableName(),
					this.domainSchemaMapper.mapObjectToSchemaFields(object));

			ps.executeUpdate();

			ResultSet rs = ps.getGeneratedKeys();

			if (rs.next()) {
				this.generatedKey = rs.getInt(1);
			}
			ps.close();
			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	protected void update(DomainBase object) {
		Field2[] fields = this.domainSchemaMapper.mapObjectToSchemaFields(object);

		List<Field2> dirtyFields = new ArrayList<Field2>();

		String tableName = this.domainSchemaMapper.getTableName();
		Field2 primaryKeyField = this.domainSchemaMapper.getPrimaryKeyField();
		FieldValue2 value = this.domainSchemaMapper.getPrimaryKeyFieldValue(object);

		for (Field2 field : fields) {
			if (this.getDirtyFields().contains(field.getFieldName())) {
				dirtyFields.add(field);
			}
		}

		Sql.update(tableName, QueryOperation2.equal(primaryKeyField, value),
				((List<Field2>) dirtyFields).toArray(new Field2[dirtyFields.size()]));
	}

	protected void save(DomainBase object) {
		if (!this.isDirty())
			return;

		if (this.isPersisted()) {
			update(object);
		} else {
			insert(object);
		}
	}

	protected void delete(DomainBase object) {

		String tableName = this.domainSchemaMapper.getTableName();
		Field2 primaryKeyField = this.domainSchemaMapper.getPrimaryKeyField();
		FieldValue2 value = this.domainSchemaMapper.getPrimaryKeyFieldValue(object);

		Sql.delete(tableName, QueryOperation2.equal(primaryKeyField, value));
	}

	public abstract void save();

	public abstract void delete();

	protected void propertyChangeListener(String propName, Object value) {
		if (properties.containsKey(propName)) {

			if (value == null && properties.get(propName) == null)
				return;

			if ((value != null && !value.equals(properties.get(propName)))
					|| (properties.get(propName) != null && !properties.get(propName).equals(value))) {
				properties.replace(propName, value);
				setIsDirty(true);
				dirtyFields.add(propName);
			}

		} else {
			setIsDirty(true);
			dirtyFields.add(propName);
		}
	}

	protected static Field2 findField(Collection<Field2> resultFields, Field2 fieldToFind) {
		for (Field2 f : resultFields) {
			if (f.equals(fieldToFind)) {
				return f;
			}
		}
		return fieldToFind;
	}

}
