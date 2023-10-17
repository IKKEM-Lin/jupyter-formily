import pathlib
import anywidget
import traitlets
import os

DIR_PATH = os.path.dirname(os.path.realpath(__file__))

ESM = os.path.join(os.path.abspath(os.path.join(DIR_PATH, "..")), "ja-fe/dist/Formily.js")
CSS = ""  # ("styles.css").read_text()


default_schema = {
  "type": "object",
  "properties": {
    "accuracy": {
      "type": "string",
      "title": "accuracy",
      "x-decorator": "FormItem",
      "x-component": "Radio.Group",
      "enum": [
        {
          "children": [],
          "label": "hight",
          "value": "hight"
        },
        {
          "children": [],
          "label": "medium",
          "value": "medium"
        },
        {
          "children": [],
          "label": "low",
          "value": "low"
        }
      ],
      "x-validator": [],
      "x-component-props": {},
      "x-decorator-props": {},
      "name": "accuracy",
      "x-designable-id": "ddrtibho837",
      "x-index": 0
    }
  }
}

class Formily(anywidget.AnyWidget):
    _esm = ESM
    _css = CSS
    schema = traitlets.Dict({}).tag(sync=True)
    value = traitlets.Dict({}).tag(sync=True)
    # label = traitlets.Unicode("").tag(sync=True)
    os_sep= traitlets.Unicode(os.sep).tag(sync=True)
    pwd = traitlets.Unicode("").tag(sync=True)
    files = traitlets.List([]).tag(sync=True)
    msg = traitlets.Dict({"content": ""}).tag(sync=True)

    def __init__(self, schema = default_schema):
        super(Formily, self).__init__()
        # self.label = label
        self.value = {"default": 1}
        self.schema = schema

        self.pwd = os.getcwd()
        self._get_files()
        self.observe(self._get_files, names='pwd')
    
    def _get_files(self, change = ""):
        path = self.pwd
        try:
            files = os.listdir(path)
        except PermissionError as e:
            self.msg = {"content": str(e), "type": "error"}
            self.pwd = os.path.dirname(self.pwd)
            return
        files = [{"name": file, "isDir":  os.path.isdir(os.path.join(path, file))} for file in files]
        files.sort(key=lambda item: item["isDir"], reverse=True)
        self.files = files
