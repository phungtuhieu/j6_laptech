let host = "http://localhost:8081/api";
var i =0;
app.controller("update", formUpdate);
function formUpdate($scope, $http){

    $scope.items = JSON.parse(window.sessionStorage.getItem("user"))
    console.log($scope.items)


    // $scope.load = (username) => {
    //     var url = `${host}/profile/${username}`;
    //   $http({
    //     method: "GET",
    //     url: url,
    //   })
    //     .then((resp) => {
    //       $scope.form = resp.data;
    //       console.log("Success_edit", resp);
    //     })
    //     .catch((error) => {
    //       console.log("Error_edit", error);
    //     });
    //     window.sessionStorage.removeItem("editUs");

    //     // $scope.load();
    // };
    $scope.update =() => {
        alert("thành công")
        var item = angular.copy($scope.items);
        console.log(item)
        var url = `${host}/profile/${$scope.items.username}`;
        $http({
            method: "put",
            url: url,
            data: item,
        })
        .then((resp) => {
            // var index = $scope.items.findIndex(
            //     (item) => item.username == $scope.form.username
            // );
            // $scope.items[index] = resp.data;
            // console.log("Success", resp);

            alert("thành công")
            // window.location.href = "/client/profile"
        })
        .catch((error) => {
            console.log("Error", error);
            if (error.status === 422) {
              alert("Người dùng đã tồn tại. Cập nhật thất bại.");
            } else {
              alert("Đã xảy ra lỗi khi cập nhật người dùng!.");
            }
          });
    };
   
}