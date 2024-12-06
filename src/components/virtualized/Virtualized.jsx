import { useState } from "react";

const itemHeight = 35; // Adjustable global variable
const windowHeight = 500;

const ListItem = ({ index }) => {
  return (
    <li
      style={{
        height: `${itemHeight}px`,
        top: `${itemHeight * index}px`,
        backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white'
      }}
      className="text-center absolute w-full leading-9"
    >
      List Item Index - {index}
    </li>
  );
};

const VirtualizedList = ({
  numberOfItems,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.floor((scrollTop + windowHeight) / itemHeight);

  const totalHeight = numberOfItems * itemHeight;

  const listItems = (() => {
    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push(<ListItem key={i} index={i} />);
    }
    return items;
  })();


  return (
    <ul
      className="overflow-y-scroll w-full h-[500px] border-2 border-black relative"
      style={{ height: `${windowHeight}px` }}
      onScroll={(e) => {
        setScrollTop(e.currentTarget.scrollTop);
      }}
    >
      <div style={{
        height: `${totalHeight}px`
      }}>
        {listItems}
      </div>
    </ul>
  );
};

export const numberOfItems = 100000;

export default function Virtualized() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h1 className="pb-4">Rendering {numberOfItems.toLocaleString()}</h1>
      <VirtualizedList numberOfItems={numberOfItems} />
    </div>
  );
}