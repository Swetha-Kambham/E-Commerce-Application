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
import schema.column.types.Text;
import schema.column.types.TinyInt;
import schema.column.types.Varchar;
import schema.enums.CascadeOptions;

@Table
public class Product {

	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;

	@Column(size = 255)
	@NotNull
	@Unique(groupIndex = 1)
	public Varchar Name;

	@Column(size = 255)
	@NotNull
	@Unique(groupIndex = 2)
	public Varchar Slug;

	@Column(size = 255)
	public Varchar CommonName;

	@Column(size = 2048)
	public Varchar Description;

	@Column(size = 512)
	public Varchar Tags;

	@Column(size = 512)
	public Varchar LocationTags;

	@Column(size = 255)
	public Binary Varchar;

	@Column
	@NotNull
	@Unique(groupIndex = 1)
	@ForeignKey(name = "FK_PRODUCT_CATEGORY", referenceTable = "Category", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	public Int CategoryId;

	@Column(size = 16)
	@NotNull
	@Unique(groupIndex = 1)
	@ForeignKey(name = "FK_PRODUCT_SELLER", referenceTable = "Seller", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	public Binary SellerId;
	
	@Column
	@NotNull
	public TinyInt Status;
	
	@Column
	public Text StatusRemark;

	@Column
	@NotNull
	public Boolean Enabled;

	@Column
	public Json KeyValues;

}
