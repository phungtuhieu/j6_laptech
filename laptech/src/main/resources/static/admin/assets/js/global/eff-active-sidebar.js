document.addEventListener("DOMContentLoaded", function () {
    const currentUrl = window.location.href;

    const menuItems = document.querySelectorAll(".submenu-nav-link");
    menuItems.forEach((menuItem) => {
        const menuItemUrl = menuItem.getAttribute("href");
        if (currentUrl.includes(menuItemUrl)) {
            menuItem.classList.add("active");
            const accordionItem = menuItem.closest(".accordion-item");
            if (accordionItem) {

                const collapse = accordionItem.querySelector(".accordion-collapse");
                if (collapse) {
                    collapse.classList.add("show");
                }
               
            }
        }
    });
});


