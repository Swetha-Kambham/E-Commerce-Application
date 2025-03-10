package infinity.stone.sql.helper;

import java.util.HashSet;
import java.util.Set;

public class TableReference {

	private String table;
	private String alias;

	private JoinType joinType;
	private Field2 leftField;
	private Field2 rightField;

	private Set<Field2> queryFields;

	private TableReference() {
		queryFields = new HashSet<Field2>();
	}

	public TableReference(String table, String alias) {
		this();
		this.table = table;
		this.alias = alias;
	}

	public String getTable() {
		return table;
	}

	public String getAlias() {
		return alias;
	}

	public Set<Field2> getQueryFields() {
		return queryFields;
	}

	public void addField(Field2 field) {
		if (field.getReferenceName().equals(this.table) && field.getTableNameAlias().equals(this.alias)) {
			this.queryFields.add(field);
		}
	}

	public JoinType getJoinType() {
		return joinType;
	}

	public void setJoinType(JoinType joinType) {
		this.joinType = joinType;
	}

	public Field2 getLeftField() {
		return leftField;
	}

	public void setLeftField(Field2 leftField) {
		this.leftField = leftField;
	}

	public Field2 getRightField() {
		return rightField;
	}

	public void setRightField(Field2 rightField) {
		this.rightField = rightField;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		TableReference tableReference = (TableReference) obj;

		return this.alias != null && this.alias.equals(tableReference.alias);
	}

	@Override
	public int hashCode() {
		return this.alias.hashCode();
	}
}
