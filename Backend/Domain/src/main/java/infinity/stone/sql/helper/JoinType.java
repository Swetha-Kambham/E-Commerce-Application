package infinity.stone.sql.helper;

public enum JoinType {
	
	LEFT_JOIN("LEFT JOIN"),
	INNER_JOIN("INNER JOIN"),
	RIGHT_JOIN("RIGHT JOIN"),
	FULL_JOIN("FULL JOIN"),;
	
	public String value;
	
	JoinType(String value)
	{
		this.value = value;
	}
	
}
