import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPendampingPage } from './dashboard-pendamping.page';

describe('DashboardPendampingPage', () => {
  let component: DashboardPendampingPage;
  let fixture: ComponentFixture<DashboardPendampingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPendampingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      //imports: [IonicModule.forRoot()]
    }).compileComponents();

    // fixture = TestBed.createComponent(DashboardPendampingPage);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPendampingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
