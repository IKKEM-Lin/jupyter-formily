import React, { useEffect, useState } from "react";
import { Modal, Button, Space, List, Row, Breadcrumb, message } from "antd";
// import type { RadioGroupProps } from "antd/lib/radio";
import {
  FolderFilled,
  FolderOpenOutlined,
  FileOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useModelState } from "@anywidget/react";
import "./FileSelector.css";

interface IFile {
  name: string;
  isDir?: boolean;
}

interface IMsg {
  content: string;
  type?: "info" | "success" | "error" | "warning";
}

const FileSelector: React.FC = () => {
  const [value, setValue] = useModelState<string>("value");
  const [isDirSelect] = useModelState<boolean>("dir_select");
  const [osSep] = useModelState<string>("os_sep");
  //   const [props] = useModelState<any>("props");
  const [label] = useModelState<string>("label");
  const [msg, setMsg] = useModelState<IMsg>("msg");
  const [pwd, setPwd] = useModelState<string>("pwd");
  const [files] = useModelState<IFile[]>("files");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string>(value);

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
    setValue(selected);
  };

  const handleCancel = () => {
    setSelected(value);
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
    ...(isDirSelect ? files.filter((file) => file.isDir) : (files as IFile[])),
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
        <Button type="primary" onClick={showModal}>
          {title}
        </Button>
        <div>
          Current {isDirSelect ? "folder" : "file"}: {value}
        </div>
        {value && (
          <Button
            icon={<CloseCircleOutlined />}
            size="small"
            onClick={() => {
              setValue("");
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
              <strong>New Select: </strong>
              {selected || "None"}
            </div>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Row>
          {/* <div>{pwd}</div> */}
          {/* <div>{selected}</div> */}
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
                  // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Row>
      </Modal>
    </>
  );
};

export default FileSelector;
