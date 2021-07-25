import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPembayaranDonasiPage } from './view-pembayaran-donasi.page';

describe('ViewPembayaranDonasiPage', () => {
  let component: ViewPembayaranDonasiPage;
  let fixture: ComponentFixture<ViewPembayaranDonasiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPembayaranDonasiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPembayaranDonasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
