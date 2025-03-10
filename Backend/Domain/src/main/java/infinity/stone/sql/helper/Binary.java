package infinity.stone.sql.helper;

import java.util.Arrays;
import java.util.UUID;

import infinity.stone.domain.util.BinaryTypeUtils;

public class Binary {
	private byte[] field;

	public Binary() {
		field = null;
	}

	public Binary(UUID field) {
		this.field = BinaryTypeUtils.getBytesFromUUID(field);
	}

	public Binary(String field) {
		this.field = field != null ? BinaryTypeUtils.getBytesFromUUID(UUID.fromString(field)) : null;
	}

	public Binary(byte[] bytes) {
		this(BinaryTypeUtils.getUUIDFromBytes(bytes));
	}

	public byte[] getField() {
		return field;
	}

	public void setField(UUID field) {
		this.field = BinaryTypeUtils.getBytesFromUUID(field);
	}

	public static UUID getUUID(Binary bin) {
		if (bin == null)
			return null;

		return BinaryTypeUtils.getUUIDFromBytes(bin.getField());
	}

	public UUID toUUID() {
		return BinaryTypeUtils.getUUIDFromBytes(this.getField());
	}

	public String toUUIDString() {
		UUID uuid = BinaryTypeUtils.getUUIDFromBytes(this.getField());

		return uuid != null ? uuid.toString() : null;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}

		if (obj.getClass() != this.getClass()) {
			return false;
		}

		final Binary binary = (Binary) obj;

		return Arrays.equals(this.field, binary.field);
	}

	@Override
	public int hashCode() {
		return this.field.hashCode();
	}
}
