import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/index";
import {
  fetchUsers,
  deleteUser,
} from "../../../store/slices/user/usersListSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import { User } from "../../../types/types";
import {
  Table,
  Input,
  Button,
  Modal,
  Pagination,
  DatePicker,
  Space,
} from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import "./UsersList.css";

const { RangePicker } = DatePicker;

const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.usersList
  );
  const token = useSelector((state: RootState) => state.user.token);

  const [selectedUser, setSelectedUser] = useState<string | null>(null); // Track the user to be deleted
  const [showConfirmation, setShowConfirmation] = useState(false); // Control confirmation modal visibility
  const [searchTerm, setSearchTerm] = useState(""); // Track search input
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [dateRange, setDateRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null); // Track date range
  const usersPerPage = 5; // Number of users per page

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers());
    }
  }, [token, dispatch]);

  const handleDelete = async () => {
    const user = users.find((u: User) => u.userId === selectedUser);

    if (!user || !user.userId) {
      toast.error("User not found.");
      return;
    }

    try {
      toast.info("Deleting user...");
      await dispatch(deleteUser({ userId: user.userId as string })).unwrap();
      toast.success("User removed successfully.");
      setShowConfirmation(false);
      dispatch(fetchUsers()); // Re-fetch users after deletion
    } catch (error) {
      toast.error("Failed to remove user. Server error.");
    } finally {
      setSelectedUser(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDateChange = (dates: [moment.Moment, moment.Moment] | null) => {
    setDateRange(dates);
    setCurrentPage(1); // Reset to first page on new date filter
  };

  const filteredUsers = users.filter((user: any) => {
    const matchesSearchTerm =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange =
      !dateRange ||
      (moment(user.createdAt).isSameOrAfter(dateRange[0], "day") &&
        moment(user.createdAt).isSameOrBefore(dateRange[1], "day"));

    return matchesSearchTerm && matchesDateRange;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => indexOfFirstUser + index + 1,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            setSelectedUser(record.userId);
            setShowConfirmation(true);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Input
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          className="search-input"
          style={{ marginBottom: 16 }}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={currentUsers}
        rowKey="userId"
        pagination={false}
        bordered
        className="custom-table"
      />
      <Pagination
        current={currentPage}
        total={filteredUsers.length}
        pageSize={usersPerPage}
        onChange={paginate}
        className="custom-pagination"
        style={{ marginTop: 16, textAlign: "center" }}
      />

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={showConfirmation}
        onOk={handleDelete}
        onCancel={() => setShowConfirmation(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>

      {/* Toast Notification Container */}
      <ToastContainer />
    </Box>
  );
};

export default UsersList;
