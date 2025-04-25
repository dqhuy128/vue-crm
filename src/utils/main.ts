// Function to extract and uppercase the first word
export const uppercasedFirstWord = (path: any) => {
  // Your original path
  const originalPath = path

  const uppercased =
    originalPath
      .split('/')[1] // Split by '/' and get the first part
      .charAt(0)
      .toUpperCase() + originalPath.split('/')[1].slice(1) // Uppercase the first letter

  return uppercased
}

export const splitPath = (currentPath: any) => {
  // Extract parent path (the first segment of the path)
  const parentPath = currentPath.split('/')[1]
    ? `/${currentPath.split('/')[1]}`
    : ''

  return parentPath
}

export const calculateMainLayout = () => {
  const root: any = document.getElementById('MainLayout')
  const sidebar: any = document.getElementById('Sidebar')
  const pad = 24

  if (sidebar && screen.width >= 1280) {
    const sidebarWidth = sidebar.clientWidth
    const rootTotal = sidebarWidth + pad

    root.style.marginLeft = rootTotal + 'px'
  }
}

export const toggleSidebar = () => {
  const btn = document.getElementById('btnToggleSidebar')
  const mbBtn = document.getElementById('mbBtnCloseSidebar')
  const sidebar: any = document.getElementById('Sidebar')
  const root: any = document.getElementById('MainLayout')
  const sidebarWidth = sidebar.clientWidth
  const pad = 24
  const rootTotal = sidebarWidth + pad

  // if (sidebar.classList.contains('isTranslate')) {
  //   layout.style.marginLeft = sidebar.offsetWidth + 24 + 'px'
  //   layout.style.transition = 'margin .2s'
  //   sidebar.style.transform = 'translateX(0%)'
  //   sidebar.style.transition = 'transform .2s'
  //   sidebar.classList.remove('isTranslate')
  // } else {
  //   layout.style.marginLeft = 0
  //   layout.style.transition = 'margin .2s'
  //   sidebar.style.transform = 'translateX(-150%)'
  //   sidebar.style.transition = 'transform .2s'
  //   sidebar.classList.add('isTranslate')
  // }

  if (sidebar && screen.width >= 1280) {
    btn?.addEventListener('click', () => {
      if (sidebar.classList.contains('is-translate')) {
        root.style.marginLeft = rootTotal + 'px'
        root.style.transition = 'margin .3s'
        sidebar.style.transform = 'translateX(0%)'
        sidebar.style.transition = 'transform .3s'
        sidebar.classList.remove('is-translate')
      } else {
        root.style.marginLeft = '0'
        root.style.transition = 'margin .3s'
        sidebar.style.transform = 'translateX(-150%)'
        sidebar.style.transition = 'transform .3s'
        sidebar.classList.add('is-translate')
      }
    })
  } else {
    sidebar.classList.add('is-translate')

    mbBtn?.addEventListener('click', () => {
      sidebar.style.transform = 'translateX(-150%)'
      sidebar.style.transition = 'transform .3s'
      sidebar.classList.add('is-translate')
    })

    btn?.addEventListener('click', () => {
      if (sidebar.classList.contains('is-translate')) {
        sidebar.style.transform = 'translateX(0%)'
        sidebar.style.transition = 'transform .3s'
        sidebar.classList.remove('is-translate')
      }
    })
  }
}

export const tableMagic = () => {
  const table = document.getElementById('tableMagic')

  if (table) {
    const headerCells = document.querySelectorAll('.header .cell')
    const bodyRows = document.querySelectorAll('.table-item')
    const allRows = [document.querySelector('.header'), ...bodyRows]

    // Tính toán độ rộng tối đa của từng cột
    const columnWidths = Array.from(headerCells).map((cell) => cell.scrollWidth)

    allRows.forEach((row: any) => {
      const cells = row.querySelectorAll('.cell')
      cells.forEach((cell: any, index: any) => {
        const contentWidth = cell.scrollWidth
        if (contentWidth > columnWidths[index]) {
          columnWidths[index] = contentWidth
        }
      })
    })

    // Áp dụng độ rộng cho tất cả các cột
    allRows.forEach((row: any) => {
      const cells = row.querySelectorAll('.cell')
      cells.forEach((cell: any, index: any) => {
        cell.style.flex = `0 0 ${columnWidths[index]}px`
        cell.style.minWidth = `${columnWidths[index]}px`
      })
    })
  }
}

export const capitalizeFirstLetter = (str: any) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
