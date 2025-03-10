package schema.definition;

import schema.annotation.AutoIncreament;
import schema.annotation.Column;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.column.types.Int;
import schema.column.types.Varchar;

@Table
public class State {

	@Column(size = 255)
	@AutoIncreament
	@PrimaryKey(name = "PK_ID")
	public Int Id;

	@Column(size = 255)
	@NotNull
	public Varchar Name;

}
