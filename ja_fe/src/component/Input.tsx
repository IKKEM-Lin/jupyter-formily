import React from "react";
import { Input as AntdInput, Space } from "antd";
import type { InputProps } from "antd/lib/input";
import { useModelState } from "@anywidget/react";

const Input: React.FC = () => {
  const [value, setValue] = useModelState<string>("value");
  const [props] = useModelState<InputProps>("props");
  const [label] = useModelState<string>("label");
  return (
    <Space>
      {label && <div>{label}</div>}
      <AntdInput {...props} value={value as string} onChange={(evt) => setValue(evt.target.value)}/>
    </Space>
  );
};

export default Input;
