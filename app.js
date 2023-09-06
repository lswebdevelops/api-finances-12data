const apiKey = "21f8243f104a435c88432ff1ab7a7650";
const endpoint = "https://api.twelvedata.com/quote";

// Function to fetch stock data by symbol
async function fetchStockData(symbol) {
  try {
    const response = await fetch(
      `${endpoint}?symbol=${symbol}&apikey=${apiKey}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to update the table with stock data, including price
async function updateTable(symbol) {
  const tableBody = document.querySelector("#stock-table tbody");
  const data = await fetchStockData(symbol);

  if (data) {
    const priceResponse = await fetch(
      `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`
    );
    const priceData = await priceResponse.json();

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${symbol}</td>       
        <td>${data.name}</td>       
        <td>${priceData.price}</td> <!-- Add the price here -->
        <td>${data.currency}</td>
        <td>${data.exchange}</td>
      
    `;
    tableBody.appendChild(row);
  }
}

// <td>${data.open}</td>
// <td>${data.close}</td>
// <td>${data.high}</td>
// <td>${data.low}</td>
// <td>${data.volume}</td>
// <td>${data.percent_change}</td>
// <td>${data.previous_close}</td>
// <td>${data.fifty_two_week.low}</td>
// <td>${data.fifty_two_week.high}</td>

// Handle the search button click event
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  const tickerInput = document.getElementById("tickerInput");
  const symbol = tickerInput.value.toUpperCase(); // Ensure uppercase symbol

  if (symbol) {
    updateTable(symbol);
  }
});

// Initial table update
updateTable("AAPL"); // You can specify an initial symbol here
