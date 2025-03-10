package infinity.stone.sql.helper;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.UUID;

import infinity.stone.domain.util.BinaryTypeUtils;

public class Field2 implements IField {

	/**
	 * <pre>
	 * Change this field in case of two fields are same and you want to treat both fields as different.
	 * Use case: In case of self join two fields can be same.
	 * Field2 f1 = new Field2("Table1", "Id", FieldTypes.String);
	 * Field2 f2 = new Field2("Table1", "Id", FieldTypes.String);
	 * use setIndex to change value of this field.
	 * </pre>
	 */
	private int index = 0;

	private String fieldName;
	private String fieldNameAlias;
	private String tableName;
	private String tableNameAlias;

	private Boolean isGroupingField = false;
	private OrderBy orderBy = OrderBy.NONE;

	private Object value;
	private FieldTypes type;

	@SuppressWarnings("unused")
	private Field2() {
	}

	public Field2(String referenceName, String fieldName, FieldTypes type) {
		this.tableName = referenceName;
		this.fieldName = fieldName;
		this.type = type;
	}

	public String getFieldNameAlias() {
		return fieldNameAlias;
	}

	public void setFieldNameAlias(String fieldNameAlias) {
		this.fieldNameAlias = fieldNameAlias;
	}

	public String getTableNameAlias() {
		return tableNameAlias;
	}

	public void setTableNameAlias(String referenceNameAlias) {
		this.tableNameAlias = referenceNameAlias;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public String getFieldName() {
		return fieldName;
	}

	public String getReferenceName() {
		return tableName;
	}

	public FieldTypes getType() {
		return type;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public Boolean getIsGroupingField() {
		return isGroupingField;
	}

	public void setIsGroupingField(Boolean isGroupingField) {
		this.isGroupingField = isGroupingField;
	}

	public OrderBy getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(OrderBy orderBy) {
		this.orderBy = orderBy;
	}

	public UUID getUUID() {
		if (this.value == null || this.type != FieldTypes.Binary)
			return null;

		if (this.value.getClass().equals(UUID.class)) {
			return UUID.class.cast(value);
		}

		if (this.value.getClass().equals(byte[].class)) {
			return BinaryTypeUtils.getUUIDFromBytes(byte[].class.cast(value));
		}

		return null;
	}

	public byte[] getBytes() {
		if (this.value == null || this.type != FieldTypes.Binary)
			return null;

		if (this.value.getClass().equals(UUID.class)) {
			return BinaryTypeUtils.getBytesFromUUID(UUID.class.cast(value));
		}

		if (this.value.getClass().equals(byte[].class)) {
			return byte[].class.cast(value);
		}

		return null;
	}

	public String getString() {
		if (this.value == null || this.type != FieldTypes.String)
			return null;

		if (this.value.getClass().equals(String.class)) {
			return String.class.cast(this.value);
		}

		return null;
	}

	public Boolean getBool() {
		if (this.value == null || this.type != FieldTypes.Boolean)
			return null;

		if (this.value.getClass().equals(Boolean.class) || this.value.getClass().equals(boolean.class)) {
			return Boolean.class.cast(this.value);
		}

		return null;
	}

	public Integer getInteger() {
		if (this.value == null || this.type != FieldTypes.Integer)
			return null;

		if (this.value.getClass().equals(Integer.class) || this.value.getClass().equals(int.class)) {
			return Integer.class.cast(this.value);
		}

		return null;
	}

	public Double getNumeric() {
		if (this.value == null || this.type != FieldTypes.Double)
			return null;

		if (this.value.getClass().equals(Double.class) || this.value.getClass().equals(double.class)) {
			return Double.class.cast(this.value);
		}

		return null;
	}

	public Date getDate() {
		if (this.value == null || this.type != FieldTypes.Date)
			return null;

		if (this.value.getClass().equals(Date.class)) {
			return Date.class.cast(this.value);
		}

		return null;
	}

	public Time getTime() {
		if (this.value == null || this.type != FieldTypes.Time)
			return null;

		if (this.value.getClass().equals(Time.class)) {
			return Time.class.cast(this.value);
		}

		return null;
	}

	public Timestamp getDateTime() {
		if (this.value == null || this.type != FieldTypes.Timestamp)
			return null;

		if (this.value.getClass().equals(Timestamp.class)) {
			return Timestamp.class.cast(this.value);
		}

		return null;
	}

	public String getJson() {
		if (this.value == null || this.type != FieldTypes.Json)
			return null;

		if (this.value.getClass().equals(String.class)) {
			return String.class.cast(this.value);
		}

		return null;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		Field2 field = (Field2) obj;

		return this.type == field.type && this.index == field.index
				&& this.tableName.equals(field.getReferenceName()) && this.fieldName.equals(field.getFieldName());
	}

	@Override
	public int hashCode() {
		return (this.fieldName + this.tableName).hashCode();
	}

	@Override
	public Object clone() {
		try {
			return super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			return null;
		}
	}

}
