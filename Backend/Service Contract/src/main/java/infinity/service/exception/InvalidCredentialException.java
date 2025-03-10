package infinity.service.exception;

import org.springframework.security.core.AuthenticationException;

public class InvalidCredentialException extends AuthenticationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3788451206203542824L;

	public InvalidCredentialException(String msg) {
		super(msg);
	}

	public InvalidCredentialException(String msg, Throwable t) {
		super(msg, t);
	}

	public String getReason() {
		return "invalid credential";
	}

	public String getType() {
		return InvalidCredentialException.class.getSimpleName();
	}
}