package infinity.stone.seller.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.domain.base.RelationshipField;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;

import java.sql.Connection;
import java.sql.SQLException;

@DomainObject(schemaType = infinity.stone.seller.schema.Seller.class)
public class Seller extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private String StoreName;

	@PropertyField
	private String GSTNumber;

	@PropertyField
	private String Description;

	@PropertyField
	private JsonObject KeyValues;

	@RelationshipField
	private SellerFinancialDetails FinancialDetails;

	@RelationshipField
	private infinity.stone.user.domain.User User;

	private Seller() {
		super(new infinity.stone.seller.schema.Seller());
	}

	public Seller(infinity.stone.user.domain.User user) {
		super(new infinity.stone.seller.schema.Seller());
		setDefaults(user);
	}

	private void setDefaults(infinity.stone.user.domain.User user) {
		this.User = user;
		this.setId(user.getId());
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		propertyChangeListener(infinity.stone.seller.schema.Seller.Id.getFieldName(), id);
	}

	public infinity.stone.user.domain.User getUser() {
		if (Id == null) {
			return null;
		}

		if (this.User != null) {
			return this.User;
		}

		this.User = infinity.stone.user.domain.User.getPersistedObject(super.getData(), Id);

		if (this.User == null) {
			this.User = ObjectLoader.loadObject(infinity.stone.user.domain.User.class, Id);
		}

		return this.User;
	}

	public void setUser(infinity.stone.user.domain.User user) {
		Id = user != null ? user.getId() : null;
		User = user;
		propertyChangeListener(infinity.stone.seller.schema.Seller.Id.getFieldName(), Id);
	}

	public String getStoreName() {
		return StoreName;
	}

	public void setStoreName(String storeName) {
		StoreName = storeName;
		propertyChangeListener(infinity.stone.seller.schema.Seller.StoreName.getFieldName(), storeName);
	}

	public String getGSTNumber() {
		return GSTNumber;
	}

	public void setGSTNumber(String gstNumber) {
		GSTNumber = gstNumber;
		propertyChangeListener(infinity.stone.seller.schema.Seller.GstNumber.getFieldName(), gstNumber);
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
		propertyChangeListener(infinity.stone.seller.schema.Seller.Description.getFieldName(), description);
	}

	public String getKeyValues() {
		return KeyValues != null ? KeyValues.getJsonString() : null;
	}

	public void setKeyValues(JsonObject keyValues) {
		KeyValues = keyValues;
		propertyChangeListener(infinity.stone.seller.schema.Seller.KeyValues.getFieldName(), keyValues);
	}

	public SellerFinancialDetails getFinancialDetails() {
		if (Id == null) {
			return null;
		}

		if (this.FinancialDetails != null) {
			return this.FinancialDetails;
		}

		this.FinancialDetails = infinity.stone.seller.domain.SellerFinancialDetails.getPersistedObject(super.getData(),
				Id);

		if (this.FinancialDetails == null) {
			this.FinancialDetails = ObjectLoader
					.loadObjectOrDefault(infinity.stone.seller.domain.SellerFinancialDetails.class, Id);
		}

		return this.FinancialDetails;
	}

	public void setFinancialDetails(SellerFinancialDetails financialDetails) {
		FinancialDetails = financialDetails;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		Seller seller = (Seller) obj;

		return this.Id.equals(seller.Id);
	}

	@Override
	public int hashCode() {
		return Id.hashCode();
	}

	private void saveInternal() {
		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);

			super.save(this);
			if (FinancialDetails != null) {
				FinancialDetails.save();
			}

			if (wasAutoCommitFlagSet) {
				connection.commit();
				setPersisted(true);
				connection.close();
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private void deleteInternal() {
		if (!isPersisted())
			return;

		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();

		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);
			this.FinancialDetails.delete();
			super.delete(this);
			if (wasAutoCommitFlagSet) {
				connection.commit();
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void save() {
		saveInternal();
	}

	@Override
	public void delete() {
		deleteInternal();
	}

	public static Seller getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		Seller seller = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, infinity.stone.seller.schema.Seller.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				seller = new Seller();
				seller.Id = (UUID) id;
				seller.StoreName = findField(queryResultFields, infinity.stone.seller.schema.Seller.StoreName)
						.getString();
				seller.GSTNumber = findField(queryResultFields, infinity.stone.seller.schema.Seller.GstNumber)
						.getString();
				seller.Description = findField(queryResultFields, infinity.stone.seller.schema.Seller.Description)
						.getString();
				seller.KeyValues = new JsonObject(
						findField(queryResultFields, infinity.stone.seller.schema.Seller.KeyValues).getJson());

				seller.setPersisted(true);
				seller.setData(queryResult);

				return seller;
			}
		}

		return seller;
	}

	public static Seller getPersistedObject(HashMap<String, Field2> queryResult) {
		Seller seller = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, infinity.stone.seller.schema.Seller.Id);

		if (idField.getUUID() != null) {
			seller = new Seller();
			seller.Id = idField.getUUID();
			seller.StoreName = findField(queryResultFields, infinity.stone.seller.schema.Seller.StoreName).getString();
			seller.GSTNumber = findField(queryResultFields, infinity.stone.seller.schema.Seller.GstNumber).getString();
			seller.Description = findField(queryResultFields, infinity.stone.seller.schema.Seller.Description)
					.getString();
			seller.KeyValues = new JsonObject(
					findField(queryResultFields, infinity.stone.seller.schema.Seller.KeyValues).getJson());

			seller.setPersisted(true);
			seller.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return seller;
		}

		return seller;
	}

}
