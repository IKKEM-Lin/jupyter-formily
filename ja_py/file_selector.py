import pathlib
import anywidget
import traitlets
import os


DIR_PATH = os.path.dirname(os.path.realpath(__file__))

ESM = os.path.join(os.path.abspath(os.path.join(DIR_PATH, "..")), "ja-fe/dist/FileSelector.js")
CSS = os.path.join(os.path.abspath(os.path.join(DIR_PATH, "..")), "ja-fe/dist/style.js")

class FileSelector(anywidget.AnyWidget):
    _esm = ESM
    _css = CSS
    value = traitlets.Unicode("").tag(sync=True)
    label = traitlets.Unicode("").tag(sync=True)
    os_sep= traitlets.Unicode(os.sep).tag(sync=True)
    pwd = traitlets.Unicode("").tag(sync=True)
    files = traitlets.List([]).tag(sync=True)
    msg = traitlets.Dict({"content": ""}).tag(sync=True)
    dir_select = traitlets.Bool(False).tag(sync=True)

    # os.getcwd()

    def __init__(self, label="", default_value= "", dir_select = False):
        super(FileSelector, self).__init__()
        self.label = label
        self.dir_select = dir_select
        self.value = default_value
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