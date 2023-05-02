// import React from 'react'
// import BiopathLogo from '../../utils/images/IMG_6229.png'
// import Signature from '../../utils/images/mainSignature-removebg-preview.png'
// import './downloadReportPage.scss'

// const DownloadReportPage = () => {
//   return (
//     <div className='downloadReportPageContainer' id='report'>
//       <div className='doctorPage'>
//         <div className='topLogo'>
//           <img src={BiopathLogo} alt='Logo' />
//         </div>
//         <div className='doctorPageTopDetails'>
//           <div className='doctorPageTopDate'> December-02-2022</div>
//           <div className='doctorPageTopName doctorPageTopKey'>
//             NAME: <span>John Doe</span>
//           </div>
//           <div className='doctorPageTopAge doctorPageTopKey'>
//             AGE: <span>23</span>
//           </div>
//           <div className='doctorPageTopSex doctorPageTopKey'>
//             SEX: <span>Male</span>
//           </div>
//           <p>
//             I wish to inform you that we have examined the above referenced
//             individual referred from your office. We have made the following
//             observations as documented below (done following a general physical
//             examination and a mandatory laboratory investigation)
//           </p>
//         </div>
//         <div className='parametersInvestigated'>
//           <div className='parametersInvestigatedTitle'>
//             PARAMETERS INVESTIGATED
//           </div>
//           <div className='param'>
//             Body mass index is over-weight at 26.8Kg/m2
//           </div>
//           <div className='param'>Temperature =36.0º Celsius,</div>
//           <div className='param'>
//             Blood pressure is <span>HIGH</span> at 148/98mmHg.
//           </div>
//           <div className='param'>
//             Heart Rate -90 beats per minute regular with a good volume
//           </div>
//           <div className='param'>
//             Visual Acuity: Right Eye: 20/20 Left Eye: 20/20
//           </div>
//         </div>
//         <div className='recommendation'>
//           <div className='recommendationTitle'>RECOMMENDATION</div>
//           <div className='recommendationBody'>
//             <p>
//               In the light of all the results obtained, the above-named person
//               is hereby certified as medically fit.
//             </p>
//             <p>
//               Kindly, find attached the result of Laboratory investigations.
//             </p>
//             <p>Thank you for choosing BioPath Laboratory </p>
//             <img src={Signature} alt='Signature' />
//             <div className='nameOfDoc'></div>
//             <div className='positionOfDoc'></div>
//           </div>
//         </div>
//         <div className='docPageFooter'></div>
//       </div>
//       <div className='labPage'></div>
//     </div>
//   )
// }

// export default DownloadReportPage

import React from 'react'
import BiopathLogo from '../../utils/images/IMG_6229.png'
import Signature from '../../utils/images/mainSignature-removebg-preview.png'
import './downloadReportPage.scss'

const DownloadReportPage = () => {
  return (
    <div className='downloadReportPageContainer' id='report'>
      <div className='doctorPage'>
        <div className='topLogo'>
          <img src={BiopathLogo} alt='Logo' />
        </div>
        <div className='doctorPageTopDetails'>
          <div className='doctorPageTopDate'> December-02-2022</div>
          <div className='doctorPageTopName doctorPageTopKey'>
            NAME: <span>John Doe</span>
          </div>
          <div className='doctorPageTopAge doctorPageTopKey'>
            AGE: <span>23</span>
          </div>
          <div className='doctorPageTopSex doctorPageTopKey'>
            SEX: <span>Male</span>
          </div>
          <p>
            I wish to inform you that we have examined the above referenced
            individual referred from your office. We have made the following
            observations as documented below (done following a general physical
            examination and a mandatory laboratory investigation)
          </p>
        </div>
        <div className='parametersInvestigated'>
          <div className='parametersInvestigatedTitle'>
            PARAMETERS INVESTIGATED
          </div>
          <div className='param'>
            Body mass index is over-weight at 26.8Kg/m2
          </div>
          <div className='param'>Temperature =36.0º Celsius,</div>
          <div className='param'>
            Blood pressure is <span>HIGH</span> at 148/98mmHg.
          </div>
          <div className='param'>
            Heart Rate -90 beats per minute regular with a good volume
          </div>
          <div className='param'>
            Visual Acuity: Right Eye: 20/20 Left Eye: 20/20
          </div>
        </div>
        <div className='recommendation'>
          <div className='recommendationTitle'>RECOMMENDATION</div>
          <div className='recommendationBody'>
            <p>
              In the light of all the results obtained, the above-named person
              is hereby certified as medically fit.
            </p>
            <p>
              Kindly, find attached the result of Laboratory investigations.
            </p>
            <p>Thank you for choosing BioPath Laboratory </p>
            <img src={Signature} alt='Signature' />
            <div className='nameOfDoc'></div>
            <div className='positionOfDoc'></div>
          </div>
        </div>
        <div className='docPageFooter'></div>
      </div>
      <div className='doctorPage'>
        <div className='topLogo'>
          <img src={BiopathLogo} alt='Logo' />
        </div>
        <div className='doctorPageTopDetails'>
          <div className='doctorPageTopDate'> December-02-2022</div>
          <div className='doctorPageTopName doctorPageTopKey'>
            NAME: <span>John Doe</span>
          </div>
          <div className='doctorPageTopAge doctorPageTopKey'>
            AGE: <span>23</span>
          </div>
          <div className='doctorPageTopSex doctorPageTopKey'>
            SEX: <span>Male</span>
          </div>
          <p>
            I wish to inform you that we have examined the above referenced
            individual referred from your office. We have made the following
            observations as documented below (done following a general physical
            examination and a mandatory laboratory investigation)
          </p>
        </div>
        <div className='parametersInvestigated'>
          <div className='parametersInvestigatedTitle'>
            PARAMETERS INVESTIGATED
          </div>
          <div className='param'>
            Body mass index is over-weight at 26.8Kg/m2
          </div>
          <div className='param'>Temperature =36.0º Celsius,</div>
          <div className='param'>
            Blood pressure is <span>HIGH</span> at 148/98mmHg.
          </div>
          <div className='param'>
            Heart Rate -90 beats per minute regular with a good volume
          </div>
          <div className='param'>
            Visual Acuity: Right Eye: 20/20 Left Eye: 20/20
          </div>
        </div>
        <div className='recommendation'>
          <div className='recommendationTitle'>RECOMMENDATION</div>
          <div className='recommendationBody'>
            <p>
              In the light of all the results obtained, the above-named person
              is hereby certified as medically fit.
            </p>
            <p>
              Kindly, find attached the result of Laboratory investigations.
            </p>
            <p>Thank you for choosing BioPath Laboratory </p>
            <img src={Signature} alt='Signature' />
            <div className='nameOfDoc'></div>
            <div className='positionOfDoc'></div>
          </div>
        </div>
        <div className='docPageFooter'></div>
      </div>
      <div className='doctorPage'>
        <div className='topLogo'>
          <img src={BiopathLogo} alt='Logo' />
        </div>
        <div className='doctorPageTopDetails'>
          <div className='doctorPageTopDate'> December-02-2022</div>
          <div className='doctorPageTopName doctorPageTopKey'>
            NAME: <span>John Doe</span>
          </div>
          <div className='doctorPageTopAge doctorPageTopKey'>
            AGE: <span>23</span>
          </div>
          <div className='doctorPageTopSex doctorPageTopKey'>
            SEX: <span>Male</span>
          </div>
          <p>
            I wish to inform you that we have examined the above referenced
            individual referred from your office. We have made the following
            observations as documented below (done following a general physical
            examination and a mandatory laboratory investigation)
          </p>
        </div>
        <div className='parametersInvestigated'>
          <div className='parametersInvestigatedTitle'>
            PARAMETERS INVESTIGATED
          </div>
          <div className='param'>
            Body mass index is over-weight at 26.8Kg/m2
          </div>
          <div className='param'>Temperature =36.0º Celsius,</div>
          <div className='param'>
            Blood pressure is <span>HIGH</span> at 148/98mmHg.
          </div>
          <div className='param'>
            Heart Rate -90 beats per minute regular with a good volume
          </div>
          <div className='param'>
            Visual Acuity: Right Eye: 20/20 Left Eye: 20/20
          </div>
        </div>
        <div className='recommendation'>
          <div className='recommendationTitle'>RECOMMENDATION</div>
          <div className='recommendationBody'>
            <p>
              In the light of all the results obtained, the above-named person
              is hereby certified as medically fit.
            </p>
            <p>
              Kindly, find attached the result of Laboratory investigations.
            </p>
            <p>Thank you for choosing BioPath Laboratory </p>
            <img src={Signature} alt='Signature' />
            <div className='nameOfDoc'></div>
            <div className='positionOfDoc'></div>
          </div>
        </div>
        <div className='docPageFooter'></div>
      </div>
      <div className='labPage'></div>
    </div>
  )
}

export default DownloadReportPage
