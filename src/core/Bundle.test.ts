import Bundle from "./Bundle";

describe("test Bundle core", () => {
  const standardBundle = Bundle.readBundlefile("en");
  for (const lang of Bundle.langs.slice(1)) {
    describe(`finding undefined property in ${lang} bundle`, () => {
      const data = findUndefinedInBundle(Bundle.readBundlefile(lang));
      for (const { key, status } of data) {
        test(`${key} in ${lang} should be not undefined`, () =>
          expect(status).toBe(true));
      }
    });
  }

  function findUndefinedInBundle(object: object) {
    const data: Array<{ key: string; status: boolean }> = [];
    validateObject(object, standardBundle);

    function validateObject(
      object: Record<string, any>,
      standard: Record<string, any>
    ) {
      for (const key of Object.keys(standard)) {
        const value = object[key];
        switch (typeof value) {
          case "undefined":
            data.push({ key, status: false });
            break;
          case "string":
            data.push({ key, status: true });
            break;
          case "object":
            value === null
              ? data.push({ key, status: false })
              : validateObject(value, standardBundle[key as keyof BundleData]);
            break;
        }
      }
    }

    return data;
  }
});
