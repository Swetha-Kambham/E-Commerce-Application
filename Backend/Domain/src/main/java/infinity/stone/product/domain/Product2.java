package infinity.stone.product.domain;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.github.slugify.Slugify;

import infinity.stone.category.domain.Category2;
import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.base.DomainObjectCollection;
import infinity.stone.domain.base.MappingType;
import infinity.stone.domain.base.PropertyField;
import infinity.stone.domain.base.Relationship;
import infinity.stone.domain.base.RelationshipField;
import infinity.stone.domain.base.Relationships;
import infinity.stone.domain.exception.ValidationException;
import infinity.stone.helper.domain.JsonObject;
import infinity.stone.helper.domain.OrderedMultiValueText;
import infinity.stone.object.helper.ObjectLoader;
import infinity.stone.product.schema.Product;
import infinity.stone.seller.domain.Seller;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryOperation2;

@DomainObject(schemaType = infinity.stone.product.schema.Product.class)
@Relationships({ @Relationship(to = Seller.class, mapping = MappingType.ONE_AND_ONE),
		@Relationship(to = ProductSKU2.class, mapping = MappingType.ZERO_OR_MORE),
		@Relationship(to = ProductOption2.class, mapping = MappingType.ZERO_OR_MORE) })
public class Product2 extends DomainBase {

	@PropertyField
	private UUID Id;

	@PropertyField
	private String Name;

	@PropertyField
	private String Slug;

	@PropertyField
	private String CommonName;

	@PropertyField
	private String Description;

	@PropertyField
	private OrderedMultiValueText LocationTags;

	@PropertyField
	private OrderedMultiValueText Tags;

	@PropertyField
	private Category2 Category;

	@RelationshipField
	private Seller Seller;

	@PropertyField
	private Boolean Enabled;

	@PropertyField
	private ProductStatus Status;

	@PropertyField
	private String StatusRemark;

	@PropertyField
	private JsonObject KeyValues;

	@RelationshipField
	private DomainObjectCollection<ProductSKU2> ProductSKUs;

	@RelationshipField
	private DomainObjectCollection<ProductOption2> ProductOptions;

	private Integer CategoryIdInternal;

	private UUID sellerIdInternal;

	public Product2() {
		super(new Product());
		this.Id = UUID.randomUUID();
		this.Status = ProductStatus.NEW;
		this.Enabled = true;
		this.ProductSKUs = new DomainObjectCollection<ProductSKU2>();
		this.ProductOptions = new DomainObjectCollection<ProductOption2>();
	}

	public DomainObjectCollection<ProductOption2> getProductOptions() {
		if (!isPersisted()) {
			this.ProductOptions.setLoaded(true);
			return this.ProductOptions;
		}

		if (!this.ProductOptions.isLoaded()) {

			ProductOption2[] ProductSKUs = retreiveData(ProductOption2.class);
			if (ProductSKUs != null) {

				for (ProductOption2 item : ProductSKUs) {
					if (item.getProduct().equals(this)) {
						this.ProductOptions.add(item);
					}
				}
				this.ProductOptions.setLoaded(true);
				return this.ProductOptions;
			}

			Query2 q = Query2.select(infinity.stone.product.schema.ProductOption.tableName);
			q.innerJoin(infinity.stone.product.schema.Product.tableName,
					infinity.stone.product.schema.ProductOption.ProductId, infinity.stone.product.schema.Product.Id);
			q.whereClause(
					QueryOperation2.equal(infinity.stone.product.schema.Product.Id, FieldValue2.sqlBinary(getId())));
			q.addFields(new infinity.stone.product.schema.ProductOption().getAllFields());
			q.addFields(new infinity.stone.product.schema.Product().getAllFields());
			ProductOption2[] res = ObjectLoader.loadObjects(ProductOption2.class, q);
			this.ProductOptions.addAll(Arrays.asList(res));
			this.ProductOptions.setLoaded(true);
		}

		return this.ProductOptions;
	}

	public DomainObjectCollection<ProductSKU2> getProductSKUs() {
		if (!isPersisted()) {
			this.ProductSKUs.setLoaded(true);
			return this.ProductSKUs;
		}

		if (!this.ProductSKUs.isLoaded()) {

			ProductSKU2[] ProductSKUs = retreiveData(ProductSKU2.class);
			if (ProductSKUs != null) {

				for (ProductSKU2 item : ProductSKUs) {
					if (item.getProduct().equals(this)) {
						this.ProductSKUs.add(item);
					}
				}
				this.ProductSKUs.setLoaded(true);
				return this.ProductSKUs;
			}

			Query2 q = Query2.select(infinity.stone.product.schema.ProductSKU.tableName);
			q.innerJoin(infinity.stone.product.schema.Product.tableName,
					infinity.stone.product.schema.ProductSKU.ProductId, infinity.stone.product.schema.Product.Id);
			q.whereClause(
					QueryOperation2.equal(infinity.stone.product.schema.Product.Id, FieldValue2.sqlBinary(getId())));
			q.addFields(new infinity.stone.product.schema.ProductSKU().getAllFields());
			q.addFields(new infinity.stone.product.schema.Product().getAllFields());
			ProductSKU2[] res = ObjectLoader.loadObjects(ProductSKU2.class, q);
			this.ProductSKUs.addAll(Arrays.asList(res));
			this.ProductSKUs.setLoaded(true);
		}

		return this.ProductSKUs;
	}

	public UUID getId() {
		return Id;
	}

	public void setId(UUID id) {
		Id = id;
		propertyChangeListener(infinity.stone.product.schema.Product.Id.getFieldName(), id);
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
		setSlug();
		propertyChangeListener(infinity.stone.product.schema.Product.Name.getFieldName(), name);
	}

	public String getSlug() {
		return Slug;
	}

	private void setSlug() {
		setSlug(new Slugify().slugify(this.Name));
	}

	private void setSlug(String slug) {
		Slug = slug;
		propertyChangeListener(infinity.stone.product.schema.Product.Slug.getFieldName(), slug);
	}

	public String getCommonName() {
		return CommonName;
	}

	public void setCommonName(String commonName) {
		CommonName = commonName;
		propertyChangeListener(infinity.stone.product.schema.Product.CommonName.getFieldName(), commonName);
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
		propertyChangeListener(infinity.stone.product.schema.Product.Description.getFieldName(), description);
	}

	public OrderedMultiValueText getLocationTags() {
		return LocationTags;
	}

	public void setLocationTags(OrderedMultiValueText locationTags) {
		LocationTags = locationTags;
		propertyChangeListener(infinity.stone.product.schema.Product.LocationTags.getFieldName(), locationTags);
	}

	public OrderedMultiValueText getTags() {
		return Tags;
	}

	public void setTags(OrderedMultiValueText tags) {
		Tags = tags;
		propertyChangeListener(infinity.stone.product.schema.Product.Tags.getFieldName(), tags);
	}

	public Category2 getCategory() {
		if (CategoryIdInternal == null) {
			return null;
		}

		if (this.Category != null) {
			return this.Category;
		}

		this.Category = Category2.getPersistedObject(super.getData(), CategoryIdInternal);

		if (this.Category == null) {
			this.Category = ObjectLoader.loadObject(Category2.class, CategoryIdInternal);
		}

		return this.Category;
	}

	public void setCategory(Category2 category) {
		CategoryIdInternal = category != null ? category.getId() : null;
		propertyChangeListener(infinity.stone.product.schema.Product.CategoryId.getFieldName(), CategoryIdInternal);
		Category = category;
	}

	public Seller getSeller() {
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

	public void setSeller(Seller seller) {
		sellerIdInternal = seller != null ? seller.getId() : null;
		propertyChangeListener(infinity.stone.product.schema.Product.SellerId.getFieldName(), sellerIdInternal);
		Seller = seller;
	}

	public ProductStatus getStatus() {
		return Status;
	}

	public void setStatus(ProductStatus status) {
		propertyChangeListener(infinity.stone.product.schema.Product.Status.getFieldName(),
				status != null ? status.getCode() : null);
		Status = status;
	}

	public String getStatusRemark() {
		return StatusRemark;
	}

	public void setStatusRemark(String statusRemark) {
		propertyChangeListener(infinity.stone.product.schema.Product.StatusRemark.getFieldName(), statusRemark);
		StatusRemark = statusRemark;
	}

	public Boolean getEnabled() {
		return Enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.Enabled = enabled;
		propertyChangeListener(infinity.stone.product.schema.Product.Enabled.getFieldName(), enabled);
	}

	public String getKeyValues() {
		return KeyValues != null ? KeyValues.getJsonString() : null;
	}

	public void setKeyValues(JsonObject keyValues) {
		KeyValues = keyValues;
		propertyChangeListener(infinity.stone.product.schema.Product.KeyValues.getFieldName(), keyValues);
	}

	private void ensureUniqueSlug() {

		String slug = Slug;
		Query2 q = Query2.select(infinity.stone.product.schema.Product.tableName);
		q.whereClause(QueryOperation2.equal(infinity.stone.product.schema.Product.Slug, FieldValue2.sqlString(slug)));
		q.whereAndClause(QueryOperation2.notEqual(infinity.stone.product.schema.Product.Id, FieldValue2.sqlBinary(this.Id)));
		q.addField(infinity.stone.product.schema.Product.Id);
		List<HashMap<String, Field2>> res = q.executeQuery();
		if (res.size() == 0)
			return;

		Seller sellerDetails = getSeller();

		slug = slug + new Slugify().slugify("-by " + sellerDetails.getStoreName());
		Query2 q2 = Query2.select(infinity.stone.product.schema.Product.tableName);
		q2.whereClause(QueryOperation2.equal(infinity.stone.product.schema.Product.Slug, FieldValue2.sqlString(slug)));
		q2.whereAndClause(QueryOperation2.notEqual(infinity.stone.product.schema.Product.Id, FieldValue2.sqlBinary(this.Id)));
		q2.addField(infinity.stone.product.schema.Product.Id);
		List<HashMap<String, Field2>> res2 = q2.executeQuery();

		if (res2.size() == 0) {
			setSlug(slug);
			return;
		}

		Category2 categoryDetails = this.getCategory();

		slug += new Slugify().slugify("-in " + categoryDetails.getName());
		Query2 q3 = Query2.select(infinity.stone.product.schema.Product.tableName);
		q3.whereClause(QueryOperation2.equal(infinity.stone.product.schema.Product.Slug, FieldValue2.sqlString(slug)));
		q3.whereClause(QueryOperation2.equal(infinity.stone.product.schema.Product.Id, FieldValue2.sqlBinary(this.Id)));
		q3.addField(infinity.stone.product.schema.Product.Id);
		List<HashMap<String, Field2>> res3 = q3.executeQuery();

		if (res3.size() == 0) {
			setSlug(slug);
			return;
		}

		throw new ValidationException("Product Name is not unique across category");

	}

	private void saveInternal() {
		ensureUniqueSlug();
		Connection connection = schema.connection.SqlConnection.getOrCreateNewConnection();
		try {
			boolean wasAutoCommitFlagSet = connection.getAutoCommit();
			connection.setAutoCommit(false);
			super.save(this);

			this.ProductOptions.saveAll();
			this.ProductSKUs.saveAll();

			if (wasAutoCommitFlagSet) {
				connection.commit();
				setPersisted(true);
				for (ProductOption2 productOption : this.ProductOptions) {
					productOption.setPersisted(true);
				}
				for (ProductSKU2 productSKU : this.ProductSKUs) {
					productSKU.setPersisted(true);
				}
				this.ProductSKUs.setDirty(false);
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
			this.getProductSKUs().deleteAll();
			this.getProductOptions().deleteAll();
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

	@Override
	public int hashCode() {
		return this.Id.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null || obj.getClass() != this.getClass())
			return false;

		Product2 product = (Product2) obj;

		return product.Id.equals(this.Id);
	}

	public static Product2 getPersistedObject(List<HashMap<String, Field2>> queryResult, Object id) {
		Product2 product = null;

		for (HashMap<String, Field2> row : queryResult) {
			Collection<Field2> queryResultFields = row.values();
			Field2 idField = findField(queryResultFields, Product.Id);

			if (idField.getUUID() != null && idField.getUUID().equals(id)) {
				product = new Product2();
				product.Id = (UUID) id;
				product.Name = findField(queryResultFields, Product.Name).getString();
				product.Slug = findField(queryResultFields, Product.Slug).getString();
				product.CommonName = findField(queryResultFields, Product.CommonName).getString();
				product.Description = findField(queryResultFields, Product.Description).getString();
				product.LocationTags = new OrderedMultiValueText(
						findField(queryResultFields, Product.LocationTags).getString());
				product.Tags = new OrderedMultiValueText(findField(queryResultFields, Product.Tags).getString());
				product.CategoryIdInternal = findField(queryResultFields, Product.CategoryId).getInteger();
				product.sellerIdInternal = findField(queryResultFields, Product.SellerId).getUUID();
				product.Status = ProductStatus.get(findField(queryResultFields, Product.Status).getInteger());
				product.StatusRemark = findField(queryResultFields, Product.StatusRemark).getString();
				product.Enabled = findField(queryResultFields, Product.Enabled).getBool();
				product.KeyValues = new JsonObject(findField(queryResultFields, Product.KeyValues).getJson());

				product.setPersisted(true);
				product.setData(queryResult);

				return product;
			}
		}

		return product;
	}

	public static Product2 getPersistedObject(HashMap<String, Field2> queryResult) {
		Product2 product = null;

		Collection<Field2> queryResultFields = queryResult.values();
		Field2 idField = findField(queryResultFields, Product.Id);

		if (idField.getUUID() != null) {
			product = new Product2();
			product.Id = idField.getUUID();
			product.Name = findField(queryResultFields, Product.Name).getString();
			product.Slug = findField(queryResultFields, Product.Slug).getString();
			product.CommonName = findField(queryResultFields, Product.CommonName).getString();
			product.Description = findField(queryResultFields, Product.Description).getString();
			product.LocationTags = new OrderedMultiValueText(
					findField(queryResultFields, Product.LocationTags).getString());
			product.Tags = new OrderedMultiValueText(findField(queryResultFields, Product.Tags).getString());
			product.CategoryIdInternal = findField(queryResultFields, Product.CategoryId).getInteger();
			product.sellerIdInternal = findField(queryResultFields, Product.SellerId).getUUID();
			product.Status = ProductStatus.get(findField(queryResultFields, Product.Status).getInteger());
			product.StatusRemark = findField(queryResultFields, Product.StatusRemark).getString();
			product.Enabled = findField(queryResultFields, Product.Enabled).getBool();
			product.KeyValues = new JsonObject(findField(queryResultFields, Product.KeyValues).getJson());

			product.setPersisted(true);
			product.setData(new ArrayList<HashMap<String, Field2>>(Arrays.asList(queryResult)));

			return product;
		}

		return product;
	}

}
