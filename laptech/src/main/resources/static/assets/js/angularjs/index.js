
let host = "http://localhost:8081/api";
const app = angular.module("app", []);
app
    .filter('formatCurrency', function () {
        return function (input) {
            // Chuyển đổi số tiền thành tiền Việt Nam
            var formattedPrice = input.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            return formattedPrice;
        };
    })
    .controller("index", index);;

    function index($scope, $http,$interval) {
        $scope.pageCount;
        $scope.items = [];
        $scope.currentPage = 1;


        function generatePaginationNumbers(currentPage, pageCount) {
            const pagination = [];
            const MAX_VISIBLE_PAGES = 5;
        
            if (pageCount <= MAX_VISIBLE_PAGES) {
                for (let i = 1; i <= pageCount; i++) {
                    pagination.push({ page: i });
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
            return pagination;
        }
        $scope.updatePagination = function () {
            $scope.pagination = generatePaginationNumbers($scope.currentPage, $scope.pageCount);
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
                console.log("Success1", resp);
            })
            .catch((error) => {
                console.log("Error", error);
            });
        };
        $scope.load_all = () => {
            var url = `${host}/productItems`;
            $http({
                method: "GET",
                url: url,
            })
            .then((resp) => {
                $scope.items = resp.data;
                // Vòng lặp qua từng phần tử trong mảng để gọi $scope.image()
                for (let i = 0; i < $scope.items.length; i++) {
                    $scope.imageOne($scope.items[i].id);
                }
                $scope.pageCount = Math.ceil($scope.items.length / 10);
                $scope.updatePagination(); 
                console.log("Success1", resp);
            })
            .catch((error) => {
                console.log("Error", error);
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
                console.log("SuccessOne", resp.data);
            })
            .catch((error) => {
                console.log("Error", error);
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
                console.log("Success1", resp);
            })
            .catch((error) => {
                console.log("Error", error);
            });
        };
        

        $scope.load_all();
        $scope.load_all_image();
        $scope.load_all_price();
      

        $scope.slideIndex = 1;

        $scope.plusSlides =  (n) => {
          $scope.showSlides($scope.slideIndex += n);
        };
        
        $scope.currentSlide =  (n) => {
          $scope.showSlides($scope.slideIndex = n);
        };
        
        $scope.showSlides =  (n) => {
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
        
         window.onload = function() {
            $scope.showSlides(1);
          };
          $interval(function() {
            $scope.showSlides(1)
          }, 0);

          window.addEventListener('click', function () {
            $scope.showSlides(1);
          });
    }