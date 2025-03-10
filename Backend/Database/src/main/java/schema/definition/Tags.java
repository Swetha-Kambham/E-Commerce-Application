
package schema.definition;

import schema.annotation.Column;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.Binary;
import schema.column.types.Boolean;
import schema.column.types.Varchar;

@Table
public class Tags {

	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;

	@Column(size = 255)
	@NotNull
	@Unique(groupIndex = 1)
	public Varchar Name;

	@Column(size = 255)
	@NotNull
	@Unique(groupIndex = 1)
	public Varchar Value;

	@Column
	@NotNull
	public Boolean Enabled;
	
	public static int soln(int [] values)
	{
		int n = values.length;

		int sum1 = 0, sum2 = 0, sum3 = 0;

		for (int i = 0; i < n - 2; i+=2) {
			sum1 += values[i] * values[i + 1] * values[i + 2];
		}

		sum2 += values[n - 2] * values[n - 1] * values[0];
		for (int i = 1; i < n - 2; i+=2) {
			sum2 += values[i] * values[i + 1] * values[i + 2];
		}

		sum3 += values[n - 1] * values[0] * values[1];
		for (int i = 2; i < n - 2; i+=2 ) {
			sum3 += values[i] * values[i + 1] * values[i + 2];
		}
		
		System.out.println(sum1);
		System.out.println(sum2);
		System.out.println(sum3);

		if (sum1 != 0 && sum1 < sum2 && sum1 < sum3) {
			return sum1;
		} else if (sum2 != 0 && sum2 < sum1 && sum2 < sum3) {
			return sum2;
		}
		


		return sum3;
	}

	public static void main(String[] args) {
		System.out.println(soln(new int[] {3, 7, 4, 5}));
	}

}
