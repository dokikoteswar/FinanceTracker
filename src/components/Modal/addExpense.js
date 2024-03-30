import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
function AddExpense({ isExpenseModalVisible, handleExpenseCancel, onFinish }) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="varyical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Plese input the Name  of The Transaction",
            }
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Plese input the expense Amount",
            }
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Plese select the expense date!",
            }
          ]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Plese select a tag!!",
            }
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="rechage">Rechage</Select.Option>
            <Select.Option value="movie">Movie</Select.Option>
            <Select.Option value="traval">Traval</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="shoping">Shoping</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="other">Other</Select.Option>
            




          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Expanse
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpense;
