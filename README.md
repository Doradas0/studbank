# StudBank

This project is a lightweight sandbox equivalant to the BrickBank project.
It is used to: 
 - Experiement with new patterns and technologies
 - Showcase agreed best practices
 - Onboard new engineers

Below are a list of resources to support this system, please refer to them for more information.

## Structure
 - `./packages` - deoployable resources

## Resources
 - [Events](packages/events/README.md) - Defines the events used in the project and provides patch functions for transforming events
 - [Rules] - TODO Defines the business rules to be applied within code logic
 - [Service-Pay](packages/service-pay/README.md) - Allows clients to make a Pay request

## Technical Information
### Packages Used
####Zod
Zod is a TypeScript-first schema declaration and validation library.

We use Zod to define an objects schema. The resulting Zod schema can then be used to run a parse() validation.
You can also infer a type from the schema for IDE type saftey and a json-schema for api models and documentation


