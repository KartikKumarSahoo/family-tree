import React from 'react';
import Tree from 'react-d3-tree';
import './App.css';
import { deepClone, findMember } from './utils';
import MemberNode from './MemberNode';
import initialFamilyTree from './familyTreeMock';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: initialFamilyTree,
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
      },
    });
  }

  addChild = (parent, child) => {
    const nextData = deepClone(this.state.data);
    const targetMember = findMember(nextData, parent.key);
    targetMember.children = [...(targetMember.children || []), child];

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
          id="family-tree"
          style={{ width: '100vw', height: '100vh' }}
          ref={dom => (this.treeContainer = dom)}
        >
          <Tree
            data={data}
            translate={position}
            orientation={'vertical'}
            nodeSize={{ x: 150, y: 170 }}
            allowForeignObjects
            circleRadius={16}
            nodeLabelComponent={{
              render: (
                <MemberNode
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

export default App;
