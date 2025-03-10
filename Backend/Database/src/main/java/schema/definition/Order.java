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
public class Order {

	@Column
	@PrimaryKey(name = "PK_ID")
	@AutoIncreament
	public Int Id;

	@Column(size = 16)
	@ForeignKey(name = "FK_ORDER_USERINFO", referenceTable = "User", referenceField = "Id", onDelete = CascadeOptions.CASCADE, onUpdate = CascadeOptions.RESTRICT)
	@NotNull
	public Binary UserId;

	@Column
	@NotNull
	public DateTime OrderDate;

	@Column(size = 19, precision = 4)
	@NotNull
	public Decimal TotalPrice;

	@Column(size = 50)
	@NotNull
	public Varchar CurrencyId;

	@Column(size = 50)
	public Varchar TransactionMethod;

	@Column(size = 50)
	public Varchar TransactionReference;

	@Column
	@NotNull
	public Boolean IsPayOnDelivery;

	@Column
	@NotNull
	public TinyInt PaymentStatus;

	@Column
	@NotNull
	public TinyInt Status;

	@Column
	public Json KeyValues;

}
