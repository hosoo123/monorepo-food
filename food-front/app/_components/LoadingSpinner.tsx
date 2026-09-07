export const LoadingSpinner = ({
  className = "h-6 w-6",
}: {
  className?: string;
}) => (
  <div
    className={`${className} animate-spin rounded-full border-2 border-zinc-200 border-t-[#EF4444]`}
  />
);
