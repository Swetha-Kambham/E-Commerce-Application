package schema.definition;

import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.column.types.Binary;
import schema.column.types.Boolean;
import schema.column.types.Int;
import schema.column.types.Varchar;
import schema.enums.CascadeOptions;

@Table
public class Address {

	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;

	@Column(size = 16)
	@NotNull
	@ForeignKey(name = "FK_USERADDRESS_USER", referenceTable = "User", referenceField = "Id", onDelete = CascadeOptions.CASCADE, onUpdate = CascadeOptions.RESTRICT)
	public Binary UserId;

	@Column(size = 255)
	@NotNull
	public Varchar Name;

	@Column(size = 16)
	@NotNull
	public Varchar PhoneNumber;

	@Column(size = 255)
	@NotNull
	public Varchar AddressLine1;

	@Column(size = 255)
	public Varchar AddressLine2;

	@Column(size = 255)
	public Varchar AddressLine3;

	@Column(size = 255)
	@NotNull
	public Varchar Landmark;

	@Column(size = 255)
	@NotNull
	public Varchar City;

	@Column
	@ForeignKey(name = "FK_USERADDRESS_STATE", referenceTable = "State", referenceField = "Id", onDelete = CascadeOptions.RESTRICT, onUpdate = CascadeOptions.RESTRICT)
	@NotNull
	public Int StateId;

	@Column(size = 10)
	@NotNull
	public Varchar PinCode;

	@Column
	@NotNull
	public Boolean Enabled;

}
