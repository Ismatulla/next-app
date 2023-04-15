import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import { useRouter } from "next/router"
export default function NewMeetup() {
  const router = useRouter()
  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData)
    const res = await fetch('/api/new-meetup', {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data)
    router.push('/')
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}
