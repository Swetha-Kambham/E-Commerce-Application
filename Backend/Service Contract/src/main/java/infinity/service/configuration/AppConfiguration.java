package infinity.service.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {

	private @Value("${twilio.account.sid}") String twillioAccountSid;
	private @Value("${twilio.account.authToken}") String twillioAuthToken;

	private @Value("${region}") String region;
	private @Value("${bucket}") String bucketName;
	private @Value("${aws.accesskey}") String awsAccessKey;
	private @Value("${aws.secretkey}") String awsSecretkey;

	private @Value("${cashfree.appId}") String cashfreeAppId;
	private @Value("${cashfree.secretKey}") String cashfreeSecretKey;
	private @Value("${cashfree.order.url}") String cashfreeOrderUrl;

	@Bean
	public AWSCredentialsProvider getAWSCredentialsProvider() {
		return new AWSCredentialsProvider(awsAccessKey, awsSecretkey);
	}

	@Bean
	public String getAWSRegion() {
		return region;
	}

	@Bean
	public String getBucketName() {
		return bucketName;
	}

	@Bean
	public String getCashfreeAppId() {
		return cashfreeAppId;
	}

	@Bean
	public String getCashfreeOrderUrl() {
		return cashfreeOrderUrl;
	}

	@Bean
	public String getCashfreeSecretKey() {
		return cashfreeSecretKey;
	}

	@Bean
	public String getTwillioAccountSid() {
		return twillioAccountSid;
	}

	@Bean
	public String getTwillioAuthToken() {
		return twillioAuthToken;
	}

	@Bean
	public void initializeDatabaseCredentials() {
		schema.connection.SqlConnection.initializeConfig();
	}

}
