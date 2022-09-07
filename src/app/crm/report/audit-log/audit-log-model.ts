export class AuditModel{
    id:number;
    object:any;
    objectId: any;
    empName: any;
    ipAddress: any;
    action: any;
    fromDate:any;
    toDate:any;
    moduleName:any;

 constructor(auditModel) {
       {
         this.id = auditModel.id || this.getRandomID();
         this.object = auditModel.object || "";
         this.objectId = auditModel.objectId || "";
         this.empName = auditModel.empName || "";
         this.ipAddress = auditModel.ipAddress || "";
         this.action = auditModel.action || "";
         this.fromDate = auditModel.fromDate || "";
         this.toDate = auditModel.toDate || "";
         this.moduleName = auditModel.moduleName || "";
       }
     }
     public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
    }
    