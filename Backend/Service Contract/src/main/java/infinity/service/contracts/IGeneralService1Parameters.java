package infinity.service.contracts;

import infinity.service.contracts.general.SocialMediaReference1;
import infinity.service.contracts.general.SocialMediaTargetParameter1;

public class IGeneralService1Parameters {
	
	public static class PutSocialMediaAccountParameter {
		
		public SocialMediaTargetParameter1 target;
		
		public SocialMediaReference1 socialMedia;
		
	}
	
	public static class GetSocialMediaAccountParameter {
		public SocialMediaTargetParameter1 target;
	}
	
	public static class DeleteSocialMediaAccountParameter {
		public SocialMediaTargetParameter1 target;
	}
	
}
