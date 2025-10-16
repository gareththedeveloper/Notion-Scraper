const { Client } = require("@notionhq/client");
const axios = require("axios");

const notion = new Client({
    auth: "secret_CvSThg6dQSpk1N6pzoPaiYBclor5DGgArbc8iA9Cx9o", // Set your integration token as an environment variable
});

const key = "secret_CvSThg6dQSpk1N6pzoPaiYBclor5DGgArbc8iA9Cx9o";
const apilink = "https://api.notion.com/v1/blocks/";
const pageId = "d84e456e49f044c48f7046092b3721b9";

async function getPageContent() {
    const ids = [];
    const pageContent = await notion.blocks.children.list({
        block_id: pageId,
    });

    axios
        .get(
            "https://api.notion.com/v1/blocks/d84e456e49f044c48f7046092b3721b9",
            {
                headers: {
                    Authorization: key,
                    "Notion-Version": "2022-06-28",
                },
            }
        )
        .then((res) => {
            // console.log(res);
        });

    const content = await notion.blocks.retrieve({
        block_id: pageId,
    });

    const textContents = pageContent.results.filter((block) =>
        ids.push(block.id)
    ); // Filter for text/paragraph blocks

    // console.log(ids);
    const idstwo = [];
    for (let i = 0; i < ids.length; i++) {
        const blockText = await notion.blocks.children.list({
            block_id: ids[i],
            page_size: 50,
        });
        
        const text = await notion.blocks.children.list({
            block_id: blockText.results[0]["id"],
            page_size: 50,
        }); 
        
        // console.log(i, idstwo);
    }

    return ids;
}

getPageContent();
// .then((texts) => console.log(texts))
// .catch(console.error);
