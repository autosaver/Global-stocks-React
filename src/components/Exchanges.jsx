import { Card, Col, Row } from 'antd';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptoExchangesQuery } from '../services/cryptoApi';



const Exchanges = () => {
  const {data,isFetching}=useGetCryptoExchangesQuery();
  if(isFetching) return "Loading..."

  const exchanges=data?.data?.exchanges;

// "uuid":"-zdvbieRdZ"
// "name":"Binance"
// "iconUrl":"https://cdn.coinranking.com/mDTK5qrmq/binance.svg"
// "verified":false
// "recommended":true
// "numberOfMarkets":291
// "coinrankingUrl":"https://coinranking.com/exchange/-zdvbieRdZ+binance"
// "btcPrice":"1.0005924962721513"
// "rank":1
// "24hVolume":"4672818871.045603"
// "price":"36317.39505576029"

  return (
    <Row gutter={[32,32]} className='crypto-card-container'>
    {
      exchanges?.map((exchange)=>{ return (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={exchange.uuid}>
            <a href={exchange.coinrankingUrl} target="_blank">
              <Card
                title={`${exchange.rank}. ${exchange.name}`}
                extra={<img className="crypto-image" src={exchange.iconUrl} alt='...'/>}
                hoverable
              >
                <p>Price: {millify(exchange.price)}</p>
                <p>24hVolume: {millify(exchange['24hVolume'])}</p>
                <p>numberOfMarkets: {exchange.numberOfMarkets}%</p>
              </Card>
            </a>
          </Col>
      )})
    }

  </Row>
  );
};

export default Exchanges;
