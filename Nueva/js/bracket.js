document.getElementById('generate').addEventListener('click', () => {
    const input = document.getElementById('participants').value.trim();
    const participants = input.split('\n').filter(name => name.trim() !== '');

    if (participants.length < 2) {
        alert('Please enter at least 2 participants.');
        return;
    }

    // Generate the bracket
    let currentRound = participants;
    const bracketContainer = document.getElementById('bracket-container');
    bracketContainer.innerHTML = '';

    while (currentRound.length > 1) {
        const nextRound = [];
        const roundDiv = document.createElement('div');
        roundDiv.className = 'row my-3 justify-content-center';

        for (let i = 0; i < currentRound.length; i += 2) {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'col-md-3 col-sm-6 text-center p-2';

            const player1 = currentRound[i];
            const player2 = currentRound[i + 1] || 'Bye';

            matchDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <p>${player1}</p>
                        <p>vs</p>
                        <p>${player2}</p>
                    </div>
                </div>
            `;

            roundDiv.appendChild(matchDiv);
            if (player2 !== 'Bye') nextRound.push(`Winner of ${player1} vs ${player2}`);
            else nextRound.push(player1);
        }

        bracketContainer.appendChild(roundDiv);
        currentRound = nextRound;
    }

    // Display the winner
    if (currentRound.length === 1) {
        const winnerDiv = document.createElement('div');
        winnerDiv.className = 'alert alert-success text-center mt-4';
        winnerDiv.innerText = `Winner: ${currentRound[0]}`;
        bracketContainer.appendChild(winnerDiv);
    }
});
