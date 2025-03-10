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
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import infinity.service.contracts.login.LoginReference1;
import infinity.service.keys.AuthStatus;
import infinity.service.user.User;
import infinity.service.utils.JWTUtil;

public class LoginSuccessHandler implements AuthenticationSuccessHandler {

	private final static MediaType CONTENT_TYPE_JSON = MediaType.APPLICATION_JSON;

	@Autowired
	MappingJackson2HttpMessageConverter httpMessageConverter;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		String id = null;
		String loginName = null;
		String role = null;
		Integer roleId = null;

		Object principal = authentication.getPrincipal();

		if (principal.getClass().equals(User.class)) {
			User user = (User) principal;
			id = user.getId().toString();
			loginName = user.getUsername();
			role = user.getRole().toString();
			roleId = user.getRoleId();
		}

		LoginReference1 ref = new LoginReference1();
		ref.id = id;
		ref.loginName = loginName;
		ref.role = role;
		ref.status = AuthStatus.SUCCESS.value;
		ref.jwt = new JWTUtil().generateToken(id, loginName, roleId);

		HttpOutputMessage outputMessage = new ServletServerHttpResponse(response);
		httpMessageConverter.write(ref, CONTENT_TYPE_JSON, outputMessage);

		response.setStatus(HttpStatus.OK.value());

	}

}
