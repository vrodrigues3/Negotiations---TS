import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MessageView } from '../views/message-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView', true)
    private messageView = new MessageView('#mensagemView')


    constructor() {
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes)
    }

   public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        )
        if(!this.ehDiaUtil(negociacao.data)){
            this.messageView.update('Apenas negociações em dias úteis são aceitas')
            return
        }
        this.negociacoes.adiciona(negociacao);
        this.atualizaView()
        this.limparFormulario();
        
    }

    private ehDiaUtil(date: Date) {
        return date.getDay() > DiasDaSemana.DOMINGO && date.getDay() < DiasDaSemana.SABADO
    }



    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes)
        this.messageView.update('Negociação adicionada com sucesso!')

    }
}
