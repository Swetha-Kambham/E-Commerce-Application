package infinity.service.keys;

public enum AuthStatus {
	SUCCESS(1), FAILURE(0);

	public int value;

	AuthStatus(int value) {
		this.value = value;
	}
}
