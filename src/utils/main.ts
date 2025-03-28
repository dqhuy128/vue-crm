// Function to extract and uppercase the first word
export const uppercasedFirstWord = (path: any) => {
  // Your original path
  const originalPath = path

  const uppercased =
    originalPath
      .split("/")[1] // Split by '/' and get the first part
      .charAt(0)
      .toUpperCase() + originalPath.split("/")[1].slice(1) // Uppercase the first letter

  return uppercased
}

export const splitPath = (currentPath: any) => {
  console.log(currentPath, "currentPath")
  // Extract parent path (the first segment of the path)
  const parentPath = currentPath.split("/")[1]
    ? `/${currentPath.split("/")[1]}`
    : ""

  return parentPath
}

export const calculateMainLayout = () => {
  const root: any = document.getElementById("MainLayout")
  const sidebar: any = document.getElementById("Sidebar")
  const pad = 24

  if (sidebar && screen.width >= 1280) {
    const sidebarWidth = sidebar.clientWidth
    const rootTotal = sidebarWidth + pad

    root.style.marginLeft = rootTotal + "px"
  }
}

export const toggleSidebar = () => {
  const btn = document.getElementById("btnToggleSidebar")
  const mbBtn = document.getElementById("mbBtnCloseSidebar")
  const sidebar: any = document.getElementById("Sidebar")
  const root: any = document.getElementById("MainLayout")
  const sidebarWidth = sidebar.clientWidth
  const pad = 24
  const rootTotal = sidebarWidth + pad

  if (sidebar && screen.width >= 1280) {
    btn?.addEventListener("click", () => {
      if (sidebar.classList.contains("is-translate")) {
        root.style.marginLeft = rootTotal + "px"
        sidebar.style.transform = "translateX(0)"
        sidebar.classList.remove("is-translate")
      } else {
        root.style.marginLeft = "0"
        sidebar.style.transform = "translateX(-150%)"
        sidebar.classList.add("is-translate")
      }
    })
  } else {
    sidebar.classList.add("is-translate")

    mbBtn?.addEventListener("click", () => {
      root.style.marginLeft = "0"
      sidebar.style.transform = "translateX(-150%)"
      sidebar.classList.add("is-translate")
    })

    btn?.addEventListener("click", () => {
      if (sidebar.classList.contains("is-translate")) {
        sidebar.style.transform = "translateX(0)"
        sidebar.classList.remove("is-translate")
      }
    })
  }
}
