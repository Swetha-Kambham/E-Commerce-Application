package infinity.service;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import infinity.service.contracts.IGeneralService1Parameters.DeleteSocialMediaAccountParameter;
import infinity.service.contracts.IGeneralService1Parameters.GetSocialMediaAccountParameter;
import infinity.service.contracts.IGeneralService1Parameters.PutSocialMediaAccountParameter;
import infinity.service.contracts.common.CurrencyReference1;
import infinity.service.contracts.general.SocialMediaReference1;
import infinity.service.contracts.state.StateReference1;
import infinity.service.implementation.GeneralService1;

@RestController
@RequestMapping("/GeneralService1/*")
public class IGeneralService1 {

	private GeneralService1 service = new GeneralService1();

	@RequestMapping(value = "/PutSocialMediaAccount", method = RequestMethod.POST)
	public void putSocialMediaAccount(@RequestBody PutSocialMediaAccountParameter input) throws Exception {
		service.putSocialMediaAccount(input.target, input.socialMedia);
	}

	@RequestMapping(value = "/GetAllSocialMediaAccounts", method = RequestMethod.POST)
	public SocialMediaReference1[] getSocialMediaAccounts() throws Exception {
		return service.getSocialMediaAccounts();
	}

	@RequestMapping(value = "/GetSocialMediaAccount", method = RequestMethod.POST)
	public SocialMediaReference1 getSocialMediaAccount(@RequestBody GetSocialMediaAccountParameter input)
			throws Exception {
		return service.getSocialMediaAccount(input.target);
	}

	@RequestMapping(value = "/DeleteSocialMediaAccount", method = RequestMethod.POST)
	public void deleteSocialMediaAccount(@RequestBody DeleteSocialMediaAccountParameter input) throws Exception {
		service.deleteSocialMediaAccount(input.target);
	}

	@RequestMapping(value = "/GetAllStates", method = RequestMethod.POST)
	public StateReference1[] getAllStates() throws Exception {
		return service.getAllStates();
	}

	@RequestMapping(value = "/GetBaseCurrency", method = RequestMethod.POST)
	public CurrencyReference1 getBaseCurrency() {
		return service.getBaseCurrency();
	}

}
