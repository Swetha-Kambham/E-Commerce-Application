package infinity.service.utils;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.Builder;
import java.util.HashMap;
import java.util.Map;

import infinity.stone.helper.domain.JsonObject;

public class HttpRequestUtil {

	public static JsonObject post(URI uri, HashMap<String, String> headers, JsonObject body) {
		HttpClient client = HttpClient.newHttpClient();
		HttpResponse<String> response = null;
		Builder request = HttpRequest.newBuilder().uri(uri);

		for (Map.Entry<String, String> e : headers.entrySet()) {
			request.setHeader(e.getKey(), e.getValue());
		}

		try {
			response = client.send(request.POST(HttpRequest.BodyPublishers.ofString(body.getJsonString())).build(),
					HttpResponse.BodyHandlers.ofString());
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}

		if (response.statusCode() == 200)
			return new JsonObject(response.body());

		return null;
	}
	
	public static JsonObject get(URI uri, HashMap<String, String> headers) {
		HttpClient client = HttpClient.newHttpClient();
		HttpResponse<String> response = null;
		Builder request = HttpRequest.newBuilder().uri(uri);

		for (Map.Entry<String, String> e : headers.entrySet()) {
			request.setHeader(e.getKey(), e.getValue());
		}

		try {
			response = client.send(request.GET().build(),
					HttpResponse.BodyHandlers.ofString());
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}

		if (response.statusCode() == 200)
			return new JsonObject(response.body());

		return null;
	}

}
