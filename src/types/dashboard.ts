export interface DashboardTypes {
  totalSales: number;
  ticketsSold: number;
  activeEvents: number;
  avgRating: number;
  salesChart: ChartData[];
}

export interface ChartData {
  name: string;
  total: number;
}
