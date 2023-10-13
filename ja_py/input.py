import pathlib
import anywidget
import traitlets


ESM = pathlib.Path("./ja-fe/dist/Input.js")
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
