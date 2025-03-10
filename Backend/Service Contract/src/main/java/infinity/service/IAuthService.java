package infinity.service;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import infinity.service.contracts.common.UserDetails2;

@RestController
@RequestMapping("/AuthService1/*")
public interface IAuthService {
	
	@RequestMapping(value = "/GetCurrentUser", method = RequestMethod.POST)
	@Secured({"ROLE_USER", "ROLE_SELLER", "ROLE_ADMIN"})
	public UserDetails2 getCurrentUser();

}
