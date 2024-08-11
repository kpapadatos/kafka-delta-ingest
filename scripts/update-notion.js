console.log('Updating Notion...');

(async () => {
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: {
        type: 'database_id',
        database_id: '53f6e25f-3550-4aa6-857f-6ae719c762dc',
      },
      properties: {
        title: {
          title: [
            {
              type: 'text',
              text: {
                content: `api:${process.env.TAG_NAME}`,
              },
            },
          ],
        },
        Tags: {
          multi_select: [
            {
              name: 'Succeeded',
            },
          ],
        },
        Date: {
          date: {
            start: new Date().toISOString(),
          },
        },
        Tagger: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: process.env.TAGGER_NAME,
              },
            },
          ],
        },
        Description: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: process.env.TAG_MESSAGE,
              },
            },
          ],
        },
      },
    }),
  });

  console.log(await response.json());
})();
