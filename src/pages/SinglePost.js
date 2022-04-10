import React, { useEffect, useState } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Helmet } from "react-helmet";

const SinglePost = (props) => {

    const [itemData, setItemData] = useState({});
    const [itemInstructions, setItemInstructions] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemIngredients, setItemIngredients] = useState([]);
    const [itemObject, setItemObject] = useState({});

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
                console.log(result.items[0].fields)
                setItemObject(result.items[0].fields);
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
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Recipe",
                        "name": itemObject.title,
                        "description": itemObject.description,
                        "keywords": "fried chicken, chicken",
                        "recipeYield": "5",
                        "nutrition": {
                            "@type": "NutritionInformation",
                            "calories": "500 calories"
                        },
                        "recipeIngredient": [
                            "vegetable oil/cooking oil",
                            "flour",
                            "chicken",
                            "salt",
                            "black pepper",
                            "eggs",
                            "bread crumbs"
                        ],
                        "recipeInstructions": [
                            {
                                "@type": "HowToStep",
                                "name": "Preheat the pan",
                                "text": "Pour oil into the pan and pre-heat.",
                                "url": "https://recipesexample.com/fried-chicken-recipe#step1",
                                "image": "https://recipesexample.com/images/fried-chicken-recipe/step1.jpg"
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Coat the chicken",
                                "text": "Mix the dry ingredients. Beat the eggs and whip them. Dip chicken slices into egg mixture before coating with flour mixture.",
                                "url": "https://recipesexample.com/fried-chicken-recipe#step2",
                                "image": "https://recipesexample.com/images/fried-chicken-recipe/step2.jpg"
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Fry the chicken",
                                "text": "Fry the chicken until golden brown.",
                                "url": "https://recipesexample.com/fried-chicken-recipe#step3",
                                "image": "https://recipesexample.com/images/fried-chicken-recipe/step3.jpg"
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Cool and enjoy.",
                                "text": "Set aside the fried chicken on paper towels or a drying rack. Allow to dry and cool. Enjoy.",
                                "url": "https://recipesexample.com/fried-chicken-recipe#step4",
                                "image": "https://recipesexample.com/images/fried-chicken-recipe/step4.jpg"
                            }
                        ],
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "5",
                            "ratingCount": "12"
                        }
                    })}
                </script>
            </Helmet>
            <div style={{ textAlign: 'left' }}>
                <h1 style={{ marginTop: "50px", color: "white", textAlign: 'center' }}>{itemObject.title}</h1>
                <p></p>
                <p style={{ textAlign: "center" }}>{itemObject.tags}</p>

                {itemDescription && itemDescription.length && itemDescription.length > 5 ?
                    <div>
                        <details>
                            <summary><strong>Description</strong></summary>
                            <div dangerouslySetInnerHTML={{ __html: itemDescription }}></div></details>
                    </div>
                    :
                    null
                }
                {
                    itemObject.ingredientsOverride ?
                        <>
                            <h2>Ingredients</h2>
                            <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(itemObject.ingredientsOverride) }}></div>
                        </>
                        :

                        <>
                            <h2>Ingredients</h2>
                            {
                                itemObject.ingredients ?
                                    <ul>
                                        {itemObject.ingredients.map(ingredient => {
                                            return (
                                                <li>{ingredient}</li>
                                            )
                                        })}
                                    </ul>
                                    :
                                    null
                            }
                        </>

                }

                <div>
                    <h2>Instructions</h2>
                    <div dangerouslySetInnerHTML={{ __html: itemInstructions }}></div>
                </div>

            </div>
        </>
    )

}

export default SinglePost;