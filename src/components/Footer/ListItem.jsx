import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({
    text,link
}) => {
  return (
    <Link to={link} className='font-inter text-sm text-richblack-400 '>
        {text}
    </Link>
  )
}

export default ListItem