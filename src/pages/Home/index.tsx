import { Row, Col, List, Tag, Card, Calendar, Statistic, Avatar } from 'antd';
import CarouselSilder from '../../components/Carousel';
import OrgChart from '../../components/OrgChart';
import { tw } from '../../common/utils/classUtil';

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
  const CardTitleFacebook = (
    <div className="flex items-center">
      <Avatar className="m-2 flex items-center bg-[#eaeaea]" size={40}>
        <img src="https://admin.pixelstrap.com/tivo/assets/images/general-widget/svg-icon/2.svg" alt="SVG Image" />
      </Avatar>
      <span style={{ fontSize: '18px' }}>Facebook</span>
    </div>
  );

  const CardTitleInstagram = (
    <div className="flex items-center">
      <Avatar className="m-2 flex items-center bg-[#eaeaea]" size={40}>
        <img src="https://admin.pixelstrap.com/tivo/assets/images/general-widget/svg-icon/4.svg" alt="SVG Image" />
      </Avatar>
      <span style={{ fontSize: '18px' }}>Instagram</span>
    </div>
  );

  return (
    <>
      <Row>
        <Col span={24} style={{ paddingBottom: '10px', margin: '8px ' }}>
          <h2>Hi User, Welcome Back!</h2>
        </Col>
      </Row>

      <Row gutter={8} style={{ margin: '0' }}>
        <Col xs={24} lg={6} style={{ margin: '0 0 8px 0' }}>
          <Card
            className={tw('[&_.ant-card-head]:p-1')}
            size="small"
            title={CardTitleFacebook}
            bordered={false}
            style={{ fontSize: '24px' }}
          >
            <Statistic.Countdown value={deadline} />
          </Card>
        </Col>
        <Col xs={24} lg={6} style={{ margin: '0 0 8px 0' }}>
          <Card
            className={tw('[&_.ant-card-head]:p-1')}
            size="small"
            title={CardTitleFacebook}
            bordered={false}
            style={{ fontSize: '24px' }}
          >
            Posts 1249 - Likes 239
          </Card>
        </Col>
        <Col xs={24} lg={6} style={{ margin: '0 0 8px 0' }}>
          <Card
            className={tw('[&_.ant-card-head]:p-1')}
            size="small"
            title={CardTitleInstagram}
            bordered={false}
            style={{ fontSize: '24px' }}
          >
            Posts 346 - Likes 144
          </Card>
        </Col>
        <Col xs={24} lg={6} style={{ margin: '0 0 8px 0' }}>
          <Card
            className={tw('[&_.ant-card-head]:p-1')}
            size="small"
            title={CardTitleInstagram}
            bordered={false}
            style={{ fontSize: '24px' }}
          >
            1508
          </Card>
        </Col>
      </Row>

      <Row gutter={8} style={{ margin: '0' }}>
        {/* Left column */}
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

        {/* Right column */}
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
