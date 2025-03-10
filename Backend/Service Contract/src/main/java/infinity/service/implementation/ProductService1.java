package infinity.service.implementation;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import java.util.UUID;

import javax.management.RuntimeErrorException;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.slugify.Slugify;

import infinity.service.contracts.category.CategoryReference2;
import infinity.service.contracts.common.GenericKeyValue;
import infinity.service.contracts.product.OptionValueReference1;
import infinity.service.contracts.product.ProductDetails1;
import infinity.service.contracts.product.ProductOptionTargetParameter1;
import infinity.service.contracts.product.ProductOptionValuesParameter1;
import infinity.service.contracts.product.ProductOptionValuesDetails1;
import infinity.service.contracts.product.ProductOptionValueParameter1;
import infinity.service.contracts.product.ProductParameter1;
import infinity.service.contracts.product.ProductSKUParameter1;
import infinity.service.contracts.product.ProductSKUReference1;
import infinity.service.contracts.product.ProductDetails2;
import infinity.service.contracts.product.ProductFilterParameter1;
import infinity.service.contracts.product.ProductUnitDetails1;
import infinity.service.contracts.product.ProductReference1;
import infinity.service.contracts.product.ProductSKUDetails1;
import infinity.service.contracts.product.ProductSKUTargetParameter1;
import infinity.service.contracts.product.ProductTargetParameter1;
import infinity.service.contracts.product.ProductUnitFilterParameter1;
import infinity.service.contracts.product.ValueDetails1;
import infinity.service.contracts.seller.SellerReference3;
import infinity.service.exception.InvalidInputException;
import infinity.service.user.User;
import infinity.service.utils.MappingUtils;
import infinity.stone.category.domain.Category2;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.exception.ResourceNotFoundException;
import infinity.stone.domain.exception.ValidationException;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.helper.domain.OrderedMultiValueText;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.product.domain.Product2;
import infinity.stone.product.domain.ProductOption2;
import infinity.stone.product.domain.ProductOptionValue2;
import infinity.stone.product.domain.ProductSKU2;
import infinity.stone.product.domain.ProductSKUValue2;
import infinity.stone.product.domain.ProductStatus;
import infinity.stone.seller.domain.Seller;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryFieldReference;
import infinity.stone.sql.helper.QueryOperation2;
import infinity.stone.user.domain.Role;

public class ProductService1 {

	public ProductReference1 putProduct(ProductParameter1 product) {
		Category2 category = ObjectLoader.loadObject(Category2.class, product.categoryId);
		Seller seller = ObjectLoader.loadObject(Seller.class, UUID.fromString(product.sellerId));

		Product2 productObj = new Product2();
		productObj.setName(product.name);
		productObj.setCommonName(product.commonName);
		productObj.setDescription(product.description);
		productObj.setLocationTags(new OrderedMultiValueText(product.locationTags));
		productObj.setTags(new OrderedMultiValueText(product.tags));
		productObj.setCategory(category);
		productObj.setSeller(seller);
		productObj.save();

		return mapToProductReference1(productObj);
	}

	static ProductReference1 mapToProductReference1(Product2 product) {
		ProductReference1 reference = new ProductReference1();
		reference.id = product.getId().toString();
		reference.name = product.getName();
		reference.slug = product.getSlug();

		return reference;
	}

	public static void main(String[] args) {
//		ProductParameter1 p = new ProductParameter1();
//		p.categoryId = 3;
//		p.sellerId = "627ac61e-2e4e-4cec-a7a3-ac73917da89d";
//		p.name = "Test SKU1";
//		p.commonName = "Test SKU1";
//		p.tags = new String[] { "test1", "test2" };
//		ProductReference1 res = new ProductService1().putProduct(p);
//		System.out.println(res.id);
//		System.out.println(res.name);

//		cd8edf66-ccae-49a3-b7c0-33521939cb83

//		ProductTargetParameter1 t = new ProductTargetParameter1();
//		t.id = "45d4c701-9a60-4894-ba19-6afb4d75407a";
//
//		ProductDetails1 a = new ProductService1().getProductDetails(t);
//
//		System.out.println(a.name);
//		System.out.println(a.productSKUs[0].id);

//		ProductSKUParameter1 p = new ProductSKUParameter1();
//		p.currencySymbol = InfinityStone.Domain.Currency.getBasecurrency().getSymbol();
//		p.pricePerUnit = 12.6;
//		p.sellingPricePerUnit = 10.5;
//		p.quantity = 1;
//
//		p.variant = new ProductOptionValueTargetParameter2[2];
//		p.variant[0] = new ProductOptionValueTargetParameter2();
//		p.variant[0].optionId = "3b331de5-ef88-4bb8-9c4c-4d70bc6441a7";
//		p.variant[0].valueId = "dfb29a9b-2c75-476f-854e-b420f7952158";
//
//		p.variant[1] = new ProductOptionValueTargetParameter2();
//		p.variant[1].optionId = "5c2b2e5e-adf0-445b-b629-a9c379e62527";
//		p.variant[1].valueId = "30eb7b59-3440-4bc7-bfdd-63288fe25814";
//
//		new ProductService1().putProductSKU(t, null, p);

//		ProductSKUTargetParameter1 sku = new ProductSKUTargetParameter1();
//		sku.skuId = "2735814f-1508-44bf-a047-53dc8c488bc6";
//		new ProductService1().deleteProductSKU(t, sku);
//
//		JsonObject root = new JsonObject();
//		root.addProperty("test", 4);
//		root.addProperty("test1", 4);
//
//		JsonObject ob = new JsonObject();
//		ob.addProperty("specifications", root.getJson());
//
//		new ProductService1().getSpecificationsFromKeyValues(ob);

		ProductTargetParameter1 p = new ProductTargetParameter1();
		p.id = "20d1ca2d-736e-401a-b4bc-cc406033dad0";

		ProductSKUDetails1[] res = new ProductService1().getProductSkus(p);

//		ProductOptionTargetParameter1 o = new ProductOptionTargetParameter1();
//		o.optionId = "c0fc40eb-932b-4fbe-bd52-fc660b052e69";
//
//		ProductOptionValuesParameter1[] op = new ProductOptionValuesParameter1[1];
//
//		op[0] = new ProductOptionValuesParameter1();
//		op[0].optionName = "Test";
//		op[0].values = new String[1];
//		op[0].values[0] = "testVal";
//
//		new ProductService1().addProductOptionAndValues(p, op);
	}

	static Query2 getProductQuery(Set<Class<? extends DomainBase>> relationshipToLoad) {
		Query2 q = Query2.select(infinity.stone.product.schema.Product.tableName);
		q.addFields(new infinity.stone.product.schema.Product().getAllFields());

		if (relationshipToLoad.contains(infinity.stone.seller.domain.Seller.class)) {
			q.innerJoin(infinity.stone.seller.schema.Seller.tableName, infinity.stone.product.schema.Product.SellerId,
					infinity.stone.seller.schema.Seller.Id);
			q.addFields(new infinity.stone.seller.schema.Seller().getAllFields());
		}

		if (relationshipToLoad.contains(infinity.stone.category.domain.Category2.class)) {
			q.innerJoin(infinity.stone.category.schema.Category.tableName,
					infinity.stone.product.schema.Product.CategoryId, infinity.stone.category.schema.Category.Id);
			q.addFields(new infinity.stone.category.schema.Category().getAllFields());
		}

		if (relationshipToLoad.contains(infinity.stone.product.domain.ProductSKU2.class)) {
			q.leftJoin(infinity.stone.product.schema.ProductSKU.tableName, infinity.stone.product.schema.Product.Id,
					infinity.stone.product.schema.ProductSKU.ProductId);
			q.addFields(new infinity.stone.product.schema.ProductSKU().getAllFields());

			if (relationshipToLoad.contains(infinity.stone.product.domain.ProductSKUValue2.class)) {
				q.leftJoin(infinity.stone.product.schema.ProductSKUValue.tableName,
						infinity.stone.product.schema.ProductSKU.Id,
						infinity.stone.product.schema.ProductSKUValue.ProductSKUId);
				q.addFields(new infinity.stone.product.schema.ProductSKUValue().getAllFields());
			}
		}

		if (relationshipToLoad.contains(infinity.stone.product.domain.ProductOption2.class)) {
			q.leftJoin(infinity.stone.product.schema.ProductOption.tableName, infinity.stone.product.schema.Product.Id,
					infinity.stone.product.schema.ProductOption.ProductId);
			q.addFields(new infinity.stone.product.schema.ProductOption().getAllFields());

			if (relationshipToLoad.contains(infinity.stone.product.domain.ProductOptionValue2.class)) {
				q.leftJoin(infinity.stone.product.schema.ProductOptionValue.tableName,
						infinity.stone.product.schema.ProductOption.Id,
						infinity.stone.product.schema.ProductOptionValue.ProductOptionId);
				q.addFields(new infinity.stone.product.schema.ProductOptionValue().getAllFields());
			}
		}

		return q;
	}

	static Product2 getProductDetails(UUID productId, Set<Class<? extends DomainBase>> relationshipToLoad) {
		Query2 q = getProductQuery(relationshipToLoad);
		q.whereClause(
				QueryOperation2.equal(infinity.stone.product.schema.Product.Id, FieldValue2.sqlBinary(productId)));

		return ObjectLoader.loadObject(Product2.class, productId, q);
	}

	public void updateProductBasicDetails(ProductTargetParameter1 target, ProductParameter1 product) {
		if (target == null || target.id == null)
			throw new InvalidInputException("Product Id is required");

		Category2 category = ObjectLoader.loadObject(Category2.class, product.categoryId);

		Product2 productObj = getProductDetails(UUID.fromString(target.id),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList()));

		productObj.setName(product.name);
		productObj.setCommonName(product.commonName);
		productObj.setCategory(category);
		productObj.setStatus(ProductStatus.EDITED);
		productObj.setStatusRemark("name/commonName/category of product has been changed, hence need rereview");

		productObj.save();
	}

	public void updateProductDescription(ProductTargetParameter1 target, String description) throws Exception {
		if (target == null || target.id == null)
			throw new InvalidInputException("Product Id is required");

		Product2 productObj = getProductDetails(UUID.fromString(target.id),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList()));

		productObj.setDescription(description);

		productObj.save();

	}

	public void updateProductTag(ProductTargetParameter1 target, String[] tags) throws Exception {
		if (target == null || target.id == null)
			throw new InvalidInputException("Product Id is required");

		Product2 productObj = getProductDetails(UUID.fromString(target.id),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList()));

		productObj.setTags(new OrderedMultiValueText(tags));

		productObj.save();
	}

	public void updateProductLocationTag(ProductTargetParameter1 target, String[] locationTags) throws Exception {
		if (target == null || target.id == null)
			throw new InvalidInputException("Product Id is required");

		Product2 productObj = getProductDetails(UUID.fromString(target.id),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList()));

		productObj.setLocationTags(new OrderedMultiValueText(locationTags));

		productObj.save();

	}

//	HashMap<String, GenericType> mapToProductMetadata(HashMap<String, List<Field>> map) {
//
//		int totalRows = map.get(domain.sql.ProductMetadata.id.getQualifiedName()) != null
//				? map.get(domain.sql.ProductMetadata.id.getQualifiedName()).size()
//				: 0;
//
//		HashMap<String, GenericType> res = new HashMap<String, GenericType>();
//
//		for (int i = 0; i < totalRows; i++) {
//			String key = map.get(domain.sql.ProductMetadata.key.getQualifiedName()).get(i).getString();
//			GenericType value = new GenericType(
//					map.get(domain.sql.ProductMetadata.commonFields.text.getQualifiedName()).get(i).getString(),
//					map.get(domain.sql.ProductMetadata.commonFields.bool.getQualifiedName()).get(i).getBool(),
//					map.get(domain.sql.ProductMetadata.commonFields.binary.getQualifiedName()).get(i).getBinary()
//							.toUUID(),
//					map.get(domain.sql.ProductMetadata.commonFields.integer.getQualifiedName()).get(i).getInteger(),
//					map.get(domain.sql.ProductMetadata.commonFields.numeric.getQualifiedName()).get(i).getNumeric(),
//					map.get(domain.sql.ProductMetadata.commonFields.date.getQualifiedName()).get(i).getDate(),
//					map.get(domain.sql.ProductMetadata.commonFields.time.getQualifiedName()).get(i).getTime(),
//					map.get(domain.sql.ProductMetadata.commonFields.dateTime.getQualifiedName()).get(i).getDateTime());
//			res.put(key, value);
//		}
//
//		return res;
//	}

	public void addProductOptionAndValues(ProductTargetParameter1 target,
			ProductOptionValuesParameter1[] productOptionValues) {
		Product2 productObj = getProductDetails(resolveProductId(target),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList()));

		List<ProductOption2> productOptions = productObj.getProductOptions();

		for (ProductOptionValuesParameter1 productOptionValue : productOptionValues) {
			ProductOption2 option = new ProductOption2();
			option.setOptionName(productOptionValue.optionName);
			option.setProduct(productObj);
			List<ProductOptionValue2> optionValues = option.getProductOptionValues();

			for (String value : productOptionValue.values) {
				ProductOptionValue2 optionValue = new ProductOptionValue2();
				optionValue.setValueName(value);
				optionValues.add(optionValue);
				optionValue.setProductOption(option);
			}

			productOptions.add(option);
		}

		productObj.save();
	}

//	public void putProductOptionAndValues(ProductTargetParameter1 target,
//			ProductOptionValuesParameter1[] productOptionValue) throws Exception {
//		// use this function to add new options and values to a product
//
//		if (target == null || target.id == null || productOptionValue == null || productOptionValue.length == 0)
//			return;
//
//		HashMap<String, HashSet<String>> optionValueMap = new HashMap<String, HashSet<String>>();
//
//		for (ProductOptionValuesParameter1 option : productOptionValue) {
//			HashSet<String> values = new HashSet<String>();
//
//			for (int i = 0; option.values != null && i < option.values.length; i++) {
//				values.add(option.values[i].toUpperCase());
//			}
//
//			optionValueMap.put(option.optionName.toUpperCase(), values);
//		}
//
//		UUID productId = UUID.fromString(target.id);
//		InfinityStone.Domain.Product p = new InfinityStone.Domain.Product(productId);
//		p.addProductOptionsAndValues(optionValueMap);
//
//		Sql sql = new Sql();
//		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
//		connection.setAutoCommit(false);
//
//		PreparedStatement productOptionsStmnt = sql.bulkGetCreateInsertSQLStatment(connection,
//				domain.sql.ProductOption.tableName,
//				domain.sql.ProductOption.bulkMapValuesToFields(p.getProductOption()));
//		PreparedStatement productOptionValuesStmnt = sql.bulkGetCreateInsertSQLStatment(connection,
//				domain.sql.ProductOptionValue.tableName,
//				domain.sql.ProductOptionValue.bulkMapValuesToFields(p.getProductOptionValue()));
//
//		try {
//			productOptionsStmnt.executeUpdate();
//			productOptionValuesStmnt.executeUpdate();
//			connection.commit();
//		} catch (Exception e) {
//			connection.rollback();
//			throw e;
//		} finally {
//			connection.close();
//		}
//
//	}

//	ProductOptionValuesDetails1[] mapToProductOptionValuesReference1(HashMap<String, List<Field>> map) {
//
//		if (map == null || map.get(domain.sql.ProductOption.id.copy().getQualifiedName()) == null
//				|| map.get(domain.sql.ProductOption.optionName.copy().getQualifiedName()).size() == 0)
//			return new ProductOptionValuesDetails1[0];
//
//		int totalRows = map.get(domain.sql.ProductOption.optionName.copy().getQualifiedName()).size();
//
//		HashMap<String, HashSet<ValueDetails1>> resultOptionValueMap = new HashMap<String, HashSet<ValueDetails1>>();
//		HashMap<String, String> optionNamesMap = new HashMap<String, String>();
//
//		for (int i = 0; i < totalRows; i++) {
//
//			UUID optionId = map.get(domain.sql.ProductOption.id.copy().getQualifiedName()).get(i).getBinary().toUUID();
//			UUID valueId = map.get(domain.sql.ProductOptionValue.id.copy().getQualifiedName()).get(i).getBinary()
//					.toUUID();
//			String optionName = map.get(domain.sql.ProductOption.optionName.copy().getQualifiedName()).get(i)
//					.getString();
//			String valueName = map.get(domain.sql.ProductOptionValue.valueName.copy().getQualifiedName()).get(i)
//					.getString();
//
//			if (optionId == null)
//				continue;
//
//			ValueDetails1 value = null;
//
//			String key = optionId.toString();
//
//			if (resultOptionValueMap.containsKey(key)) {
//				HashSet<ValueDetails1> v = resultOptionValueMap.get(key);
//
//				if (valueId != null && valueName != null) {
//					value = new ValueDetails1();
//					value.id = valueId.toString();
//					value.valueName = valueName;
//
//					v.add(value);
//					resultOptionValueMap.replace(key, v);
//				}
//
//			} else {
//				HashSet<ValueDetails1> v = new HashSet<ValueDetails1>();
//
//				if (valueId != null && valueName != null) {
//					value = new ValueDetails1();
//					value.id = valueId.toString();
//					value.valueName = valueName;
//
//					v.add(value);
//				}
//				resultOptionValueMap.put(key, v);
//				optionNamesMap.put(key, optionName);
//			}
//		}
//
//		ProductOptionValuesDetails1[] ref = new ProductOptionValuesDetails1[resultOptionValueMap.size()];
//
//		int i = 0;
//		for (Map.Entry<String, HashSet<ValueDetails1>> m : resultOptionValueMap.entrySet()) {
//
//			ProductOptionValuesDetails1 r = new ProductOptionValuesDetails1();
//			r.id = m.getKey();
//			r.optionName = optionNamesMap.get(m.getKey());
//			r.values = new ValueDetails1[m.getValue().size()];
//
//			int j = 0;
//			Iterator<ValueDetails1> it = m.getValue().iterator();
//
//			while (it.hasNext())
//				r.values[j++] = it.next();
//
//			ref[i++] = r;
//		}
//
//		return ref;
//	}

	public ProductOptionValuesDetails1[] getProductOptionAndValues(ProductTargetParameter1 target) {
		Product2 productObj = getProductDetails(resolveProductId(target),
				new HashSet<Class<? extends DomainBase>>(
						Arrays.asList(infinity.stone.product.domain.ProductOption2.class,
								infinity.stone.product.domain.ProductOptionValue2.class)));

		List<ProductOptionValuesDetails1> result = new ArrayList<ProductOptionValuesDetails1>();
		List<ProductOption2> productOptions = productObj.getProductOptions();
		for (ProductOption2 productOption : productOptions) {
			result.add(mapToProductOptionValuesDetails1(productOption));
		}
		return result.toArray(new ProductOptionValuesDetails1[result.size()]);
	}

//	ProductSKUDetails1 mapToProductSKUReference1(HashMap<String, List<Field>> map, int index) {
//
//		ProductSKUDetails1 ref = new ProductSKUDetails1();
//
//		ref.id = map.get(domain.sql.ProductSKU.id.getQualifiedName()).get(index).getBinary().toUUIDString();
//		ref.sku = map.get(domain.sql.ProductSKU.sku.getQualifiedName()).get(index).getString();
//		ref.quantity = map.get(domain.sql.ProductSKU.quantityInStock.getQualifiedName()).get(index).getInteger();
//		ref.pricePerUnit = map.get(domain.sql.ProductSKU.pricePerUnit.getQualifiedName()).get(index).getNumeric();
//		ref.sellingPricePerUnit = map.get(domain.sql.ProductSKU.sellingPricePerUnit.getQualifiedName()).get(index)
//				.getNumeric();
//		ref.currency = null;
//
//		return ref;
//	}

//	ProductSKUDetails1[] getProductSkusInternal(HashMap<String, List<Field>> map) {
//		// this function is for mapping all stock keeping units for a product
//
//		if (map.get(domain.sql.ProductSKU.id.getQualifiedName()) == null
//				|| map.get(domain.sql.ProductSKU.id.getQualifiedName()).size() == 0)
//			return new ProductSKUDetails1[0];
//
//		int totalRows = map.get(domain.sql.ProductSKU.id.getQualifiedName()).size();
//
//		HashMap<String, List<OptionValueReference1>> uniqueStockMap = new HashMap<String, List<OptionValueReference1>>();
//		HashMap<String, ProductSKUDetails1> uniqueSKUMap = new HashMap<String, ProductSKUDetails1>();
//
//		for (int i = 0; i < totalRows; i++) {
//			List<OptionValueReference1> optionValueRef = null;
//			String skuId = map.get(domain.sql.ProductSKU.id.getQualifiedName()).get(i).getBinary().toUUIDString();
//
//			OptionValueReference1 ref = new OptionValueReference1();
//
//			UUID optionId = map.get(domain.sql.ProductOption.id.copy().getQualifiedName()).get(i).getBinary().toUUID();
//			UUID valueId = map.get(domain.sql.ProductOptionValue.id.copy().getQualifiedName()).get(i).getBinary()
//					.toUUID();
//			String option = map.get(domain.sql.ProductOption.optionName.copy().getQualifiedName()).get(i).getString();
//			String value = map.get(domain.sql.ProductOptionValue.valueName.copy().getQualifiedName()).get(i)
//					.getString();
//
//			if (uniqueStockMap.containsKey(skuId)) {
//				optionValueRef = uniqueStockMap.get(skuId);
//				if (optionId != null && valueId != null) {
//					ref.option = option;
//					ref.value = value;
//					ref.optionId = optionId.toString();
//					ref.valueId = valueId.toString();
//					optionValueRef.add(ref);
//				}
//
//				uniqueStockMap.replace(skuId, optionValueRef);
//
//			} else {
//				optionValueRef = new ArrayList<OptionValueReference1>();
//
//				if (optionId != null && valueId != null) {
//					ref.option = option;
//					ref.value = value;
//					ref.optionId = optionId.toString();
//					ref.valueId = valueId.toString();
//					optionValueRef.add(ref);
//				}
//
//				uniqueStockMap.put(skuId, optionValueRef);
//				uniqueSKUMap.put(skuId, mapToProductSKUReference1(map, i));
//			}
//		}
//
//		ProductSKUDetails1[] result = new ProductSKUDetails1[uniqueStockMap.size()];
//
//		int k = 0;
//		for (Entry<String, List<OptionValueReference1>> it : uniqueStockMap.entrySet()) {
//			result[k] = uniqueSKUMap.get(it.getKey());
//
//			List<OptionValueReference1> optionValuesList = it.getValue();
//			OptionValueReference1[] optionValues = new OptionValueReference1[optionValuesList.size()];
//
//			for (int j = 0; j < optionValuesList.size(); j++) {
//				optionValues[j] = optionValuesList.get(j);
//			}
//
//			result[k].specifications = optionValues;
//			k++;
//		}
//
//		return result;
//	}

	public ProductSKUDetails1[] getProductSkus(ProductTargetParameter1 target) {
		Product2 productObj = getProductDetails(resolveProductId(target),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(infinity.stone.product.domain.ProductSKU2.class,
						infinity.stone.product.domain.ProductSKUValue2.class)));

		List<ProductSKUDetails1> result = new ArrayList<ProductSKUDetails1>();
		List<ProductSKU2> skus = productObj.getProductSKUs();
		for (ProductSKU2 sku : skus) {
			result.add(mapToProductSKUDetails1(sku));
		}
		return result.toArray(new ProductSKUDetails1[result.size()]);
	}

	void deleteAllValuesForGivenProductOption(Connection connection, UUID productId, UUID optionId) throws Exception {
//		Query q = new Query();
//		q.whereClause(domain.sql.ProductOptionValue.productId.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, new Binary(productId))));
//		q.whereAndClause(domain.sql.ProductOptionValue.productOptionId.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, new Binary(optionId))));
//
//		Sql sql = new Sql();
//		PreparedStatement stmnt = sql.getCreateDeleteSqlStatement(connection, domain.sql.ProductOptionValue.tableName,
//				q.getWhereClauseExpression(), q.getPlaceHolderValueMap());
//		stmnt.executeUpdate();
	}

//	public void deleteProductOption(ProductOptionTargetParameter1 target) throws Exception {
//
//		if (target == null || target.optionId == null || target.productId == null)
//			throw new Exception("Invalid target parameter");
//
//		UUID productId = UUID.fromString(target.productId);
//		UUID optionId = UUID.fromString(target.optionId);
//
//		Query q = new Query();
//		q.whereClause(domain.sql.ProductOption.id.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, new Binary(optionId))));
//
//		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
//		connection.setAutoCommit(false);
//		try {
//
//			deleteAllValuesForGivenProductOption(connection, productId, optionId);
//			Sql sql = new Sql();
//			PreparedStatement stmnt = sql.getCreateDeleteSqlStatement(connection, domain.sql.ProductOption.tableName,
//					q.getWhereClauseExpression(), q.getPlaceHolderValueMap());
//			stmnt.executeUpdate();
//			connection.commit();
//
//		} catch (Exception e) {
//			connection.rollback();
//			throw e;
//		} finally {
//			connection.close();
//		}
//
//	}

	static UUID resolveProductOptionId(ProductOptionTargetParameter1 option) {
		if (option == null || option.optionId == null) {
			throw new InvalidInputException("Option id is required");
		}

		return UUID.fromString(option.optionId);
	}

	public void deleteProductOption(ProductTargetParameter1 product, ProductOptionTargetParameter1 option) {
		UUID productId = resolveProductId(product);
		UUID optionId = resolveProductOptionId(option);

		Query2 query = getProductQuery(new HashSet<Class<? extends DomainBase>>(
				Arrays.asList(infinity.stone.product.domain.ProductOption2.class)));
		query.whereClause(QueryOperation2.and(
				QueryOperation2.equal(infinity.stone.product.schema.Product.Id, FieldValue2.sqlBinary(productId)),
				QueryOperation2.equal(infinity.stone.product.schema.ProductOption.Id,
						FieldValue2.sqlBinary(optionId))));

		Product2 productObj = ObjectLoader.loadObject(Product2.class, productId, query);

		List<ProductOption2> productOptions = productObj.getProductOptions();

		ProductOption2 productOptionToRemove = null;

		for (ProductOption2 productOption : productOptions) {
			if (productOption.getId().equals(optionId)) {
				productOptionToRemove = productOption;
				break;
			}
		}

		productOptions.remove(productOptionToRemove);

		productObj.save();
	}

	public void deleteProductOptionValue(ProductTargetParameter1 product, ProductOptionTargetParameter1 option,
			UUID valueId) {
		UUID productId = resolveProductId(product);
		UUID optionId = resolveProductOptionId(option);

		Query2 query = getProductQuery(new HashSet<Class<? extends DomainBase>>(
				Arrays.asList(infinity.stone.product.domain.ProductOption2.class,
						infinity.stone.product.domain.ProductOptionValue2.class)));
		query.whereClause(QueryOperation2.and(
				QueryOperation2.equal(infinity.stone.product.schema.Product.Id, FieldValue2.sqlBinary(productId)),
				QueryOperation2.equal(infinity.stone.product.schema.ProductOption.Id, FieldValue2.sqlBinary(optionId)),
				QueryOperation2.equal(infinity.stone.product.schema.ProductOptionValue.Id,
						FieldValue2.sqlBinary(valueId))));

		Product2 productObj = ObjectLoader.loadObject(Product2.class, productId, query);

		List<ProductOption2> productOptions = productObj.getProductOptions();

		ProductOptionValue2 productOptionValueToRemove = null;

		for (ProductOption2 productOption : productOptions) {
			if (productOption.getId().equals(optionId)) {
				List<ProductOptionValue2> productOptionValues = productOption.getProductOptionValues();
				for (ProductOptionValue2 productOptionValue : productOptionValues) {
					if (productOptionValue.getId().equals(valueId)) {
						productOptionValueToRemove = productOptionValue;
						break;
					}
				}
				break;
			}
		}

		productOptionValueToRemove.delete();
	}

	static ValueDetails1 mapToValueDetails1(ProductOptionValue2 optionValue) {
		ValueDetails1 details = new ValueDetails1();
		details.id = optionValue.getId().toString();
		details.valueName = optionValue.getValueName();
		return details;
	}

	static ProductOptionValuesDetails1 mapToProductOptionValuesDetails1(ProductOption2 option) {
		ProductOptionValuesDetails1 details = new ProductOptionValuesDetails1();

		details.id = option.getId().toString();
		details.optionName = option.getOptionName();

		List<ProductOptionValue2> productOptionValues = option.getProductOptionValues();
		details.values = new ValueDetails1[productOptionValues.size()];

		for (int i = 0; i < productOptionValues.size(); i++) {
			details.values[i] = mapToValueDetails1(productOptionValues.get(i));
		}

		return details;
	}

	static GenericKeyValue[] mapToProductSKUMetadata(JsonObject json) {
		return null;
	}

	static OptionValueReference1 mapToOptionValueReference1(ProductSKUValue2 productSKUValue) {
		OptionValueReference1 reference = new OptionValueReference1();

		reference.optionId = productSKUValue.getProductOption().getId().toString();
		reference.option = productSKUValue.getProductOption().getOptionName();
		reference.valueId = productSKUValue.getProductOptionValue().getId().toString();
		reference.value = productSKUValue.getProductOptionValue().getValueName();

		return reference;
	}

	static ProductSKUDetails1 mapToProductSKUDetails1(ProductSKU2 productSKU) {
		ProductSKUDetails1 details = new ProductSKUDetails1();
		details.id = productSKU.getId().toString();
		details.pricePerUnit = productSKU.getPricePerUnit();
		details.sellingPricePerUnit = productSKU.getSellingPricePerUnit();
		details.quantity = productSKU.getQuantityInStock();
		details.sku = productSKU.getSKU();
		details.currency = MappingUtils.mapToCurrencyReference1(productSKU.getCurrency());
		details.metadata = mapToProductSKUMetadata(new JsonObject(productSKU.getKeyValues()));

		List<ProductSKUValue2> productSKUValues = productSKU.getProductSKUValues();
		details.specifications = new OptionValueReference1[productSKUValues.size()];

		for (int i = 0; i < productSKUValues.size(); i++) {
			details.specifications[i] = mapToOptionValueReference1(productSKUValues.get(i));
		}

		return details;
	}

	static GenericKeyValue[] mapToProductMetadata(JsonObject json) {
		return null;
	}

	static ProductDetails1 mapToProductDetails1(Product2 product) {
		ProductDetails1 details = new ProductDetails1();

		details.id = product.getId().toString();
		details.slug = product.getSlug();
		details.name = product.getName();
		details.commonName = product.getCommonName();
		details.description = product.getDescription();
		details.category = CategoryService1.mapToCategoryReference2(product.getCategory());
		details.seller = SellerService1.mapToSellerReference3(product.getSeller());
		details.status = infinity.service.keys.Product.Status.statuses.get(product.getStatus());
		details.statusRemark = product.getStatusRemark();
		details.enabled = product.getEnabled();
		details.tags = product.getTags().getValues();
		details.locationTags = product.getLocationTags().getValues();

		List<ProductOption2> productOptions = product.getProductOptions();
		details.options = new ProductOptionValuesDetails1[productOptions.size()];

		for (int i = 0; i < productOptions.size(); i++) {
			details.options[i] = mapToProductOptionValuesDetails1(productOptions.get(i));
		}

		List<ProductSKU2> productSKUs = product.getProductSKUs();
		details.productSKUs = new ProductSKUDetails1[productSKUs.size()];

		for (int i = 0; i < productSKUs.size(); i++) {
			details.productSKUs[i] = mapToProductSKUDetails1(productSKUs.get(i));
		}

		details.metadata = mapToProductMetadata(new JsonObject(product.getKeyValues()));

		return details;
	}

	public ProductDetails1 getProductDetails(ProductTargetParameter1 target) {
		Product2 productObj = getProductDetails(UUID.fromString(target.id),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(infinity.stone.product.domain.ProductSKU2.class,
						infinity.stone.product.domain.ProductSKUValue2.class,
						infinity.stone.product.domain.ProductOption2.class,
						infinity.stone.product.domain.ProductOptionValue2.class,
						infinity.stone.seller.domain.Seller.class, infinity.stone.category.domain.Category2.class)));

		return mapToProductDetails1(productObj);
	}

	static UUID resolveProductId(ProductTargetParameter1 target) {
		if (target == null || (target.id == null && target.slug == null)) {
			throw new InvalidInputException("Either of Product id or slug is required");
		}

		if (target.id != null) {
			return UUID.fromString(target.id);
		}

		Query2 q = Query2.select(infinity.stone.product.schema.Product.tableName);
		q.whereClause(
				QueryOperation2.equal(infinity.stone.product.schema.Product.Slug, FieldValue2.sqlString(target.slug)));
		QueryFieldReference idField = q.addField(infinity.stone.product.schema.Product.Id);

		List<HashMap<String, Field2>> queryResult = q.executeQuery();

		return idField.getValue(queryResult.get(0)).getUUID();

	}

	static UUID resolveProductSKUId(ProductSKUTargetParameter1 target) {
		if (target == null || target.skuId == null)
			throw new InvalidInputException("Product SKU Id is required");

		return UUID.fromString(target.skuId);
	}

	static ProductSKUReference1 mapToProductSKUReference1(ProductSKU2 sku) {
		ProductSKUReference1 ref = new ProductSKUReference1();

		ref.id = sku.getId().toString();
		ref.productId = sku.getProduct().getId().toString();
		ref.sku = sku.getSKU();

		return ref;
	}

	public ProductSKUReference1 putProductSKU(ProductTargetParameter1 target, ProductSKUTargetParameter1 skuTarget,
			ProductSKUParameter1 sku) {
		Product2 productObj = getProductDetails(UUID.fromString(target.id),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(infinity.stone.product.domain.ProductSKU2.class,
						infinity.stone.product.domain.ProductSKUValue2.class,
						infinity.stone.product.domain.ProductOption2.class,
						infinity.stone.product.domain.ProductOptionValue2.class)));

		List<ProductSKU2> productSKUs = productObj.getProductSKUs();
		List<ProductOption2> productOptions = productObj.getProductOptions();
		UUID productSKUId = null;
		ProductSKU2 productSKUObj = null;

		if (skuTarget != null && skuTarget.skuId != null) {
			productSKUId = resolveProductSKUId(skuTarget);
			for (ProductSKU2 productSKU : productSKUs) {
				if (productSKU.getId().equals(productSKUId)) {
					productSKUObj = productSKU;
					break;
				}
			}
		} else {
			productSKUObj = new ProductSKU2();
			productSKUs.add(productSKUObj);
		}

		productSKUObj.setSKU(sku.sku);
		productSKUObj.setQuantityInStock(sku.quantity);
		productSKUObj.setCurrency(infinity.stone.domain.Currency.currencies.get(sku.currencyId));
		productSKUObj.setPricePerUnit(sku.pricePerUnit);
		productSKUObj.setSellingPricePerUnit(sku.sellingPricePerUnit);
		productSKUObj.setProduct(productObj);

		List<ProductSKUValue2> productSKUValues = productSKUObj.getProductSKUValues();

		if (sku.optionAndValues != null) {
			productSKUValues.clear();
			List<OptionValuePair> optionValuePairs = getOptionValuePairs(productOptions, sku.optionAndValues);
			for (OptionValuePair optionValuePair : optionValuePairs) {
				ProductSKUValue2 productSKUValue = new ProductSKUValue2();
				productSKUValue.setProductSKU(productSKUObj);
				productSKUValue.setProductOption(optionValuePair.option);
				productSKUValue.setProductOptionValue(optionValuePair.value);
				productSKUValues.add(productSKUValue);
			}
		}

		JsonObject json = new JsonObject();
		for (ProductSKUValue2 productSKUValue : productSKUValues) {
			json.addProperty(productSKUValue.getProductOption().getOptionName(),
					productSKUValue.getProductOptionValue().getValueName());
		}

		JsonObject metadata = new JsonObject();
		if (json.getJson().size() > 0) {
			metadata.addProperty(infinity.service.keys.ProductSKU.specifications, json.getJson());
		}

		productSKUObj.setKeyValues(metadata);

		productObj.save();

		return mapToProductSKUReference1(productSKUObj);
	}

	private static List<OptionValuePair> getOptionValuePairs(List<ProductOption2> options,
			ProductOptionValueParameter1[] optionValues) {
		HashMap<String, ProductOption2> optionsMap = new HashMap<String, ProductOption2>();

		for (ProductOption2 option : options) {
			optionsMap.put(option.getId().toString(), option);
		}

		List<OptionValuePair> optionValuePairs = new ArrayList<OptionValuePair>();

		for (ProductOptionValueParameter1 optionValue : optionValues) {
			OptionValuePair optionValuePair = new OptionValuePair();
			optionValuePair.option = optionsMap.get(optionValue.optionId);

			for (ProductOptionValue2 productOptionValue : optionValuePair.option.getProductOptionValues()) {
				if (productOptionValue.getId().toString().equals(optionValue.valueId)) {
					optionValuePair.value = productOptionValue;
					break;
				}
			}
			optionValuePairs.add(optionValuePair);
		}

		return optionValuePairs;
	}

	private static class OptionValuePair {
		public ProductOption2 option;
		public ProductOptionValue2 value;
	}

	public void deleteProductSKU(ProductTargetParameter1 target, ProductSKUTargetParameter1 sku) {
		UUID productId = resolveProductId(target);
		UUID productSKUId = resolveProductSKUId(sku);

		Product2 productObj = getProductDetails(productId,
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(infinity.stone.product.domain.ProductSKU2.class,
						infinity.stone.product.domain.ProductSKUValue2.class)));

		List<ProductSKU2> skus = productObj.getProductSKUs();

		ProductSKU2 skuToDelete = null;

		for (ProductSKU2 skuObj : skus) {
			if (skuObj.getId().equals(productSKUId)) {
				skuToDelete = skuObj;
				break;
			}
		}

		skus.remove(skuToDelete);

		productObj.save();
	}

//	public void updateProductSKUPricePerUnit(ProductSKUTargetParameter1 target, MoneyParameter1 pricePerUnit)
//			throws Exception {
//		if (target == null || target.productId == null || target.skuId == null)
//			throw new Exception("Invalid target parameter");
//
//		Binary productId = new Binary(UUID.fromString(target.productId));
//		Binary productSkuId = new Binary(UUID.fromString(target.skuId));
//
//		Query q = new Query();
//		q.whereClause(domain.sql.ProductSKU.id.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, productSkuId)));
//		q.whereAndClause(domain.sql.ProductSKU.productId.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, productId)));
//
//		Field pricePerUnit1 = domain.sql.ProductSKU.pricePerUnit.copy();
//		Field currencySymbol1 = domain.sql.ProductSKU.currencyId.copy();
//
//		pricePerUnit1.setFieldValue(pricePerUnit.amount);
//		currencySymbol1.setFieldValue(pricePerUnit.currencySymbol);
//
//		Sql sql = new Sql();
//		sql.update(domain.sql.ProductSKU.tableName, q.getWhereClauseExpression(), q.getPlaceHolderValueMap(),
//				pricePerUnit1, currencySymbol1);
//	}
//
//	public void updateProductSKUSellingPricePerUnit(ProductSKUTargetParameter1 target, Double sellingPricePerUnit)
//			throws Exception {
//		if (target == null || target.productId == null || target.skuId == null)
//			throw new Exception("Invalid target parameter");
//
//		Binary productId = new Binary(UUID.fromString(target.productId));
//		Binary productSkuId = new Binary(UUID.fromString(target.skuId));
//
//		Query q = new Query();
//		q.whereClause(domain.sql.ProductSKU.id.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, productSkuId)));
//		q.whereAndClause(domain.sql.ProductSKU.productId.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, productId)));
//
//		Field sellingPricePerUnit1 = domain.sql.ProductSKU.sellingPricePerUnit.copy();
//
//		sellingPricePerUnit1.setFieldValue(sellingPricePerUnit);
//
//		Sql sql = new Sql();
//		sql.update(domain.sql.ProductSKU.tableName, q.getWhereClauseExpression(), q.getPlaceHolderValueMap(),
//				sellingPricePerUnit1);
//	}
//
//	public void updateProductSKUQuantity(ProductSKUTargetParameter1 target, Integer quantityInStock) throws Exception {
//		if (target == null || target.productId == null || target.skuId == null)
//			throw new Exception("Invalid target parameter");
//
//		Binary productId = new Binary(UUID.fromString(target.productId));
//		Binary productSkuId = new Binary(UUID.fromString(target.skuId));
//
//		Query q = new Query();
//		q.whereClause(domain.sql.ProductSKU.id.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, productSkuId)));
//		q.whereAndClause(domain.sql.ProductSKU.productId.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, productId)));
//
//		Field quantityInStock1 = domain.sql.ProductSKU.quantityInStock.copy();
//
//		quantityInStock1.setFieldValue(quantityInStock);
//
//		Sql sql = new Sql();
//		sql.update(domain.sql.ProductSKU.tableName, q.getWhereClauseExpression(), q.getPlaceHolderValueMap(),
//				quantityInStock1);
//	}
//
//	public ProductDetails2[] getAllProducts(Integer page, Integer pageSize, ProductUnitFilterParameter1 filters)
//			throws Exception {
//		if (page == null || page <= 0 || pageSize == null || pageSize <= 0)
//			return new ProductDetails2[0];
//
//		Query q = new Query();
//		q.select(domain.sql.Product.tableName);
//		q.addField(domain.sql.Product.getAllFields1());
//		q.innerJoin(domain.sql.Product.categoryId.copy(), domain.sql.Category.id.copy());
//		q.innerJoin(domain.sql.Product.sellerId.copy(), domain.sql.Seller.id.copy());
//
//		q.addField(domain.sql.Category.name.copy());
//
//		q.addField(domain.sql.Seller.name.copy());
//		q.addField(domain.sql.Seller.storeName.copy());
//
//		q.setLimit(pageSize);
//		q.setOffset((page - 1) * pageSize);
//
//		if (filters != null && filters.sellerIds != null && filters.sellerIds.length > 0) {
//			FieldValue[] fieldValues = new FieldValue[filters.sellerIds.length];
//
//			int i = 0;
//			for (String id : filters.sellerIds) {
//				fieldValues[i++] = new FieldValue(FieldTypes.Binary, new Binary(id));
//			}
//
//			q.whereClause(domain.sql.Product.sellerId.copy(), QueryOperation.in(q, fieldValues));
//		}
//
//		HashMap<String, List<Field>> results = q.executeQuery();
//
//		int totalRows = results.get(domain.sql.Product.id.getQualifiedName()) != null
//				? results.get(domain.sql.Product.id.getQualifiedName()).size()
//				: 0;
//
//		ProductDetails2[] products = new ProductDetails2[totalRows];
//
//		for (int i = 0; i < totalRows; i++) {
//			products[i] = mapToProductReference2(results, i);
//		}
//
//		return products;
//	}

	private static void addFilters(Query2 q, ProductFilterParameter1 filters) {
		if (filters == null)
			return;

		if (filters.isEnabled != null) {
			q.whereAndClause(QueryOperation2.equal(infinity.stone.product.schema.Product.Enabled,
					FieldValue2.sqlBool(filters.isEnabled)));
		}

		if (filters.sellerIds != null) {
			q.whereAndClause(getCreateInQueryOperation(infinity.stone.product.schema.Product.SellerId,
					convertStringsToUUIDs(filters.sellerIds)));
		}

		if (filters.categoryIds != null) {
			q.whereAndClause(getCreateInQueryOperation(infinity.stone.product.schema.Product.CategoryId,
					convertStringsToIntegers(filters.categoryIds)));
		}

		if (filters.productIds != null) {
			q.whereAndClause(getCreateInQueryOperation(infinity.stone.product.schema.Product.Id,
					convertStringsToIntegers(filters.productIds)));
		}

		if (filters.textSearch != null) {
			q.whereAndClause(QueryOperation2.equal(infinity.stone.product.schema.Product.Name,
					FieldValue2.sqlString(filters.textSearch)));
		}
	}

	static ProductDetails2 mapToProductDetails2(HashMap<String, Field2> queryResult,
			HashMap<String, QueryFieldReference> queryFieldReferences) {

		ProductDetails2 details = new ProductDetails2();

		details.id = queryFieldReferences.get("Product.Id").getValue(queryResult).getUUID().toString();
		details.name = queryFieldReferences.get("Product.Name").getValue(queryResult).getString();
		details.slug = queryFieldReferences.get("Product.Slug").getValue(queryResult).getString();
		details.commonName = queryFieldReferences.get("Product.CommonName").getValue(queryResult).getString();
		details.description = queryFieldReferences.get("Product.Description").getValue(queryResult).getString();
		details.slug = queryFieldReferences.get("Product.Slug").getValue(queryResult).getString();

		details.locationTags = new OrderedMultiValueText(
				queryFieldReferences.get("Product.LocationTags").getValue(queryResult).getString()).getValues();

		details.tags = new OrderedMultiValueText(
				queryFieldReferences.get("Product.Tags").getValue(queryResult).getString()).getValues();
		details.status = infinity.service.keys.Product.Status.statuses
				.get(ProductStatus.get(queryFieldReferences.get("Product.Status").getValue(queryResult).getInteger()));
		details.enabled = queryFieldReferences.get("Product.Enabled").getValue(queryResult).getBool();

		details.seller = new SellerReference3();
		details.seller.id = queryFieldReferences.get("Seller.Id").getValue(queryResult).getUUID().toString();
//		details.seller.name = queryFieldReferences.get("Seller.Name").getValue(queryResult).getString();
		details.seller.storeName = queryFieldReferences.get("Seller.StoreName").getValue(queryResult).getString();

		details.category = new CategoryReference2();
		details.category.id = queryFieldReferences.get("Category.Id").getValue(queryResult).getInteger();
		details.category.name = queryFieldReferences.get("Category.Name").getValue(queryResult).getString();

		return details;
	}

	public ProductDetails2[] getPageOfProducts(Integer page, Integer pageSize, ProductFilterParameter1 filters) {
		if (page == null || pageSize == null) {
			throw new InvalidInputException("Page and pagesize are required parameters");
		}

		Query2 q = Query2.select(infinity.stone.product.schema.Product.tableName);
		q.innerJoin(infinity.stone.seller.schema.Seller.tableName, infinity.stone.product.schema.Product.SellerId,
				infinity.stone.seller.schema.Seller.Id);
		q.innerJoin(infinity.stone.category.schema.Category.tableName, infinity.stone.product.schema.Product.CategoryId,
				infinity.stone.category.schema.Category.Id);
		q.whereClause(QueryOperation2.equal(FieldValue2.sqlInt(1), FieldValue2.sqlInt(1)));
		addFilters(q, filters);
		q.setLimit(pageSize);
		q.setOffset(pageSize * (page - 1));

		HashMap<String, QueryFieldReference> queryFieldReferences = new HashMap<String, QueryFieldReference>();

		queryFieldReferences.put("Product.Id", q.addField(infinity.stone.product.schema.Product.Id));
		queryFieldReferences.put("Product.Name", q.addField(infinity.stone.product.schema.Product.Name));
		queryFieldReferences.put("Product.Slug", q.addField(infinity.stone.product.schema.Product.Name));
		queryFieldReferences.put("Product.CommonName", q.addField(infinity.stone.product.schema.Product.CommonName));
		queryFieldReferences.put("Product.Description", q.addField(infinity.stone.product.schema.Product.Description));
		queryFieldReferences.put("Product.Tags", q.addField(infinity.stone.product.schema.Product.Tags));
		queryFieldReferences.put("Product.LocationTags",
				q.addField(infinity.stone.product.schema.Product.LocationTags));
		queryFieldReferences.put("Product.Slug", q.addField(infinity.stone.product.schema.Product.Slug));
		queryFieldReferences.put("Product.Status", q.addField(infinity.stone.product.schema.Product.Status));
		queryFieldReferences.put("Product.Enabled", q.addField(infinity.stone.product.schema.Product.Enabled));

		queryFieldReferences.put("Seller.Id", q.addField(infinity.stone.seller.schema.Seller.Id));
//		queryFieldReferences.put("Seller.Name", q.addField(infinity.stone.seller.schema.Seller.Name));
		queryFieldReferences.put("Seller.StoreName", q.addField(infinity.stone.seller.schema.Seller.StoreName));

		queryFieldReferences.put("Category.Id", q.addField(infinity.stone.category.schema.Category.Id));
		queryFieldReferences.put("Category.Name", q.addField(infinity.stone.category.schema.Category.Name));

		List<HashMap<String, Field2>> queryResult = q.executeQuery();

		List<ProductDetails2> details = new ArrayList<ProductDetails2>();

		for (HashMap<String, Field2> row : queryResult) {
			details.add(mapToProductDetails2(row, queryFieldReferences));
		}

		return details.toArray(new ProductDetails2[details.size()]);
	}

//	ProductDetails2 mapToProductReference2(HashMap<String, List<Field>> map, int index) {
//		ProductDetails2 product = new ProductDetails2();
//
//		product.id = map.get(domain.sql.Product.id.getQualifiedName()).get(index).getBinary().toUUIDString();
//		product.name = map.get(domain.sql.Product.name.getQualifiedName()).get(index).getString();
//		product.slug = new Slugify()
//				.slugify(map.get(domain.sql.Product.name.getQualifiedName()).get(index).getString());
//		product.commonName = map.get(domain.sql.Product.commonName.getQualifiedName()).get(index).getString();
//		product.description = map.get(domain.sql.Product.description.getQualifiedName()).get(index).getString();
//		product.locationTags = convertTagToTags(
//				map.get(domain.sql.Product.locationTags.getQualifiedName()).get(index).getString());
//		product.tags = convertTagToTags(map.get(domain.sql.Product.tags.getQualifiedName()).get(index).getString());
//
//		product.category = new CategoryReference2();
//		product.category.id = map.get(domain.sql.Product.categoryId.getQualifiedName()).get(index).getInteger();
//		product.category.name = map.get(domain.sql.Category.name.getQualifiedName()).get(index).getString();
//
//		product.seller = new SellerReference3();
//		product.seller.id = map.get(domain.sql.Product.sellerId.getQualifiedName()).get(index).getBinary()
//				.toUUIDString();
//		product.seller.name = map.get(domain.sql.Seller.name.getQualifiedName()).get(index).getString();
//		product.seller.storeName = map.get(domain.sql.Seller.storeName.getQualifiedName()).get(index).getString();
//
//		product.enabled = map.get(domain.sql.Product.enabled.getQualifiedName()).get(index).getBool();
//
//		return product;
//	}

//	public ProductReference4 mapToProductReference4(HashMap<String, List<Field>> map, int index) {
//
//		ProductReference4 ref = new ProductReference4();
//
//		ref.productId = map.get(domain.sql.Product.id.getQualifiedName()).get(index).getBinary().toUUIDString();
//		ref.name = map.get(domain.sql.Product.name.getQualifiedName()).get(index).getString();
//		ref.slug = new Slugify().slugify(map.get(domain.sql.Product.name.getQualifiedName()).get(index).getString());
//		ref.commonName = map.get(domain.sql.Product.commonName.getQualifiedName()).get(index).getString();
//		ref.skuId = map.get(domain.sql.ProductSKU.id.getQualifiedName()).get(index).getBinary().toUUIDString();
//		ref.sku = map.get(domain.sql.ProductSKU.sku.getQualifiedName()).get(index).getString();
//		ref.pricePerUnit = map.get(domain.sql.ProductSKU.pricePerUnit.getQualifiedName()).get(index).getNumeric();
//		ref.sellingPricePerUnit = map.get(domain.sql.ProductSKU.sellingPricePerUnit.getQualifiedName()).get(index)
//				.getNumeric();
//		ref.currencySymbol = map.get(domain.sql.ProductSKU.currencyId.getQualifiedName()).get(index).getString();
//		ref.quantity = map.get(domain.sql.ProductSKU.quantityInStock.getQualifiedName()).get(index).getInteger();
//
//		ref.category = new CategoryReference2();
//		ref.category.id = map.get(domain.sql.Category.id.getQualifiedName()).get(index).getInteger();
//		ref.category.name = map.get(domain.sql.Category.name.getQualifiedName()).get(index).getString();
//
//		ref.seller = new SellerReference3();
//		ref.seller.id = map.get(domain.sql.Seller.id.getQualifiedName()).get(index).getBinary().toUUIDString();
//		ref.seller.storeName = map.get(domain.sql.Seller.storeName.getQualifiedName()).get(index).getString();
//		ref.seller.name = map.get(domain.sql.Seller.name.getQualifiedName()).get(index).getString();
//
//		return ref;
//	}

//	private void addFilters(Query q, ProductFilterParameter1 filters) {
//		if (filters == null)
//			return;
//
//		if (filters.categoryIds != null && filters.categoryIds.length > 0) {
//			FieldValue[] categoryIds = new FieldValue[filters.categoryIds.length];
//
//			int i = 0;
//			for (String id : filters.categoryIds) {
//				categoryIds[i++] = new FieldValue(FieldTypes.Integer, Integer.parseInt(id));
//			}
//
//			q.whereAndClause(domain.sql.Category.id.copy(), QueryOperation.in(q, categoryIds));
//		}
//
//		if (filters.sellerIds != null && filters.sellerIds.length > 0) {
//			FieldValue[] sellerIds = new FieldValue[filters.sellerIds.length];
//
//			int i = 0;
//			for (String id : filters.sellerIds) {
//				sellerIds[i++] = new FieldValue(FieldTypes.Binary, new Binary(id));
//			}
//
//			q.whereAndClause(domain.sql.Seller.id.copy(), QueryOperation.in(q, sellerIds));
//		}
//
//		if (filters.productIds != null && filters.productIds.length > 0) {
//			FieldValue[] productIds = new FieldValue[filters.productIds.length];
//
//			int i = 0;
//			for (String id : filters.productIds) {
//				productIds[i++] = new FieldValue(FieldTypes.Binary, new Binary(id));
//			}
//
//			q.whereAndClause(domain.sql.Product.id.copy(), QueryOperation.in(q, productIds));
//		}
//
//		if (filters.skuIds != null && filters.skuIds.length > 0) {
//			FieldValue[] skuIds = new FieldValue[filters.skuIds.length];
//
//			int i = 0;
//			for (String id : filters.skuIds) {
//				skuIds[i++] = new FieldValue(FieldTypes.Binary, new Binary(id));
//			}
//
//			q.whereAndClause(domain.sql.ProductSKU.id.copy(), QueryOperation.in(q, skuIds));
//		}
//
//		if (filters.textSearch != null && filters.textSearch.length() > 0) {
//			FieldValue val = new FieldValue(FieldTypes.String, filters.textSearch);
//			q.whereAndClause(domain.sql.Product.name.copy(), QueryOperation.like(q, val));
//		}
//	}

	private static QueryOperation2 getCreateInQueryOperation(Field2 tableField, Object[] values) {
		if (values.length == 0) {
			return QueryOperation2.equal(FieldValue2.sqlInt(1), FieldValue2.sqlInt(2));
		}

		List<FieldValue2> fieldValues = new ArrayList<FieldValue2>();

		for (Object value : values) {
			fieldValues.add(new FieldValue2(tableField.getType(), value));
		}

		return QueryOperation2.in(tableField, fieldValues.toArray(new FieldValue2[fieldValues.size()]));
	}

	private static void applyMandatoryFilters(Query2 q) {
		q.whereAndClause(
				QueryOperation2.equal(infinity.stone.product.schema.Product.Enabled, FieldValue2.sqlBool(true)));
		q.whereAndClause(QueryOperation2.equal(infinity.stone.product.schema.Product.Status,
				FieldValue2.sqlInt(ProductStatus.LIVE.getCode())));
	}

	private static Integer[] convertStringsToIntegers(String[] values) {
		List<Integer> integers = new ArrayList<Integer>();

		for (String v : values) {
			integers.add(Integer.parseInt(v));
		}

		return integers.toArray(new Integer[integers.size()]);
	}

	private static UUID[] convertStringsToUUIDs(String[] values) {
		List<UUID> uuids = new ArrayList<UUID>();

		for (String v : values) {
			uuids.add(UUID.fromString(v));
		}

		return uuids.toArray(new UUID[uuids.size()]);
	}

	private static void addFilters(Query2 q, ProductUnitFilterParameter1 filters) {
		applyMandatoryFilters(q);

		if (filters == null)
			return;

		if (filters.categoryIds != null) {
			q.whereAndClause(getCreateInQueryOperation(infinity.stone.category.schema.Category.Id,
					convertStringsToIntegers(filters.categoryIds)));
		}

		if (filters.sellerIds != null) {
			q.whereAndClause(getCreateInQueryOperation(infinity.stone.seller.schema.Seller.Id,
					convertStringsToUUIDs(filters.sellerIds)));
		}

		if (filters.productIds != null) {
			q.whereAndClause(getCreateInQueryOperation(infinity.stone.product.schema.Product.Id,
					convertStringsToUUIDs(filters.productIds)));
		}

		if (filters.skuIds != null) {
			q.whereAndClause(getCreateInQueryOperation(infinity.stone.product.schema.ProductSKU.Id,
					convertStringsToUUIDs(filters.skuIds)));
		}

		if (filters.textSearch != null) {
			q.whereAndClause(QueryOperation2.or(
					QueryOperation2.contains(infinity.stone.product.schema.Product.Name, filters.textSearch),
					QueryOperation2.contains(infinity.stone.product.schema.Product.CommonName, filters.textSearch),
					QueryOperation2.contains(infinity.stone.category.schema.Category.Name, filters.textSearch)));
		}

	}

	public ProductUnitDetails1[] getPageOfProductUnits(Integer page, Integer pageSize,
			ProductUnitFilterParameter1 filters) {
		Query2 q = Query2.select(infinity.stone.product.schema.ProductSKU.tableName);
		q.innerJoin(infinity.stone.product.schema.Product.tableName, infinity.stone.product.schema.ProductSKU.ProductId,
				infinity.stone.product.schema.Product.Id);
		q.innerJoin(infinity.stone.category.schema.Category.tableName, infinity.stone.product.schema.Product.CategoryId,
				infinity.stone.category.schema.Category.Id);
		q.innerJoin(infinity.stone.seller.schema.Seller.tableName, infinity.stone.product.schema.Product.SellerId,
				infinity.stone.seller.schema.Seller.Id);

		q.whereClause(QueryOperation2.equal(FieldValue2.sqlInt(1), FieldValue2.sqlInt(1)));

		addFilters(q, filters);

		q.setLimit(pageSize);
		q.setOffset((page - 1) * pageSize);

		HashMap<String, QueryFieldReference> queryFieldReferences = new HashMap<String, QueryFieldReference>();

		queryFieldReferences.put("Product.Id", q.addField(infinity.stone.product.schema.Product.Id));
		queryFieldReferences.put("Product.Name", q.addField(infinity.stone.product.schema.Product.Name));
		queryFieldReferences.put("Product.Slug", q.addField(infinity.stone.product.schema.Product.Slug));
		queryFieldReferences.put("Product.CommonName", q.addField(infinity.stone.product.schema.Product.CommonName));

		queryFieldReferences.put("ProductSKU.Id", q.addField(infinity.stone.product.schema.ProductSKU.Id));
		queryFieldReferences.put("ProductSKU.SKU", q.addField(infinity.stone.product.schema.ProductSKU.Sku));
		queryFieldReferences.put("ProductSKU.QuantityInStock",
				q.addField(infinity.stone.product.schema.ProductSKU.QuantityInStock));
		queryFieldReferences.put("ProductSKU.CurrencyId",
				q.addField(infinity.stone.product.schema.ProductSKU.CurrencyId));
		queryFieldReferences.put("ProductSKU.PricePerUnit",
				q.addField(infinity.stone.product.schema.ProductSKU.PricePerUnit));
		queryFieldReferences.put("ProductSKU.SellingPricePerUnit",
				q.addField(infinity.stone.product.schema.ProductSKU.SellingPricePerUnit));
		queryFieldReferences.put("ProductSKU.KeyValues",
				q.addField(infinity.stone.product.schema.ProductSKU.KeyValues));

		queryFieldReferences.put("Category.Id", q.addField(infinity.stone.category.schema.Category.Id));
		queryFieldReferences.put("Category.Name", q.addField(infinity.stone.category.schema.Category.Name));

		queryFieldReferences.put("Seller.Id", q.addField(infinity.stone.seller.schema.Seller.Id));
//		queryFieldReferences.put("Seller.Name", q.addField(infinity.stone.seller.schema.Seller.Name));
		queryFieldReferences.put("Seller.StoreName", q.addField(infinity.stone.seller.schema.Seller.StoreName));

		List<HashMap<String, Field2>> queryResult = q.executeQuery();

		List<ProductUnitDetails1> units = new ArrayList<ProductUnitDetails1>();

		for (HashMap<String, Field2> row : queryResult) {
			units.add(mapToProductUnitDetails1(row, queryFieldReferences));
		}
		return units.toArray(new ProductUnitDetails1[queryResult.size()]);
	}

//	public ProductReference4[] getPageOfProducts(Integer page, Integer pageSize, ProductFilterParameter1 filters)
//			throws Exception {
//		if (page == null || page <= 0 || pageSize == null || pageSize <= 0)
//			return new ProductReference4[0];
//
//		Query q = new Query();
//		q.select(domain.sql.Product.tableName);
//		q.innerJoin(domain.sql.Product.id.copy(), domain.sql.ProductSKU.productId.copy());
//		q.innerJoin(domain.sql.Product.categoryId.copy(), domain.sql.Category.id.copy());
//		q.innerJoin(domain.sql.Product.sellerId.copy(), domain.sql.Seller.id.copy());
//
//		q.addField(domain.sql.Product.id.copy());
//		q.addField(domain.sql.Product.name.copy());
//		q.addField(domain.sql.Product.commonName.copy());
//
//		q.addField(domain.sql.Seller.id.copy());
//		q.addField(domain.sql.Seller.name.copy());
//		q.addField(domain.sql.Seller.storeName.copy());
//
//		q.addField(domain.sql.Category.id.copy());
//		q.addField(domain.sql.Category.name.copy());
//
//		q.addField(domain.sql.ProductSKU.getAllFields1());
//
//		q.whereClause(domain.sql.Product.enabled.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Boolean, true)));
//		q.whereAndClause(domain.sql.ProductSKU.pricePerUnit.copy(),
//				QueryOperation.gt(q, new FieldValue(FieldTypes.Integer, 0)));
//		q.whereAndClause(domain.sql.ProductSKU.sellingPricePerUnit.copy(),
//				QueryOperation.gt(q, new FieldValue(FieldTypes.Integer, 0)));
//		addFilters(q, filters);
//
//		q.setLimit(pageSize);
//		q.setOffset((page - 1) * pageSize);
//
//		HashMap<String, List<Field>> queryResult = q.executeQuery();
//
//		if (queryResult.get(domain.sql.Product.id.copy().getQualifiedName()) == null
//				|| queryResult.get(domain.sql.Product.id.copy().getQualifiedName()).size() == 0)
//			return new ProductReference4[0];
//
//		int totalRows = queryResult.get(domain.sql.Product.id.copy().getQualifiedName()).size();
//
//		ProductReference4[] ref = new ProductReference4[totalRows];
//
//		for (int i = 0; i < totalRows; i++) {
//			ref[i] = mapToProductReference4(queryResult, i);
//		}
//
//		return ref;
//	}

	private OptionValueReference1[] getSpecificationsFromKeyValues(JsonObject keyValues) {
		JsonNode specifications = keyValues.getProperty(infinity.service.keys.ProductSKU.specifications);

		if (specifications == null || specifications.size() == 0) {
			return new OptionValueReference1[0];
		}

		int totalKeys = specifications.size();

		List<OptionValueReference1> result = new ArrayList<OptionValueReference1>();

		Iterator<String> options = specifications.fieldNames();

		while (options.hasNext()) {
			String option = options.next();
			String value = specifications.get(option).asText();

			OptionValueReference1 optionValueReference = new OptionValueReference1();
			optionValueReference.option = option;
			optionValueReference.value = value;

			result.add(optionValueReference);
		}
		return result.toArray(new OptionValueReference1[totalKeys]);
	}

	ProductUnitDetails1 mapToProductUnitDetails1(ProductSKU2 productSKU) {

		ProductUnitDetails1 details = new ProductUnitDetails1();
		details.productId = productSKU.getProduct().getId().toString();
		details.skuId = productSKU.getId().toString();
		details.slug = productSKU.getProduct().getSlug();
		details.description = productSKU.getProduct().getDescription();
		details.sku = productSKU.getSKU();
		details.quantityInStock = productSKU.getQuantityInStock();
		details.currency = MappingUtils.mapToCurrencyReference1(productSKU.getCurrency());
		details.pricePerUnit = productSKU.getPricePerUnit();
		details.sellingPricePerUnit = productSKU.getSellingPricePerUnit();
		details.name = productSKU.getProduct().getName();
		details.commonName = productSKU.getProduct().getCommonName();
		details.category = CategoryService1.mapToCategoryReference2(productSKU.getProduct().getCategory());
		details.seller = SellerService1.mapToSellerReference3(productSKU.getProduct().getSeller());
		details.specifications = getSpecificationsFromKeyValues(new JsonObject(productSKU.getKeyValues()));

		return details;
	}

	private ProductUnitDetails1 mapToProductUnitDetails1(HashMap<String, Field2> queryResult,
			HashMap<String, QueryFieldReference> queryFieldReferences) {

		ProductUnitDetails1 details = new ProductUnitDetails1();

		details.productId = queryFieldReferences.get("Product.Id").getValue(queryResult).getUUID().toString();
		details.skuId = queryFieldReferences.get("ProductSKU.Id").getValue(queryResult).getUUID().toString();
		details.slug = queryFieldReferences.get("Product.Slug").getValue(queryResult).getString();
		details.sku = queryFieldReferences.get("ProductSKU.SKU").getValue(queryResult).getString();
		details.quantityInStock = queryFieldReferences.get("ProductSKU.QuantityInStock").getValue(queryResult)
				.getInteger();
		details.currency = MappingUtils.mapToCurrencyReference1(
				queryFieldReferences.get("ProductSKU.CurrencyId").getValue(queryResult).getString());
		details.pricePerUnit = queryFieldReferences.get("ProductSKU.PricePerUnit").getValue(queryResult).getNumeric();
		details.sellingPricePerUnit = queryFieldReferences.get("ProductSKU.SellingPricePerUnit").getValue(queryResult)
				.getNumeric();
		details.name = queryFieldReferences.get("Product.Name").getValue(queryResult).getString();
		details.commonName = queryFieldReferences.get("Product.CommonName").getValue(queryResult).getString();

		details.category = new CategoryReference2();
		details.category.id = queryFieldReferences.get("Category.Id").getValue(queryResult).getInteger();
		details.category.name = queryFieldReferences.get("Category.Name").getValue(queryResult).getString();

		details.seller = new SellerReference3();
		details.seller.id = queryFieldReferences.get("Seller.Id").getValue(queryResult).getUUID().toString();
//		details.seller.name = queryFieldReferences.get("Seller.Name").getValue(queryResult).getString();
		details.seller.storeName = queryFieldReferences.get("Seller.StoreName").getValue(queryResult).getString();

		details.specifications = getSpecificationsFromKeyValues(
				new JsonObject(queryFieldReferences.get("ProductSKU.KeyValues").getValue(queryResult).getJson()));

		return details;
	}

	public ProductUnitDetails1 getProductUnitDetail(ProductTargetParameter1 product, ProductSKUTargetParameter1 sku) {
		Product2 productObj = getProductDetails(resolveProductId(product),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList(infinity.stone.product.domain.ProductSKU2.class,
						infinity.stone.category.domain.Category2.class, infinity.stone.seller.domain.Seller.class)));

		List<ProductSKU2> productSKUs = productObj.getProductSKUs();

		for (ProductSKU2 obj : productSKUs) {
			if ((sku.skuId != null && obj.getId().equals(UUID.fromString(sku.skuId)))
					|| (sku.sku != null && obj.getSKU().equals(sku.sku))) {
				return mapToProductUnitDetails1(obj);
			}
		}

		throw new ResourceNotFoundException("Unit not found");
	}

//	public ProductUnitDetails1 getProductUnitDetail(ProductSKUTargetParameter1 sku) throws Exception {
//		if (sku == null || sku.skuId == null)
//			throw new Exception("Invalid target parameter");
//
//		Query q = new Query();
//		q.select(domain.sql.ProductSKU.tableName);
//		q.addField(domain.sql.ProductSKU.getAllFields1());
//
//		q.innerJoin(domain.sql.ProductSKU.productId.copy(), domain.sql.Product.id.copy());
//		q.leftJoin(domain.sql.ProductSKU.id.copy(), domain.sql.ProductSKUValue.productSKUId.copy());
//		q.leftJoin(domain.sql.ProductSKUValue.productOptionId.copy(), domain.sql.ProductOption.id.copy());
//		q.leftJoin(domain.sql.ProductSKUValue.productOptionValueId.copy(), domain.sql.ProductOptionValue.id.copy());
//		q.innerJoin(domain.sql.Product.sellerId.copy(), domain.sql.Seller.id.copy());
//		q.innerJoin(domain.sql.Product.categoryId.copy(), domain.sql.Category.id.copy());
//
//		q.addField(domain.sql.ProductOption.optionName.copy());
//		q.addField(domain.sql.ProductOptionValue.valueName.copy());
//
//		q.addField(domain.sql.Product.id.copy());
//		q.addField(domain.sql.Product.name.copy());
//		q.addField(domain.sql.Product.commonName.copy());
//		q.addField(domain.sql.Product.description.copy());
//
//		q.addField(domain.sql.Seller.id.copy());
//		q.addField(domain.sql.Seller.name.copy());
//		q.addField(domain.sql.Seller.storeName.copy());
//
//		q.addField(domain.sql.Category.id.copy());
//		q.addField(domain.sql.Category.name.copy());
//
//		q.addField(domain.sql.ProductSKUValue.productOptionId.copy());
//		q.addField(domain.sql.ProductSKUValue.productOptionValueId.copy());
//
//		q.whereClause(domain.sql.ProductSKU.id.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, new Binary(sku.skuId))));
//
//		HashMap<String, List<Field>> queryResult = q.executeQuery();
//
//		return mapToProductUnitDetails1(null);
//	}

//	public static void putProductRating(ProductRatingTargetParameter1 target, Integer rating, String comments)
//			throws Exception {
//		if (rating == null || rating > 5)
//			throw new Exception("Invalid rating! Rating must be between 1 to 5 both including");
//
//		if (target == null || target.userId == null || target.productId == null)
//			throw new Exception("Invalid target");
//
//		Field id = domain.sql.ProductRating.id.copy();
//		Field productId = domain.sql.ProductRating.productId.copy();
//		Field userId = domain.sql.ProductRating.userId.copy();
//		Field rtng = domain.sql.ProductRating.rating.copy();
//		Field comment = domain.sql.ProductRating.comment.copy();
//
//		id.setFieldValue(new Binary(UUID.randomUUID()));
//		productId.setFieldValue(new Binary(UUID.fromString(target.productId)));
//		userId.setFieldValue(new Binary(UUID.fromString(target.userId)));
//		rtng.setFieldValue(rating);
//		comment.setFieldValue(comments);
//
//		Field[] fields = { id, productId, userId, rtng, comment };
//
//		Sql sql = new Sql();
//		sql.insertOrUpdate(domain.sql.ProductRating.tableName, fields);
//
//	}
//
//	public static void deleteRating(ProductRatingTargetParameter1 target) throws Exception {
//		if (target == null || target.userId == null || target.productId == null)
//			throw new Exception("Invalid target");
//
//		Query q = new Query();
//		q.whereClause(domain.sql.ProductRating.userId.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, new Binary(UUID.fromString(target.userId)))));
//
//		q.whereAndClause(domain.sql.ProductRating.productId.copy(), QueryOperation.equal(q,
//				new FieldValue(FieldTypes.Binary, new Binary(UUID.fromString(target.productId)))));
//
//		Sql sql = new Sql();
//		sql.delete(domain.sql.ProductRating.tableName, q.getWhereClauseExpression(), q.getPlaceHolderValueMap());
//
//	}
//
//	static ProductRatingReference1 mapToProductRatingReference1(HashMap<String, List<Field>> map, int index) {
//		ProductRatingReference1 rating = new ProductRatingReference1();
//
//		rating.productId = map.get(domain.sql.ProductRating.productId.getQualifiedName()).get(index).getBinary()
//				.toString();
//		rating.rating = map.get(domain.sql.ProductRating.rating.getQualifiedName()).get(index).getInteger();
//		rating.comments = map.get(domain.sql.ProductRating.comment.getQualifiedName()).get(index).getString();
//		rating.user = new UserParameter1();
//		rating.user.name = map.get(domain.sql.User.name.getQualifiedName()).get(index).getString();
//
//		return rating;
//	}
//
//	public static ProductRatingReference1[] getAllProductRating(ProductTargetParameter1 target) throws Exception {
//		Query q = new Query();
//		q.select(domain.sql.ProductRating.tableName);
//		q.addField(domain.sql.ProductRating.getAllFields());
//		q.innerJoin(domain.sql.ProductRating.userId.copy(), domain.sql.User.id.copy());
//		q.addField(domain.sql.User.name.copy());
//
//		q.whereClause(domain.sql.ProductRating.productId.copy(),
//				QueryOperation.equal(q, new FieldValue(FieldTypes.Binary, new Binary(UUID.fromString(target.id)))));
//
//		HashMap<String, List<Field>> results = q.executeQuery();
//
//		int totalRows = results.get(domain.sql.ProductRating.id.getQualifiedName()) != null
//				? results.get(domain.sql.ProductRating.id.getQualifiedName()).size()
//				: 0;
//
//		ProductRatingReference1[] ratings = new ProductRatingReference1[totalRows];
//
//		for (int i = 0; i < totalRows; i++) {
//			ratings[i] = mapToProductRatingReference1(results, i);
//		}
//
//		return ratings;
//	}

	private static void changeProductStatusToUnderReview(Product2 product, String remark) {
		if (product.getStatus() == ProductStatus.NEW || product.getStatus() == ProductStatus.EDITED) {
			product.setStatus(ProductStatus.UNDER_REVIEW);
			product.setStatusRemark(remark);
			product.save();
		} else {
			throw new ValidationException("status change not allowed");
		}
	}

	private static void approveProduct(Product2 product, String remark) {
		if (product.getStatus() == ProductStatus.NEW || product.getStatus() == ProductStatus.EDITED
				|| product.getStatus() == ProductStatus.UNDER_REVIEW || product.getStatus() == ProductStatus.LIVE) {
			product.setStatus(ProductStatus.APPROVED);
			product.setStatusRemark(remark);
			product.save();
		} else {
			throw new ValidationException("status change not allowed");
		}
	}

	private static void rejectProduct(Product2 product, String remark) {
		if (product.getStatus() == ProductStatus.NEW || product.getStatus() == ProductStatus.EDITED
				|| product.getStatus() == ProductStatus.UNDER_REVIEW) {
			product.setStatus(ProductStatus.REJECTED);
			product.setStatusRemark(remark);
			product.save();
		} else {
			throw new ValidationException("status change not allowed");
		}
	}

	private static void changeProductStatusToLive(Product2 product, String remark) {
		if (product.getStatus() == ProductStatus.APPROVED) {
			product.setStatus(ProductStatus.LIVE);
			product.setStatusRemark(remark);
			product.save();
		} else {
			throw new ValidationException("status change not allowed");
		}
	}

	public void changeProductStatus(ProductTargetParameter1 product, String status, String remark) {
		Product2 productObj = getProductDetails(UUID.fromString(product.id),
				new HashSet<Class<? extends DomainBase>>(Arrays.asList()));
		if (status != null && status.equals(infinity.service.keys.Product.Status.underReview)) {
			changeProductStatusToUnderReview(productObj, remark);
			return;
		}
		if (status != null && status.equals(infinity.service.keys.Product.Status.approved)) {
			approveProduct(productObj, remark);
			return;
		}
		if (status != null && status.equals(infinity.service.keys.Product.Status.rejected)) {
			rejectProduct(productObj, remark);
			return;
		}
		if (status != null && status.equals(infinity.service.keys.Product.Status.live)) {
			changeProductStatusToLive(productObj, remark);
			return;
		}
	}

}
