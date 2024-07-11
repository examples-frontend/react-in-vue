import React from 'react';
import react, { createElement, useEffect } from 'react';

import {useState, createElement as asCE} from 'react';

const Meta = {
  createElement,
  // @ts-ignore
  factory: function(...args) { createElement(...args)},
  name: createElement 
}

const Component_Meta_createElement = () => {
  return Meta.createElement('div', null);
}

const Component_Meta_factory = () => {
  return Meta.createElement('div', null, 'Component_Meta_factory');
}

const Component_Meta_name = () => {
  return Meta.createElement('div',  null, 'Component_Meta_name');
}
const ComponentCreateElement = () => {
  return createElement('div', { test: 'ComponentCreateElement'});
}

const ComponentAsCE: React.FC = () => {
  return asCE("div",  { test: 'ComponentAsCE'});
};

const ComponentReactCreateElement: React.FC = () => {
  return React.createElement("div", { test: 'React.createElement'});
};

const ExampleBabel: React.FC = () => {
  return (
      <>
        <div data-test={"1"}>
          <div>component-body</div>
        </div>
      </>
  );
};

export default ExampleBabel;
