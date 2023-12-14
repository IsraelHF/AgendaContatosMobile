import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Contato from 'src/app/model/entities/Contato';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  nome: string;
  telefone: number;
  contato: Contato;
  indice: number;
  edicao: boolean = true;
  public imagem: any;
  public user: any;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private authService: AuthService
  ) {
    this.user = this.authService.getUserLogged(); // recupera o usuário logado
  }

  ngOnInit() {
    this.contato = history.state.contato;
    this.nome = this.contato.nome;
    this.telefone = this.contato.telefone;
  }

  habilitar() {
    if (this.edicao) {
      this.edicao = false;
    } else {
      this.edicao = true;
    }
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  editar() {
    let novo: Contato = new Contato(this.nome, this.telefone);
    novo.id = this.contato.id;
    novo.uid = this.user.uid; // adiciona o uid do usuário logado
    if (this.imagem) {
      this.firebase.uploadImage(this.imagem, novo);
    } else {
      this.firebase.update(novo, this.contato.id);
    }

    this.router.navigate(['/home']);
  }

  excluir() {
    this.firebase.delete(this.contato);
    this.router.navigate(['/home']);
  }
}
