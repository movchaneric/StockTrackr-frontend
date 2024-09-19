import styled from "styled-components";
import Ticker from "./Ticker";
import Button from "./Button";
import { HiEllipsisVertical, HiOutlineCurrencyDollar } from "react-icons/hi2";
import ContextMenu from "./ContextMenu";
import Modal from "./Modal";
import StockActionForm from "../features/dashboard/StockActionForm";
import {
  formatCurrency,
  getColorForTicker,
  formatDateForDisplay,
} from "../utils/helpers";
import { Form } from "react-hook-form";
import PermanentDeleteForm from "./PermanentDeleteForm";
import { useState } from "react";

const HistoryTableRow = ({
  columns,
  stockTransaction,
  handleContextMenu,
  stockContextRef,
  contextMenuPosition,
  currentTicker,
  setCurrentTicker,
  handleOpenModal,
  setModalIsOpen,
  actionType,
  isCashAction,
  setIsCashAction,
  modalIsOpen,
}) => {
  const color = getColorForTicker(stockTransaction?.stock?.ticker);

  return (
    <StyledTableRow columns={columns}>
      <div>{formatDateForDisplay(stockTransaction?.date)}</div>
      {/* ACTION */}
      <Ticker
        tickerName={stockTransaction?.action?.actionName}
        color={
          stockTransaction?.stockTransaction === null
            ? stockTransaction?.action?.actionName === "Deposit"
              ? "#68d568"
              : "#e85454"
            : stockTransaction.stockTransaction.action.actionName === "Buy"
              ? "#68d568"
              : "#e85454"
        }
      />
      <div>
        {stockTransaction.stockTransaction === null
          ? formatCurrency(stockTransaction.sum)
          : formatCurrency(stockTransaction?.stockTransaction?.stock?.totalSum)}
      </div>
      <Ticker
        tickerName={
          stockTransaction?.stockTransaction === null
            ? "-"
            : stockTransaction?.stockTransaction.stock?.ticker
        }
        color={stockTransaction?.stockTransaction !== null ? color : null}
      />
      <div>
        {stockTransaction.stockTransaction === null
          ? ""
          : stockTransaction.stockTransaction.stock.amount}
      </div>

      <Button
        size="regular"
        variation="regular"
        onClick={() => {
          handleContextMenu(
            stockTransaction?.stockTransaction?.stock?.ticker,
            true
          );
        }}
        ref={stockContextRef}
      >
        <HiEllipsisVertical />
      </Button>

      {(currentTicker || isCashAction) && (
        <ContextMenu
          position={contextMenuPosition}
          onClose={() => {
            setIsCashAction(false);
            setCurrentTicker("");
          }}
        >
          <DetailsContainer>
            {/* SELL STOCK - onClick={() => handleOpenModal("sell")} */}
            <DetailRow
              onClick={() => {
                handleOpenModal("delete", true);
                setIsCashAction(false);
              }}
            >
              <Text>Delete</Text>
            </DetailRow>
          </DetailsContainer>
        </ContextMenu>
      )}

      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen((prevState) => !prevState)}>
          <PermanentDeleteForm
            actionDataToDelete={stockTransaction}
            onClose={() => setModalIsOpen((prevState) => !prevState)}
          />
        </Modal>
      )}
    </StyledTableRow>
  );
};

const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background-color: var(--color-grey-50);
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: start;
  padding: 0 1rem 0 1rem;
  align-items: center;
  font-size: 1.6rem;
  color: var(--color-grey-500);
  gap: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
    transition: all 0.3s;
  }
`;

const Text = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-grey-600);
  display: flex;
  justify-content: start;
`;

export default HistoryTableRow;
