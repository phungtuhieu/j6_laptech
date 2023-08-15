import { toastMixin, confirmationDialog } from "../global/custom-sweetalert.js";
let host = "http://localhost:8081/api";
// const app = angular.module("app", []);
app.controller("list", list).controller("dataFileHandler", dataFileHandler);

function list($scope, $http, $filter) {
  //

  $scope.isLoading = true;
  $scope.form = {};
  $scope.items = [];
  $scope.pageCount;
  $scope.reset = () => {
    $scope.form = {};
    $scope.startDate = "";
    $scope.endDate = "";
    $scope.MessageStartDate = "";
    $scope.MessageEndDate = "";
  };
  $scope.load_all = () => {
    var url = `${host}/favoriteProduct`;
    //var url = host+'/students.json';
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.items = resp.data;
        window.sessionStorage.setItem("items", JSON.stringify(resp.data));
        $scope.pageCount = Math.ceil($scope.items.length / 5);
        $scope.reset();
        console.log("Success1", resp);
        $scope.isLoading = false;
      })
      .catch((error) => {
        console.log("Error", error);
        $scope.isLoading = false;
      });
  };
  // sap xep
  $scope.reverseSort = false;
  $scope.sortColumn = "id";

  $scope.sortBy = (prop) => {
    $scope.reverseSort =
      $scope.sortColumn === prop ? !$scope.reverseSort : false;
    $scope.sortColumn = prop;
  };
  $scope.begin = 0;
  $scope.pageCount = Math.ceil($scope.items.length / 5);
  $scope.first = function () {
    $scope.begin = 0;
  };
  $scope.prev = function () {
    if ($scope.begin > 0) {
      $scope.begin -= 5;
    }
  };
  $scope.next = function () {
    if ($scope.begin < ($scope.pageCount - 1) * 5) {
      $scope.begin += 5;
    }
  };
  $scope.last = function () {
    $scope.begin = ($scope.pageCount - 1) * 5;
  };
  //

  //
  $scope.search = (name) => {
    if (name != "") {
      var url = `${host}/favoriteProduct/${name}`;
    } else {
      var url = `${host}/favoriteProduct`;
    }
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.items = resp.data;
        $scope.pageCount = Math.ceil($scope.items.length / 5);
        console.log("search", resp);
      })
      .catch((error) => {
        console.log("Error_edit", error);
      });
  };

  $scope.date = () => {
    const formattedStartDate = $filter("date")($scope.startDate, "yyyy-MM-dd");
    const formattedEndDate = $filter("date")($scope.endDate, "yyyy-MM-dd");

    var valid = true;

    if (!formattedStartDate) {
      $scope.MessageStartDate = "Vui lòng chọn từ ngày";
      $scope.showStartDate = true;
      valid = false;
    } else {
      $scope.MessageStartDate = "";
      $scope.showStartDate = false;
    }

    if (!formattedEndDate) {
      $scope.MessageEndDate = "Vui lòng chọn Đến ngày";
      $scope.showEndDate = true;
      valid = false;
    } else {
      $scope.MessageEndDate = "";
      $scope.showEndDate = false;
    }

    //
    if (formattedStartDate && formattedEndDate) {
      var fromDate = new Date(formattedStartDate);
      var toDate = new Date(formattedEndDate);

      if (fromDate > toDate) {
        $scope.MessageStartDate = "Từ ngày không được nhỏ hơn Đến ngày";
        $scope.MessageEndDate = "Đến ngày không được lớn hơn Từ ngày";
        $scope.showStartDate = true;
        $scope.showEndDate = true;
        valid = false;
      }
    }

    if (valid) {
      var url = `${host}/favoriteProduct/${formattedStartDate}/${formattedEndDate}`;
      $http({
        method: "GET",
        url: url,
      })
        .then((resp) => {
          $scope.items = resp.data;
          $scope.pageCount = Math.ceil($scope.items.length / 5);
          console.log("search", resp);
        })
        .catch((error) => {
          console.log("Error_edit", error);
        });
    }
  };

  $scope.load_year = () => {
    var url = `${host}/favoriteAllYear`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.years = resp.data;
        console.log("Success_year", resp);
        $scope.chartFavorite();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.load_year();

  $scope.load_chart = (year) => {
    var url = `${host}/favoriteChart/${year}`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.charts = resp.data;
        console.log("Success_chart", resp);
        $scope.chartFavorite();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.chartFavorite = () => {
    var newData = [];
    var countMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    countMonth.forEach((month) => {
      var existingData = $scope.charts.find((item) => item.month === month);
      if (existingData) {
        newData.push(existingData);
      } else {
        newData.push({
          month: month,
          count: 0,
        });
      }
    });

    $scope.charts = newData;
    var countArrays = $scope.charts.map((item) => item.count);
    console.log(countArrays);

    if ($scope.myChart) {
      $scope.myChart.destroy();
    }
    const ctx = document.getElementById("myChart").getContext("2d");

    const labels = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Số lượng",
          data: countArrays,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(205, 92, 92, 0.2)",
            "rgba(139, 69, 19, 0.2)",
            "rgba(0, 128, 0, 0.2)",
            "rgba(255, 165, 0, 0.2)",
            "rgba(128, 0, 128, 0.2)",
            "rgba(0, 128, 128, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 206, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
            "rgb(205, 92, 92)",
            "rgb(139, 69, 19)",
            "rgb(0, 128, 0)",
            "rgb(255, 165, 0)",
            "rgb(128, 0, 128)",
            "rgb(0, 128, 128)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                family: "Arial, sans-serif",
              },
            },
          },
        },
      },
    };

    $scope.myChart = new Chart(ctx, config);
  };


  
  if(!$scope.selectedYear){
    var currentYear = new Date().getFullYear();
    // alert(currentYear)
    $scope.selectedYear = '2023'
    $scope.load_chart(currentYear);
  }

  // 
  
  $scope.reset();
  $scope.load_all();
}

//
function dataFileHandler($scope, $http) {
  // Hàm xuất dữ liệu ra tập tin Excel
  $scope.export = () => {
    var tableData = [];
    var headers = [
      "TÊN SẢN PHẨM",
      "DANH MỤC",
      "SỐ LƯỢNG THÍCH",
      "NGÀY CŨ NHẤT",
      "NGÀY MỚI NHẤT",
    ];

    // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
    angular.forEach($scope.items, function (item) {
      var rowData = [
        item.name,
        item.categoryName,
        item.numberOfLikes,
        item.startDate,
        item.endDate,
      ];
      tableData.push(rowData);
    });

    // Tạo một đối tượng workbook mới
    var workbook = XLSX.utils.book_new();

    // Tạo một trang tính mới và gắn dữ liệu vào đó
    var worksheet = XLSX.utils.aoa_to_sheet([headers].concat(tableData));

    // Thêm trang tính vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "favoriteProduct_data");

    // Xuất file Excel
    var excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAsExcel(excelBuffer, "favoriteProduct.xlsx");
    toastMixin.fire({
      animation: true,
      icon: "success",
      title: "Export excel thành công",
    });
  };

  // Hàm hỗ trợ lưu file Excel
  function saveAsExcel(buffer, filename) {
    var blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, filename);
  }

  // /Excel

  // PDF
  $scope.exportToPDF = function () {
    var tableData = [];
    var headers = [
      "TÊN SẢN PHẨM",
      "DANH MỤC",
      "SỐ LƯỢNG THÍCH",
      "NGÀY CŨ NHẤT",
      "NGÀY MỚI NHẤT",
    ];

    // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
    angular.forEach($scope.items, function (item) {
      var rowData = [
        item.name,
        item.categoryName,
        item.numberOfLikes,
        item.startDate,
        item.endDate,
      ];
      tableData.push(rowData);
    });

    var columnWidths = [];

    var totalColumns = headers.length;
    var widthPercentage = 100 / totalColumns;
    for (var i = 0; i < totalColumns; i++) {
      columnWidths[i] = widthPercentage + "%";
    }

    var docDefinition = {
      content: [
        { text: "Danh sách hãng", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: columnWidths,
            body: [headers].concat(tableData),
          },
          style: "table",
        },
      ],
    };

    toastMixin.fire({
      animation: true,
      icon: "success",
      title: "Export PDF thành công",
    });
    // Xuất PDF
    pdfMake.createPdf(docDefinition).download("favoriteProduct.pdf");
  };
  // /PDF
}
