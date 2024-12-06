import { useState } from "react";

const itemHeight = 35; // Adjustable global variable
const windowHeight = 500;
const preloadCount = 10;

const ListItem = ({ index }) => {
  return (
    <li
      style={{
        height: `${itemHeight}px`,
        top: `${itemHeight * index}px`,
        backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white'
      }}
      className="text-center w-full leading-9"
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

  // 從 startIndex 開始，原本會預設渲染 floor(500 / 35) + 2 * 10 = 14 + 20 = 34 個 item
  // 但最後剩下只夠渲染不到 34 個 item 時，則只渲染剩下的 item，直到只剩 14 個 item
  const renderedCount = Math.floor(windowHeight / itemHeight) + 2 * preloadCount;
  const restItemsCount = numberOfItems - startIndex;

  const preloadedRenderedCount = Math.min(restItemsCount, renderedCount);
  
  const totalHeight = numberOfItems * itemHeight;

  const listItems = (() => {
    const items = [];
    for (let i = 0; i <= preloadedRenderedCount; i++) {
      const index = startIndex + i;
      items.push(<ListItem key={index} index={index} />);
    }
    return items;
  })();


  return (
    <ul
      className="overflow-y-scroll w-full h-[500px] border-2 border-black"
      style={{ height: `${windowHeight}px` }}
      onScroll={(e) => {
        setScrollTop(e.currentTarget.scrollTop);
      }}
    >
      <div style={{
        height: `${totalHeight}px`
      }}>
        <div style={{
          transform: `translateY(${startIndex * itemHeight}px)`
        }}>
          {listItems}
        </div>
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