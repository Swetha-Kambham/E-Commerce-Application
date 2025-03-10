package infinity.service.contracts.user;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import infinity.service.contracts.common.PhoneNumberParameter1;

public class UserParameter1 
{
	public String id;
	
	public String name;
	
	public String emailAddress;
	
	public PhoneNumberParameter1 phoneNumber;
	
	public String password;
	
	public String gender;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date dateOfBirth;
	
	public String timezoneOffset;
	
	public String language;
	
	public String latitude;
	
	public String longitude;
}