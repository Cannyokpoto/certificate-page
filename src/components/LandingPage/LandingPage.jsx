import React, {useState} from 'react';
import './LandingPage.css';
import PHOTOS from '../../assets/images';
import axios from 'axios';
import Loading from '../Loading/Loading';


function LandingPage() {
    const [loading, setLoading] = useState(false)
    const [screen, setScreen] = useState('landing')
    const handleScreen = () =>{
        setScreen('result')
    }

  //To view a single customer 

  const [student, setStudent] = useState(null);
  console.warn("student:", student)

  const [date, setDate] = useState([]);

  const [certificateError, setCertificateError] = useState('');
  console.warn("certificateError:", certificateError)

  const [certificateNumber, setCertificateNumber] = useState('');
  const certNumHandler = (event) =>{
    setCertificateNumber(event.target.value)
    setCertificateError('')
  }
  console.warn("certificateNumber:", certificateNumber)


  async function viewCertificate(){
    const url = `https://server.handiwork.com.ng/api/certificates/number/${certificateNumber}`

    if(certificateNumber.length > 0 && certificateNumber.length === 6){

      try {  
        setLoading(true)
        const response = await axios.get(url)
  
        setStudent(response.data.certificate);
        handleScreen()
        
        
    }catch(dupError) {
        console.warn("dupError:", dupError.response.data.error)
        setCertificateError(dupError.response.data.error)
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

    
  return (
    <div className={screen === "landing" ? 'pageWrapper wrapper-bg' : 'pageWrapper'}>
      <header className='header'>
        <img src={PHOTOS.LOGO} alt="" />
      </header>

        {screen === 'landing' && student ==null ?
        <div className="landing">
            <div className="left">
                <h1>Welcome to 
                    our <span>Certificate
                    Verification Portal</span>
                </h1>

                <p>All issued certificates by Page Innovations has certificate number for verification by companies. We understand that certificates can be forged and we’ve taken measures to combat that.</p>
            </div>

            <div className="right">
                <p>You can search to confirm  student's certificate by certificate no:</p>

                <input type="number" placeholder='Enter cert. no.' onChange={certNumHandler}/>
                
                <p className='certError'>{certificateError}</p>

                <button onClick={viewCertificate}>Search</button>
            </div>
            { loading ? <Loading /> : "" }
        </div> : ""}

      {student !==null && screen === 'result' ?
      <div className="result">
        <div className="left">
            <img src={`https://server.handiwork.com.ng/${student.certificate_file_path}`} alt="" />
        </div>

        <div className="right">
            <div className="name">{student.student_name}</div>
            
            <p>Course: {student.course}</p>
            <p>Cert No: {student.certificate_number}</p>
            <p>Issued Date: {student.issued_date.slice(0, 10)}</p>
        </div>
      </div> : ""}
    </div>
  )
}

export default LandingPage
