package schema.definition;

import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.*;
import schema.enums.CascadeOptions;

@Table
public class UserProductPreference {

	@Column(size = 16)
	@PrimaryKey
	public Binary Id;

	@NotNull
	@Column(size = 16)
	@Unique(groupIndex = 1)
	@ForeignKey(name = "USERPRODUCTPREFERENCE_USER", referenceTable = "User", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	public Binary UserId;

	@NotNull
	@Column(size = 16)
	@Unique(groupIndex = 1)
	@ForeignKey(name = "USERPRODUCTPREFERENCE_PRODUCT", referenceTable = "Product", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	public Binary ProductId;

	@NotNull
	@Column(size = 16)
	@Unique(groupIndex = 1)
	@ForeignKey(name = "USERPRODUCTPREFERENCE_PRODUCTSKU", referenceTable = "ProductSKU", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	public Binary ProductSkuId;

	@Column()
	public Int Quantity;

	@Column(size = 19, precision = 4)
	public Decimal PricePerUnit;

	@Column(size = 50)
	public Varchar CurrencyId;

	@NotNull
	@Column()
	public TinyInt Type;

}
