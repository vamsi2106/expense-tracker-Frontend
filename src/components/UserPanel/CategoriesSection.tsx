import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "../../store/slices/category/categorySlice";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { FaTrash } from "react-icons/fa";

const { Option } = Select;

interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

const CategoriesSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status } = useSelector(
    (state: RootState) => state.categories
  );
  const userId = useSelector((state: RootState) => state.user.userid);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCategories(userId));
    }
  }, [dispatch, userId]);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Category) => (
        <Button
          type="link"
          icon={<FaTrash />}
          onClick={() => handleDeleteCategory(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateCategory = (values: any) => {
    if (userId) {
      dispatch(createCategory({ userId, categoryData: values }));
      setIsModalVisible(false);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (userId) {
      dispatch(deleteCategory({ userId, id }))
        .unwrap()
        .then(() => {
          // Optionally, you could also refetch the expenses here
          dispatch(fetchCategories(userId)); // Refresh categories
        });
    }
  };

  return (
    <div>
      <h3>Categories</h3>
      <Button type="primary" onClick={showModal}>
        Create Category
      </Button>
      <Table
        dataSource={categories}
        columns={columns}
        rowKey="id"
        loading={status === "loading"}
      />
      <Modal
        title="Create Category"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleCreateCategory}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              { required: true, message: "Please select the category type!" },
            ]}
          >
            <Select>
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesSection;
