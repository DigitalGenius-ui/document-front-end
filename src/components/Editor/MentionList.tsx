// components/MentionList.tsx
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

interface MentionListRef {
  onKeyDown: (args: { event: KeyboardEvent }) => boolean;
}
type MentionListProps = {
  items: string[];
  command: ({ id, label }: { id: string; label: string }) => void;
  query: string;
};

const MentionList = React.forwardRef<MentionListRef, MentionListProps>(
  ({ items, command, query }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const filteredItems = useMemo(() => {
      if (!query.trim()) return [];
      return items.filter((name) =>
        name.toLowerCase().includes(query.toLowerCase())
      );
    }, [items, query]);

    const selectItem = (index: number) => {
      const item = items[index];

      if (item) {
        command({ id: item, label: item });
      }
    };

    const upHandler = () => {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="dropdown-menu">
        {filteredItems.map((item, index) => (
          <button
            key={index}
            className={index === selectedIndex ? "is-selected" : ""}
            onClick={() => selectItem(index)}
          >
            {item}
          </button>
        ))}
      </div>
    );
  }
);

export default MentionList;
