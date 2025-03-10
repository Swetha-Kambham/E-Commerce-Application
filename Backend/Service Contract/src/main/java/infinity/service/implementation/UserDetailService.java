package infinity.service.implementation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import infinity.service.user.User;
import infinity.stone.helper.domain.PhoneNumber;
import infinity.stone.user.domain.Role;

public class UserDetailService implements UserDetailsService {

	public User loadUserById(UUID id) throws UsernameNotFoundException {
		infinity.stone.security.domain.User user = infinity.stone.security.domain.User.loadUserById(id);

		if (user == null) {
			throw new UsernameNotFoundException("user not found");
		}

		return mapToUser(user);
	}

	@Override
	public User loadUserByUsername(String loginName) throws UsernameNotFoundException {
		infinity.stone.security.domain.User user = infinity.stone.security.domain.User.loadUserByLoginName(loginName);

		if (user == null) {
			throw new UsernameNotFoundException("user not found");
		}

		return mapToUser(user);
	}

	public User loadUserByEmail(String emailAddress) throws UsernameNotFoundException {
		infinity.stone.security.domain.User user = infinity.stone.security.domain.User.loadUserByEmail(emailAddress);

		if (user == null) {
			throw new UsernameNotFoundException("user not found");
		}

		return mapToUser(user);
	}

	public User loadUserByPhoneNumber(String countryCode, String phoneNumber) throws UsernameNotFoundException {
		infinity.stone.security.domain.User user = infinity.stone.security.domain.User
				.loadUserByPhoneNumber(new PhoneNumber(countryCode, phoneNumber));

		if (user == null) {
			throw new UsernameNotFoundException("user not found");
		}

		return mapToUser(user);
	}

	public static User mapToUser(infinity.stone.security.domain.User user) {
		User u = new User(user.getLoginName(), user.getPassword(), user.getEnabled(), user.getEnabled(), true, true,
				new ArrayList<GrantedAuthority>(
						Arrays.asList(new SimpleGrantedAuthority(user.getUser().getRole().toString()),
								new SimpleGrantedAuthority("ROLE_" + user.getUser().getRole().toString()))));

		u.setId(user.getUser().getId());
		u.setRole(user.getUser().getRole());
		u.setName(user.getUser().getName());

		return u;
	}

}