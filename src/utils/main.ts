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
  console.log(currentPath,'currentPath');
  // Extract parent path (the first segment of the path)
  const parentPath = currentPath.split("/")[1]
    ? `/${currentPath.split("/")[1]}`
    : ""

  return parentPath
}
