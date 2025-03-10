package infinity.stone.sql.helper;

import java.util.ArrayList;
import java.util.List;

public class QueryFieldOperation {

	private QueryFieldOperator queryFieldOperator;
	private List<Object> parameters;

	public QueryFieldOperation() {
		this.parameters = new ArrayList<Object>();
	}

	public static QueryFieldOperation replace(IField field, String from_string, String new_string) {

		QueryFieldOperation queryFieldOperation = new QueryFieldOperation();
		queryFieldOperation.queryFieldOperator = QueryFieldOperator.REPLACE;

		queryFieldOperation.parameters.add(field);
		queryFieldOperation.parameters.add(from_string);
		queryFieldOperation.parameters.add(new_string);

		return queryFieldOperation;
	}

	@Override
	public String toString() {
		return super.toString();
	}

}
