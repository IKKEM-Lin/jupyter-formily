import { useModelState } from "@anywidget/react";
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
  FormButtonGroup,
} from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { Card, Slider, Rate, Modal } from "antd";
import React, { useEffect, useState } from "react";
import FileSelectorForFormily from "./FileSelectorForFormily";

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: "normal" | "h1" | "h2" | "h3" | "p";
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === "normal" || !mode ? "div" : mode;
  return React.createElement(tagName, props, value || content);
};

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
    FileSelectorForFormily,
  },
});

const form = createForm();

// const schema = ;

const Formily = () => {
  const [schema] = useModelState<any>("schema");
  const [value, setValue] = useModelState("value");
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOK = (data: any) => {
    setValue(data)
    setIsModalOpen(false);
    // setSelected(value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // setSelected(value);
  };

  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      footer= {null}
      // onOk={null}
      onCancel={handleCancel}
    >
      <div onKeyDown={evt => evt.stopPropagation()}>
        <Form form={form} layout="vertical">
          <SchemaField schema={schema} />
          <FormButtonGroup>
            <Submit onSubmit={handleOK}>提交</Submit>
          </FormButtonGroup>
        </Form>
      </div>
    </Modal>
  );
};

export default Formily;
