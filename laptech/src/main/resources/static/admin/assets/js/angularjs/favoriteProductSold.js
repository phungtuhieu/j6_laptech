import { toastMixin, confirmationDialog } from "../global/custom-sweetalert.js";
let host = "http://localhost:8081/api";
// const app = angular.module("app", []);
app
  .controller("list", list)
  .controller("dataFileHandler", dataFileHandler)
  .filter('formatCurrency', function () {
    return function (input) {
        // Chuyển đổi số tiền thành tiền Việt Nam
        var formattedPrice = input.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return formattedPrice;
    };
});

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
    
    var url = `${host}/ProductSold`;
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
      var url = `${host}/ProductSold/${name}`;
    } else {
      var url = `${host}/ProductSold`;
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
      

      // In kết quả
      console.log(formattedStartDate);
      console.log(formattedEndDate);
   

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
      var url = `${host}/ProductSold/${formattedStartDate}/${formattedEndDate}`;
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

  // thực hiện
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
      "SỐ LƯỢNG SẢN PHẨM",
      "NGÀY BÁN",
      "TỔNG TIỀN",
    ];

    // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
    angular.forEach($scope.items, function (item) {
      var rowData = [
        item.name,
        item.saleDate,
        item.quantity,
        item.totalPrice,
      ];
      tableData.push(rowData);
    });

    // Tạo một đối tượng workbook mới
    var workbook = XLSX.utils.book_new();

    // Tạo một trang tính mới và gắn dữ liệu vào đó
    var worksheet = XLSX.utils.aoa_to_sheet([headers].concat(tableData));

    // Thêm trang tính vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "ProductSold_data");

    // Xuất file Excel
    var excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAsExcel(excelBuffer, "ProductSold.xlsx");
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
      "SỐ LƯỢNG SẢN PHẨM",
      "NGÀY BÁN",
      "TỔNG TIỀN",
    ];

    // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
    angular.forEach($scope.items, function (item) {
      var rowData = [
        item.name,
        item.saleDate,
        item.quantity,
        item.totalPrice,
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
    pdfMake.createPdf(docDefinition).download("ProductSold.pdf");
  };
  // /PDF
}
