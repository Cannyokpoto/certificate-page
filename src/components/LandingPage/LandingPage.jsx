import React, {useState} from 'react';
import './LandingPage.css';
import PHOTOS from '../../assets/images';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { GoArrowLeft } from "react-icons/go";


function LandingPage() {
    const [loading, setLoading] = useState(false)
    const [screen, setScreen] = useState('landing')
    const handleScreen = () =>{
        setScreen('result')
    }


    const url = "https://certificate-server-personal.onrender.com/"
    // const url = "https://certificate-server-2qyt.onrender.com/"
    // const url = "http://127.0.0.1:8000/"
    // const url = "https://server.handiwork.com.ng/api/certificates/number/${certificateNumber}"

  //To view a single customer 

  const [student, setStudent] = useState(null);
  console.log("student:", student)  

  const [certificateError, setCertificateError] = useState('');
  console.log("certificateError:", certificateError)

  const [certificateNumber, setCertificateNumber] = useState('');
  const certNumHandler = (event) =>{
    setCertificateNumber(event.target.value)
    setCertificateError('')
  }
  console.log("certificateNumber:", certificateNumber)


  async function viewCertificate(){

    if(certificateNumber.length > 0 && certificateNumber.length === 6){

      try {  
        setLoading(true)
        const response = await axios.post(`${url}api/certificate/verify`, {
          certificateNumber: certificateNumber
        })
  
        setStudent(response.data.data.certificate);
        handleScreen()
        
        
    }catch(dupError) {
       if(dupError){
        console.log("dupError:", dupError.response.data.message)
        setCertificateError(dupError.response.data.message)
       }
    }finally{
      setLoading(false)
    }
      
  }
  else if(certificateNumber.length > 0 && certificateNumber.length < 6){
    setCertificateError('Invalid certificate number.');
  }

  else if(certificateNumber.length > 0 && certificateNumber.length > 6){
    setCertificateError('Invalid certificate number.');
  }
  
  
  else if(certificateNumber ===''){
    setCertificateError('Please provide certificate number.');
  }
  
}

const goBack = ()=>{
  setScreen('landing');
  setStudent(null);
}

    
  return (
    <div className={screen === "landing" ? 'pageWrapper wrapper-bg' : 'pageWrapper'}>
      <header className='header'>
        <img src={PHOTOS.LOGO} alt="" />
      </header>

      {student !==null && screen === 'result' ?
        <GoArrowLeft className='anotherCert' onClick={goBack}/>
        : ""}

        {screen === 'landing' && student ==null ?
        <div className="landing">
            <div className="left">
                <h1>Welcome to 
                    our <span>Certificate
                    Verification Portal</span>
                </h1>

                <p>All certificates issued by Page Innovations have certificate number for verification by employers. We understand that certificates can be forged and we have taken measures to combat that.</p>
            </div>

            <div className="right">
                <p>You can search to verify  bearer's certificate by certificate number:</p>

                <input type="number" placeholder='Enter certificate number' onChange={certNumHandler}/>
                
                <p className='certError'>{certificateError}</p>

                <button onClick={viewCertificate}>Search</button>
            </div>
            { loading ? <Loading /> : "" }
        </div> : ""}

      {student !==null && screen === 'result' ?
      <div className="result">
        
        
        <div className="left">
            <img src={student && student.certificate} alt="certificate" />
        </div>

        <div className="right">
            <div className="name">{student && student.name}</div>
            
            <p>Course: {student && student.course}</p>
            <p>Cert No: {student && student.certificateNumber}</p>
            <p>Issued Date: {student && student.issuedDate}</p>
        </div>
      </div> : ""}
    </div>
  )
}

export default LandingPage
