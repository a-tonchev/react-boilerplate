import { cn } from '@/lib/utils';

const Loading = ({ type, className, ...rest }) => (
  <span className={cn('flex-grow flex items-center justify-center', className)}>
    {type === 'circular' ? (
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"
        {...rest}
      />
    ) : (
      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-pulse w-2/3" />
      </div>
    )}
  </span>
);

export default Loading;
