// Fetch stock data from the JSON file and filter based on the search term
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("stock-name");
    const suggestionsContainer = document.getElementById("autocomplete-suggestions");

    // Fetch the JSON file containing stock data
    async function fetchStockData() {
        const response = await fetch('stocks.json');
        const data = await response.json();
        return data;
    }

    // Display matching suggestions
    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';
        if (suggestions.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion.Name;  // Display stock name
            div.addEventListener('click', () => selectSuggestion(suggestion));
            suggestionsContainer.appendChild(div);
        });
        suggestionsContainer.style.display = 'block';
    }

    // Select a suggestion
    function selectSuggestion(suggestion) {
        input.value = suggestion.Name;
        suggestionsContainer.style.display = 'none'; // Hide suggestions after selection
    }

    // Handle the input event to trigger search
    input.addEventListener("input", async function () {
        const query = input.value.toLowerCase();
        if (query.length > 0) {
            const stockData = await fetchStockData();
            const filteredSuggestions = stockData.filter(item =>
                item.Name.toLowerCase().includes(query)
            );
            displaySuggestions(filteredSuggestions);
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Close suggestions if clicked outside
    document.addEventListener('click', function (e) {
        if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
});
