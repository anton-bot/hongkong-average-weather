import React from 'react';
// TODO FIXME - installing the dependency directly breaks types
import { Line, RoughProvider } from 'react-roughjs'; // tslint:disable-line
import './RoughHeader.scss';

export class RoughHeader extends React.PureComponent {
  render() {
    return (
      <div className="RoughHeader">
        <div>
          {this.props.children}
        </div>
        <svg>
          <RoughProvider>
            <Line
              x1={0}
              x2={120}
              y1={5}
              y2={0}
            />
          </RoughProvider>
        </svg>
      </div>
    );
  }
}
