package infinity.service.contracts.seller;


import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

import infinity.service.contracts.common.PhoneNumberParameter1;

public class SellerParameter1 {
	
	public String name;
	
	public String storeName;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date dateOfBirth;
	
	public String gstNumber;
	
	public String description;
	
	public String emailAddress;
	
	public PhoneNumberParameter1 phoneNumber;
	
	public String password;
	
	public String addressLine1;
	
	public String addressLine2;
	
	public String addressLine3;
	
	public String landmark;
	
	public String city;
	
	public String pinCode;
	
	public Integer stateId;
	
}