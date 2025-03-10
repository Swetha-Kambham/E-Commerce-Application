package infinity.service;

import infinity.service.contracts.GetAllSellersParameter;
import infinity.service.contracts.GetSellerDetailsParameter;
import infinity.service.contracts.PutSellerFinancialDetailsParameter;
import infinity.service.contracts.PutSellerParameter;
import infinity.service.contracts.RequestVerificationCodeParameter;
import infinity.service.contracts.UpdatePasswordParameter;
import infinity.service.contracts.UpdateSellerAddressParameter;
import infinity.service.contracts.UpdateSellerDetailsParameter;
import infinity.service.contracts.ValidateEmailAddressParameter;
import infinity.service.contracts.ValidatePhoneNumberParameter;
import infinity.service.contracts.ValidateStoreNameParameter;
import infinity.service.contracts.VerifyVerificationCodeParameter;
import infinity.service.contracts.login.LoginReference1;
import infinity.service.contracts.login.TwilioVerificationReference1;
import infinity.service.contracts.seller.SellerReference1;
import infinity.service.contracts.seller.SellerReference2;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/SellerService1/*")
public interface ISellerService1 {

	@RequestMapping(value = "/PutSeller", method = RequestMethod.POST)
	public void putSeller(@RequestBody PutSellerParameter input);

	@Secured({ "ROLE_SELLER" })
	@RequestMapping(value = "/UpdatePassword", method = RequestMethod.POST)
	public void updatePassword(@RequestBody UpdatePasswordParameter input);

	@Secured({ "ROLE_SELLER" })
	@RequestMapping(value = "/UpdateSellerDetails", method = RequestMethod.POST)
	public void updateSellerDetails(@RequestBody UpdateSellerDetailsParameter input);

	@Secured({ "ROLE_SELLER" })
	@RequestMapping(value = "/UpdateSellerAddress", method = RequestMethod.POST)
	public void updateSellerAddress(@RequestBody UpdateSellerAddressParameter input);

	@Secured({ "ROLE_SELLER" })
	@RequestMapping(value = "/PutSellerFinancialDetails", method = RequestMethod.POST)
	public void putSellerFinancialDetails(@RequestBody PutSellerFinancialDetailsParameter input);

	@RequestMapping(value = "/GetSellerDetails", method = RequestMethod.POST)
	public SellerReference2 getSellerDetails(@RequestBody GetSellerDetailsParameter input);

	@Secured({ "ROLE_SELLER", "ROLE_ADMIN" })
	@RequestMapping(value = "/GetAllSellers", method = RequestMethod.POST)
	public SellerReference1[] getAllSellers(@RequestBody GetAllSellersParameter input);

	@RequestMapping(value = "/ValidatePhoneNumber", method = RequestMethod.POST)
	public Boolean validatePhoneNumber(@RequestBody ValidatePhoneNumberParameter input);

	@RequestMapping(value = "/ValidateEmailAddress", method = RequestMethod.POST)
	public Boolean validateEmailAddress(@RequestBody ValidateEmailAddressParameter input);

	@RequestMapping(value = "/ValidateStoreName", method = RequestMethod.POST)
	public Boolean validateStoreName(@RequestBody ValidateStoreNameParameter input);

	@RequestMapping(value = "/RequestVerificationCode", method = RequestMethod.POST)
	public TwilioVerificationReference1 requestVerificationCode(@RequestBody RequestVerificationCodeParameter input);

	@RequestMapping(value = "/VerifyVerificationCode", method = RequestMethod.POST)
	public LoginReference1 verifyVerificationCode(HttpServletRequest request, HttpServletResponse response,
			@RequestBody VerifyVerificationCodeParameter input);

}
