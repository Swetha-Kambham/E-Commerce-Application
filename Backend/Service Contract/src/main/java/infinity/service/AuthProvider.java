package infinity.service;

import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import infinity.service.exception.InvalidCredentialException;
import infinity.service.implementation.UserDetailService;
import infinity.service.user.User;

public class AuthProvider implements org.springframework.security.authentication.AuthenticationProvider {

	@Autowired
	private HttpServletRequest request;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		String userName = authentication.getName();
		String password = authentication.getCredentials().toString();

		infinity.service.user.User user = getUser(userName);

		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		}

		if (user.matchPassword(password)) {
			return new UsernamePasswordAuthenticationToken(user, user.getPassword(),
					new ArrayList<GrantedAuthority>(Arrays.asList(new SimpleGrantedAuthority(user.getRole().toString()),
							new SimpleGrantedAuthority("ROLE_" + user.getRole().toString()))));
		}

		throw new InvalidCredentialException("Invalid password");
	}

	private infinity.service.user.User getUser(String userName) {

		if (userName != null && userName != "") {
			return new UserDetailService().loadUserByUsername(userName);
		}

		String emailAddress = request.getParameter("emailAddress");

		if (emailAddress != null && emailAddress != "") {
			return new UserDetailService().loadUserByEmail(emailAddress);
		}

		String countryCode = request.getParameter("phoneNumber.countryCode");
		String phoneNumber = request.getParameter("phoneNumber.phoneNumber");

		if (countryCode != null && countryCode != "" && phoneNumber != null && phoneNumber != "") {
			return new UserDetailService().loadUserByPhoneNumber(countryCode, phoneNumber);
		}

		return null;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
