package infinity.service.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import infinity.service.IProductService2;
import infinity.service.contracts.AddOrUpdateProductUnitsToProductViewParameter;
import infinity.service.contracts.DeleteProductViewParameter;
import infinity.service.contracts.GetPageOfProductViewParameter;
import infinity.service.contracts.GetProductViewDetailsParameter;
import infinity.service.contracts.PutProductViewParameter;
import infinity.service.contracts.product.ProductUnitParameter1;
import infinity.service.contracts.product.ProductUnitReference1;
import infinity.service.contracts.product.ProductViewDetails1;
import infinity.service.contracts.product.ProductViewFilter;
import infinity.service.contracts.product.ProductViewParameter1;
import infinity.service.contracts.product.ProductViewTargetParameter1;
import infinity.service.exception.InvalidInputException;
import infinity.stone.domain.ProductView2;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryFieldReference;
import infinity.stone.sql.helper.QueryOperation2;

@Controller
public class ProductService2 implements IProductService2 {

	@Override
	public ProductViewDetails1 putProductView(PutProductViewParameter input) {
		return putProductView(input.target, input.productView);
	}

	@Override
	public void addOrUpdateProductUnitsToProductView(AddOrUpdateProductUnitsToProductViewParameter input) {
		addOrUpdateProductUnitsToProductView(input.target, input.productUnits);
	}

	@Override
	public void deleteProductView(DeleteProductViewParameter input) {
		deleteProductView(input.target);
	}

	@Override
	public ProductViewDetails1 getProductViewDetails(GetProductViewDetailsParameter input) {
		return getProductViewDetails(input.target);
	}

	@Override
	public ProductViewDetails1[] getPageOfProductView(GetPageOfProductViewParameter input) {
		return getPageOfProductView(input.page, input.pageSize, input.filters);
	}

	static UUID resolveProductViewId(ProductViewTargetParameter1 target) {
		if (target == null || target.id == null) {
			throw new InvalidInputException("Id is required");
		}

		return UUID.fromString(target.id);
	}

	public ProductViewDetails1 putProductView(ProductViewTargetParameter1 target, ProductViewParameter1 productView) {

		ProductView2 view = null;

		if (target != null && target.id != null) {
			view = ObjectLoader.loadObject(ProductView2.class, UUID.fromString(target.id));
		} else {
			view = new ProductView2();
		}

		view.setName(productView.name);
		view.setDescription(productView.description);
		view.setSummary(productView.summary);
		view.setPriority(productView.priority);
		view.save();

		return mapToProductViewDetails1(view);
	}

	public void addOrUpdateProductUnitsToProductView(ProductViewTargetParameter1 target,
			ProductUnitParameter1[] productUnits) {
		if (productUnits == null) {
			throw new InvalidInputException("Product Units are required");
		}

		ProductView2 view = ObjectLoader.loadObject(ProductView2.class, resolveProductViewId(target));

		JsonObject metadata = new JsonObject(view.getKeyValues());

		ObjectMapper mapper = new ObjectMapper();
		ArrayNode arrayNode = mapper.createArrayNode();

		for (ProductUnitParameter1 productUnit : productUnits) {
			ObjectNode objectNode = mapper.createObjectNode();
			objectNode.put(infinity.service.keys.ProductView.ProductUnit.productId, productUnit.productId);
			objectNode.put(infinity.service.keys.ProductView.ProductUnit.skuId, productUnit.skuId);
			objectNode.put(infinity.service.keys.ProductView.ProductUnit.slug, productUnit.slug);
			objectNode.put(infinity.service.keys.ProductView.ProductUnit.sku, productUnit.sku);
			arrayNode.add(objectNode);
		}

		metadata.addOrUpdateProperty(infinity.service.keys.ProductView.productUnit, arrayNode);
		view.setKeyValues(metadata);
		view.save();
	}

	private static ProductUnitReference1[] mapArrayNodeToValues(ArrayNode values) {
		List<ProductUnitReference1> results = new ArrayList<ProductUnitReference1>();

		for (JsonNode value : values) {
			ProductUnitReference1 result = new ProductUnitReference1();

			result.productId = value.get(infinity.service.keys.ProductView.ProductUnit.productId) != null
					? value.get(infinity.service.keys.ProductView.ProductUnit.productId).asText()
					: null;
			result.skuId = value.get(infinity.service.keys.ProductView.ProductUnit.skuId) != null
					? value.get(infinity.service.keys.ProductView.ProductUnit.skuId).asText()
					: null;
			result.slug = value.get(infinity.service.keys.ProductView.ProductUnit.slug) != null
					? value.get(infinity.service.keys.ProductView.ProductUnit.slug).asText()
					: null;
			result.sku = value.get(infinity.service.keys.ProductView.ProductUnit.sku) != null
					? value.get(infinity.service.keys.ProductView.ProductUnit.sku).asText()
					: null;

			results.add(result);
		}
		return results.toArray(new ProductUnitReference1[results.size()]);
	}

	static ProductViewDetails1 mapToProductViewDetails1(ProductView2 view) {
		ProductViewDetails1 details = new ProductViewDetails1();

		details.id = view.getId().toString();
		details.name = view.getName();
		details.description = view.getDescription();
		details.summary = view.getSummary();
		details.priority = view.getPriority();
		details.enabled = view.getEnabled();

		JsonNode productUnits = new JsonObject(view.getKeyValues()).getJson()
				.get(infinity.service.keys.ProductView.productUnit);
		if (productUnits != null) {
			details.productUnits = mapArrayNodeToValues((ArrayNode) productUnits);
		}

		return details;
	}

	public void deleteProductView(ProductViewTargetParameter1 target) {
		ProductView2 view = ObjectLoader.loadObject(ProductView2.class, resolveProductViewId(target));
		view.delete();
	}

	public ProductViewDetails1 getProductViewDetails(ProductViewTargetParameter1 target) {
		ProductView2 view = ObjectLoader.loadObject(ProductView2.class, resolveProductViewId(target));
		return mapToProductViewDetails1(view);
	}

	public ProductViewDetails1[] getPageOfProductView(Integer page, Integer pageSize, ProductViewFilter filters) {
		if (page == null || pageSize == null)
			throw new InvalidInputException("page and pageSize are required");

		if (page == 0 || pageSize == 0)
			return new ProductViewDetails1[0];

		Query2 q = Query2.select(infinity.stone.schema.ProductView.tableName);
		q.whereClause(QueryOperation2.gt(infinity.stone.schema.ProductView.Priority, FieldValue2.sqlInt(0)));

		if (filters != null && filters.isEnabled != null) {
			q.whereClause(
					QueryOperation2.equal(infinity.stone.schema.ProductView.Enabled, FieldValue2.sqlBool(filters.isEnabled)));
		}
		if (filters != null && filters.priorityStartRange != null) {
			q.whereClause(QueryOperation2.gt(infinity.stone.schema.ProductView.Priority,
					FieldValue2.sqlInt(filters.priorityStartRange)));
		}
		if (filters != null && filters.priorityEndRange != null) {
			q.whereClause(
					QueryOperation2.lt(infinity.stone.schema.ProductView.Priority, FieldValue2.sqlInt(filters.priorityEndRange)));
		}
		q.setLimit(pageSize);
		q.setOffset((page - 1) * pageSize);

		HashMap<String, QueryFieldReference> queryFields = new HashMap<String, QueryFieldReference>();

		queryFields.put("Id", q.addField(infinity.stone.schema.ProductView.Id));
		queryFields.put("Name", q.addField(infinity.stone.schema.ProductView.Name));
		queryFields.put("Description", q.addField(infinity.stone.schema.ProductView.Description));
		queryFields.put("Summary", q.addField(infinity.stone.schema.ProductView.Summary));
		queryFields.put("Priority", q.addField(infinity.stone.schema.ProductView.Priority));
		queryFields.put("Enabled", q.addField(infinity.stone.schema.ProductView.Enabled));
		queryFields.put("KeyValues", q.addField(infinity.stone.schema.ProductView.KeyValues));

		List<HashMap<String, Field2>> queryResult = q.executeQuery();

		List<ProductViewDetails1> results = new ArrayList<ProductViewDetails1>();

		boolean hasProductUnitFilter = filters != null && filters.hasProductUnits != null && filters.hasProductUnits;

		for (HashMap<String, Field2> row : queryResult) {
			ProductViewDetails1 productViewDetails = mapToProductViewDetails1(row, queryFields);
			if (hasProductUnitFilter
					&& (productViewDetails.productUnits == null || productViewDetails.productUnits.length == 0)) {
				continue;
			}
			results.add(mapToProductViewDetails1(row, queryFields));
		}

		return results.toArray(new ProductViewDetails1[results.size()]);

	}

	static ProductViewDetails1 mapToProductViewDetails1(HashMap<String, Field2> queryResult,
			HashMap<String, QueryFieldReference> queryFields) {
		ProductViewDetails1 details = new ProductViewDetails1();

		details.id = queryFields.get("Id").getValue(queryResult).getUUID().toString();
		details.name = queryFields.get("Name").getValue(queryResult).getString();
		details.description = queryFields.get("Description").getValue(queryResult).getString();
		details.summary = queryFields.get("Summary").getValue(queryResult).getString();
		details.priority = queryFields.get("Priority").getValue(queryResult).getInteger();
		details.enabled = queryFields.get("Enabled").getValue(queryResult).getBool();

		JsonNode productUnits = new JsonObject(queryFields.get("KeyValues").getValue(queryResult).getJson()).getJson()
				.get(infinity.service.keys.ProductView.productUnit);
		if (productUnits != null) {
			details.productUnits = mapArrayNodeToValues((ArrayNode) productUnits);
		}

		return details;
	}

}
