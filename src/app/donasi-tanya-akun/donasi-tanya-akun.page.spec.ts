import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonasiTanyaAkunPage } from './donasi-tanya-akun.page';

describe('DonasiTanyaAkunPage', () => {
  let component: DonasiTanyaAkunPage;
  let fixture: ComponentFixture<DonasiTanyaAkunPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DonasiTanyaAkunPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonasiTanyaAkunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
