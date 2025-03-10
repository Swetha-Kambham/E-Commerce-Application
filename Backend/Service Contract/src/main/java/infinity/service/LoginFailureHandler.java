package infinity.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import infinity.service.contracts.login.LoginReference1;
import infinity.service.keys.AuthStatus;
import infinity.service.utils.JWTUtil;

public class LoginFailureHandler implements AuthenticationFailureHandler {

	private final static MediaType CONTENT_TYPE_JSON = MediaType.APPLICATION_JSON;

	@Autowired
	MappingJackson2HttpMessageConverter httpMessageConverter;

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {

		LoginReference1 ref = new LoginReference1();
		ref.id = null;
		ref.loginName = null;
		ref.role = null;
		ref.status = AuthStatus.FAILURE.value;
		ref.jwt = null;

		HttpOutputMessage outputMessage = new ServletServerHttpResponse(response);
		httpMessageConverter.write(ref, CONTENT_TYPE_JSON, outputMessage);

		response.setStatus(HttpStatus.OK.value());

	}

}
