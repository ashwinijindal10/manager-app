import { Component, EventEmitter } from '@angular/core';

// helper to mock component
export function MockComponent(options: Component): Component {
    const metadata: Component = {
      selector: options.selector,
      template: options.template || '',
      inputs: options.inputs,
      outputs: options.outputs
    };

    class MockedComponent {}

    metadata.outputs.forEach(method => {
       MockedComponent.prototype[method] = new EventEmitter<any>();
    });

  return Component(metadata)(MockedComponent as any);
    // return Component(metadata)(class _ {});
  }
