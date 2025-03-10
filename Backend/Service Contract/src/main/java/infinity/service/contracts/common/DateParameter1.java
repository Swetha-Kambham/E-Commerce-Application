package infinity.service.contracts.common;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class DateParameter1 
{

	@JsonFormat(pattern="yyyy-MM-dd")
	public Date value;
	
}
