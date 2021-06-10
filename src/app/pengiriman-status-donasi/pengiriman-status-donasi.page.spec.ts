import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PengirimanStatusDonasiPage } from './pengiriman-status-donasi.page';

describe('PengirimanStatusDonasiPage', () => {
  let component: PengirimanStatusDonasiPage;
  let fixture: ComponentFixture<PengirimanStatusDonasiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PengirimanStatusDonasiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PengirimanStatusDonasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
