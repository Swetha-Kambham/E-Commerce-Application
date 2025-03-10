package infinity.stone.sql.helper;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.UUID;

import infinity.stone.domain.util.BinaryTypeUtils;

public class FieldValue2 implements Cloneable {

	private Object value;
	private FieldTypes type;

	@SuppressWarnings("unused")
	private FieldValue2() {
	}

	public FieldValue2(FieldTypes type) {
		this.type = type;
	}

	public FieldValue2(FieldTypes type, Object value) {
		this.type = type;
		this.value = value;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public FieldTypes getType() {
		return type;
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

	public static FieldValue2 sqlString(String value) {
		return new FieldValue2(FieldTypes.String, value);
	}

	public static FieldValue2 sqlInt(Integer value) {
		return new FieldValue2(FieldTypes.Integer, value);
	}

	public static FieldValue2 sqlDouble(Double value) {
		return new FieldValue2(FieldTypes.Double, value);
	}

	public static FieldValue2 sqlBool(Boolean value) {
		return new FieldValue2(FieldTypes.Boolean, value);
	}

	public static FieldValue2 sqlBinary(UUID value) {
		return new FieldValue2(FieldTypes.Binary, value);
	}

	public static FieldValue2 sqlDate(Date value) {
		return new FieldValue2(FieldTypes.Date, value);
	}

	public static FieldValue2 sqlTime(Time value) {
		return new FieldValue2(FieldTypes.Time, value);
	}

	public static FieldValue2 sqlDateTime(Timestamp value) {
		return new FieldValue2(FieldTypes.Timestamp, value);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		FieldValue2 fieldValue = (FieldValue2) obj;

		return this.type == fieldValue.type && this.value != null && this.value.equals(fieldValue.value);
	}

	@Override
	public int hashCode() {
		return value != null ? value.hashCode() : super.hashCode();
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
