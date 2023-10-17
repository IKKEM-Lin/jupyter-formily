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
    },
    "style": {
      "type": "string",
      "title": "style",
      "x-decorator": "FormItem",
      "x-component": "Radio.Group",
      "enum": [
        {
          "children": [],
          "label": "metal",
          "value": "metal"
        },
        {
          "children": [],
          "label": "liqud",
          "value": "liqud"
        },
        {
          "children": [],
          "label": "gas",
          "value": "gas"
        }
      ],
      "x-validator": [],
      "x-component-props": {},
      "x-decorator-props": {},
      "name": "style",
      "x-designable-id": "8j01zxpbhn3",
      "x-index": 1
    }
  }
}

class Formily(anywidget.AnyWidget):
    _esm = ESM
    _css = CSS
    schema = traitlets.Dict({}).tag(sync=True)
    value = traitlets.Dict({}).tag(sync=True)
    # label = traitlets.Unicode("").tag(sync=True)

    def __init__(self, schema = default_schema):
        super(Formily, self).__init__()
        # self.label = label
        self.value = {"default": 1}
        self.schema = schema
