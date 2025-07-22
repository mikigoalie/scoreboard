import { memo } from 'react'
import { Virtuoso } from 'react-virtuoso';
import PlayerComponent from '../PlayerComponent';
  const virtuosoStyles = {
    flex: 1,
    height: '100%',
    overflow: 'auto',
  };

  const itemStyles = {
    paddingBottom: '2px',
  };

  

const DisconnectedPlayerlist = ({ filter, data }) => {


  return (
    <Virtuoso
      data={[...data.values()]}
      style={virtuosoStyles}
      itemContent={(index, item) => <PlayerComponent id={item.serverId} data={item} />}
      components={{
        Item: ({ children, ...props }) => (
          <div {...props} style={itemStyles}>
            {children}
          </div>
        ),
      }}
      aria-label='List of disconnected players'
    />
  )
}

export default memo(DisconnectedPlayerlist)
