import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JadualPembayaranDonasiPage } from './jadual-pembayaran-donasi.page';

describe('JadualPembayaranDonasiPage', () => {
  let component: JadualPembayaranDonasiPage;
  let fixture: ComponentFixture<JadualPembayaranDonasiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JadualPembayaranDonasiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JadualPembayaranDonasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
