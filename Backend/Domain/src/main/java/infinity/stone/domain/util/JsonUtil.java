package infinity.stone.domain.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class JsonUtil {

	public static void main(String[] args) {
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode parentNode = objectMapper.createObjectNode();

		parentNode.put("test", "test");

		System.out.println(parentNode.get("test").asText());
	}

}
