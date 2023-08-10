let host = "http://localhost:8081/api";
var i = 0;
// const app = angular.module("app", []);
var url =  "http://localhost:8081/api/files/images";
app.controller("list", list)
    .controller("create", formCreate)
   . controller("update", formUpdate)
   .controller("dataFileHandler", dataFileHandler);


//bảng danh sáchh
function list($scope, $http){
$scope.form = {};
$scope.items = [];
$scope.pageCount;
$scope.reset = () => {
    $scope.form = {};
};
$scope.load_all = () => {
    var url = `${host}/user`;

    $http ({
        method: "GET",
        url: url,

    }).then((resp) => {
        $scope.items = resp.data.filter((item) => item.admin === false);
        $scope.pageCount = Math.ceil($scope.items.length / 5);
        console.log("Success", resp);
    })
    .catch((error) => {
        console.log("Error", error);
      });
};
 // sap xep
 $scope.reverseSort = false;
 $scope.sortColumn = 'username';

 $scope.sortBy = (prop) => {
 $scope.reverseSort = ($scope.sortColumn === prop) ? !$scope.reverseSort : false;
 $scope.sortColumn = prop;
 };
 //edit
 $scope.formEdit = (username) => {
   // Lưu id vào session
   window.sessionStorage.setItem("editUs", username);
   // Chuyển hướng tới trang form cập nhật thông tin người dùng
    window.location.href = "/admin/user/update";
 };

//delete
$scope.delete = (username) => {
    var url = `${host}/user/${username}`;
    $http({
      method: "delete",
      url: url,
    })
    .then((resp) => {
      var index = $scope.items.findIndex((item) => item.username == username);
      $scope.items.splice(index, 1);
      $scope.reset();
      console.log("Success", resp);
      $scope.pageCount = Math.ceil($scope.items.length / 5);
    })
      .catch((error) => {
        console.log("Error", error);
      });
  };

//thực hiện
$scope.reset();
$scope.load_all();

$scope.begin = 0;
$scope.pageCount = Math.ceil($scope.items.length / 5);

//nút di chuyển
$scope.first = function () {
    $scope.begin = 0;
}
$scope.prev = function () {
    if ($scope.begin > 0) {
        $scope.begin -= 5;
    }
}
$scope.next = function () {
    if ($scope.begin < ($scope.pageCount - 1) * 5) {
        $scope.begin += 5;
    }
}
$scope.last = function () {
    $scope.begin = ($scope.pageCount - 1) * 5;
}
$scope.search = (keyword) => {
  if (keyword != "") {
    var url = `${host}/user/search/${keyword}`;
  } else {
    var url = `${host}/user`;
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
function formCreate($scope, $http){
  $scope.optionActive = [
    {
      value: true,
      name: "Hoạt động"
    },
    {
      value: false,
      name: "Ngừng hoạt động"
    }
  ]
  $scope.form = {
    active: true
  };
  $scope.items = [];
  $scope.create = () => {
   $scope.form.admin = false; // 
    var item = angular.copy($scope.form);
    var url = `${host}/user`;
    $http({
      method: "post",
      url: url,
      data: item,
    })
      .then((resp) => {
        $scope.form = resp.data;
        $scope.items.push(item);
        console.log("Success", resp);
        window.location.href = "/admin/user/list";
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  //hình ảnh
  $scope.url = function(filename){
    return `${url}/${filename}`;
  }
  $scope.list = function (){
    $http.get(url).then(resp => {
      $scope.filenames = resp.data;
    }).catch(error => {
      console.log("Errors", error);
    });
  }

  $scope.upload = function (files){
    var form = new FormData();
    for(var i = 0; i< files.length; i++){
      form.append("files", files[i]);
    }

    $http.post(url, form, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(resp => {
      $scope.filenames.push(...resp.data);
    }).catch(error => {
      console.log("Errors", error);
    });
  };

  $scope.delete = function (filename){
    $http.delete(`${url}/${filename}`).then(resp => {
      let i = $scope.filenames.findIndex(name => name == filename);
      $scope.filenames.splice(i, 1);
    }).catch(error => {
      console.log("Errors", error);
    });
  }
  $scope.list();
}
function formUpdate($scope, $http){ 
  $scope.optionActive = [
    {
      value: true,
      name: "Hoạt động"
    },
    {
      value: false,
      name: "Ngừng hoạt động"
    }
  ]
  $scope.form = {
    active:true
  };
  $scope.items = [];
  
  $scope.edit = (username) => {
      var url = `${host}/user/${username}`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.form = resp.data;
        console.log("Success_edit", resp);
      })
      .catch((error) => {
        console.log("Error_edit", error);
      });
      window.sessionStorage.removeItem("editUs");
  };
  // //cập nhật
$scope.update = () => {
  var item = angular.copy($scope.form);
  var url = `${host}/user/${$scope.form.username}`;
  $http({
    method: "put",
    url: url,
    data: item,
  })
    .then((resp) => {
      var index = $scope.items.findIndex(
        (item) => item.username == $scope.form.username
      );
      $scope.items[index] = resp.data;
      console.log("Success", resp);
      window.location.href = "/admin/user/list"
    })
    .catch((error) => {
      console.log("Error", error);
      if (error.status === 422) {
        alert("Người dùng đã tồn tại. Cập nhật thất bại.");
      } else {
        alert("Đã xảy ra lỗi khi cập nhật người dùng!.");
      }
    });
};
//xóa
$scope.delete = (username) => {
    var url = `${host}/user/${username}`;
//user
    $http({
      method: "delete",
      url: url,
    })
      .then((resp) => {
        var index = $scope.items.findIndex(
          (item) => item.username == $scope.form.username
        );
        $scope.items.splice(index, 1);
        $scope.form={};
        console.log("Success", resp);
        window.location.href = "/admin/user/list"
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  //hình ảnh
  $scope.url = function(filename){
    return `${url}/${filename}`;
  }
  $scope.list = function (){
    $http.get(url).then(resp => {
      $scope.filenames = resp.data;
    }).catch(error => {
      console.log("Errors", error);
    });
  }

  $scope.upload = function (files){
    var form = new FormData();
    for(var i = 0; i< files.length; i++){
      form.append("files", files[i]);
    }

    $http.post(url, form, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(resp => {
      $scope.filenames.push(...resp.data);
    }).catch(error => {
      console.log("Errors", error);
    });
  };

  $scope.delete = function (filename){
    $http.delete(`${url}/${filename}`).then(resp => {
      let i = $scope.filenames.findIndex(name => name == filename);
      $scope.filenames.splice(i, 1);
    }).catch(error => {
      console.log("Errors", error);
    });
  }
  $scope.list();
  const username = window.sessionStorage.getItem("editUs");
  $scope.edit(username)
}
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
        const worksheet = workbook.getWorksheet("user_data");
        if (!worksheet) {
          alert("Tên worksheet không đúng. Vui lòng sửa lại tên worksheet.");
          return;
        }
        worksheet.eachRow((row, index) => {
          if (index > 1) {
            let student = {
              username: row.getCell(1).value, // 1
              password: row.getCell(2).value,
              fullname: row.getCell(3).value, // 2
              phone: row.getCell(4).value,
              email: row.getCell(5).value,
              address: row.getCell(6).value,
              admin: row.getCell(7).value,
              active: row.getCell(8).value,
            };
            let url = `${host}/user`;
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
    var headers = ["USERNAME", "PASSWORD", "FULLNAME","PHONE","EMAIL","ADDRESS","ADMIN","ACTIVE"]; //1

    // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
    angular.forEach($scope.items, function (item) {
      var rowData = [item.username, item.password, item.fullname, item.phone, item.email, item.address, item.admin, item.active]; //2
      tableData.push(rowData);
    });

    // Tạo một đối tượng workbook mới
    var workbook = XLSX.utils.book_new();

    // Tạo một trang tính mới và gắn dữ liệu vào đó
    var worksheet = XLSX.utils.aoa_to_sheet([headers].concat(tableData));

    // Thêm trang tính vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "user_data"); // 3

    // Xuất file Excel
    var excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAsExcel(excelBuffer, "NguoiDung.xlsx");
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
    var headers = ["Tên người dùng", "Mật khẩu", "Họ và tên", "Số điện thoại", "Email", "Địa chỉ", "Chức vụ", "Hoạt động"]; //1

    // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
    angular.forEach($scope.items, function (item) {
      var rowData = [item.username, item.password, item.fullname, item.phone, item.email, item.address, item.admin, item.active]; //2
      tableData.push(rowData);
    });

    //
    var docDefinition = {
      content: [
        { text: "Danh sách người dùng", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"], //3 "auto", "auto",....
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
    pdfMake.createPdf(docDefinition).download("NguoiDung.pdf");
  }
  };
  // /PDF
}