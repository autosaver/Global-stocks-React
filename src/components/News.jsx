import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { Row, Col, Card, Typography, Avatar, Select } from 'antd';
import moment from 'moment';
import Text from 'antd/lib/typography/Text';
// import { Option } from 'antd/lib/mentions';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;
const { Option }= Select;

const News = ({ simplified }) => {
  const [category, setcategory] = useState("Cryptocurrency");

  const { data: articles } = useGetCryptoNewsQuery({ category, count: simplified ? 10 : 50 });

  const { data, isFetching } = useGetCryptosQuery(50)

  if (!articles?.value) return "Loading ..."
  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

  return <>
    <Row gutter={[24, 24]}>
      {
        !simplified &&
        (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Seach category here'
              optionFilterProp='children'
              onChange={(value) => { setcategory(value) }}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>

              {
                isFetching ? "Loading....." :
                  data?.data?.coins.map((coin) => { return <Option value={coin.name} key={coin.name}>{coin.name}</Option> })
              }
            </Select>
          </Col>

        )

      }


      {
        articles?.value.map((news, i) => {
          return (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card className='news-card' hoverable>
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>{news.name}</Title>
                    <img src={news?.image?.thumbnail?.contentUrl || demoImage} style={{ maxWidth: "200px", maxHeight: "100px" }} alt='news' />
                  </div>
                  <p>
                    {
                      news.description.length > 100 ? `${news.description.slice(0, 100)}...` : news.description
                    }
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                      <Text className="provider-name">{news.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                  </div>


                </a>
              </Card>
            </Col>)
        })
      }



    </Row>

  </>
};

export default News;
