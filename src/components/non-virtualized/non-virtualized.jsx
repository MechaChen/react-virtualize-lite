const itemHeight = 35; // Adjustable global variable

const ListItem = ({ index }) => {
    return (
      <li style={{ height: `${itemHeight}px` }} className="text-center">
        List Item Index - {index}
      </li>
    );
  };

export const NonVirtualizedList = ({
  numberOfItems,
}) => {
  const listItems = Array.from({ length: numberOfItems }, (_, index) => (
    <ListItem key={index} index={index} />
  ));

  return (
    <ul
      className="overflow-y-scroll w-full h-[500px] border-2 border-black"
      onScroll={(e) => {
        console.log('Scrolling ', e.currentTarget.scrollTop);
      }}
    >
      {listItems}
    </ul>
  );
};

export const numberOfItems = 100000;

export default function NonVirtualized() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h1 className="pb-4">Rendering {numberOfItems.toLocaleString()}</h1>
      <NonVirtualizedList numberOfItems={numberOfItems} />
    </div>
  );
}