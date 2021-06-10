import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardDonaturPage } from './dashboard-donatur.page';

describe('DashboardDonaturPage', () => {
  let component: DashboardDonaturPage;
  let fixture: ComponentFixture<DashboardDonaturPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDonaturPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      //imports: [IonicModule.forRoot()]
    }).compileComponents();

    // fixture = TestBed.createComponent(DashboardDonaturPage);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDonaturPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
