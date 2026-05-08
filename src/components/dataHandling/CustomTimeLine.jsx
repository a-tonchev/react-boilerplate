import { ClipboardList } from 'lucide-react';

const CustomTimeLine = ({ items }) => (
  <div className="relative">
    {items.map((item, index) => (
      <div key={`history-${index}`} className="flex gap-4 pb-8 last:pb-0">
        <div className="text-right min-w-[120px] pt-1">
          <p className="text-sm text-muted-foreground">{item.date}</p>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={[
              'flex items-center justify-center w-10 h-10 rounded-full',
              'bg-primary text-primary-foreground shrink-0',
            ].join(' ')}
          >
            <ClipboardList className="h-5 w-5" />
          </div>
          {index < items.length - 1 && (
            <div className="w-0.5 flex-1 bg-border mt-2" />
          )}
        </div>
        <div className="flex-1 pt-1">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default CustomTimeLine;
