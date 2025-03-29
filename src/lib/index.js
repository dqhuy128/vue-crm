// Function to calc rectangle white
export const calcBgBefore = () => {
    const init = () => {
        const formIndex = document.getElementById("formLoginIndex");
        const formStart = document.getElementById("formLoginStart");
        const offsetLeft = formIndex.offsetLeft;
        const formStartW = formStart.offsetWidth;
        const offsetSpace = offsetLeft + formStartW;
        const rectangleLogin = document.getElementById("rectangleLogin");
        rectangleLogin.style.width = offsetSpace + "px";
    };
    if (screen.width >= 768) {
        init();
        window.addEventListener("resize", () => init());
    }
};
