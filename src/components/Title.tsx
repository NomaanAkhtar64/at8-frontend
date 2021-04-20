import React from 'react'

const Title: React.FC<{ children: string }> = ({ children }) => {
  document.title = children
  return null
}

export default Title
