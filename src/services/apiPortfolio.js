import axios from "axios";
import { SERVER_IP_ADDRESS } from "../utils/constVariables";

// ------------------- PORTFOLIO -----------------

/**
 * Fetches all portfolios from the server.
 *
 * @returns {Promise<Object>} A promise that resolves to the data of all portfolios.
 * @throws Will throw an error if the API call fails.
 */
export async function getAllPortfolios() {
  try {
    const response = await axios.get(`http://${SERVER_IP_ADDRESS}/portfolio`);

    return response.data;
  } catch (err) {
    console.log("ERROR getAllPortfolios: ", err.message);
    throw err;
  }
}

/**
 * Adds a new portfolio to the server.
 *
 * @param {Object} portfolio - The portfolio data
 * @param {string} portfolio.user_id - The user ID
 * @param {string} portfolio.portfolio_name - The portfolio name
 * @returns {Promise<Object>} A promise that resolves to the response of the add operation.
 * @throws Will throw an error if the API call fails.
 */
export async function addNewPortfolio(portfolio) {
  console.log("Add new portfolio: ", portfolio);
  const { user_id, portfolio_name } = portfolio;
  try {
    const resposnse = await axios.post(
      `http://${SERVER_IP_ADDRESS}/portfolio/add`,
      {
        user_id,
        portfolio_name,
      }
    );

    return resposnse;
  } catch (err) {
    console.log("ERROR addNewPortfolio: ", err.message);
    throw err;
  }
}

/**
 * Fetches a portfolio by its ID from the server.
 *
 * @param {string} portfolioId - The portfolio ID
 * @returns {Promise<Object>} A promise that resolves to the portfolio data.
 * @throws Will throw an error if the API call fails.
 */
export async function getPortfolioById(portfolioId) {
  try {
    const response = await axios.post(
      `http://${SERVER_IP_ADDRESS}/portfolio/id`,
      {
        portfolioId,
      }
    );

    return response.data.data;
  } catch (err) {
    console.log("ERROR getPortfolioById: ", err.message);
    throw err;
  }
}

/**
 * Fetches the cash balance of a portfolio by its ID.
 *
 * @param {string} portfolioId - The portfolio ID
 * @returns {Promise<Object>} A promise that resolves to the cash balance.
 * @throws Will throw an error if the API call fails.
 */
export async function getPorfolioBalance(portfolioId) {
  try {
    const response = await axios.get(
      `http://${SERVER_IP_ADDRESS}/cash-transactions/cash_balance/${portfolioId}`
    );

    return response.data;
  } catch (err) {
    console.log("ERROR getPorfolioBalance: ", err.message);
    throw err;
  }
}

// -------------- STOCKS --------------
/**
 * Performs an action (buy/sell) on a stock.
 *
 * @param {Object} data - The stock transaction data
 * @param {string} data.portfolioId - The portfolio ID
 * @param {string} data.actionId - The action type ("1" for buy, "2" for sell)
 * @param {string} data.ticker - The stock ticker
 * @param {number} data.price - The price of the stock
 * @param {number} data.amount - The number of stocks
 * @param {string} data.date - The transaction date
 * @returns {Promise<void>} A promise that resolves if the action is successful.
 * @throws Will throw an error if the API call fails.
 */
export async function actionOnStock(data) {
  console.log("actionOnStock: ", data);
  const { portfolioId, actionId, ticker, price, amount, date } = data;

  try {
    await axios.post(`http://${SERVER_IP_ADDRESS}/stock-transactions/add`, {
      portfolioId,
      actionId,
      ticker,
      price,
      date,
      amount,
    });
  } catch (err) {
    if (err.response && err.response.data) {
      // Pass the custom error message from the server
      console.log(err.response.data);
      throw new Error(err.response.data);
    } else {
      console.log(err.message);
      // Throw a generic error if no response data is available
      throw new Error(err.message || "Something went wrong");
    }
  }
}

/**
 * Fetches all stocks from the server.
 *
 * @returns {Promise<Object>} A promise that resolves to the data of all stocks.
 * @throws Will throw an error if the API call fails.
 */
export async function getAllStocks() {
  try {
    const response = await axios.get(
      `http://${SERVER_IP_ADDRESS}/stock-transactions`
    );

    return response.data;
  } catch (err) {
    console.log("ERROR getAllStocks: ", err.message);
    throw err;
  }
}

/**
 * Fetches all stocks related to a specific portfolio.
 *
 * @param {string} portfolioId - The portfolio ID
 * @returns {Promise<Object>} A promise that resolves to the portfolio's stock data.
 * @throws Will throw an error if the API call fails.
 */
export async function getAllStocksRelatedToPortfolio(portfolioId) {
  try {
    const response = await axios.get(
      `http://${SERVER_IP_ADDRESS}/stock/all_stocks/${portfolioId}`
    );
    // console.log(response.data);
    return response.data;
  } catch (err) {
    // Log the error message and rethrow the error
    console.error("ERROR getAllStocksRelatedToPortfolio:", err.message);
    throw err;
  }
}

/**
 * Fetches the graph data related to a specific portfolio.
 *
 * @param {string} portfolioId - The portfolio ID
 * @returns {Promise<Object>} A promise that resolves to the graph data.
 * @throws Will throw an error if the API call fails.
 */
export async function getGraphData(portoflioId) {
  try {
    const response = await axios.get(
      `http://${SERVER_IP_ADDRESS}/graph/${portoflioId}`
    );
    return response.data;
  } catch (err) {
    console.log("ERROR getAllStocks: ", err.message);
    throw err;
  }
}

// -------------- STOCK TRANSACTIONS ----------------------

/**
 * Fetches all stock transactions for a specific portfolio.
 *
 * @param {string} portfolioId - The portfolio ID
 * @returns {Promise<Object>} A promise that resolves to the portfolio's stock transactions.
 * @throws Will throw an error if the API call fails.
 */
export async function getAllStockTransactionsByPortfolioId(portfolioId) {
  try {
    const response = await axios.get(
      `http://${SERVER_IP_ADDRESS}/stock-transactions/all_transactions/${portfolioId}`
    );

    return response.data;
  } catch (err) {
    console.error(
      "ERROR get-All-Stock-Transactions-By-PortfolioId:",
      err.message
    );
    throw err;
  }
}

/**
 * Fetches all transactions (cash and stock) for a specific portfolio.
 *
 * @param {string} portfolioId - The portfolio ID
 * @returns {Promise<Object>} A promise that resolves to the portfolio's transactions.
 * @throws Will throw an error if the API call fails.
 */
export async function getAllTransactionsByPortfolioId(portfolioId) {
  try {
    const response = await axios.get(
      `http://${SERVER_IP_ADDRESS}/cash-transactions/${portfolioId}`
    );

    return response.data;
  } catch (err) {
    console.error("ERROR getAllTransactionsByPortfolioId:", err.message);
    throw err;
  }
}

/**
 * Fetches the date of the last transaction for a specific portfolio.
 *
 * @param {string} portfolioId - The portfolio ID
 * @returns {Promise<Object>} A promise that resolves to the last transaction date.
 * @throws Will throw an error if the API call fails.
 */
export async function getLastTrasnsactionDate(portfolioId) {
  try {
    const response = await axios.get(
      `http://${SERVER_IP_ADDRESS}/cash-transactions/last_transaction_date/${portfolioId}`
    );

    return response.data;
  } catch (err) {
    console.error(
      "ERROR get-All-Stock-Transactions-By-PortfolioId:",
      err.message
    );
    throw err;
  }
}

// -------------- CASH --------------

/**
 * Performs a cash action (deposit/withdraw) on a portfolio.
 *
 * @param {Object} payload - The cash transaction data
 * @param {string} payload.portfolioId - The portfolio ID
 * @param {string} payload.actionId - The action type ("1" for deposit, "2" for withdraw)
 * @param {number} payload.sum - The amount of cash
 * @param {string} payload.parsedDate - The transaction date
 * @returns {Promise<void>} A promise that resolves if the cash action is successful.
 * @throws Will throw an error if the API call fails.
 */
export async function cashAction({ portfolioId, actionId, sum, parsedDate }) {
  try {
    await axios.post(
      `http://${SERVER_IP_ADDRESS}/cash-transactions/transact_money`,
      {
        portfolioId,
        actionId,
        sum,
        parsedDate,
      }
    );
  } catch (err) {
    console.log("ERROR depositeCash: ", err.message);
    throw err;
  }
}

// -------------- Delete all actions from the transactionId provided and forward --------------

/**
 * Deletes all actions from a specific transaction ID onward.
 *
 * @param {string} transactionsId - The transaction ID
 * @returns {Promise<void>} A promise that resolves if the deletion is successful.
 * @throws Will throw an error if the API call fails.
 */ export async function deleteAllActionsFromNowOn(transactionsId) {
  try {
    await axios.post(
      `http://${SERVER_IP_ADDRESS}/cash-transactions/delete_actions/${transactionsId}`
    );
  } catch (err) {
    console.log("ERROR deleteAllActionsFromNowOn: ", err.message);
    throw err;
  }
}

// ------------ Delete porfotlio --------------

export async function deletePortfolio(portfolioId) {
  try {
    await axios.post(`http://${SERVER_IP_ADDRESS}/portfolio/delete`, {
      portfolioId,
    });
  } catch (err) {
    console.log("ERROR deletePortfolio: ", err.message);
    throw err;
  }
}
