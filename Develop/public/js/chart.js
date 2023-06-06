var ctx = document.getElementById("myChart").getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // Configuration options go here
    options: {},

    // The data for our dataset
    data: {
        labels: [],  // Empty array, will be filled in updateChart
        datasets: [{
            label: 'Weight over time',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],  // Empty array, will be filled in updateChart
        }]
    },
});

async function updateChart(range) {
    // Get the user's ID from the data-user-id attribute
    const userId = document.querySelector('[data-user-id]').dataset.userId;

    // Fetch the weight history data from the server
    const response = await fetch(`/profile/weighthistory/chart?range=${range}`);
    const data = await response.json();

    // Update the chart's data and refresh the chart
    chart.data.labels = data.map(item => new Date(item.date).toLocaleDateString());
    chart.data.datasets[0].data = data.map(item => item.weight);
    chart.update();
}

// Call updateChart when the page loads and set up event listeners
document.addEventListener("DOMContentLoaded", function() {
    updateChart('week');

    // Call updateChart whenever a button is clicked
    document.querySelectorAll('[data-range]').forEach(button => {
        button.addEventListener('click', function() {
            updateChart(this.dataset.range);
        });
    });

    // Add event listener to weight update form submission
    document.getElementById("weightUpdateForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const weightInput = document.getElementById("weight");
        const dateInput = document.getElementById("date");

        const weight = weightInput.value;
        const date = dateInput.value;

        // Get the user's ID from the data-user-id attribute
        const userId = document.querySelector('[data-user-id]').dataset.userId;

        // Send the weight update request to the server
        const response = await fetch("/profile/weighthistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: userId,
                weight: weight,
                date: date
            })
        });

        if (response.ok) {
            // Clear the input fields and update the chart
            weightInput.value = "";
            dateInput.value = "";

            updateChart('week');
        }
    });
});