import React, { Fragment } from 'react'

export default function MeetupDetails({ meetupData }) {
  console.log(meetupData)
  return (
    <Fragment>
      <img src={meetupData.image} alt={meetupData.title} />
      <h1>{meetupData.title}</h1>
      <address>{meetupData.address}</address>
      <p>{meetupData.description}</p>
    </Fragment>
  )
}
