// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { SignatureInput, ReportSignatureOverview, StatementTypeId, StatementVersion } from 'src/app/interface/effective';
// import { IdList, IdListHasQty } from 'src/app/interface/whitelist';
// import { BackendService } from '../backend/backend.service';
// import { ConfigService } from '../config/config.service';
// import * as CryptoJS from 'crypto-js';

// @Injectable({
//   providedIn: 'root'
// })
// export class SignatureInfoService {

//   constructor(
//     private backendService: BackendService,
//     private configService: ConfigService
//   ) { }

//   getSignatureList(searchInput: SignatureInput): Observable<IdListHasQty> {
//     return this.backendService.get<IdListHasQty>('/report/signature/list', searchInput).pipe(
//       map(res => res.Data));
//   }

//   getSignatureOverview(idList: IdList): Observable<ReportSignatureOverview[]> {
//     return this.backendService.get<string>('/report/signature/overview', idList).pipe(
//       map(res => {
//         const decData = CryptoJS.enc.Base64.parse(res.Data).toString(CryptoJS.enc.Utf8);
//         const decJson = CryptoJS.AES.decrypt(decData, CryptoJS.enc.Utf8.parse(this.configService.getConfig().secretKey), { iv: CryptoJS.enc.Utf8.parse(this.configService.getConfig().secretIv) }).toString(CryptoJS.enc.Utf8);
//         return JSON.parse(decJson);
//       }));
//   }

//   getStatementVersion(statementTypeId: StatementTypeId): Observable<StatementVersion[]> {
//     return this.backendService.get<StatementVersion[]>('/statement/version', statementTypeId).pipe(
//       map(res => res.Data));
//   }

//   // getSignatureList(): Observable<IdListHasQty> {
//   //   const idListTest = of(IDLIST);
//   //   return idListTest;
//   // }

//   // getSignatureOverview(): Observable<SignatureOverview2[]> {
//   //   const signatureOverviewTest = of(SIGNATUREOVERVIEW);
//   //   return signatureOverviewTest;
//   // }

//   // getStatementVersion(): Observable<StatementVersion[]> {
//   //   const statementVersion = of(STATEMENTVERSION);
//   //   return statementVersion;
//   // }
// }

// export const IDLIST: IdListHasQty =
// {
//   "AccountQty": 3,
//   "Id": [1, 2, 3]
// };

// export const STATEMENTVERSION: StatementVersion[] =
//   [
//     {
//       "Id": 1,
//       "Version": "v1.1.0"
//     }, {
//       "Id": 2,
//       "Version": "v1.1.0"
//     }, {
//       "Id": 3,
//       "Version": "v1.1.0"
//     }
//   ];

// export const SIGNATUREOVERVIEW: ReportSignatureOverview[] = [
//   {
//     "Id": 1,
//     "StatementType_Id": 1,
//     "Version": "v1.0.0",
//     "PlanType_Id": 1,
//     "Statement_Id": 1,
//     "Account": "hihi",
//     "SignDate": "2020-02-25 08:00:00",
//     "StartDate": "2020-02-01 08:00:00",
//     "EndDate": "2020-10-30 08:00:00",
//     "AccountInfo_CH": {
//       "Name": "王曉明",
//       "Cellphone": "0988888888",
//       "Address": "台北市內湖區瑞光路",
//       "Career": "軟體工程師",
//       "Position": "主管",
//       "JobFunction": "專業技術",
//       "CompanyName": "精誠資訊",
//       "CompanyAddress": "台北市內湖區瑞光路",
//     },
//     "AccountInfo_EN": {
//       "Name": "WANG,XIAO-MING",
//       "Cellphone": "0988888888",
//       "Address": "Taipei",
//       "Career": "軟體工程師",
//       "Position": "主管",
//       "JobFunction": "專業技術",
//       "CompanyName": "精誠資訊",
//       "CompanyAddress": "台北市內湖區瑞光路",
//     },
//     "Admin_Id": 1,
//     "UpdateTime": "2020-02-25 08:00:00",
//     "Archive": 0
//   }, {
//     "Id": 2,
//     "StatementType_Id": 1,
//     "Version": "v1.0.0",
//     "PlanType_Id": 1,
//     "Statement_Id": 1,
//     "Account": "hihi",
//     "SignDate": "2020-02-25 08:00:00",
//     "StartDate": "2020-02-01 08:00:00",
//     "EndDate": "2020-10-30 08:00:00",
//     "AccountInfo_CH": {
//       "Name": "王曉明",
//       "Cellphone": "0988888888",
//       "Address": "台北市內湖區瑞光路",
//       "Career": "軟體工程師",
//       "Position": "主管",
//       "JobFunction": "專業技術",
//       "CompanyName": "精誠資訊",
//       "CompanyAddress": "台北市內湖區瑞光路",
//     },
//     "AccountInfo_EN": {
//       "Name": "WANG,XIAO-MING",
//       "Cellphone": "0988888888",
//       "Address": "Taipei",
//       "Career": "軟體工程師",
//       "Position": "主管",
//       "JobFunction": "專業技術",
//       "CompanyName": "精誠資訊",
//       "CompanyAddress": "台北市內湖區瑞光路",
//     },
//     "Admin_Id": 1,
//     "UpdateTime": "2020-02-25 08:00:00",
//     "Archive": 0
//   }, {
//     "Id": 3,
//     "StatementType_Id": 1,
//     "Version": "v1.0.0",
//     "PlanType_Id": 1,
//     "Statement_Id": 1,
//     "Account": "hihi",
//     "SignDate": "2020-02-25 08:00:00",
//     "StartDate": "2020-02-01 08:00:00",
//     "EndDate": "2020-10-30 08:00:00",
//     "AccountInfo_CH": {
//       "Name": "王曉明",
//       "Cellphone": "0988888888",
//       "Address": "台北市內湖區瑞光路",
//       "Career": "軟體工程師",
//       "Position": "主管",
//       "JobFunction": "專業技術",
//       "CompanyName": "精誠資訊",
//       "CompanyAddress": "台北市內湖區瑞光路",
//     },
//     "AccountInfo_EN": {
//       "Name": "WANG,XIAO-MING",
//       "Cellphone": "0988888888",
//       "Address": "Taipei",
//       "Career": "軟體工程師",
//       "Position": "主管",
//       "JobFunction": "專業技術",
//       "CompanyName": "精誠資訊",
//       "CompanyAddress": "台北市內湖區瑞光路",
//     },
//     "Admin_Id": 1,
//     "UpdateTime": "2020-02-25 08:00:00",
//     "Archive": 0
//   }
// ];


