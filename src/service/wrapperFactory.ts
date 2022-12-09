import { mount } from "@vue/test-utils";
export const wrapperFactory = (component, props = {}, plugins = {}) =>
  mount(component, {
    propsData: {
      ...props,
    },
    global: {
      plugins: [...plugins],
    },
  });
