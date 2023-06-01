# Events Service

Defines all event structures and transformations to be used across the project

## Structure
- `/schemas` defines all events in various formats. Current formats include: `zod`, `typescript` `json-schema`
- `/transformers` defines all transformations to and from events

## Schemas
Zod defines both the schema and a validator for the schema.
The Zod object can be used to validate at runtime if an object matches the schema

A typescript type is infered from the schema
The type can be used in development to ensure data is handled correctly
For example you might use the type to specify what data a function requires

A json-schema is created at runtime from the zod schema
This schema is used for api model definitions and documentation generation

## Transformers
Transformers are used to conver between different event formats
Each transformer should validate the input and output data matches the schema
Transformers use json-patch to declare the transformations in a clear and readable way
