/*
*   Notion API documentation can be found here:
*   https://developers.notion.com/reference/retrieve-a-page
*/


/*
*   Note:   This plugin uses the 'axios' package (https://www.npmjs.com/package/axios)
*           to make HTTP requests to proxy endpoints, bypassing CORS restrictions on
*           official Notion API server(s)/endpoints.
*/
import axios from "axios";
const instance = axios.create({
    baseURL: "https://notionrelayserverless.netlify.app/.netlify/functions", // "http://localhost:8888/.netlify/functions",
    withCredentials: false
});


const handleError = (error) => {
    console.log("Error fetching data.");
    console.log(error);
    return error;
};


const getPage = (pageId) => new Promise((resolve, reject)=>{
    instance.post(`getPage`, JSON.stringify({pageId}))
        .then((response)=>{
            // console.log(response);
            resolve(response.data);
        })
        .catch((error)=>reject(handleError(error)));
});

const getDatabase = (databaseId, sortsArr, filterObj, maxPages=100, startAtId=undefined) => new Promise((resolve, reject)=>{
    instance.post(`getDatabase`, JSON.stringify({databaseId, sortsArr, filterObj, maxPages, startAtId}))
        .then((response)=>{
            // console.log(response);
            resolve(response.data);
        })
        .catch((error)=>reject(handleError(error)));
});

export default {
    install(app, options) {
        app.provide("$notion", {
            getPage,
            getDatabase
        });
    }
}
