import pathlib
import anywidget
import traitlets
import os

DIR_PATH = os.path.dirname(os.path.realpath(__file__))

ESM = os.path.join(os.path.abspath(os.path.join(DIR_PATH, "..")), "ja-fe/dist/Input.js")
CSS = ""  # ("styles.css").read_text()


class Input(anywidget.AnyWidget):
    _esm = ESM
    _css = CSS
    value = traitlets.Unicode("").tag(sync=True)
    label = traitlets.Unicode("").tag(sync=True)
    props = traitlets.Dict({}).tag(sync=True)

    # props ref: https://ant.design/components/input-cn#api
    def __init__(self, label="", props={}):
        super(Input, self).__init__()
        self.label = label
        self.props = props
