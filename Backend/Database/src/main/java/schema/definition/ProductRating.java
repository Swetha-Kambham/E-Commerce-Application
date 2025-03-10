package schema.definition;

import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.column.types.Binary;
import schema.column.types.Text;
import schema.column.types.TinyInt;
import schema.enums.CascadeOptions;

@Table
public class ProductRating {
	
	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;
	
	@Column(size = 16)
	@NotNull
	@ForeignKey(name = "FK_PRODUCT_RATING_PRODUCT", referenceTable = "Product", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	public Binary ProductId;
	
	@Column(size = 16)
	@NotNull
	@ForeignKey(name = "FK_PRODUCT_RATING_USER", referenceTable = "User", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	public Binary UserId;
	
	@Column
	@NotNull
	public TinyInt Rating;
	
	@Column
	public Text Comment;
	
}
