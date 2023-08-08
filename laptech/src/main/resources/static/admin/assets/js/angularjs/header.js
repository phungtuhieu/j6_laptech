const app = angular.module("app", []);
app
  .controller("admin", admin)
  function admin ($scope){
    $scope.user = JSON.parse(window.sessionStorage.getItem("user"))
  }