import React, {useState} from 'react';
import './App.css';
import VideoPlayer from './components/videoplayer/VideoPlayer';
import TopNavBar from './components/navbars/TopNavBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ContentList from './components/contents/ContentList';
import DRMConfigurationModal from './components/configuration/DRMConfigurationModal';



function App() {
    const [showDRMConfig, setShowDRMConfig] = useState(false);

    const handleCloseDRMConfig = () => setShowDRMConfig(false);
    const handleShowDRMConfig = () => setShowDRMConfig(true);

    return (
        <Router>
            <div className="App">
                <TopNavBar handleShowDRMConfig={handleShowDRMConfig} />
                <DRMConfigurationModal showDRMConfig={showDRMConfig}
                                       handleCloseDRMConfig={handleCloseDRMConfig}/>
                <Switch>
                    <Route path="/contents" component={ContentList}/>
                    <Route path="/content/:id" render={(props) => (<VideoPlayer key="video-player-edit" {...props} />)}/>
                    <Route path="/" render={(props) => (<VideoPlayer key="video-player-edit" {...props} />)}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
