const host = "http://localhost:8081/api/order";
// const app = angular.module("app", []);
const statusOrder = {
  PENDING : 0, 
  SHIPPING : 1,
  COMPLETION : 2,
  CANCELED : 3 
}
app.controller("list", list)
    .controller("orderDetails",orderDetails);
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  
})
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})
function list ($scope, $http,$location) {
    var url = "";
    var status = "";
    var pageName = "pending";
    var urlString = $location.absUrl();

    const parts = urlString.split("/"); 
    pageName = parts[parts.length - 2];

    $scope.isLoading = true;
     switch(pageName) {
        case "pending":
            status  = "pending";
          break;
        case "shipping":
            status  = "shipping";
          break;
        case "shipped":
            status  = "completion";
          break;
        case "canceled":
            status  = "canceled";
          break;
        default:
            break;
      }
      var  getUrl = (url) => {
        return `${host}/${url}`;
      };
      var load_all = () => {
        url = getUrl(status);
        $http.get(url).then(resp => {
            console.log(resp.data)
            $scope.page = resp.data;
            $scope.isLoading = false;
        }).catch(err => {
            
        })
    }
    
    async function getOne(orderId) {
      url = getUrl(`${status}/${orderId}`);
      try {
        var resp = await $http.get(url);
        return resp.data;
      } catch (error) {
        throw error; 
      }
    }

    $scope.viewOrderDetails = (id) => {
        window.sessionStorage.setItem("orderId", id);
        window.sessionStorage.setItem("pageName", pageName);
        window.location.href = "/admin/order/order-details";
    }
    
    $scope.handleStatusOrder = async (orderId) => {
      var customAleat = {} 
      if(status == "pending") {
         customAleat = {
          title : "Bạn có muốn giao hàng?",
          text : "Đơn hàng sẽ chuyển sang trạng thái đang giao!",
          titleSuccess: "Đã giao hàng!",
          textSuccess: "Đơn hàng đang được giao"
        } 
      
      } else if(status == "shipping") {
        customAleat = {
          title : "Bạn có muốn hoàn thành?",
          text : "Đơn hàng sẽ chuyển sang trạng thái đã nhận!",
          titleSuccess: "Đã nhận được hàng!",
          textSuccess: "Đơn hàng đã được nhận"
        } 
      }
      Swal.fire({
        
        title: customAleat.title,
        text: customAleat.text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Hủy',
        confirmButtonText: 'Có!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            var order = await getOne(orderId);
            if(status == "pending") {
              order.status = statusOrder.SHIPPING;
              order.deliveryDate = new Date();
            } else if(status == "shipping") {
              order.status = statusOrder.COMPLETION;
              order.completionDate = new Date();
            }
            url = getUrl(`${status}/${orderId}`);
            $http.put(url,order).then(resp => {
                var i = $scope.page.content.findIndex(o => o.id == order.id);
                if (i !== -1) {
                  $scope.page.content.splice(i,1)
                }
    
            }).catch(err => {
    
            })
          } catch (error) {
          }
          Swal.fire(
            customAleat.titleSuccess,
            customAleat.textSuccess,
            'success'
          )
        }
      })
      return;
      
    }
   
    load_all();
} 
function orderDetails($scope,$http) {
  var pageName = window.sessionStorage.getItem("pageName");
  $scope.isLoading = true;
  $scope.page = [];
  $scope.total = 0.0;
  $scope.orderId = window.sessionStorage.getItem("orderId");
  var  getUrl = (url) => {
    return `${host}/${url}`;
  };
  
  $scope.backPage = () => {
    window.location.href=`/admin/order/${pageName}/list`;
  }
  
  var load_all = () => {
    url = getUrl(`${$scope.orderId}/order-details`);
    $http.get(url).then(resp => {
      $scope.page = resp.data;
      $scope.isLoading = false;
      $scope.page.content.map(item => $scope.total += (item.quantity * item.price));
      console.log(resp.data);
    }).catch(err => {
      console.log("err",err);
    })
  };
  load_all();
}