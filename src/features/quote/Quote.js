import { useEffect, useState } from "react";
import { useSelector, useDispatch, } from "react-redux";
import './Quote.css';
import {
    isLoading,
    allQuotes,
    fetchQuotesAsync,
    getCategories
} from './quoteSlice'
export function Quote() {

    const loading = useSelector(isLoading);
    const quotes = useSelector(allQuotes);
    const [category, setCategory] = useState("happiness");
    const categories = useSelector(getCategories);

    let optionList = categories.map((categoryName, index) => {
        if (categoryName == category) {
            return <option key={index} selected value={categoryName} > {categoryName.toUpperCase()}</option>
        } else {
            return <option key={index} value={categoryName} > {categoryName.toUpperCase()}</option>
        }

    })

    const dispatch = useDispatch();
    let otherAttributes = {};
    if (quotes.length > 0) {
        otherAttributes["dataSize"] = "large";
        otherAttributes["target"] = "_blank";
        otherAttributes["href"] = `https://twitter.com/intent/tweet?text=${quotes[0].quote + '-' + quotes[0].author}&hashtags=quotes`
    }
    useEffect(() => {
        if (loading == 'idle') {

            dispatch(fetchQuotesAsync(category))
        }
    }, [loading, category, dispatch])
    const handleCategory = (e) => {
        setCategory(e.target.value);
        console.log(e.target.value, category);
        if (e.target.value !== category) {
            dispatch(fetchQuotesAsync(e.target.value))
        }
    }
    return (
        <div>
            <section>
                <h2>You selected: {category}</h2>
                <label>Select Category : </label>
                <select id="categoryList" onChange={(e) => handleCategory(e)} value={category}>
                    {optionList}
                </select>


            </section>
            {(loading === 'idle' || loading === 'loading') && <div id="quote-box"><div id="text">Loading...</div></div>}
            {(loading === 'failed') && <div id="quote-box"><div id="text">Please check your internet, or try after sometime!</div></div>}
            {
                loading === 'succeeded' && quotes.length > 0 &&
                <div id="quote-box">
                    <div id="text">{quotes[0].quote}</div>
                    <div id="author">- {quotes[0].author}</div>
                    <div id="new-quote">
                        <button onClick={() => dispatch(fetchQuotesAsync(category))}>New Quote</button>

                    </div>
                    <a id="tweet-quote" {...otherAttributes}><i class="fa fa-twitter-square" aria-hidden="true"></i>
                    </a>
                </div >
            }
        </div >



    );
}

