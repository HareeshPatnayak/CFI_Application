document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo`;
  
    const ctx = document.getElementById('stockChart').getContext('2d');
    let chart;
  
    function fetchStockData() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const dates = Object.keys(data['Time Series (5min)']).reverse();
          const openingPrices = dates.map(date => parseFloat(data['Time Series (5min)'][date]['1. open']));
          const closingPrices = dates.map(date => parseFloat(data['Time Series (5min)'][date]['4. close']));
  
          renderChart(dates, openingPrices, closingPrices);
        })
        .catch(error => console.error('Error fetching stock data:', error));
    }
  
    function renderChart(labels, openingPrices, closingPrices) {
      if (chart) {
        chart.destroy();
      }
  
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Opening Price',
            data: openingPrices,
            borderColor: 'blue',
            fill: false
          }, {
            label: 'Closing Price',
            data: closingPrices,
            borderColor: 'red',
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'IBM Stock Prices'
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                displayFormats: {
                  minute: 'h:mm a'
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Price (USD)'
              }
            }]
          }
        }
      });
    }
  

    fetchStockData();
  });
  