import React from 'react';
import { cn } from '@/lib/utils';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onSearch?: (value: string) => void;
  buttonClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, buttonClassName, placeholder = 'Search', ...props }, ref) => {
    const [value, setValue] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSearch) {
        onSearch(value);
      }
    };

    return (
      <div className="w-full">
        <form onSubmit={handleSubmit} className="relative flex w-full">
          <input
            ref={ref}
            type="text"
            className={cn(
              'h-12 w-full flex-1 border border-light-gray bg-white px-4 py-3 pr-14 text-sm text-dark placeholder:text-gray/60 transition-colors focus-visible:border-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-dark disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...props}
          />
          <button
            type="submit"
            className={cn(
              'absolute right-0 top-0 flex h-12 w-12 items-center justify-center bg-primary text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              buttonClassName
            )}
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };