package infinity.stone.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.SocialMedia2;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class SocialMedia extends SchemaBase {
	public static schema.definition.SocialMedia table = new schema.definition.SocialMedia();
	public static final String tableName = table.getClass().getSimpleName();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 Name = new Field2(tableName, "Name", FieldTypes.String);
	public static Field2 Url = new Field2(tableName, "Url", FieldTypes.String);
	public static Field2 Enabled = new Field2(tableName, "Enabled", FieldTypes.Boolean);

	@Override
	public String getTableName() {
		return SocialMedia.tableName;
	}

	@Override
	public Object getTable() {
		return SocialMedia.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) SocialMedia.Id.clone(), (Field2) SocialMedia.Name.clone(),
				(Field2) SocialMedia.Url.clone(), (Field2) SocialMedia.Enabled.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		SocialMedia2 socialMedia = (SocialMedia2) object;

		Field2 id = (Field2) SocialMedia.Id.clone();
		Field2 name = (Field2) SocialMedia.Name.clone();
		Field2 url = (Field2) SocialMedia.Url.clone();
		Field2 enabled = (Field2) SocialMedia.Enabled.clone();

		id.setValue(socialMedia.getId());
		name.setValue(socialMedia.getName());
		url.setValue(socialMedia.getUrl());
		enabled.setValue(socialMedia.getEnabled());

		return new Field2[] { id, name, url, enabled };
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return SocialMedia2.getPersistedObject(queryResult);
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return SocialMedia2.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) SocialMedia.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		SocialMedia2 socialMedia = (SocialMedia2) object;
		return FieldValue2.sqlBinary(socialMedia.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

}
