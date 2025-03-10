package infinity.stone.seller.schema;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldTypes;
import infinity.stone.sql.helper.FieldValue2;

public class SellerFinancialDetails extends SchemaBase {

	public static schema.definition.SellerFinancialDetails table = new schema.definition.SellerFinancialDetails();
	public static final String tableName = table.getClass().getSimpleName();

	public static Field2 SellerId = new Field2(tableName, "SellerId", FieldTypes.Binary);
	public static Field2 PANNumber = new Field2(tableName, "PANNumber", FieldTypes.String);
	public static Field2 AadharNumber = new Field2(tableName, "AadharNumber", FieldTypes.String);
	public static Field2 BankAccountHolderName = new Field2(tableName, "BankAccountHolderName", FieldTypes.String);
	public static Field2 BankAccountNumber = new Field2(tableName, "BankAccountNumber", FieldTypes.String);
	public static Field2 IFSCCode = new Field2(tableName, "IFSCCode", FieldTypes.String);
	public static Field2 IsDetailsVerified = new Field2(tableName, "IsDetailsVerified", FieldTypes.Boolean);
	public static Field2 IsAccountVerified = new Field2(tableName, "IsAccountVerified", FieldTypes.Boolean);

	@Override
	public String getTableName() {
		return SellerFinancialDetails.tableName;
	}

	@Override
	public Object getTable() {
		return SellerFinancialDetails.table;
	}

	@Override
	public Field2[] getAllFields() {
		return new Field2[] { (Field2) SellerFinancialDetails.SellerId.clone(),
				(Field2) SellerFinancialDetails.PANNumber.clone(), (Field2) SellerFinancialDetails.AadharNumber.clone(),
				(Field2) SellerFinancialDetails.BankAccountHolderName.clone(),
				(Field2) SellerFinancialDetails.BankAccountNumber.clone(),
				(Field2) SellerFinancialDetails.IFSCCode.clone(),
				(Field2) SellerFinancialDetails.IsDetailsVerified.clone(),
				(Field2) SellerFinancialDetails.IsAccountVerified.clone() };
	}

	@Override
	public Field2[] mapObjectToSchemaFields(DomainBase object) {
		infinity.stone.seller.domain.SellerFinancialDetails sellerFinancialDetails = (infinity.stone.seller.domain.SellerFinancialDetails) object;

		Field2 sellerId = (Field2) SellerFinancialDetails.SellerId.clone();
		Field2 pANNumber = (Field2) SellerFinancialDetails.PANNumber.clone();
		Field2 aadharNumber = (Field2) SellerFinancialDetails.AadharNumber.clone();
		Field2 bankAccountHolderName = (Field2) SellerFinancialDetails.BankAccountHolderName.clone();
		Field2 bankAccountNumber = (Field2) SellerFinancialDetails.BankAccountNumber.clone();
		Field2 iFSCCode = (Field2) SellerFinancialDetails.IFSCCode.clone();
		Field2 isDetailsVerified = (Field2) SellerFinancialDetails.IsDetailsVerified.clone();
		Field2 isAccountVerified = (Field2) SellerFinancialDetails.IsAccountVerified.clone();

		sellerId.setValue(sellerFinancialDetails.getSeller().getId());
		pANNumber.setValue(sellerFinancialDetails.getPanNumber());
		aadharNumber.setValue(sellerFinancialDetails.getAadharNumber());
		bankAccountHolderName.setValue(sellerFinancialDetails.getBankAccountHolderName());
		bankAccountNumber.setValue(sellerFinancialDetails.getBankAccountNumber());
		iFSCCode.setValue(sellerFinancialDetails.getIfscCode());
		isDetailsVerified.setValue(sellerFinancialDetails.getIsDetailsVerified());
		isAccountVerified.setValue(sellerFinancialDetails.getIsAccountVerified());

		return new Field2[] { sellerId, pANNumber, aadharNumber, bankAccountHolderName, bankAccountNumber, iFSCCode,
				isDetailsVerified, isAccountVerified };

	}

	@Override
	public Object mapSchemaFieldsToObject(HashMap<String, Field2> queryResult) {
		return infinity.stone.seller.domain.SellerFinancialDetails.getPersistedObject(queryResult);
	}

	@Override
	public Object mapSchemaFieldsToObject(List<HashMap<String, Field2>> queryResult, Object id) {
		return infinity.stone.seller.domain.SellerFinancialDetails.getPersistedObject(queryResult, id);
	}

	@Override
	public Field2 getPrimaryKeyField() {
		return SellerFinancialDetails.SellerId;
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(DomainBase object) {
		infinity.stone.seller.domain.SellerFinancialDetails sellerFinancialDetails = (infinity.stone.seller.domain.SellerFinancialDetails) object;
		return FieldValue2.sqlBinary(sellerFinancialDetails.getSeller().getId());
	}

	@Override
	public FieldValue2 getPrimaryKeyFieldValue(Object object) {
		return FieldValue2.sqlBinary((UUID) object);
	}

}
