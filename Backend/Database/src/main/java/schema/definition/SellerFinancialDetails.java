package schema.definition;

import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.Binary;
import schema.column.types.Boolean;
import schema.column.types.Varchar;
import schema.enums.CascadeOptions;

@Table
public class SellerFinancialDetails {

	@Column(size = 16)
	@NotNull
	@ForeignKey(name = "FK_SellerId_SellerFinancialDetails", referenceTable = "Seller", referenceField = "Id", onDelete = CascadeOptions.CASCADE, onUpdate = CascadeOptions.RESTRICT)
	@Unique(groupIndex = 1)
	public Binary SellerId;

	@Column(size = 50)
	public Varchar PANNumber;

	@Column(size = 50)
	public Varchar AadharNumber;

	@Column(size = 50)
	public Varchar BankAccountHolderName;

	@Column(size = 50)
	public Varchar BankAccountNumber;

	@Column(size = 50)
	public Varchar IFSCCode;

	@Column
	public Boolean IsDetailsVerified;

	@Column
	public Boolean IsAccountVerified;

}
