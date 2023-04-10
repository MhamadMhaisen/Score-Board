$(document).ready(function () {
  const tables = document.querySelectorAll(".score-table");
  console.log(`Found ${tables.length} score tables.`);

  tables.forEach((table) => {
    console.log("Setting up table...");

    // Add table header with editable column names
    const header = table.createTHead().insertRow();
    header.insertCell(); // Empty cell for the top-left corner

    for (let i = 0; i < 6; i++) {
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

      for (let j = 0; j < 6; j++) {
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
});
