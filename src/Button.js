import propTypes from "prop-types"
import React from 'react'
import style from './Button.module.css'

const Button = ({text}) => {
  return (
    <button className={style.btn}>
      {text}
    </button>
  )
}

// Set prop types.
Button.propTypes = {
  text: propTypes.string.isRequired
}

export default Button
