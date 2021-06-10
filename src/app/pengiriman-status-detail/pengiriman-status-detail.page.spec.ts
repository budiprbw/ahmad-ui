import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PengirimanStatusDetailPage } from './pengiriman-status-detail.page';

describe('PengirimanStatusDetailPage', () => {
  let component: PengirimanStatusDetailPage;
  let fixture: ComponentFixture<PengirimanStatusDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PengirimanStatusDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PengirimanStatusDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
