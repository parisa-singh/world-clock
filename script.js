// Function to update the clock
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour format
    hours = hours % 12 || 12;
  
    // Update the clock display
    clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  }
  
  // Function to toggle dark mode
  function toggleDarkMode() {
    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle');
    body.classList.toggle('dark-mode');
  
    // Update button emoji based on the current mode
    if (body.classList.contains('dark-mode')) {
      themeToggleButton.textContent = '⏾'; // Moon emoji for dark mode
    } else {
      themeToggleButton.textContent = '☀︎'; // Sun emoji for light mode
    }
  }
  
// Function to get timezone abbreviation (e.g., GMT, IST)
function getTimezoneAbbreviation(date, timezone) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'short',
    })
        .formatToParts(date)
        .find((part) => part.type === 'timeZoneName').value;
}

// Function to get the location/country name from the timezone
function getLocationFromTimezone(timezone) {
    // Extract the location/country from the timezone string
    const parts = timezone.split('/');
    return parts[parts.length - 1].replace(/_/g, ' ');
}

// Function to toggle the timezone table
function toggleTimezoneTable() {
    const timezoneTable = document.getElementById('timezone-table');
    const clockContainer = document.querySelector('.clock-container');
    const clock = document.getElementById('clock');

    if (timezoneTable.style.display === 'none' || !timezoneTable.style.display) {
        timezoneTable.style.display = 'block'; // Show table
        clockContainer.style.transform = 'translateY(-50px)'; // Shift clock up
        clock.style.marginBottom = '10px'; // Reduce spacing below the clock
    } else {
        timezoneTable.style.display = 'none'; // Hide table
        clockContainer.style.transform = 'translateY(0)'; // Reset clock position
        clock.style.marginBottom = '20px'; // Restore spacing below the clock
    }
    updateTimezoneTable(); // Update the table with current times
}

// Function to update the timezone table
function updateTimezoneTable() {
    const timezones = Intl.supportedValuesOf('timeZone'); // Get all valid timezones
    const timezoneTableBody = document.getElementById('timezone-table-body');
    timezoneTableBody.innerHTML = ''; // Clear existing rows

    timezones.forEach(timezone => {
        const row = document.createElement('tr');
        const timezoneCell = document.createElement('td');
        const locationCell = document.createElement('td');
        const abbreviationCell = document.createElement('td');
        const timeCell = document.createElement('td');

        const now = new Date(); // Get the current date and time
        const timeString = now.toLocaleTimeString('en-US', { timeZone: timezone });
        const abbreviation = getTimezoneAbbreviation(now, timezone);
        const location = getLocationFromTimezone(timezone);

        timezoneCell.textContent = timezone;
        locationCell.textContent = location;
        abbreviationCell.textContent = abbreviation;
        timeCell.textContent = timeString;

        row.appendChild(timezoneCell);
        row.appendChild(locationCell);
        row.appendChild(abbreviationCell);
        row.appendChild(timeCell);
        timezoneTableBody.appendChild(row);
    });
}

// Function to toggle the timezone table
function toggleTimezoneTable() {
    const timezoneTable = document.getElementById('timezone-table');
    if (timezoneTable.style.display === 'none' || !timezoneTable.style.display) {
        timezoneTable.style.display = 'block'; // Show table
        updateTimezoneTable(); // Update the table with current times
    } else {
        timezoneTable.style.display = 'none'; // Hide table
    }
}
  
  // Event listeners
  document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
  document.getElementById('menu-button').addEventListener('click', toggleTimezoneTable);
  
  // Update the clock every second
  setInterval(updateClock, 1000);
  
  // Update the timezone table every second (if visible)
setInterval(() => {
    const timezoneTable = document.getElementById('timezone-table');
    if (timezoneTable.style.display === 'block') {
        updateTimezoneTable();
    }
}, 1000);

  // Initialize the clock immediately
  updateClock();