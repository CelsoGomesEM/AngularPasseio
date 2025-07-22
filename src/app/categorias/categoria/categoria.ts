import { Component, destroyPlatform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // representa um agrupamento de campos representa os dados de um formulario se eu tiver 2 forms dois form group
import { CategoriaService } from '../categoria-service';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss'
})
export class Categoria {

  public camposForm: FormGroup;

  constructor(private service: CategoriaService){
    this.camposForm = new FormGroup({
        nome: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required)
    });
  }

  public salvar(){

    this.camposForm.markAllAsTouched();

    if(this.camposForm.valid){
        this.service.salvar(this.camposForm.value).subscribe({
          next: categoria => {
            console.log('Salvo com sucesso', categoria),
            this.camposForm.reset();
          },
          error: erro => console.log('Ocorreu algum erro na operação:', erro)
        });
    }
   
  }

  public isCampoInvalido(nomeCampo: string) : boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.touched && campo?.errors?.['required']
  }
}
