// src/components/ExpenseModal.tsx

import React, { useState } from "react";
import { Modal } from "../Modal/model";
import ManualExpenceInputForm from "../FormComponent/manualExpenceInputForm";
import FileExpenceInputForm from "../FormComponent/FileInputExpenceForm";
import '../Empty/empty.css'

const formTypes = {
    initial: "NONE",
    individualDetails: 'UPDATE INDIVIDUALY',
    addFiles: 'ADD FILES'
};

interface ExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose }) => {
    const [formType, setFormType] = useState(formTypes.initial);

    const updateFormType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormType(event.target.value);
    };

    const displayForms = () => {
        switch (formType) {
            case formTypes.initial:
                return null;
            case formTypes.individualDetails:
                return <ManualExpenceInputForm />;
            case formTypes.addFiles:
                return <FileExpenceInputForm />;
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add your Expense">
            <form>
                <select onChange={updateFormType} defaultValue='' className="rounded">
                    <option value="" disabled>
                        -- Select an option --
                    </option>
                    <option value={formTypes.individualDetails}>Upload Details</option>
                    <option value={formTypes.addFiles}>Upload File</option>
                </select>
            </form>
            <div className="mt-3">
                {displayForms()}
            </div>
        </Modal>
    );
};
