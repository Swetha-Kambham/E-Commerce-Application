package infinity.service.implementation;

import java.net.URL;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.DeleteObjectsRequest;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.S3ObjectSummary;

import infinity.service.IAWSS3Service1;
import infinity.service.configuration.AppConfiguration;
import infinity.service.contracts.DeleteObjectParameter;
import infinity.service.contracts.GetSignedUrlsForObjectDownloadParameter;
import infinity.service.contracts.GetSignedUrlsForObjectUploadParameter;
import infinity.service.contracts.ListObjectsParameter;
import infinity.service.contracts.awss3.ListObjectOptions;
import infinity.service.contracts.awss3.ListObjectResult;
import infinity.service.contracts.awss3.S3Objects;
import infinity.service.contracts.awss3.SignedUrlDetails;
import infinity.service.contracts.awss3.SignedUrlsOptions;
import infinity.service.utils.CollectionUtils;

@Controller
public class AWSS3Service1 implements IAWSS3Service1 {

	@Autowired
	private AppConfiguration appConfig;

	@Override
	public SignedUrlDetails[] getSignedUrlsForObjectUpload(GetSignedUrlsForObjectUploadParameter input) {
		return getSignedUrls(input.options, HttpMethod.PUT);
	}

	@Override
	public SignedUrlDetails[] getSignedUrlsForObjectDownload(GetSignedUrlsForObjectDownloadParameter input) {
		return getSignedUrls(input.options, HttpMethod.GET);
	}

	@Override
	public ListObjectResult[] listObjects(ListObjectsParameter input) {
		return listObjects(input.options);
	}

	@Override
	public void deleteObject(DeleteObjectParameter input) {
		deleteObject(input.objectKeys);
	}

	public SignedUrlDetails[] getSignedUrls(SignedUrlsOptions options, HttpMethod methodType) {

		if (options == null || options.objects == null || options.objects.length == 0)
			return new SignedUrlDetails[0];

		try {
			AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(appConfig.getAWSCredentialsProvider())
					.withRegion(appConfig.getAWSRegion()).build();

			long expTimeMillis = Instant.now().toEpochMilli();
			expTimeMillis += 1000 * 60 * 60;

			List<SignedUrlDetails> signedUrlDetails = new ArrayList<SignedUrlDetails>();
			for (S3Objects object : options.objects) {
				URL url = s3Client.generatePresignedUrl(appConfig.getBucketName(), object.key, new Date(expTimeMillis),
						methodType);

				SignedUrlDetails signedUrlDetail = new SignedUrlDetails();
				signedUrlDetail.file = url.getFile();
				signedUrlDetail.path = url.getPath();
				signedUrlDetail.url = url.toString();
				signedUrlDetail.key = object.key;
				signedUrlDetails.add(signedUrlDetail);
			}

			return CollectionUtils.toArray(SignedUrlDetails.class, signedUrlDetails);

		} catch (AmazonServiceException e) {
			e.printStackTrace();
		} catch (SdkClientException e) {
			e.printStackTrace();
		}

		return null;
	}

	public ListObjectResult[] listObjects(ListObjectOptions options) {
		final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(appConfig.getAWSRegion())
				.withCredentials(appConfig.getAWSCredentialsProvider()).build();

		ListObjectsV2Request reqOptions = new ListObjectsV2Request();
		reqOptions.setBucketName(appConfig.getBucketName());
		reqOptions.setPrefix(options.prefix);
		reqOptions.setMaxKeys(options.maxKey != null ? options.maxKey : 1);

		List<S3ObjectSummary> objects = s3.listObjectsV2(reqOptions).getObjectSummaries();

		List<ListObjectResult> result = new ArrayList<ListObjectResult>();

		for (S3ObjectSummary ob : objects) {
			if (ob.getSize() > 0) {
				ListObjectResult listObjectResult = new ListObjectResult();
				listObjectResult.key = ob.getKey();
				listObjectResult.size = ob.getSize();
				result.add(listObjectResult);
			}

		}

		return CollectionUtils.toArray(ListObjectResult.class, result);
	}

	public void deleteObject(String[] keys) {
		final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(appConfig.getAWSRegion())
				.withCredentials(appConfig.getAWSCredentialsProvider()).build();
		try {
			DeleteObjectsRequest dor = new DeleteObjectsRequest(appConfig.getBucketName()).withKeys(keys);
			s3.deleteObjects(dor);
		} catch (AmazonServiceException e) {
			e.printStackTrace();
		}
	}

}
