package infinity.service.utils;

import org.apache.commons.codec.binary.Hex;

import infinity.stone.sql.helper.Binary;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class Utils {

	public static String toHyphenSeperatedAndLowerCase(String input) {
		if (input == null || input.length() == 0)
			return null;

		String result = "";
		int len = input.length();

		if (input.charAt(0) >= 'A' && input.charAt(0) <= 'Z')
			result += (char) (input.charAt(0) + 32);
		else
			result += input.charAt(0);

		for (int i = 1; i < len - 1; i++) {
			if (input.charAt(i) >= 'A' && input.charAt(i) <= 'Z') {
				result += '-';
				result += (char) (input.charAt(i) + 32);
				continue;
			}

			result += input.charAt(i);
		}

		if (input.charAt(len - 1) >= 'A' && input.charAt(len - 1) <= 'Z')
			result += (char) (input.charAt(len - 1) + 32);
		else
			result += input.charAt(len - 1);

		return result;
	}

	public static Binary hashPassword(String password) {

		String saltText = "123456";
		final byte[] salt = saltText.getBytes();
		final int keyLength = 64;
		final int iterations = 128;
		final char[] passwordToHash = password.toCharArray();

		try {
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
			PBEKeySpec spec = new PBEKeySpec(passwordToHash, salt, iterations, keyLength);
			SecretKey key = skf.generateSecret(spec);
			byte[] res = key.getEncoded();
			String hashedString = Hex.encodeHexString(res);

			return new Binary(hashedString.getBytes());
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			throw new RuntimeException(e);
		}
	}

	@SuppressWarnings("rawtypes")
	private static Class getClass(String className, String packageName) {
		try {
			return Class.forName(packageName + "." + className.substring(0, className.lastIndexOf('.')));
		} catch (ClassNotFoundException e) {
			return null;
		}
	}

	@SuppressWarnings("rawtypes")
	public static Set<Class> getAllClassInsidePackage(String packageName) {
		InputStream stream = ClassLoader.getSystemClassLoader().getResourceAsStream(packageName.replaceAll("[.]", "/"));

		BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
		return reader.lines().filter(line -> line.endsWith(".class")).map(line -> getClass(line, packageName))
				.collect(Collectors.toSet());
	}

}
