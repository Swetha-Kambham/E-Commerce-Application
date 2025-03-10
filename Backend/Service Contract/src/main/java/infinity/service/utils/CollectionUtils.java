package infinity.service.utils;

import java.lang.reflect.Array;
import java.util.List;

public class CollectionUtils {

	public static <T> T[] toArray(Class<T> c, List<T> list) {

		@SuppressWarnings("unchecked")
		final T[] arr = (T[]) Array.newInstance(c, list.size());

		for (int i = 0; i < list.size(); i++) {
			arr[i] = list.get(i);
		}
		return arr;
	}

}