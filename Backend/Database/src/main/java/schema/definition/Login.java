package schema.definition;

import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.Binary;
import schema.column.types.Boolean;
import schema.column.types.Int;
import schema.column.types.Json;
import schema.column.types.Varchar;
import schema.enums.CascadeOptions;

@Table
public class Login {

	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	@ForeignKey(name = "FK_LOGIN_USER", referenceTable = "User", referenceField = "Id", onDelete = CascadeOptions.CASCADE, onUpdate = CascadeOptions.RESTRICT)
	public Binary UserId;

	@Column(size = 255)
	@Unique(groupIndex = 1)
	@NotNull
	public Varchar LoginName;

	@Column(size = 255)
	@NotNull
	public Varchar Password;

	@Column
	@NotNull
	public Boolean Enabled;
}