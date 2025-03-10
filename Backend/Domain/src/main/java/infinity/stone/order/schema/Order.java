package infinity.stone.order.schema;

import java.util.HashMap;
import java.util.List;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.order.domain.Order2;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class Order extends SchemaBase {

	public static final String tableName = schema.definition.Order.class.getSimpleName();

	public static schema.definition.Order table = new schema.definition.Order();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Integer);
	public static Field2 UserId = new Field2(tableName, "UserId", FieldTypes.Binary);
	public static Field2 OrderDate = new Field2(tableName, "OrderDate", FieldTypes.Timestamp);
	public static Field2 TotalPrice = new Field2(tableName, "TotalPrice", FieldTypes.Double);
	public static Field2 CurrencyId = new Field2(tableName, "CurrencyId", FieldTypes.String);
	public static Field2 TransactionMethod = new Field2(tableName, "TransactionMethod", FieldTypes.String);
	public static Field2 TransactionReference = new Field2(tableName, "TransactionReference", FieldTypes.String);
	public static Field2 IsPayOnDelivery = new Field2(tableName, "IsPayOnDelivery", FieldTypes.Boolean);
	public static Field2 PaymentStatus = new Field2(tableName, "PaymentStatus", FieldTypes.Integer);
	public static Field2 Status = new Field2(tableName, "Status", FieldTypes.Integer);
	public static Field2 KeyValues = new Field2(tableName, "KeyValues", FieldTypes.Json);

	@Override
	public String getTableName() {
		return Order.tableName;
	}

	@Override
	public Object getTable() {
		return Order.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) Order.Id.clone(), (Field2) Order.UserId.clone(),
				(Field2) Order.OrderDate.clone(), (Field2) Order.TotalPrice.clone(), (Field2) Order.CurrencyId.clone(),
				(Field2) Order.TransactionMethod.clone(), (Field2) Order.TransactionReference.clone(),
				(Field2) Order.IsPayOnDelivery.clone(), (Field2) Order.PaymentStatus.clone(),
				(Field2) Order.Status.clone(), (Field2) Order.KeyValues.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		Field2 userId = (Field2) Order.UserId.clone();
		Field2 orderDate = (Field2) Order.OrderDate.clone();
		Field2 totalPrice = (Field2) Order.TotalPrice.clone();
		Field2 currencyId = (Field2) Order.CurrencyId.clone();
		Field2 transactionMethod = (Field2) Order.TransactionMethod.clone();
		Field2 transactionReference = (Field2) Order.TransactionReference.clone();
		Field2 isPayOnDelivery = (Field2) Order.IsPayOnDelivery.clone();
		Field2 paymentStatus = (Field2) Order.PaymentStatus.clone();
		Field2 status = (Field2) Order.Status.clone();
		Field2 keyValues = (Field2) Order.KeyValues.clone();

		Order2 order = (Order2) object;

		userId.setValue(order.getUser().getId());
		orderDate.setValue(order.getOrderDate());
		totalPrice.setValue(order.getTotalPrice());
		currencyId.setValue(order.getCurrency().getId());
		transactionMethod.setValue(order.getTransactionMethod());
		transactionReference.setValue(order.getTransactionReference());
		isPayOnDelivery.setValue(order.getIsPayOnDelivery());
		paymentStatus.setValue(order.getPaymentStatus().getCode());
		status.setValue(order.getStatus().getCode());
		keyValues.setValue(order.getKeyValues());

		return new Field2[] { userId, orderDate, totalPrice, currencyId, transactionMethod, transactionReference,
				isPayOnDelivery, paymentStatus, status, keyValues };
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) Order.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		Order2 order = (Order2) object;
		return FieldValue2.sqlInt(order.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		Integer id = (Integer) object;
		return FieldValue2.sqlInt(id);
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return Order2.getPersistedObject(queryResult, id);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return Order2.getPersistedObject(queryResult);
	}

}
