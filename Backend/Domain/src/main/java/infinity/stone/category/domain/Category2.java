package infinity.stone.category.domain;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import infinity.stone.category.schema.Category;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.helper.domain.OrderedMultiValueText;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.sql.helper.Field2;

@DomainObject(schemaType = infinity.stone.category.schema.Category.class)
public class Category2 extends DomainBase {

	@PropertyField
	private Integer Id;

	@PropertyField
	private String Name;

	@PropertyField
	private String Description;

	@PropertyField
	private Category2 Parent;

	@PropertyField
	private OrderedMultiValueText Hierarchy;

	@PropertyField
	private OrderedMultiValueText HierarchyName;

	@PropertyField
	private Boolean Enabled;

	private Integer parentIdInternal;

	public Category2() {
		super(new infinity.stone.category.schema.Category());
	}

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
		propertyChangeListener(Category.Id.getFieldName(), id);
		setHierarchy();
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
		propertyChangeListener(Category.Name.getFieldName(), name);
		setHierarchyName();
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
		propertyChangeListener(Category.Description.getFieldName(), description);
	}

	public Category2 getParent() {
		if (parentIdInternal == null) {
			return null;
		}

		if (this.Parent != null) {
			return this.Parent;
		}

		this.Parent = getPersistedObject(super.getData(), parentIdInternal);

		if (this.Parent == null) {
			this.Parent = ObjectLoader.loadObject(Category2.class, parentIdInternal);
		}

		return this.Parent;
	}

	public void setParent(Category2 parent) {
		Parent = parent;
		parentIdInternal = parent != null ? parent.getId() : null;
		propertyChangeListener(Category.Parent.getFieldName(), parentIdInternal);
		setHierarchy();
		setHierarchyName();
	}

	public OrderedMultiValueText getHierarchy() {
		return Hierarchy;
	}

	private void setHierarchy() {
		if (this.Parent != null) {
			List<String> hierarchy = new ArrayList<String>(Arrays.asList(this.Parent.getHierarchy().getValues()));
			hierarchy.add(this.getId() != null ? this.getId().toString() : ((Integer) Integer.MAX_VALUE).toString());
			this.Hierarchy = new OrderedMultiValueText(hierarchy.toArray(new String[hierarchy.size()]));
		} else {
			this.Hierarchy = new OrderedMultiValueText(new String[] {
					this.getId() != null ? this.getId().toString() : ((Integer) Integer.MAX_VALUE).toString() });
		}
		propertyChangeListener(Category.Hierarchy.getFieldName(), this.Hierarchy);
	}

	public OrderedMultiValueText getHierarchyName() {
		return HierarchyName;
	}

	private void setHierarchyName() {
		if (this.Parent != null) {
			List<String> hierarchyName = new ArrayList<String>(
					Arrays.asList(this.Parent.getHierarchyName().getValues()));
			hierarchyName.add(this.Name);
			this.HierarchyName = new OrderedMultiValueText(hierarchyName.toArray(new String[hierarchyName.size()]));
		} else {
			this.HierarchyName = new OrderedMultiValueText(new String[] { this.Name });
		}
		propertyChangeListener(Category.HierarchyName.getFieldName(), this.HierarchyName);
	}

	public Boolean getEnabled() {
		return Enabled;
	}

	public void setEnabled(Boolean enabled) {
		Enabled = enabled;
		propertyChangeListener(Category.Enabled.getFieldName(), enabled);
	}

	public static Category2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		Category2 category = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, Category.Id);

			if (idField.getInteger() != null && idField.getInteger().equals(id)) {
				category = new Category2();
				category.Id = (Integer) id;
				category.Name = findField(queryResultFields, Category.Name).getString();
				category.Description = findField(queryResultFields, Category.Description).getString();
				category.parentIdInternal = findField(queryResultFields, Category.Parent).getInteger();
				category.Enabled = findField(queryResultFields, Category.Enabled).getBool();
				category.Hierarchy = new OrderedMultiValueText(
						findField(queryResultFields, Category.Hierarchy).getString());
				category.HierarchyName = new OrderedMultiValueText(
						findField(queryResultFields, Category.HierarchyName).getString());
				category.setPersisted(true);
				category.setData(queryResult);

				return category;
			}
		}

		return category;
	}

	public static Category2 getPersistedObject(HashMap<String, Field2> queryResult) {
		Category2 category = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, Category.Id);

		if (idField.getInteger() != null) {
			category = new Category2();
			category.Id = idField.getInteger();
			category.Name = findField(queryResultFields, Category.Name).getString();
			category.Description = findField(queryResultFields, Category.Description).getString();
			category.parentIdInternal = findField(queryResultFields, Category.Parent).getInteger();
			category.Enabled = findField(queryResultFields, Category.Enabled).getBool();
			category.Hierarchy = new OrderedMultiValueText(
					findField(queryResultFields, Category.Hierarchy).getString());
			category.HierarchyName = new OrderedMultiValueText(
					findField(queryResultFields, Category.HierarchyName).getString());
			category.setPersisted(true);
			category.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return category;
		}

		return category;
	}

	private void saveInternal() {
		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);
			super.save(this);

			if (!isPersisted()) {
				resetDirtyFields();
				this.Id = getGeneratedKey();
				setHierarchy();
				super.update(this);
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

	@Override
	public void save() {
		saveInternal();
	}

	@Override
	public void delete() {
		super.delete(this);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj == null || obj.getClass() != this.getClass())
			return false;

		Category2 category = (Category2) obj;

		return this.Id.equals(category.Id);
	}

	@Override
	public int hashCode() {
		return Id;
	}

}
