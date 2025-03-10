package infinity.stone.seller.domain;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;

@DomainObject(schemaType = infinity.stone.seller.schema.SellerFinancialDetails.class)
public class SellerFinancialDetails extends DomainBase {

	@PropertyField
	private infinity.stone.seller.domain.Seller Seller;

	@PropertyField
	private String PanNumber;

	@PropertyField
	private String AadharNumber;

	@PropertyField
	private String BankAccountHolderName;

	@PropertyField
	private String BankAccountNumber;

	@PropertyField
	private String IfscCode;

	@PropertyField
	private String IsDetailsVerified;

	@PropertyField
	private String IsAccountVerified;

	private UUID sellerIdInternal;

	public SellerFinancialDetails() {
		super(new infinity.stone.seller.schema.SellerFinancialDetails());
	}

	public infinity.stone.seller.domain.Seller getSeller() {
		if (sellerIdInternal == null) {
			return null;
		}

		if (this.Seller != null) {
			return this.Seller;
		}

		this.Seller = infinity.stone.seller.domain.Seller.getPersistedObject(super.getData(), sellerIdInternal);

		if (this.Seller == null) {
			this.Seller = ObjectLoader.loadObject(Seller.class, sellerIdInternal);
		}

		return this.Seller;
	}

	public void setSeller(infinity.stone.seller.domain.Seller seller) {
		sellerIdInternal = seller != null ? seller.getId() : null;
		Seller = seller;
		propertyChangeListener(infinity.stone.seller.schema.SellerFinancialDetails.SellerId.getFieldName(),
				sellerIdInternal);
	}

	public String getPanNumber() {
		return PanNumber;
	}

	public void setPanNumber(String panNumber) {
		this.PanNumber = panNumber;
		propertyChangeListener(infinity.stone.seller.schema.SellerFinancialDetails.PANNumber.getFieldName(), panNumber);
	}

	public String getAadharNumber() {
		return AadharNumber;
	}

	public void setAadharNumber(String aadharNumber) {
		this.AadharNumber = aadharNumber;
		propertyChangeListener(infinity.stone.seller.schema.SellerFinancialDetails.AadharNumber.getFieldName(),
				aadharNumber);
	}

	public String getBankAccountHolderName() {
		return BankAccountHolderName;
	}

	public void setBankAccountHolderName(String bankAccountHolderName) {
		BankAccountHolderName = bankAccountHolderName;
	}

	public String getBankAccountNumber() {
		return BankAccountNumber;
	}

	public void setBankAccountNumber(String bankAccountNumber) {
		this.BankAccountNumber = bankAccountNumber;
		propertyChangeListener(infinity.stone.seller.schema.SellerFinancialDetails.BankAccountNumber.getFieldName(),
				bankAccountNumber);
	}

	public String getIfscCode() {
		return IfscCode;
	}

	public void setIfscCode(String ifscCode) {
		this.IfscCode = ifscCode;
		propertyChangeListener(infinity.stone.seller.schema.SellerFinancialDetails.IFSCCode.getFieldName(), ifscCode);
	}

	public String getIsDetailsVerified() {
		return IsDetailsVerified;
	}

	public void setIsDetailsVerified(String isDetailsVerified) {
		IsDetailsVerified = isDetailsVerified;
	}

	public String getIsAccountVerified() {
		return IsAccountVerified;
	}

	public void setIsAccountVerified(String isAccountVerified) {
		IsAccountVerified = isAccountVerified;
	}

	@Override
	public int hashCode() {
		return this.sellerIdInternal.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null || obj.getClass() != this.getClass())
			return false;

		SellerFinancialDetails sellerFinancialDetails = (SellerFinancialDetails) obj;

		return sellerFinancialDetails.sellerIdInternal.equals(this.sellerIdInternal);
	}

	@Override
	public void save() {
		super.save(this);
	}

	@Override
	public void delete() {
		super.delete(this);
	}

	public static SellerFinancialDetails getPersistedObject(List<HashMap<String, Field2>> queryResult,
			Object sellerId) {
		SellerFinancialDetails sellerFinancialDetails = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 sellerIdField = findField(queryResultFields,
					infinity.stone.seller.schema.SellerFinancialDetails.SellerId);

			if (sellerIdField.getUUID() != null && sellerIdField.getUUID().equals(sellerId)) {

				sellerFinancialDetails = new SellerFinancialDetails();
				sellerFinancialDetails.sellerIdInternal = (UUID) sellerId;
				sellerFinancialDetails.PanNumber = findField(queryResultFields,
						infinity.stone.seller.schema.SellerFinancialDetails.PANNumber).getString();
				sellerFinancialDetails.AadharNumber = findField(queryResultFields,
						infinity.stone.seller.schema.SellerFinancialDetails.AadharNumber).getString();
				sellerFinancialDetails.BankAccountNumber = findField(queryResultFields,
						infinity.stone.seller.schema.SellerFinancialDetails.BankAccountNumber).getString();
				sellerFinancialDetails.IfscCode = findField(queryResultFields,
						infinity.stone.seller.schema.SellerFinancialDetails.IFSCCode).getString();

				sellerFinancialDetails.setData(queryResult);
				sellerFinancialDetails.setPersisted(true);

				return sellerFinancialDetails;
			}
		}

		return sellerFinancialDetails;
	}

	public static SellerFinancialDetails getPersistedObject(HashMap<String, Field2> queryResult) {
		SellerFinancialDetails sellerFinancialDetails = null;
		Collection<Field2> queryResultFields = queryResult.values();
		Field2 sellerIdField = findField(queryResultFields,
				infinity.stone.seller.schema.SellerFinancialDetails.SellerId);

		if (sellerIdField.getUUID() != null) {
			sellerFinancialDetails = new SellerFinancialDetails();
			sellerFinancialDetails.sellerIdInternal = sellerIdField.getUUID();
			sellerFinancialDetails.PanNumber = findField(queryResultFields,
					infinity.stone.seller.schema.SellerFinancialDetails.PANNumber).getString();
			sellerFinancialDetails.AadharNumber = findField(queryResultFields,
					infinity.stone.seller.schema.SellerFinancialDetails.AadharNumber).getString();
			sellerFinancialDetails.BankAccountNumber = findField(queryResultFields,
					infinity.stone.seller.schema.SellerFinancialDetails.BankAccountNumber).getString();
			sellerFinancialDetails.IfscCode = findField(queryResultFields,
					infinity.stone.seller.schema.SellerFinancialDetails.IFSCCode).getString();

			sellerFinancialDetails.setData(Arrays.asList(queryResult));
			sellerFinancialDetails.setPersisted(true);

			return sellerFinancialDetails;
		}

		return sellerFinancialDetails;
	}

}
