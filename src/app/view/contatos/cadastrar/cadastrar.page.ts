import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';

import Contato from 'src/app/model/entities/Contato';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public nome: string;
  public telefone: number;
  public imagem: any;
  public user: any;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.user = this.authService.getUserLogged();
  }

  ngOnInit() {}

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  cadastrar() {
    if (this.nome && this.telefone) {
      let novo: Contato = new Contato(this.nome, this.telefone);
      novo.uid = this.user.uid; // adiciona o uid do usuário logado
      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo);
      } else {
        this.firebase.create(novo);
      }
      this.alertService.presentAlert('Sucesso', 'Contato Salvo!');
      this.router.navigate(['/home']);
    } else {
      this.alertService.presentAlert('Erro', 'Campos Obrigatórios!');
    }
  }
}
