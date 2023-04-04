import { Row, Col, List, Tag, Card, Calendar, Statistic } from 'antd';
import CarouselSilder from '../../components/Carousel';
import OrgChart from '../../components/OrgChart';

const data = [
  'Man charged over missing wedding girl.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Man charged over missing wedding girl.',
  'Man charged over missing wedding girl.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
];

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

function Home() {
  return (
    <>
      <Row>
        <Col span={24} style={{ paddingBottom: '10px', margin: '8px ' }}>
          <h2>Hi User, Welcome Back!</h2>
        </Col>
      </Row>

      <Row gutter={8} style={{ margin: '0' }}>
        <Col xs={24} lg={6} style={{ margin: '0 0 8px 0' }}>
          <Card size="small" title="Countdown" bordered={false} style={{ fontSize: '24px' }}>
            <Statistic.Countdown value={deadline} />
          </Card>
        </Col>
        <Col xs={24} lg={6} style={{ margin: '0 0 8px 0' }}>
          <Card size="small" title="Card title" bordered={false} style={{ fontSize: '24px' }}>
            Card content
          </Card>
        </Col>
        <Col xs={24} lg={6} style={{ margin: '0 0 8px 0' }}>
          <Card size="small" title="Card title" bordered={false} style={{ fontSize: '24px' }}>
            Card content
          </Card>
        </Col>
        <Col xs={24} lg={6} style={{ margin: '0 0 8px 0' }}>
          <Card size="small" title="Card title" bordered={false} style={{ fontSize: '24px' }}>
            Card content
          </Card>
        </Col>
      </Row>

      <Row gutter={8} style={{ margin: '0' }}>
        <Col xs={24} lg={16}>
          <Card bordered={false}>
            <CarouselSilder />
          </Card>
          <Card
            title="Organizational Chart"
            bordered={false}
            style={{ backgroundColor: 'white', borderRadius: '8px', margin: '8px 0' }}
          >
            <OrgChart />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card size="small" bordered={false} style={{ margin: '0 0 8px 0' }}>
            <List
              size="small"
              header={
                <div>
                  <b>Notification </b>
                </div>
              }
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Tag color="#f50">Admin</Tag> {item}
                </List.Item>
              )}
            />
          </Card>
          <Card title={'Event schedule'} bordered={false}>
            <Calendar fullscreen={false} />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Home;
