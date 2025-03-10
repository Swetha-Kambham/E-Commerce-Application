package infinity.stone.object.helper;

import java.lang.reflect.Array;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import infinity.stone.domain.base.DomainBase;
import infinity.stone.domain.base.DomainObject;
import infinity.stone.domain.exception.ResourceNotFoundException;
import infinity.stone.schema.base.SchemaBase;
import infinity.stone.sql.helper.Field2;
import infinity.stone.sql.helper.FieldValue2;
import infinity.stone.sql.helper.Query2;
import infinity.stone.sql.helper.QueryOperation2;

public class ObjectLoader {

	public static SchemaBase getDomainSchemaMapperObject(Class<? extends DomainBase> cls) {
		try {
			if (cls.isAnnotationPresent(DomainObject.class)) {
				Class<? extends SchemaBase> c = cls.getAnnotation(DomainObject.class).schemaType();
				return c.getConstructor().newInstance();
			}
		} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException | InstantiationException
				| NoSuchMethodException | SecurityException e) {
			e.printStackTrace();
			return null;
		}
		return null;
	}

	// with id

	public static <T extends DomainBase> T loadObject(Class<T> type, Integer id) {
		SchemaBase domainSchemaMapper = getDomainSchemaMapperObject(type);
		Field2 idField = domainSchemaMapper.getPrimaryKeyField();
		FieldValue2 idFieldValue = domainSchemaMapper.getPrimaryKeyFieldValue(id);
		String tableName = domainSchemaMapper.getTableName();
		Query2 q = Query2.select(tableName);

		q.whereClause(QueryOperation2.equal(idField, idFieldValue));

		Field2[] queryFields = domainSchemaMapper.getAllFields();

		for (Field2 f : queryFields)
			q.addField(f);

		List<HashMap<String, Field2>> res = q.executeQuery();

		if (res.size() != 1)
			throw new ResourceNotFoundException("Resource not found");

		return type.cast(domainSchemaMapper.mapSchemaFieldsToObject(res, id));
	}

	public static <T extends DomainBase> T loadObject(Class<T> type, UUID id) {
		SchemaBase domainSchemaMapper = getDomainSchemaMapperObject(type);
		Field2 idField = domainSchemaMapper.getPrimaryKeyField();
		FieldValue2 idFieldValue = domainSchemaMapper.getPrimaryKeyFieldValue(id);
		String tableName = domainSchemaMapper.getTableName();
		Query2 q = Query2.select(tableName);

		q.whereClause(QueryOperation2.equal(idField, idFieldValue));

		Field2[] queryFields = domainSchemaMapper.getAllFields();

		for (Field2 f : queryFields)
			q.addField(f);

		List<HashMap<String, Field2>> res = q.executeQuery();

		if (res.size() != 1)
			throw new ResourceNotFoundException("Resource not found");

		return type.cast(domainSchemaMapper.mapSchemaFieldsToObject(res, id));
	}

	public static <T extends DomainBase> T loadObjectOrDefault(Class<T> type, UUID id) {
		SchemaBase domainSchemaMapper = getDomainSchemaMapperObject(type);
		Field2 idField = domainSchemaMapper.getPrimaryKeyField();
		FieldValue2 idFieldValue = domainSchemaMapper.getPrimaryKeyFieldValue(id);
		String tableName = domainSchemaMapper.getTableName();
		Query2 q = Query2.select(tableName);

		q.whereClause(QueryOperation2.equal(idField, idFieldValue));

		Field2[] queryFields = domainSchemaMapper.getAllFields();

		for (Field2 f : queryFields)
			q.addField(f);

		List<HashMap<String, Field2>> res = q.executeQuery();

		if (res.size() != 1)
			return null;

		return type.cast(domainSchemaMapper.mapSchemaFieldsToObject(res, id));
	}

	// with id end

	// with id and query

	public static <T extends DomainBase> T loadObject(Class<T> type, Integer id, Query2 q) {

		SchemaBase domainSchemaMapper = getDomainSchemaMapperObject(type);

		List<HashMap<String, Field2>> res = q.executeQuery();

		if (res.size() < 1)
			throw new ResourceNotFoundException("Resource not found");

		return type.cast(domainSchemaMapper.mapSchemaFieldsToObject(res, id));
	}

	public static <T extends DomainBase> T loadObject(Class<T> type, UUID id, Query2 q) {

		SchemaBase domainSchemaMapper = getDomainSchemaMapperObject(type);

		List<HashMap<String, Field2>> res = q.executeQuery();

		if (res.size() < 1)
			throw new ResourceNotFoundException("Resource not found");

		return type.cast(domainSchemaMapper.mapSchemaFieldsToObject(res, id));
	}

	// with id and query end

	// with id's

	@SuppressWarnings("unchecked")
	public static <T extends DomainBase> T[] loadObjects(Class<T> type, Integer[] ids) {
		if (ids.length == 0)
			return (T[]) Array.newInstance(type, 0);

		SchemaBase domainSchemaMapper = getDomainSchemaMapperObject(type);
		Field2 idField = domainSchemaMapper.getPrimaryKeyField();
		FieldValue2[] idFieldValues = new FieldValue2[ids.length];

		for (int i = 0; i < ids.length; i++)
			idFieldValues[i] = domainSchemaMapper.getPrimaryKeyFieldValue(ids[i]);

		String table = domainSchemaMapper.getTableName();
		Query2 q = Query2.select(table);

		q.whereClause(QueryOperation2.in(idField, idFieldValues));

		Field2[] queryFields = domainSchemaMapper.getAllFields();

		for (Field2 f : queryFields)
			q.addField(f);

		List<HashMap<String, Field2>> res = q.executeQuery();

		Set<T> objects = new HashSet<T>();

		for (Object id : ids) {
			T object = type.cast(domainSchemaMapper.mapSchemaFieldsToObject(res, id));

			if (object != null) {
				objects.add(object);
			}
		}

		return objects.toArray((T[]) Array.newInstance(type, res.size()));
	}

	@SuppressWarnings("unchecked")
	public static <T extends DomainBase> T[] loadObjects(Class<T> type, UUID[] ids) {
		if (ids.length == 0)
			return (T[]) Array.newInstance(type, 0);

		SchemaBase domainSchemaMapper = getDomainSchemaMapperObject(type);
		Field2 idField = domainSchemaMapper.getPrimaryKeyField();
		FieldValue2[] idFieldValues = new FieldValue2[ids.length];

		for (int i = 0; i < ids.length; i++)
			idFieldValues[i] = domainSchemaMapper.getPrimaryKeyFieldValue(ids[i]);

		String table = domainSchemaMapper.getTableName();
		Query2 q = Query2.select(table);

		q.whereClause(QueryOperation2.in(idField, idFieldValues));

		Field2[] queryFields = domainSchemaMapper.getAllFields();

		for (Field2 f : queryFields)
			q.addField(f);

		List<HashMap<String, Field2>> res = q.executeQuery();

		Set<T> objects = new HashSet<T>();

		for (Object id : ids) {
			T object = type.cast(domainSchemaMapper.mapSchemaFieldsToObject(res, id));

			if (object != null) {
				objects.add(object);
			}
		}

		return objects.toArray((T[]) Array.newInstance(type, res.size()));
	}

	// with id's end

	@SuppressWarnings("unchecked")
	public static <T extends DomainBase> T[] loadObjects(Class<T> type, Query2 q) {

		SchemaBase domainSchemaMapper = getDomainSchemaMapperObject(type);

		List<HashMap<String, Field2>> res = q.executeQuery();

		Set<T> objects = new HashSet<T>();

		for (int i = 0; i < res.size(); i++) {
			T object = type.cast(domainSchemaMapper.mapSchemaFieldsToObject(res.get(i)));

			if (object != null) {
				objects.add(object);
			}
		}

		return objects.toArray((T[]) Array.newInstance(type, res.size()));
	}

}
