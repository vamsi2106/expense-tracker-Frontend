import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Empty } from "../Empty/empty";
import { deleteFile, fetchFiles } from "../../../store/files.slice";

export const Files = () => {
  const dispatch = useDispatch();
  const { files } = useSelector((state: any) => state.files);
  const userId = "yourUserId"; // Replace with the actual userId

  useEffect(() => {
    dispatch<any>(fetchFiles({ userId }));
  }, [dispatch, userId]);

  const handleDelete = (fileId: string) => {
    // Dispatch the delete action
    dispatch<any>(deleteFile({ userId, id: fileId }));
  };

  return (
    <div>
      {files && files.length > 0 ? (
        files.map((item: any) => {
          // Convert createdAt to a Date object for formatting
          const createdAtDate = new Date(item.createdAt);
          const date = createdAtDate.toLocaleDateString();

          return (
            <div key={item.id}>
              <h2>Uploaded Files</h2>
              <div className="m-5 p-4 rounded shadow">
                <h1>{item.originalFileName}</h1>
                <p>Uploaded on: {date}</p>
                <p>Size: {item.size} bytes</p>

                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)} // Call the delete function
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Empty
          para="There are no existing files"
          buttonText="Add Your Expense Files"
        />
      )}
    </div>
  );
};
