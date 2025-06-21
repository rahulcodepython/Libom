import { IUser } from "@/models/user.models";

export interface UserType extends IUser {
    _id: string;
}