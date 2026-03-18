export interface IUser {
    id: string
    email: string
    name : string | null
    password ?: string
    resume_data : IResumeData | null
    role : "user" | "admin"
}

export interface IResumeData {
    personal_info : {
        fullname : string
        email : string
        phone : string
        address : string
        summary : string
        linkedInUrl : string
        githubUrl : string
        professionalTitle : string
    }
    education : {
        institution : string
        degree : string
        fieldOfStudy : string
        startDate : string
        endDate : string
    }[]
    experience : {
        jobtitle : string
        company : string
        location : string
        startDate : string
        endDate : string
        description : string
    }[]
    skills : {
        name : string
        level : number
    }
    
}

