import MeetupDetails from "../../components/meetups/MeetupDetails"
import { MongoClient, ObjectId } from 'mongodb'

function MeetupDetail(props) {
  console.log(props.MeetupData)
  return <MeetupDetails meetupData={props.meetupData} />

}
export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb+srv://nextjs:temma2020@cluster1.dw1g0xm.mongodb.net/?retryWrites=true&w=majority")
  const db = client.db()
  const meetupsCollections = db.collection('meetups');
  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  return {
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect("mongodb+srv://nextjs:temma2020@cluster1.dw1g0xm.mongodb.net/?retryWrites=true&w=majority")
  const db = client.db()
  const meetupsCollections = db.collection('meetups');
  const selectedMeetups = await meetupsCollections.findOne({ _id: new ObjectId(meetupId) })

  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        address: selectedMeetups.address,
        image: selectedMeetups.image,
        description: selectedMeetups.description,
      }
    }
  }
}
export default MeetupDetail