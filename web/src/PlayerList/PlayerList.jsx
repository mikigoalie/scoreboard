import { Virtuoso } from 'react-virtuoso';
import PlayerComponent from './PlayerComponent';

const PlayerList = ({ players = {}}) => {
  return <Virtuoso
  data={players}
  totalCount={players.length}
  style={{
    flex: 1,
    minHeight: 0,
    height: '100%',
    overflow: 'auto',
  }}
  itemContent={(index, player) => <PlayerComponent key={player.serverId} id={player.serverId} data={player} />}
  components={{
    Item: ({ children, ...props }) => (
      <div {...props} style={{ paddingBottom: 2 }}>
        {children}
      </div>
    ),
  }}
/>

};

export default PlayerList;
