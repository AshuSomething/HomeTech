export class CustomerRequestDto {
    constructor(
        public complaintID: string,
        public service: string,
        public category: string,
        public date: string,
        public customerId: string
    ) { }
}

