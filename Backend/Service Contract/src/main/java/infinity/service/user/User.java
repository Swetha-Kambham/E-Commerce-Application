package infinity.service.user;

import java.util.Collection;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import infinity.service.implementation.UserDetailService;
import infinity.stone.domain.util.PasswordEncoder;
import infinity.stone.helper.domain.PhoneNumber;
import infinity.stone.user.domain.IUser;

public class User extends org.springframework.security.core.userdetails.User implements IUser {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1121465218381713270L;

	private UUID id;

	private String name;

	private infinity.stone.user.domain.Role role;

	public User(String username, String password, boolean enabled, boolean accountNonExpired,
			boolean credentialsNonExpired, boolean accountNonLocked,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
	}

	@Override
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	@Override
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public PhoneNumber getPhoneNumber() {
		// need to fix
		return null;
	}

	@Override
	public String getEmailAddress() {
		// need to fix
		return null;
	}

	@Override
	public infinity.stone.user.domain.Role getRole() {
		return role;
	}

	public void setRole(infinity.stone.user.domain.Role role) {
		this.role = role;
	}

	public int getRoleId() {
		return this.role.getId();
	}

	public boolean matchPassword(String rawPassword) {
		if (rawPassword == null) {
			return false;
		}

		return PasswordEncoder.hashPassword(rawPassword).equals(this.getPassword());
	}

	public static User getCurrentUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() == null) {
			return null;
		}

		if (auth.getPrincipal() instanceof User) {
			return User.class.cast(auth.getPrincipal());
		}

		return UserDetailService.mapToUser(
				infinity.stone.security.domain.User.loadUserByLoginName(String.class.cast(auth.getPrincipal())));
	}

}
