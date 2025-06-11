import React from 'react'

const HighlightText = ({text, gradient}) => {
  return (
    <span className={`font-bold ${gradient} bg-clip-text text-transparent`}>
        {text}
    </span>
  )
}

export default HighlightText