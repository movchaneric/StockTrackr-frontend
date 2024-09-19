import axios from "axios";
import { SERVER_IP_ADDRESS } from "../utils/constVariables";
// ------------------- PORTFOLIO -----------------
export async function getAllPortfolios() {
  try {
    const response = await axios.get(`http://${SERVER_IP_ADDRESS}/portfolio`);

    return response.data;
  } catch (err) {
    console.log("ERROR getAllPortfolios: ", err.message);
    throw err;
  }
}

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

// Query to fetch cash balance
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

//TODO: Update cash balance
// -------------- STOCKS --------------
export async function actionOnStock(data) {
  console.log("actionOnStock: ", data);
  const { portfolioId, actionId, ticker, price, amount, date } = data;

  //Grab the value from action object and call it actionId

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

// -------------- Delete all actions from the transactionId providede and forward --------------
export async function deleteAllActionsFromNowOn(transactionsId) {
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
