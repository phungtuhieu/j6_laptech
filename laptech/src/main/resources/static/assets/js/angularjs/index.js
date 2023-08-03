
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

    function index($scope, $http) {
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

        $scope.load_all = () => {
            var url = `${host}/index`;
            $http({
                method: "GET",
                url: url,
            })
            .then((resp) => {
                $scope.items = resp.data;
                $scope.pageCount = Math.ceil($scope.items.length / 10);
                $scope.updatePagination(); 
                console.log("Success1", resp);
            })
            .catch((error) => {
                console.log("Error", error);
            });
        };

        $scope.load_all();
    }