export interface AllocationFormType {
    usercode: string;
    bookisbn: string;
}

export interface AllocationRecordType {
    _id: string;
    allotedDate: string;
    submissionDate: string;
    returnedDate: string | null;
    isReturned: boolean;
    usercode: string;
    username: string;
    bookisbn: string;
    booktitle: string;
}