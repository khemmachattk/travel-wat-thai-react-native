/* eslint-disable */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ReadMore extends React.Component {
  state = {
    measured: false,
    shouldShowReadMore: false,
    showAllText: false,
  };

  async componentDidMount() {
    this._isMounted = true;
    await nextFrameAsync();

    if (!this._isMounted) {
      return;
    }

    // Get the height of the text with no restriction on number of lines
    const fullHeight = await measureHeightAsync(this._text);
    this.setState({ measured: true });
    await nextFrameAsync();

    if (!this._isMounted) {
      return;
    }

    // Get the height of the text now that number of lines has been set
    const limitedHeight = await measureHeightAsync(this._text);

    if (fullHeight - limitedHeight > 0.001) {
      this.setState({ shouldShowReadMore: true }, () => {
        this.props.onReady && this.props.onReady();
      });
    } else {
      this.props.onReady && this.props.onReady();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { measured, showAllText } = this.state;

    const { numberOfLines } = this.props;

    return (
      <View>
        <Text
          numberOfLines={measured && !showAllText ? numberOfLines : 0}
          ref={text => {
            this._text = text;
          }}
        >
          {this.props.children}
        </Text>

        {this._maybeRenderReadMore()}
      </View>
    );
  }

  _handlePressReadMore = () => {
    this.setState({ showAllText: true });
  };

  _handlePressReadLess = () => {
    this.setState({ showAllText: false });
  };

  _maybeRenderReadMore() {
    const { shouldShowReadMore, showAllText } = this.state;

    if (shouldShowReadMore && !showAllText) {
      if (this.props.renderTruncatedFooter) {
        return this.props.renderTruncatedFooter(this._handlePressReadMore);
      }

      return (
        <Text style={styles.button} onPress={this._handlePressReadMore}>
          อ่านเพิ่มเติม
        </Text>
      );
    }
    if (shouldShowReadMore && showAllText) {
      if (this.props.renderRevealedFooter) {
        return this.props.renderRevealedFooter(this._handlePressReadLess);
      }

      return (
        <Text style={styles.button} onPress={this._handlePressReadLess}>
          ย่อน้อยลง
        </Text>
      );
    }
  }
}

function measureHeightAsync(component) {
  return new Promise(resolve => {
    component.measure((x, y, w, h) => {
      resolve(h);
    });
  });
}

function nextFrameAsync() {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

const styles = StyleSheet.create({
  button: {
    color: 'rgb(233, 142, 23)',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
