import { submitFanContent } from "@models/fancontent"

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
  }

  if (req.method === 'POST') {
    const { author, link, image } = JSON.parse(req.body)
    console.log(author, link, image)
    res.status(200).json(req.body)
  }
}