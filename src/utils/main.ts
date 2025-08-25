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
  const parentPath = currentPath.split('/')[1] ? `/${currentPath.split('/')[1]}` : ''

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
    const header: any = table.querySelector('.header')
    if (!header) return

    const headerCells: any = header.querySelectorAll('.cell')
    const bodyRows: any = table.querySelectorAll('.table-item')
    const _pinnedHeaderCell: any = header.querySelector('.cell.pinned')

    const columnCount = headerCells.length
    if (!columnCount) return

    // Reset tất cả flex styles trước khi tính toán
    const allCells = table.querySelectorAll('.cell')
    allCells.forEach((cell: any) => {
      cell.style.flex = ''
      cell.style.minWidth = ''
      cell.style.width = ''
    })

    // Đợi browser re-render
    setTimeout(() => {
      // Lấy độ rộng tự nhiên của từng cột header
      const columnWidths = Array.from(headerCells).map((cell: any) => {
        const computedStyle = window.getComputedStyle(cell)
        const paddingLeft = parseFloat(computedStyle.paddingLeft || '0')
        const paddingRight = parseFloat(computedStyle.paddingRight || '0')
        const contentWidth = cell.scrollWidth - paddingLeft - paddingRight
        return Math.max(contentWidth, 80) // Minimum width 80px
      })

      // So sánh và lấy độ rộng lớn nhất giữa header và tất cả body cells cho từng cột
      Array.from(bodyRows).forEach((row: any) => {
        const cells: any = row.querySelectorAll('.cell')
        cells.forEach((cell: any, index: number) => {
          if (index < columnWidths.length) {
            const computedStyle = window.getComputedStyle(cell)
            const paddingLeft = parseFloat(computedStyle.paddingLeft || '0')
            const paddingRight = parseFloat(computedStyle.paddingRight || '0')
            const contentWidth = cell.scrollWidth - paddingLeft - paddingRight
            const width = Math.max(contentWidth, 80)
            columnWidths[index] = Math.max(columnWidths[index], width)
          }
        })
      })

      // Áp dụng cho header
      headerCells.forEach((cell: any, index: number) => {
        const width = columnWidths[index]
        cell.style.flex = `0 0 ${width}px`
        cell.style.minWidth = `${width}px`
        cell.style.maxWidth = `${width}px`
      })

      // Áp dụng cho body rows
      Array.from(bodyRows).forEach((row: any) => {
        const cells: any = row.querySelectorAll('.cell')
        cells.forEach((cell: any, index: number) => {
          if (index < columnWidths.length) {
            const width = columnWidths[index]
            cell.style.flex = `0 0 ${width}px`
            cell.style.minWidth = `${width}px`
            cell.style.maxWidth = `${width}px`
          }
        })
      })
    }, 10)
  }
}

export const capitalizeFirstLetter = (str: any) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Format a numeric string with thousands separators (e.g., 50000000 -> 50,000,000)
export const formatNumber = (value: string | number): string => {
  if (value === undefined || value === null) return ''
  const numeric = String(value).replace(/[^\d]/g, '')
  if (!numeric) return ''
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Remove all non-digit characters from a formatted number string
export const unformatNumber = (value: string | number): string => {
  if (value === undefined || value === null) return ''
  return String(value).replace(/[^\d]/g, '')
}
