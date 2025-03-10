package infinity.service.implementation;

import infinity.service.ISellerService1;
import infinity.service.configuration.AppConfiguration;
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
import infinity.service.contracts.common.AddressParameter1;
import infinity.service.contracts.common.PasswordParameter1;
import infinity.service.contracts.common.PhoneNumberParameter1;
import infinity.service.contracts.login.LoginReference1;
import infinity.service.contracts.login.TwilioVerificationParameter1;
import infinity.service.contracts.login.TwilioVerificationReference1;
import infinity.service.contracts.seller.SellerAddressParameter1;
import infinity.service.contracts.seller.SellerAddressReference1;
import infinity.service.contracts.seller.SellerFinancialDetailParameter1;
import infinity.service.contracts.seller.SellerFinancialReference1;
import infinity.service.contracts.seller.SellerParameter1;
import infinity.service.contracts.seller.SellerUpdateParameter1;
import infinity.service.contracts.state.StateReference1;
import infinity.service.contracts.user.UserAddressTargetParameter1;
import infinity.service.exception.InvalidInputException;
import infinity.service.keys.AuthStatus;
import infinity.service.contracts.seller.SellerReference1;
import infinity.service.contracts.seller.SellerReference2;
import infinity.service.contracts.seller.SellerReference3;
import infinity.service.contracts.seller.SellerTargetParameter1;
import infinity.service.utils.JWTUtil;
import infinity.service.utils.PhoneNumberUtil;
import infinity.stone.domain.State;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.helper.domain.PhoneNumber;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.seller.domain.Seller;
import infinity.stone.seller.domain.SellerFinancialDetails;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryFieldReference;
import infinity.stone.sql.helper.QueryOperation2;
import infinity.stone.user.domain.Address;
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
public class SellerService1 implements ISellerService1 {

	private JWTUtil jwtUtil = new JWTUtil();

	@Autowired
	private AppConfiguration appConfig;

	@Override
	public void putSeller(PutSellerParameter input) {
		putSeller(input.seller);
	}

	@Override
	public void updatePassword(UpdatePasswordParameter input) {
		updatePassword(input.seller, input.newPassword);
	}

	@Override
	public void updateSellerDetails(UpdateSellerDetailsParameter input) {
		updateSellerDetails(input.target, input.details);
	}

	@Override
	public void updateSellerAddress(UpdateSellerAddressParameter input) {
		updateSellerAddress(input.target, input.address);
	}

	@Override
	public void putSellerFinancialDetails(PutSellerFinancialDetailsParameter input) {
		putSellerFinancialDetails(input.target, input.financialDetails);
	}

	@Override
	public SellerReference2 getSellerDetails(GetSellerDetailsParameter input) {
		return getSellerDetails(input.target);
	}

	@Override
	public SellerReference1[] getAllSellers(GetAllSellersParameter input) {
		return getAllSellers();
	}

	@Override
	public Boolean validatePhoneNumber(ValidatePhoneNumberParameter input) {
//		return validatePhoneNumber(input.phoneNumber);
		return true;
	}

	@Override
	public Boolean validateEmailAddress(ValidateEmailAddressParameter input) {
//		return validateEmailAddress(input.emailAddress);
		return true;
	}

	@Override
	public Boolean validateStoreName(ValidateStoreNameParameter input) {
		return validateStoreName(input.storeName);
	}

	@Override
	public TwilioVerificationReference1 requestVerificationCode(RequestVerificationCodeParameter input) {
//		return requestVerificationCode(input.seller);
		return null;
	}

	@Override
	public LoginReference1 verifyVerificationCode(HttpServletRequest request, HttpServletResponse response,
			VerifyVerificationCodeParameter input) {
		return verifyVerificationCode(request, response, input.verificationData);
	}

	static Query2 getSellerDetailsQuery(Set<Class<? extends DomainBase>> relationshipToLoad) {
		Query2 q = Query2.select(infinity.stone.seller.schema.Seller.tableName);
		q.addFields(new infinity.stone.seller.schema.Seller().getAllFields());

		if (relationshipToLoad.contains(infinity.stone.user.domain.User.class)) {
			q.innerJoin(infinity.stone.user.schema.User.tableName, infinity.stone.seller.schema.Seller.Id,
					infinity.stone.user.schema.User.Id);
			q.addFields(new infinity.stone.user.schema.User().getAllFields());

		}

		return q;
	}

	static Seller getSellerDetails(UUID sellerId, Set<Class<? extends DomainBase>> relationshipToLoad) {
		Query2 q = getSellerDetailsQuery(relationshipToLoad);

		q.whereClause(QueryOperation2.equal(infinity.stone.seller.schema.Seller.Id, FieldValue2.sqlBinary(sellerId)));

		return ObjectLoader.loadObject(Seller.class, sellerId, q);
	}

	public void putSeller(SellerParameter1 seller) {

		User u = new User();
		u.setName(seller.name);
		u.setRole(infinity.stone.user.domain.Role.SELLER);
		u.setEmailAddress(seller.emailAddress);
		u.setPhoneNumber(new PhoneNumber(seller.phoneNumber.countryCode, seller.phoneNumber.phoneNumber));

		Seller s = new Seller(u);
		s.setDescription(seller.description);
		s.setGSTNumber(seller.gstNumber);
		s.setStoreName(seller.storeName);

		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();

		try {
			connection.setAutoCommit(false);
			u.save();
			AuthService.createUserCredentials(u, seller.password);
			s.save();
			connection.commit();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			schema.connection.SqlConnection.closeConnection();
		}

	}

	static Seller resolveObject(SellerTargetParameter1 target, boolean loadUser) {

		if (target == null || (target.id == null && target.phoneNumber == null && target.emailAddress == null)) {
			throw new InvalidInputException("Either of id, phone number or email is required");
		}

		HashSet<Class<? extends DomainBase>> relationshipToLoad = new HashSet<Class<? extends DomainBase>>();
		if (loadUser) {
			relationshipToLoad.add(User.class);
		}

		Query2 query = getSellerDetailsQuery(relationshipToLoad);
		query.whereClause(QueryOperation2.equal(FieldValue2.sqlInt(1), FieldValue2.sqlInt(1)));

		if (target.id != null) {
			query.whereAndClause(QueryOperation2.equal(infinity.stone.seller.schema.Seller.Id,
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

		return infinity.stone.seller.domain.Seller.getPersistedObject(query.executeQuery().get(0));
	}

	public void updatePassword(SellerTargetParameter1 target, PasswordParameter1 newPassword) {
		Seller seller = resolveObject(target, true);
		AuthService.updatePassword(seller.getUser(), newPassword.password);

	}

	static PhoneNumberParameter1 mapToPhoneNumberParameter1(PhoneNumber phoneNumber) {
		PhoneNumberParameter1 phoneNumberParameter = new PhoneNumberParameter1();
		phoneNumberParameter.countryCode = phoneNumber.getCountryCode();
		phoneNumberParameter.phoneNumber = phoneNumber.getPhoneNumber();

		return phoneNumberParameter;
	}

	static AddressParameter1 mapToAddressParameter1(SellerAddressParameter1 address, PhoneNumber phoneNumber) {

		AddressParameter1 addr = new AddressParameter1();
		addr.addressLine1 = address.addressLine1;
		addr.addressLine2 = address.addressLine2;
		addr.addressLine3 = address.addressLine3;
		addr.landmark = address.landmark;
		addr.city = address.city;
		addr.pinCode = address.pinCode;
		addr.stateId = address.stateId;
		addr.phoneNumber = mapToPhoneNumberParameter1(phoneNumber);

		return addr;
	}

	public void updateSellerAddress(SellerTargetParameter1 target, SellerAddressParameter1 address) {

		Seller seller = resolveObject(target, true);

		AddressParameter1 addr = mapToAddressParameter1(address, seller.getUser().getPhoneNumber());

		List<Address> existingAddresses = seller.getUser().getAddresses();

		if (existingAddresses == null || existingAddresses.size() == 0) {
			UserService1.putAddressInternal(seller.getUser(), null, addr);
		} else {
			UserAddressTargetParameter1 userAddr = new UserAddressTargetParameter1();
			userAddr.id = existingAddresses.get(0).getId().toString();
			UserService1.putAddressInternal(seller.getUser(), userAddr, addr);
		}
	}

	public void updateSellerDetails(SellerTargetParameter1 target, SellerUpdateParameter1 param) {

		Seller seller = resolveObject(target, true);

		User u = seller.getUser();

//		if (param.name != null) {
//			seller.setName(param.name.value);
//		}

		if (param.storeName != null) {
			seller.setStoreName(param.storeName.value);
		}

		if (param.description != null) {
			seller.setDescription(param.description.value);
		}

//		if (param.emailAddress != null) {
//			seller.setEmailAddress(param.emailAddress.value);
//			u.setLoginName2(param.emailAddress.value);
//		}

//		if (param.phoneNumber != null) {
//			seller.setPhoneNumber(
//					new PhoneNumber(param.phoneNumber.value.countryCode, param.phoneNumber.value.phoneNumber));
//			u.setLoginName1(new PhoneNumber(param.phoneNumber.value.countryCode, param.phoneNumber.value.phoneNumber)
//					.getFullPhoneNumber());
//		}

//		if (param.dateOfBirth != null) {
//			seller.setDateOfBirth(param.dateOfBirth.value);
//		}

		if (param.gstNumber != null) {
			seller.setGSTNumber(param.gstNumber.value);
		}

		seller.save();

	}

	public void putSellerFinancialDetails(SellerTargetParameter1 target,
			SellerFinancialDetailParameter1 financialDetail) {

		Seller seller = resolveObject(target, false);

		SellerFinancialDetails finDetails = seller.getFinancialDetails();

		if (finDetails == null) {
			finDetails = new SellerFinancialDetails();
		}

		finDetails.setAadharNumber(financialDetail.aadharNumber);
		finDetails.setPanNumber(financialDetail.panNumber);
		finDetails.setBankAccountHolderName("test");
		finDetails.setBankAccountNumber(financialDetail.bankAccountNumber);
		finDetails.setIfscCode(financialDetail.ifscCode);
		finDetails.setSeller(seller);

		seller.setFinancialDetails(finDetails);

		seller.save();

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

	static SellerAddressReference1 mapToSellerAddressReference1(Address address) {
		if (address == null) {
			return null;
		}

		SellerAddressReference1 ref = new SellerAddressReference1();

		ref.addressLine1 = address.getAddressLine1();
		ref.addressLine2 = address.getAddressLine2();
		ref.addressLine3 = address.getAddressLine3();
		ref.landmark = address.getLandmark();
		ref.city = address.getCity();
		ref.pinCode = address.getPinCode();
		ref.state = mapToStateReference1(address.getState());

		return ref;
	}

	static SellerFinancialReference1 mapToSellerFinancialReference1(SellerFinancialDetails financialDetails) {
		if (financialDetails == null) {
			return null;
		}

		SellerFinancialReference1 ref = new SellerFinancialReference1();

		ref.sellerId = financialDetails.getSeller().getId().toString();
		ref.panNumber = financialDetails.getPanNumber();
		ref.aadharNumber = financialDetails.getAadharNumber();
		ref.bankAccountNumber = financialDetails.getBankAccountNumber();
		ref.ifscCode = financialDetails.getIfscCode();

		return ref;
	}

	static SellerReference2 mapToSellerReference2(Seller seller) {

		SellerReference2 ref = new SellerReference2();
		ref.id = seller.getId().toString();
		ref.name = seller.getUser().getName();
		ref.storeName = seller.getStoreName();
		ref.description = seller.getDescription();
		ref.gstNumber = seller.getGSTNumber();
		ref.phoneNumber = PhoneNumberUtil.mapToPhoneNumberReference1(seller.getUser().getPhoneNumber());
		ref.emailAddress = seller.getUser().getEmailAddress();

		List<Address> addresses = seller.getUser().getAddresses();
		if (addresses.size() > 0) {
			ref.address = mapToSellerAddressReference1(addresses.get(0));
		}

		ref.financialDetails = mapToSellerFinancialReference1(seller.getFinancialDetails());

		return ref;
	}

	public SellerReference2 getSellerDetails(SellerTargetParameter1 target) {
		Seller sellerObj = resolveObject(target, true);

		return mapToSellerReference2(sellerObj);

	}

	static SellerReference1 mapToSellerReference1(HashMap<String, Field2> queryResult,
			HashMap<String, QueryFieldReference> queryFields) {

		SellerReference1 seller = new SellerReference1();

		seller.id = queryFields.get("Seller.Id").getValue(queryResult).getUUID().toString();
		seller.description = queryFields.get("Seller.Description").getValue(queryResult).getString();
		seller.storeName = queryFields.get("Seller.StoreName").getValue(queryResult).getString();
		seller.name = queryFields.get("User.Name").getValue(queryResult).getString();
		seller.emailAddress = queryFields.get("User.EmailAddress").getValue(queryResult).getString();
		seller.phoneNumber = PhoneNumberUtil
				.mapToPhoneNumberReference1(queryFields.get("User.PhoneNumber").getValue(queryResult).getString());
		seller.enabled = queryFields.get("User.Enabled").getValue(queryResult).getBool();

		return seller;

	}

	public SellerReference1[] getAllSellers() {

		Query2 query = Query2.select(infinity.stone.seller.schema.Seller.tableName);
		query.innerJoin(infinity.stone.user.schema.User.tableName, infinity.stone.seller.schema.Seller.Id,
				infinity.stone.user.schema.User.Id);

		query.setLimit(1000);
		query.setOffset(0);

		HashMap<String, QueryFieldReference> queryFields = new HashMap<String, QueryFieldReference>();

		queryFields.put("Seller.Id", query.addField(infinity.stone.seller.schema.Seller.Id));
		queryFields.put("Seller.Description", query.addField(infinity.stone.seller.schema.Seller.Description));
		queryFields.put("Seller.StoreName", query.addField(infinity.stone.seller.schema.Seller.StoreName));

		queryFields.put("User.Name", query.addField(infinity.stone.user.schema.User.Name));
		queryFields.put("User.EmailAddress", query.addField(infinity.stone.user.schema.User.EmailAddress));
		queryFields.put("User.PhoneNumber", query.addField(infinity.stone.user.schema.User.PhoneNumber));

		List<HashMap<String, Field2>> result = query.executeQuery();

		SellerReference1[] references = new SellerReference1[result.size()];

		for (int i = 0; i < result.size(); i++) {
			references[i] = mapToSellerReference1(result.get(i), queryFields);
		}

		return references;
	}

//	public Boolean validatePhoneNumber(PhoneNumberParameter1 phoneNumber) {
//		if (phoneNumber == null || phoneNumber.phoneNumber == null)
//			throw new InvalidInputException("Phone Number is required");
//
//		Query q = Query._select(domain.sql.Seller.table);
//		q._whereClause(QueryOperation.equal(domain.sql.Seller.phoneNumber,
//				FieldValue.sqlString(PhoneNumberUtil.formatPhoneNumber(phoneNumber))));
//		q._addField(domain.sql.Seller.id);
//
//		return q._executeQuery().size() == 0;
//	}
//
//	public Boolean validateEmailAddress(String emailAddress) {
//		if (emailAddress == null)
//			throw new InvalidInputException("Email address is required");
//
//		Query q = Query._select(domain.sql.Seller.table);
//		q._whereClause(QueryOperation.equal(domain.sql.Seller.emailAddress, FieldValue.sqlString(emailAddress)));
//		q._addField(domain.sql.Seller.id);
//
//		return q._executeQuery().size() == 0;
//	}

	public Boolean validateStoreName(String storeName) {
		Query2 query = Query2.select(infinity.stone.seller.schema.Seller.tableName);
		query.whereClause(
				QueryOperation2.equal(infinity.stone.seller.schema.Seller.StoreName, FieldValue2.sqlString(storeName)));
		query.addField(infinity.stone.seller.schema.Seller.Id);
		return query.executeQuery().size() == 0;
	}

	public TwilioVerificationReference1 requestVerificationCode(SellerTargetParameter1 seller) {
		Seller sellerObj = resolveObject(seller, true);

		PhoneNumberParameter1 phoneNumber = new PhoneNumberParameter1();
		phoneNumber.countryCode = sellerObj.getUser().getPhoneNumber().getCountryCode();
		phoneNumber.phoneNumber = sellerObj.getUser().getPhoneNumber().getPhoneNumber();

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

			SellerTargetParameter1 target = new SellerTargetParameter1();
			target.phoneNumber = verificationData.phoneNumber;

			infinity.service.user.User user = new UserDetailService().loadUserByUsername(
					new PhoneNumber(verificationData.phoneNumber.countryCode, verificationData.phoneNumber.phoneNumber)
							.getFullPhoneNumber());

			AuthService.authorize(request, response, user);

			reference.id = user.getId().toString();
			reference.loginName = user.getUsername();
			reference.role = user.getRole().toString();
			reference.status = AuthStatus.SUCCESS.value;
			reference.jwt = jwtUtil.generateToken(reference.id, reference.loginName, reference.role, 10 * 60 * 1000);
		} else {
			reference.status = AuthStatus.FAILURE.value;
		}

		return reference;
	}

	static SellerReference3 mapToSellerReference3(Seller seller) {
		SellerReference3 reference = new SellerReference3();
		reference.id = seller.getId().toString();
		reference.name = seller.getStoreName();
		reference.storeName = seller.getStoreName();

		return reference;
	}

}
