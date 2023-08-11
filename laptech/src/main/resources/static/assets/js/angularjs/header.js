const app = angular.module("app", []);
let urlImg = "/files/images";
app.controller("header", header)

function header ($scope,$http,$rootScope){
  $scope.urlImgHeader = (name) =>{
    return `${urlImg}/${name}`;
  }
    $scope.loginHeader = function () {
        $http
          .get("/api/account")
          .then(function (userResponse) {
            $scope.user = userResponse.data;
          })
      };
      $scope.count;
      $scope.loginHeader();
      $rootScope.$on('countChanged', function(event, countValue) {
        $scope.count = countValue;
    });

    $scope.logout =  () => {
      window.sessionStorage.removeItem("user");
    }
}
