import React from 'react';
import { StyleSheet, View, Modal, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
//import {LottieAnimation, LottieView }  from 'lottie-react-native';
import LottieView  from 'lottie-react-native';

export default class AnimatedLoader extends React.PureComponent {
    static defaultProps = {
        visible: false,
        overlayColor: 'rgba(0, 0, 0, 0.25)',
        animationType: 'none',
        source: require('./LoadingJSON/spinning-circle.json'),
        animationStyle: {},
        speed: 1,
        loop: true,
    };

    static propTypes = {
        visible: PropTypes.bool,
        overlayColor: PropTypes.string,
        animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
        source: PropTypes.object,
        animationStyle: ViewPropTypes.style,
        speed: PropTypes.number,
        loop: PropTypes.bool,
    };

    animation = React.createRef();

    componentDidMount() {
        if (this.animation.current) {
            this.animation.current.play();
        }
    }

    componentDidUpdate(prevProps) {
        const { visible } = this.props;
        if (visible !== prevProps.visible) {
            if (this.animation.current) {
                this.animation.current.play();
            }
        }
    }

    _renderLottie = () => {
        const { source, animationStyle, speed, loop } = this.props;
        return (
           /* <LottieAnimation
                ref={this.animation}
                source={source}
                loop={loop}
                speed={speed}
                style={[styles.animationStyle, animationStyle]}
            />*/



        <LottieView
            ref={this.animation}
            source={source}
            loop={loop}
            speed={speed}
            style={[styles.animationStyle, animationStyle]}
        >
        </LottieView>


        );
    };

    render() {
        const { visible, overlayColor, animationType } = this.props;

        return (
            <Modal
                transparent
                visible={visible}
                animationType={animationType}
                supportedOrientations={['portrait']}
                onRequestClose={() => {}}
            >
                <View style={[styles.container, { backgroundColor: overlayColor }]}>
                    <View>{this._renderLottie()}</View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animationStyle: {
        height: '100%',
        width: '100%',
    },
});

