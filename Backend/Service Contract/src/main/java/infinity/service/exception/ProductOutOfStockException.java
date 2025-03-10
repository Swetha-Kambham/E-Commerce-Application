package infinity.service.exception;

public class ProductOutOfStockException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3144594625152608031L;

	public ProductOutOfStockException(String message) {
		super(message);
	}

	public String getType() {
		return ProductOutOfStockException.class.getSimpleName();
	}

}
