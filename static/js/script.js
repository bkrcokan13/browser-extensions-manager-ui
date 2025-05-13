// Defines
const themeBtnIcon = document.getElementById('theme-switch-icon');
const themeBtn = document.getElementById('theme-switch-btn');
const filterButtons = document.querySelectorAll(".filter-btn");
const extensionBody = document.querySelector(".extensions-list");

// Extensions Lists
let extensionsAll = [];

// Theme Button Icons
const themeBtnIcons = {
    'light': '/assets/images/icon-moon.svg',
    'dark': '/assets/images/icon-sun.svg'
};
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Data Fetch
    initExtensions();

    // Initialize Theme Icon
    themeBtnIcon.src = document.body.classList.contains('dark') ? themeBtnIcons.dark : themeBtnIcons.light;
    themeBtn.addEventListener('click', lightDarkTheme);

    // Initialize Filter Button
    filterButtons.forEach((filterButton, idx) => {
        // Filter Button Click Event
        filterButton.addEventListener('click', () => {
            let filteredData = extensionsAll;
            // Check Active Status
            if (filterButton.classList.contains("active")) {
                return;
            }
            filterButtons.forEach(btn => btn.classList.remove("active"));
            filterButton.classList.add("active");
            // Clear Extensions Body
            switch (idx) {
                case 0:
                    extensionBody.innerHTML = "";
                    filteredData.forEach((d) => {
                        extensionBody.innerHTML += `
                                <div class="extension">
                                    <div class="extension-box-container">
                                          <div class="extensions-info">
                                            <div class="extension-icon">
                                              <img src="${d.logo}" alt="">
                                            </div>
                                            <div class="extensions-details">
                                              <h3>${d.name}</h3>
                                              <p>${d.description}</p>
                                            </div>
                                          </div>
                                          <div class="extensions-buttons">
                                            <a href="javascript:void(0)" class="remove-btn">Remove</a>
                                            <label class="active-btn">
                                              <input type="checkbox" ${d.isActive ? "checked" : ""}>
                                              <span class="slider"></span>
                                            </label>
                                          </div>
                                    </div>                                       
                              </div> `;

                        console.log(filteredData.name);
                    });
                    break;
                case 1:
                    extensionBody.innerHTML = "";

                    // Only Active
                    filteredData = extensionsAll.filter(val => val.isActive);
                    filteredData.forEach(d => {
                        extensionBody.innerHTML += `
                             <div class="extension">
                                    <div class="extension-box-container">
                                          <div class="extensions-info">
                                            <div class="extension-icon">
                                              <img src="${d.logo}" alt="">
                                            </div>
                                            <div class="extensions-details">
                                              <h3>${d.name}</h3>
                                              <p>${d.description}</p>
                                            </div>
                                          </div>
                                          <div class="extensions-buttons">
                                            <a href="javascript:void(0)" class="remove-btn">Remove</a>
                                            <label class="active-btn">
                                              <input type="checkbox" ${d.isActive ? "checked" : ""}>
                                              <span class="slider"></span>
                                            </label>
                                          </div>
                                    </div>                                       
                              </div>
                        `;
                    });
                    break;
                case 2:
                    extensionBody.innerHTML = "";

                    // Only InActive
                    filteredData = extensionsAll.filter(val => !val.isActive);
                    filteredData.forEach(d => {
                        extensionBody.innerHTML += `
                             <div class="extension">
                                    <div class="extension-box-container">
                                          <div class="extensions-info">
                                            <div class="extension-icon">
                                              <img src="${d.logo}" alt="">
                                            </div>
                                            <div class="extensions-details">
                                              <h3>${d.name}</h3>
                                              <p>${d.description}</p>
                                            </div>
                                          </div>
                                          <div class="extensions-buttons">
                                            <a href="javascript:void(0)" class="remove-btn">Remove</a>
                                            <label class="active-btn">
                                              <input type="checkbox" ${d.isActive ? "": ""}>
                                              <span class="slider"></span>
                                            </label>
                                          </div>
                                    </div>                                       
                              </div>
                        `;
                    });
                    break;
            }
        });
    });

});

// Load Extensions
async function initExtensions() {
    extensionsAll = await getExtensionsData();
    await setActiveFilterButton(0);
}
// Fetch Extensions Data
async function getExtensionsData() {
    try {
        const res = await fetch("data.json");

        if (!res.ok) {
            console.error(`Error, extensions is not fetched ! \n\r Status : ${res.status}`);
        }

        return await res.json();
    }
    catch (error) {
        console.error(error);
        return null;
    }

}

// Set Active Any Filter Button --> Default Index : 0
function setActiveFilterButton(btnIndex) {
    let allData = extensionsAll;
    try {
        filterButtons.forEach((val, idx) => {
            if (btnIndex === idx) {
                val.classList.toggle("active", true);
                // Clear Body
                extensionBody.innerHTML = "";
                allData.forEach(data => {
                    extensionBody.innerHTML += `
                                <div class="extension">
                                    <div class="extension-box-container">
                                          <div class="extensions-info">
                                            <div class="extension-icon">
                                              <img src="${data.logo}" alt="">
                                            </div>
                                            <div class="extensions-details">
                                              <h3>${data.name}</h3>
                                              <p>${data.description}</p>
                                            </div>
                                          </div>
                                          <div class="extensions-buttons">
                                            <a href="javascript:void(0)" class="remove-btn">Remove</a>
                                            <label class="active-btn">
                                              <input type="checkbox" ${data.isActive ? "checked" : ""}>
                                              <span class="slider"></span>
                                            </label>
                                          </div>
                                    </div>                                       
                              </div> `;
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
}


// Switch Dark or Light Theme Button
function lightDarkTheme() {
    const bodyContainer = document.body;

    if (bodyContainer.classList.contains("dark")) {
        bodyContainer.classList.remove("dark");

        bodyContainer.classList.add("light");

        // Switch Button Icon
        themeBtnIcon.src = themeBtnIcons.light;
    } else {
        bodyContainer.classList.remove("light");
        bodyContainer.classList.add("dark");
        themeBtnIcon.src = themeBtnIcons.dark;
    }
}

