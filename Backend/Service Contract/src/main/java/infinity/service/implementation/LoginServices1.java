package infinity.service.implementation;

import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Service;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;

import infinity.service.ILoginServices1;
import infinity.service.configuration.AppConfiguration;
import infinity.service.contracts.CompletePhoneVerificationParameter;
import infinity.service.contracts.InitPhoneVerificationParameter;
import infinity.service.contracts.common.PhoneNumberParameter1;
import infinity.service.contracts.common.PhoneNumberReference1;
import infinity.service.contracts.common.StatusReference1;
import infinity.service.contracts.login.TwilioVerificationReference1;
import infinity.service.contracts.login.TwilioVerificationParameter1;
import infinity.service.utils.PhoneNumberUtil;

@Controller
public class LoginServices1 implements ILoginServices1 {

	@Autowired
	private AppConfiguration appConfig;

	@Override
	public TwilioVerificationReference1 initPhoneVerification(InitPhoneVerificationParameter input) {
		return initPhoneVerification(input.phoneNumber);
	}

	@Override
	public StatusReference1 completePhoneVerification(CompletePhoneVerificationParameter input) {
		return completePhoneVerification(input.verificationData);
	}

	public TwilioVerificationReference1 initPhoneVerification(PhoneNumberParameter1 target) {
		return getVerificationCode(target, appConfig.getTwillioAccountSid(), appConfig.getTwillioAuthToken());
	}

	public StatusReference1 completePhoneVerification(TwilioVerificationParameter1 verificationData) {
		VerificationCheck verificationCheck = checkVerification(appConfig.getTwillioAccountSid(),
				appConfig.getTwillioAuthToken(), verificationData.phoneNumber, verificationData.serviceSId,
				verificationData.verificationCode);

		StatusReference1 ref = new StatusReference1();
		ref.status = verificationCheck.getStatus();
		return ref;
	}

	static VerificationCheck checkVerification(String twillioAccountSid, String twillioAuthToken,
			PhoneNumberParameter1 phoneNumber, String serviceSId, String verificationCode) {

		Twilio.init(twillioAccountSid, twillioAuthToken);
		VerificationCheck verificationCheck = VerificationCheck.creator(serviceSId, verificationCode)
				.setTo(PhoneNumberUtil.getFullNumber(phoneNumber.countryCode, phoneNumber.phoneNumber)).create();

		return verificationCheck;
	}

	static TwilioVerificationReference1 getVerificationCode(PhoneNumberParameter1 phoneNumber, String twillioAccountSid,
			String twillioAuthToken) {
		Twilio.init(twillioAccountSid, twillioAuthToken);
		Service service = Service.creator("CraftHills").create();
		String pathServiceSid = service.getSid();

		Verification.creator(pathServiceSid,
				PhoneNumberUtil.getFullNumber(phoneNumber.countryCode, phoneNumber.phoneNumber),
				infinity.service.keys.Twilio.VerificationChannel.sms).create();

		TwilioVerificationReference1 ref = new TwilioVerificationReference1();
		ref.phoneNumber = new PhoneNumberReference1();
		ref.phoneNumber.countryCode = phoneNumber.countryCode;
		ref.phoneNumber.phoneNumber = phoneNumber.phoneNumber;
		ref.serviceSId = pathServiceSid;
		ref.channel = "phone";

		return ref;
	}

}
