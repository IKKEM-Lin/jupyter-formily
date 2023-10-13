import React from "react";
import { Button as AntdBtn } from "antd";
import {
  // createRender,
  useModelState,
  //   useModel,
} from "@anywidget/react";
// import type { AnyModel } from "@anywidget/types";

const Button: React.FC = () => {
  const [onclick, setOnclick] = useModelState("on_click");
  const [label] = useModelState<string>("label");
  const [props] = useModelState<any>("props");
  return (
    <>
      <AntdBtn {...props} type="primary" onClick={() => setOnclick(!onclick)}>
        {label}
      </AntdBtn>
    </>
  );
};

export default Button;
