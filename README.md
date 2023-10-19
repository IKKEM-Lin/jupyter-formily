# Jupyter Components

This project is custom widgets for Jupyter notebook, which is constructed base on [anywidget](https://github.com/manzt/anywidget). The supported widgets as following:
|  Widget   | Base On  | Params  |
|  ----  | ----  | ----  |
| Button  | [Antd Button](https://ant-design.antgroup.com/components/button) | ```{label: string; on_click: function; props: dict}``` |
| FileSelector  |  | ```{label: string; default_value: string; dir_select: bool}``` |
| Formily  | [formily](https://github.com/alibaba/formily) | ```{schema: Dict;  show_modal: bool}``` |
| Input  | [Antd Input](https://ant-design.antgroup.com/components/input) | ```{label: string; props: dict}``` |
| Radio  | [Antd Radio](https://ant-design.antgroup.com/components/radio) | ```{label: string; options: list; default_value: string; props: dict}``` |
| Select  | [Antd Select](https://ant-design.antgroup.com/components/select) | ```{label: string; options: list; default_value: string; props: dict}``` |

For ```Formily``` widget, you can design schema by https://designable-antd.formilyjs.org/. In addition, we create a custom file selector, which can be use with 
```json
{
    ...
    "x-component": "FileSelectorForFormily"
    ...
}
```
Check ```demo.ipynb``` for more information.


## How to install dependencies

You need to install dependencies both python and javascript. Please make sure you have installed [poetry](https://github.com/python-poetry/poetry) and [yarn](https://github.com/yarnpkg/yarn).
``` shell
# python 
poetry install

# javascript
cd vendor && yarn install
```

## How to build

``` shell
./build.sh
```

## How to create a new widget
Please follow steps below if you need to create a new widget.
1. Add a [component_name]().tsx file to ```vendor/src/component/```. The [component_name]() should start with A to Z, so it can be read as component.

``` tsx
// Example.tsx
import React from "react";
import { useModelState } from "@anywidget/react";

const Example: React.FC = () => {
  const [variableA, setVariableA] = useModelState("variable_a");
  return (
    <div>This is Example. {variableA}</div>
  );
};

export default Example;

```

2. Add a [widget_name]().py file to ```jupyter_formily/```.
```python
# example.py
import anywidget
import traitlets
import os
from ._contant import PARENT_DIR_PATH

ESM = os.path.join(PARENT_DIR_PATH, "vendor/formily/Example.js")
CSS = ""

class Example(anywidget.AnyWidget):
    _esm = ESM
    _css = CSS
    variable_a = traitlets.Unicode("").tag(sync=True)

    def __init__(self, variable_a=""):
        super(Example, self).__init__()
        self.variable_a = variable_a
```

3. Run ``` npm run dev component_name ``` to build new component. Then you can start developing in jupyter notebook.
``` python
# notebook cell

from jupyter_formily.example import Example

widget = Example("variable_a")
display(widget)
```

4. For more information, please refer:
  - [@anywidget/react](https://github.com/manzt/anywidget/tree/main/packages/react)