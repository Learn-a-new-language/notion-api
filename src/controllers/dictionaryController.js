import { notionClient } from '../app.js'

export function getDictionary(req, res) {
  notionClient.databases
    .query({
      database_id: process.env.NOTION_DICTIONARY_ID,
    })
    .then(({ results }) => {
      const indexes = new Array(Number(req.query.length)).fill().reduce((acc, cur) => {
        const randomWordIndex = Math.floor(Math.random() * (results.length - 0 + 1) + 0)
        const {
          properties: { word, meaning },
        } = results[randomWordIndex]

        return [
          ...acc,
          {
            english: meaning.rich_text[0]?.text.content,
            german: word.title[0]?.text.content,
          },
        ]
      }, [])

      return res.send({ data: indexes })
    })
}
