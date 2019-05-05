import { createPortal } from 'react-dom';
import { FunctionComponent } from 'react';

const Modal: FunctionComponent<{
  mount: boolean;
  domNode?: HTMLElement;
}> = ({ mount, domNode, children }) => {
  return mount
    ? createPortal(children, domNode || (document.querySelector('body') as HTMLBodyElement))
    : null;
};

export default Modal;
