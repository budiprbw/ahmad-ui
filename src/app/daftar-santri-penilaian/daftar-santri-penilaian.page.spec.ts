import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DaftarSantriPenilaianPage } from './daftar-santri-penilaian.page';

describe('DaftarSantriPenilaianPage', () => {
  let component: DaftarSantriPenilaianPage;
  let fixture: ComponentFixture<DaftarSantriPenilaianPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarSantriPenilaianPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DaftarSantriPenilaianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
