import React from 'react';
import { pickRandom } from './utils';
import {
  CITY_LIST,
  NAME_LIST,
  COLOR_LIST,
  MALE,
  FEMALE,
  REMOVE_CONFIRM_MESSAGE,
} from './constants';

class MemberNode extends React.PureComponent {
  onAddChild = e => {
    e && e.stopPropagation();
    const { nodeData } = this.props;

    // TODO: Open dialog and take the Name and other values.
    const name = pickRandom(NAME_LIST);
    const child = {
      name,
      key: `${nodeData.key}.${name}`,
      attributes: {
        City: pickRandom(CITY_LIST),
        Gender: pickRandom([MALE, FEMALE]),
        'Fav Color': pickRandom(COLOR_LIST),
      },
    };
    this.props.addChild(nodeData, child);
  };

  onRemove = e => {
    e && e.stopPropagation();
    const { nodeData } = this.props;

    if (window.confirm(REMOVE_CONFIRM_MESSAGE))
      this.props.removeChild(nodeData);
  };

  render() {
    const { className, nodeData } = this.props;
    const { attributes = {}, _children: children, name = '' } = nodeData;

    return (
      <div className={`${className} ${children ? 'parent' : 'leaf'}`}>
        <h3>{name}</h3>
        <div className="attr-wrapper">
          {Object.keys(attributes).map(key => {
            const value = attributes[key] || '';
            if (!value) return null;

            return (
              <div className="attr-row" key={value}>
                <span className="label">{key}</span>:&nbsp;
                <span className="value">{value}</span>
              </div>
            );
          })}
        </div>

        <button onClick={this.onAddChild} title="Add Child">
          +
        </button>
        {!children && (
          <button onClick={this.onRemove} title="Remove Member">
            -
          </button>
        )}
      </div>
    );
  }
}

export default MemberNode;
