package schema.definition;

import schema.annotation.AutoIncreament;
import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.column.types.*;
import schema.column.types.Boolean;
import schema.enums.CascadeOptions;

@Table
public class Category {

	@Column
	@AutoIncreament
	@PrimaryKey(name = "PK_ID")
	public Int Id;

	@Column(size = 50)
	@NotNull
	public Varchar Name;

	@Column(size = 255)
	public Varchar Description;

	@Column
	@ForeignKey(name = "FK_CATEGORY_CATEGORY", referenceTable = "Category", referenceField = "Id", onDelete = CascadeOptions.SET_NULL, onUpdate = CascadeOptions.RESTRICT)
	public Int Parent;

	@Column(size = 255)
	public Varchar Hierarchy;

	@Column(size = 512)
	public Varchar HierarchyName;

	@Column
	@NotNull
	public Boolean Enabled;

}
