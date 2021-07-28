import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Row, Col, Button, Modal, Input, Card } from 'antd';
import {
  removeVideo,
  addVideoAsync,
  selectPlaylist,
} from './playlistSlice';
import { NavBar } from './components/NavBar'

import styles from './Playlist.module.css';




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
        title="Enter the url to the youtube video"
        visible={isModalVisible}
        onOk={handleOk}
        okText="Save"
        onCancel={handleCancel}
        confirmLoading={playlist.loading}
      >
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

          <NavBar showModal={showModal} />
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
                  {playlist.data.map((item) => (
                    <Card key={item.id} onClick={() => setCurrentlyPlaying(item)} className={styles.thumbnail} hoverable={true} title={item.title} extra={<Button onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeVideo(item.id));
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
