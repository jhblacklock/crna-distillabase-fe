import React from 'react';
import {
  connect,
} from 'react-redux';

import Actions from '../state/Actions';
import DistilleryDetails from '../components/DistilleryDetails';

@connect((data, props) => DistilleryDetailsScreen.getDataProps(data, props))
export default class DistilleryDetailsScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  static getDataProps(data, props) {
    let distilleryId = props.route.params.distilleryId;
    let distillery = data.distilleries.all.find(distillery => distillery.id === distilleryId);

    return {
      distillery,
    };
  }

  render() {
    return (
      <DistilleryDetails
        distillery={this.props.distillery}
        isVisited={this.props.isVisited}
        onToggleVisited={this._onToggleVisited}
      />
    );
  }
}
