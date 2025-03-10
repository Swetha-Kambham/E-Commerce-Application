package infinity.service.configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;

public class AWSCredentialsProvider implements com.amazonaws.auth.AWSCredentialsProvider {

	private String awsAccessKeyId, awsSecretAccessKey;

	public AWSCredentialsProvider(String awsAccessKeyId, String awsSecretAccessKey) {
		this.awsAccessKeyId = awsAccessKeyId;
		this.awsSecretAccessKey = awsSecretAccessKey;
	}

	@Override
	public AWSCredentials getCredentials() {
		return new BasicAWSCredentials(awsAccessKeyId, awsSecretAccessKey);
	}

	@Override
	public void refresh() {
	}

}
