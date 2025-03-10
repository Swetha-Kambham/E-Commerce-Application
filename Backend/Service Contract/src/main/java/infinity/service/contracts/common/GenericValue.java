package infinity.service.contracts.common;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class GenericValue {

	public String text;

	public String uuid;

	public Boolean bool;

	public Integer integer;

	public Double number;

	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date date;

}
