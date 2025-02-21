const socketList = io("ws://172.25.192.50:1881/");

let dataList = [];
let table;
let currentPage = 0;

$(document).ready(function () {
  table = $("#tabledata").DataTable({
    responsive: true,
    stateSave: true,
    pageLength: 5,
    lengthMenu: [5],
    columns: [
      { data: "keys", className: "text-center align-middle" },
      { data: "values", className: "text-center align-middle" },
    ],
  });
});

socketList.on("dataAI", (data) => {
  currentPage = table.page();

  dataList = Object.entries(data).map(([keys, values]) => ({
    keys,
    values: typeof values === "number" ? values.toFixed(2) : values,
  }));

  table.clear();
  table.rows.add(dataList).draw();

  table.page(currentPage).draw(false);
});
