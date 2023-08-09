let host = "http://localhost:8081/api";
const app = angular.module("app", []);
app.controller("signup", signup);


function signup($scope, $http){
    $scope.signupData = {
        username: "",
        fullname: "",
        email: "",
        password: ""
    };

    $scope.signup = function () {
        $http.post(host + "/api/sign-up", $scope.signupData)
        .then(function (response){
            // Đăng ký thành công, nhận mã xác minh từ phản hồi
            const verificationCode = response.data.verificationCode;

            // Tạo đối tượng mailInfo2 với dữ liệu cần thiết
            const emailInfo = {
                from: 'khoinmpc02929@fpt.edu.vn', // Địa chỉ email của bạn
                to: $scope.signupData.email,
                subject: 'Xác minh tài khoản',
                body: 'Mã xác minh của bạn: ' + verificationCode,
            };


            // Gửi email chứa mã xác minh
            sendVerificationEmail(emailInfo);

             // Lưu mã xác minh vào cơ sở dữ liệu
             const verification = new Verification({
                email: $scope.signupData.email,
                code: verificationCode,
            });
            verification.save(function(err) {
                if (err) {
                    console.error("Lỗi khi lưu mã xác minh:", err);
                }
            });

            //thông báo 
            alert("Đăng ký thành công! vui lòng kiểm tra email để nhận mã xác minh.");
        }).catch(function (error) {
            //xử lý lỗi
            console.error("Error", error);
        });
    };
    function sendVerificationEmail(email, code) {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

        const msg = {
            to: email,
            from: 'khoinmpc02929@fpt.edu.vn', // Địa chỉ email của bạn
            subject: 'Xác minh tài khoản',
            text: 'Mã xác minh của bạn: ' + code,
            html: '<p>Mã xác minh của bạn: ' + code + '</p>',
        };

        sgMail.send(msg);
    }
    
}