function enableAutoclicker() {
  const AUTOCLICKER_INTERVAL_MS = 100;

  const existingStatusElem = document.querySelector('.autoclicker-status');

  if (existingStatusElem) existingStatusElem.remove();

  const autoclickerIntervalId = { current: null };

  const autoclickerStatusElem = document.createElement('div');

  function startAutoclicker() {
    autoclickerIntervalId.current = setInterval(() => {
      if (App.game.party.caughtPokemon.length === 0) {
        autoclickerStatusElem.textContent = `Auto-clicker enabled, awaiting first catch...`;

        return;
      }
      
      if (App.game.gameState === GameConstants.GameState.fighting) {
        Battle.clickAttack();

        autoclickerStatusElem.textContent = `Auto-clicker enabled at ${AUTOCLICKER_INTERVAL_MS}ms.`;
      }
    }, AUTOCLICKER_INTERVAL_MS);

  }

  function stopAutoclicker() {
    if (autoclickerIntervalId.current) clearInterval(autoclickerIntervalId.current);
    autoclickerIntervalId.current = null;

    autoclickerStatusElem.textContent = 'Auto-clicker disabled. Click here to enable.';
  }

  autoclickerStatusElem.classList.add('autoclicker-status');
  
  autoclickerStatusElem.onclick = () => {
    if (autoclickerIntervalId.current === null) {
      startAutoclicker();
    } else {
      stopAutoclicker();
    }
  };

  document.body.appendChild(autoclickerStatusElem);

  stopAutoclicker();
}

(() => {
  console.info('Pokeclicker Speedrun Tools enabled.');

  enableAutoclicker();
})();