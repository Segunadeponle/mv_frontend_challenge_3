import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';
import { Layout, Row, Col, Button, Modal, Input, Card } from 'antd';



const { Header, Content, Footer } = Layout;

export function Playlist() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState([
    {
      "id": "0rkTgPt3M4k",
      "title": "A COMPLETELY Upgradeable Laptop?",
      "author_name": "Linus Tech Tips",
      "thumbnail_url": "https://i.ytimg.com/vi/0rkTgPt3M4k/hqdefault.jpg",
    },
    {
      "id": "YZdMHL8IpBk",
      "title": "Steam Deck: Valve Demos its Unique Trackpad and Gyroscopic Controls",
      "author_name": "IGN",
      "thumbnail_url": "https://i.ytimg.com/vi/YZdMHL8IpBk/hqdefault.jpg",
    }
  ]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(playlist[0]);
  const [videoToBeAdded, setVideoToBeAdded] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);


  // console.log(JSON.stringify(playlist, null, 2));
  const addVideo = () => {
    fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(videoToBeAdded))
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const { id } = data.html.match(/https:\/\/www\.youtube\.com\/embed\/(?<id>.+)\?feature=oembed/).groups;
        const { title, author_name, thumbnail_url } = data;
        setPlaylist([{
          id,
          title,
          author_name,
          thumbnail_url,
        },
        ...playlist]);
      });
    setVideoToBeAdded('');
  };

  const removeVideo = (id) => {
    setPlaylist(playlist.filter((item)=> item.id!==id));
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    addVideo();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderModal = () => {
    return (
      <Modal title="Enter the url to the youtube video" visible={isModalVisible} onOk={handleOk} okText="Save" onCancel={handleCancel}>
        <Input
          value={videoToBeAdded}
          onChange={(e) => setVideoToBeAdded(e.target.value)} />

      </Modal>
    )
  };

  return (
    <div>
      {renderModal()}
      <div>
        <Layout className="layout">
          <Header>
            <Row>
              <Col span={16} className={styles.header}>YouTube video player</Col>

              <Col span={4} className={styles.header}></Col>
              <Col span={4} className={styles.header}><Button onClick={showModal} type="default">Add Video</Button></Col>
            </Row>

          </Header>
          <Content className={styles.content}>

            <div className="site-layout-content">

              <Row>
                <Col className={styles.windows} xs={24} xl={15} >
                  <div className={styles.container}>
                    <iframe
                      className={styles.responsiveIframe}
                      src={`https://www.youtube.com/embed/${currentlyPlaying.id}?&autoplay=1`}
                      title="YouTube video player"
                      // frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen>
                    </iframe>
                  </div>

                </Col>

                <Col className={styles.windows} xs={24} xl={8} >
                  {playlist.map((item) => (
                    // <p key={item.id} onClick={() => setCurrentlyPlaying(item)}>
                    //   <img className={styles.thumbnail} src={item.thumbnail_url} />
                    // </p>
                    <Card key={item.id} onClick={() => setCurrentlyPlaying(item)} className={styles.thumbnail} hoverable={true} title={item.title} extra={<Button onClick={(e)=> {
                      e.stopPropagation();

                      removeVideo(item.id);
                    }} type="default">Remove</Button>} style={{ width: 400, height: 300 }}>
                      <img className={styles['thumbnail-image']} src={item.thumbnail_url} />
                    </Card>
                  ))}
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </div>


    </div >
  );
}
