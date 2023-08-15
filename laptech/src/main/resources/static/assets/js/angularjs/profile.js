var host = "http://localhost:8081/api";

app.controller("update", formUpdate);

function formUpdate($scope, $http) {
    $scope.userUD = {
        username: "",
        fullname: "",
        email: "",
        phone: "",
        address: "",
        image: ""
    };
    $scope.items = [];

    // Lấy username của người dùng đã đăng nhập từ dữ liệu userUD
    var username = $scope.userUD.username; // Thay thế bằng cách lấy username của người dùng đăng nhập

    // Xây dựng URL để gọi API GET thông tin người dùng
    var url = `${host}/profile/${username}`;

    // Gọi API GET để lấy thông tin người dùng khi trang được tải lên
    $http({
        method: "GET",
        url: url,
    })
    .then(function (resp) {
        $scope.userUD = resp.data; // Gán thông tin người dùng đã lấy cho biến userUD
        console.log("User Data", $scope.userUD);
    })
    .catch(function (error) {
        console.log("Error", error);
        alert("Thất bại khi lấy thông tin người dùng.");
    });

    $scope.updateUser = function () {
        var url = `${host}/profile/${username}`;

        // Gọi API PUT để cập nhật thông tin người dùng
        $http({
            method: "PUT",
            url: url,
            data: $scope.userUD
        })
        .then(function (resp) {
            var index = $scope.items.findIndex(
                (user) => user.username == $scope.userUD.username
            );
            if (index !== -1) {
                $scope.items[index] = resp.data;
            }
            console.log("Success", resp);
            alert("Cập nhật thông tin thành công.");
        })
        .catch(function (error){
            console.log("Error", error);
            alert("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
        });
    };

    $scope.uploadImage = function() {
        document.getElementById('imageInput').click(); // Kích hoạt sự kiện click trên input file
    };

    // Hàm xử lý khi người dùng thay đổi hình ảnh
    document.getElementById('imageInput').addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $scope.userUD.image = e.target.result; // Cập nhật đường dẫn hình ảnh vào scope
                $scope.$apply(); // Cập nhật ngữ cảnh AngularJS
                uploadImageToServer(file); // Gọi hàm để tải lên hình ảnh lên server
            };
            reader.readAsDataURL(file);
        }
    });

    function uploadImageToServer(file) {
        var formData = new FormData();
        formData.append('file', file);

        $http.post(`${host}/profile/upload`, formData, {
            headers: { 'Content-Type': undefined } // Đặt header để trình duyệt tự định dạng dữ liệu
        })
        .then(function(resp) {
            // Xử lý thành công khi tải lên hình ảnh lên server
        })
        .catch(function(error) {
            console.log("Error uploading image", error);
            // Xử lý lỗi khi tải lên hình ảnh
        });
    }
}
