// src/components/Empty.tsx

import React, { useState } from "react";
import { ExpenseModal } from "../ExpenseModel/expenseform.model"; // Import the new ExpenseModal
import { Box, Typography, Button, Container } from "@mui/material";
import { Fade } from "@mui/material"; // Import Fade for animation
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast
import './empty.css';

interface EmptyProps {
    para?: string;
    buttonText?: string;
}

export const Empty: React.FC<EmptyProps> = ({ para, buttonText }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const triggerModal = () => {
        setIsModalOpen(true); // Open the modal when the button is clicked
        toast.success('Adding a new expense!'); // Show success toast
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        toast.info('Modal closed'); // Show info toast
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
            <ToastContainer /> {/* Render the ToastContainer */}
            <Fade in={true} timeout={1000}>
                <Box>
                    <Typography variant="h4" className="text-success" sx={{ mb: 2 }}>
                        Start your Journey with us now
                    </Typography>
                    <img
                        src='https://res.cloudinary.com/dkredoejm/image/upload/c_thumb,w_200,g_face/v1728984364/emptyexpencepage_fi9yzl.png'
                        alt='empty'
                        className='emptyImage'
                        style={{ width: '100%', maxWidth: '200px', borderRadius: '8px' }}
                    />
                    <Typography variant="body1" sx={{ mt: 2, mb: 3 }} style={{fontSize: '24px', color: 'red', fontWeight: 'bold'}}>
                        {para ?? "There are no existing expenses"}
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={triggerModal} 
                        sx={{ padding: '10px 20px', fontSize: '16px' }}
                    >
                        {buttonText ?? "Add your Expense"}
                    </Button>
                </Box>
            </Fade>

            {/* Use the ExpenseModal component */}
            <ExpenseModal isOpen={isModalOpen} onClose={closeModal} />
        </Container>
    );
};
