import React, {useState} from 'react'
import './LandingPage.css'
import PHOTOS from '../assets/images'


function LandingPage() {
    const [screen, setScreen] = useState('landing')
    const handleScreen = () =>{
        setScreen('result')
    }

    
  return (
    <div className={screen === "landing" ? 'pageWrapper wrapper-bg' : 'pageWrapper'}>
      <header className='header'>
        <img src={PHOTOS.LOGO} alt="" />
      </header>

        {screen === 'landing' ?
        <div className="landing">
            <div className="left">
                <h1>Welcome to 
                    our <span>Certificate
                    Verification Portal</span>
                </h1>

                <p>All issued certificates by Page Innovations has certificate number for verification by companies. We understand that certificates can be forged and we’ve taken measures to combat that.</p>
            </div>

            <div className="right">
                <p>You can search to confirm  student's certificate by name or certificate no:</p>

                <input type="text" placeholder='Enter name or cert. no.'/>

                <button onClick={handleScreen}>Search</button>
            </div>
        </div> : ""}

      {screen === 'result' ?
      <div className="result">
        <div className="left">
            <img src={PHOTOS.cert} alt="" />
        </div>

        <div className="right">
            <div className="name">Olaleye Babatunde Augustine</div>
            
            <p>Course: Data Analytics</p>
            <p>Cert No: 10002345</p>
            <p>Issued Date: 21/08/24</p>
        </div>
      </div> : ""}
    </div>
  )
}

export default LandingPage
