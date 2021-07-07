import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaketPembelajaranPage } from './paket-pembelajaran.page';

describe('PaketPembelajaranPage', () => {
  let component: PaketPembelajaranPage;
  let fixture: ComponentFixture<PaketPembelajaranPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaketPembelajaranPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaketPembelajaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
