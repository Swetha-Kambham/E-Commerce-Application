package infinity.service.exception;

public class InvalidInputException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7929191419598867680L;

	private String reason;

	public InvalidInputException(String errorMessage) {
		super(errorMessage);
	}

	public InvalidInputException(String errorMessage, String reason) {
		super(errorMessage);
		this.reason = reason;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getType() {
		return InvalidInputException.class.getSimpleName();
	}

}
