import { Transition, Button, Affix } from '@mantine/core';
import { Virtuoso } from 'react-virtuoso';
import { useRef, useState } from 'react';
import PlayerComponent from './PlayerComponent';

const PlayerList = ({ players }) => {
  const virtuosoRef = useRef(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  return (
    <>
      <Virtuoso
        ref={virtuosoRef}
        data={players}
        style={{
          flex: 1,
          minHeight: 0,
          height: '100%',
          overflow: 'auto',
        }}
        itemContent={(index, player) => (
          <PlayerComponent id={player.serverId} data={player} />
        )}
        components={{
          Item: ({ children, ...props }) => (
            <div {...props} style={{ paddingBottom: 2 }}>
              {children}
            </div>
          ),
        }}
        scrollerRef={(ref) => {
          if (!ref) return;
          ref.addEventListener('scroll', () => {
            setShowScrollUp(ref.scrollTop > 200);
          });
        }}
      />

{/*       <Affix position={{ bottom: 20, right: 20 }}>
        <Transition mounted={showScrollUp} transition="pop" duration={200} timingFunction="ease">
          {(styles) => (
            <Button
              size="xs"
              variant="light"
              style={styles}
              onClick={() => virtuosoRef.current.scrollToIndex({ index: 0, behavior: 'smooth' })}
            >
              ↑ Top
            </Button>
          )}
        </Transition>
      </Affix> */}
    </> 
  );
};

export default PlayerList;
