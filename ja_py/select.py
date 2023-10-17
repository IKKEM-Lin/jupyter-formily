import pathlib
import anywidget
import traitlets
import os

DIR_PATH = os.path.dirname(os.path.realpath(__file__))

ESM = os.path.join(os.path.abspath(os.path.join(DIR_PATH, "..")), "ja-fe/dist/Select.js")
CSS = ""  # ("styles.css").read_text()


class Select(anywidget.AnyWidget):
    _esm = ESM
    _css = CSS
    value = traitlets.Unicode("").tag(sync=True)
    label = traitlets.Unicode("").tag(sync=True)
    options = traitlets.List([]).tag(sync=True)
    props = traitlets.Dict({}).tag(sync=True)

    # props ref: https://ant.design/components/select-cn#api
    def __init__(self, label="", options=[], default_value= "", props={}):
        super(Select, self).__init__()
        self.label = label
        self.options = options
        self.value = default_value
        self.props = props
