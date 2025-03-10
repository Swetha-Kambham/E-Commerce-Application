package infinity.service.implementation;

import infinity.service.IUserService1;
import infinity.service.configuration.AppConfiguration;
import infinity.service.contracts.DeleteAddressParameter;
import infinity.service.contracts.GetUserAddressesParameter;
import infinity.service.contracts.GetUserDetailsParameter;
import infinity.service.contracts.PutAddressParameter;
import infinity.service.contracts.PutUserParameter;
import infinity.service.contracts.RequestVerificationCodeParameter;
import infinity.service.contracts.UpdatePasswordParameter;
import infinity.service.contracts.ValidateEmailAddressParameter;
import infinity.service.contracts.ValidatePhoneNumberParameter;
import infinity.service.contracts.VerifyVerificationCodeParameter;
import infinity.service.contracts.common.AddressParameter1;
import infinity.service.contracts.common.AddressReference1;
import infinity.service.contracts.common.PasswordParameter1;
import infinity.service.contracts.common.PhoneNumberParameter1;
import infinity.service.contracts.common.UserDetails2;
import infinity.service.contracts.login.LoginReference1;
import infinity.service.contracts.login.TwilioVerificationParameter1;
import infinity.service.contracts.login.TwilioVerificationReference1;
import infinity.service.contracts.state.StateReference1;
import infinity.service.contracts.user.UserAddressTargetParameter1;
import infinity.service.contracts.user.UserParameter1;
import infinity.service.contracts.user.UserDetails1;
import infinity.service.contracts.user.UserTargetParameter1;
import infinity.service.exception.InvalidInputException;
import infinity.service.keys.AuthStatus;
import infinity.service.utils.JWTUtil;
import infinity.service.utils.PhoneNumberUtil;
import infinity.stone.domain.State;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObjectCollection;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.helper.domain.PhoneNumber;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryFieldReference;
import infinity.stone.sql.helper.QueryOperation2;
import infinity.stone.user.domain.Address;
import infinity.stone.user.domain.Role;
import infinity.stone.user.domain.User;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.twilio.rest.verify.v2.service.VerificationCheck;

@Controller
public class UserService1 implements IUserService1 {

	private JWTUtil jwtUtil = new JWTUtil();

	@Autowired
	private AppConfiguration appConfig;

	@Override
	public void updatePassword(UpdatePasswordParameter input) {
		updatePassword(input.user, input.newPassword);
	}

	@Override
	public void putUser(PutUserParameter input) {
		putUser(input.user);

	}

	@Override
	public void putAddress(PutAddressParameter input) {
		putAddress(input.user, input.target, input.address);
	}

	@Override
	public void deleteAddress(DeleteAddressParameter input) {
		deleteAddress(input.user, input.target);
	}

	@Override
	public UserDetails2 getUserDetails(GetUserDetailsParameter input) {
		return getUserDetails(input.target);
	}

	@Override
	public AddressReference1[] getUserAddresses(GetUserAddressesParameter input) {
		return getUserAddresses(input.target);
	}

	@Override
	public Boolean validatePhoneNumber(ValidatePhoneNumberParameter input) {
		return validatePhoneNumber(input.phoneNumber);
	}

	@Override
	public Boolean validateEmailAddress(ValidateEmailAddressParameter input) {
		return validateEmailAddress(input.emailAddress);
	}

	@Override
	public TwilioVerificationReference1 requestVerificationCode(RequestVerificationCodeParameter input) {
		return requestVerificationCode(input.user);
	}

	@Override
	public LoginReference1 verifyVerificationCode(HttpServletRequest request, HttpServletResponse response,
			VerifyVerificationCodeParameter input) {
		return verifyVerificationCode(request, response, input.verificationData);
	}

	static Query2 getUserQuery(Set<Class<? extends DomainBase>> relationshipToLoad) {
		Query2 q = Query2.select(infinity.stone.user.schema.User.tableName);
		q.addFields(new infinity.stone.user.schema.User().getAllFields());

		if (relationshipToLoad.contains(infinity.stone.user.domain.Address.class)) {
			q.innerJoin(infinity.stone.user.schema.Address.tableName, infinity.stone.user.schema.User.Id,
					infinity.stone.user.schema.Address.UserId);
			q.addFields(new infinity.stone.user.schema.Address().getAllFields());

		}

		return q;
	}

	static User resolveObject(UserTargetParameter1 target, HashSet<Class<? extends DomainBase>> relationshipToLoad) {

		if (target == null || (target.id == null && target.phoneNumber == null && target.emailAddress == null)) {
			throw new InvalidInputException("Either of id, phone number or email is required");
		}

		Query2 query = getUserQuery(relationshipToLoad);
		query.whereClause(QueryOperation2.equal(FieldValue2.sqlInt(1), FieldValue2.sqlInt(1)));

		if (target.id != null) {
			query.whereAndClause(QueryOperation2.equal(infinity.stone.user.schema.User.Id,
					FieldValue2.sqlBinary(UUID.fromString(target.id))));
		}

		if (target.emailAddress != null) {
			query.whereAndClause(QueryOperation2.equal(infinity.stone.user.schema.User.EmailAddress,
					FieldValue2.sqlString(target.emailAddress)));
		}

		if (target.phoneNumber != null) {
			query.whereAndClause(QueryOperation2.equal(infinity.stone.user.schema.User.PhoneNumber,
					FieldValue2
							.sqlString(new PhoneNumber(target.phoneNumber.countryCode, target.phoneNumber.phoneNumber)
									.getFullPhoneNumber())));
		}

		return infinity.stone.user.domain.User.getPersistedObject(query.executeQuery().get(0));
	}

	public void updatePassword(UserTargetParameter1 target, PasswordParameter1 newPassword) {
		User user = resolveObject(target, new HashSet<Class<? extends DomainBase>>());
		AuthService.updatePassword(user, newPassword.password);
	}

	public void putUser(UserParameter1 user) {
		User u = new User();
		u.setName(user.name);
		u.setRole(infinity.stone.user.domain.Role.USER);
		u.setEmailAddress(user.emailAddress);
		u.setPhoneNumber(new PhoneNumber(user.phoneNumber.countryCode, user.phoneNumber.phoneNumber));

		JsonObject userKeyValues = new JsonObject();

		if (user.language != null)
			userKeyValues.addOrUpdateProperty(infinity.service.keys.User.Metadata.language, user.language);
		if (user.timezoneOffset != null)
			userKeyValues.addOrUpdateProperty(infinity.service.keys.User.Metadata.timezoneOffset, user.timezoneOffset);

		if (user.latitude != null && user.longitude != null) {
			userKeyValues.addOrUpdateProperty(infinity.service.keys.User.Metadata.latitude, user.latitude);
			userKeyValues.addOrUpdateProperty(infinity.service.keys.User.Metadata.longitude, user.longitude);
		}

		u.setKeyValues(userKeyValues);

		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();

		try {
			connection.setAutoCommit(false);
			u.save();
			AuthService.createUserCredentials(u, user.password);
			connection.commit();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			schema.connection.SqlConnection.closeConnection();
		}

	}

	static void putAddressInternal(User u, UserAddressTargetParameter1 target, AddressParameter1 address) {
		DomainObjectCollection<Address> addresses = u.getAddresses();

		Address addressToUpdate = null;

		if (target == null || target.id == null) {
			addressToUpdate = new Address(u);
			addresses.add(addressToUpdate);
		} else {
			addressToUpdate = addresses.find(UUID.fromString(target.id));
		}

		if (addressToUpdate == null) {
			return;
		}

		State state = ObjectLoader.loadObject(State.class, address.stateId);

		addressToUpdate.setName(address.name);
		addressToUpdate.setLandmark(address.landmark);
		addressToUpdate
				.setPhoneNumber(new PhoneNumber(address.phoneNumber.countryCode, address.phoneNumber.phoneNumber));
		addressToUpdate.setAddressLine1(address.addressLine1);
		addressToUpdate.setAddressLine2(address.addressLine2);
		addressToUpdate.setAddressLine3(address.addressLine3);
		addressToUpdate.setCity(address.city);
		addressToUpdate.setState(state);
		addressToUpdate.setPinCode(address.pinCode);

		u.save();
	}

	public void putAddress(UserTargetParameter1 user, UserAddressTargetParameter1 target, AddressParameter1 address) {

		User u = resolveObject(user, new HashSet<Class<? extends DomainBase>>());

		putAddressInternal(u, target, address);
	}

	public void deleteAddress(UserTargetParameter1 user, UserAddressTargetParameter1 target) {
		User userInfo = resolveObject(user, new HashSet<Class<? extends DomainBase>>());

		List<Address> addresses = userInfo.getAddresses();

		Address addressToDelete = null;

		for (Address addr : addresses) {
			if (target.id.equals(addr.getId().toString())) {
				addressToDelete = addr;
			}
		}

		addresses.remove(addressToDelete);

		userInfo.save();
	}

	static StateReference1 mapToStateReference1(State state) {
		if (state == null) {
			return null;
		}

		StateReference1 ref = new StateReference1();
		ref.id = state.getId();
		ref.name = state.getName();

		return ref;
	}

	static AddressReference1 mapToAddressReference1(Address address) {
		AddressReference1 ref = new AddressReference1();
		ref.id = address.getId().toString();
		ref.name = address.getName();
		ref.phoneNumber = PhoneNumberUtil.mapToPhoneNumberReference1(address.getPhoneNumber());
		ref.addressLine1 = address.getAddressLine1();
		ref.addressLine2 = address.getAddressLine2();
		ref.addressLine3 = address.getAddressLine3();
		ref.city = address.getCity();
		ref.landmark = address.getLandmark();
		ref.state = mapToStateReference1(address.getState());
		ref.pinCode = address.getPinCode();

		return ref;

	}

	public AddressReference1[] getUserAddresses(UserTargetParameter1 target) {
		User userInfo = resolveObject(target, new HashSet<Class<? extends DomainBase>>());
		List<Address> addresses = userInfo.getAddresses();

		AddressReference1[] addressRefs = new AddressReference1[addresses.size()];

		int index = 0;
		for (Address addr : addresses) {
			addressRefs[index++] = mapToAddressReference1(addr);
		}

		return addressRefs;
	}

	public UserDetails2 getUserDetails(UserTargetParameter1 target) {
		return mapToUserDetails2(resolveObject(target, new HashSet<Class<? extends DomainBase>>()));
	}

	static UserDetails1 mapToUserDetails1(HashMap<String, Field2> queryResult,
			HashMap<String, QueryFieldReference> queryFields) {

		UserDetails1 userDetails = new UserDetails1();

		userDetails.id = queryFields.get("User.Id").getValue(queryResult).getUUID().toString();
		userDetails.name = queryFields.get("User.Name").getValue(queryResult).getString();
		userDetails.emailAddress = queryFields.get("User.EmailAddress").getValue(queryResult).getString();
		userDetails.phoneNumber = PhoneNumberUtil.mapToPhoneNumberReference1(
				new PhoneNumber(queryFields.get("User.PhoneNumber").getValue(queryResult).getString()));
		userDetails.enabled = true;

		return userDetails;

	}

	public UserDetails1[] getAllUsers() {
		Query2 query = Query2.select(infinity.stone.user.schema.User.tableName);
		query.whereClause(
				QueryOperation2.equal(infinity.stone.user.schema.User.Role, FieldValue2.sqlInt(Role.USER.getId())));

		query.setLimit(1000);
		query.setOffset(0);

		HashMap<String, QueryFieldReference> queryFields = new HashMap<String, QueryFieldReference>();

		queryFields.put("User.Id", query.addField(infinity.stone.user.schema.User.Id));
		queryFields.put("User.Name", query.addField(infinity.stone.user.schema.User.Name));
		queryFields.put("User.EmailAddress", query.addField(infinity.stone.user.schema.User.EmailAddress));
		queryFields.put("User.PhoneNumber", query.addField(infinity.stone.user.schema.User.PhoneNumber));

		List<HashMap<String, Field2>> result = query.executeQuery();

		UserDetails1[] references = new UserDetails1[result.size()];

		for (int i = 0; i < result.size(); i++) {
			references[i] = mapToUserDetails1(result.get(i), queryFields);
		}

		return references;
	}

	public Boolean validatePhoneNumber(PhoneNumberParameter1 phoneNumber) {
		if (phoneNumber == null || phoneNumber.phoneNumber == null)
			throw new InvalidInputException("Phone Number is required");

		Query2 q = Query2.select(infinity.stone.user.schema.User.tableName);

		q.whereClause(QueryOperation2.equal(infinity.stone.user.schema.User.PhoneNumber, FieldValue2
				.sqlString(new PhoneNumber(phoneNumber.countryCode, phoneNumber.phoneNumber).getFullPhoneNumber())));

		return q.executeQuery().size() == 0;
	}

	public Boolean validateEmailAddress(String emailAddress) {
		if (emailAddress == null)
			throw new InvalidInputException("Email address is required");

		Query2 q = Query2.select(infinity.stone.user.schema.User.tableName);

		q.whereClause(QueryOperation2.equal(infinity.stone.user.schema.User.EmailAddress,
				FieldValue2.sqlString(emailAddress)));

		return q.executeQuery().size() == 0;
	}

	public TwilioVerificationReference1 requestVerificationCode(UserTargetParameter1 user) {
		User userInfo = resolveObject(user, new HashSet<Class<? extends DomainBase>>());

		PhoneNumberParameter1 phoneNumber = PhoneNumberUtil.mapToPhoneNumberParameter1(userInfo.getPhoneNumber());

		return LoginServices1.getVerificationCode(phoneNumber, appConfig.getTwillioAccountSid(),
				appConfig.getTwillioAuthToken());
	}

	public LoginReference1 verifyVerificationCode(HttpServletRequest request, HttpServletResponse response,
			TwilioVerificationParameter1 verificationData) {
		VerificationCheck verificationCheck = LoginServices1.checkVerification(appConfig.getTwillioAccountSid(),
				appConfig.getTwillioAuthToken(), verificationData.phoneNumber, verificationData.serviceSId,
				verificationData.verificationCode);

		LoginReference1 reference = new LoginReference1();
		if (verificationCheck.getValid()) {
			infinity.service.user.User userObj = new UserDetailService().loadUserByUsername(
					new PhoneNumber(verificationData.phoneNumber.countryCode, verificationData.phoneNumber.phoneNumber)
							.getFullPhoneNumber());

			AuthService.authorize(request, response, userObj);

			reference.id = userObj.getId().toString();
			reference.loginName = userObj.getUsername();
			reference.role = userObj.getRole().toString();
			reference.status = AuthStatus.SUCCESS.value;
			reference.jwt = jwtUtil.generateToken(reference.id, reference.loginName, reference.role, 10 * 60 * 1000);
		} else {
			reference.status = AuthStatus.FAILURE.value;
		}

		return reference;
	}

	public static UserDetails2 mapToUserDetails2(infinity.stone.user.domain.IUser user) {
		UserDetails2 details = new UserDetails2();
		details.id = user.getId().toString();
		details.name = user.getName();
		details.phoneNumber = PhoneNumberUtil.mapToPhoneNumberReference1(user.getPhoneNumber());
		details.emailAddress = user.getEmailAddress();
		details.role = user.getRole().getCode();

		return details;
	}

}
