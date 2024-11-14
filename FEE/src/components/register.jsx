import React from 'react'
import './register.css'
const register = () => {
  return (
    <div className='regi'>
      <section className="section5">
        <img src="https://cdn.pixabay.com/photo/2017/06/04/23/17/lighthouse-2372461_1280.jpg" />
      </section>
      <section className="container5_1">
        <div className="upper">
          <h1>CREATE ACCOUNT</h1>
          <hr></hr>
        </div>
        <div className='container5_2'>
          <form className="form2">
            <input id="in" type="text" placeholder="Name" />
            <input id="in" type="email" placeholder="Your email" />

            <input id="in" type="password" placeholder="password" />
            <input id="in" type="password" placeholder="confirm password" />

            <label className="check-1">
              <input type="checkbox" className="agreeCheckbox"/> 
              <p>I agree to the terms and conditions</p>
            </label>

            <button className="signup1">REGISTER</button>

            <a href="/login" className="signin-link">Have already an account? <span>Signin!</span></a>
          </form>
        </div>
      </section>
    </div>
  )
}

export default register
