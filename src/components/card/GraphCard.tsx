import { GraphCardProps } from "@/types/components/card/graphCard";
import { ArrowUp } from "lucide-react";

export const GraphCard: React.FC<GraphCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
}) => (
  <div className="rounded-xl border border-blue-100/50 bg-white p-3 shadow-lg">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
          {title}
        </h3>
        <p className="mt-1 text-2xl font-extrabold text-blue-900">{value}</p>
      </div>
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${color}`}
      >
        <Icon className="h-4 w-4" />
      </div>
    </div>
  </div>
);
