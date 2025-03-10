package infinity.stone.helper.domain;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.UUID;

public class GenericType {

	private String text;
	private Boolean bool;
	private UUID uuid;
	private Integer integer;
	private Double numeric;
	private Date date;
	private Time time;
	private Timestamp dateTime;

	public GenericType(Object value) {
		setValue(value);
	}

	public GenericType(Object value1, Object value2) {
		this(value1);
		setValue(value2);
	}

	public void setValue(Object value) {
		if (value == null)
			return;

		if (value.getClass().equals(String.class))
			this.text = (String) value;

		if (value.getClass().equals(Boolean.class))
			this.bool = (Boolean) value;

		if (value.getClass().equals(UUID.class))
			this.uuid = (UUID) value;

		if (value.getClass().equals(Date.class))
			this.integer = (Integer) value;

		if (value.getClass().equals(Double.class))
			this.numeric = (Double) value;

		if (value.getClass().equals(Date.class))
			this.date = (Date) value;

		if (value.getClass().equals(Time.class))
			this.time = (Time) value;

		if (value.getClass().equals(Timestamp.class))
			this.dateTime = (Timestamp) value;
	}

	public GenericType(String text, Boolean bool, UUID uuid, Integer integer, Double numeric, Date date, Time time,
			Timestamp dateTime) {
		this.text = text;
		this.bool = bool;
		this.uuid = uuid;
		this.integer = integer;
		this.numeric = numeric;
		this.date = date;
		this.time = time;
		this.dateTime = dateTime;
	}

	public String getText() {
		return text;
	}

	public static String tryGetText(HashMap<String, GenericType> map, String key) {
		GenericType object = map.get(key);
		return object != null ? object.getText() : null;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Boolean getBool() {
		return bool;
	}

	public static Boolean tryGetBool(HashMap<String, GenericType> map, String key) {
		GenericType object = map.get(key);
		return object != null ? object.getBool() : null;
	}

	public void setBool(Boolean bool) {
		this.bool = bool;
	}

	public UUID getUuid() {
		return uuid;
	}

	public static UUID tryGetUuid(HashMap<String, GenericType> map, String key) {
		GenericType object = map.get(key);
		return object != null ? object.getUuid() : null;
	}

	public void setUuid(UUID uuid) {
		this.uuid = uuid;
	}

	public Integer getInteger() {
		return integer;
	}

	public static Integer tryGetInteger(HashMap<String, GenericType> map, String key) {
		GenericType object = map.get(key);
		return object != null ? object.getInteger() : null;
	}

	public void setInteger(Integer integer) {
		this.integer = integer;
	}

	public Double getNumeric() {
		return numeric;
	}

	public static Double tryGetNumeric(HashMap<String, GenericType> map, String key) {
		GenericType object = map.get(key);
		return object != null ? object.getNumeric() : null;
	}

	public void setNumeric(Double numeric) {
		this.numeric = numeric;
	}

	public Date getDate() {
		return date;
	}

	public static Date tryGetDate(HashMap<String, GenericType> map, String key) {
		GenericType object = map.get(key);
		return object != null ? object.getDate() : null;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Time getTime() {
		return time;
	}

	public static Time tryGetTime(HashMap<String, GenericType> map, String key) {
		GenericType object = map.get(key);
		return object != null ? object.getTime() : null;
	}

	public void setTime(Time time) {
		this.time = time;
	}

	public Timestamp getDateTime() {
		return dateTime;
	}

	public static Timestamp tryGetDateTime(HashMap<String, GenericType> map, String key) {
		GenericType object = map.get(key);
		return object != null ? object.getDateTime() : null;
	}

	public void setDateTime(Timestamp dateTime) {
		this.dateTime = dateTime;
	}

}
