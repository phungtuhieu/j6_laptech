let host = "http://localhost:8081/api";
var i = 0;
const app = angular.module("app", []);
app.controller("list", list).
    controller("create", formCreate).
    controller("update", formUpdate);


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
        $scope.items = resp.data;
        $scope.pageCount = Math.ceil($scope.items.length / 5);
        console.log("Success", resp);
    })
    .catch((error) => {
        console.log("Error", error);
      });
};
// $scope.edit = (username) => {
//   var url = `${host}/user/${username}`;
// $http({
//   method: "GET",
//   url: url,
// })
//   .then((resp) => {
//     $scope.form = resp.data;
//     console.log("Success_edit_User", resp);
//   })
//   .catch((error) => {
//     console.log("Error_edit_User", error);
//   });
//   window.sessionStorage.removeItem("editUs");
// };
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
        var index = $scope.items.findIndex(
          (item) => item.id == $scope.form.username
        );
        $scope.items.splice(index, 1);
        $scope.reset();
        console.log("Success", resp);
      
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

}
function formCreate($scope, $http){
  $scope.form = {};
  $scope.items = [];
  $scope.create = () => {
    var item = angular.copy($scope.form);
    var url = `${host}/user`;
    $http({
      method: "post",
      url: url,
      data: item,
    })
      .then((resp) => {
        $scope.items.push(item);
        console.log("Success", resp);
        window.location.href = "/admin/user/list";
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}
function formUpdate($scope, $http){ 
  $scope.form = {};
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
  const username = window.sessionStorage.getItem("editUs");
  $scope.edit(username)
}


