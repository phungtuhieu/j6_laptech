let host = "http://localhost:8081/api";
const app = angular.module("app", []);
app.controller("signup", signup);




function signup($scope, $http){
    alert("success")
    $scope.Data = {
        
         phone:"",
        
         address:"",
         admin: false,
         active: true,
         image: "",

    };

    $scope.dangky = function () {
        $http.post(host + "/account/sign-up", $scope.Data)
            .then(function (response) {
                // Xử lý thành công
                alert("Đăng ký thành công!");
                window.location.href = "/account/login";

            
            })
            .catch(function (error) {
                // Xử lý lỗi
                console.error("Error", error);
            });

        console.log($scope.Data)
    };
    
}