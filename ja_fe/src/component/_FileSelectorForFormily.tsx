import React, { useEffect, useState } from "react";
import { Modal, Button, Space, List, Row, Breadcrumb, message } from "antd";
import {
  FolderFilled,
  FolderOpenOutlined,
  FileOutlined,
  CloseCircleOutlined,
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

interface IFileSelectorForFormily extends IReactiveFieldProps<string> {
  label: string;
  dir_select: boolean;
}

const FileSelectorForFormily: React.FC<IFileSelectorForFormily> =
  observer((props) => {
    // console.log({props})
    const value = props?.value;
    const label = props?.label;
    const isDirSelect = props?.dir_select || false;
    const [osSep] = useModelState<string>("os_sep");
    const [msg, setMsg] = useModelState<IMsg>("msg");
    const [pwd, setPwd] = useModelState<string>("pwd");
    const [files] = useModelState<IFile[]>("files");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState<string>(value || "");

    useEffect(() => {
      try {
        msg?.content && message[msg.type || "warning"](msg.content);
        setTimeout(() => {
          setMsg({ content: "" });
        }, 0);
      } catch (e) {
        console.error(e);
      }
    }, [msg]);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
      props.onChange(selected);
    };

    const handleCancel = () => {
      setSelected(value || "");
      setIsModalOpen(false);
    };

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
      ...(isDirSelect
        ? files.filter((file) => file.isDir)
        : (files as IFile[])),
    ];

    const canSave = value !== selected;

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

    const title = label || (isDirSelect ? "Folder select" : "File select");

    return (
      <>
        <Space>
          <Button type="default" onClick={showModal}>
            {title}
          </Button>
          {value && (
            <div>
              <strong>Current {isDirSelect ? "folder" : "file"}: </strong>
              <i>{value}</i>
            </div>
          )}
          {value && (
            <Button
              icon={<CloseCircleOutlined />}
              size="small"
              shape="circle"
              type="text"
              onClick={() => {
                props.onChange("");
                setSelected("");
              }}
            />
          )}
        </Space>
        <Modal
          width="75vw"
          centered
          destroyOnClose
          styles={{
            body: { height: "60vh", maxHeight: "900px", overflow: "auto" },
          }}
          style={{ maxWidth: "800px" }}
          title={
            <div>
              {title}
              {pwdBreadcrumb}
            </div>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !canSave }}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <div style={{ textAlign: "left" }}>
                <strong>New select: </strong>
                {selected || "None"}
              </div>
              <CancelBtn />
              <OkBtn />
            </>
          )}
        >
          <Row>
            <List
              className="file-selector-list"
              itemLayout="horizontal"
              style={{ width: "100%" }}
              dataSource={dataSource}
              size="small"
              renderItem={(item, ind) => (
                <List.Item
                  className={
                    joinPath(pwd, item.name) === selected ? "file-selected" : ""
                  }
                  onClick={() => {
                    if (isDirSelect) {
                      setSelected(joinPath(pwd, item.name));
                    } else {
                      !item.isDir && setSelected(joinPath(pwd, item.name));
                    }
                  }}
                  onDoubleClick={() => {
                    if (ind === 0 && item.name === "..") {
                      const newPwd = pwdSplit
                        .slice(0, pwdSplit.length - 1)
                        .join(osSep);
                      setPwd(
                        newPwd.includes(osSep) ? newPwd : `${newPwd}${osSep}`
                      );
                      return;
                    }
                    if (item.isDir) {
                      setPwd(joinPath(pwd, item.name));
                    } else {
                      setSelected(joinPath(pwd, item.name));
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
          </Row>
        </Modal>
      </>
    );
  });

export default FileSelectorForFormily;
