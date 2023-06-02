import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Image, Text, Alert } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

export default function PlayVideo({ navigation, route }) {

    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('contain');
    const video = route.params

    console.log(video)

    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };
    const onLoadStart = (data) => setIsLoading(true);

    const onEnd = () => {
        setPlayerState(PLAYER_STATES.ENDED);
        Alert.alert('Hết', 'Bạn muốn xem lại hay trở về bản đồ', [
            {
                text: 'Trở về',
                onPress: () => navigation.goBack(),
                style: 'cancel',
            },
            {
                text: 'Xem lại', onPress: () => {
                    setCurrentTime(0)
                    setPlayerState(PLAYER_STATES.PLAYING);
                    setIsLoading(false);
                }
            },
        ]);
    };

    // const exitFullScreen = () => {
    //     alert('Exit full screen');
    // };

    const enterFullScreen = () => { };

    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == 'contain') setScreenType('cover');
        else setScreenType('contain');
    };

    const renderToolbar = () => (
        <View>
            <Text style={styles.toolbar}> toolbar </Text>
        </View>
    );

    const onSeeking = (currentTime) => setCurrentTime(currentTime);
    return (
        <View style={styles.container}>
            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                onProgress={onProgress}
                paused={paused}
                ref={videoPlayer}
                resizeMode={screenType}
                onFullScreen={isFullScreen}
                source={video != undefined ? {uri: video.video} : require('../assets/load.mp4')}
                // source={{uri: "https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/videos%2FM%E1%BB%B9%20Tho%20%C4%91%E1%BB%8Ba%20%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch%20%C4%91%E1%BB%99c%20%C4%91%C3%A1o%20-kh%C3%B4ng%20th%E1%BB%83%20b%E1%BB%8F%20qua-%20khi%20%C4%91%E1%BA%BFn%20Ti%E1%BB%81n%20Giang.mp4?alt=media&token=5867d0fd-fabc-4ab4-bfe8-b2f19c662de2"}}
                style={styles.mediaPlayer}
            />
            <MediaControls
                duration={duration}
                isLoading={isLoading}
                mainColor="#333"
                onFullScreen={onFullScreen}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                playerState={playerState}
                progress={currentTime}
                toolbar={renderToolbar()}
            />
            <TouchableOpacity style={{ position: 'absolute', top: '5%' }} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/back_icon.png')} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },
    video: {
        position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        height: '100%',
        width: '100%',
        alignSelf: 'center'
    },
    mediaPlayer: {
        position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'black',
        justifyContent: 'center',
        // resizeMode:'contain'
    },
});
