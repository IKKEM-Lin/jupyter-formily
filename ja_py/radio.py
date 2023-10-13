import pathlib
import anywidget
import traitlets


ESM = pathlib.Path("./ja-fe/dist/Radio.js")
CSS = ""  # ("styles.css").read_text()


class Radio(anywidget.AnyWidget):
    _esm = ESM
    _css = CSS
    value = traitlets.Unicode("").tag(sync=True)
    label = traitlets.Unicode("").tag(sync=True)
    options = traitlets.List([]).tag(sync=True)
    props = traitlets.Dict({}).tag(sync=True)

    # props ref: https://ant.design/components/radio-cn#radiogroup
    def __init__(self, label="", options=[], default_value= "", props={}):
        super(Radio, self).__init__()
        self.label = label
        self.options = options
        self.value = default_value
        self.props = props
