package infinity.stone.domain.util;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class PasswordEncoder {

	private static final byte[] salt = "nkcFlTJrpOegK05B3Tp9pgd75jij5d3QKEYftFN6".getBytes();
	private static final int keyLength = 64;
	private static final int iterations = 128;

	public static String hashPassword(String rawPassword) {

		final char[] passwordToHash = rawPassword.toCharArray();

		try {
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
			PBEKeySpec spec = new PBEKeySpec(passwordToHash, salt, iterations, keyLength);
			SecretKey key = skf.generateSecret(spec);
			byte[] res = key.getEncoded();
			Base64.Encoder enc = Base64.getEncoder();
			return enc.encodeToString(res);

		} catch (InvalidKeySpecException | NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}

	}

}
