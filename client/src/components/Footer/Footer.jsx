import React from 'react'
import "./footer.scss"
import linkedin from "../../assets/icons/linkedin.svg"
import facebook from "../../assets/icons/facebook.svg"
import instagram from "../../assets/icons/instagram.svg"
import copyright from "../../assets/icons/copyright.svg"

const Footer = () => {
  return (
    <>
    <div className='icons'>
      <img src={linkedin} alt="" />
      <img src={facebook} alt="" />
      <img src={instagram} alt="" />
    </div>
    <div className="copyright">
<p>Copyright 2024</p>
<img src={copyright} alt="" />
</div>
<p>Parmenas Mukururi</p>
   
    </>
  )
}

export default Footer