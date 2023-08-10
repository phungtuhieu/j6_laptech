let host = "http://localhost:8081/api";
var i = 0;
// const app = angular.module("app", []);
app.controller("list", list)
    .controller("create", formCreate)
    .controller("update", formUpdate)
    .controller("dataFileHandler", dataFileHandler);

function list($scope, $http) {

    $scope.form = {};
    $scope.items = [];
    $scope.pageCount;
    $scope.reset = () => {
        $scope.form = {};
    };

    //load lữ liệu lên
    $scope.load_all = () => {
        var url = `${host}/screen-size`;

        $http({
            method: "GET",
            url: url,
        })
            .then((resp) => {
                $scope.items = resp.data;
                $scope.pageCount = Math.ceil($scope.items.length / 5);
                console.log("Success", resp);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    //sắp xếp
    $scope.reverseSort = false;
    $scope.sortColumn = "id";

    $scope.sortBy = (prop) => {
        $scope.reverseSort =
            $scope.sortColumn === prop ? !$scope.reverseSort : false;
        $scope.sortColumn = prop;
    };


    //edit
    $scope.formEdit = (id) => {
        // Lưu id vào session
        window.sessionStorage.setItem("editId", id);
        // Chuyển hướng tới trang form cập nhật thông tin người dùng
        window.location.href = "/admin/screen-size/update";
    };

    $scope.delete = (id) => {
        var url = `${host}/screen-size/${id}`;

        $http({
            method: "delete",
            url: url,
        })
            .then((resp) => {
                var index = $scope.items.findIndex((item) => item.id == id);
                $scope.items.splice(index, 1);
                $scope.reset();
                console.log("Success", resp);
                $scope.pageCount = Math.ceil($scope.items.length / 5);
            })
            .catch((error) => {
                console.log("Error", error);
                if (error.status === 422) {
                    alert(
                        "storage đã tồn tại. Cập nhật không thành công."
                    );
                } else {
                    alert("Đã xảy ra lỗi khi cập nhật.");
                }
            });
    };

    // thực hiện
    $scope.reset();
    $scope.load_all();

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
    //search
    $scope.search = (keyword) => {
        if (keyword != "") {
            var url = `${host}/screen-size/search/${keyword}`;
        } else {
            var url = `${host}/screen-size`;
        }
        $http({
            method: "GET",
            url: url,
        })
            .then((resp) => {
                $scope.items = resp.data;
                $scope.pageCount = Math.ceil($scope.items.length / 5);
                console.log("Search result", resp);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

}

function formCreate($scope, $http) {
    
    $scope.form = {};
    $scope.items = [];
    $scope.create = () => {
        var item = angular.copy($scope.form);
        var url = `${host}/screen-size`;
        $http({
            method: "post",
            url: url,
            data: item,
        })
            .then((resp) => {
                $scope.items.push(item);
                console.log("Success", resp);
                window.location.href = "/admin/screen-size/list";
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };
}

function formUpdate($scope, $http) {

    $scope.form = {
    };
    $scope.items = [];

    $scope.edit = (id) => {

        var url = `${host}/screen-size/${id}`;
        $http({
            method: "GET",
            url: url,
        })
            .then((resp) => {
                $scope.form = resp.data;
                console.log("Success", resp);
            })
            .catch((error) => {
                console.log("Error", error);
            });

        window.sessionStorage.removeItem("editId");
    };

    $scope.update = () => {
        var item = angular.copy($scope.form);
        var url = `${host}/screen-size/${$scope.form.id}`;
        $http({
            method: "put",
            url: url,
            data: item,
        })
            .then((resp) => {
                var index = $scope.items.findIndex(
                    (item) => item.id == $scope.form.id
                );
                $scope.items[index] = resp.data;
                console.log("Success", resp);
                window.location.href = "/admin/screen-size/list";
            })
            .catch((error) => {
                console.log("Error", error);
                if (error.status === 422) {
                    alert(
                        "Màn hình đã tồn tại trong sản phẩm. Cập nhật không thành công."
                    );
                } else {
                    alert("Đã xảy ra lỗi khi cập nhật.");
                }
            });
    };
    $scope.delete = (id) => {
        var url = `${host}/screen-size/${id}`;
        $http({
            method: "delete",
            url: url,
        })
            .then((resp) => {
                var index = $scope.items.findIndex((item) => item.id == $scope.form.id);
                $scope.items.splice(index, 1);
                $scope.form = {};
                console.log("Success", resp);
                window.location.href = "/admin/screen-size/list";
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };
    const id = window.sessionStorage.getItem("editId");
    $scope.edit(id);

}

//xuất file
function dataFileHandler($scope, $http) {
    //
    // Excel
    $scope.import = (files) => {
      var confirmImport = confirm("Bạn có muốn import file Excel?");
      if (confirmImport) {
        var reader = new FileReader();
        reader.onloadend = async () => {
          var workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(reader.result);
          const worksheet = workbook.getWorksheet("ScreenSize_data");
          if (!worksheet) {
            alert("Tên worksheet không đúng. Vui lòng sửa lại tên worksheet.");
            return;
          }
          worksheet.eachRow((row, index) => {
            if (index > 1) {
              let student = {
                size: row.getCell(1).value, // 1
                resolution: row.getCell(2).value,
                panelType: row.getCell(3).value, // 2
                touchScreen: row.getCell(4).value,
               
              };
              let url = `${host}/screen-size`;
              $http
                .post(url, student)
                .then((resp) => {
                  console.log("Success", resp.data);
                })
                .catch((error) => {
                  console.log("Error", error);
                });
  
              $scope.load_all();
            }
          });
        };
  
        reader.readAsArrayBuffer(files[0]);
      }
    };
  
    // Hàm xuất dữ liệu ra tập tin Excel
    $scope.export = () => {
      var confirmImport = confirm("Bạn có muốn export file Excel?");
      if (confirmImport) {
        var tableData = [];
        var headers = ["Kích thước", "Độ phân giải", "Loại màn hình", "Cảm ứng"]; //1
  
        // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
        angular.forEach($scope.items, function (item) {
          var rowData = [item.size, item.resolution, item.panelType, item.touchScreen]; //2
          tableData.push(rowData);
        });
  
        // Tạo một đối tượng workbook mới
        var workbook = XLSX.utils.book_new();
  
        // Tạo một trang tính mới và gắn dữ liệu vào đó
        var worksheet = XLSX.utils.aoa_to_sheet([headers].concat(tableData));
  
        // Thêm trang tính vào workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "ScreenSize_data"); // 3
  
        // Xuất file Excel
        var excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        saveAsExcel(excelBuffer, "ScreenSize.xlsx");
      }
    };
  
    // Hàm hỗ trợ lưu file Excel
    function saveAsExcel(buffer, filename) {
      var blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, filename);
    }
  
    // /Excel
  
    // PDF
    $scope.exportToPDF = function () {
      var confirmImport = confirm("Bạn có muốn export file PDF?");
      if (confirmImport) {
        var tableData = [];
        var headers =["Kích thước", "Độ phân giải", "Loại màn hình", "Cảm ứng"]; //1
  
        // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
        angular.forEach($scope.items, function (item) {
          var rowData = [item.type, item.capacity, item.manufacturer]; //2
          tableData.push(rowData);
        });
  
        //
        var docDefinition = {
          content: [
            { text: "Danh sách màn hình", style: "header" },
            {
              table: {
                headerRows: 1,
                widths: ["auto", "auto", "auto", "auto"], //3 "auto", "auto",....
                body: [headers].concat(tableData),
              },
              style: "table",
            },
          ],
          styles: {
            header: { fontSize: 20, bold: true, margin: [0, 0, 0, 10] },
            table: { margin: [0, 5, 0, 15], fontSize: 12 },
            tableHeader: { fillColor: "#FF0000", bold: true }, // In đậm tiêu đề
          },
        };
  
        // Xuất PDF
        pdfMake.createPdf(docDefinition).download("ScreenSize.pdf");
      }
    };
    // /PDF
  }
  

