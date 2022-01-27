import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders={
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': 'e266d2c5edmsh50d475aaf458753p18ae65jsnbb2ca5935410'
}

const baseUrl='https://coinranking1.p.rapidapi.com';

const createRequest=(url)=>({
    url,headers:cryptoApiHeaders
})

export const cryptoApi=createApi({
    reducerPath:'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptos:builder.query({
            query:(count)=>createRequest(`/coins?limit=${count}`)
        }),
        getCryptodetails:builder.query({
            query:(coinId)=>createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory:builder.query({
            query:({coinId,timeperiod})=>createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
        }),
        getCryptoExchanges:builder.query({
            query:()=>createRequest(`/coin/Qwsogvtv82FCd/exchanges`)
        })
    })
})


export const {
    useGetCryptosQuery,
    useGetCryptodetailsQuery,
    useGetCryptoHistoryQuery,
    useGetCryptoExchangesQuery,
}=cryptoApi;



// var options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       tiers: '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//       'x-rapidapi-key': 'e266d2c5edmsh50d475aaf458753p18ae65jsnbb2ca5935410'
//     }
//   };

