const SKELETON_ITEMS = ["a", "b", "c", "d", "e"];

export default function SkeletonResults() {
  return (
    <div data-ocid="results.loading_state" className="space-y-8 animate-pulse">
      {SKELETON_ITEMS.map((id) => (
        <div key={id} className="space-y-2">
          <div className="skeleton-line h-3 w-32" />
          <div className="skeleton-line h-5 w-3/4" />
          <div className="skeleton-line h-3 w-full" />
          <div className="skeleton-line h-3 w-5/6" />
        </div>
      ))}
    </div>
  );
}
