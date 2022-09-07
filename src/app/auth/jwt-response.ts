export class JwtResponse {
    accessToken: string;
    type: string;
    username: string;
    roles: [];
    success:boolean;
    message:string;
    empId:string;
    defaultRoleId: any;
    defaultRole: string;
    companyCode:string;
    file:string;
    firstNameLastName:string;
    pharmaciesType:string;
}
