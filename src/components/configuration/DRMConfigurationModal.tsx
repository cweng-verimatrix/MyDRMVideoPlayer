import React, {useState} from 'react';
import {Modal, Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import {connect} from "react-redux";
import {DRMConfigState} from "../../reducers/DRMConfigReducer";
import {addDRMConfig} from "../../actions/DRMConfigAction";
import './DRMConfigurationModal.css';

const DRMConfigurationModal = ({ drmConfig, showDRMConfig, handleCloseDRMConfig, saveDRMConfig }: any) => {
    const [playReadyLicenseURL, setPlayReadyURL] = useState(drmConfig.playReadyLicenseURL);
    const [fairPlayLicenseURL, setFairPlayURL] = useState(drmConfig.fairPlayLicenseURL);
    const [fairPlayCertificateURL, setFairPlayCert] = useState(drmConfig.fairPlayCertificateURL);
    const [wideVineLicenseURL, setWideVineURL] = useState(drmConfig.wideVineLicenseURL);

    const closeAndNotSave = () => {
        handleCloseDRMConfig();
    };
    const closeAndSave = () => {
        saveDRMConfig({
            playReadyLicenseURL,
            wideVineLicenseURL,
            fairPlayLicenseURL,
            fairPlayCertificateURL,
        });
        handleCloseDRMConfig();
    };

    return (
        <Modal show={showDRMConfig}
               onHide={closeAndSave}
               backdrop={true}
        >
            <div className="modal-dark">
            <Modal.Header>
                <Modal.Title>DRM Configuration</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel column="sm">PlayReady Server</FormLabel>
                    <FormControl type="text" onChange={(e) => setPlayReadyURL(e.currentTarget.value)} defaultValue={playReadyLicenseURL}/>
                    <br/>
                    <hr/>
                    <FormLabel column="sm">WideVine Server</FormLabel>
                    <FormControl type="text" onChange={(e) => setWideVineURL(e.currentTarget.value)} defaultValue={wideVineLicenseURL}/>
                    <br/>
                    <hr/>
                    <FormLabel column="sm">FairPlay Server</FormLabel>
                    <FormControl type="text" onChange={(e) => setFairPlayURL(e.currentTarget.value)} defaultValue={fairPlayLicenseURL}/>
                    <br />
                    <FormLabel column="sm">FairPlay Certificate</FormLabel>
                    <FormControl type="text" onChange={(e) => setFairPlayCert(e.currentTarget.value)} defaultValue={fairPlayCertificateURL}/>
                </FormGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={closeAndNotSave}>Close</Button>
                <Button variant="primary" onClick={closeAndSave}>Save changes</Button>
            </Modal.Footer>
            </div>
        </Modal>
    );
};

function mapStateToProps(state: any) {
    return {
        drmConfig: state.drmConfig
    };
}


function mapDispatchToProps(dispatch: any) {
    return {
        saveDRMConfig: (drmConfig: DRMConfigState) => {
            dispatch(addDRMConfig(drmConfig));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DRMConfigurationModal);