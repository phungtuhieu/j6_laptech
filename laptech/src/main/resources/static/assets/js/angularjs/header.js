const app = angular.module("app", []);
let urlImg = "/files/images";
app.controller("header", header);

function header($scope, $http, $rootScope) {
  $scope.urlImgHeader = (name) => {
    return `${urlImg}/${name}`;
  };



  var currentUsername = document.querySelector("[data-user-remoteuser]").getAttribute("data-user-remoteuser");
  // alert(currentUsername)


  if (currentUsername === "-1") {
    currentUsername = null;
  }
  $scope.getUs = function () {
    if(currentUsername !== null) {
      $http.get(`${host}/user/${currentUsername}`)
      .then(function (userResponse) {
        $scope.user = userResponse.data;
        window.sessionStorage.setItem("user",JSON.stringify($scope.user));
        console.log("Dữ liệu user nè:", $scope.user);
      })
      .catch(function (error) {
      
      });
    }
   
  };

  $scope.getUs();

  $scope.count = null;

  $rootScope.$on("countChanged", function (event, countValue) {
    $scope.count = countValue;
    window.sessionStorage.setItem("countCart", countValue);
  });
  if ($scope.count == null) {
    $scope.count = window.sessionStorage.getItem("countCart");
  }

  $scope.logout = () => {
    window.sessionStorage.removeItem("user");
  };
}
