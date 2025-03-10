package schema.definition;

import schema.annotation.Column;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.Binary;
import schema.column.types.Boolean;
import schema.column.types.Json;
import schema.column.types.TinyInt;
import schema.column.types.Varchar;

@Table
public class ProductView {

	@PrimaryKey(name = "PK_ID")
	@Column(size = 16)
	public Binary Id;

	@Column(size = 255)
	@NotNull
	@Unique(groupIndex = 1)
	public Varchar Name;

	@Column(size = 255)
	public Varchar Description;

	@Column(size = 255)
	public Varchar Summary;

	@Column(size = 16)
	@NotNull
	@Unique(groupIndex = 2)
	public TinyInt Priority;

	@Column
	@NotNull
	public Boolean Enabled;

	@Column
	public Json KeyValues;

}
