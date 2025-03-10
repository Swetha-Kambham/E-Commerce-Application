package schema.definition;

import schema.annotation.Column;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.column.types.Binary;
import schema.column.types.Boolean;
import schema.column.types.Varchar;

@Table
public class SocialMedia {
	
	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;
	
	@Column(size = 255)
	@NotNull
	public Varchar Name;
	
	@Column(size = 255)
	@NotNull
	public Varchar Url;
	
	@Column
	@NotNull
	public Boolean Enabled;
	
}
