import React, { useEffect, useState } from 'react';


const SinglePost = (props) => {

    const [itemData, setItemData] = useState({});

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
            if (result && result.items && result.items[0] && result.items[0].fields) {
                setItemData(result.items[0].fields);
            }

        }
        )
    }, [])

    //TODO: Content is returned as a different item for each paragraph. So you need a foreach or map or something here.
    
    return (
        <div>
            <h2 style={{marginTop: "50px", color: "white"}}>{itemData.title}</h2>
            <p></p>
            <p>{itemData.tags}</p>
            <p>{itemData.instructions && itemData.instructions.content && itemData.instructions.content[0] && itemData.instructions.content[0].content[0] && itemData.instructions.content[0].content[0].value ?
                itemData.instructions.content[0].content[0].value
                :
                null
            }</p>
        </div>
    )

}

export default SinglePost;