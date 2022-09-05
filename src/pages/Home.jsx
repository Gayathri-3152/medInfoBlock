import { getByDisplayValue } from '@testing-library/react';
import React , { Component}  from 'react';
import './App.css';

const Home=()=>{
    return(
        <div className="arrange">
            <center> 
            <img src = { require ('./images/medicalLogo.png')} height = {300} width = {300}/>
            </center>
           <h4> <font color = "blue" > OVERWIEW :  </font></h4>
           <h5> <font face = "comic sans ms" >One of the most important requirements in today's smart health care system is the safeguarding of sensitive patient 
           data from possible attackers. 
           Our approach is to develop blockchain based secure and efficient data accessibility
           mechanism. User has the ability to decide who can access, update and view their information. 
           It restricts Unauthorized data alteration so trust worthy records are maintained.
           Electronic medical records could be quickly transferred to medical personnel, as well as used for self-monitoring and homecare. 
           Rapid transfer of data helps in insurance claiming. 
           The unique characteristics of our application can determine the disease's origin and transmission factors.
           </font> </h5> 

           <div className = "images">
                <div className = "image">
               <img src = { require ('./images/heart.jpg')} height = {250} width = {250}/>
               <img src = { require ('./images/img1.jpg')} height = {250} width = {250}/>
               <img src = { require ('./images/img2.jpg')} height = {250} width = {250} />
               <img src = { require ('./images/img3.jpg')} height = {200} width = {200} />
               </div> 
                </div>

           
              <div className="space"> <h4> <font color = "blue" > FEATURES  :  </font></h4>
               <h5> <font face = "comic sans ms" > * MedInfoBlock has the capacity to increase the efficiency of interoperability,
                which can lead to better patient care overall.</font> </h5> 
                <h5> <font face = "comic sans ms" > * Communication between providers is more fluid.</font> </h5> 
                <h5> <font face = "comic sans ms" > * Patient will receive care in a faster and more efficient manner.</font> </h5> 
              </div>
              <div className="space">
                <h4> <font color = "blue" > CUSTOMER BENEFITS :  </font></h4>
                <h5> <font face = "comic sans ms" > * From 2009 to 2017, over 176 million data breaches occurred with respect 
                to healthcare records.The secure features associated with the blockchain can help protect health information 
                much better.</font> </h5> 
                <h5> <font face = "comic sans ms" > * We can generate digital health records anywhere and anytime 
                remotely.</font> </h5> 
                <h5> <font face = "comic sans ms" > * MedInfoBlock is more trustworthy since our records are more secured.</font> </h5>
              </div> 
    </div>
                
        
    )
}

export default Home;