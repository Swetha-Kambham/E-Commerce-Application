package schema.definition;

import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.column.types.Binary;
import schema.column.types.Decimal;
import schema.column.types.Int;
import schema.column.types.Json;
import schema.column.types.TinyInt;
import schema.column.types.Varchar;
import schema.enums.CascadeOptions;

@Table
public class OrderItem {

	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;

	@Column
	@ForeignKey(name = "FK_ORDERDETAIL_ORDER", referenceTable = "Order", referenceField = "Id", onDelete = CascadeOptions.CASCADE, onUpdate = CascadeOptions.RESTRICT)
	@NotNull
	public Int OrderId;

	@Column(size = 16)
	@ForeignKey(name = "FK_ORDERDETAIL_PRODUCT", referenceTable = "Product", referenceField = "Id", onDelete = CascadeOptions.NO_ACTION, onUpdate = CascadeOptions.NO_ACTION)
	@NotNull
	public Binary ProductId;

	@Column(size = 16)
	@ForeignKey(name = "FK_ORDERDETAIL_PRODUCTSKU", referenceTable = "ProductSKU", referenceField = "Id", onDelete = CascadeOptions.NO_ACTION, onUpdate = CascadeOptions.NO_ACTION)
	@NotNull
	public Binary ProductSKUId;

	@Column
	@NotNull
	public Int Quantity;

	@Column(size = 19, precision = 4)
	@NotNull
	public Decimal PricePerUnit;

	@Column(size = 19, precision = 4)
	@NotNull
	public Decimal TotalPrice;

	@Column(size = 50)
	@NotNull
	public Varchar CurrencyId;

	@Column
	public TinyInt Status;

	@Column
	public Json KeyValues;

}
