import styled from "styled-components";
import Ticker from "./Ticker";
import Button from "./Button";
import {
  HiArrowPath,
  HiEllipsisVertical,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import ContextMenu from "./ContextMenu";
import Modal from "./Modal";
import StockActionForm from "../features/dashboard/StockActionForm";
import { formatCurrency } from "../utils/helpers";
import SellStockForm from "../features/dashboard/stockForms/SellStockForm";
import BuyStockForm from "../features/dashboard/stockForms/BuyStockForm";
import { useState } from "react";

const DashboardTableRow = ({
  columns,
  color,
  stock,
  handleContextMenu,
  stockContextRef,
  currentTicker,
  contextMenuPosition,
  setCurrentTicker,
  handleOpenModal,
  modalIsOpen,
  setModalIsOpen,
  actionType,
}) => {
  return (
    <StyledTableRow columns={columns}>
      <Ticker tickerName={stock.ticker} color={color} />
      <div>{stock.companyName}</div>
      <div>{formatCurrency(stock.price.toFixed(2))}</div>
      <div>{formatCurrency(stock.currentPrice)}</div>
      <div>{formatCurrency(stock.currentPriceSum.toFixed(2))}</div>
      <div>{stock.amount}</div>

      {/* Context menu -> sell & update */}
      <Button
        size="regular"
        variation="regular"
        onClick={() => handleContextMenu(stock.ticker)}
        ref={stockContextRef}
      >
        <HiEllipsisVertical />
      </Button>

      {currentTicker && (
        <ContextMenu
          position={contextMenuPosition}
          onClose={() => setCurrentTicker("")}
        >
          <DetailsContainer>
            <DetailRow onClick={() => handleOpenModal("buy", false)}>
              <HiOutlineCurrencyDollar />
              <Text>Buy</Text>
            </DetailRow>

            <DetailRow onClick={() => handleOpenModal("sell", false)}>
              <HiArrowPath />
              <Text>Sell</Text>
            </DetailRow>
          </DetailsContainer>
        </ContextMenu>
      )}

      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen((prevState) => !prevState)}>
          {actionType === "buy" && (
            <BuyStockForm
              ticker={stock.ticker}
              currentPrice={stock.currentPrice}
              onClose={() => setModalIsOpen(false)}
            />
          )}

          {actionType === "sell" && (
            <SellStockForm
              amount={stock.amount}
              maxAmount={stock.amount}
              ticker={stock.ticker}
              currentPrice={stock.currentPrice}
              onClose={() => setModalIsOpen(false)}
            />
          )}
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

export default DashboardTableRow;

{
  /* <StockActionForm
            actionType={actionType}
            ticker={stock.ticker}
            currentPrice={stock.currentPrice}
            quantity={stock.amount}
            onClose={() => setModalIsOpen(false)}
          /> */
}
