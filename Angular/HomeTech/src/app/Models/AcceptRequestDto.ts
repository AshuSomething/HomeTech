export class AcceptRequestDto {
    constructor(
        public ComplaintId: Number,
        public Service?: String,
        public Category?: string,
        public Date?: any,
        public CustomerId?: string,
        public TechnicianId?: string
    ) { }

}
