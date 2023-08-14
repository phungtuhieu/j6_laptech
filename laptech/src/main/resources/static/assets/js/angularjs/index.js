
let host = "http://localhost:8081/api";
// let urlImg = "/files/images";
// const app = angular.module("app", []);
app
  .filter("formatCurrency", function () {
    return function (input) {
      // Chuyển đổi số tiền thành tiền Việt Nam
      var formattedPrice = input.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return formattedPrice;
    };
  })
  .controller("index", index)
  .controller("listCategory", listCategory)
 

function index($scope, $http, $interval,$rootScope,$location) {
  $scope.pageCount;
  $scope.items = [];
  $scope.currentPage = 1;
  $scope.isLoading = true;
  $scope.urlImg = (name) =>{
    return `${urlImg}/${name}`;
  }

  function generatePaginationNumbers(currentPage, pageCount) {
    const pagination = [];
    const MAX_VISIBLE_PAGES = 5;

    if (pageCount <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= pageCount; i++) {
        pagination.push({ page: i, active: i === currentPage });
      }
    } else {
      let startPage = currentPage - Math.floor(MAX_VISIBLE_PAGES / 2);
      let endPage = currentPage + Math.floor(MAX_VISIBLE_PAGES / 2);
      if (startPage < 1) {
        startPage = 1;
        endPage = MAX_VISIBLE_PAGES;
      } else if (endPage > pageCount) {
        endPage = pageCount;
        startPage = pageCount - MAX_VISIBLE_PAGES + 1;
      }
      if (startPage > 1) {
        pagination.push({ page: 1 });
        if (startPage > 2) {
          pagination.push({ ellipsis: true });
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        pagination.push({ page: i, active: i === currentPage });
      }
      if (endPage < pageCount) {
        if (endPage < pageCount - 1) {
          pagination.push({ ellipsis: true });
        }
        pagination.push({ page: pageCount });
      }
    }
    //
    $scope.discountPrice = (priceId) => {
      console.log(priceId);
      var url = `${host}/discountPrice/${priceId}`;
      $http({
        method: "GET",
        url: url,
      })
        .then((resp) => {
          $scope.layduocthongDP = resp.data;
          console.log("Success_discountPrice_one", resp.data);
        })
        .catch((error) => {
          console.log("Error_discountPrice_one", error);
        });
    };
    //
    return pagination;
  }
  $scope.updatePagination = function () {
    $scope.pagination = generatePaginationNumbers(
      $scope.currentPage,
      $scope.pageCount
    );
  };
  $scope.setCurrentPage = function (page) {
    $scope.currentPage = page;
    $scope.updatePagination();
    $scope.begin = (page - 1) * 10;
  };

  $scope.load_all_price = () => {
    var url = `${host}/price`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.prices = resp.data;
        $scope.updatePagination();
      })
      .catch((error) => {
        console.log("Error_price", error);
      });
  };

  $scope.load_all_product = () => {
    var url = `${host}/productItems`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.items = resp.data;
        $scope.pageCount = Math.ceil($scope.items.length / 10);
        $scope.updatePagination();
        console.log("Success1_product", resp);
        $scope.isLoading = false;
      })
      .catch((error) => {
        console.log("Error_product", error);
        $scope.isLoading = false;
      });
  };

  $scope.load_all_productBrand = (name) => {
    var url = `${host}/product/brand/${name}`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.productBrands = resp.data;
        console.log("Success1_productBrand", resp);
      })
      .catch((error) => {
        console.log("Error_productBrand", error);
      });
  };

  $scope.imageOne = (productId) => {
    var url = `${host}/img/${productId}`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.image = resp.data;
        console.log("Success_image", resp.data);
        //
        $scope.slideIndex = 1;
        //
        $scope.plusSlides = (n) => {
          $scope.showSlides(($scope.slideIndex += n));
        };
        //
        $scope.currentSlide = (n) => {
          $scope.showSlides(($scope.slideIndex = n));
        };
        //
        $scope.showSlides = (n) => {
          let slides = document.getElementsByClassName("mySlides");
          let i;
          let dots = document.getElementsByClassName("demo-img");
          if (n > slides.length) {
            $scope.slideIndex = 1;
          }
          if (n < 1) {
            $scope.slideIndex = slides.length;
          }
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }
          for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
          }
          slides[$scope.slideIndex - 1].style.display = "block";
          dots[$scope.slideIndex - 1].className += " active";
        };
        //
        if ($scope.image.length !== 0) {
          var slideInterval = $interval(function () {
            $scope.showSlides(1);
            $interval.cancel(slideInterval);
          }, 0);
        }
      })
      .catch((error) => {
        console.log("Error_image", error);
      });
  };

  $scope.load_all_image = () => {
    var url = `${host}/img`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.images = resp.data;
        console.log("Success_images", resp);
      })
      .catch((error) => {
        console.log("Error_images", error);
      });
  };

  $scope.load_all_brand = () => {
    var url = `${host}/brandAll`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.brands = resp.data;
        console.log("Success_brand", resp);
      })
      .catch((error) => {
        console.log("Error_brand", error);
      });
  };

  $scope.brandName = (name) => {
    window.sessionStorage.setItem("brandName", name);
  };
  $scope.load_all_discountPrice = () => {
    var url = `${host}/discountPriceAll`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.discountPrices = resp.data;
        console.log("Success_discountPrice", resp);
      })
      .catch((error) => {
        console.log("Error_discountPrice", error);
      });
  };

  $scope.notNull = () => {
    var url = `${host}/findPricesWithoutDiscountPrices`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.notNul = resp.data;

        console.log("Success_notNull", resp.data);
      })
      .catch((error) => {
        console.log("Error_notNull", error);
      });
  };

 
  var currentUsername = document.querySelector("[data-user-remoteuser]").getAttribute("data-user-remoteuser");

  if (currentUsername === "-1") {
    currentUsername = null;
  }
  $scope.getUs = function () {
    if(currentUsername !== null) {
      $http.get(`${host}/user/${currentUsername}`)
      .then(function (userResponse) {
        $scope.user = userResponse.data;
        console.log("Dữ liệu user nè:", $scope.user);
        $scope.favoriteLikeUser($scope.user.username);
        window.sessionStorage.setItem("user",JSON.stringify($scope.user));
        $scope.cart.loadCart();
      })
      .catch(function (error) {
        console.error("Lỗi khi lấy thông tin người dùng", error);
      });
    } else {
      $scope.user = null;
      $scope.cart.loadCart();
    }
   
  };

  $scope.favoriteLikeUser = (username) => {

    var url = `${host}/favorite/${username}`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.favorites = resp.data;
        console.log("Success_favorite", resp.data);
      })
      .catch((error) => {
        console.log("Error_favorite", error);
      });
  };

  const toastMixin =  Swal.mixin({
    toast: true,
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  $scope.andFavorite = (productId) => {

    var username = $scope.user.username;

    if(username == null){
      return window.location.href = "/account/login"
    }

    var url = `${host}/favorite/${username}`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.favorites = resp.data;
        console.log("Success_favorite", resp.data);

        var index = $scope.favorites.findIndex((faId) => faId.product.id === productId  )
        if (index !== -1) {

          toastMixin.fire({
            animation: true,
            icon: "error",
            title:
              "Sản phẩm đã được yêu thích",
            position: "top-right",
            width: 350,
          });
        }else{
          $http
          .get(`${host}/productOne/${productId}`)
          .then(function (resp) {
            $scope.productOne =  resp.data;
            $scope.dataFavorite = {
              user: $scope.user,
              product: $scope.productOne,
              likedDate: new Date()
            }
            $http
            .post(`${host}/favoriteAdd`,$scope.dataFavorite)
            .then(function (userResponse) {
              console.log("ok rồi");
               toastMixin.fire({
                  animation: true,
                  icon: "success",
                  title:
                    "Đã thêm vào yêu thích",
                  position: "top-right",
                  width: 300,
                });
            })
            .catch(function (error) {
              console.error("", error);
            });
          })
          .catch(function (error) {
            console.error("", error);
          });
        }

      })
      .catch((error) => {
        console.log("Error_favorite", error);
      })

    
  } 

  $scope.deleteFavorite = (favoriteId) => {
    $http
        .delete(`${host}/favorite/${favoriteId}`)
        .then(function (resp) {
           toastMixin.fire({
              animation: true,
              icon: "success",
              title:
                "Đã xóa yêu thích thành công",
              position: "top-right",
              width: 350,
            });
            $scope.favoriteLikeUser($scope.user.username);

        })
        .catch(function (error) {
          console.error("", error);
        });
  }
  $scope.cartProdQuantity = 1;
  var listCart = [];
  var cartObj = {};

  $rootScope.cart =  {
    items :[],
    add(id,quantity){
      
      if(quantity <= 0 ) {
        Swal.fire(
          'Số lượng không khả dụng',
          'Số lượng sản phẩm phải từ 1 trở lên',
          'error'
        )
        return;
      }
      if(!quantity) {
        Swal.fire(
          'Số lượng không hợp lệ',
          'Vui lòng chọn lại số lượng',
          'error'
        )
        return;
      }
      if(isNaN(id)) {
        Swal.fire(
          'Mã sản phẩm không hợp lệ',
          'Vui lòng tải lại trang',
          'error'
        )
        return;
      }
      $http.get(`${host}/product/${id}`).then(resp => {
        var product = resp.data;
        if(quantity > product.quantity) {
          Swal.fire(
            'Số lượng vượt quá',
            'Số lượng sản phẩm bạn đã chọn vượt quá số lượng có sẵn trong kho.',
            'error'
          )
          return;
        }
        
        var item = this.items.find(item => item.product.id == id);
        if(item) {
          item.quantity = item.quantity + quantity;
          this.updateToCart(item.product.id, item.quantity);
        }else {
            var prodPrice = {
              product: {},
              price: 0.0,
              quantity: 0.0,
            };
            $http.get(`${host}/cart/img/product/${id}`).then(resp => {
             var imageName = resp.data.name;
             if(currentUsername === null) {
              prodPrice.img = imageName;
             }
            }).catch(err => {
              console.log("err-cart-img",err);
            })
            prodPrice.product = resp.data;
            prodPrice.quantity = quantity;
              $http.get(`${host}/cart/price/${id}`).then(resp => {
                prodPrice.price = resp.data.price;
                if(currentUsername !== null) {
                  this.saveToCartUser(prodPrice);
                } else {
                  this.items.push(prodPrice);
                  this.saveToLocalStorage();
                }
              }).catch(err => {
                console.log("err-cart-price",err);
              })
        }
        Swal.fire(
          'Cảm ơn bạn',
          'Sản phẩm đã được thêm vào giỏ hàng thành công',
          'success'
        )
      }).catch(err => {
        
      })
      
    },
    remove(id){
      var index = -1;
      if(currentUsername !== null) {
        $http.delete(`${host}/cart/${id}`).then(resp => {
          index = this.items.findIndex(item => item.id == id);
          item = this.items.splice(index,1);
          $scope.toggleSelection(item[0]);
          $rootScope.$emit('countChanged', this.count);
           window.sessionStorage.setItem('countCart',this.count);
        }).catch(err => {
          console.log("err-remove-cart",err);
        })
      } else  {
        index = this.items.findIndex(item => item.product.id == id);
        item = this.items.splice(index,1);
        $scope.toggleSelection(item[0]);
        this.saveToLocalStorage();
      }
    

    },
    clear(){
      Swal.fire({
        title: 'Bạn có chắc muốn xóa ?',
        text: "Sản phẩm sẽ được xóa tất cả?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Không',
        confirmButtonText: 'Có'
      }).then((result) => {
        if (result.isConfirmed) {
          if(currentUsername !== null) {
            $http.delete(`${host}/cart/user/${$scope.user.username}`).then(resp => {
              Swal.fire(
                'Đã xóa!',
                'Tất cả sản phẩm đã được xóa khỏi giỏ hàng.',
                'success'
              )
              $scope.cartSelected = []
              this.items= [];
              $rootScope.$emit('countChanged', this.count);
               window.sessionStorage.setItem('countCart',this.count);
            }).catch(err => {
              console.log("err-clear-cart-all",err);
            })
        } else {
          $scope.cartSelected = []
          this.items= [];
          this.saveToLocalStorage();
          $scope.$applyAsync();
          Swal.fire(
            'Đã xóa!',
            'Tất cả sản phẩm đã được xóa khỏi giỏ hàng.',
            'success'
          )
        }
        }
      
      })
    },
    amt_of(item){},
    get count(){
      var c = this.items.map(item => item.quantity).reduce((total,quantity) => total += quantity,0);
      return c ;
    },
    get amount(){
      var am = this.items.map(item => item.quantity * item.price).reduce((total,price) => total += price,0);
      
      return am ;
    },
    updateToCart(id,quantity) {
      var index = this.items.findIndex(e => e.product.id == id);
     
      if(!quantity) {
        Swal.fire(
          'Số lượng không hợp lệ',
          'Vui lòng chọn lại số lượng',
          'error'
        )
        this.items[index].quantity = 1;
      }
      if(quantity <= 0 ) {
        Swal.fire(
          'Số lượng không khả dụng',
          'Số lượng sản phẩm phải từ 1 trở lên',
          'error'
        )
        this.items[index].quantity = 1;
      }
      if(isNaN(id)) {
        Swal.fire(
          'Mã sản phẩm không hợp lệ',
          'Vui lòng tải lại trang',
          'error'
        )
        return;
      }
      $http.get(`${host}/product/${id}`).then(resp => {
        var prod = resp.data;
        if(quantity > prod.quantity) {
          Swal.fire(
            'Rất tiếc!',
            `Bạn chỉ có thể mua tối đa ${prod.quantity} sản phẩm này!`,
            'error'
          )
          this.items[index].quantity = prod.quantity;
        }
        if(currentUsername == null) {
          this.saveToLocalStorage();
        } else {
          var c = this.items.find(e => e.product.id == id);
          $http.get(`${host}/cart/${c.id}`).then(resp => {
            var prodFromCart = resp.data;
            prodFromCart.quantity = quantity;
            $http.put(`${host}/cart/${prodFromCart.id}`,prodFromCart).then(resp => {
              console.log("update-cart",prodFromCart);
              $rootScope.$emit('countChanged', this.count);
              window.sessionStorage.setItem('countCart',this.count);
            }).catch(err => {
              console.log("err-update-cart",err);
            })
          }).catch(err => {
            console.log("err-get-cart",err);
          })
        }
       
      }).catch(err => {
        console.log("err-get-cart",err);
      })
    
    },
    saveToCartUser(item) {
        cartObj = {
            price: item.price,
            quantity: item.quantity,
            product: item.product,
            user: $scope.user
          }
        $http.post(`${host}/cart/save`,cartObj).then(resp => {
          this.items.push(resp.data);
          $rootScope.$emit('countChanged', this.count);
          window.sessionStorage.setItem('countCart',this.count);
        }).catch(err => {
          console.log("Err LiST CART",err);
        })
    
    },

    saveToLocalStorage(){
      var json = JSON.stringify(angular.copy(this.items));
        localStorage.setItem("cart",json);
      $rootScope.$emit('countChanged', this.count);
       window.sessionStorage.setItem('countCart',this.count);
    },
    
    loadCart(){
      
      if(currentUsername !== null) {
        this.items = []
        $http.get(`${host}/cart/user`).then(resp => {
            listCart = resp.data;
            listCart.forEach(item => {
              $http.get(`${host}/cart/img/product/${item.product.id}`).then(resp => {
               var imageName = resp.data.name;
               prodPrice.img = imageName;
              }).catch(err => {
                console.log("err-cart-img",err);
              })
              var prodPrice = {
                id: item.id,
                price: item.price,
                quantity: item.quantity,
                product: item.product,
                user : item.user
              };
            this.items.push(prodPrice);
            })
            $rootScope.$emit('countChanged', this.count);
            window.sessionStorage.setItem('countCart',this.count);
            $scope.isLoading = false;
        }).catch(err => {
          console.log("err-list-items-load",err);
          $scope.isLoading =false;
        })
      
      } else {
        var json = localStorage.getItem('cart');
        this.items =  json ? JSON.parse(json) : []
        $scope.isLoading = false;
      }
      $rootScope.$emit('countChanged', this.count);
       window.sessionStorage.setItem('countCart',this.count);
    }
  
  }
  
  // Xử lí checkbox cart 
  $scope.cartSelected = [];

  $scope.statusChecked = (item) => {
    return $scope.cartSelected.indexOf(item) > -1;
  }
  $scope.amoutItemSelected = () => {
    return am = $scope.cartSelected.map(item => item.quantity * item.price).reduce((total,price) => total += price,0);
  }

  $scope.countItemSelected = () => {
    return am = $scope.cartSelected.map(item => item.quantity).reduce((total,qty) => total += qty,0);
  }
  $scope.toggleSelection = (item) => {
    var idx = $scope.cartSelected.indexOf(item);
    if(idx > -1) {
      $scope.cartSelected.splice(idx,1);
    } else {
      $scope.cartSelected.push(item);
    }
  } 
  $scope.selectAll = () => {
   if(!$scope.checkAll) {
    console.log("$scope.checkAll", $scope.checkAll);
    angular.forEach($scope.cart.items, (item) => {
        var idx = $scope.cartSelected.indexOf(item);
        if(idx <= -1){
          $scope.cartSelected.push(item)
        } else {
         
        }
    })
   } else {
    $scope.cartSelected = [];
   }
  }
 
 $scope.checkOrder = () => {
    if(currentUsername == null) {
      window.location.href = "/account/login"
    } else {
      if($scope.cartSelected.length <= 0) {
        Swal.fire(
          'Chưa có sản phẩm nào!',
          `Vui lòng chọn sản phẩm để thanh toán!`,
          'warning'
        )
        return;
      }
      window.sessionStorage.setItem("user",JSON.stringify( $scope.user));
      window.sessionStorage.setItem("arrCartSelected",JSON.stringify( $scope.cartSelected));
      window.location.href = "/client/cart/checkout"
    }
 }
 $scope.getUs();
  $scope.isIndex = $location.absUrl().includes('index');
  $scope.isCategory= $location.absUrl().includes('ListCategory');
    $scope.notNull();
    $scope.load_all_product();
    $scope.load_all_image();
    $scope.load_all_price();
    $scope.load_all_brand();
    $scope.load_all_discountPrice();

}

function listCategory($scope, $http) {
  $scope.load_all_productBrand = (name) => {
    var url;
    url = `${host}/product/brand/${name}`;
    if (name == "xemTatCa") {
      url = `${host}/productItems`;
    }
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.productBrands = resp.data;
        $scope.thuonghieu = name;
        window.sessionStorage.removeItem("brandName");
        console.log("Success1_productBrand", resp);
      })
      .catch((error) => {
        console.log("Error_productBrand", error);
      });
  };
  const id = window.sessionStorage.getItem("brandName");
  $scope.load_all_productBrand(id);


}

