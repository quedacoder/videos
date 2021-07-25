import React from 'react';
import SearchBar from './SearchBar'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'

class App extends React.Component {

    state = { videos: [], errorMessage: '', selectedVideo: null}

    componentDidMount() {
        this.onSearchSubmit('java developemnt');
    }

    onSearchSubmit = (term) => {
        console.log(term);

        // set access key to api in header
        const headers = {'Authorization': 'AIzaSyBJ_zi52cjFYUi-TSfxTmClPUySBPdrSSM'}
        const params = { part: 'snippet', type: 'video', maxResults: 5, q: term, key: 'AIzaSyBJ_zi52cjFYUi-TSfxTmClPUySBPdrSSM' }

        fetch('https://youtube.googleapis.com/youtube/v3/search?' + new URLSearchParams({part: 'snippet', type: 'video', maxResults: 5, q: term, key: 'AIzaSyBJ_zi52cjFYUi-TSfxTmClPUySBPdrSSM'}), {headers: headers} )
            .then(async response => {
                const data = await response.json();

                //check for error message
                if (!response.ok) {
                    //get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                this.setState({ videos: data.items, selectedVideo: data.items[0] });
            })
            .catch(error => {
                this.setState({ errorMessage: error });
                console.error('There was an error!', error);
            });
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    render() {
        return (
            <div className='ui container' style={{ marginTop: '1%' }}>
                <SearchBar onSubmit={this.onSearchSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column"> 
                            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

export default App;