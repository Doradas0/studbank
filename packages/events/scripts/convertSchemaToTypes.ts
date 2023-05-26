import { compileFromFile } from "json-schema-to-typescript";
import { writeFileSync } from "fs";
import path from "path";

const main = async () => {
  console.log("Generating typescript types from json schema");
  const ts = await compileFromFile(
    path.resolve(__dirname, "../schemas/Lego_Pay_Request.json"), {
      additionalProperties: false,
    }
  )
  writeFileSync(path.resolve(__dirname, "../types/Lego_Pay_Request.d.ts"), ts);
  console.log("Done");
}

main();

