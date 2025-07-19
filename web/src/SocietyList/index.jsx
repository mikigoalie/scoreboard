import { Virtuoso } from 'react-virtuoso';
import SocietyComponent from './SocietyComponent';

const SocietyList = ({ societies }) => {
  return (
    <Virtuoso
      data={societies}
      style={{
        flex: 1,
        minHeight: 0,
        height: '100%',
        overflow: 'auto',
      }}
      components={{
        Item: ({ children, ...props }) => (
          <div {...props} style={{ paddingBottom: 2 }}>
            {children}
          </div>
        )
      }}
      itemContent={(index, society) => <SocietyComponent label={society.label} playerCount={society.playerCount} />}
    />
  );
};

export default SocietyList;
