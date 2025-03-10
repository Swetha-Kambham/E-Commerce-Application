package infinity.stone.sql.helper;

import java.util.HashMap;

public class QueryFieldReference {

	private String reference;

	@SuppressWarnings("unused")
	private QueryFieldReference() {

	}

	public QueryFieldReference(String reference) {
		this.reference = reference;
	}

	public Field2 getValue(HashMap<String, Field2> queryResult) {
		return queryResult.get(this.reference);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		QueryFieldReference queryFieldRef = (QueryFieldReference) obj;

		return this.reference != null && this.reference.equals(queryFieldRef.reference);
	}

	@Override
	public int hashCode() {
		return this.reference != null ? this.reference.hashCode() : super.hashCode();
	}

}
