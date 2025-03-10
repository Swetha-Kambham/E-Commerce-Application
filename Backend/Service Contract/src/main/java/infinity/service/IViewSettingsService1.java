package infinity.service;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import infinity.service.contracts.DeleteViewSettingsParameter;
import infinity.service.contracts.GetViewSettingsParameter;
import infinity.service.contracts.PutViewSettingsParameter;
import infinity.service.contracts.common.ViewSettingsDetails1;

@RestController
@RequestMapping("/ViewSettingsService1/*")
public interface IViewSettingsService1 {

	@RequestMapping(value = "/PutViewSettings", method = RequestMethod.POST)
	@Secured({ "ROLE_ADMIN", "ROLE_USER", "ROLE_SELLER" })
	public void putViewSettings(@RequestBody PutViewSettingsParameter input);

	@RequestMapping(value = "/DeleteViewSettings", method = RequestMethod.POST)
	@Secured({ "ROLE_ADMIN", "ROLE_USER", "ROLE_SELLER" })
	public void deleteViewSettings(@RequestBody DeleteViewSettingsParameter input);

	@RequestMapping(value = "/GetViewSettings", method = RequestMethod.POST)
	public ViewSettingsDetails1 getViewSettings(@RequestBody GetViewSettingsParameter input);

}
