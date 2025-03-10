package infinity.stone.helper.domain;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class JsonObject {

	private boolean isDirty = false;
	private ObjectMapper objectMapper = new ObjectMapper();

	private ObjectNode node;

	public JsonObject() {
		node = objectMapper.createObjectNode();
	}

	public JsonObject(String json) {
		this();
		this.setObjectNode(json);
	}

	public boolean isDirty() {
		return isDirty;
	}

	private void setDirty(boolean isDirty) {
		this.isDirty = isDirty;
	}

	public void addProperty(String key, String value) {
		if (!this.node.has(key)) {
			this.node.put(key, value);
			setDirty(true);
		}
	}

	public void addProperty(String key, Integer value) {
		if (!this.node.has(key)) {
			this.node.put(key, value);
			setDirty(true);
		}

	}

	public void addProperty(String key, Double value) {
		if (!this.node.has(key)) {
			this.node.put(key, value);
			setDirty(true);
		}
	}

	public void addProperty(String key, Boolean value) {
		if (!this.node.has(key)) {
			this.node.put(key, value);
			setDirty(true);
		}
	}

	public void addProperty(String key, Date value) {
		if (!this.node.has(key)) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			this.node.put(key, sdf.format(value));
			setDirty(true);
		}
	}

	public void addProperty(String key, Timestamp value) {
		if (!this.node.has(key)) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
			this.node.put(key, sdf.format(value));
			setDirty(true);
		}
	}

	public void addProperty(String key, ObjectNode value) {
		if (!this.node.has(key)) {
			this.node.set(key, value);
			setDirty(true);
		}
	}

	public void addProperty(String key, ArrayNode value) {
		if (!this.node.has(key)) {
			this.node.set(key, value);
			setDirty(true);
		}
	}

	public void addOrUpdateProperty(String key, String value) {
		this.node.put(key, value);
		setDirty(true);
	}

	public void addOrUpdateProperty(String key, Integer value) {
		this.node.put(key, value);
		setDirty(true);
	}

	public void addOrUpdateProperty(String key, Double value) {
		this.node.put(key, value);
		setDirty(true);
	}

	public void addOrUpdateProperty(String key, Boolean value) {
		this.node.put(key, value);
		setDirty(true);
	}

	public void addOrUpdateProperty(String key, Date value) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		this.node.put(key, sdf.format(value));
		setDirty(true);
	}

	public void addOrUpdateProperty(String key, Timestamp value) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		this.node.put(key, sdf.format(value));
		setDirty(true);
	}

	public void addOrUpdateProperty(String key, ObjectNode value) {
		this.node.set(key, value);
		setDirty(true);
	}
	
	public void addOrUpdateProperty(String key, ArrayNode value) {
		this.node.set(key, value);
		setDirty(true);
	}

	public void removeProperty(String key) {
		this.node.remove(key);
		setDirty(true);
	}

	public JsonNode getProperty(String key) {
		return this.node != null ? this.node.get(key) : null;
	}

	public String getPropertyAsString(String key) {
		return this.getProperty(key) != null && !this.getProperty(key).isNull() ? this.getProperty(key).asText() : null;
	}

	public Integer getPropertyAsInt(String key) {
		return this.getProperty(key) != null && !this.getProperty(key).isNull() ? this.getProperty(key).asInt() : null;
	}

	public Boolean getPropertyAsBool(String key) {
		return this.getProperty(key) != null && !this.getProperty(key).isNull() ? this.getProperty(key).asBoolean()
				: null;
	}

	public Double getPropertyAsNumeric(String key) {
		return this.getProperty(key) != null && !this.getProperty(key).isNull() ? this.getProperty(key).asDouble()
				: null;
	}

	public String getJsonString() {
		return this.node.toString();
	}

	public ObjectNode getJson() {
		return this.node;
	}

	public void setObjectNode(String json) {
		if (json == null)
			return;

		try {
			this.node = (ObjectNode) objectMapper.readTree(json);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}

}
