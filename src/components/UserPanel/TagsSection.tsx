import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchTags } from "../../store/slices/tag/tagSlice";
import { Table } from "antd";

const TagsSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tags, status } = useSelector((state: RootState) => state.tags);
  const userId = useSelector((state: RootState) => state.user.userid);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTags(userId));
    }
  }, [dispatch, userId]);

  const columns = [
    { title: "Tag Name", dataIndex: "tag_name", key: "tag_name" },
  ];

  return (
    <div>
      <h3>Tags</h3>
      <Table
        dataSource={tags}
        columns={columns}
        rowKey="id"
        loading={status === "loading"}
      />
    </div>
  );
};

export default TagsSection;
