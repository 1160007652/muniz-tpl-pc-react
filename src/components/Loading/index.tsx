/**
 * Loading 异步加载路由的过渡组件
 */

import React from 'react';

export interface LoadingProps {
  error: 'any';
  timedOut: 'any';
  pastDelay: 'any';
  retry: (event: React.MouseEvent) => void;
}

const Loading: React.FC<LoadingProps> = (props) => {
  if (props.error) {
    return (
      <div>
        Error! {props.error} <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <div>Loading... </div>;
  } else {
    return null;
  }
};

export default Loading;
