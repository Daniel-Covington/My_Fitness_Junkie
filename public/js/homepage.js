document.addEventListener('DOMContentLoaded', async (event) => {
    let chartInstance = null;

    const getChartData = async (range) => {
        try {
            const response = await fetch(`/api/weighthistory/chart?range=${range}`);
            if (response.ok) {
                const data = await response.json();
                renderChart(data);
            } else {
                console.error('Failed to retrieve weight chart data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderChart = (data) => {
        const ctx = document.getElementById('lineChart').getContext('2d');

        // Destroy the existing chart instance if there is one
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Extract the dates, weights and bmi from the data
        const labels = data.map((entry) => new Date(entry.date));
        const weights = data.map((entry) => entry.weight);
        const bmis = data.map((entry) => entry.bmi);

        // Determine the min and max weight values to adjust the y-axis
        const minWeight = Math.min(...weights) - 5;
        const maxWeight = Math.max(...weights) + 5;

        // Create the chart
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Weight',
                        data: weights,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1,
                        fill: true,
                    },
                    {
                        label: 'BMI',
                        data: bmis,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: true,
                        type: 'time',
                        time: {
                            unit: 'day',
                        },
                    },
                    y: {
                        display: true,
                        min: minWeight,
                        max: maxWeight,
                    },
                },
            },
        });
    };

    const setActiveButton = (range) => {
        const buttons = document.querySelectorAll('.chart-options button');
        buttons.forEach((button) => {
            if (button.getAttribute('data-range') === range) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        getChartData(range);
    };

    const chartOptions = document.querySelector('.chart-options');

    chartOptions.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const range = event.target.getAttribute('data-range');
            setActiveButton(range);
        }
    });

    getChartData('week');
});
//hello world