import { toastMixin, confirmationDialog } from "../global/custom-sweetalert.js";
let host = "http://localhost:8081/api";

function APICountry1($http) {
  var url = `${host}/brand/countries`;
  return $http({
    method: "GET",
    url: url,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

const app = angular.module("app", []);
app
  .controller("list", list)
  .controller("create", formCreate)
  .controller("update", formUpdate)
  .controller("dataFileHandler", dataFileHandler);

function list($scope, $http) {
  //
  $scope.form = {};
  $scope.items = [];
  $scope.pageCount;
  $scope.reset = () => {
    $scope.form = {};
  };
  $scope.load_all = () => {
    var url = `${host}/brand`;
    //var url = host+'/students.json';
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.items = resp.data;
        window.sessionStorage.setItem("items", JSON.stringify(resp.data));
        $scope.pageCount = Math.ceil($scope.items.length / 5);
        console.log("Success1", resp);
      })
      .catch((error) => {
        console.log("Error", error);
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
  $scope.formEdit = (id) => {
    // Lưu id vào session
    window.sessionStorage.setItem("editId", id);
  };
  $scope.delete = (id) => {
    confirmationDialog(
      "Xác nhận xóa?",
      "Bạn có chắc chắn muốn xóa dữ liệu?",
      "warning",
      "Xóa",
      "Hủy"
    ).then((result) => {
      if (result.isConfirmed) {
        var url = `${host}/brand/${id}`;
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
            toastMixin.fire({
              animation: true,
              icon: "success",
              title: "Xóa thành công",
            });
          })
          .catch((error) => {
            console.log("Error", error);
            toastMixin.fire({
              animation: true,
              icon: "error",
              title:
                "Hãng đã tồn tại trong sản phẩm. Cập nhật không thành công.",
              position: "top",
              width: 600,
            });
          });
      }
    });
  };
  //
  $scope.search = (name) => {
    if (name != "") {
      var url = `${host}/brand/search/${name}`;
    } else {
      var url = `${host}/brand`;
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

  $scope.check = () => {
    const name = window.sessionStorage.getItem("name");

    if (name == "create") {
      toastMixin.fire({
        animation: true,
        icon: "success",
        title: "Thêm thành công",
      });
      window.sessionStorage.removeItem("name");
    } else if (name == "update") {
      toastMixin.fire({
        animation: true,
        icon: "success",
        title: "Sửa thành công",
      });
      window.sessionStorage.removeItem("name");
    } else if (name == "delete") {
      toastMixin.fire({
        animation: true,
        icon: "success",
        title: "Xóa thành công",
      });
      window.sessionStorage.removeItem("name");
    }
  };

  // thực hiện
  $scope.reset();
  $scope.load_all();
  $scope.check();
}
function formCreate($scope, $http) {
  APICountry1($http).then((data) => {
    $scope.optionCountry = data;
    console.log("Dữ liệu từ API:", data);
  });
  //
  $scope.form = { country: "VN" };
  $scope.items = [];

  $scope.uploadName = (files) => {
    return ($scope.form.logo = files[0].name);
  };

  $scope.create = () => {
    if (validation($scope, $scope.form)) {
      if (validationCreate($scope.form)) {
        confirmationDialog(
          "Xác nhận thêm?",
          "Bạn có chắc chắn muốn thêm dữ liệu?",
          "question",
          "Thêm",
          "Hủy"
        ).then((result) => {
          if (result.isConfirmed) {
            $scope.form.website = "https://www." + $scope.form.website;
            var item = angular.copy($scope.form);
            var url = `${host}/brand`;
            $http({
              method: "post",
              url: url,
              data: item,
            })
              .then((resp) => {
                $scope.items.push(item);
                console.log("Success", resp);
                window.location.href = "/admin/brand/list";
                window.sessionStorage.setItem("name", "create");
              })
              .catch((error) => {
                console.log("Error", error);
              });
          }
        });
      }
    }
  };
}
function formUpdate($scope, $http) {
  APICountry1($http).then((data) => {
    $scope.optionCountry = data;
    console.log("Dữ liệu từ API:", data);
  });
  //
  $scope.isLoading = true;
  $scope.form = {};
  $scope.items = [];
  $scope.edit = (id) => {
    var url = `${host}/brand/${id}`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.form = resp.data;
        console.log("Success_edit", resp);
        $scope.isLoading = false;
      })
      .catch((error) => {
        console.log("Error_edit", error);
      });
    window.sessionStorage.removeItem("editId");
  };

  $scope.update = () => {
    if (validation($scope, $scope.form)) {
      confirmationDialog(
        "Xác nhận sửa?",
        "Bạn có chắc chắn muốn sửa dữ liệu?",
        "question",
        "Sửa",
        "Hủy"
      ).then((result) => {
        if (result.isConfirmed) {
          var item = angular.copy($scope.form);
          var url = `${host}/brand/${$scope.form.id}`;
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
              window.location.href = "/admin/brand/list";
              window.sessionStorage.setItem("name", "update");
            })
            .catch((error) => {
              console.log("Error", error);
            });
        }
      });
    }
  };
  $scope.delete = (id) => {
    confirmationDialog(
      "Xác nhận xóa?",
      "Bạn có chắc chắn muốn xóa dữ liệu?",
      "warning",
      "Xóa",
      "Hủy"
    ).then((result) => {
      if (result.isConfirmed) {
        var url = `${host}/brand/${id}`;
        //var url = host+'/students.json';
        $http({
          method: "delete",
          url: url,
        })
          .then((resp) => {
            var index = $scope.items.findIndex(
              (item) => item.id == $scope.form.id
            );
            $scope.items.splice(index, 1);
            $scope.form = {};
            console.log("Success", resp);
            window.location.href = "/admin/brand/list";
            window.sessionStorage.setItem("name", "delete");
          })
          .catch((error) => {
            console.log("Error", error);
            toastMixin.fire({
              animation: true,
              icon: "error",
              title:
                "Hãng đã tồn tại trong sản phẩm. Cập nhật không thành công.",
              position: "top",
              width: 600,
            });
          });
      }
    });
  };
  const id = window.sessionStorage.getItem("editId");
  $scope.edit(id);
}
function dataFileHandler($scope, $http) {
  //
  // Excel
  $scope.import = (files) => {
    var reader = new FileReader();
    reader.onloadend = async () => {
      var workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(reader.result);
      const worksheet = workbook.getWorksheet("brand_data");
      if (!worksheet) {
        toastMixin.fire({
          animation: true,
          icon: "error",
          title: "Tên worksheet không đúng. Vui lòng sửa lại tên worksheet.",
          position: "top",
          width: 600,
        });
        return;
      }
      let importSuccess = true;
      worksheet.eachRow((row, index) => {
        if (index > 1) {
          let student = {
            id: row.getCell(1).value,
            name: row.getCell(2).value,
            logo: row.getCell(3).value,
            email: row.getCell(4).value,
            phone: row.getCell(5).value,
            website: row.getCell(6).value,
            country: row.getCell(7).value,
            description: row.getCell(8).value,
          };
          let url = `${host}/brand`;
          $http
            .post(url, student)
            .then((resp) => {
              console.log("Success", resp.data);
            })
            .catch((error) => {
              console.log("Error", error);
              let importSuccess = false;
            });

          $scope.load_all();
        }
      });
      if (importSuccess) {
        $scope.load_all();
        toastMixin.fire({
          animation: true,
          icon: "success",
          title: "Import Excel thành công",
        });
      } else {
        toastMixin.fire({
          animation: true,
          icon: "error",
          title: "Import Excel thất bại. Vui lòng kiểm tra lại.",
        });
      }
    };

    reader.readAsArrayBuffer(files[0]);
  };

  // Hàm xuất dữ liệu ra tập tin Excel
  $scope.export = () => {
    var tableData = [];
    var headers = [
      "ID",
      "NAME",
      "LOGO",
      "EMAIL",
      "PHONE",
      "WEBSITE",
      "COUNTRY",
      "DESCRIPTION",
    ];

    // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
    angular.forEach($scope.items, function (item) {
      var rowData = [
        item.id,
        item.name,
        item.logo,
        item.email,
        item.phone,
        item.website,
        item.country,
        item.description,
      ];
      tableData.push(rowData);
    });

    // Tạo một đối tượng workbook mới
    var workbook = XLSX.utils.book_new();

    // Tạo một trang tính mới và gắn dữ liệu vào đó
    var worksheet = XLSX.utils.aoa_to_sheet([headers].concat(tableData));

    // Thêm trang tính vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "brand_data");

    // Xuất file Excel
    var excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAsExcel(excelBuffer, "brand.xlsx");
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
      "ID",
      "NAME",
      "LOGO",
      "EMAIL",
      "PHONE",
      "WEBSITE",
      "COUNTRY",
      "DESCRIPTION",
    ];

    // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
    angular.forEach($scope.items, function (item) {
      var rowData = [
        item.id,
        item.name,
        item.logo,
        item.email,
        item.phone,
        item.website,
        item.country,
        item.description,
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
      title: "Import PDF thành công",
    });
    // Xuất PDF
    pdfMake.createPdf(docDefinition).download("brand.pdf");
  };
  // /PDF
}
//
function validation($scope, item) {
  var kyTuDacBietTen = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  var regexEmail =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
  var regexPhoneNumber = /^(09|03|08|05)\d{8}$/;
  const domainRegex = /^(https:\/\/www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  var chu =
    /^[a-zA-Z\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]*$/;
  var valid = true;
  //name
  if (!item.name) {
    $scope.MessageName = "Không để rỗng tên hãng";
    $scope.showName = true;
    valid = false;
  } else if (kyTuDacBietTen.test(item.name)) {
    $scope.MessageName = "Không được chứa ký tự đặc biệt trong tên hãng";
    $scope.showName = true;
    valid = false;
  } else if (!chu.test(item.name)) {
    $scope.MessageName = "Không để số tên hãng";
    $scope.showName = true;
    valid = false;
  } else {
    $scope.MessageName = "";
    $scope.showName = false;
  }

  if (!item.logo) {
    $scope.MessageLogo = "Chọn ảnh hãng";
    $scope.showLogo = true;
    valid = false;
  } else {
    $scope.MessageLogo = "";
    $scope.showLogo = false;
  }
  //email
  if (!item.email) {
    $scope.MessageEmail = "Không để rỗng email";
    $scope.showEmail = true;
    valid = false;
  } else if (!regexEmail.test(item.email)) {
    $scope.MessageEmail = "Email không đúng địng dạng";
    $scope.showEmail = true;
    valid = false;
  } else {
    $scope.MessageEmail = "";
    $scope.showEmail = false;
  }

  //phone
  if (!item.phone) {
    $scope.MessagePhone = "Không để rỗng phone";
    $scope.showPhone = true;
    valid = false;
  } else if (isNaN(item.phone)) {
    $scope.MessagePhone = "Nhập số cho số điện thoại";
    $scope.showPhone = true;
    valid = false;
  } else if (!regexPhoneNumber.test(item.phone)) {
    $scope.MessagePhone = "Số điện thoại không đúng địng dạng ";
    $scope.showPhone = true;
    valid = false;
  } else {
    $scope.MessagePhone = "";
    $scope.showPhone = false;
  }
  //website
  if (!item.website) {
    $scope.MessageWebsite = "Không để rỗng website";
    $scope.showWebsite = true;
    valid = false;
  } else if (!domainRegex.test(item.website)) {
    $scope.MessageWebsite =
      "Tên      website không đúng địng dạng VD: website.com ";
    $scope.showWebsite = true;
    valid = false;
  } else {
    $scope.MessageWebsite = "";
    $scope.showWebsite = false;
  }

  if (kyTuDacBietTen.test(item.description)) {
    $scope.MessageDescription = "Không được chứa ký tự đặc biệt trong mô tả";
    $scope.showDescription = true;
    valid = false;
  } else {
    $scope.MessageDescription = "";
    $scope.showDescription = false;
  }

  return valid;
}
function validationCreate(item) {
  const items = JSON.parse(window.sessionStorage.getItem("items"));
  var index = items.findIndex(
    (items) =>
      items.name.toLowerCase().replace(/\s+/g, "") ===
        item.name.toLowerCase().replace(/\s+/g, "") &&
      items.website === "https://www." + item.website &&
      items.country === item.country
  );
  if (index !== -1) {
    toastMixin.fire({
      animation: true,
      icon: "error",
      title: "Tên danh mục đã tồn tại",
      position: "top",
      width: 600,
    });
    return false;
  }
  return true;
}
