package infinity.service.contracts.seller;

import java.sql.Date;

import infinity.service.contracts.common.PhoneNumberReference1;

public class SellerReference2 {
	
	public String id;
	
	public String name;
	
	public String storeName;
	
	public String gstNumber;
	
	public Date dateOfBirth;
	
	public String description;
	
	public String emailAddress;
	
	public PhoneNumberReference1 phoneNumber;
	
	public String password;
	
	public SellerAddressReference1 address;
	
	public SellerFinancialReference1 financialDetails;
	
	public Boolean enabled;
}