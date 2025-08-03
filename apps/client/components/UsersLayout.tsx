import Button from "./Button";
import { ReactNode } from "react";

interface UsersLayoutProps {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
  onSaved?: () => void;
}

const UsersLayout = ({
  title,
  children,
  onBack,
  showLoadMore,
  onLoadMore,
  loading,
  onSaved,
}: UsersLayoutProps) => (
  <section className="flex flex-col p-6 items-center">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <div className="flex flex-wrap gap-4 justify-center">{children}</div>
    <div className="mt-4 flex gap-10 justify-center">
      {showLoadMore && onLoadMore && (
        <Button onClick={onLoadMore} disabled={loading} className="load-btn">
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}
      {onBack && (
        <Button className="load-btn" onClick={onBack}>
          Back
        </Button>
      )}
      {onSaved && (
        <Button className="load-btn" onClick={onSaved}>
          Saved Users
        </Button>
      )}
    </div>
  </section>
);

export default UsersLayout;
