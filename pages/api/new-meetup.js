const { MongoClient } = require('mongodb');

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect("mongodb+srv://nextjs:temma2020@cluster1.dw1g0xm.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db()
    const meetupsCollections = db.collection('meetups')
    const result = await meetupsCollections.insertOne(data)
    client.close()
    res.status(201).json({ message: "Meetup inserted" })
  }
}

export default handler