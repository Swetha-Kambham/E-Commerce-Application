package infinity.service.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import infinity.service.contracts.category.CategoryReference1;
import infinity.service.contracts.category.CategoryReference2;
import infinity.service.contracts.category.CategoryParameter1;
import infinity.service.contracts.category.CategoryTargetParameter1;
import infinity.service.exception.InvalidInputException;
import infinity.stone.category.domain.Category2;
import infinity.stone.domain.exception.ValidationException;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.OrderBy;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryFieldReference;
import infinity.stone.sql.helper.QueryOperation2;
import infinity.stone.sql.helper.TableReference;

public class CategoryService1 {

	public CategoryReference1 getCategory(CategoryTargetParameter1 target) {
		if (target == null || target.id == null)
			throw new InvalidInputException("id is required");

		Category2 category = getCategoryDetails(target.id);

		return mapToCategoryReference1(category);
	}

	static CategoryReference1 mapToCategoryReference1(Category2 category) {

		CategoryReference1 ref = new CategoryReference1();

		ref.id = category.getId();
		ref.name = category.getName();
		ref.description = category.getDescription();

		Category2 parent = category.getParent();
		if (parent != null) {
			ref.parent = new CategoryReference2();
			ref.parent.id = parent.getId();
			ref.parent.name = parent.getName();
		}

		ref.hierarchy = category.getHierarchy().getValue();
		ref.hierarchyName = category.getHierarchyName().getValue();
		ref.enabled = category.getEnabled();

		return ref;
	}

	static CategoryReference2 mapToCategoryReference2(Category2 category) {
		CategoryReference2 ref = new CategoryReference2();
		ref.id = category.getId();
		ref.name = category.getName();

		return ref;
	}

	static Category2 getCategoryDetails(Integer id) {
		Query2 q = Query2.select(infinity.stone.category.schema.Category.tableName);
		q.addFields(new infinity.stone.category.schema.Category().getAllFields());
		q.whereClause(QueryOperation2.equal(infinity.stone.category.schema.Category.Id, FieldValue2.sqlInt(id)));
		return ObjectLoader.loadObject(Category2.class, id, q);
	}

	public void putCategory(CategoryTargetParameter1 target, CategoryParameter1 category) {

		Category2 c = null;

		if (target != null && target.id != null) {
			c = getCategoryDetails(target.id);
		} else {
			c = new Category2();
		}

		c.setName(category.name);
		c.setDescription(category.description);
		c.setEnabled(category.enabled);

		Category2 parent = null;

		if (category.parentId != null) {
			parent = getCategoryDetails(category.parentId);
		}

		if (c.equals(parent)) {
			throw new ValidationException("Category and parent are same");
		}

		c.setParent(parent);

		c.save();
	}

	public void deleteCategory(CategoryTargetParameter1 target) {
		if (target == null || target.id == null)
			throw new InvalidInputException("id is required");

		Category2 category = getCategoryDetails(target.id);

		category.delete();
	}

	public CategoryReference1[] getAllCategories() {
		Query2 q = Query2.select(infinity.stone.category.schema.Category.tableName);
		TableReference categoryParentTable = q.leftJoin(infinity.stone.category.schema.Category.tableName, infinity.stone.category.schema.Category.Parent,
				infinity.stone.category.schema.Category.Id);

		QueryFieldReference id = q.addField(infinity.stone.category.schema.Category.Id);
		QueryFieldReference name = q.addField(infinity.stone.category.schema.Category.Name, OrderBy.ASCENDING);
		QueryFieldReference description = q.addField(infinity.stone.category.schema.Category.Description);
		QueryFieldReference hierarchy = q.addField(infinity.stone.category.schema.Category.Hierarchy);
		QueryFieldReference hierarchyName = q.addField(infinity.stone.category.schema.Category.HierarchyName);
		QueryFieldReference enabled = q.addField(infinity.stone.category.schema.Category.Enabled);

		QueryFieldReference parentId = q.addField(categoryParentTable, infinity.stone.category.schema.Category.Id);
		QueryFieldReference parentName = q.addField(categoryParentTable, infinity.stone.category.schema.Category.Name);

		q.setLimit(100);

		List<HashMap<String, Field2>> result = q.executeQuery();

		List<CategoryReference1> categories = new ArrayList<CategoryReference1>();

		for (HashMap<String, Field2> row : result) {
			CategoryReference1 category = new CategoryReference1();

			category.id = id.getValue(row).getInteger();
			category.name = name.getValue(row).getString();
			category.description = description.getValue(row).getString();

			if (parentId.getValue(row).getInteger() != null) {
				category.parent = new CategoryReference2();
				category.parent.id = parentId.getValue(row).getInteger();
				category.parent.name = parentName.getValue(row).getString();

			}

			category.hierarchy = hierarchy.getValue(row).getString();
			category.hierarchyName = hierarchyName.getValue(row).getString();
			category.enabled = enabled.getValue(row).getBool();

			categories.add(category);
		}

		return categories.toArray(new CategoryReference1[categories.size()]);
	}

}
