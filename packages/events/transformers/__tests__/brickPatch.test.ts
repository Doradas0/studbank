 import { TransformOperation, transform } from "../brickPatch";
import { pathExists } from "../brickPatch";

describe("pathExists", () => {
  const data = { name: "john", address: { street: "new street", number: 12 } };
  it("should return true if path exists on shallow path", () => {
    expect(pathExists(data, "/name")).toBe(true);
  });
  it("should return false if path doesn't exist on shallow path", () => {
    expect(pathExists(data, "/lastName")).toBe(false);
  });
  it("should return true if path exists on deep path", () => {
    expect(pathExists(data, "/address/street")).toBe(true);
  });
  it("should return false if path doesn't exist on deep path", () => {
    expect(pathExists(data, "/address/city")).toBe(false); });
});


describe("brickPatch", () => {
  it("should transform a flat object", () => {
    const data = {
      name: "John",
      lastName: "Doe",
      pet: "dog",
      age: 30,
    };
    const patch: TransformOperation[] = [
      { op: "replace", path: "/name", value: "Jane" },
      { op: "move", from: "/lastName", path: "/surname" },
      { op: "remove", path: "/pet" },
      { op: "copy", from: "/age", path: "/years" },
      { op: "add", path: "/city", value: "Amsterdam" },
    ];

    expect(transform(data, patch)).toEqual({
      name: "Jane",
      surname: "Doe",
      age: 30,
      years: 30,
      city: "Amsterdam",
    });
  });

  it("should transform a nested object", () => {
    const data = {
      name: "John",
      lastName: "Doe",
      age: 30,
      address: {
        street: "Main Street",
        number: 10,
        city: "Amsterdam",
      },
    };
    const patch: TransformOperation[] = [
      { op: "replace", path: "/name", value: "Jane" },
      { op: "move", from: "/lastName", path: "/surname" },
      { op: "remove", path: "/address/city" },
      { op: "copy", from: "/age", path: "/years" },
    ];

    expect(transform(data, patch)).toEqual({
      name: "Jane",
      surname: "Doe",
      age: 30,
      years: 30,
      address: {
        street: "Main Street",
        number: 10,
      },
    });
  });

  it("should transform an optional flat object", () => {
    const data = {
      name: "John",
      lastName: "Doe",
      pet: "dog",
    };

    const patch: TransformOperation[] = [
      { op: "replace", path: "/name", value: "Jane" },
      { op: "move", from: "/lastName", path: "/surname" },
      { op: "remove", path: "/pet" },
      //missing age
      { op: "copy", from: "/age", path: "/years" },
      { op: "add", path: "/city", value: "Amsterdam" },
    ];

    expect(transform(data, patch)).toEqual({
      name: "Jane",
      surname: "Doe",
      city: "Amsterdam",
    });
  });

  it("should transform an optional nested object", () => {
    const data = {
      name: "John",
      lastName: "Doe",
      address: {
        street: "Main Street",
        number: 10,
        city: "Amsterdam",
      },
      order: {
        id: "123",
        item: "shoes"
      }
    };
    const patch: TransformOperation[] = [
      { op: "replace", path: "/name", value: "Jane" },
      { op: "move", from: "/lastName", path: "/surname" },
      { op: "remove", path: "/address/city" },
      //missing age
      { op: "copy", from: "/age", path: "/years" },
      //missing country
      { op: "remove", path: "/address/country" },
      //missing price
      { op: "remove", path: "/order/price" },
    ];

    expect(transform(data, patch)).toEqual({
      name: "Jane",
      surname: "Doe",
      address: {
        street: "Main Street",
        number: 10,
      },
      order: {
        id: "123",
        item: "shoes"
      }
    });
  });
});
