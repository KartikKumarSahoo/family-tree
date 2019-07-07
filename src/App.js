import React from 'react';
import Tree from 'react-d3-tree';
import './App.css';
import { NAME, AGE, TEXT, MALE, FEMALE } from './constants';
import { deepClone, isEmpty } from './utils';

const fields = {
  name: {
    label: 'Name',
    type: 'text',
    validation: value => NAME.test(value),
  },
  age: {
    label: 'Age',
    type: 'number',
    validation: value => AGE.test(value),
  },
  gender: {
    label: 'Gender',
    type: 'select',
    validation: value => [MALE, FEMALE].includes(value),
  },
  color: {
    label: 'Fav Color',
    type: 'text',
    validation: value => TEXT.test(value),
  },
};

const findMember = (tree = [], selector) => {
  if (!selector) return tree[0];

  const members = selector.split('.');
  let currentNode = { children: tree };
  members.forEach(name => {
    currentNode = (currentNode.children || []).find(ele => ele.name === name);
  });
  return currentNode;
};

const familyTree = [
  {
    name: 'Ramesh',
    key: 'Ramesh',
    attributes: {
      Age: 60,
      Gender: 'Male',
      'Fav Color': 'Green',
    },
    children: [
      {
        name: 'Suresh',
        key: 'Ramesh.Suresh',
        attributes: {
          Age: 30,
          Gender: 'Male',
          'Fav Color': 'Blue',
        },
      },
      {
        name: 'Jitesh',
        key: 'Ramesh.Jitesh',
        children: [
          {
            name: 'Rakesh',
            key: 'Ramesh.Jitesh.Rakesh',
            attributes: {
              Age: 2,
              Gender: 'Female',
              hello: undefined,
            },
          },
        ],
      },
    ],
  },
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: familyTree,
      position: { x: 0, y: 0 },
    };
  }

  componentDidMount() {
    // Get treeContainer's dimensions so we can center the tree
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      position: {
        x: dimensions.width / 2,
        y: 100,
        // y: dimensions.height / 2,
      },
    });
  }

  onNodeClick = (node, e) => {
    console.log(node);
    console.log(e);
  };

  addChild = (parent, child) => {
    const nextData = deepClone(this.state.data);
    const targetMember = findMember(nextData, parent.key);
    targetMember.children = [...(targetMember.children || []), child];

    // console.log('after adding a child', nextData);
    this.setState({
      data: nextData,
    });
  };

  removeChild = child => {
    const nextData = deepClone(this.state.data);
    const targetMember = findMember(nextData, child.parent.key);
    targetMember.children = targetMember.children.filter(
      member => member.key !== child.key,
    );

    // console.log('after removing a child', nextData);
    this.setState({
      data: nextData,
    });
  };

  render() {
    const { data = [], position = {} } = this.state;

    return (
      <div className="App">
        <header className="App-header">Family Tree</header>
        <div
          id="treeWrapper"
          style={{ width: '100vw', height: '100vh' }}
          ref={dom => (this.treeContainer = dom)}
        >
          <Tree
            data={data}
            translate={position}
            orientation={'vertical'}
            onClick={this.onNodeClick}
            nodeSize={{ x: 150, y: 170 }}
            // collapsible={false}
            allowForeignObjects
            nodeLabelComponent={{
              render: (
                <NodeLabel
                  className="node-wrapper"
                  addChild={this.addChild}
                  removeChild={this.removeChild}
                />
              ),
              foreignObjectWrapper: {
                x: -10,
                y: -30,
              },
            }}
          />
        </div>
      </div>
    );
  }
}

class NodeLabel extends React.PureComponent {
  onAddChild = e => {
    e && e.stopPropagation();
    const { nodeData } = this.props;
    // console.log('Add Child to', nodeData, e);
    // Open dialog and take the Name and other values.
    const child = {
      name: 'Hello',
      key: `${nodeData.key}.Hello`,
      attributes: { age: 23 },
    };
    this.props.addChild(nodeData, child);
  };

  onRemove = e => {
    e && e.stopPropagation();
    const { nodeData } = this.props;
    // console.log('Remove Child', this.props, nodeData, e);

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

        <button onClick={this.onAddChild}>Add Child</button>
        {!children && <button onClick={this.onRemove}>Remove</button>}
      </div>
    );
  }
}

export default App;

// Add child with dialog
// Organize and Cleanup code (Check naming)
// Styling fix
