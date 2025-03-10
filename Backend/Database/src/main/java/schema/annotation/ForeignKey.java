package schema.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import schema.enums.CascadeOptions;


@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface ForeignKey {
	
	public String name() default "";

	public String referenceTable();
	
	public String referenceField();
	
	public CascadeOptions onUpdate() default CascadeOptions.NO_ACTION;
	
	public CascadeOptions onDelete() default CascadeOptions.NO_ACTION;
	
}
