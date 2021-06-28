import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalKonfirmasiDonasiPage } from './modal-konfirmasi-donasi.page';

describe('ModalKonfirmasiDonasiPage', () => {
  let component: ModalKonfirmasiDonasiPage;
  let fixture: ComponentFixture<ModalKonfirmasiDonasiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalKonfirmasiDonasiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalKonfirmasiDonasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
