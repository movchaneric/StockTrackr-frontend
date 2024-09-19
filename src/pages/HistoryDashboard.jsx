import styled from "styled-components";
import Table from "../components/Table";
import TableRow from "../components/TableRow";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Heading from "../components/Heading";

import Spinner from "../components/Spinner";
import CabinTableOperations from "../components/CabinTableOperations";
import { filterOptions } from "../utils/constVariables";
import Row from "../components/Row";

import { useAllTransactions } from "../features/dashboard/hooks/useAllTransactions";

/**
 * HistoryDashboard component for displaying the history of transactions
 * associated with a portfolio. Provides filtering options to view specific
 * types of transactions (e.g., bought, sold, cash actions).
 *
 * @component
 * @returns {JSX.Element} The rendered transaction history dashboard.
 */
const HistoryDashboard = () => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const { id: portfolioId } = useParams(); // Extracts the portfolio ID from the URL parameters
  const [searchParams] = useSearchParams(); // Extracts search parameters from the URL for filtering transactions

  // Fetches all transactions related to the given portfolio using custom hook
  const { allTransactions, isLoading: isFetchingAllTranscations } =
    useAllTransactions(portfolioId);

  if (isFetchingAllTranscations) return <Spinner />;

  console.log(allTransactions);

  // Sorts the transactions in descending order based on date
  allTransactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // For descending order
  });

  // Retrieves the filter value from the search parameters or defaults to "all"
  const filterValue = searchParams.get("status") || "all";

  let filteredHistoryTransactions;

  // Filters the transactions based on the selected filter option
  if (filterValue === "all") filteredHistoryTransactions = allTransactions;
  else if (filterValue === "bought-stock") {
    filteredHistoryTransactions = allTransactions.filter(
      (stock) => stock.action.actionId === "3"
    );
  } else if (filterValue === "sold-stock") {
    filteredHistoryTransactions = allTransactions.filter(
      (stock) => stock.action.actionId === "4"
    );
  } else if (filterValue === "deposite-cash") {
    filteredHistoryTransactions = allTransactions.filter(
      (stock) => stock.action.actionId === "1"
    );
  } else {
    filteredHistoryTransactions = allTransactions.filter(
      (stock) => stock.action.actionId === "2"
    );
  }

  return (
    <StyledDashboard>
      <Row type="horizontal">
        <StyledHeader>
          <HiArrowLongLeft
            onClick={() => navigate(`/dashboard/${portfolioId}`)}
          />
          <Heading as="h1">Transactions history</Heading>
        </StyledHeader>
        <CabinTableOperations filterOptions={filterOptions} field="status" />
      </Row>

      <Table columns="0.6fr 0.6fr 0.6fr 0.6fr 0.6fr auto">
        {/* Table header */}
        <Table.Header>
          <div>Date</div>
          <div>Action</div>
          <div>Amount</div>
          <div>Ticker</div>
          <div>Quantity</div>
          <div></div>
        </Table.Header>

        {/* Tables data  */}
        <Table.Body
          type="historyTable"
          data={filteredHistoryTransactions}
          render={(stock) => (
            <TableRow
              type="historyRow"
              stock={stock}
              key={stock.transactionId}
              role="row"
              columns="0.6fr 0.6fr 0.6fr 0.6fr 0.6fr auto"
            />
          )}
        />
      </Table>
    </StyledDashboard>
  );
};

/**
 * Styled component for the main layout of the History Dashboard.
 * Manages the structure and spacing.
 */
const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  height: 100vh;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 2.4rem;
  font-weight: 800;

  svg {
    font-size: 4rem;
    background-color: var(--color-brand-600);
    color: white;
    padding: 0 0.8rem;
    border-radius: var(--border-radius-sm);
    cursor: pointer;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default HistoryDashboard;
