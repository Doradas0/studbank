# Pay service

Allows clients to make a Pay request
A pay request is anything where the intention to send funds to the LEGO Group. 
A pay request may or may not require additional requests such as Capture or ReAuth from either the client or internally

## Structure
- `/src` - service code and handlers
- `/src/__tests__` - unit tests
- `/stacks` - aws infrastructure code
- `/stacks/__tests__` - TODO infrastructure tests

Notes
Api get defined seperately from service TODO
The service attaches itself to the api TODO
