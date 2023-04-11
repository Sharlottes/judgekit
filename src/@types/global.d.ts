type Langs = "en" | "ko";
interface BundleData {
  global: Record<"error" | "warn" | "info", string> & {
    pathfinder: Record<
      "path_notfound",
      "rootpath_choice",
      "select_path",
      string
    >;
  };
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

type ValueOf<T> = T[keyof T];
