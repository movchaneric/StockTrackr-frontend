import { useState } from "react";
import Button from "../../components/Button";
import CreatePortfolioForm from "./CreatePortfolioForm";
import Modal from "../../components/Modal";

const AddPortfolio = ({ userId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button
        variation="secondary"
        onClick={() => setIsOpenModal((show) => !show)}
      >
        Add new portfolio
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)} isOpenModal={isOpenModal}>
          <div>
            <CreatePortfolioForm
              userId={userId}
              onClose={() => setIsOpenModal(false)}
              isOpenModal={isOpenModal}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddPortfolio;
