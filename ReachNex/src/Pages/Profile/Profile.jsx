import React from 'react'
import "./Profile.css"
import img from "../../assets/react.svg"
const Profile = () => {
  return (
    <div>
      <div className='Container'>
          <div className='MainDiv'>
            <div className='profile'>
                <img className='img' src='https://media.licdn.com/dms/image/v2/D4D22AQGP1y6mhK9vzg/feedshare-shrink_800/B4DZc5ysy8GgAg-/0/1749021292012?e=1753315200&v=beta&t=tTi0UUsi1dMytYg6i2D66q35C4cIGkDl1n4zsWb80IA'/>
                <div className='profileimg'>
                  <img className='profileimg1' src="https://media.licdn.com/dms/image/v2/D4E22AQGzdwFPF_HJvA/feedshare-shrink_800/B4EZd07dtcHIAo-/0/1750013435577?e=1753315200&v=beta&t=nT64i52Jwur_krzOPc6WutE2jVZ05WcSNAGaZOBzzMU" alt="" />
                </div>
                <div></div>
            </div>
            <div className='main'>
                <div >
                  <div className='name'>Muhammad Shazaib</div>
                  <div className='profession'>I am a Software engineer</div>
                  <div className='location'>Lahore, Pakistan</div>
                  <div className='connection'>4 Connection</div>

                  <div className='buttondiv'>
                    <div className='buttonmain'>
                      <div className='btn'>Open to</div>
                      <div className='btn'>Share</div>
                      <div className='btn'>Log out</div>
                    </div>
                    <div className='buttonmain'>
                      <div className='btn'>Message</div>
                      <div className='btn'>Connect</div>
                    </div>
                  </div>
                </div>

            </div>
          </div>
      </div>
    </div>
  )
}

export default Profile