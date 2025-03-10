package infinity.service;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import infinity.service.contracts.DeleteObjectParameter;
import infinity.service.contracts.GetSignedUrlsForObjectDownloadParameter;
import infinity.service.contracts.GetSignedUrlsForObjectUploadParameter;
import infinity.service.contracts.ListObjectsParameter;
import infinity.service.contracts.awss3.ListObjectResult;
import infinity.service.contracts.awss3.SignedUrlDetails;

@RestController
@RequestMapping("/AWSS3Service1/*")
public interface IAWSS3Service1 {

	@RequestMapping(value = "/GetSignedUrlsForObjectUpload", method = RequestMethod.POST)
	@Secured({ "ROLE_SELLER", "ROLE_ADMIN" })
	public SignedUrlDetails[] getSignedUrlsForObjectUpload(@RequestBody GetSignedUrlsForObjectUploadParameter input);

	@RequestMapping(value = "/GetSignedUrlsForObjectDownload", method = RequestMethod.POST)
	public SignedUrlDetails[] getSignedUrlsForObjectDownload(
			@RequestBody GetSignedUrlsForObjectDownloadParameter input);

	@RequestMapping(value = "/ListObjects", method = RequestMethod.POST)
	public ListObjectResult[] listObjects(@RequestBody ListObjectsParameter input);

	@RequestMapping(value = "/DeleteObject", method = RequestMethod.POST)
	@Secured({ "ROLE_SELLER", "ROLE_ADMIN" })
	public void deleteObject(@RequestBody DeleteObjectParameter input);

}
