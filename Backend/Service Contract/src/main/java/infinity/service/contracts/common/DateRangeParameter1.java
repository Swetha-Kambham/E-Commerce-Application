package infinity.service.contracts.common;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class DateRangeParameter1 
{
	
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date startDate;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date endDate;

}
