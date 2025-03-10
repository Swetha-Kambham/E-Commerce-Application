package infinity.stone.product.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.product.domain.ProductSKU2;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class ProductSKU extends SchemaBase {

	public static schema.definition.ProductSKU table = new schema.definition.ProductSKU();
	public static final String tableName = schema.definition.ProductSKU.class.getSimpleName();

	public static Field2 Id = new Field2(tableName, "Id", FieldTypes.Binary);
	public static Field2 ProductId = new Field2(tableName, "ProductId", FieldTypes.Binary);
	public static Field2 Sku = new Field2(tableName, "SKU", FieldTypes.String);
	public static Field2 PricePerUnit = new Field2(tableName, "PricePerUnit", FieldTypes.Double);
	public static Field2 SellingPricePerUnit = new Field2(tableName, "SellingPricePerUnit", FieldTypes.Double);
	public static Field2 CurrencyId = new Field2(tableName, "CurrencyId", FieldTypes.String);
	public static Field2 QuantityInStock = new Field2(tableName, "QuantityInStock", FieldTypes.Integer);
	public static Field2 KeyValues = new Field2(tableName, "KeyValues", FieldTypes.Json);

	@Override
	public String getTableName() {
		return ProductSKU.tableName;
	}

	@Override
	public Object getTable() {
		return ProductSKU.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) Id.clone(), (Field2) ProductId.clone(), (Field2) Sku.clone(),
				(Field2) PricePerUnit.clone(), (Field2) SellingPricePerUnit.clone(), (Field2) CurrencyId.clone(),
				(Field2) QuantityInStock.clone(), (Field2) KeyValues.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		ProductSKU2 productSku = (ProductSKU2) object;

		Field2 id = (Field2) ProductSKU.Id.clone();
		Field2 productId = (Field2) ProductSKU.ProductId.clone();
		Field2 sku = (Field2) ProductSKU.Sku.clone();
		Field2 pricePerUnit = (Field2) ProductSKU.PricePerUnit.clone();
		Field2 sellingPricePerUnit = (Field2) ProductSKU.SellingPricePerUnit.clone();
		Field2 currencyId = (Field2) ProductSKU.CurrencyId.clone();
		Field2 quantityInStock = (Field2) ProductSKU.QuantityInStock.clone();
		Field2 keyValues = (Field2) ProductSKU.KeyValues.clone();

		id.setValue(productSku.getId());
		productId.setValue(productSku.getProduct().getId());
		sku.setValue(productSku.getSKU());
		pricePerUnit.setValue(productSku.getPricePerUnit());
		sellingPricePerUnit.setValue(productSku.getSellingPricePerUnit());
		currencyId.setValue(productSku.getCurrency().getId());
		quantityInStock.setValue(productSku.getQuantityInStock());
		keyValues.setValue(productSku.getKeyValues());

		return new Field2[] { id, productId, sku, pricePerUnit, sellingPricePerUnit, currencyId, quantityInStock,
				keyValues };
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return ProductSKU2.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return (Field2) ProductSKU.Id.clone();
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		ProductSKU2 productSku = (ProductSKU2) object;
		return FieldValue2.sqlBinary(productSku.getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return ProductSKU2.getPersistedObject(queryResult);
	}

}
