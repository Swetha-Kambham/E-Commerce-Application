package infinity.service.implementation;

import infinity.service.contracts.common.CurrencyReference1;
import infinity.service.contracts.general.SocialMediaReference1;
import infinity.service.contracts.general.SocialMediaTargetParameter1;
import infinity.service.contracts.state.StateReference1;
import infinity.service.exception.InvalidInputException;
import infinity.service.utils.MappingUtils;
import infinity.stone.domain.Currency;
import infinity.stone.domain.SocialMedia2;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.OrderBy;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryFieldReference;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

public class GeneralService1 {

	public void putSocialMediaAccount(SocialMediaTargetParameter1 target, SocialMediaReference1 socialMedia) {
		SocialMedia2 sm = null;

		if (target != null && target.id != null) {
			sm = ObjectLoader.loadObject(SocialMedia2.class, UUID.fromString(target.id));
		} else {
			sm = new SocialMedia2();
		}

		sm.setName(socialMedia.name);
		sm.setEnabled(socialMedia.enabled);
		sm.setUrl(socialMedia.url);
		sm.save();
	}

	public SocialMediaReference1[] getSocialMediaAccounts() {

		Query2 q = Query2.select(infinity.stone.schema.SocialMedia.tableName);
		QueryFieldReference id = q.addField(infinity.stone.schema.SocialMedia.Id);
		QueryFieldReference name = q.addField(infinity.stone.schema.SocialMedia.Name, OrderBy.ASCENDING);
		QueryFieldReference url = q.addField(infinity.stone.schema.SocialMedia.Url);
		QueryFieldReference enabled = q.addField(infinity.stone.schema.SocialMedia.Enabled);

		q.setLimit(100);

		List<HashMap<String, Field2>> result = q.executeQuery();

		SocialMediaReference1[] socialMedias = new SocialMediaReference1[result.size()];

		for (int i = 0; i < result.size(); i++) {
			SocialMediaReference1 socialMedia = new SocialMediaReference1();
			socialMedia.id = id.getValue(result.get(i)).getUUID().toString();
			socialMedia.name = name.getValue(result.get(i)).getString();
			socialMedia.url = url.getValue(result.get(i)).getString();
			socialMedia.enabled = enabled.getValue(result.get(i)).getBool();

			socialMedias[i] = socialMedia;
		}

		return socialMedias;
	}

	public SocialMediaReference1 getSocialMediaAccount(SocialMediaTargetParameter1 target) {
		if (target == null || target.id == null)
			throw new InvalidInputException("id is required");

		SocialMedia2 sm = ObjectLoader.loadObject(SocialMedia2.class, UUID.fromString(target.id));

		SocialMediaReference1 smr = new SocialMediaReference1();
		smr.id = sm.getId().toString();
		smr.name = sm.getName();
		smr.url = sm.getUrl();
		smr.enabled = sm.getEnabled();

		return smr;
	}

	public void deleteSocialMediaAccount(SocialMediaTargetParameter1 target) throws Exception {
		if (target.id == null)
			throw new InvalidInputException("Id is required");

		SocialMedia2 sm = ObjectLoader.loadObject(SocialMedia2.class, UUID.fromString(target.id));
		sm.delete();
	}

	public StateReference1[] getAllStates() {

		Query2 q = Query2.select(infinity.stone.schema.State.tableName);
		QueryFieldReference id = q.addField(infinity.stone.schema.State.Id);
		QueryFieldReference name = q.addField(infinity.stone.schema.State.Name, OrderBy.ASCENDING);
		q.setLimit(100);

		List<HashMap<String, Field2>> result = q.executeQuery();

		StateReference1[] stateReferences = new StateReference1[result.size()];

		for (int i = 0; i < result.size(); i++) {
			stateReferences[i] = new StateReference1();
			stateReferences[i].id = id.getValue(result.get(i)).getInteger();
			stateReferences[i].name = name.getValue(result.get(i)).getString();
		}

		return stateReferences;
	}

	public CurrencyReference1 getBaseCurrency() {
		return MappingUtils.mapToCurrencyReference1(Currency.getBasecurrency());
	}

}
