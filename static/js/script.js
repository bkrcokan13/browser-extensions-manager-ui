const themeBtnIcons = {
    'light' : '/assets/images/icon-moon.svg',
    'dark' : '/assets/images/icon-sun.svg'
};
const themeBtnIcon = document.getElementById('theme-switch-icon');
const themeBtn = document.getElementById('theme-switch-btn');
const filterButtons = document.querySelectorAll(".filter-btn");
const extensionBody = document.querySelector(".extensions-list");
let extensionsAll = [];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Data Fetch
    initExtensions();

    // Initialize Theme Icon
    themeBtnIcon.src = document.body.classList.contains('dark') ? themeBtnIcons.dark : themeBtnIcons.light;
    themeBtn.addEventListener('click' , lightDarkTheme);

    // Initialize Filter Button
    filterButtons.forEach((filterButton,idx) => {

        filterButton.addEventListener('click', () => {
            let filteredData = extensionsAll;

            if(filterButton.classList.contains("active")) {
                return;
            }
            filterButtons.forEach(btn => btn.classList.remove("active"));
            filterButton.classList.add("active");

            // Clear Extensions Body
            switch (idx) {
                case 0:
                    extensionBody.innerHTML = "";

                    filteredData.forEach((d) => {
                        extensionBody.innerHTML += "<div class=\"extension\"></div>\n"
                    });
                    break;
                case 1:
                    extensionBody.innerHTML = "";

                    filteredData = extensionsAll.filter(val => val.isActive);
                    filteredData.forEach(d => {
                        extensionBody.innerHTML += "<div class=\"extension\"></div>\n"
                    })
                    break;
                case 2:
                    extensionBody.innerHTML = "";

                    filteredData = extensionsAll.filter(val => !val.isActive);
                    filteredData.forEach(d => {
                        extensionBody.innerHTML += "<div class=\"extension\"></div>\n"
                    });
                    break;
            }
        });
    });

});
async function initExtensions() {
    extensionsAll = await getExtensionsData();
    await setActiveFilterButton(0);

}
 async function getExtensionsData() {
    try {
        const res = await fetch("data.json");

        if(!res.ok) {
            console.error(`Error, extensions is not fetched ! \n\r Status : ${res.status}`);
        }

        return await res.json();
    }
    catch(error) {
        console.error(error);
        return null;
    }

}
function setActiveFilterButton(btnIndex) {
    let allData = extensionsAll;
    try {
        filterButtons.forEach((val,idx) => {
            if (btnIndex === idx) {
                val.classList.toggle("active", true);
                // Clear Body
                extensionBody.innerHTML = "";
                allData.forEach(data => {
                    extensionBody.innerHTML += "<div class=\"extension\"></div>\n"
                });

            }
        });
    } catch (error) {
        console.error(error);
    }
}



function lightDarkTheme() {
    const bodyContainer = document.body;

    if (bodyContainer.classList.contains("dark")) {
        bodyContainer.classList.remove("dark");

        bodyContainer.classList.add("light");
        themeBtnIcon.src = themeBtnIcons.light;
    } else {
        bodyContainer.classList.remove("light");
        bodyContainer.classList.add("dark");
        themeBtnIcon.src = themeBtnIcons.dark;
    }
}

