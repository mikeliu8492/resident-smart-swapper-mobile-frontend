import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
/*
import Card from './common/Card';
import CardSection from './common/CardSection'
import Button from './common/Button';
*/
import {Card, CardSection, Button} from './common'

export default AlbumDetail = ({album}) => {
    const {title, artist, thumbnail_image, image, url} = album

    return(
        <Card>
            <CardSection>
                <View style={styles.thumbnailContainerStyle}>
                    <Image 
                        style={styles.thumbnailStyle}
                        source={{uri: thumbnail_image}}
                    />
                </View>
                <View style={styles.headerContentStyle}>
                    <Text style={styles.headerTextStyle}>{title}</Text>
                    <Text>{artist}</Text>
                </View>
            </CardSection>
                
            <CardSection>
                <Image style={styles.imageStyle} source={{uri: image}}/>
            </CardSection>

            <CardSection>
                <Button onPress={() => Linking.openURL(url)}>
                    Click to Buy Now!
                </Button>
            </CardSection>
            
        </Card>
    )
}

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    headerTextStyle: {
        fontSize: 18

    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
}