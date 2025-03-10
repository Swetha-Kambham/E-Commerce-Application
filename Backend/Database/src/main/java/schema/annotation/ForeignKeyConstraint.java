package schema.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import schema.enums.CascadeOptions;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Deprecated
public @interface ForeignKeyConstraint {

	public String column();

	public String referenceTable();

	public String referenceField();

	public CascadeOptions onUpdate() default CascadeOptions.NO_ACTION;

	public CascadeOptions onDelete() default CascadeOptions.NO_ACTION;

}
