package schema.definition;

import schema.annotation.Check;
import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.Binary;
import schema.column.types.Decimal;
import schema.column.types.Int;
import schema.column.types.Json;
import schema.column.types.Varchar;
import schema.enums.CascadeOptions;

@Table
public class ProductSKU {

	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;

	@Column(size = 16)
	@NotNull
	@Unique(groupIndex = 1)
	@ForeignKey(name = "FK_PRODUCTSKU_PRODUCT", referenceTable = "Product", referenceField = "Id", onDelete = CascadeOptions.CASCADE, onUpdate = CascadeOptions.RESTRICT)
	public Binary ProductId;

	@Column(size = 50)
	@NotNull
	@Unique(groupIndex = 1)
	public Varchar SKU;

	@Column(size = 19, precision = 4)
	@NotNull
	@Check(expression = "PricePerUnit > 0")
	public Decimal PricePerUnit;

	@Column(size = 19, precision = 4)
	@NotNull
	@Check(expression = "SellingPricePerUnit > 0 AND SellingPricePerUnit <= PricePerUnit")
	public Decimal SellingPricePerUnit;

	@Column(size = 50)
	@NotNull
	public Varchar CurrencyId;

	@Column
	@NotNull
	@Check(expression = "QuantityInStock >= 0")
	public Int QuantityInStock;

	@Column
	public Json KeyValues;

}
