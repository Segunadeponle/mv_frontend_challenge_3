import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Row, Col, Button, Modal, Input, Card, PageHeader } from 'antd';
import {
  removeVideo,
  addVideoAsync,
  selectPlaylist,
} from './playlistSlice';
import { NavBar } from './components/NavBar'

import styles from './Playlist.module.css';

import {
  PlayCircleOutlined
} from '@ant-design/icons';



const { Content } = Layout;

export function Playlist() {
  const playlist = useSelector(selectPlaylist);
  const dispatch = useDispatch();

  const [currentlyPlaying, setCurrentlyPlaying] = useState(playlist.data[0]);
  const [videoToBeAdded, setVideoToBeAdded] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(addVideoAsync({
      videoToBeAdded,
      onComplete: () => {
        setVideoToBeAdded('');
        setIsModalVisible(false);
      }
    }));

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderModal = () => {
    return (
      <Modal
        title="Add to playlist"
        visible={isModalVisible}
        onOk={handleOk}
        okText="Save"
        onCancel={handleCancel}
        confirmLoading={playlist.loading}
      >
        <p>Enter YouTube video link</p>
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

          <NavBar />
          <Content className={styles.content}>
            <div className="site-layout-content">

              <Row>
                <Col className={styles.windows} xs={24} xl={15} >
                  <div className={styles.container}>
                    <iframe
                      className={styles.responsiveIframe}
                      src={`https://www.youtube.com/embed/${currentlyPlaying.id}?&autoplay=1`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen>
                    </iframe>
                  </div>

                </Col>
                <Col className={styles.windows} xs={24} xl={8} >
                  <PageHeader
                    className="site-page-header"
                    title="Playlist"
                    extra={[
                      <Button onClick={showModal} key="1" type="primary">
                        Add to playlist
                      </Button>,
                    ]}
                  />
                  {playlist.data.map((item) => (
                    <Card key={item.id} onClick={() => setCurrentlyPlaying(item)} className={styles.thumbnail} hoverable={true} title={item.title} extra={<Button danger onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeVideo(item.id));
                    }} type="primary">Remove</Button>}
                      style={{ width: '100%', height: 370 }}

                    >
                      <div style={{ width: '100%', height: '250px', backgroundImage: `url("${item.thumbnail_url}")`, backgroundSize: 'cover', }}>
                        <PlayCircleOutlined width="400px" height="300px" style={{ zIndex: 99, fontSize: '150px', margin: 43, color: 'gray', opacity: 0.7 }} />
                      </div>

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
