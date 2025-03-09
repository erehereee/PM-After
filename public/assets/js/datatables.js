const form = document.getElementById("reqdata");
const analyzeChart = document.getElementById("analyzeChart").getContext("2d");

let chartInstance = null;

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  try {
    const selectedOptions = [];
    document
      .querySelectorAll('input[name="value"]:checked')
      .forEach((checkbox) => {
        selectedOptions.push(checkbox.value);
      });

    const url = "http://localhost:5173/api/user/test";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: document.getElementById("tanggalmulai").value,
        endDate: document.getElementById("tanggalselesai").value,
        interval: document.getElementById("interval").value,
        select: selectedOptions,
      }),
    });

    if (!response.ok) {
      const results = await response.json();
      throw new Error(`${results.message}`);
    }

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("createModal")
    );
    modal.hide();

    const results = await response.json();
    const data = results.data;
    const columns = Object.keys(results.data[0]).map((keys) => ({
      title: keys,
      data: keys,
    }));

    if ($.fn.DataTable.isDataTable("#tabeldata")) {
      $("#tabeldata").DataTable().destroy();
      $("#tabeldata thead tr").empty();
    }

    await createChart(data);

    $("#tabeldata").DataTable({
      data: data,
      columns: columns,
      destroy: true,
      dom: "Bfrtip",
      buttons: [
        {
          extend: "csvHtml5",
          text: "Download CSV",
          title: "Data_Tabel",
          className: "btn btn-success",
        },
      ],
    });

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Data berhasil ditambahkan.",
      timer: 1000,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
      showConfirmButton: false,
    });
  }
});

async function createChart(data) {
  if (data.length === 0) return;

  const labels = data.map((e) => e.timestamp);

  const keys = Object.keys(data[0]).filter((key) => key !== "timestamp");

  const datasets = keys.map((e, i) => ({
    label: e.toUpperCase(),
    borderColor: `hsl(${i * 100}, 70%, 50%)`,
    pointBorderColor: `hsl(${i * 100}, 70%, 50%)`,
    pointBackgroundColor: `hsl(${i * 100}, 70%, 50%)`,
    pointBorderWidth: 2,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 1,
    pointRadius: 4,
    backgroundColor: "transparent",
    fill: true,
    borderWidth: 2,
    data: data.map((item) => item[e]),
  }));

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(analyzeChart, {
    type: "line",
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          mode: "nearest",
          intersect: false,
          padding: 10,
        },
      },
      layout: {
        padding: { left: 15, right: 15, top: 15, bottom: 15 },
      },
      scales: {
        x: { title: { display: true, text: "Timestamp" } },
        y: { title: { display: true, text: "Nilai Data" } },
      },
    },
  });
}
