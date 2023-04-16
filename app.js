$(document).ready(function () {
  const tables = document.querySelectorAll(".score-table");
  let timeout;

  console.log(`Found ${tables.length} score tables.`);

  tables.forEach((table) => {
    console.log("Setting up table...");

    // Add table header with editable column names
    const header = table.createTHead().insertRow();
    header.insertCell(); // Empty cell for the top-left corner

    for (let i = 0; i < 5; i++) {
      const cell = header.insertCell();
      const input = document.createElement("input");
      input.type = "text";
      input.value = `Round ${i + 1}`;
      cell.appendChild(input);
    }

    for (let i = 0; i < 4; i++) {
      const row = table.insertRow();

      // Add editable row name
      const rowNameCell = row.insertCell();
      const input = document.createElement("input");
      input.type = "text";
      input.value = i === 0 ? "Primary" : `Row ${i}`;
      rowNameCell.appendChild(input);

      for (let j = 0; j < 5; j++) {
        const cell = row.insertCell();

        // Create wrapper element for number input and arrow buttons
        const wrapper = document.createElement("div");
        wrapper.classList.add("number-input-wrapper");
        cell.appendChild(wrapper);

        // Create number input
        const input = document.createElement("input");
        input.type = "number";
        input.value = 0;
        wrapper.appendChild(input);

        // Create up arrow button
        const arrowUp = document.createElement("button");
        arrowUp.classList.add("arrow", "arrow-up");
        arrowUp.innerHTML = "&#9650;";
        arrowUp.tabIndex = -1;
        wrapper.appendChild(arrowUp);

        // Create down arrow button
        const arrowDown = document.createElement("button");
        arrowDown.classList.add("arrow", "arrow-down");
        arrowDown.innerHTML = "&#9660;";
        arrowDown.tabIndex = -1;
        wrapper.appendChild(arrowDown);
      }
    }
  });

  document.querySelectorAll(".arrow").forEach((arrow) => {
    arrow.addEventListener("click", (event) => {
      event.preventDefault();

      const input = arrow.parentElement.querySelector("input[type='number']");
      const currentValue = parseInt(input.value, 10);
      const step = arrow.classList.contains("arrow-up") ? 1 : -1;
      input.value = currentValue + step;
    });
  });

  const playBtn = document.getElementById("play-btn");

  playBtn.addEventListener("mousedown", function () {
    clearInterval(timeout); // clear any previous intervals
    timeout = setInterval(function () {
      const cs = $("html, body").scrollTop();
      $("html, body").scrollTop(cs + 1);
    }, 10);

    return false;
  });

  playBtn.addEventListener("mouseup", function () {
    clearInterval(timeout);
    return false;
  });

  $("a[href*='#']").on("click", function (e) {
    e.preventDefault();

    $("html, body").animate(
      { scrollTop: $($(this).attr("href")).offset().top },
      500,
      "linear"
    );
  });

  $("h1").on("click", function () {
    $("html, body").animate({ scrollTop: $(document).height() }, 500, "linear");
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  function setupTimers() {
    const startButtons = document.querySelectorAll(".timer-start");
    const stopButtons = document.querySelectorAll(".timer-stop");
    const displayElements = document.querySelectorAll(".timer-display");

    startButtons.forEach((startButton, index) => {
      startButton.addEventListener("click", () => {
        const displayElement = displayElements[index];
        let timeElapsed = 0;
        displayElement.dataset.intervalId = setInterval(() => {
          timeElapsed += 1;
          displayElement.textContent = formatTime(timeElapsed);
        }, 1000);
      });
    });

    stopButtons.forEach((stopButton, index) => {
      stopButton.addEventListener("click", () => {
        const displayElement = displayElements[index];
        clearInterval(displayElement.dataset.intervalId);
      });
    });
  }
  setupTimers();
  function calculateTotalVictoryPoints(table) {
    let total = 0;
    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
      const input1 = row.cells[1].querySelector("input[type='number']");
      const input2 = row.cells[2].querySelector("input[type='number']");
      const input3 = row.cells[3].querySelector("input[type='number']");
      const input4 = row.cells[4].querySelector("input[type='number']");
      const input5 = row.cells[5].querySelector("input[type='number']");
      total += parseInt(input1.value, 10);
      total += parseInt(input2.value, 10);
      total += parseInt(input3.value, 10);
      total += parseInt(input4.value, 10);
      total += parseInt(input5.value, 10);
    }
    return total;
  }

  const tableVP = document.querySelectorAll(".score-table");
  const totalPointsInputs = document.querySelectorAll("#total-victory-points");

  arrow = document.querySelectorAll(".arrow");
  arrow.forEach((arr) => {
    arr.addEventListener("click", () => {
      const total1 = calculateTotalVictoryPoints(tableVP[0]);
      totalPointsInputs[0].value = total1;
      const total2 = calculateTotalVictoryPoints(tableVP[1]);
      totalPointsInputs[1].value = total2;
    });
  });
  function parseTime(timeString) {
    const [hours, minutes] = timeString.split(":").map((t) => parseInt(t, 10));
    return hours * 60 * 60 + minutes * 60;
  }

  function setupTimers() {
    const startButtons = document.querySelectorAll(".timer-start");
    const stopButtons = document.querySelectorAll(".timer-stop");
    const displayElements = document.querySelectorAll(".timer-display");

    startButtons.forEach((startButton, index) => {
      startButton.addEventListener("click", () => {
        const displayElement = displayElements[index];
        let timeRemaining = parseTime(displayElement.value);
        clearInterval(displayElement.dataset.intervalId);
        displayElement.dataset.intervalId = setInterval(() => {
          timeRemaining -= 1;

          if (timeRemaining >= 0) {
            displayElement.value = formatTime(timeRemaining);
          } else {
            clearInterval(displayElement.dataset.intervalId);
          }
        }, 1000);
      });
    });

    stopButtons.forEach((stopButton, index) => {
      stopButton.addEventListener("click", () => {
        const displayElement = displayElements[index];
        clearInterval(displayElement.dataset.intervalId);
      });
    });
  }

  // Set maxlength for row name input fields
  document
    .querySelectorAll(".score-table input[type='text']")
    .forEach((input) => {
      input.setAttribute("maxlength", "256");
    });

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours
      .toString()
      .padStart(
        2,
        "0"
      )}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  function parseTime(timeString) {
    const [hours, minutes, seconds] = timeString
      .split(":")
      .map((t) => parseInt(t, 10));
    return hours * 3600 + minutes * 60 + seconds;
  }
});
