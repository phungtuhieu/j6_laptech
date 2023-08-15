app.controller("checkout", checkout)
// const host = "http://localhost:8081/api";
const BANK = {
    NCB : 1,
    VIETINBANK : 2,
    MBBANK : 3,
}
const PAYMENT_METHOD = {
    ONLINE: true,
    COD : false
}
function checkout($scope,$http) {
    $scope.paymentMethod = PAYMENT_METHOD.COD;
    $scope.optionBank = BANK.NCB;
    $scope.messageError = {
      fullname: null,
      email: null,
      phone:null,
      address:null
    };
    $scope.$watch('paymentMethod', function(newValue, oldValue) {
        if (newValue === false) {
          $scope.optionBank = -1;
        }
    });
    $scope.user = JSON.parse(window.sessionStorage.getItem("user"))

    $scope.user.address = null;
    $scope.carts = JSON.parse(window.sessionStorage.getItem( "arrCartSelected")) 
    $scope.amoutItemSelected = () => {
      return am = $scope.carts.map(item => item.quantity * item.price).reduce((total,price) => total += price,0);
    }
  
    $scope.countItemSelected = () => {
      return am = $scope.carts.map(item => item.quantity).reduce((total,qty) => total += qty,0);
    }

    var validationForm = () => {
      var isError = false;
      var setError = (fieldName, errorMessage) => {
        $scope.messageError[fieldName] = errorMessage;
        isError = true;
      }
    
      var clearError= (fieldName) => {
        $scope.messageError[fieldName] = null;
      }
  
      if ($scope.user.fullname == null) {
        setError('fullname', 'Vui lòng nhập họ và tên!');
      } else {
        clearError('fullname');
      }
  
      if ($scope.user.email == null) {
        setError('email', 'Vui lòng nhập email!');
      } else {
        clearError('email');
      }

      if ($scope.user.phone == null) {
        setError('phone', 'Vui lòng nhập số điện thoại!');
      } else {
        clearError('phone');
      }
    
      if ($scope.user.address == null) {
        setError('address', 'Vui lòng nhập địa chỉ!');
      } else {
        clearError('address');
      }
      
      return isError ;
    }
    var order = {
      orderDate: new Date(),
      completionDate:null,
      deliveryDate:null,
      cancellationDate:null,
      cancellationReason:null,
      paymentMethod: false,
      paymentStatus: false,
      status: 0,
      user: angular.copy($scope.user),
      get orderDetails() {
        return $scope.carts.map(item => {
          return {
            product : item.product,
            price :item.price,
            quantity : item.quantity
          }
        })
      },
      get onlinePayments() {
        {}
      }
    }

    $scope.purchase = () => {
      var ord = angular.copy(order);
     
      var isError = false;
      isError = validationForm();
      if(!isError) {
        if($scope.paymentMethod === PAYMENT_METHOD.COD) {
          ord.paymentMethod = PAYMENT_METHOD.COD;
        } else {
          ord.paymentMethod = PAYMENT_METHOD.ONLINE;
        }
        var url = `${host}/order`
        $http.post(url, ord).then(resp => {
          $http.post(`${host}/cart/delete-by-payment`,angular.copy($scope.carts)).then(resp => {
            console.log("success-delete-cart",resp);
            window.sessionStorage.setItem("isPaid",JSON.stringify(true));
            window.sessionStorage.removeItem("arrCartSelected");
            $scope.carts = [];
            window.location.href="/client/cart/orders-user"
          }).catch(err => {  
            console.log("err-delete-cart",err);
          })
          console.log("success-purchase",resp);
        }).catch(err => {
          console.log("err-purchase",err);
        })
      }
      
    }
   

   
}