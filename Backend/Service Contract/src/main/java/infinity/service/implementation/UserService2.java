package infinity.service.implementation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Controller;

import com.github.slugify.Slugify;

import infinity.service.IUserService2;
import infinity.service.contracts.DeletePreferenceParameter;
import infinity.service.contracts.GetAllPreferencesForUserParameter;
import infinity.service.contracts.PutProductPreferenceParameter;
import infinity.service.contracts.UpdatePreferenceQuantityParameter;
import infinity.service.contracts.category.CategoryReference2;
import infinity.service.contracts.product.ProductSKUTargetParameter1;
import infinity.service.contracts.product.ProductTargetParameter1;
import infinity.service.contracts.seller.SellerReference3;
import infinity.service.contracts.user.UserProductPreferenceDetails;
import infinity.service.contracts.user.UserProductPreferenceFilter;
import infinity.service.contracts.user.UserProductPreferenceTarget;
import infinity.service.contracts.user.UserTargetParameter1;
import infinity.service.exception.InvalidInputException;
import infinity.service.utils.CollectionUtils;
import infinity.service.utils.MappingUtils;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.product.domain.Product2;
import infinity.stone.product.domain.ProductSKU2;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.OrderBy;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryFieldReference;
import infinity.stone.sql.helper.QueryOperation2;
import infinity.stone.user.domain.UserProductPreference2;

@Controller
public class UserService2 implements IUserService2 {

	@Override
	public void putProductPreference(PutProductPreferenceParameter input) {
		putProductPreference(input.user, input.product, input.sku, input.quantity, input.type);
	}

	@Override
	public void updatePreferenceQuantity(UpdatePreferenceQuantityParameter input) {
		updatePreferenceQuantity(input.target, input.quantity);
	}

	@Override
	public void deletePreference(DeletePreferenceParameter input) {
		deletePreference(input.target);
	}

	@Override
	public UserProductPreferenceDetails[] getAllPreferencesForUser(GetAllPreferencesForUserParameter input) {
		return getAllPreferencesForUser(input.user, input.filter);
	}

	static UserProductPreference2 getUserProductPreferenceObject(UUID userId, UUID productId, UUID skuId) {
		Query2 q = Query2.select(infinity.stone.user.schema.UserProductPreference.tableName);
		q.addFields(new infinity.stone.user.schema.UserProductPreference().getAllFields());
		q.whereClause(QueryOperation2.and(
				QueryOperation2.equal(infinity.stone.user.schema.UserProductPreference.UserId,
						FieldValue2.sqlBinary(userId)),
				QueryOperation2.equal(infinity.stone.user.schema.UserProductPreference.ProductId,
						FieldValue2.sqlBinary(productId)),
				QueryOperation2.equal(infinity.stone.user.schema.UserProductPreference.ProductSkuId,
						FieldValue2.sqlBinary(skuId))));

		UserProductPreference2[] userProductPreference = ObjectLoader.loadObjects(UserProductPreference2.class, q);

		if (userProductPreference.length == 1) {
			return userProductPreference[0];
		}

		return null;
	}

	public void putProductPreference(UserTargetParameter1 user, ProductTargetParameter1 product,
			ProductSKUTargetParameter1 sku, Integer quantity, String preferenceType) {

		if (user == null || user.id == null)
			throw new InvalidInputException("User is required");

		UUID userId = UUID.fromString(user.id);
		UUID pSKUId = ProductService1.resolveProductSKUId(sku);
		UUID productId = ProductService1.resolveProductId(product);

		UserProductPreference2 preference = getUserProductPreferenceObject(userId, productId, pSKUId);

		if (preference == null) {
			preference = new UserProductPreference2();
		}

		Query2 query = ProductService1
				.getProductQuery(new HashSet<Class<? extends DomainBase>>(Arrays.asList(infinity.stone.product.domain.ProductSKU2.class)));

		query.whereClause(
				QueryOperation2.and(QueryOperation2.equal(infinity.stone.product.schema.Product.Id, FieldValue2.sqlBinary(productId)),
						QueryOperation2.equal(infinity.stone.product.schema.ProductSKU.Id, FieldValue2.sqlBinary(pSKUId))));

		Product2 productObj = ObjectLoader.loadObject(Product2.class, productId, query);
		ProductSKU2 productSKU = null;
		infinity.stone.user.domain.User u = ObjectLoader.loadObject(infinity.stone.user.domain.User.class, userId);

		List<ProductSKU2> productSKUs = productObj.getProductSKUs();

		for (ProductSKU2 s : productSKUs) {
			if (s.getId().equals(pSKUId)) {
				productSKU = s;
				break;
			}
		}

		preference.setUser(u);
		preference.setProduct(productObj);
		preference.setProductSKU(productSKU);
		preference.setQuantity(quantity);
		preference.setType(infinity.service.keys.UserProductPreference.getPreferenceType(preferenceType));
		preference.save();
	}

	public void updatePreferenceQuantity(UserProductPreferenceTarget target, Integer quantity) {
		if (target == null || target.id == null)
			return;

		UserProductPreference2 preference = ObjectLoader.loadObject(UserProductPreference2.class,
				UUID.fromString(target.id));
		preference.setQuantity(quantity);
		preference.save();
	}

	public void deletePreference(UserProductPreferenceTarget target) {
		if (target == null || target.id == null)
			return;

		UserProductPreference2 preference = ObjectLoader.loadObject(UserProductPreference2.class,
				UUID.fromString(target.id));
		preference.delete();
	}

	public UserProductPreferenceDetails mapToUserProductPreferenceDetails(HashMap<String, Field2> row,
			HashMap<String, QueryFieldReference> queryFields) {

		UserProductPreferenceDetails details = new UserProductPreferenceDetails();
		details.id = queryFields.get("UserProductPreference.Id").getValue(row).getUUID().toString();
		details.type = infinity.service.keys.UserProductPreference
				.getPreferenceType(queryFields.get("UserProductPreference.Type").getValue(row).getInteger());
		details.userId = queryFields.get("UserProductPreference.UserId").getValue(row).getUUID().toString();
		details.skuId = queryFields.get("UserProductPreference.ProductSkuId").getValue(row).getUUID().toString();
		details.productId = queryFields.get("UserProductPreference.ProductId").getValue(row).getUUID().toString();
		details.pricePerUnit = queryFields.get("ProductSKU.PricePerUnit").getValue(row).getNumeric();
		details.sellingPricePerUnit = queryFields.get("ProductSKU.SellingPricePerUnit").getValue(row).getNumeric();
		details.currency = MappingUtils
				.mapToCurrencyReference1(queryFields.get("ProductSKU.CurrencyId").getValue(row).getString());
		details.quantity = queryFields.get("UserProductPreference.Quantity").getValue(row).getInteger();
		details.productName = queryFields.get("Product.Name").getValue(row).getString();
		details.productSlug = new Slugify().slugify(queryFields.get("Product.Name").getValue(row).getString());
		details.productCommonName = queryFields.get("Product.CommonName").getValue(row).getString();
		details.productDescription = queryFields.get("Product.Description").getValue(row).getString();

		details.seller = new SellerReference3();
		details.category = new CategoryReference2();

		details.seller.id = queryFields.get("Seller.Id").getValue(row).getUUID().toString();
//		details.seller.name = queryFields.get("Seller.Name").getValue(row).getString();
		details.seller.storeName = queryFields.get("Seller.StoreName").getValue(row).getString();

		details.category.id = queryFields.get("Category.Id").getValue(row).getInteger();
		details.category.name = queryFields.get("Category.Name").getValue(row).getString();

		return details;
	}

	public UserProductPreferenceDetails[] getAllPreferencesForUser(UserTargetParameter1 user,
			UserProductPreferenceFilter filter) {
		if (user == null || user.id == null)
			return new UserProductPreferenceDetails[0];

		Query2 q = Query2.select(infinity.stone.user.schema.UserProductPreference.tableName);
		q.innerJoin(infinity.stone.product.schema.ProductSKU.tableName, infinity.stone.user.schema.UserProductPreference.ProductSkuId,
				infinity.stone.product.schema.ProductSKU.Id);
		q.innerJoin(infinity.stone.product.schema.Product.tableName, infinity.stone.product.schema.ProductSKU.ProductId, infinity.stone.product.schema.Product.Id);
		q.innerJoin(infinity.stone.seller.schema.Seller.tableName, infinity.stone.product.schema.Product.SellerId,
				infinity.stone.seller.schema.Seller.Id);
		q.innerJoin(infinity.stone.category.schema.Category.tableName, infinity.stone.product.schema.Product.CategoryId, infinity.stone.category.schema.Category.Id);

		q.whereClause(QueryOperation2.equal(infinity.stone.user.schema.UserProductPreference.UserId,
				FieldValue2.sqlBinary(UUID.fromString(user.id))));

		if (filter != null && filter.type != null) {
			q.whereAndClause(QueryOperation2.equal(infinity.stone.user.schema.UserProductPreference.Type, FieldValue2
					.sqlInt(infinity.service.keys.UserProductPreference.getPreferenceType(filter.type).getCode())));
		}

		HashMap<String, QueryFieldReference> queryFields = new HashMap<String, QueryFieldReference>();

		queryFields.put("UserProductPreference.Id", q.addField(infinity.stone.user.schema.UserProductPreference.Id));
		queryFields.put("UserProductPreference.Type",
				q.addField(infinity.stone.user.schema.UserProductPreference.Type));
		queryFields.put("UserProductPreference.UserId",
				q.addField(infinity.stone.user.schema.UserProductPreference.UserId));
		queryFields.put("UserProductPreference.ProductSkuId",
				q.addField(infinity.stone.user.schema.UserProductPreference.ProductSkuId));
		queryFields.put("UserProductPreference.ProductId",
				q.addField(infinity.stone.user.schema.UserProductPreference.ProductId));

		queryFields.put("ProductSKU.PricePerUnit", q.addField(infinity.stone.product.schema.ProductSKU.PricePerUnit));
		queryFields.put("ProductSKU.SellingPricePerUnit", q.addField(infinity.stone.product.schema.ProductSKU.SellingPricePerUnit));
		queryFields.put("ProductSKU.CurrencyId", q.addField(infinity.stone.product.schema.ProductSKU.CurrencyId));
		queryFields.put("UserProductPreference.Quantity",
				q.addField(infinity.stone.user.schema.UserProductPreference.Quantity));

		queryFields.put("Product.Name", q.addField(infinity.stone.product.schema.Product.Name, OrderBy.ASCENDING));
		queryFields.put("Product.CommonName", q.addField(infinity.stone.product.schema.Product.CommonName));
		queryFields.put("Product.Description", q.addField(infinity.stone.product.schema.Product.Description));

		queryFields.put("Seller.Id", q.addField(infinity.stone.seller.schema.Seller.Id));
//		queryFields.put("Seller.Name", q.addField(infinity.stone.seller.schema.Seller.Name));
		queryFields.put("Seller.StoreName", q.addField(infinity.stone.seller.schema.Seller.StoreName));

		queryFields.put("Category.Id", q.addField(infinity.stone.category.schema.Category.Id));
		queryFields.put("Category.Name", q.addField(infinity.stone.category.schema.Category.Name));

		List<HashMap<String, Field2>> result = q.executeQuery();

		if (result == null || result.size() == 0)
			return new UserProductPreferenceDetails[0];

		List<UserProductPreferenceDetails> list = new ArrayList<UserProductPreferenceDetails>();

		for (HashMap<String, Field2> row : result) {
			list.add(mapToUserProductPreferenceDetails(row, queryFields));
		}

		return CollectionUtils.toArray(UserProductPreferenceDetails.class, list);
	}

}
