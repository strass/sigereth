/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { useToolbarState, Toolbar, ToolbarItem } from 'reakit/Toolbar';
import { usePopoverState, Popover, PopoverDisclosure } from 'reakit/Popover';
import RollerOrganism from '../Roller';

const FooterToolbarOrganism: FunctionComponent = () => {
  const toolbar = useToolbarState();
  const popover = usePopoverState({ placement: 'top' });

  return (
    <Toolbar {...toolbar} css={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <ToolbarItem {...toolbar} as={PopoverDisclosure} {...popover}>
        Open Me
        <Popover {...popover} aria-label="Welcome" modal unstable_orphan>
          <div
            css={{ background: 'white' }}
            // TODO: See if I can find a better way
            onClick={e => e.stopPropagation()}
          >
            <RollerOrganism />
          </div>
        </Popover>
      </ToolbarItem>
      <ToolbarItem {...toolbar}>Item 2</ToolbarItem>
      <ToolbarItem {...toolbar}>Item 3</ToolbarItem>
    </Toolbar>
  );
};

export default FooterToolbarOrganism;
