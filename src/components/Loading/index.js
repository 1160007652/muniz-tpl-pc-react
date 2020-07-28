import React from 'react';

/**
 * Loading 异步加载路由的过度组件
 * @component
 *
 */

function Loading(props) {
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
}

export default Loading;
