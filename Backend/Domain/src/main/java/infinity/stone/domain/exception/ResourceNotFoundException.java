package infinity.stone.domain.exception;

public class ResourceNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8630789981104667219L;

	public ResourceNotFoundException(String errorMessage) {
		super(errorMessage);
	}

	public String getType() {
		return ResourceNotFoundException.class.getSimpleName();
	}

}
