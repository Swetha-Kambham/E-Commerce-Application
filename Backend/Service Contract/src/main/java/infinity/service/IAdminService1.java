package infinity.service;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/AdminService1/*")
public interface IAdminService1 {
	
    @RequestMapping(value = "/Help", method = RequestMethod.GET)
    @Secured({ "ROLE_ADMIN" })
    public String help();

}
