import { memo } from 'react'
import { Virtuoso } from 'react-virtuoso';
import SocietyComponent from '../SocietyComponent';

const virtuosoStyles = {
    flex: 1,
    height: '100%',
    overflow: 'auto',
};

const itemStyles = {
    paddingBottom: '2px',
};

const Societylist = ({ filter, data }) => {
    console.log(JSON.stringify(data))


    return (
        <Virtuoso
            data={[...data.values()]}
            style={virtuosoStyles}
            itemContent={(index, item) => <SocietyComponent id={item.name} data={item} />}
            components={{
                Item: ({ children, ...props }) => (
                    <div {...props} style={itemStyles}>
                        {children}
                    </div>
                ),
            }}
            aria-label='List of societies'
        />
    )
}

export default memo(Societylist)
