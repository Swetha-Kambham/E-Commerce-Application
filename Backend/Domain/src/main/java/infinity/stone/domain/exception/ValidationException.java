package infinity.stone.domain.exception;

public class ValidationException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7576548346421397920L;

	private String reason;

	public ValidationException(String errorMessage) {
		super(errorMessage);
	}

	public ValidationException(String errorMessage, String reason) {
		super(errorMessage);
		this.setReason(reason);
	}

	public String getType() {
		return ValidationException.class.getSimpleName();
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

}
