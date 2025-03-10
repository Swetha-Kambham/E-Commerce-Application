package infinity.service.contracts.common;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class UserDetails2 
{
	public String id;
	
	public String name;
	
	public String role;
	
	public String emailAddress;
	
	public PhoneNumberReference1 phoneNumber;
	
	public String gender;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date dateOfBirth;
	
	public String timezoneOffset;
	
	public String language;
	
	public String latitude;
	
	public String longitude;
	
	public KeyValue[] customFields;
	
}