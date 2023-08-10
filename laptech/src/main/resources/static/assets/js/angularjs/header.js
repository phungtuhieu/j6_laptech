const app = angular.module("app", []);

app.controller("header", header)

function header ($scope,$http,$rootScope){
    $scope.login = function () {
        $http
          .get("/api/account")
          .then(function (userResponse) {
            $scope.user = userResponse.data;
          })
      };
      $scope.count;
      $scope.login();
      $rootScope.$on('countChanged', function(event, countValue) {
        $scope.count = countValue;
    });
}
