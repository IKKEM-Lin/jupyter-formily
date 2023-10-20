# jupyter-formily

This project integrates [formily](https://github.com/alibaba/formily) to jupyter notebook, which base on [anywidget](https://github.com/manzt/anywidget).

## Usage

You can create a form as follow:

```python
from jupyter_formily import Formily

example = Formily(schema, options)
display(example)
```

### schema

For `schema` variable, you can design in https://designable-antd.formilyjs.org/. In addition, we create a custom file picker, which can be use with

```json
{
  "type": "object",
  "properties": {
    ...
    "file_pick_example": {
      "type": "string",
      "title": "Example",
      "x-decorator": "FormItem",
      "x-component": "FilePicker",
      "x-validator": [],
      "x-component-props": {"init_path": "C:\\Users"},
      "x-decorator-props": {},
      "name": "file_pick_example",
      "x-designable-id": "8j01zeibhn3",
      "x-index": 1
    },
    ...
  }
}
```

**Custom file picker props:**

| x-component-props | Type                                                                 | Default value |
| ----------------- | -------------------------------------------------------------------- | ------------- |
| select_type       | 'folder' \| 'file' \| 'both'                                         | 'both'        |
| init_path         | string \| undefined                                                  | undefined     |
| input_props       | [InputProps](https://ant-design.antgroup.com/components/input#input) | {}            |


### options

`options` is dict, and key as follow:

| key          | Type                                                                                                                    | Default value |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------- |
| show_modal   | bool                                                                                                                    | True          |
| ok_label     | string                                                                                                                  | "Update"      |
| cancel_label | string                                                                                                                  | "Cancel"      |
| ok_props     | [ISubmitProps](https://ant-design.antgroup.com/components/button#api)                                                   | {}            |
| cancel_props | [ButtonProps](https://ant-design.antgroup.com/components/button#api)                                                    | {}            |
| form_props   | [IFormLayoutProps](https://github.com/alibaba/formily/blob/formily_next/packages/antd/src/form-layout/index.tsx#L6-L38) | {}            |
| modal_props  | [ModalProps](https://ant-design.antgroup.com/components/modal#api)                                                      | {}            |

Check `demo.ipynb` for more information.

## Development

### Install

You need to install dependencies both python and javascript. Please make sure you have installed [poetry](https://github.com/python-poetry/poetry) and [yarn](https://github.com/yarnpkg/yarn).

```shell
# python
poetry install

# javascript
cd vendor/formily && yarn install
```

### Dev

```shell
cd vendor/formily && npm run dev Formily
```

Then you can check widget in `demo.ipynb`.

### Build

```shell
./build.sh
```
