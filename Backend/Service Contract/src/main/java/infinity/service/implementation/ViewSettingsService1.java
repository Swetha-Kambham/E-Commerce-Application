package infinity.service.implementation;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import infinity.service.IViewSettingsService1;
import infinity.service.contracts.DeleteViewSettingsParameter;
import infinity.service.contracts.GetViewSettingsParameter;
import infinity.service.contracts.PutViewSettingsParameter;
import infinity.service.contracts.common.GenericKeyValue;
import infinity.service.contracts.common.GenericValue;
import infinity.service.contracts.common.ViewSettingsDetails1;
import infinity.service.contracts.common.ViewSettingsParameter1;
import infinity.service.contracts.common.ViewSettingsTargetParameter1;
import infinity.service.exception.InvalidInputException;
import infinity.stone.domain.ViewSettings2;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryFieldReference;
import infinity.stone.sql.helper.QueryOperation2;

@Controller
public class ViewSettingsService1 implements IViewSettingsService1 {

	@Override
	public void putViewSettings(PutViewSettingsParameter input) {
		putViewSettings(input.target, input.viewSettings);
	}

	@Override
	public void deleteViewSettings(DeleteViewSettingsParameter input) {
		deleteViewSettings(input.target);
	}

	@Override
	public ViewSettingsDetails1 getViewSettings(GetViewSettingsParameter input) {
		return getViewSettings(input.target);
	}

	static UUID resolveViewSettingsId(ViewSettingsTargetParameter1 target) {
		if (target == null || (target.id == null && target.name == null)) {
			throw new InvalidInputException("Either of id or name is required");
		}
		if (target.id != null) {
			return UUID.fromString(target.id);
		}

		Query2 q = Query2.select(infinity.stone.schema.ViewSettings.tableName);
		q.whereClause(QueryOperation2.equal(infinity.stone.schema.ViewSettings.Name, FieldValue2.sqlString(target.name)));
		QueryFieldReference idField = q.addField(infinity.stone.schema.ViewSettings.Id);
		List<HashMap<String, Field2>> queryResult = q.executeQuery();

		if (queryResult.size() == 1) {
			return idField.getValue(queryResult.get(0)).getUUID();
		}

		return null;
	}

	private static ArrayNode mapValuesToArrayNode(GenericValue[] values) {
		ObjectMapper mapper = new ObjectMapper();
		ArrayNode arrayNode = mapper.createArrayNode();

		for (GenericValue value : values) {
			ObjectNode objectNode = mapper.createObjectNode();
			objectNode.put("bool", value.bool);
			objectNode.put("integer", value.integer);
			objectNode.put("number", value.number);
			objectNode.put("text", value.text);
			objectNode.put("uuid", value.uuid);
			objectNode.put("date", value.date != null ? value.date.getTime() : null);

			arrayNode.add(objectNode);
		}

		return arrayNode;
	}

	private static GenericValue[] mapArrayNodeToValues(ArrayNode values) {
		List<GenericValue> results = new ArrayList<GenericValue>();

		for (JsonNode value : values) {
			GenericValue result = new GenericValue();

			result.bool = value.get("bool") != null ? value.get("bool").asBoolean() : null;
			result.integer = value.get("integer") != null ? value.get("integer").asInt() : null;
			result.number = value.get("number") != null ? value.get("number").asDouble() : null;
			result.text = value.get("text") != null ? value.get("text").asText() : null;
			result.uuid = value.get("uuid") != null ? value.get("uuid").asText() : null;
			result.date = value.get("date") != null ? new Date(value.get("date").asLong()) : null;

			results.add(result);
		}
		return results.toArray(new GenericValue[results.size()]);
	}

	public void putViewSettings(ViewSettingsTargetParameter1 target, ViewSettingsParameter1 viewSettings) {
		ViewSettings2 vSettings = null;

		if (target != null && (target.id != null || target.name != null)) {
			vSettings = ObjectLoader.loadObject(ViewSettings2.class, resolveViewSettingsId(target));
		} else {
			vSettings = new ViewSettings2();
		}

		vSettings.setName(viewSettings.name);
		if (viewSettings.enabled != null) {
			vSettings.setEnabled(viewSettings.enabled);
		}
		if (viewSettings.userId != null) {
			vSettings.setUserId(UUID.fromString(viewSettings.userId));
		}

		JsonObject json = new JsonObject();

		if (viewSettings.settings != null) {
			for (GenericKeyValue setting : viewSettings.settings) {
				json.addProperty(setting.key, mapValuesToArrayNode(setting.value));
			}
		}

		vSettings.setKeyValues(json);

		vSettings.save();
	}

	public void deleteViewSettings(ViewSettingsTargetParameter1 target) {
		ViewSettings2 viewSettings = ObjectLoader.loadObject(ViewSettings2.class, resolveViewSettingsId(target));
		viewSettings.delete();
	}

	static GenericKeyValue[] mapToGenericKeyValues(JsonObject json) {
		ObjectNode keyValues = json.getJson();
		Iterator<String> fields = keyValues.fieldNames();

		List<GenericKeyValue> results = new ArrayList<GenericKeyValue>();

		while (fields.hasNext()) {
			String key = fields.next();
			keyValues.get(key);
			GenericKeyValue result = new GenericKeyValue();
			result.key = key;
			result.value = mapArrayNodeToValues((ArrayNode) keyValues.get(key));
			results.add(result);
		}

		return results.toArray(new GenericKeyValue[results.size()]);
	}

	static ViewSettingsDetails1 mapToViewSettingsDetails1(ViewSettings2 viewSettings) {
		ViewSettingsDetails1 details = new ViewSettingsDetails1();
		details.name = viewSettings.getName();
		details.id = viewSettings.getId().toString();
		details.enabled = viewSettings.getEnabled();
		details.userId = viewSettings.getUserId() != null ? viewSettings.getUserId().toString() : null;
		details.settings = mapToGenericKeyValues(new JsonObject(viewSettings.getKeyValues()));
		return details;
	}

	public ViewSettingsDetails1 getViewSettings(ViewSettingsTargetParameter1 target) {
		ViewSettings2 viewSettings = ObjectLoader.loadObject(ViewSettings2.class, resolveViewSettingsId(target));
		return mapToViewSettingsDetails1(viewSettings);
	}

	public GenericKeyValue getViewSettings(ViewSettingsTargetParameter1 target, String key) {
		ViewSettings2 viewSettings = ObjectLoader.loadObject(ViewSettings2.class, resolveViewSettingsId(target));

		JsonNode node = new JsonObject(viewSettings.getKeyValues()).getJson().get(key);

		GenericKeyValue result = new GenericKeyValue();
		result.key = key;
		result.value = mapArrayNodeToValues((ArrayNode) node);

		return result;
	}

}
