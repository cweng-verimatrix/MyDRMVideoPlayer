import React, {useEffect, useRef, useState} from 'react';
import {Container, Col} from "react-bootstrap";
import ShakaPlayer from 'shaka-player-react';
import Script from 'react-load-script';
import {connect} from "react-redux";
import drmEffect from './DRMEffect';
import ContentEdit from '../contents/ContentEdit';
import {FormGroup} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {useParams} from "react-router";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const shaka = require('shaka-player');
declare var WmSdkInitWatermark: any;

const VideoPlayer = ({contentInfo, drmConfig}: any) => {
    const {id} = useParams();
    const controllerRef = useRef(null);
    const [, setScriptLoaded] = useState(false);
    const [, setScriptError] = useState(false);
    const [wsdk, setWsdk] = useState(null);
    const [strength, setStrength] = useState(70);
    const [transactionId,] = useState(Math.floor(100000 + Math.random() * 900000));
    const [, setAfterDraw] = useState(false);

    const handleStrengthChange = (e: any) => {
        const currentStrength = e.currentTarget.value;
        setStrength(currentStrength);

        // @ts-ignore
        wsdk?.update({
            transactionId,
            strength: currentStrength,
            "apiToken": 't1EKhe8A'
        });
    };

    useEffect(() => {
        const {
            /** @type {shaka.player} */ player,
            /** @type {HTMLVideoElement} */ videoElement,
        }: any = controllerRef.current;

        async function configureWatermark() {
            videoElement.addEventListener('play', () => {
                const logo = new Image();
                logo.src = `http://lab.us-east-1.vmxdemos.net/wmserver/visibleMark.png?sessionId=${transactionId}`;
                let wminfo = {
                    "strength": strength, /* Read WM strength field. */
                    "transactionId": transactionId, /* Obtain Id. */
                    "operatorId": 1, /* Replace with operatorId provided. */
                    "videoElement": videoElement,
                    "videoParentElement": videoElement.parent,
                    "apiToken": 't1EKhe8A',
                    "afterDraw": () => setAfterDraw(true),
                    "logoImage": logo,
                    "logoPos": [5, 5, 300, 115],
                    "player": player
                };
                logo.addEventListener('load', () => {
                    setWsdk(WmSdkInitWatermark(wminfo));
                })
            });
        }
        configureWatermark().catch((err) => {
            console.log(err);
        });
    }, [strength, transactionId]);

    useEffect(() => drmEffect(controllerRef, drmConfig, contentInfo.authHeader, contentInfo.contentURL),
        [contentInfo.authHeader, contentInfo.contentURL, drmConfig]);

    return (
        <Container>
            <Script url="/watermark.min.js"
                    onCreate={() => setScriptLoaded(false)}
                    onError={() => setScriptError(true)}
                    onLoad={() => setScriptLoaded(true)}
            />
            <br/>
            <ShakaPlayer ref={controllerRef}/>
            <br />
            <FormGroup>
            <Row>
                <Col sm={3}>
                    <Form.Label column="sm">Watermark Strength: </Form.Label>
                </Col>
                <Col sm={9}>
                    <Form.Control type="range" min={0} max={100} step={1} onMouseUp={handleStrengthChange}/>
                </Col>
            </Row>
            </FormGroup>
            <ContentEdit contentId={id} />
        </Container>
    )
};

function mapStateToProps(state: any) {
    return {
        drmConfig: state.drmConfig,
        contentInfo: state.contentInfo,
    };
}

export default connect(mapStateToProps)(VideoPlayer);