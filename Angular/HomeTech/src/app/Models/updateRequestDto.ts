export class updateRequestDto {
    constructor(
        public CustomerId: string,
        public Service?: String,
        public Category?: string,
        public Date?: any,
        public ComplaintId?: string
    ) { }

}