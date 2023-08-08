const app = angular.module("app", []);

app.controller("header", header)

function header ($scope,$http){
    $scope.login = function () {
        $http
          .get("/api/account")
          .then(function (userResponse) {
            $scope.user = userResponse.data;
          })
      };
      $scope.login();
}
