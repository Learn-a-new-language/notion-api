import { notionClient } from '../app.js'

export function getDictionary(req, res) {
  notionClient.databases
    .query({
      database_id: process.env.NOTION_DICTIONARY_ID,
    })
    .then(({ results }) => {
      const randomSelection = new Array(Number(req.query.length)).fill().reduce((acc, cur) => {
        const randomWordIndex = Math.floor(Math.random() * results.length)
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

      return res.send({ data: randomSelection })
    })
}

export async function updateDictionary(req, res) {
  const page = await notionClient.databases
  .query({
    database_id: process.env.NOTION_DICTIONARY_ID,
    filter: {
      property: 'word',
      text: {
        equals: req.query.word,
      },
    }
  });
  console.log('page', page)

  const response = await notionClient.pages.update({
    // parent: {
    //   type: 'database_id',
    //   database_id: process.env.NOTION_DICTIONARY_ID,
    // },
    page_id: page.results[0].id,
    properties: {
      "priority": {
        "number": Number(req.query.priority)
      },
    },
  })
  
  console.log(response);
  return res.send({ data: response })

  // get db
  // find page
  // update page
}
