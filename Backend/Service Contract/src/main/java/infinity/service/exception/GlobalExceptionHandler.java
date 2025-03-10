package infinity.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import infinity.service.contracts.error.ErrorResponse;
import infinity.stone.domain.exception.ResourceNotFoundException;
import infinity.stone.domain.exception.ValidationException;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(value = { FaultException.class })
	public ResponseEntity<ErrorResponse> getFaultException(FaultException ex, WebRequest request) {

		ErrorResponse errorReponse = new ErrorResponse();
		errorReponse.message = ex.getMessage();
		errorReponse.reason = ex.getReason();
		errorReponse.type = ex.getType();

		return new ResponseEntity<ErrorResponse>(errorReponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value = { ResourceNotFoundException.class })
	public ResponseEntity<ErrorResponse> getResourceNotFoundException(ResourceNotFoundException ex,
			WebRequest request) {

		ErrorResponse errorReponse = new ErrorResponse();
		errorReponse.message = ex.getMessage();
		errorReponse.type = ex.getType();

		return new ResponseEntity<ErrorResponse>(errorReponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(value = { ProductOutOfStockException.class })
	public ResponseEntity<ErrorResponse> getProductOutOfStockException(ProductOutOfStockException ex,
			WebRequest request) {
		ErrorResponse errorReponse = new ErrorResponse();
		errorReponse.message = ex.getMessage();
		errorReponse.type = ex.getType();

		return new ResponseEntity<ErrorResponse>(errorReponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(value = { ValidationException.class })
	public ResponseEntity<ErrorResponse> getProductOutOfStockException(ValidationException ex, WebRequest request) {
		ErrorResponse errorReponse = new ErrorResponse();
		errorReponse.message = ex.getMessage();
		errorReponse.type = ex.getType();

		return new ResponseEntity<ErrorResponse>(errorReponse, HttpStatus.METHOD_NOT_ALLOWED);
	}

	@ExceptionHandler(value = { InvalidInputException.class })
	public ResponseEntity<ErrorResponse> getInvalidInputException(InvalidInputException ex, WebRequest request) {
		ErrorResponse errorReponse = new ErrorResponse();
		errorReponse.message = ex.getMessage();
		errorReponse.type = ex.getType();

		return new ResponseEntity<ErrorResponse>(errorReponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(value = { UsernameNotFoundException.class })
	public ResponseEntity<ErrorResponse> getInvalidInputException(UsernameNotFoundException ex, WebRequest request) {
		ErrorResponse errorReponse = new ErrorResponse();
		errorReponse.message = ex.getMessage();
		errorReponse.type = UsernameNotFoundException.class.getSimpleName();

		return new ResponseEntity<ErrorResponse>(errorReponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(value = { InvalidCredentialException.class })
	public ResponseEntity<ErrorResponse> getInvalidInputException(InvalidCredentialException ex, WebRequest request) {
		ErrorResponse errorReponse = new ErrorResponse();
		errorReponse.message = ex.getMessage();
		errorReponse.type = ex.getType();

		return new ResponseEntity<ErrorResponse>(errorReponse, HttpStatus.BAD_REQUEST);
	}

}
