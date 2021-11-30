import React, { useEffect, useState } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';


const SinglePost = (props) => {

    const [itemData, setItemData] = useState({});
    const [itemInstructions, setItemInstructions] = useState("");
    const [itemDescription, setItemDescription] = useState("");

    useEffect(() => {

        //we assume the address is of type /recipes/${name} and nothing else; update this if we start to think something else is up
        let title = window.location.href.replace(/.*\/recipes\//, "").replace("_", " ");

        //Seems odd, but I didn't find a method for getting a single entry that worked correctly. So we get all entries matching and take what should be the only one.
        props.client.getEntries(
            {
                content_type: 'recipe',
                'fields.title[match]': title
            }
        ).then(result => {
            if (result && result.items && result.items[0] && result.items[0].fields && result.items[0].fields.instructions) {
                setItemData(result.items[0].fields);
                const rawInstructions = result.items[0].fields.instructions;
                const rawDescription = result.items[0].fields.description;
                setItemInstructions(documentToHtmlString(rawInstructions))
            }

        }
        )
    }, [])

    //TODO: Content is returned as a different item for each paragraph. So you need a foreach or map or something here.

    return (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ marginTop: "50px", color: "white", textAlign: 'center' }}>{itemData.title}</h2>
            <p></p>
            <p style={{ textAlign: "center" }}>{itemData.tags}</p>

            {itemDescription && itemDescription.length && itemDescription.length > 5 ?
                <div>
                    <details>
                        <summary><strong>Description</strong></summary>
                        <div dangerouslySetInnerHTML={{ __html: itemDescription }}></div></details>
                </div>
                :
                null
            }


            <div dangerouslySetInnerHTML={{ __html: itemInstructions }}></div>
        </div>
    )

}

export default SinglePost;