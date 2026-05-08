import {
  Trash2, Pencil, ChevronUp, ChevronDown,
} from 'lucide-react';

const ListItemsWithActions = ({
  items, handleSwitch, handleRemove, handleEdit,
}) => (
  <ul className="divide-y divide-border">
    {items.map((item, index) => (
      <li key={item.key || `item_${index}`} className="flex items-center justify-between py-2">
        <div className={item.className || 'max-w-[60%]'}>
          <p className="text-sm font-medium">{item.text}</p>
          {item.secondary && <p className="text-xs text-muted-foreground">{item.secondary}</p>}
        </div>
        <div className="flex items-center gap-1">
          {handleSwitch && (
            <>
              <button
                type="button"
                aria-label="arrow_up"
                onClick={() => handleSwitch(index, index - 1)}
                disabled={index === 0}
                className="p-1.5 rounded hover:bg-accent disabled:opacity-50 transition-colors"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="arrow_down"
                disabled={index === items.length - 1}
                onClick={() => handleSwitch(index, index + 1)}
                className="p-1.5 rounded hover:bg-accent disabled:opacity-50 transition-colors"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </>
          )}
          {handleRemove && (
            <button
              type="button"
              aria-label="delete"
              onClick={() => handleRemove(index, item)}
              className="p-1.5 rounded hover:bg-accent transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
          {handleEdit && (
            <button
              type="button"
              aria-label="edit"
              onClick={() => handleEdit(index, item)}
              className="p-1.5 rounded hover:bg-accent transition-colors"
            >
              <Pencil className="h-5 w-5" />
            </button>
          )}
        </div>
      </li>
    ))}
  </ul>
);

export default ListItemsWithActions;
