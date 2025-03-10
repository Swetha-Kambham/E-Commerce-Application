package schema.definition;

import schema.annotation.Column;
import schema.column.types.*;
import schema.column.types.Boolean;

public class MetadataDefault {

	@Column
	public Text Text;

	@Column
	public Boolean Bool;

	@Column(size = 16)
	public Binary Binary;

	@Column
	public Int Integer;

	@Column(size = 19, precision = 4)
	public Decimal Numeric;

	@Column
	public Date Date;

	@Column
	public Time Time;

	@Column
	public DateTime DateTime;

}
