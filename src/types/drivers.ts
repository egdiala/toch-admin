export interface FetchDriversQuery {
    q?: string; // Search for driver name
    status?: "0" | "1" | "2";
    page?: string | number;
    item_per_page?: string;
    start_date?: string;
    end_date?: string;
    component?: "count" | "export" | "count-status";
}