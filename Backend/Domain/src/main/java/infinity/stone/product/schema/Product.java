package infinity.stone.product.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.product.domain.Product2;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class Product extends SchemaBase {

	public static final String tableName = schema.definition.Product.class.getSimpleName();

	public static schema.definition.Product table = new schema.definition.Product();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 Name = new Field2(tableName, "Name", FieldTypes.String);
	public static Field2 Slug = new Field2(tableName, "Slug", FieldTypes.String);
	public static Field2 CommonName = new Field2(tableName, "CommonName", FieldTypes.String);
	public static Field2 Description = new Field2(tableName, "Description", FieldTypes.String);
	public static Field2 LocationTags = new Field2(tableName, "LocationTags", FieldTypes.String);
	public static Field2 Tags = new Field2(tableName, "Tags", FieldTypes.String);
	public static Field2 CategoryId = new Field2(tableName, "CategoryId", FieldTypes.Integer);
	public static Field2 SellerId = new Field2(tableName, "SellerId", FieldTypes.Binary);
	public static Field2 Status = new Field2(tableName, "Status", FieldTypes.Integer);
	public static Field2 StatusRemark = new Field2(tableName, "StatusRemark", FieldTypes.String);
	public static Field2 Enabled = new Field2(tableName, "Enabled", FieldTypes.Boolean);
	public static Field2 KeyValues = new Field2(tableName, "KeyValues", FieldTypes.Json);

	@Override
	public String getTableName() {
		return Product.tableName;
	}

	@Override
	public Object getTable() {
		return Product.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) Product.Id.clone(), (Field2) Product.Name.clone(), (Field2) Product.Slug.clone(),
				(Field2) Product.CommonName.clone(), (Field2) Product.Description.clone(),
				(Field2) Product.LocationTags.clone(), (Field2) Product.Tags.clone(),
				(Field2) Product.CategoryId.clone(), (Field2) Product.SellerId.clone(), (Field2) Product.Status.clone(),
				(Field2) Product.StatusRemark.clone(), (Field2) Product.Enabled.clone(),
				(Field2) Product.KeyValues.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		Product2 p = (Product2) object;

		Field2 id = (Field2) Product.Id.clone();
		Field2 name = (Field2) Product.Name.clone();
		Field2 slug = (Field2) Product.Slug.clone();
		Field2 commonName = (Field2) Product.CommonName.clone();
		Field2 description = (Field2) Product.Description.clone();
		Field2 locationTags = (Field2) Product.LocationTags.clone();
		Field2 tags = (Field2) Product.Tags.clone();
		Field2 categoryId = (Field2) Product.CategoryId.clone();
		Field2 sellerId = (Field2) Product.SellerId.clone();
		Field2 status = (Field2) Product.Status.clone();
		Field2 statusRemark = (Field2) Product.StatusRemark.clone();
		Field2 enabled = (Field2) Product.Enabled.clone();
		Field2 keyValues = (Field2) Product.KeyValues.clone();

		id.setValue(p.getId());
		name.setValue(p.getName());
		slug.setValue(p.getSlug());
		commonName.setValue(p.getCommonName());
		description.setValue(p.getDescription());
		locationTags.setValue(p.getLocationTags().getValue());
		tags.setValue(p.getTags().getValue());
		categoryId.setValue(p.getCategory().getId());
		sellerId.setValue(p.getSeller().getId());
		status.setValue(p.getStatus().getCode());
		statusRemark.setValue(p.getStatusRemark());
		enabled.setValue(p.getEnabled());
		keyValues.setValue(p.getKeyValues());

		return new Field2[] { id, name, slug, commonName, description, locationTags, tags, categoryId, sellerId, status,
				statusRemark, enabled, keyValues };
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) Product.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		Product2 p = (Product2) object;
		return FieldValue2.sqlBinary(p.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return Product2.getPersistedObject(queryResult, id);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return Product2.getPersistedObject(queryResult);
	}

}
