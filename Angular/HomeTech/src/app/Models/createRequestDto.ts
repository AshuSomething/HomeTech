export class CreateRequestDto {
    constructor(
        public CustomerId: string,
        public Service?: String,
        public Category?: string,
        public Date?: any
    ) { }

}
