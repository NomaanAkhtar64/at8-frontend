import React, { useLayoutEffect } from 'react'

const Title: React.FC<{ children: string }> = ({ children }) => {
  useLayoutEffect(() => {
    document.title = children
  }, [children])
  return null
}

export default Title
