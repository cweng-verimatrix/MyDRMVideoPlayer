import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, ListGroup, Button, Container } from 'react-bootstrap';
import {useHistory} from "react-router";
import {addContentName, addContentURL} from "../../actions/ContentInfoActions";
import {connect} from "react-redux";

const limitWord = (word: string) => {
    if (!word) {
        return word;
    }
    if (word.length > 20) {
        return "https://..." + word.slice(word.length - 20, word.length);
    }
    return word;
};

const Content = ({id, contentName, contentURL, saveContentURL, saveContentName}: any) => {
    const history = useHistory();

    const goToContent = () => {
        saveContentName(contentName);
        saveContentURL(contentURL);
        history.push("/content/" + id);
    };

    return (
        <Col key={id} sm={4}>
            <Card className="bg-dark">
                <Card.Body>
                    <Card.Title>{contentName}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="bg-dark">
                            <span style={styles.listItemHeader}>{"Content URL: "}</span>
                            {limitWord(contentURL)}
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Container>
                    <Row className="justify-content-sm-center">
                        <Col sm={2} style={styles.cardButton}>
                            <Button onClick={goToContent}>Edit</Button>
                        </Col>
                        <Col sm={2} style={styles.cardButton}>
                            <Button onClick={goToContent}>Run</Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </Col>
    )
};

const styles = {
    cardButton: {
        paddingBottom: "1%"
    },
    listItemHeader: {
        fontWeight: 'bold' as 'bold',
        underline: {textDecorationLine: 'underline'}
    }
}

Content.propTypes = {
    contentName: PropTypes.string.isRequired,
    contentURL: PropTypes.string.isRequired,
};

function mapStateToProps(state: any) {
    return {
        contentInfo: state.contentInfo
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        saveContentName: (contentName: string) => {
            dispatch(addContentName(contentName));
        },
        saveContentURL: (contentURL: string) => {
            dispatch(addContentURL(contentURL));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
