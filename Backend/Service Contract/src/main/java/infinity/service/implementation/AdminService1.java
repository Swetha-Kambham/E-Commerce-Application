package infinity.service.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Controller;

import infinity.service.IAdminService1;
import infinity.service.contracts.common.UserDetails2;
import infinity.stone.domain.exception.ResourceNotFoundException;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryFieldReference;
import infinity.stone.sql.helper.QueryOperation2;

@Controller
public class AdminService1 implements IAdminService1 {

	@Override
	public String help() {
		return "Hello Admin";
	}

}
