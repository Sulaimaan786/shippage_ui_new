export class SignUpInfo {
    name: string;
    username: string;
    empId: string;
    roles: string[];
    password: string;

    constructor(name: string, username: string, empId: string, password: string) {
        this.name = name;
        this.username = username;
        this.empId = empId;
        this.password = password;
        this.roles= ['user'];
    }
}
