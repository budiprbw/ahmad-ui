import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardSantriPage } from './dashboard-santri.page';

describe('DashboardSantriPage', () => {
  let component: DashboardSantriPage;
  let fixture: ComponentFixture<DashboardSantriPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSantriPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      //imports: [IonicModule.forRoot()]
    }).compileComponents();

    // fixture = TestBed.createComponent(DashboardSantriPage);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSantriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
