import Head from "next/head"
import { Fragment } from "react"

import MeetupList from "../components/meetups/MeetupList"
import { MongoClient } from 'mongodb'

function AllMeetups(props) {
  return <Fragment>
    <Head>
      <title>Meetups Nextjs</title>
      <meta
        name="description"
        content="Browse a huge list of highly active nextjs meetup "
      />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
}

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://nextjs:temma2020@cluster1.dw1g0xm.mongodb.net/?retryWrites=true&w=majority')
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  let meetups = await meetupCollection.find().toArray();
  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        meetupId: meetup._id.toString()
      }))
    },
    revalidate: 1
  }
}


export default AllMeetups

