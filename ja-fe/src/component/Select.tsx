import React from "react";
import { Select as AntdSelect, Space } from "antd";
import type { SelectProps } from "antd/lib/select";
import { useModelState } from "@anywidget/react";

const Select: React.FC = () => {
  const [value, setValue] = useModelState<string>("value");
  const [props] = useModelState<any>("props");
  const [label] = useModelState<string>("label");
  const [options] = useModelState<SelectProps["options"]>("options");
  return (
    <Space>
      {label && <div>{label}</div>}
      <AntdSelect {...props} options={options} value={value as string} onChange={(value) => setValue(value)}/>
    </Space>
  );
};

export default Select;
