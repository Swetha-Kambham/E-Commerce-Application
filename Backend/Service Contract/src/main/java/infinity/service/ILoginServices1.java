package infinity.service;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import infinity.service.contracts.CompletePhoneVerificationParameter;
import infinity.service.contracts.InitPhoneVerificationParameter;
import infinity.service.contracts.common.StatusReference1;
import infinity.service.contracts.login.TwilioVerificationReference1;

@RestController
@RequestMapping("/LoginServices1/*")
public interface ILoginServices1 {
	@RequestMapping(value = "/InitPhoneVerification", method = RequestMethod.POST)
	public TwilioVerificationReference1 initPhoneVerification(@RequestBody InitPhoneVerificationParameter input);

	@RequestMapping(value = "/CompletePhoneVerification", method = RequestMethod.POST)
	public StatusReference1 completePhoneVerification(@RequestBody CompletePhoneVerificationParameter input);

}
