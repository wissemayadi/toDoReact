import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import Button from './button'
const Header = ({title,onAdd,showAdd}) => {
 const location = useLocation()
    return (
        <header>
       <h1 >{title}</h1>
      { location.pathname==='/' &&  <Button
        color={showAdd ? 'red' :  'green'}
        text={showAdd ? 'Close':'Add'}
         onClick={onAdd}
       />} 
      

      
  </header>
    )
}

Header.defaultProps={
    title:'wess'
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
  }
//const headingStyle={
   // color:'red',
   // backgroundColor:'black'
//}
export default Header
