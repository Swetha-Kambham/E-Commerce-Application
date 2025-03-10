package infinity.service;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import infinity.service.contracts.DeletePreferenceParameter;
import infinity.service.contracts.GetAllPreferencesForUserParameter;
import infinity.service.contracts.PutProductPreferenceParameter;
import infinity.service.contracts.UpdatePreferenceQuantityParameter;
import infinity.service.contracts.user.UserProductPreferenceDetails;

@RestController
@RequestMapping("/UserService2/*")
public interface IUserService2 {

	@RequestMapping(value = "/PutProductPreference", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public void putProductPreference(@RequestBody PutProductPreferenceParameter input);

	@RequestMapping(value = "/UpdatePreferenceQuantity", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public void updatePreferenceQuantity(@RequestBody UpdatePreferenceQuantityParameter input);

	@RequestMapping(value = "/DeletePreference", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public void deletePreference(@RequestBody DeletePreferenceParameter input);

	@RequestMapping(value = "/GetAllPreferencesForUser", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public UserProductPreferenceDetails[] getAllPreferencesForUser(
			@RequestBody GetAllPreferencesForUserParameter input);

}
