import { applyPatch, Operation } from "json-joy/es6/json-patch";

type PathString = "/";
type Path = `${PathString}${string}`;

export type TransformOperation = Operation & {
  path?: Path;
  from?: Path;
};

export const transform = (data: object, patch: TransformOperation[]) => {
  const transformation = patch.filter((operation) => {
    if (operation.op === "replace" || operation.op === "remove") {
      return pathExists(data, operation.path);
    }
    if (operation.op === "move" || operation.op === "copy") {
      return pathExists(data, operation.from);
    }
    return true;
  });
  return applyPatch(data, transformation, { mutate: false }).doc;
};

export const pathExists = (data: object, path: string): boolean => {
  // Split the path into keys, ignoring the first empty string
  const keys = path.split("/").slice(1);

  // Initialize the object we'll use for checking
  let obj: any = data;

  // Iterate over keys
  for (const key of keys) {
    // If the key exists in the object, continue to the next key
    if (key in obj) {
      obj = obj[key];
    } else {
      // If the key doesn't exist, return false
      return false;
    }
  }

  // If all keys exist, return true
  return true;
};
