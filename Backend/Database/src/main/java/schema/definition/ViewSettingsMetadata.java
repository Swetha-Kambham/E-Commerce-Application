package schema.definition;

import schema.annotation.Column;
import schema.annotation.ForeignKey;
import schema.annotation.NotNull;
import schema.annotation.PrimaryKey;
import schema.annotation.Table;
import schema.annotation.Unique;
import schema.column.types.Binary;
import schema.column.types.Varchar;
import schema.enums.CascadeOptions;
import schema.column.types.Int;

@Table
public class ViewSettingsMetadata extends MetadataDefault {

	@Column(size = 16)
	@PrimaryKey(name = "PK_ID")
	public Binary Id;

	@Column(size = 16)
	@NotNull
	@Unique(groupIndex = 1)
	@ForeignKey(name = "FK_VIEWSETTINGSMETADATA_VIEWSETTINGS", referenceTable = "ViewSettings", referenceField = "Id", onDelete = CascadeOptions.CASCADE, onUpdate = CascadeOptions.RESTRICT)
	public Binary ViewSettingId;

	@Column(size = 255)
	@NotNull
	@Unique(groupIndex = 1)
	public Varchar Key;

	@Column
	@NotNull
	@Unique(groupIndex = 1)
	public Int Index;

}
