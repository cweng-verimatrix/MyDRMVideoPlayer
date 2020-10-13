import React from 'react';
import Content from './Content';
import {connect} from 'react-redux';
import {Container, Row } from 'react-bootstrap';

const buildContentCards = (contentInfoList: []) => {
    let cardContainer: any = [];
    for (let i = 0; i < contentInfoList.length; i += 3) {
        const contentInfo1 = contentInfoList[i];
        const contentInfo2 = (i + 1 < contentInfoList.length) ? contentInfoList[i + 1] : null;
        const contentInfo3 = (i + 2 < contentInfoList.length) ? contentInfoList[i + 2] : null;
        const card = (<Row key={`${i}:${i+1}:${i+2}`} style={styles.row}>
            {(contentInfo1) ? <Content key={contentInfo1['id']} {...contentInfo1} /> : null}
            {(contentInfo2) ? <Content key={contentInfo2['id']} {...contentInfo2} /> : null}
            {(contentInfo3) ? <Content key={contentInfo3['id']} {...contentInfo3} /> : null}
        </Row>);
        cardContainer.push(card);
    }
    return (cardContainer && cardContainer.length > 0) ? cardContainer : [<div></div>];
};

const ContentList = ({contentInfoList }: any) => {
    return (
        <Container fluid style={styles.container}>
            {buildContentCards(contentInfoList)}
        </Container>
    );
};

const styles = {
    container: {
        paddingTop: "1%"
    },
    row: {
        paddingBottom: "1%"   
    }
};

function mapStateToProps(state: any) {
    return {
        contentInfoList: state.contentInfoList
    };
}

export default connect(mapStateToProps)(ContentList);
