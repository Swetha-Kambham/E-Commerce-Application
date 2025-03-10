package infinity.stone.order.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.order.domain.OrderItem;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class OrderDetail extends SchemaBase {

	public static final String tableName = schema.definition.OrderItem.class.getSimpleName();
	public static schema.definition.OrderItem table = new schema.definition.OrderItem();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 OrderId = new Field2(tableName, "OrderId", FieldTypes.Integer);
	public static Field2 ProductId = new Field2(tableName, "ProductId", FieldTypes.Binary);
	public static Field2 ProductSKUId = new Field2(tableName, "ProductSKUId", FieldTypes.Binary);
	public static Field2 Quantity = new Field2(tableName, "Quantity", FieldTypes.Integer);
	public static Field2 PricePerUnit = new Field2(tableName, "PricePerUnit", FieldTypes.Double);
	public static Field2 TotalPrice = new Field2(tableName, "TotalPrice", FieldTypes.Double);
	public static Field2 CurrencyId = new Field2(tableName, "CurrencyId", FieldTypes.String);
	public static Field2 Status = new Field2(tableName, "Status", FieldTypes.Integer);
	public static Field2 KeyValues = new Field2(tableName, "KeyValues", FieldTypes.Json);

	@Override
	public String getTableName() {
		return OrderDetail.tableName;
	}

	@Override
	public Object getTable() {
		return OrderDetail.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) OrderDetail.Id.clone(), (Field2) OrderDetail.OrderId.clone(),
				(Field2) OrderDetail.ProductId.clone(), (Field2) OrderDetail.ProductSKUId.clone(),
				(Field2) OrderDetail.Quantity.clone(), (Field2) OrderDetail.PricePerUnit.clone(),
				(Field2) OrderDetail.TotalPrice.clone(), (Field2) OrderDetail.CurrencyId.clone(),
				(Field2) OrderDetail.Status.clone(), (Field2) OrderDetail.KeyValues.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		OrderItem orderItem = (OrderItem) object;

		Field2 id = (Field2) OrderDetail.Id.clone();
		Field2 orderId = (Field2) OrderDetail.OrderId.clone();
		Field2 productId = (Field2) OrderDetail.ProductId.clone();
		Field2 productSKUId = (Field2) OrderDetail.ProductSKUId.clone();
		Field2 quantity = (Field2) OrderDetail.Quantity.clone();
		Field2 pricePerUnit = (Field2) OrderDetail.PricePerUnit.clone();
		Field2 totalPrice = (Field2) OrderDetail.TotalPrice.clone();
		Field2 currencyId = (Field2) OrderDetail.CurrencyId.clone();
		Field2 status = (Field2) OrderDetail.Status.clone();
		Field2 keyValues = (Field2) OrderDetail.KeyValues.clone();

		id.setValue(orderItem.getId());
		orderId.setValue(orderItem.getOrder().getId());
		productId.setValue(orderItem.getProduct().getId());
		productSKUId.setValue(orderItem.getProductSKU().getId());
		quantity.setValue(orderItem.getQuantity());
		pricePerUnit.setValue(orderItem.getPricePerUnit());
		totalPrice.setValue(orderItem.getTotalPrice());
		currencyId.setValue(orderItem.getCurrency().getId());
		status.setValue(orderItem.getStatus().getCode());
		keyValues.setValue(orderItem.getKeyValues());

		return new Field2[] { id, orderId, productId, productSKUId, quantity, pricePerUnit, totalPrice, currencyId,
				status, keyValues };
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) OrderDetail.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		OrderItem orderItem = (OrderItem) object;
		return FieldValue2.sqlBinary(orderItem.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		UUID id = (UUID) object;
		return FieldValue2.sqlBinary(id);
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return OrderItem.getPersistedObject(queryResult, id);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return OrderItem.getPersistedObject(queryResult);
	}

}
