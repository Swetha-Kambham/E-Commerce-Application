package infinity.stone.domain.util;

import java.nio.ByteBuffer;
import java.util.UUID;

public class BinaryTypeUtils {

	public static byte[] getBytesFromUUID(UUID uuid) {
		if (uuid == null) return null;
		
        ByteBuffer bb = ByteBuffer.wrap(new byte[16]);
        bb.putLong(uuid.getMostSignificantBits());
        bb.putLong(uuid.getLeastSignificantBits());

        return bb.array();
    }

	public static UUID getUUIDFromBytes(byte[] bytes) {
    	if (bytes == null) return null;
    	
        ByteBuffer byteBuffer = ByteBuffer.wrap(bytes);
        Long high = byteBuffer.getLong();
        Long low = byteBuffer.getLong();

        return new UUID(high, low);
    }
	
}
