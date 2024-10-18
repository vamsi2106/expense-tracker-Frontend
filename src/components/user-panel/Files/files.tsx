import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFile, fetchFiles } from "../../../store/files.slice";

// Material-UI Components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Empty } from "../Empty/empty";

export const Files = () => {
    const dispatch = useDispatch();
    const { files } = useSelector((state: any) => state.files);

    useEffect(() => {
        dispatch<any>(fetchFiles());
    }, [dispatch]);

    const handleDelete = (fileId: string) => {
        dispatch<any>(deleteFile(fileId));
    };

    return (
        <div>
            {files && files.length > 0 ? (
                <>
                    <h2>Uploaded Files</h2>
                    <TableContainer style={{width: '90vw'}} component={Paper} className="m-5 p-4 shadow">
                        <Table aria-label="files table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>File Name</strong></TableCell>
                                    <TableCell><strong>Uploaded Date</strong></TableCell>
                                    <TableCell><strong>File Size (bytes)</strong></TableCell>
                                    <TableCell align="right"><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {files.map((item: any) => {
                                    const createdAtDate = new Date(item.createdAt);
                                    const date = createdAtDate.toLocaleDateString();

                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.originalFileName}</TableCell>
                                            <TableCell>{date}</TableCell>
                                            <TableCell>{item.size}</TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ) : (
                <Empty para="There are no existing files" buttonText="Add Your Expense Files" />
            )}
        </div>
    );
};
