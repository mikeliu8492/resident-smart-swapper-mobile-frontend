import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios';

import AlbumDetail from './AlbumDetail'

export default class AlbumList extends Component {
    state = {
        albums: []
    };

    componentWillMount() {
        axios.get('http://rallycoding.herokuapp.com/api/music_albums')
        .then(result => this.setState({albums: result.data}))
    }

    renderAlbums() {
        return this.state.albums.map(album => <AlbumDetail key={album.title} album={album}></AlbumDetail>)
    }
    render() {
        return (
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}
