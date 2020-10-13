import React, {useEffect, useState} from 'react';
import './ContentEdit.css';
import {FormGroup, Form, InputGroup, DropdownButton, Dropdown, Button, Row, Toast} from "react-bootstrap";
import generateKeyPair from '../../utils/KeyGenerator';
import {connect} from "react-redux";
import {
    addContent,
    addContentAuthHeader,
    addContentName,
    addContentURL, updateContent,
} from "../../actions/ContentInfoActions";
import keyUtils from 'js-crypto-key-utils';
import RSA from 'node-rsa';
import {ecAlgorithmTypeFrom, rsaAlgorithmTypeFrom} from "../../typing/AlgorithmTypes";
import {FaPlus, FaPen} from 'react-icons/fa';
import {Alert} from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import {addTokenHeader, addTokenPayload} from "../../actions/TokenInfoAction";
import {useHistory} from "react-router";


const tokenHeaderPlaceHolder = JSON.stringify({
    "alg": "<ALGORITHM_TYPE>",
    "typ": "<TOKEN_TYPE>",
    "kid": "<KEY_ID>"
}, null, 2);

const tokenPayloadPlaceHolder = JSON.stringify({
    "multirights": {
        "policy": {
            "license_duration": "<DURATION_NUMBER>",
            "can_play": "<BOOLEAN>",
            "can_persist": "<BOOLEAN>"
        }
    },
    "aud": "<URNS_INCLUDING_urn:verimatrix:multidrm/widevine/playready/fairplay>",
    "iss": "<ISSUER>",
    "sub": "<SUBJECT>"
}, null, 2);

const ContentEdit = ({contentId , contentInfo, contentInfoList, tokenInfo,
                      saveContentName, saveContentURL, saveContent, saveContentAuthHeader,
                      saveTokenHeader, saveTokenPayload
                     }: any) => {
    const history = useHistory();
    const [currentContentId, setCurrentContentId] = useState(contentId);
    const [authToken, setAuthToken] = useState("");
    const [algoType, setAlgoType] = useState("ES256");
    const [privateKey, setPrivateKey] = useState("");
    const [publicKey, setPublicKey] = useState("");
    const [contentType, setContentType] = useState(contentInfo.contentType);
    const [contentName, setContentName] = useState(contentInfo.contentName);
    const [contentURL, setContentURL] = useState((contentInfo.contentURL));
    const [tokenHeader, setTokenHeader] = useState(JSON.stringify(tokenInfo.tokenHeader, null, 2));
    const [tokenPayload, setTokenPayLoad] = useState(JSON.stringify(tokenInfo.tokenPayload, null, 2));
    const [streamAdded, setStreamAdded] = useState(false);

    const wrappedStreamAdded = () => {
        if (!currentContentId) {
            const newContentId = contentInfoList.length + 1;
            saveContent({
                id: newContentId,
                contentName,
                contentURL,
            });
            setStreamAdded(true);
            setCurrentContentId(newContentId);
            history.push('/content/' + newContentId);
        } else {
            updateContent({
                id: contentId,
                contentName,
                contentURL
            }, contentInfoList);
        }
    };

    const wrappedSetAlgoType = (e: string) => {
        try {
            const tokenHeaderObj = JSON.parse(tokenHeader);
            tokenHeaderObj["alg"] = e;
            setTokenHeader(JSON.stringify(tokenHeaderObj, null, 2));
            saveTokenHeader(tokenHeaderObj);
        } catch (err) {
            console.log("Failed to parse JSON string: " + err);
        }
        setAlgoType(e);
    };

    const wrappedSetContentName = (e: any) => {
        if (e?.currentTarget?.value) {
            const currentContentName = e.currentTarget.value;
            setContentName(currentContentName);
            saveContentName(currentContentName);
        }
    };

    const wrappedSetContentURL = (e: any) => {
        if (e?.currentTarget?.value) {
            const currentContentURL = e.currentTarget.value;
            setContentURL(currentContentURL);
            saveContentURL(currentContentURL);
        }
    };

    const wrappedGeneratePrivateKey = async () => {
        try {
            const [privateKey, publicKey] = await generateKeyPair(algoType);
            setPrivateKey(privateKey);
            setPublicKey(publicKey);
        } catch (err) {
            console.log(err);
        }
    };

    const handleTokenHeaderChange = (e: any) => {
        const tokenHeaderString = e.currentTarget.value;
        setTokenHeader(tokenHeaderString);
        try {
            const tokenHeaderObj = JSON.parse(tokenHeaderString);
            saveTokenHeader(tokenHeaderObj);
        } catch(err) {
            console.log("Failed to parse tokenHeader JSON string: " + err);
        }
    };

    const handleTokenPayloadChange = (e: any) => {
        const tokenPayloadString = e.currentTarget.value;
        setTokenPayLoad(tokenPayloadString);
        try {
            const tokenPayloadObj = JSON.parse(tokenPayloadString);
            saveTokenPayload(tokenPayloadObj);
        } catch(err) {
            console.log("Failed to parse tokenPayload JSON string: " + err);
        }
    };

    const handlePrivateKeyChange = async (e: any) => {
        const currentPrivateKey = e.currentTarget.value;
        let publicKey = "";
        try {
            if (currentPrivateKey && currentPrivateKey.length > 0) {
                const keyObj = new keyUtils.Key('pem', currentPrivateKey);
                const jwk = await keyObj.export('jwk', {outputPublic: true});
                console.log(jwk);
                if (jwk?.kty === "EC") {
                    wrappedSetAlgoType(ecAlgorithmTypeFrom(jwk.crv));
                }
                if (keyObj.isPrivate) {
                    publicKey = await keyObj.export('pem', {outputPublic: true});
                }
                if (publicKey && jwk?.kty === "RSA") {
                    const key = new RSA(currentPrivateKey.value, "pkcs8-private-pem");
                    key.importKey(publicKey, 'pkcs8-public-pem');
                    wrappedSetAlgoType(rsaAlgorithmTypeFrom(key.getKeySize()));
                }
            }
        } catch (err) {
            console.log(err);
        }
        setPrivateKey(privateKey);
        setPublicKey(publicKey);
    };

    useEffect(() => {
        async function generateToken() {
            try {
                if (publicKey && privateKey && tokenHeader && tokenPayload) {
                    const tokenPayloadObj = JSON.parse(tokenPayload);
                    const tokenHeaderObj = JSON.parse(tokenHeader);
                    const token = jwt.sign(tokenPayloadObj, privateKey, {
                        algorithm: tokenHeaderObj.alg,
                        header: tokenHeaderObj
                    });
                    setAuthToken(token);
                    saveContentAuthHeader(token);
                }
            } catch (error) {
                setAuthToken("");
                saveContentAuthHeader("");
                console.log(error);
            }
        }

        async function handlePrivateKeyChange() {
            const element = document.getElementById("private-key-field");
            if (element) {
                element.innerHTML = privateKey;
            }
        }

        generateToken().catch((err) => console.log(err));
        handlePrivateKeyChange().catch((err) => console.log(err));
    }, [publicKey, privateKey, tokenHeader, tokenPayload, saveContentAuthHeader]);

    return (
        <div>
            <FormGroup>
                <br/>
                <Row>
                    <Form.Label column="lg">Content Information</Form.Label>
                    <span id="add-stream-button" onClick={wrappedStreamAdded}>
                        {(currentContentId) ? <FaPen /> : <FaPlus/> }
                    </span>
                </Row>
                <Toast id="added-stream-toast" autohide={true} show={streamAdded} onClose={() => setStreamAdded(false)}>
                    <Toast.Header>Added {contentName}</Toast.Header>
                </Toast>
                <hr/>
                <Form.Label column="sm">Content Name</Form.Label>
                <Form.Control placeholder="Content Name" defaultValue={contentName} onChange={wrappedSetContentName}/>
                <br/>
                <Form.Label column="sm">Content URL (Manifest)</Form.Label>
                <InputGroup>
                    <Form.Control placeholder="https://" defaultValue={contentURL} onChange={wrappedSetContentURL}/>
                    <Dropdown className="text-left"
                              as={InputGroup.Append}
                              variant="outline-light"
                              onSelect={(e: string) => setContentType(e)}>
                        <Dropdown.Toggle id="drmType" variant="outline-light">
                            {contentType}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="application/dash+xml">application/dash+xml</Dropdown.Item>
                            <Dropdown.Item eventKey="video/mp4">video/mp4</Dropdown.Item>
                            <Dropdown.Item
                                eventKey="application/vnd.apple.mpegurl">application/vnd.apple.mpegurl</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </InputGroup>
                <br/>
            </FormGroup>
            <FormGroup>
                <Form.Label column="lg">JWT Information</Form.Label>
                <hr/>
                <Alert variant="warning" show={!!(authToken)}>
                    <Alert.Heading>Generated Token</Alert.Heading>
                    <p>{authToken}</p>
                </Alert>
                <br/>
                <InputGroup>
                    <DropdownButton
                        id="algorithm-type-dropdown"
                        as={InputGroup.Prepend}
                        variant="outline-light"
                        title={algoType}
                        onSelect={wrappedSetAlgoType}
                    >
                        <Dropdown.Item eventKey="ES256">ES256</Dropdown.Item>
                        <Dropdown.Item eventKey="ES384">ES384</Dropdown.Item>
                        <Dropdown.Item eventKey="ES512">ES512</Dropdown.Item>
                        <Dropdown.Item eventKey="RS256">RS256</Dropdown.Item>
                        <Dropdown.Item eventKey="RS384">RS384</Dropdown.Item>
                        <Dropdown.Item eventKey="RS512">RS512</Dropdown.Item>
                    </DropdownButton>
                    <Form.Control
                        id="private-key-field"
                        as="textarea"
                        placeholder="Private Key"
                        defaultValue={privateKey}
                        onChange={handlePrivateKeyChange}/>
                    <InputGroup.Append>
                        <Button
                            variant="outline-light"
                            onClick={wrappedGeneratePrivateKey}
                        >
                            Generate Key
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <Form.Control as="textarea" placeholder="Public Key" defaultValue={publicKey}/>
                <br/>
                <Form.Label column="sm">Header</Form.Label>
                <Form.Control
                    as="textarea" rows={5}
                    placeholder={tokenHeaderPlaceHolder}
                    defaultValue={tokenHeader}
                    onChange={handleTokenHeaderChange}
                />
                <br/>
                <Form.Label column="sm">Payload</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={12}
                    placeholder={tokenPayloadPlaceHolder}
                    defaultValue={tokenPayload}
                    onChange={handleTokenPayloadChange}
                />
            </FormGroup>
        </div>
    );
};

function mapStateToProps(state: any) {
    return {
        contentInfoList: state.contentInfoList,
        contentInfo: state.contentInfo,
        tokenInfo: state.tokenInfo
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        saveContent: (content: any) => {
            dispatch(addContent(content));
        },
        saveContentName: (contentName: string) => {
            dispatch(addContentName(contentName));
        },
        saveContentURL: (contentURL: string) => {
            dispatch(addContentURL(contentURL));
        },
        saveContentAuthHeader: (contentHeader: string) => {
            dispatch(addContentAuthHeader(contentHeader));
        },
        saveTokenHeader: (tokenHeader: any) => {
            dispatch(addTokenHeader(tokenHeader));
        },
        saveTokenPayload: (tokenPayload: any) => {
            dispatch(addTokenPayload(tokenPayload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentEdit);