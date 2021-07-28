import React from 'react';
import styles from './NavBar.module.css';
import { Row, Col, Button,Layout } from 'antd';
const { Header } = Layout;


export function NavBar(props) {
    return (
        <Header>
            <Row>
                <Col span={16} className={styles.header}>YouTube video player</Col>

                <Col span={4} className={styles.header}></Col>
                <Col span={4} className={styles.header}><Button onClick={props.showModal} type="default">Add Video</Button></Col>
            </Row>

        </Header>
    );
}
