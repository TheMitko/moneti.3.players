document.addEventListener("DOMContentLoaded", function() {
    const countrySelectionDiv = document.getElementById("country-selection");
    const currentPlayerDiv = document.getElementById("current-player");
    const countryButtons = document.querySelectorAll(".country-btn");

    // Зареждане на запазените данни за играта
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    const playerNames = gameData.playerNames || [];

    let currentPlayer = 1;
    const playersCountries = {
        1: [],
        2: [],
        3: []
    };
    const maxCountries = 9; // Changed to 9 countries total
    const allCountries = Array.from(countryButtons).map(button => button.getAttribute("data-country"));

    function updateCurrentPlayer() {
        const playerName = playerNames[currentPlayer - 1] || `играч ${currentPlayer}`;
        currentPlayerDiv.textContent = `Ред на ${playerName} да избере държава`;
    }

    countryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const country = button.getAttribute("data-country");
            playersCountries[currentPlayer].push(country);
            button.disabled = true;
            button.classList.add("selected");

            // Update to cycle between 3 players
            currentPlayer = currentPlayer === 3 ? 1 : currentPlayer + 1;
            updateCurrentPlayer();

            // Check if 9 countries have been selected
            const totalSelectedCountries = playersCountries[1].length + 
                                        playersCountries[2].length + 
                                        playersCountries[3].length;
            
            if (totalSelectedCountries === maxCountries) {
                localStorage.setItem("playersCountries", JSON.stringify(playersCountries));
                alert("Всички държави са избрани!");
                window.location.href = "game_europe_3.html";
            }
        });
    });

    // Показване на интерфейса за избор на държави
    countrySelectionDiv.classList.remove("hidden");
    updateCurrentPlayer();
});
