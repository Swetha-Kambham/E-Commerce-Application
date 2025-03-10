package infinity.service.implementation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Controller;

import infinity.service.IAuthService;
import infinity.service.contracts.common.UserDetails2;
import infinity.service.user.User;
import infinity.service.utils.PhoneNumberUtil;
import infinity.stone.object.helper.ObjectLoader;

@Controller
public class AuthService implements IAuthService {

	@Override
	public UserDetails2 getCurrentUser() {

		User user = User.getCurrentUser();

		if (user != null)
			return UserService1.mapToUserDetails2(user);

		return null;
	}

	public static void authorize(HttpServletRequest request, HttpServletResponse response, User user) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
				user, user.getPassword(),
				new ArrayList<GrantedAuthority>(Arrays.asList(new SimpleGrantedAuthority(user.getRole().toString()),
						new SimpleGrantedAuthority("ROLE_" + user.getRole().toString()))));

		usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

		SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
	}

	public static void createUserCredentials(infinity.stone.user.domain.User user, String rawPassword) {
		infinity.stone.security.domain.User u = new infinity.stone.security.domain.User(user);
		u.setPassword(rawPassword);
		u.save();
	}

	public static void updatePassword(infinity.stone.user.domain.User user, String newPassword) {
		infinity.stone.security.domain.User u = new infinity.stone.security.domain.User(user);
		u.setPassword(newPassword);
		u.save();
	}

}
