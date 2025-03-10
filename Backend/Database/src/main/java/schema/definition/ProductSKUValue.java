package schema.definition;

import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.column.types.Binary;
import schema.enums.CascadeOptions;

@Table
public class ProductSKUValue {

	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;

	@Column(size = 16)
	@NotNull
	@ForeignKey(name = "FK_PRODUCTSKUVALUE_PRODUCTSKUID_PRODUCTSKU", referenceTable = "ProductSKU", referenceField = "Id", onDelete = CascadeOptions.CASCADE, onUpdate = CascadeOptions.RESTRICT)
	public Binary ProductSKUId;

	@Column(size = 16)
	@NotNull
	@ForeignKey(name = "FK_PRODUCTSKUVALUE_PRODUCTOPTIONID_PRODUCTOPTION", referenceTable = "ProductOption", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	public Binary ProductOptionId;

	@Column(size = 16)
	@NotNull
	@ForeignKey(name = "FK_PRODUCTSKUVALUE_PRODUCTOPTIONVALUEID_PRODUCTOPTIONVALUE", referenceTable = "ProductOptionValue", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	public Binary ProductOptionValueId;

}
