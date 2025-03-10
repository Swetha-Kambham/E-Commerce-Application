package infinity.stone.user.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.user.domain.UserProductPreference2;

public class UserProductPreference extends SchemaBase {
	public static schema.definition.UserProductPreference table = new schema.definition.UserProductPreference();

	public static final String tableName = schema.definition.UserProductPreference.class.getSimpleName();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 UserId = new Field2(tableName, "UserId", FieldTypes.Binary);
	public static Field2 ProductId = new Field2(tableName, "ProductId", FieldTypes.Binary);
	public static Field2 ProductSkuId = new Field2(tableName, "ProductSkuId", FieldTypes.Binary);
	public static Field2 Quantity = new Field2(tableName, "Quantity", FieldTypes.Integer);
	public static Field2 PricePerUnit = new Field2(tableName, "PricePerUnit", FieldTypes.Double);
	public static Field2 CurrencyId = new Field2(tableName, "CurrencyId", FieldTypes.String);
	public static Field2 Type = new Field2(tableName, "Type", FieldTypes.Integer);

	@Override
	public String getTableName() {
		return UserProductPreference.tableName;
	}

	@Override
	public Object getTable() {
		return UserProductPreference.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) UserProductPreference.Id.clone(), (Field2) UserProductPreference.UserId.clone(),
				(Field2) UserProductPreference.ProductId.clone(), (Field2) UserProductPreference.ProductSkuId.clone(),
				(Field2) UserProductPreference.Quantity.clone(), (Field2) UserProductPreference.PricePerUnit.clone(),
				(Field2) UserProductPreference.CurrencyId.clone(), (Field2) UserProductPreference.Type.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		UserProductPreference2 userProductPreference = (UserProductPreference2) object;

		Field2 id = (Field2) UserProductPreference.Id.clone();
		Field2 userId = (Field2) UserProductPreference.UserId.clone();
		Field2 productId = (Field2) UserProductPreference.ProductId.clone();
		Field2 productSkuId = (Field2) UserProductPreference.ProductSkuId.clone();
		Field2 quantity = (Field2) UserProductPreference.Quantity.clone();
		Field2 pricePerUnit = (Field2) UserProductPreference.PricePerUnit.clone();
		Field2 currencyId = (Field2) UserProductPreference.CurrencyId.clone();
		Field2 type = (Field2) UserProductPreference.Type.clone();

		id.setValue(userProductPreference.getId());
		userId.setValue(userProductPreference.getUser().getId());
		productId.setValue(userProductPreference.getProduct().getId());
		productSkuId.setValue(userProductPreference.getProductSku().getId());
		quantity.setValue(userProductPreference.getQuantity());
		pricePerUnit.setValue(userProductPreference.getPricePerUnit());

		if (userProductPreference.getCurrency() != null) {
			currencyId.setValue(userProductPreference.getCurrency().getId());
		}

		type.setValue(userProductPreference.getType().getCode());

		return new Field2[] { id, userId, productId, productSkuId, quantity, pricePerUnit, currencyId, type };
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return UserProductPreference2.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) UserProductPreference.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		return FieldValue2.sqlBinary((UUID) ((UserProductPreference2) object).getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return UserProductPreference2.getPersistedObject(queryResult);
	}

}
