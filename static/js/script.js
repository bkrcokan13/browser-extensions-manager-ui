const themeBtnIcons = {
    'light' : '/assets/images/icon-moon.svg',
    'dark' : '/assets/images/icon-sun.svg'
};
const themeBtnIcon = document.getElementById('theme-switch-icon');




document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-switch-btn');

    // Initalize Theme Icon
    themeBtnIcon.src = document.body.classList.contains('dark') ? themeBtnIcons.dark : themeBtnIcons.light;

    themeBtn.addEventListener('click' , lightDarkTheme);
});





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