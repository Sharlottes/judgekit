type Langs = "en" | "ko";
interface BundleData {
  global: Record<"error" | "warn" | "info", string>;
  commands: {
    test: Record<
      | "title"
      | "testcase_found"
      | "testcase_continue"
      | "test_continue"
      | "error_script_notfound",
      string
    >;
    generate: {
      template_reading: Record<"processing" | "done" | "error", string>;
      overwrite_confirm: Record<"exist" | "confirm", string>;
      script_creating: Record<"processing" | "done", string>;
      quick_test_info: string;
    };
  };
}
