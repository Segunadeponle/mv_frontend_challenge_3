import React from 'react';
import styles from './NavBar.module.css';
import { Row, Col, Layout } from 'antd';
const { Header } = Layout;


export function NavBar(props) {
    return (
        <Header>
            <Row>
                <Col span={16} className={styles.header}>YouTube video player</Col>
            </Row>
        </Header>
    );
}
