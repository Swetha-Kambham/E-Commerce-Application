package schema.definition;

import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.Binary;
import schema.column.types.Date;
import schema.column.types.Json;
import schema.column.types.Varchar;
import schema.enums.CascadeOptions;

@Table
public class Seller {

	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	@Unique(groupIndex = 1)
	@ForeignKey(name = "FK_SELLER_USER", referenceTable = "User", referenceField = "Id", onDelete = CascadeOptions.CASCADE, onUpdate = CascadeOptions.RESTRICT)
	public Binary Id;

	@Column(size = 255)
	@NotNull
	@Unique(groupIndex = 1)
	public Varchar StoreName;

	@Column(size = 50)
	public Varchar GSTNumber;

	@Column(size = 255)
	public Varchar Description;

	@Column
	public Json KeyValues;

}
