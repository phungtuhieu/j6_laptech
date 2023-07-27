let host = "http://localhost:8081/api";
var i = 0;
const app = angular.module("app", []);
app.controller("list", list).
    controller("create", formCreate).
    controller("update", formUpdate);

function list($scope, $http) {//
  $scope.form = {};
  $scope.items = [];  
  $scope.pageCount;

  $scope.reset = () => {
    $scope.form = {};
  };
  $scope.load_all = () => {
    var url = `${host}/category`;
    //var url = host+'/students.json';
    $http({
      method: "GET",
      url: url,
    }).then((resp) => {
        $scope.items = resp.data;
        $scope.pageCount = Math.ceil($scope.items.length / 5);
        console.log("Success1", resp);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // sap xep
  $scope.reverseSort = false;
  $scope.sortColumn = 'id';

  $scope.sortBy = (prop) => {
  $scope.reverseSort = ($scope.sortColumn === prop) ? !$scope.reverseSort : false;
  $scope.sortColumn = prop;
  };
  $scope.formEdit = (id) => {
    // Lưu id vào session
    window.sessionStorage.setItem("editId", id)  
  };
  $scope.delete = (id) => {
    var url = `${host}/category/${id}`;
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
        $scope.reset();
        console.log("Success", resp);
      
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };





  // thực hiện
  $scope.reset();
  $scope.load_all();

  $scope.begin = 0;
  $scope.pageCount = Math.ceil($scope.items.length / 5);
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
function formCreate($scope, $http){ //
  $scope.form = {};
  $scope.items = [];
  $scope.create = () => {
    var item = angular.copy($scope.form);
    var url = `${host}/category`;
    $http({
      method: "post",
      url: url,
      data: item,
    })
      .then((resp) => {
        $scope.items.push(item);
        console.log("Success", resp);
        window.location.href = "/admin/category/list";
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}
function formUpdate($scope, $http){ //
  $scope.form = {};
  $scope.items = [];
  $scope.edit = (id) => {
      var url = `${host}/category/${id}`;
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
      window.sessionStorage.removeItem("editId");
  };
  $scope.update = () => {
    var item = angular.copy($scope.form);
    var url = `${host}/category/${$scope.form.id}`;
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
        window.location.href = "/admin/category/list"
      })
      .catch((error) => {
        console.log("Error", error);
        if (error.status === 422) {
          alert("Danh mục đã tồn tại trong sản phẩm. Cập nhật không thành công.");
        } else {
          alert("Đã xảy ra lỗi khi cập nhật danh mục.");
        }
      });
  };
  $scope.delete = (id) => {
    var url = `${host}/category/${id}`;
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
        $scope.form={};
        console.log("Success", resp);
        window.location.href = "/admin/category/list"
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  const id = window.sessionStorage.getItem("editId");
  $scope.edit(id)
}
