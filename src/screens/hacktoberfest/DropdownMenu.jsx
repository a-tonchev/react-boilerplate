import { useEffect, useRef, useState } from 'react';

const DefaultMenu = ({ categories }) => (
  <ul className="py-1">
    {categories.map(({ name, link }, i) => (
      <li key={i} className="px-3 py-1">
        <a href={link} className="text-sm hover:text-secondary">{name}</a>
      </li>
    ))}
  </ul>
);

const ComplexMenu = ({ categories }) => (
  <div className="flex flex-wrap">
    {categories.map(({ name, children }, ind) => (
      <ul key={ind} className="max-w-[200px] py-1">
        <li className="px-3 py-1">
          <h2 className="text-base font-semibold">{name}</h2>
        </li>
        {children.map(({ name: n, link }, i) => (
          <li key={i} className="px-3 py-1">
            <a href={link} className="text-sm hover:text-secondary">{n}</a>
          </li>
        ))}
      </ul>
    ))}
  </div>
);

const DropdownMenu = ({
  open, categories, anchorEl, variant = 'default',
}) => {
  const popperRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && anchorEl) {
      const el = typeof anchorEl === 'function' ? anchorEl() : anchorEl;
      if (el) {
        const rect = el.getBoundingClientRect();
        setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
      }
    }
  }, [open, anchorEl]);

  if (!open) return null;

  return (
    <div
      ref={popperRef}
      className="absolute z-50 bg-popover rounded-lg border shadow-lg"
      style={{ top: position.top, left: position.left }}
    >
      {variant === 'default' ? (
        <DefaultMenu categories={categories} />
      ) : (
        <ComplexMenu categories={categories} />
      )}
    </div>
  );
};

export default DropdownMenu;
