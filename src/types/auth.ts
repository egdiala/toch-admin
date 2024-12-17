export type LoginType = {
    email: string;
    password: string;
}

export type SetPasswordType = {
    otp: string;
    new_password: string;
    otp_request_id: string;
}