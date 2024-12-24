export interface FetchDriversQuery {
    q?: string; // Search for driver name
    status?: "0" | "1" | "2";
    page?: string | number;
    item_per_page?: string;
    start_date?: string;
    end_date?: string;
    component?: "count" | "export" | "count-status";
}

export interface FetchedDriversCountStatusType {
    total: number;
    pending: number;
    registered: number;
    verified: number;
}

export interface FetchedDriverType {
    email: string;
    email_status: number;
    phone_number: string;
    phone_status: number;
    nin_id: {
        value: string;
        status: number;
    };
    driver_license_id: {
        value: string;
        status: number;
    };
    lasrra_id: {
        value: string;
        status: number;
    };
    gender: "female" | "male";
    status: number;
    signup_status: number;
    avatar: string;
    school_avatar: string;
    dob: string;
    nationality: string;
    origin_state: string;
    origin_lga: string;
    residence_housenumber: string;
    residence_streetname: string;
    residence_bustop: string;
    residence_state: string;
    residence_lga: string;
    residence_landmark: string;
    exp_year: number;
    exp_vehicle: string[];
    highest_level: string;
    school: string;
    blood_group: string;
    wear_glasses: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    first_name: string;
    last_name: string;
    driver_id: string;
}