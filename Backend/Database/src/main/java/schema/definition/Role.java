package schema.definition;

import schema.annotation.AutoIncreament;
import schema.annotation.Column;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.Binary;
import schema.column.types.Boolean;
import schema.column.types.Int;
import schema.column.types.Varchar;

@Table
public class Role {

	@Column
	@AutoIncreament
	@PrimaryKey(name = "PK_ID")
	public Int Id;

	@Column(size = 255)
	@NotNull
	@Unique(groupIndex = 1)
	public Varchar Name;

	@Column(size = 2048)
	public Varchar Description;

	@Column
	@NotNull
	public Boolean Enabled;

}
