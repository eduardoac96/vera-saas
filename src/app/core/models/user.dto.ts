export interface UserDto{
    id:string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    avatarUrl?: string;
    isHost: boolean;
    createdAt: string;
    
}