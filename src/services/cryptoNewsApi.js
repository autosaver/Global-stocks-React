import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoNewsApiHeaders={
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': 'e266d2c5edmsh50d475aaf458753p18ae65jsnbb2ca5935410'
}

const baseUrl='https://bing-news-search1.p.rapidapi.com';

const createRequest=(url)=>({
    url,headers:cryptoNewsApiHeaders
})

export const cryptoNewsApi=createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptoNews:builder.query({
            query:({category,count})=>createRequest(`/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});


export const {
    useGetCryptoNewsQuery,
}=cryptoNewsApi;


