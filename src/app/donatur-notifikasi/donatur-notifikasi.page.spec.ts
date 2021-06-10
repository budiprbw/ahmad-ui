import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonaturNotifikasiPage } from './donatur-notifikasi.page';

describe('DonaturNotifikasiPage', () => {
  let component: DonaturNotifikasiPage;
  let fixture: ComponentFixture<DonaturNotifikasiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DonaturNotifikasiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonaturNotifikasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
