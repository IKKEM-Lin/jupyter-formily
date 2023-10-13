import React from 'react';
// import { Button, Modal } from 'antd';
import Button from "./component/Button"
import Input from "./component/Input"

const name = process.env.COMPONENT_NAME

const App: React.FC = () => {
  let result = <></>
  switch (name) {
    case "button":
      result = <Button />
      break;
    case "input":
      result = <Input />
      break;
    default:
      break;
  }

  return result;
};

export default App;