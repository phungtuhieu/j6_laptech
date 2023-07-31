let host = "http://localhost:8081/api";
var i = 0;
const app = angular.module("app", []);
app.controller("list", list).
    // controller("create", formCreate).
    controller("edit", formEdit);

function list($scope, $http) {//
    var url = `${host}/product`;
    $scope.items = [];
    $scope.load_all = () => {
        $http.get(url).then(resp => {
            $scope.items = resp.data;
            console.log("Success",resp)
        }).catch(err => {
            console.log("Errors",err)
        })
    }
    $scope.edit = (id) => {
        window.sessionStorage.setItem("id", id) ; 
        window.location.href="/admin/product/update";
    }
    $scope.load_all();
    
}
function formEdit ($scope, $location, $http) {
  
    $scope.form = {};
    $scope.optionsCat = [];
    var id = window.sessionStorage.getItem("id");
    var url = `${host}/product/${id}`;
    var urlCat = `${host}/category`;
    var urlCPU = `${host}/cpu`;
    
    $scope.load_form = () => {
       
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            console.log("Success",resp)
            $scope.getCategory();
        }).catch(err => {
            console.log("Errors",err)
        })
    }
    $scope.getCategory = () => {
        $http.get(urlCat).then(resp => {
          $scope.optionsCat =  resp.data;
          var i = $scope.optionsCat.findIndex(cat => cat.id == $scope.form.category.id);
          $scope.form.category = $scope.optionsCat[i]; 

        }).catch(err => {
          console.log("Errors", err);
        });
      };
    $scope.getCPU = () => {
        $http.get(urlCat).then(resp => {
          $scope.optionsCat =  resp.data;
          var i = $scope.optionsCat.findIndex(cat => cat.id == $scope.form.category.id);
          $scope.form.category = $scope.optionsCat[i]; 

        }).catch(err => {
          console.log("Errors", err);
        });
      };
    $scope.load_form();
}