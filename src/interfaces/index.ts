export interface IUser {
    id: string
    email: string
    name : string | null
    password ?: string
    resume_data : any
    role : "user" | "admin"
}