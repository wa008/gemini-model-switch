chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleModel') {
    console.log('Gemini Model Switch: Received toggleModel message.');
    switcherButton = document.querySelector('.mdc-button.mat-mdc-button-base.gds-mode-switch-button.logo-pill-btn.mdc-button--unelevated.mat-mdc-unelevated-button.mat-unthemed.ng-star-inserted');
    if (switcherButton === null) {
      console.log('Secondly try to get switch button'); // seems for gemini free users
      switcherButton = document.querySelector('.mdc-button.mat-mdc-button-base.input-area-switch.mat-mdc-button.mat-unthemed.ng-star-inserted');
    }
    if (switcherButton) {
      console.log('Gemini Model Switch: Clicking switcher button.');
      switcherButton.click();

      setTimeout(() => {
        const buttons = Array.from(document.querySelectorAll('.mat-mdc-menu-item.mat-focus-indicator.bard-mode-list-button')).slice(0, 2);
        console.log(`Gemini Model Switch: Found ${buttons.length} buttons.`);

        if (buttons.length === 2) {
          const selectedButtonIndex = buttons.findIndex(button => button.querySelector('[fonticon="check_circle"]'));

          if (selectedButtonIndex !== -1) {
            const otherButtonIndex = 1 - selectedButtonIndex;
            console.log(`Gemini Model Switch: Clicking button ${otherButtonIndex}.`);
            buttons[otherButtonIndex].click();
          }
          else {
            console.log(`cannot find selectedButtonIndex, selectedButtonIndex: ${selectedButtonIndex}`);
          }
        }
      }, 10); // Wait for 10ms for the buttons to appear
    }
  }
});