package infinity.service.exception;

public class FaultException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -168731739592644950L;

	private String reason;

	public FaultException(String errorMessage) {
		super(errorMessage);
	}

	public FaultException(String errorMessage, String reason) {
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
		return FaultException.class.getSimpleName();
	}

}
