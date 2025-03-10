package infinity.stone.domain.base;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import infinity.stone.schema.base.SchemaBase;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface DomainObject {
	public Class<? extends SchemaBase> schemaType();
}
