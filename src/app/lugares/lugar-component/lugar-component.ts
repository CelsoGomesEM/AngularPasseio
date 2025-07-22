import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria-service';
import { LugarService } from '../lugar-service';

@Component({
  selector: 'app-lugar-component',
  standalone: false,
  templateUrl: './lugar-component.html',
  styleUrl: './lugar-component.scss'
})

export class LugarComponent implements OnInit{

  public camposForm: FormGroup;
  public categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService,
              private service: LugarService
  ){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.categoriaService.listarTodos().subscribe({
      next: listaCategorias => this.categorias = listaCategorias,
      error: erro => {
            throw new Error('Ocorreu alguma exception', erro)
      }
    });
  }

  public salvar(){

    this.camposForm.markAllAsTouched(); // Revelar os campos que tem erro

    if (this.camposForm.valid){
      this.service.salvar(this.camposForm.value).subscribe({
            next: resultado => {
              console.log('Salvo com sucesso', resultado)
              this.camposForm.reset()
            },
            error: erro => {
              throw new Error('Erro encontrado', erro)
            }
      })
    }
  }

  public isCampoInvalido(nomeCampo: string) : boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.touched && campo?.errors?.['required']
  }
}
