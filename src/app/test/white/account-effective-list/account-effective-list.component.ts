// import { ShareService } from './../../../service/share/share.service';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { SignatureInfoService } from './../../../service/signature-info/signature-info.service';
// import { StatementType, IdList, } from 'src/app/interface/whitelist';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { ReferenceService } from 'src/app/service/reference/reference.service';
// import { ConfigService } from 'src/app/service/config/config.service';
// import { Order, SignatureInput, SignatureOverview, StatementTypeId, StatementVersion, HistorySignature4Excel } from 'src/app/interface/effective';
// import * as XLSX from 'xlsx';
// import * as CryptoJS from 'crypto-js';
// import { IDLIST } from './../../../service/signature-info/signature-info.service';
// import { SIGNATUREOVERVIEW } from './../../../service/signature-info/signature-info.service';

// @Component({
//   selector: 'app-account-effective-list',
//   templateUrl: './account-effective-list.component.html',
//   styleUrls: ['./account-effective-list.component.scss']
// })
// export class AccountEffectiveListComponent implements OnInit {
//   signatureOverview = SIGNATUREOVERVIEW;
//   idListTest = IDLIST;

//   public active: number = 1;
//   public page: number = 1;
//   public pageSize: number = 10;
//   private _noData: boolean = false;
//   private _effectiveForm = new FormGroup({
//     _statementType: new FormControl(''),
//     _statementVersion: new FormControl(''),
//     _account: new FormControl(''),
//     _startDate: new FormControl({ year: 0, month: 0, day: 0 }),
//     _endDate: new FormControl({ year: 0, month: 0, day: 0 })
//   });
//   private _order: Order = { Sort: '', Direction: 2 }
//   private _statementTypes: StatementType[] = [];
//   private _statementVersions: StatementVersion[] = [];
//   private _statementTypeId: StatementTypeId = { StatementType_Id: 0 };
//   private _signatureInput: SignatureInput = {
//     StatementType_Id: '',
//     TimeZone: this.configService.getConfig().timeZone,
//     Version_Id: '',
//     Account: '',
//     StartDate: '',
//     EndDate: '',
//     Order: ''
//   };
//   private _accountQty: number = 0;
//   private _allIdListQty: number = 0;
//   private _allIdList: IdList = { Id: [] };
//   private _idList: IdList = { Id: [] };
//   private _batchList: IdList = { Id: [] };
//   private _signatures: SignatureOverview[] = [];
//   private _signaturesExcel: SignatureOverview[] = [];
//   private _signatureDataExcel: Map<number, HistorySignature4Excel>;
//   private _now: Date;

//   public get noData(): boolean {
//     return this._noData;
//   }
//   public get effectiveForm(): FormGroup {
//     return this._effectiveForm;
//   }
//   public get statementType(): string {
//     return this._effectiveForm.get('_statementType')?.value;
//   }
//   public get statementVersion(): string {
//     return this._effectiveForm.get('_statementVersion')?.value;
//   }
//   public get account(): string {
//     return this._effectiveForm.get('_account')?.value;
//   }
//   public get startDate(): NgbDateStruct {
//     return this._effectiveForm.get('_startDate')?.value;
//   }
//   public get endDate(): NgbDateStruct {
//     return this._effectiveForm.get('_endDate')?.value;
//   }
//   public get order(): Order {
//     return this._order;
//   }
//   public get statementTypes(): StatementType[] {
//     return this._statementTypes;
//   }
//   public get statementVersions(): StatementVersion[] {
//     return this._statementVersions;
//   }
//   public get statementTypeId(): StatementTypeId {
//     return this._statementTypeId;
//   }
//   public get signatureInput(): SignatureInput {
//     return this._signatureInput;
//   }
//   public get allIdList(): IdList {
//     return this._allIdList;
//   }
//   public get accountQty(): number {
//     return this._accountQty;
//   }
//   public get allIdListQty(): number {
//     return this._allIdListQty;
//   }
//   public get idList(): IdList {
//     return this._idList;
//   }
//   public get batchList(): IdList {
//     return this._batchList;
//   }
//   public get signatures(): SignatureOverview[] {
//     return this._signatures;
//   }
//   public get signaturesExcel(): SignatureOverview[] {
//     return this._signaturesExcel;
//   }
//   public get signatureDataExcel(): Map<number, HistorySignature4Excel> {
//     return this._signatureDataExcel;
//   }
//   public get now(): Date {
//     return this._now;
//   }
//   public set noData(_noData: boolean) {
//     this._noData = _noData;
//   }
//   public set statementTypes(_statementTypes: StatementType[]) {
//     this._statementTypes = _statementTypes;
//   }
//   public set statementVersions(_statementVersions: StatementVersion[]) {
//     this._statementVersions = _statementVersions;
//   }
//   public set statementTypeId(_statementTypeId: StatementTypeId) {
//     this._statementTypeId = _statementTypeId;
//   }
//   public set statementType(_statementType: string) {
//     this._effectiveForm.get('_statementType')?.patchValue(_statementType);
//   }
//   public set statementVersion(_statementVersion: string) {
//     this._effectiveForm.get('_statementVersion')?.patchValue(_statementVersion);
//   }
//   public set account(_account: string) {
//     this._effectiveForm.get('_account')?.patchValue(_account);
//   }
//   public set startDate(_startDate: NgbDateStruct) {
//     this._effectiveForm.get('_startDate')?.patchValue(_startDate);
//   }
//   public set endDate(_endDate: NgbDateStruct) {
//     this._effectiveForm.get('_endDate')?.patchValue(_endDate);
//   }
//   public set order(_order: Order) {
//     this._order = _order;
//   }
//   public set accountQty(_accountQty: number) {
//     this._accountQty = _accountQty;
//   }
//   public set allIdListQty(_allIdListQty: number) {
//     this._allIdListQty = _allIdListQty;
//   }
//   public set allIdList(_allIdList: IdList) {
//     this._allIdList = _allIdList;
//   }
//   public set signatureInput(_signatureInput: SignatureInput) {
//     this._signatureInput = _signatureInput;
//   }
//   public set idList(_idList: IdList) {
//     this._idList = _idList;
//   }
//   public set batchList(_batchList: IdList) {
//     this._batchList = _batchList;
//   }
//   public set signatures(_signatures: SignatureOverview[]) {
//     this._signatures = _signatures;
//   }
//   public set signaturesExcel(_signaturesExcel: SignatureOverview[]) {
//     this._signaturesExcel = _signaturesExcel;
//   }
//   public set signatureDataExcel(_signatureDataExcel: Map<number, HistorySignature4Excel>) {
//     this._signatureDataExcel = _signatureDataExcel;
//   }
//   public set now(_now: Date) {
//     this._now = _now;
//   }
//   constructor(
//     private referenceService: ReferenceService,
//     private signatureInfoService: SignatureInfoService,
//     private configService: ConfigService,
//     private shareService: ShareService
//   ) {
//     this._signatureDataExcel = new Map<number, HistorySignature4Excel>();
//     this._now = new Date;
//   }

//   ngOnInit(): void {
//     this.getStatementType();
//   }

//   private getStatementType(): void {
//     this.referenceService.getStatementType().subscribe(res => {
//       this.statementTypes = res.Data;
//     })
//   }

//   public getStatementVersion(statementType: string): void {
//     this.statementTypeId.StatementType_Id = Number(statementType);
//     // this.signatureInfoService.getStatementVersion(this.statementTypeId).subscribe(res => {
//     //   this.statementVersions = res;
//     // })
//     this.signatureInfoService.getStatementVersion().subscribe(res => {
//       this.statementVersions = res;
//     })
//   }

//   /**
//    *簽屬紀錄查詢
//    */
//   public onClickSearchBtn(): void {
//     if ((this.startDate.year !== 0) && (this.endDate.year !== 0)) {
//       this.signatureInput.StartDate = this.shareService.dateStruct2String(this.startDate);
//       this.signatureInput.EndDate = `${this.shareService.dateStruct2String(this.endDate)} 23:59:59`;
//     }
//     if (this.order.Direction !== 2) {
//       this.signatureInput.Order = JSON.stringify(this.order);
//     }
//     this.signatureInput.StatementType_Id = this.statementType;
//     this.signatureInput.Version_Id = this.statementVersion;
//     const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.account), CryptoJS.enc.Utf8.parse(this.configService.getConfig().secretKey), { iv: CryptoJS.enc.Utf8.parse(this.configService.getConfig().secretIv) }).toString();
//     const encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
//     this.signatureInput.Account = encData;
//     this.signatureInfoService.getSignatureList().subscribe(res => {
//       this.accountQty = res.AccountQty;
//       this.allIdList.Id = res.Id;
//       this.allIdListQty = res.Id.length;
//       if (this.allIdList.Id.length === 0) {
//         this.noData = true;
//       } else {
//         this.noData = false;
//         this.getPage();
//       }
//       this.now = new Date;
//       this.signatureInput.StatementType_Id = '';
//       this.signatureInput.Version_Id = '';
//       this.signatureInput.Account = '';
//       this.signatureInput.StartDate = '';
//       this.signatureInput.EndDate = '';
//       this.signatureInput.Order = '';
//       this.effectiveForm.disable();
//     })
//     // this.signatureInfoService.getSignatureList(this.signatureInput).subscribe(res => {
//     //   this.accountQty = res.AccountQty;
//     //   this.allIdList.Id = res.Id;
//     //   this.allIdListQty = res.Id.length;
//     //   if (this.allIdList.Id.length === 0) {
//     //     this.noData = true;
//     //   } else {
//     //     this.noData = false;
//     //     this.getPage();
//     //   }
//     //   this.now = new Date;
//     //   this.signatureInput.StatementType_Id = '';
//     //   this.signatureInput.Version_Id = '';
//     //   this.signatureInput.Account = '';
//     //   this.signatureInput.StartDate = '';
//     //   this.signatureInput.EndDate = '';
//     //   this.signatureInput.Order = '';
//     //   this.effectiveForm.disable();
//     // })
//   }

//   /**
//    *取得當頁面Overview
//    */
//   public getPage(): void {
//     this.idList.Id = this.shareService.sliceIdList(this.allIdList.Id, this.page, this.pageSize);
//     this.signatureInfoService.getSignatureOverview().subscribe(res => {
//       this.signatures = res;
//       for (let i = 0; i < this.signatures.length; i++) {
//         const date = new Date(`${this.signatures[i].SignDate.slice(0, 10)} ${this.signatures[i].SignDate.slice(11)} UTC`);
//         this.signatures[i].SignDate = this.shareService.dateTime2String(date);
//       }
//     });
//     // this.signatureInfoService.getSignatureOverview(this.idList).subscribe(res => {
//     //   this.signatures = res;
//     //   for (let i = 0; i < this.signatures.length; i++) {
//     //     const date = new Date(`${this.signatures[i].SignDate.slice(0, 10)} ${this.signatures[i].SignDate.slice(11)} UTC`);
//     //     this.signatures[i].SignDate = this.shareService.dateTime2String(date);
//     //   }
//     // });
//   }

//   /**
//    *清除查詢資料
//    */
//   public onClickCleanBtn(): void {
//     this.statementType = '';
//     this.statementVersion = '';
//     this.account = '';
//     this.startDate = { year: 0, month: 0, day: 0 };
//     this.endDate = { year: 0, month: 0, day: 0 };
//     this.order = { Sort: '', Direction: 2 };
//     this.effectiveForm.enable();
//     this.noData = false;
//     this.signatures = [];
//   }

//   /**
//    *匯出報表-先取得報表資料
//    */
//   public onClickExportExcelBtn(): void {
//     this.allIdList.Id.forEach(id => {
//       this.signatureDataExcel.set(id, {
//         Version: '',
//         StatementType_Id: 0,
//         Account: '',
//         SignDate: '',
//         StartTime: ''
//       })
//     })
//     let batch = [];
//     for (let i = 0; i < this.allIdList.Id.length; i += 50) {
//       batch.push(this.allIdList.Id.slice(i, i + 50));
//     }
//     for (let i = 0; i < batch.length; i++) {
//       this.batchList.Id = batch[i];
//       this.signatureInfoService.getSignatureOverview().subscribe(res => {
//         this.signaturesExcel = res;
//         for (let i = 0; i < this.signaturesExcel.length; i++) {
//           const date = new Date(`${this.signaturesExcel[i].SignDate.slice(0, 10)} ${this.signaturesExcel[i].SignDate.slice(11)} UTC`);
//           this.signaturesExcel[i].SignDate = this.shareService.dateTime2String(date);
//           this.signatureDataExcel.set(this.signaturesExcel[i].Id, {
//             Version: this.signaturesExcel[i].Version,
//             StatementType_Id: this.signaturesExcel[i].StatementType_Id,
//             Account: this.signaturesExcel[i].Account,
//             SignDate: this.signaturesExcel[i].SignDate,
//             StartTime: this.signaturesExcel[i].StartTime
//           })
//         }
//         if (i === (batch.length - 1)) {
//           this.getExcel();
//         }
//       });
//       // this.signatureInfoService.getSignatureOverview(this.batchList).subscribe(res => {
//       //   this.signaturesExcel = res;
//       //   for (let i = 0; i < this.signaturesExcel.length; i++) {
//       //     const date = new Date(`${this.signaturesExcel[i].SignDate.slice(0, 10)} ${this.signaturesExcel[i].SignDate.slice(11)} UTC`);
//       //     this.signaturesExcel[i].SignDate = this.shareService.dateTime2String(date);
//       //     this.signatureDataExcel.set(this.signaturesExcel[i].Id, {
//       //       Version: this.signaturesExcel[i].Version,
//       //       StatementType_Id: this.signaturesExcel[i].StatementType_Id,
//       //       Account: this.signaturesExcel[i].Account,
//       //       SignDate: this.signaturesExcel[i].SignDate
//       //     })
//       //   }
//       //   if (i === (batch.length - 1)) {
//       //     this.getExcel();
//       //   }
//       // });
//     }
//   }

//   /**
//    *匯出報表
//    */
//   private getExcel() {
//     let twoDArray = [];
//     twoDArray.push(['帳號', '類別', '版號', '開始時間', '簽核時間']);
//     this.signatureDataExcel.forEach(value => {
//       const statementName = `${this.findStatementName(value.StatementType_Id, 0)}(${this.findStatementName(value.StatementType_Id, 1)})`
//       twoDArray.push([value.Account, statementName, value.Version,value.StartTime, value.SignDate]);
//     });
//     const date = new Date();
//     const now = `${date.getFullYear().toString()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
//     const fileName = `${twoDArray[1][1]}_${twoDArray[1][2]}_${now}.xlsx`
//     const wsCh: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(twoDArray);
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, wsCh, '帳號通行紀錄');
//     XLSX.writeFile(wb, fileName);
//   }

//   /**
//    *進行排序
//    */
//   public onClickSortBtn(sort: string, direction: number) {
//     switch (direction) {
//       case 0:
//         this.order = { Sort: sort, Direction: 0 };
//         break;
//       case 1:
//         this.order = { Sort: sort, Direction: 1 };
//         break;
//     }
//     this.onClickSearchBtn();
//   }

//   /**
//    *取得Statement名稱
//    */
//   public findStatementName(id: number, language: number): string {
//     let name: string = '';
//     switch (language) {
//       case 0:
//         name = this.shareService.findTypeName<StatementType>(this.statementTypes, id, 'Name_CH');
//         break;
//       case 1:
//         name = this.shareService.findTypeName<StatementType>(this.statementTypes, id, 'Name_EN');
//         break;
//     }
//     return name;
//   }
// }
