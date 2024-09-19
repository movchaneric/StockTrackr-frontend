import { getColorForTicker } from "../utils/helpers";
import { useRef, useState } from "react";
import DashboardTableRow from "./DashboardTableRow";
import HistoryTableRow from "./HistoryTableRow";

const TableRow = ({ type, stock, columns }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTicker, setCurrentTicker] = useState("");
  const [actionType, setActionType] = useState("");
  const [isCashAction, setIsCashAction] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const stockContextRef = useRef();

  function handleContextMenu(ticker, isCash) {
    setCurrentTicker(ticker);
    setIsCashAction(isCash);

    const rect = stockContextRef.current.getBoundingClientRect();

    setContextMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }

  function handleOpenModal(actionType, isCash) {
    setModalIsOpen(true);
    setCurrentTicker("");
    setActionType(actionType);
    setIsCashAction(isCash);
  }

  const color = getColorForTicker(stock.ticker);

  if (type === "dashboardRow") {
    return (
      <DashboardTableRow
        columns={columns}
        stock={stock}
        color={color}
        handleContextMenu={handleContextMenu}
        stockContextRef={stockContextRef}
        contextMenuPosition={contextMenuPosition}
        currentTicker={currentTicker}
        setCurrentTicker={setCurrentTicker}
        handleOpenModal={handleOpenModal}
        setModalIsOpen={setModalIsOpen}
        actionType={actionType}
        modalIsOpen={modalIsOpen}
      />
    );
  } else {
    return (
      <HistoryTableRow
        columns={columns}
        color={color}
        stockTransaction={stock}
        handleContextMenu={handleContextMenu}
        stockContextRef={stockContextRef}
        contextMenuPosition={contextMenuPosition}
        currentTicker={currentTicker}
        setCurrentTicker={setCurrentTicker}
        handleOpenModal={handleOpenModal}
        setModalIsOpen={setModalIsOpen}
        actionType={actionType}
        setIsCashAction={setIsCashAction}
        isCashAction={isCashAction}
        modalIsOpen={modalIsOpen}
      />
    );
  }
};

export default TableRow;
