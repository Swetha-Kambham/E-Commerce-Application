package schema.definition;

import schema.annotation.Column;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.Binary;
import schema.column.types.Int;
import schema.column.types.Json;
import schema.column.types.Varchar;

@Table
public class User {

	@Column(size = 16)
	@Unique(groupIndex = 1)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;

	@Column(size = 255)
	@NotNull
	public Varchar Name;

	@Column(size = 255)
	@Unique(groupIndex = 2)
	public Varchar EmailAddress;

	@Column(size = 16)
	@Unique(groupIndex = 3)
	@NotNull
	public Varchar PhoneNumber;

	@Column
	@NotNull
	public Int Role;

	@Column
	public Json KeyValues;

}
