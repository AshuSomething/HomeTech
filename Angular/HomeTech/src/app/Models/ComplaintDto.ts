export class ComplaintDto {
    constructor(
        public Service: string,
        public Category: string,
        public Date: any,
        public CustomerId: string
    ) { }

}