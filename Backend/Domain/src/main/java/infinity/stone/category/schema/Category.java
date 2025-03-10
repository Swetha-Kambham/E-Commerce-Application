package infinity.stone.category.schema;

import java.util.HashMap;
import java.util.List;

import infinity.stone.category.domain.Category2;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class Category extends SchemaBase {

	public static final String tableName = schema.definition.Category.class.getSimpleName();

	public static schema.definition.Category table = new schema.definition.Category();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Integer);
	public static Field2 Name = new Field2(tableName, "Name", FieldTypes.String);
	public static Field2 Description = new Field2(tableName, "Description", FieldTypes.String);
	public static Field2 Parent = new Field2(tableName, "Parent", FieldTypes.Integer);
	public static Field2 Hierarchy = new Field2(tableName, "Hierarchy", FieldTypes.String);
	public static Field2 HierarchyName = new Field2(tableName, "HierarchyName", FieldTypes.String);
	public static Field2 Enabled = new Field2(tableName, "Enabled", FieldTypes.Boolean);

	@Override
	public String getTableName() {
		return Category.tableName;
	}

	@Override
	public Object getTable() {
		return Category.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) Category.Id.clone(), (Field2) Category.Name.clone(),
				(Field2) Category.Description.clone(), (Field2) Category.Parent.clone(),
				(Field2) Category.Hierarchy.clone(), (Field2) Category.HierarchyName.clone(),
				(Field2) Category.Enabled.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		Category2 c = (Category2) object;

		Field2 id = (Field2) Category.Id.clone();
		Field2 name = (Field2) Category.Name.clone();
		Field2 description = (Field2) Category.Description.clone();
		Field2 parent = (Field2) Category.Parent.clone();
		Field2 hierarchy = (Field2) Category.Hierarchy.clone();
		Field2 hierarchyName = (Field2) Category.HierarchyName.clone();
		Field2 enabled = (Field2) Category.Enabled.clone();

		id.setValue(c.getId());
		name.setValue(c.getName());
		description.setValue(c.getDescription());

		if (c.getParent() != null) {
			parent.setValue(c.getParent().getId());
		}

		hierarchy.setValue(c.getHierarchy().getValue());
		hierarchyName.setValue(c.getHierarchyName().getValue());
		enabled.setValue(c.getEnabled());

		return new Field2[] { id, name, description, parent, hierarchy, hierarchyName, enabled };
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return Category2.getPersistedObject(queryResult);
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return Category2.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) Category.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		Category2 c = (Category2) object;
		return FieldValue2.sqlInt(c.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlInt((Integer) object);
	}

}
