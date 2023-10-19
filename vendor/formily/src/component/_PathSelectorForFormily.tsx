import React, { useEffect, useRef, useState } from "react";
import { Button, List, Breadcrumb, message, Popover, Input } from "antd";
import {
  FolderFilled,
  FolderOpenOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useModelState } from "@anywidget/react";
import "./FileSelector.css";
import { observer } from "@formily/react";

interface IFile {
  name: string;
  isDir?: boolean;
}

interface IMsg {
  content: string;
  type?: "info" | "success" | "error" | "warning";
}

// refer: https://github.com/alibaba/formily/blob/formily_next/packages/react/src/components/ReactiveField.tsx#L96-L102
interface IReactiveFieldProps<T> {
  disabled: boolean;
  readOnly: boolean;
  value?: T;
  onChange: (data: T) => void;
  onFocus: () => void;
  onBlur: () => void;
}

interface IPathSelectorForFormily extends IReactiveFieldProps<string> {
  label?: string;
  select_type?: "folder" | "file" | "both";
  init_path?: string;
}

const PathSelectorForFormily: React.FC<IPathSelectorForFormily> = observer(
  (props) => {
    // console.log({props})
    const value = props?.value;
    // const label = props?.label;
    const selectType = props?.select_type || "both";
    // const title =
    //   label || (selectType === "folder" ? "Folder select" : "File select");
    const [osSep] = useModelState<string>("os_sep");
    const [msg, setMsg] = useModelState<IMsg>("msg");
    const [pwd, setPwd] = useModelState<string>("pwd");
    const [files] = useModelState<IFile[]>("files");

    const divEl = useRef<HTMLDivElement>(null);
    const [popupContainer, setPopupContainer] = useState<HTMLDivElement>();
    const [popupOpen, setPopupOpen] = useState<boolean>(false);

    useEffect(() => {
      if (divEl.current) {
        setPopupContainer(divEl.current);
      }
    }, [divEl]);

    useEffect(() => {
      if (popupOpen && props.init_path) {
        setPwd(props.init_path);
      }
    }, [props.init_path, popupOpen]);

    useEffect(() => {
      try {
        if (!popupOpen) {
          return;
        }
        msg?.content && message[msg.type || "warning"](msg.content);
        setTimeout(() => {
          setMsg({ content: "" });
        }, 0);
      } catch (e) {
        console.error(e);
      }
    }, [msg]);

    const joinPath = (path: string, next: string) => {
      if (path.endsWith(osSep)) {
        return `${pwd}${next}`;
      }
      return `${pwd}${osSep}${next}`;
    };

    const pwdSplit = pwd.split(osSep);
    const firstDirBack: IFile[] =
      pwdSplit.length > 1 && pwdSplit[1] !== ""
        ? [{ name: "..", isDir: true }]
        : [];

    const dataSource = [
      ...firstDirBack,
      ...(selectType === "folder"
        ? files.filter((file) => file.isDir)
        : (files as IFile[])),
    ];

    const pwdBreadcrumb = (
      <Breadcrumb
        style={{ marginTop: "8px" }}
        separator=">"
        items={pwdSplit.map((item, ind) => ({
          title: (
            <Button
              type="link"
              size="small"
              onClick={() => {
                const newPwd = pwdSplit.slice(0, ind + 1).join(osSep);
                setPwd(newPwd.includes(osSep) ? newPwd : `${newPwd}${osSep}`);
              }}
            >
              {item || osSep}
            </Button>
          ),
        }))}
      />
    );

    const filesContent = (
      <div
        onClick={(evt) => evt.stopPropagation()}
        style={{ maxHeight: "50ch", overflowY: "auto", width: "100%" }}
      >
        {pwdBreadcrumb}
        <List
          className="file-selector-list"
          itemLayout="horizontal"
          style={{ width: "100%" }}
          dataSource={dataSource}
          size="small"
          renderItem={(item, ind) => (
            <List.Item
              className={
                joinPath(pwd, item.name) === value ? "file-selected" : ""
              }
              onClick={() => {
                if (ind === 0 && item.name === "..") {
                  return;
                }
                if (selectType !== "file") {
                  props.onChange(joinPath(pwd, item.name));
                } else {
                  !item.isDir && props.onChange(joinPath(pwd, item.name));
                }
              }}
              onDoubleClick={() => {
                if (ind === 0 && item.name === "..") {
                  const newPwd = pwdSplit
                    .slice(0, pwdSplit.length - 1)
                    .join(osSep);
                  setPwd(newPwd.includes(osSep) ? newPwd : `${newPwd}${osSep}`);
                  return;
                }
                if (item.isDir) {
                  setPwd(joinPath(pwd, item.name));
                } else {
                  props.onChange(joinPath(pwd, item.name));
                }
              }}
            >
              <List.Item.Meta
                avatar={
                  item.isDir ? (
                    item.name === ".." && ind === 0 ? (
                      <FolderOpenOutlined />
                    ) : (
                      <FolderFilled />
                    )
                  ) : (
                    <FileOutlined />
                  )
                }
                title={item.name}
              />
            </List.Item>
          )}
        />
      </div>
    );

    return (
      <div ref={divEl}>
        {popupContainer && (
          <Popover
            onOpenChange={(open) => setPopupOpen(open)}
            destroyTooltipOnHide
            placement="bottom"
            rootClassName="path-selector-popover"
            getPopupContainer={() => popupContainer}
            content={filesContent}
            title=""
            trigger="click"
          >
            <Input
              value={value}
              suffix={<FolderOpenOutlined />}
              onChange={(evt) => props.onChange(evt.target.value)}
            />
          </Popover>
        )}
      </div>
    );
  }
);

export default PathSelectorForFormily;
