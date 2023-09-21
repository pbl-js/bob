package object_builder

type FieldType string

const (
	FieldTypeString  FieldType = "string"
	FieldTypeNumber  FieldType = "number"
	FieldTypeBoolean FieldType = "boolean"
	FieldTypeObject  FieldType = "object"
)

type StringField struct {
	name         string
	value        string
	DefaultValue string
}

func (s StringField) Status() FieldType { return FieldTypeString }

type NumberField struct {
	name         string
	value        int64
	DefaultValue int64
}

func (s NumberField) Status() FieldType { return FieldTypeNumber }

type BooleanField struct {
	name         string
	value        bool
	DefaultValue bool
}

func (s BooleanField) Status() FieldType { return FieldTypeBoolean }

type ObjectField struct {
	name         string
	value        Field
	DefaultValue Field
}

func (s ObjectField) Status() FieldType { return FieldTypeObject }

type Field interface {
	GetFieldType() FieldType
	New() *Field
}

type DataDocument struct {
	name        string
	description string
	fields      Field
}

// func (s DataBox) New() *DataBox { return *DataBox{name: "ds", description: "", fields: *Field{} }
