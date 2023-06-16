/* eslint-disable react/prop-types */
import React from 'react'

import { Link } from 'react-router-dom'
import './dashboardCard.scss'

const DashboardCard = (props) => {
  const cardInfo = props.data

  return (
    <div
      className='dashboardCardWrapper'
      style={{ backgroundColor: cardInfo.backgroundColor }}
    >
      <p>{cardInfo.title}</p>
      {/* <h1>{cardInfo.name} </h1> */}
      {cardInfo.isMoney ? <h1>{props.userName} </h1> : <h1>100+ </h1>}
      <div className='cardBottom'>
        <Link to={cardInfo.link} className='cardBottomText'>
          {cardInfo.linkText}
        </Link>
        {cardInfo.icon}
      </div>
    </div>
  )
}

export default DashboardCard
