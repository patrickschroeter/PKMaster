export class Message {
    public id: string;
    public type: string;
    public message: string;
    public timeout?;

    constructor(id: string, type: string, message: string) {
        this.id = id;
        this.type = type;
        this.message = message;
    }
}
