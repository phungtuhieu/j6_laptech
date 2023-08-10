
let host = "http://localhost:8081/api";
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
 

function index($scope, $http, $interval,$rootScope) {
  $scope.pageCount;
  $scope.items = [];
  $scope.currentPage = 1;

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
      })
      .catch((error) => {
        console.log("Error_product", error);
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

  $scope.login = function () {
    $http
      .get("/api/account")
      .then(function (userResponse) {

        $scope.user = userResponse.data;
        console.log("Dữ liệu user nè:", $scope.user);
        $scope.favoriteLikeUser($scope.user.username);
        window.sessionStorage.setItem("user", JSON.stringify($scope.user));
        
      })
      .catch(function (error) {
        console.error("Lỗi khi lấy thông tin người dùng", error);
      });
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


  $rootScope.cart =  {
    items :[],
    
    add(id){
      var prodPrice = {
        prod: {},
        priceObj: {}
      };
      var item = this.items.find(item => item.prod.id == id);
      if(item) {
        item.prod.quantity++;
        this.saveToLocalStorage();
        console.log("items-cart",this.items);
      
      }else {
        $http.get(`${host}/product/${id}`).then(resp => {
          resp.data.quantity = 1;
          prodPrice.prod = resp.data;
            $http.get(`${host}/product/cart/price/${id}`).then(resp => {
              prodPrice.priceObj = resp.data;
              this.items.push(prodPrice);
              this.saveToLocalStorage();
            }).catch(err => {
              console.log("err-cart-price"+err);
            })
          console.log("items-cart",this.items);
        }).catch(err => {
          console.log("err-cart",err);
        })
        
      }
      Swal.fire(
        'Cảm ơn bạn',
        'Sản phẩm đã được thêm vào giỏ hàng thành công',
        'success'
      )
    },
    remove(id){
      var index = this.items.findIndex(item => item.prod.id == id);
      this.items.splice(index,1);
      this.saveToLocalStorage();

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
        Swal.fire(
          'Đã xóa!',
          'Tất cả sản phẩm đã được xóa khỏi giỏ hàng.',
          'success'
        )
        this.items= [];
        this.saveToLocalStorage();
        $scope.$applyAsync();
      })
    },
    amt_of(item){},
    get count(){
      var c = this.items.map(item => item.prod.quantity).reduce((total,quantity) => total += quantity,0);
      console.log("count-cart",c);
      return c ;
    },
    get amount(){
      var am = this.items.map(item => item.prod.quantity * item.priceObj.price).reduce((total,price) => total += price,0);
      
      return am ;
    },
    saveToLocalStorage(){
      var json = JSON.stringify(angular.copy(this.items));
      localStorage.setItem("cart",json);
      $rootScope.$emit('countChanged', this.count);
    },
    loadFromLocalStorage(){
      var json = localStorage.getItem('cart');
      this.items =  json ? JSON.parse(json) : []
      $rootScope.$emit('countChanged', this.count);
    }
   
  }
  $scope.cart.loadFromLocalStorage();
 
  $scope.login();
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

