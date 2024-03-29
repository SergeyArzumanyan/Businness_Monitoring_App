import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { IClient, IClientForm } from "@Core/interfaces";
import { onlyWhiteSpaceValidator } from "@Core/validators";
import { SendingDataService, TitleService } from "@Core/services";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {

  public addClientForm: FormGroup<IClientForm> = new FormGroup<IClientForm>({
    ID: new FormControl(null),
    Name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      onlyWhiteSpaceValidator()
    ]),
    Surname: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
      onlyWhiteSpaceValidator()
    ]),
    PhoneNumber: new FormControl(null, [
      Validators.required,
    ]),
    UsualAddress: new FormControl(null,[
      Validators.required,
      onlyWhiteSpaceValidator(),
      Validators.maxLength(25)
    ]),
    Orders: new FormControl({
      Entities: [],
      Count: 0
    })
  });

  constructor(
    private Send: SendingDataService,
    private titleService: TitleService,
    public translateService: TranslateService
    ) {
    this.titleService.setTitle(this.translateService.instant('Add'), this.translateService.instant('Client'));
  }

  public onAdd(): void {
    if (this.addClientForm.valid) {
      this.addClientForm.controls.ID.setValue(+(new Date()));
      this.Send.CreateItem<IClient>('clients', 'Client', this.addClientForm.value);
      this.addClientForm.reset();
    } else {
      this.addClientForm.markAllAsTouched();
    }
  }

}
