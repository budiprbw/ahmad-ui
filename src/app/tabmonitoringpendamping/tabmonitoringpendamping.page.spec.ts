import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabmonitoringpendampingPage } from './tabmonitoringpendamping.page';

describe('TabmonitoringpendampingPage', () => {
  let component: TabmonitoringpendampingPage;
  let fixture: ComponentFixture<TabmonitoringpendampingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabmonitoringpendampingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabmonitoringpendampingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
