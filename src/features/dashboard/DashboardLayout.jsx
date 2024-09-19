import styled from "styled-components";
import { useBalance } from "./hooks/useBalance";
import { formatCurrency, getCurrentStockMarketDate } from "../../utils/helpers";
import { useStocks } from "./hooks/useStocks";
import { useEffect, useState } from "react";
import InfoBox from "../../components/InfoBox";
import Graph from "./Graph";
import Chart from "./Chart";
import Table from "../../components/Table";
import TableRow from "../../components/TableRow";
import AddStockDashboard from "./AddStockDashboard";
import Spinner from "../../components/Spinner";

/**
 * DashboardLayout component provides an overview of the portfolio, showing total balance, 
 * cash balance, stock details, and graphical representations of portfolio performance. 
 * It allows users to add or update stock information.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.id - The ID of the portfolio to display data for
 * @returns {JSX.Element} The rendered dashboard layout component.
 */
const DashboardLayout = ({ id }) => {
  const { balance: cashBalance } = useBalance(id); // Custom hook to get the cash balance of the portfolio
  const { filteredStocks, isLoading } = useStocks(id); // Custom hook to get the list of filtered stocks in the portfolio

  // State to track the total value of stocks and the total portfolio balance (stocks + cash)
  const [totalStocksValue, setTotalStocksValue] = useState(0.0);
  const [totalPortfolioBalance, setTotalPortfolioBalance] = useState(0.0);

  // Effect to calculate the total stock value and total portfolio balance whenever the stock data or cash balance changes
  useEffect(() => {
    if (filteredStocks) {
      const totalValue = filteredStocks?.reduce(
        (sum, stock) => sum + stock.currentPrice * stock.amount,
        0.0
      );
      setTotalStocksValue(totalValue);
      setTotalPortfolioBalance(totalStocksValue + cashBalance);
    }
  }, [filteredStocks, totalStocksValue, cashBalance]);

  // Display loading spinner while the stock data is being fetched
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <InfoBox
        label="Total Balance"
        value={formatCurrency(totalPortfolioBalance)}
      />
      <InfoBox
        label="Cash Balance"
        value={formatCurrency(isNaN(cashBalance) ? 0 : cashBalance)}
      />
      <Graph />
      <Chart totalSum={totalPortfolioBalance} />
      {isLoading && <Spinner />}
      <Table columns="0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr auto">
        {/* Table header */}
        <Table.Header>
          <div>Ticker</div>
          <div>Name</div>
          <div>Average price</div>
          <div>Current market price</div>
          <div>Total Sum</div>
          <div>Quantity</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredStocks}
          render={(stock) => (
            <TableRow
              type="dashboardRow"
              stock={stock}
              key={stock.ticker}
              role="row"
              columns="0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr auto"
            />
          )}
        />
      </Table>

      <AddStockDashboard cashBalance={cashBalance} />
    </StyledDashboardLayout>
  );
};

/**
 * Styled component for the layout of the dashboard, using CSS Grid to structure the sections
 * including the balance information, graphs, stock table, and stock actions.
 */
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 2fr;
  grid-template-rows: 10rem 10rem auto 1fr 1fr; // Added an extra row at the 4th position
  gap: 6rem; // Adjust the gap between rows and columns
  padding: 2.8rem 0;
  margin-top: 3.4rem;

  & > div:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  & > div:nth-child(2) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  & > div:nth-child(3) {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
    height: 100%;
    min-height: 400px; // Increase graph height if needed
    overflow: hidden;
  }

  & > div:nth-child(4) {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
  }

  & > div:nth-child(5) {
    grid-column: 1 / -1;
    grid-row: 4 / 5; // Move the table to the new row (4th row)
  }

  & > div:nth-child(6) {
    grid-column: 1 / 2;
    grid-row: 5 / 6; // Move the "Buy/Update Stock" button to the 5th row
    justify-self: start;
  }
`;

export default DashboardLayout;
