app.controller("ordersUser", ordersUser)
app.controller("orderDetails", orderDetails)

const statusOrder = {
    PENDING : 0, 
    SHIPPING : 1,
    COMPLETION : 2,
    CANCELED : 3 
  }

  
  
function ordersUser ($scope,$http) {
    var user = JSON.parse(window.sessionStorage.getItem("user"))
    if(user == null) {
        window.location.href ="/account/login"
        return
    }
    $scope.isLoading = true;
    const urlComp = `${host}/order/completion/orders-user/${user.username}`
    const urlPending = `${host}/order/pending/orders-user/${user.username}`
    const urlCanceled = `${host}/order/canceled/orders-user/${user.username}`
    // const urlCancelOrder = `${host}/order/canceled/orders-user/${user.username}`
    const urlShipping = `${host}/order/shipping/orders-user/${user.username}`
    
    $scope.pageOrdComp = [];
    $scope.pageOrdPend = [];
    $scope.pageOrdCanc= [];
    $scope.pageOrdShipp= [];

  
    $scope.checkPaypemt = () => {
        var isPaid = JSON.parse(window.sessionStorage.getItem("isPaid")) ;
        console.log(("isPaid",isPaid));
        if(isPaid == true) {
            Swal.fire(
                'Đã đặt hàng thành công!',
                `Đơn hàng được chuyển sang trạng thái chờ xử lý!`,
                'success'
            );
        }
        window.sessionStorage.removeItem("isPaid")
    }
    $scope.checkPaypemt();
    $scope.load_orders_completion = () => {
        $http.get(urlComp).then(resp => {
            $scope.pageOrdComp = resp.data;
            $scope.isLoading = false;
            console.log("pageOrdComp",resp);
        }).catch(err => {
            console.log("err",err);
            $scope.isLoading = false;
        })
    }
    $scope.load_orders_pending = () => {
        $http.get(urlPending).then(resp => {
            $scope.pageOrdPend = resp.data;
            $scope.isLoading = false;
            console.log("sss",resp);
        }).catch(err => {
            console.log("err",err);
            $scope.isLoading = false;
        })
    }

    $scope.load_orders_canceled = () => {
        $http.get(urlCanceled).then(resp => {
            $scope.pageOrdCanc = resp.data;
            $scope.isLoading = false;
            console.log("sss",resp);
        }).catch(err => {
            console.log("err",err);
            $scope.isLoading = false;
        })
    }

    $scope.load_orders_shipping = () => {
        $http.get(urlShipping).then(resp => {
            $scope.pageOrdShipp = resp.data;
            $scope.isLoading = false;
            console.log("pageOrdShipp",resp);
        }).catch(err => {
            console.log("err",err);
            $scope.isLoading = false;
        })
    }
    $scope.getPage = (pageNo, status) => {
       
        var urlGet = `${host}/order/${status}/orders-user/${user.username}?pageNo=${pageNo}`;
        $http.get(urlGet).then(resp => {
            if(status == "pending") {
                $scope.pageOrdPend = resp.data;
            } else if(status == "canceled") {
                $scope.pageOrdCanc = resp.data;
            } else if(status == "completion") {
                $scope.pageOrdComp = resp.data;
            } else if( status == "shipping") {
                $scope.pageOrdShipp = resp.data;
            }
            $scope.isLoading = false;
        }).catch(err => {
          console.log("Errors", err);
          $scope.isLoading = false;
        });
      }
      $scope.cancelOrder = async (orderId) => {
        var urlCancel = `${host}/order/cancel/orders-user/${orderId}`;
        var urlGet = `${host}/order/pending/${orderId}`;
    
        try {
            const { value: text , dismiss: isCancelled} = await Swal.fire({
                input: 'textarea',
                inputLabel: 'Tại sao bạn lại hủy đơn',
                inputPlaceholder: 'Hãy cho chúng tôi biết lý do hủy đơn của bạn...',
                inputAttributes: {
                    'aria-label': 'Hãy cho chúng tôi biết lý do hủy đơn của bạn'
                },
                showCancelButton: true,
                confirmButtonText: 'Ok',       
                cancelButtonText: 'Hủy bỏ',  
            });
            if (isCancelled) {
                
            } else if (text === undefined|| text.trim() === '') {
                Swal.fire(
                    'Hủy thất bại!',
                    'Bạn chưa nhập lý do hủy đơn.',
                    'error'
                );
            } else { 
                $http.get(urlGet).then(async resp => {
                    var orderUpd = resp.data;
                    orderUpd.status = statusOrder.CANCELED;
                    orderUpd.cancellationDate = new Date();
                    orderUpd.cancellationReason = text; 
                    try {
                        const putResponse = await $http.put(urlCancel, orderUpd);
                        var idx = $scope.pageOrdPend.content.findIndex(item => item.id == orderUpd.id);
                        $scope.pageOrdPend.content.splice(idx, 1);
                        Swal.fire(
                            'Đã hủy thành công!',
                            `Đơn hàng đã được hủy!`,
                            'success'
                        );
                        $scope.load_orders_canceled();
                        $scope.isLoading = false;
                        console.log("Hủy data", putResponse);
                    } catch (putError) {
                        console.log("err", putError);
                        Swal.fire(
                            'Hủy thất bại!',
                            `Đơn hàng không hủy được!`,
                            'error'
                        );
                        $scope.isLoading = false;
                    }
                }).catch(getError => {
                    console.log("err", getError);
                    Swal.fire(
                        'Lỗi!',
                        `Không thể lấy thông tin đơn hàng!`,
                        'error'
                    );
                    $scope.isLoading = false;
                });
            }
        } catch (error) {
            console.log("Swal error", error);
        }
    };
    $scope.viewOrderDetails = (id) => {
        window.sessionStorage.setItem("orderId", id);
        window.location.href = "/client/cart/orders-user/details";
    }

    $scope.load_orders_completion();
    $scope.load_orders_pending();
    $scope.load_orders_canceled(); 
    $scope.load_orders_shipping();
}

function orderDetails($scope,$http) {
    $scope.isLoading = true;
    $scope.page = [];
    $scope.total = 0.0;
    var orderId = window.sessionStorage.getItem("orderId");
  
    
    $scope.getPage = (pageNo) => {
       
        var urlGet = `${host}/order/${orderId}/order-details?pageNo=${pageNo}`;
        $http.get(urlGet).then(resp => {
            $scope.page = resp.data;
            $scope.isLoading = false;
        }).catch(err => {
          console.log("Errors", err);
          $scope.isLoading = false;
        });
      }
    $scope.backPage = () => {
        window.location.href = "/client/cart/orders-user"
    }
    var load_all = () => {
      url = `${host}/order/${orderId}/order-details`;
      $http.get(url).then(resp => {
        $scope.page = resp.data;
        $scope.isLoading = false;
        $scope.total = $scope.page.content.map(item =>  item.quantity * item.price)
                                          .reduce((total,qty)=> total+=qty,0);
        console.log(resp.data);
      }).catch(err => {
        console.log("err",err);
      })
    };
    load_all();
  }