
export class ResponseApi<T> {
    success: boolean
    message: string
    data: T
    requests: T
    Data: T
    errors: string

    //pagination property's
    pageNumber:   number
    pageSize:     number
    firstPage:    number
    lastPage:     number
    totalPages:   number
    totalRecords: number
    nextPage:     number
    previousPage: number

    constructor(private datavalue: any) {
        this.data=datavalue.data;
        this.Data=datavalue?.Data;
        this.success=datavalue.success;
        this.message=datavalue.message;
        
        this.requests= datavalue?.data?.requests
    }
    
}

