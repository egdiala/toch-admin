export type LoginType = {
    email: string;
    password: string;
}

export type SetPasswordType = {
    otp: string;
    new_password: string;
    otp_request_id: string;
}

export interface User {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    avatar: string;
    user_type: string;
    login_attempt: {
        trials: number;
        account_disabled: boolean;
    };
    default_code: string;
    default_pass: boolean;
    gender: string;
    suspend_reason: string;
    status: number;
    data_mode: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    auth_id: string;
    token: string;
}