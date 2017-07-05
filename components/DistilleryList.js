import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from '@expo/ex-navigation';

import DistilleryListItem from './DistilleryListItem';

function distilleriesFromIds(all, ids) {
  return ids.map(id => all.find(distillery => distillery.id === id));
}

@withNavigation
@connect((data, props) => DistilleryList.getDataProps(data, props))
export default class DistilleryList extends React.Component {
  static getDataProps(data, props) {
    let { distilleries } = data;
    let { all, nearby, visited } = distilleries;

    if (props.nearby) {
      distilleries = distilleriesFromIds(all, nearby);
    } else if (props.visited) {
      distilleries = distilleriesFromIds(all, visited);
    } else if (props.notVisited) {
      let allDistilleryIds = all.map(distillery => distillery.id);
      let notVisited = allDistilleryIds.filter(id => !visited.includes(id));
      distilleries = distilleriesFromIds(all, notVisited);
    } else {
      distilleries = all;
    }

    return {
      distilleries,
    }
  }

  state = {
    renderContents: false,
  }

  componentDidMount() {
    this.props.setRef && this.props.setRef(this);
    requestAnimationFrame(() => {
      this.setState({renderContents: true});
    });
  }

  componentDidUpdate() {
    this.props.setRef && this.props.setRef(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.distilleries !== this.props.distilleries;
  }

  scrollTo(opts) {
    this._scrollView._component.scrollTo(opts);
  }

  render() {
    return (
      <View onLayout={this.props.onLayout} style={styles.container}>
        <Animated.ScrollView
          ref={view => { this._scrollView = view; }}
          contentContainerStyle={this.props.contentContainerStyle}
          style={styles.container}
          onScroll={this.props.onScroll}
          onResponderRelease={this.props.onMomentumScrollEnd}
          onResponderTerminate={this.props.onMomentumScrollEnd}
          onMomentumScrollBegin={this.props.onMomentumScrollBegin}
          onMomentumScrollEnd={this.props.onMomentumScrollEnd}
          onScrollBeginDrag={this.props.onScrollBeginDrag}
          onScrollEndDrag={this.props.onScrollEndDrag}
          onContentSizeChange={this.props.onContentSizeChange}
          scrollEventThrottle={16}>
          {this._renderContents()}

          <StatusBar barStyle="default" />
        </Animated.ScrollView>
      </View>
    );
  }

  _renderContents() {
    // This is useful to show *something* while blocking the JS thread to render all list items
    // Better to just make this ListView at some point
    if (!this.state.renderContents) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 75}}>
          <ActivityIndicator />
        </View>
      );
    }

    return this.props.distilleries.map(distillery => (
      <DistilleryListItem
        onPress={() => this._handlePressDistillery(distillery) }
        distillery={distillery}
        key={distillery.name}
      />
    ));
  }

  _handlePressDistillery = (distillery) => {
    this.props.navigator.push('details', {distilleryId: distillery.id});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
});
