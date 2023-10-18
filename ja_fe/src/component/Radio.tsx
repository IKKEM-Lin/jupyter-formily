import React from "react";
import { Radio as AntdRadio, Space } from "antd";
import type { RadioGroupProps } from "antd/lib/radio";
import { useModelState } from "@anywidget/react";

const Radio: React.FC = () => {
  const [value, setValue] = useModelState<string>("value");
  const [props] = useModelState<RadioGroupProps>("props");
  const [label] = useModelState<string>("label");
  const [options] = useModelState<RadioGroupProps["options"]>("options");
  return (
    <Space>
      {label && <div>{label}</div>}
      <AntdRadio.Group {...props} options={options} value={value as string} onChange={(evt) => setValue(evt.target.value)}/>
    </Space>
  );
};

export default Radio;
