import React from "react";
import { Button as AntdBtn } from "antd";
import { useModelState } from "@anywidget/react";
import type { ButtonProps } from "antd/lib/button";

const Button: React.FC = () => {
  const [onclick, setOnclick] = useModelState("on_click");
  const [label] = useModelState<string>("label");
  const [props] = useModelState<ButtonProps>("props");
  return (
    <>
      <AntdBtn {...props} type="primary" onClick={() => setOnclick(!onclick)}>
        {label}
      </AntdBtn>
    </>
  );
};

export default Button;
