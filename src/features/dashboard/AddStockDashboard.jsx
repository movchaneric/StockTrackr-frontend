import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import AddStockFormDashboard from "./AddStockFormDashboard";
import CashForm from "./CashForm";
import { useParams } from "react-router-dom";

const AddStockDashboard = ({ cashBalance }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAddFunds, setIsAddFunds] = useState(false);
  const { id } = useParams();

  // Handle closing of CashForm modal
  const handleCloseCashForm = () => {
    setIsOpenModal(false); // Close the CashForm modal
    setIsAddFunds(false); // Reset isAddFunds state
  };

  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Buy / Update Stock
      </Button>

      {isOpenModal && !isAddFunds && (
        <Modal onClose={() => setIsOpenModal(false)} isOpenModal={isOpenModal}>
          <div>
            <AddStockFormDashboard
              onClose={() => setIsOpenModal(false)}
              cashBalance={cashBalance}
              setIsAddFunds={setIsAddFunds}
            />
          </div>
        </Modal>
      )}

      {isAddFunds && (
        <Modal onClose={handleCloseCashForm} isOpenModal={isAddFunds}>
          <div>
            <CashForm onClose={handleCloseCashForm} type="Deposite" id={id} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddStockDashboard;
