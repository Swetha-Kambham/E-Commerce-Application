package schema.definition;

import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.Binary;
import schema.column.types.Int;
import schema.column.types.Varchar;
import schema.enums.CascadeOptions;

@Table
public class ProductRatingMetadata extends MetadataDefault {

	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;

	@Column(size = 16)
	@NotNull
	@Unique(groupIndex = 1)
	@ForeignKey(name = "FK_PRODUCT_RATING_METADATA_PRODUCT_RATING", referenceTable = "ProductRating", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	public Binary ProductRatingId;

	@Column(size = 255)
	@NotNull
	@Unique(groupIndex = 1)
	public Varchar Key;

	@Column
	public Int Index;

}
