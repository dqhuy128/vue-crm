// Function to calc rectangle white
export const calcBgBefore = () => {
  const init = () => {
    const formIndex: any = document.getElementById("formLoginIndex")
    const formStart: any = document.getElementById("formLoginStart")
    const offsetLeft: number = formIndex.offsetLeft
    const formStartW: number = formStart.offsetWidth
    const offsetSpace: number = offsetLeft + formStartW
    const rectangleLogin: any = document.getElementById("rectangleLogin")
    rectangleLogin.style.width = offsetSpace + "px"
  }

  if (screen.width >= 768) {
    init()
    window.addEventListener("resize", () => init())
  }
}
