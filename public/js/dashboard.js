document.addEventListener("DOMContentLoaded", () => {
  // for sidebar toggle
  document
    .getElementById("toggleSidebar")
    .addEventListener("click", function () {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("active");
    });

  // it will select all the inputs with the 'form-control datepicker' class
  const dateInputs = document.querySelectorAll('[data-datepicker="true"]');

  // Initialize Datepicker for each input
  dateInputs.forEach((input) => {
    new Datepicker(input, {
      autohide: true,
      format: "yyyy-mm-dd",
    });
  });

  let closeAlertEl = document.getElementById("closeAlert");
  if (closeAlertEl) {
    setTimeout(() => {
      let alert = new bootstrap.Alert(closeAlertEl);
      alert.close();
    }, 5000);
  }

  function updateTime() {
    const d = new Date();
    const currentTimeEl = document.getElementById("currentTime");

    if (currentTimeEl) {
      currentTimeEl.textContent = d.toLocaleTimeString();
    }
  }
  updateTime();
  setInterval(updateTime, 1000);

  const forms = document.querySelectorAll("#checkInForm,#checkOutForm");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      // console.log(form.id);

      const message =
        form.id === "checkInForm"
          ? "Are you sure you want to check-in?"
          : "Are you sure you want to check-out?";

      const userConformed = confirm(message);

      // It will only prevent the form when the user click on No button so the value will null means false, if clicked on the Yes then this will skip and form will submit
      if (!userConformed) {
        e.preventDefault();
      }
    });
  });

  new DataTable("#dataTable", {
    paging: true,
    searching: true,
    info: true,
    autoWidth: false,
    language: {
      emptyTable: "No data available in the table",
    },
    columnDefs: [
      {
        targets: "_all", // Apply this to all columns
        defaultContent: "", // Prevent errors for missing data
      },
    ],
  });
});
