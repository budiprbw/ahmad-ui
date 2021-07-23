import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCaraPilihSantriPage } from './modal-cara-pilih-santri.page';

describe('ModalCaraPilihSantriPage', () => {
  let component: ModalCaraPilihSantriPage;
  let fixture: ComponentFixture<ModalCaraPilihSantriPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCaraPilihSantriPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCaraPilihSantriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
