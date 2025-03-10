package infinity.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import infinity.service.contracts.DeleteAddressParameter;
import infinity.service.contracts.GetUserAddressesParameter;
import infinity.service.contracts.GetUserDetailsParameter;
import infinity.service.contracts.PutAddressParameter;
import infinity.service.contracts.PutUserParameter;
import infinity.service.contracts.RequestVerificationCodeParameter;
//import infinity.service.contracts.UpdateAddressParameter;
import infinity.service.contracts.UpdatePasswordParameter;
import infinity.service.contracts.ValidateEmailAddressParameter;
import infinity.service.contracts.ValidatePhoneNumberParameter;
import infinity.service.contracts.VerifyVerificationCodeParameter;
import infinity.service.contracts.common.AddressReference1;
import infinity.service.contracts.common.UserDetails2;
import infinity.service.contracts.login.LoginReference1;
import infinity.service.contracts.login.TwilioVerificationReference1;
import infinity.service.contracts.user.UserDetails1;

@RestController
@RequestMapping("/UserService1/*")
public interface IUserService1 {

	@RequestMapping(value = "/PutUser", method = RequestMethod.POST)
	public void putUser(@RequestBody PutUserParameter input);

	@Secured({ "ROLE_USER" })
	@RequestMapping(value = "/UpdatePassword", method = RequestMethod.POST)
	public void updatePassword(@RequestBody UpdatePasswordParameter input);

	@Secured({ "ROLE_USER" })
	@RequestMapping(value = "/PutAddress", method = RequestMethod.POST)
	public void putAddress(@RequestBody PutAddressParameter input);

	@Secured({ "ROLE_USER" })
	@RequestMapping(value = "/DeleteAddress", method = RequestMethod.POST)
	public void deleteAddress(@RequestBody DeleteAddressParameter input);

	@RequestMapping(value = "/GetUserDetails", method = RequestMethod.POST)
	public UserDetails2 getUserDetails(@RequestBody GetUserDetailsParameter input);

	@Secured({ "ROLE_USER" })
	@RequestMapping(value = "/GetUserAddresses", method = RequestMethod.POST)
	public AddressReference1[] getUserAddresses(@RequestBody GetUserAddressesParameter input);

	@RequestMapping(value = "/GetAllUsers", method = RequestMethod.POST)
	public UserDetails1[] getAllUsers() throws Exception;

	@RequestMapping(value = "/ValidatePhoneNumber", method = RequestMethod.POST)
	public Boolean validatePhoneNumber(@RequestBody ValidatePhoneNumberParameter input);

	@RequestMapping(value = "/ValidateEmailAddress", method = RequestMethod.POST)
	public Boolean validateEmailAddress(@RequestBody ValidateEmailAddressParameter input);

	@RequestMapping(value = "/RequestVerificationCode", method = RequestMethod.POST)
	public TwilioVerificationReference1 requestVerificationCode(@RequestBody RequestVerificationCodeParameter input);

	@RequestMapping(value = "/VerifyVerificationCode", method = RequestMethod.POST)
	public LoginReference1 verifyVerificationCode(HttpServletRequest request, HttpServletResponse response,
			@RequestBody VerifyVerificationCodeParameter input);
}
