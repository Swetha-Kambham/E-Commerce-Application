package infinity.service.utils;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTUtil {

	private String SECRET_KEY = "sevenpointdatasolutionsprivatelimited20210730";

	public String extractUserName(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public int extractRole(String token) {
		return Integer.parseInt(extractAllClaims(token).get("role").toString());
	}

	public String extractId(String token) {
		return extractAllClaims(token).get("id").toString();
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		Claims claims = extractAllClaims(token);
		return claimResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		Claims claims = (Claims) Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parse(token).getBody();

		return claims;
	}

	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	public String generateToken(String id, String userName, int roleId) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("role", roleId);
		return createToken(UUID.randomUUID().toString(), "CRAFTHILLS", map, userName, 7 * 24 * 3600 * 1000);
	}

	public String generateToken(String id, String userName, String role, long ttlMillis) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("role", role);
		return createToken(UUID.randomUUID().toString(), "CRAFTHILLS", map, userName, ttlMillis);
	}

	private String createToken(String id, String issuer, Map<String, Object> claims, String subject, long ttlMillis) {
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
		long nowMillis = System.currentTimeMillis();
		Date now = new Date(nowMillis);
		byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
		Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
		JwtBuilder builder = Jwts.builder().setId(id).setClaims(claims).setIssuedAt(now).setSubject(subject)
				.setIssuer(issuer).signWith(signingKey, signatureAlgorithm);

		if (ttlMillis > 0) {
			long expMillis = nowMillis + ttlMillis;
			Date exp = new Date(expMillis);
			builder.setExpiration(exp);
		}

		return builder.compact();
	}

	public boolean validateToken(String token, UserDetails userDetails) {
		String useName = extractUserName(token);
		return useName.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}

}
