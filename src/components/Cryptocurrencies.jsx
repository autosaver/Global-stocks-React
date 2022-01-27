import { Row,Col,Card,Input } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {

  const count = simplified?10:50;

  const {data,isFetching}=useGetCryptosQuery(count)
  const [cryptos, setcryptos] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    const filtered_coins=data?.data?.coins?.filter((coin)=>{return coin.name.toLowerCase().includes(search.toLowerCase())});
    setcryptos(filtered_coins);
  }, [search,data]);
  

  if(isFetching) return "Loading..."

  return <>
  {!simplified && <div className="search-crypto">
    <Input placeholder='Search' value={search} onChange={(e)=>setsearch(e.target.value)}/>
  </div>}

  <Row gutter={[32,32]} className='crypto-card-container'>
    {
      cryptos?.map((currency)=>{ return (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt='...'/>}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
      )})
    }

  </Row>
  
  
  
  
  
  
  
  
  </>;
};

export default Cryptocurrencies;
