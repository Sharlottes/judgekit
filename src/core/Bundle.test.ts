import { Document, isMap } from "yaml";
import type { Pair, Scalar, YAMLMap } from "yaml";
import type { Collection } from "yaml/dist/nodes/Collection";
import Bundle from "./Bundle";
import chalk from "chalk";

describe("test Bundle core", () => {
  const standardBundle = new Document(Bundle.readBundlefile("en"));

  for (const lang of Bundle.langs.slice(1)) {
    describe(`checking property type equal in ${lang} bundle`, () => {
      const data = findUndefinedInBundle(
        new Document(Bundle.readBundlefile(lang)),
        standardBundle
      );
      for (const { key, status } of data) {
        test(`${chalk.cyan(
          key
        )} in ${lang} should same type as ${key} in en bundle`, () => {
          expect(status).toBeTruthy();
        });
      }
    });
  }
});

function findUndefinedInBundle(
  bundleDocument: Document,
  standardBundle: Document
) {
  const data: Array<{ key: string; status: boolean }> = [];
  if (!isMap<Scalar, Pair | Collection>(standardBundle.contents))
    throw new Error("standard bundle contents should be YAMLMap!");
  if (!isMap<Scalar, Pair | Collection>(bundleDocument.contents))
    throw new Error("bundle contents should be YAMLMap!");

  validateObject(bundleDocument.contents, standardBundle.contents);

  function validateObject(
    bundleMap: YAMLMap<Scalar, Pair | Collection>,
    standardBundleMap: YAMLMap<Scalar, Pair | Collection>
  ) {
    for (const { key, value: standardValue } of standardBundleMap.items) {
      const bundleValue = bundleMap.get(key.value);
      if (!bundleValue) {
        data.push({ key: String(key.value), status: false });
        continue;
      }

      if (isMap<Scalar, Pair | Collection>(standardValue)) {
        if (isMap<Scalar, Pair | Collection>(bundleValue))
          validateObject(bundleValue, standardValue);
        else data.push({ key: String(key.value), status: false });
      } else {
        data.push({ key: String(key.value), status: true });
      }
    }
  }

  return data;
}
