/* ==========================================================================
   REDE PRIMEIROS ANOS — CONFIGURAÇÃO DO SITE
   Edite SOMENTE este arquivo para: Instagram, contato da Rede, vídeos,
   Bebêminhada e a lista de membros (diretório).
   Nenhum telefone ou texto operacional fica "chumbado" no HTML.
   ========================================================================== */
window.REDE_CONFIG = {
  marca: {
    nome: 'Rede Primeiros Anos',
    /* Instagram próprio da Rede (@redeprimeirosanos, a criar). Vazio = o link do rodapé não aparece. */
    instagram: '',
    instagramUsuario: '@redeprimeirosanos',
    primeiraInfanciaUrl: 'primeira-infancia.html',
    /* site da Bebêminhada Solidária (seção Ações da Rede). Vazio = o botão não aparece. */
    bebeminhadaUrl: 'https://bebeminhada.desenvolvi.site'
  },

  /* Abertura em vídeo: a Rede abre sem vídeo por enquanto (decisão de 18/11/2026); um vídeo próprio fica para depois.
     Para usar no futuro: volte o bloco <div class="abertura"> ao index.html e preencha "video" e ativo: true. */
  intro: {
    ativo: false, video: '', final: 'video', som: true, avisoSom: 'Toque para ouvir',
    reabrir: false, textoAssistir: 'Assistir ao vídeo em tela cheia', textoFechar: 'Fechar vídeo'
  },

  /* Fotos opcionais. Coloque os arquivos em assets/img/fotos/ e preencha o caminho em "src". Vazio = o espaço não aparece. */
  fotos: {
    primeiraInfancia: { src: '', alt: 'Bebê explorando brinquedos sensoriais' }
  },

  /* Vídeos (YouTube). Troque o "id" para trocar o vídeo. */
  videos: {
    primeiraInfancia: { id: 'ttJtRokJJIk', titulo: 'O que é Primeira Infância?', canal: 'Fundação Maria Cecilia Souto Vidigal' }
  },

  /* Mensagem pré-preenchida do WhatsApp do botão "Quero fazer parte" */
  mensagens: {
    parceiro: 'Olá! Sou profissional e quero conhecer a Rede Primeiros Anos para fazer parte.'
  },

  /* Contato da Rede para profissionais (seção "Faça parte"). WhatsApp com DDI+DDD, só números. */
  contatoRede: { telefone: '5512992009404' },

  /* A Rede não tem unidades, equipe de atendimento nem depoimentos de famílias (isso é da DesenvolVi).
     As listas ficam vazias; "cidades" pode voltar como "onde a Rede está" quando houver membros nas cidades. */
  cidades: [],
  equipe: [],
  depoimentos: [],

  /* Diretório de membros: montado depois das conversas com os profissionais. Vazio = a lista não aparece.
     Exemplo: { nome: 'Nome do profissional ou serviço', url: 'https://...' }
     Lista que estava no site até 25/11/2026, para referência: Mamãe Dynamo, Nutrikids, Casullo Saúde,
     Amo Vacinas SJC, Clínica Exclusivitè, Nana Neném, Somos Luanda. */
  parceiros: []
};
