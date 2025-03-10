package infinity.stone.user.domain;

import java.util.UUID;

public interface IUser {

	public UUID getId();

	public String getName();

	public infinity.stone.helper.domain.PhoneNumber getPhoneNumber();

	public String getEmailAddress();

	public infinity.stone.user.domain.Role getRole();

}
