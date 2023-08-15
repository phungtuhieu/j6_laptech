let host = "http://localhost:8081/api";

app.controller("signup", signup);

function signup($scope, $http) {
    alert("success")
    $scope.Data = {
        phone: "",
        address: "",
        admin: false,
        active: true,
        image: "",
        confirmPassword: ""
    };

    // Khởi tạo các biến thông báo lỗi
    $scope.errorOccurred = false;
    $scope.errorMessage = "";

    // Thêm biến cho mã xác minh và trạng thái hiển thị
    $scope.showVerificationCode = false;
    $scope.verificationCode = "";
    $scope.showLoginButton = false;
    //kiểm tra mã
    $scope.isVerificationCodeCorrect = false;

    $scope.dangky = function () {
        if ($scope.Data.password !== $scope.Data.confirmPassword) {
            $scope.errorOccurred = true;
            $scope.errorMessage = "Mật khẩu nhập lại không trùng khớp!";
            return;
        }

        $http.post(host + "/account/sign-up", $scope.Data)
            .then(function (response) {
                // Xử lý thành công
                alert("Đăng ký thành công! Vui lòng kiểm tra email " + $scope.Data.email + " để nhận mã xác minh.");
                // Hiển thị mã xác minh
                $scope.load(response.data.username);
                $scope.showVerificationCode = true;
                //hiển thị đăng nhập
                $scope.showLoginButton = true;
            })
            .catch(function (error) {
                // Xử lý lỗi
                $scope.errorOccurred = true;
                $scope.errorMessage = "Lỗi đăng ký xảy ra.";
                console.error("Error", error);
            });
            console.log($scope.Data);
    };
  
    $scope.load = (username) => {
        var url = `${host}/verification/${username}`;
        $http({
          method: "GET",
          url: url,
        })
          .then((resp) => {
            $scope.xacnhan = resp.data;
            console.log(resp.data);
           

          })
          .catch((error) => {
            console.log("Error_price", error);
          });
      };
      $scope.dangnhap = function () {
        // alert("thông báo")
        // alert($scope.verificationCode)
        // alert($scope.xacnhan.code)
        if ($scope.verificationCode === $scope.xacnhan.code) {

            // Xử lý đăng nhập
            window.location.href = "/account/login";
        } else {
            // Hiển thị thông báo khi nhập sai mã
            alert("Mã xác minh không đúng. Vui lòng kiểm tra lại.");
        }
    };
}
