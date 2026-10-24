// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

async function fetchWeatherAlerts(state) {
  try {
    if (!state) {
      throw new Error('Please enter a state abbreviation.');
    }

    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    if (response.ok === false) {
      throw new Error('Could not fetch weather alerts for that state.');
    }

    const data = await response.json();
    console.log(data);

    displayAlerts(data);
    clearError();
  } catch (error) {
    console.log(error.message);
    displayError(error.message);
  }
}

function displayAlerts(data) {
  const display = document.getElementById('alerts-display');
  display.innerHTML = '';

  const summary = document.createElement('p');
  summary.textContent = `${data.title}: ${data.features.length}`;
  display.appendChild(summary);

  const list = document.createElement('ul');
  data.features.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert.properties.headline;
    list.appendChild(li);
  });
  display.appendChild(list);
}

function displayError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

function clearError() {
  const errorDiv = document.getElementById('error-message');

  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('fetch-alerts');
  const input = document.getElementById('state-input');
  if (!button || !input) return;

  button.addEventListener('click', () => {
    const state = input.value.trim();
    input.value = '';
    fetchWeatherAlerts(state);
  });
});

if (typeof module !== 'undefined') {
  module.exports = { fetchWeatherAlerts, displayAlerts, displayError, clearError };
}
