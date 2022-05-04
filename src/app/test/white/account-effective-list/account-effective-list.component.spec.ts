import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEffectiveListComponent } from './account-effective-list.component';

describe('AccountEffectiveListComponent', () => {
  let component: AccountEffectiveListComponent;
  let fixture: ComponentFixture<AccountEffectiveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountEffectiveListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEffectiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
