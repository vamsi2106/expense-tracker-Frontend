import React, { useEffect, useState } from "react";
import './homeSuccessPage.css';
import { useSelector, useDispatch } from "react-redux";
import { ExpenseModal } from "../ExpenseModel/expenseform.model";

// import { EditExpenseModal } from "../ExpenseModel/editExpenseModel";
// import { triggerEditModel, closeEditModel } from "../../Store/expenses.slice";
// import { Modal } from "../Modal/model";
// import EditExpenseInputForm from "../FormComponent/editExpenseForm";
import { Expense } from "../Expenses/expenses";
import { Files } from "../Files/files";
import { fetchExpenses } from "../../store/expenses.slice";
interface HomeSuccessPageProps{
 tab:string
}

export const HomeSuccessPage:React.FC<HomeSuccessPageProps> = ({tab}) => {
    const { expenses } = useSelector((state: any) => state.expenses);
    const dispatch = useDispatch();
    const tabs = {
        files : 'FILES',
        expenses : 'EXPENSES'
    }
    console.log('file loaded');

    //const [tab,setTab] = useState<string>(tabs.expenses);
    //const [isModalOpen, setIsModalOpen] = useState(false);
    //const [editExpenseModel,setEditExpenseModel] = useState<boolean>(false);
    //const [expenseDetails, setExpenseDetails] = useState<any>(); 

    useEffect(() => {
        if (!expenses.length) {
            dispatch<any>(fetchExpenses()); // Fetch expenses if they are not loaded
        }
    }, [dispatch, expenses]);

    // const triggerModal = () => setIsModalOpen(true);
    // const closeModal = () => setIsModalOpen(false);
    // const changeTab = (selectedTab:string)=>{
    //     setTab(selectedTab);
    // }
    // const editExpenseFromExpenses = async (id: string) => {
    //     try {
    //         const result = await dispatch<any>(getExpenseById(id)); // Fetch the expense by ID
    //         setExpenseToEdit(result.payload); // Set the selected expense to state
    //         dispatch(triggerEditModel()); // Open the edit modal
    //     } catch (error) {
    //         console.log("Error fetching expense by ID:", error);
    //     }
    // };

    // const triggerEditExpenseModel  = () => {
    //     setEditExpenseModel(!editExpenseModel) 

    // }

    // const EditExpense = (item:any)=>{
    //     triggerEditExpenseModel();
    //     setExpenseDetails(item);
    //     console.log(item);
    // }
    // const deleteExpenseFromExpenses = async (id: string) => {
    //     try {
    //         const resultAction = await dispatch<any>(deleteExpense(id));
    //         if (deleteExpense.fulfilled.match(resultAction)) {
    //             dispatch<any>(fetchExpenses());
    //         }
    //     } catch (error) {
    //         console.log("Error deleting expense:", error);
    //     }
    // };
    
console.log("triigerd tab",tab)
    return (
        <div>
            {/* <nav className="navbar bg-light shadow p-3 d-flex gap-2">
                <div className="d-flex gap-1">
                    <h5 onClick={()=>changeTab(tabs.files)}><b>Files</b></h5>
                    <h5 onClick={()=>changeTab(tabs.expenses)}><b className="px-4">Expense Details</b></h5>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={triggerModal}>Add your Expense</button>
                </div>
            </nav> */}

            {/* {expenses.map((item: any) => (
                <div key={item.id} className="m-5 p-4 rounded shadow">
                    <div>
                        <h1>{item.name}</h1>
                        <div className="m-3">
                            <p><b>Category: </b>{item.category}</p>
                            <p><b>Date: </b>{new Date(item.date).toLocaleDateString()}</p>
                            <p><b>Amount: </b>{item.amount}</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-danger" onClick={() => deleteExpenseFromExpenses(item.id)}>Delete</button>
                        <button className="btn btn-warning" onClick={() => EditExpense(item)}>Edit</button>
                    </div>
                </div>
            ))} */}
            {tab === tabs.files ? <Files/> : <Expense/>}

            {/* Expense Modal */}
            {/* <ExpenseModal isOpen={isModalOpen} onClose={closeModal} /> */}

            {/* Edit Expense Modal */}
            
                {/* <Modal isOpen={editExpenseModel} onClose= {triggerEditExpenseModel} title="Update Expense Details">
                    <EditExpenseInputForm expenseDetails={expenseDetails}/>
                </Modal>  */}
            
        </div>
    );
};
