package infinity.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import infinity.service.filter.JWTRequestFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class SecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {

	@Bean
	public AuthProvider getAuthenticationProvider() {
		return new AuthProvider();
	}

	@Bean
	public LoginSuccessHandler getLoginSuccessHandler() {
		return new LoginSuccessHandler();
	}

	@Bean
	public LoginFailureHandler getLoginFailureHandler() {
		return new LoginFailureHandler();
	}

//	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static String[] getAllowedEndPoints() {
//		Set<Class> classes = Utils.getAllClassInsidePackage("infinity.service");
//		List<String> pathList = new ArrayList<String>();
//
//		for (Class c : classes) {
//			if (c.isAnnotationPresent(RestController.class) && c.isAnnotationPresent(RequestMapping.class)) {
//				RequestMapping controllerPath = (RequestMapping) c.getAnnotation(RequestMapping.class);
//				String rootValue = controllerPath.value()[0];
//
//				Method[] methods = c.getDeclaredMethods();
//
//				for (Method method : methods) {
//					if (method.isAnnotationPresent(RequestMapping.class)
//							&& !method.isAnnotationPresent(Secured.class)) {
//						String value = method.getAnnotation(RequestMapping.class).value()[0];
//						pathList.add(rootValue.subSequence(0, rootValue.length() - 2) + value);
//					}
//				}
//			}
//		}
//
//		String[] paths = new String[pathList.size()];
//
//		for (int i = 0; i < pathList.size(); i++) {
//			paths[i] = pathList.get(i);
//		}

		return new String[] { "/SellerService1/GetSellerDetails", "/SellerService1/PutSeller",
				"/SellerService1/ValidateStoreName", "/SellerService1/ValidateEmailAddress",
				"/SellerService1/VerifyVerificationCode", "/SellerService1/ValidatePhoneNumber",
				"/SellerService1/RequestVerificationCode", "/CategoryService1/GetCategory",
				"/CategoryService1/DeleteCategory", "/CategoryService1/PutCategory",
				"/CategoryService1/GetAllCategories", "/ViewSettingsService1/GetViewSettings", "/LoginServices1/Logout",
				"/LoginServices1/CompletePhoneVerification", "/LoginServices1/InitPhoneVerification",
				"/LoginServices1/UserLogin", "/LoginServices1/SellerLogin", "/LoginServices1/AdminLogin",
				"/ProductService2/GetProductViewDetails", "/ProductService2/GetPageOfProductView",
				"/AWSS3Service1/GetSignedUrlsForObjectDownload", "/AWSS3Service1/ListObjects",
				"/ProductService1/GetAllProducts", "/ProductService1/UpdateProductLocationTag",
				"/ProductService1/PutProductOptionAndValues", "/ProductService1/UpdateProductDescription",
				"/ProductService1/DeleteProductOptionValue", "/ProductService1/GetProductUnitDetail",
				"/ProductService1/GetProductOptionAndValues", "/ProductService1/DeleteProductOption",
				"/ProductService1/UpdateProductBasicDetails", "/ProductService1/PutProduct",
				"/ProductService1/PutProductSKU", "/ProductService1/GetProductDetails",
				"/ProductService1/DeleteProductSKU", "/ProductService1/GetPageOfProducts",
				"/ProductService1/GetProductSkus", "/ProductService1/UpdateProductTag", "/UserService1/PutUser",
				"/UserService1/GetUserDetails", "/UserService1/GetAllUsers", "/UserService1/ValidateEmailAddress",
				"/UserService1/VerifyVerificationCode", "/UserService1/ValidatePhoneNumber",
				"/UserService1/RequestVerificationCode", "/GeneralService1/PutSocialMediaAccount",
				"/GeneralService1/GetAllSocialMediaAccounts", "/GeneralService1/GetSocialMediaAccount",
				"/GeneralService1/DeleteSocialMediaAccount", "/GeneralService1/GetBaseCurrency",
				"/GeneralService1/GetAllStates" };
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(getAuthenticationProvider());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests().antMatchers(getAllowedEndPoints()).permitAll().anyRequest()
				.authenticated().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.formLogin().loginProcessingUrl("/auth/login").usernameParameter("loginName")
				.passwordParameter("password").successHandler(getLoginSuccessHandler())
				.failureHandler(getLoginFailureHandler());

		http.addFilterBefore(new JWTRequestFilter(), UsernamePasswordAuthenticationFilter.class);
	}

}
