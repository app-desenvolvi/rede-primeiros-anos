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

  /* "Como cuidar": orientações gerais por parte da casa (rascunho em revisão pelas profissionais da Rede).
     Para editar: troque o texto de "itens". "fontes" aparece abaixo das orientações de cada parte. */
  orientacoes: [
    {
      id: 'terreno', titulo: 'Terreno', fase: 'Da gestação aos 3 meses', cor: '#92D050',
      itens: [
        { tema: 'Pré-natal cedo', texto: 'Comece o pré-natal assim que souber da gravidez, de preferência até a 12ª semana, e faça no mínimo sete consultas, mais uma consulta com o dentista.' },
        { tema: 'Vacinas na gestação', texto: 'Algumas vacinas protegem a mãe e também o bebê depois do nascimento, como a dTpa (a partir da 20ª semana) e a do VSR (a partir da 28ª semana). A equipe de saúde orienta o calendário.' },
        { tema: 'Alimentação na gestação', texto: 'Prefira alimentos frescos e pouco processados, evite os ultraprocessados e beba água filtrada. Ferro e vitaminas são indicados pela equipe de saúde.' },
        { tema: 'Movimento na gestação', texto: 'Com a liberação da equipe, faça de 30 a 60 minutos por dia de atividade leve ou moderada, como caminhada, alongamento e exercícios na água.' },
        { tema: 'Saúde emocional', texto: 'Alegria, medo e insegurança fazem parte da gestação. Se a tristeza for intensa ou não melhorar, procure a equipe de saúde; grupos de gestantes e a doula também são apoio.' },
        { tema: 'Parceria', texto: 'O pré-natal também é do parceiro: acompanhar as consultas e o parto e dividir os cuidados faz diferença.' },
        { tema: 'Conversar com o bebê na barriga', texto: 'Nos últimos três meses da gravidez, o bebê já reconhece a voz dos pais: dá para conversar, cantar e ler para ele antes de nascer.' },
        { tema: 'Sinais de alerta na gestação', texto: 'Sangramento, dor forte na barriga, febre, dor de cabeça forte ou alteração na visão, inchaço repentino ou o bebê se mexendo menos: procure atendimento na hora.' },
        { tema: 'Vínculo', texto: 'Converse, cante e faça carinho no bebê. O toque e o colo criam laços afetivos e ajudam o desenvolvimento emocional e social.' },
        { tema: 'Contato pele a pele', texto: 'Pratique o contato pele a pele sempre que puder nos primeiros dias: o bebê fica mais calmo, mama melhor e os pais ganham confiança nos cuidados.' },
        { tema: 'Choro e colo', texto: 'Chorar é um jeito normal de o bebê se expressar. Bebês não ficam viciados em colo: para se tornar independente, a criança precisa se sentir segura e cuidada.' },
        { tema: 'Amamentação', texto: 'O leite materno tem tudo de que o bebê precisa e ainda protege contra doenças. Até os 6 meses, só leite materno; a amamentação pode seguir até os 2 anos ou mais.' },
        { tema: 'Sono seguro', texto: 'O bebê dorme de barriga para cima, com boca e nariz descobertos, sem travesseiro nem cobertor, num lugar tranquilo e arejado. Nos primeiros meses, o berço pode ficar ao lado da cama dos pais.' },
        { tema: 'Quem cuida também precisa de cuidado', texto: 'O bebê percebe quando quem cuida dele está tranquilo ou agitado. Por isso, a mãe precisa do apoio da família e dos amigos.' },
        { tema: 'Testes do nascimento', texto: 'Nos primeiros dias, o bebê faz os testes do pezinho, do olhinho, da orelhinha e do coraçãozinho. Descobertas cedo, muitas doenças podem ser tratadas com sucesso.' }
      ],
      fontes: [
        { nome: 'Caderneta Brasileira da Gestante, Ministério da Saúde (2026)', url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf' },
        { nome: 'Pré-natal, Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/g/gravidez/pre-natal' },
        { nome: 'Caderneta da Criança, Ministério da Saúde (2025)', url: '' }
      ]
    },
    {
      id: 'alicerce', titulo: 'Alicerce', fase: 'De 3 meses a 2 anos', cor: '#FFC000',
      itens: [
        { tema: 'Afeto', texto: 'Abrace e demonstre carinho: sentir-se amada é a principal condição para a criança se desenvolver bem. Os limites também fazem parte do cuidado, ensinados com clareza, paciência e carinho.' },
        { tema: 'Conversar e responder', texto: 'Converse com o bebê, olhe nos olhos dele e responda aos sons e gestos que ele faz. É assim que ele aprende a se comunicar.' },
        { tema: 'Ler todos os dias', texto: 'Leia para a criança pelo menos dez minutos por dia, mesmo livros só com figuras. A leitura em família fortalece o vínculo e facilita aprender a ler e escrever depois.' },
        { tema: 'Brincar e explorar', texto: 'Brinque junto e deixe o bebê explorar o próprio corpo e os objetos num lugar firme e seguro, no chão. Evite deixá-lo muito tempo sentado sem conseguir sair da posição sozinho.' },
        { tema: 'Rotina', texto: 'Crie aos poucos uma rotina para dormir, comer e brincar. A rotina dá segurança à criança e ajuda o corpo dela a se organizar.' },
        { tema: 'Comida de verdade', texto: 'A partir dos 6 meses, além do leite materno, entra comida de verdade, amassada com o garfo: frutas, legumes, verduras, cereais, feijões, carnes e ovos. Ofereça água; até os 2 anos, nada de açúcar nem de ultraprocessados.' },
        { tema: 'Hora de comer', texto: 'Pode levar de oito a dez tentativas para a criança aceitar um alimento novo. A refeição é um momento de afeto, em família e sem televisão ou celular.' },
        { tema: 'Outras crianças', texto: 'Promova o contato com outras crianças: é convivendo que ela aprende a se relacionar.' },
        { tema: 'Casa segura', texto: 'Quando o bebê começa a se mexer sozinho, os cuidados dobram: produtos de limpeza e remédios fora do alcance, proteção em escadas, janelas e tomadas, e nunca deixar a criança sozinha perto de água.' }
      ],
      fontes: [ { nome: 'Caderneta da Criança, Ministério da Saúde (2025)', url: '' } ]
    },
    {
      id: 'paredes', titulo: 'Paredes', fase: 'De 2 a 6 anos', cor: '#00B0F0',
      itens: [
        { tema: 'Autonomia', texto: 'Deixe a criança fazer sozinha o que já consegue: comer, se vestir, guardar os brinquedos. Ajude só quando ela precisar, valorize o esforço e nunca ridicularize a dificuldade.' },
        { tema: 'Conversar e escutar', texto: 'Converse sempre, responda aos "por quês" de um jeito que ela entenda e escute com atenção as histórias que ela conta. Em vez de corrigir, repita a frase do jeito certo.' },
        { tema: 'Histórias e faz de conta', texto: 'Conte histórias, cante e incentive o faz de conta. Essas brincadeiras desenvolvem a linguagem e a imaginação e ajudam a criança a expressar o que sente.' },
        { tema: 'Movimento', texto: 'Ofereça tempo e espaço seguro para correr, pular, subir e se equilibrar, em praças e parques, sempre com um adulto por perto.' },
        { tema: 'Brincar com outras crianças', texto: 'Brincar com outras crianças ensina a conviver, a dividir e a seguir regras. Perto dos 6 anos, os jogos com regras ajudam a lidar com limites e a cooperar.' },
        { tema: 'Limites com carinho', texto: 'Birras fazem parte do desenvolvimento. Mantenha a calma, não ceda e não grite nem bata; use o "não" só quando for realmente necessário, com firmeza e sem agressividade.' },
        { tema: 'Alimentação em família', texto: 'A base da alimentação são alimentos frescos ou pouco processados, com pouco sal, açúcar e gordura, e sem ultraprocessados. Sempre que possível, coma junto e com a televisão desligada.' },
        { tema: 'Escola', texto: 'A partir dos 4 anos, a matrícula na pré-escola é obrigatória. Participe das reuniões e converse com os professores sobre como apoiar a aprendizagem em casa.' },
        { tema: 'Segurança', texto: 'Mesmo independente, a criança ainda não percebe o perigo: supervisão de um adulto perto da água e da rua, cadeirinha adequada no banco de trás do carro e equipamento de proteção na bicicleta.' }
      ],
      fontes: [ { nome: 'Caderneta da Criança, Ministério da Saúde (2025)', url: '' } ]
    },
    {
      id: 'todas', titulo: 'Em todas as fases', fase: 'Do nascimento aos 6 anos', cor: '#FF5050',
      itens: [
        { tema: 'Consultas', texto: 'Leve a criança às consultas de rotina mesmo quando ela não está doente: na primeira semana, com 1, 2, 4, 6, 9, 12, 18, 24 e 36 meses, e depois uma vez por ano.' },
        { tema: 'Vacinas', texto: 'A vacinação protege a criança de doenças e é gratuita no SUS. O Calendário Nacional de Vacinação está na Caderneta da Criança.' },
        { tema: 'Telas', texto: 'Antes dos 2 anos, nada de telas. Dos 2 aos 5 anos, no máximo 1 hora por dia, com um adulto junto. Em todas as idades, nada de telas nas refeições, e desligar 1 a 2 horas antes de dormir.' },
        { tema: 'O exemplo dos adultos', texto: 'O que mais importa para a criança é a interação com os adultos. Cuide também do tempo que você passa no celular perto dela: o seu exemplo conta.' },
        { tema: 'Sinais de alerta', texto: 'Se a criança não busca interação, não responde quando chamada pelo nome, tem dificuldade para sustentar a cabeça, engatinhar ou andar, ou não alcança os marcos da idade, converse com um profissional. Na maioria das vezes não é nada sério, mas quanto mais cedo se identifica, melhores são os resultados.' },
        { tema: 'Sem violência', texto: 'Não grite nem bata: a criança aprende pelo exemplo. Se suspeitar que uma criança sofre maus-tratos, ligue 100; a ligação é anônima e gratuita.' }
      ],
      fontes: [
        { nome: 'Caderneta da Criança, Ministério da Saúde (2025)', url: '' },
        { nome: '#MenosTelas #MaisSaúde, Sociedade Brasileira de Pediatria (2024)', url: '' }
      ]
    }
  ],

  /* "Boas notícias" (Quem): iniciativas de instituições, governos e entidades. Atualizar pelo menos 1 vez por mês.
     Vazio = a seção não aparece. Exemplo:
     { titulo: 'Título da notícia', resumo: 'Uma ou duas frases.', fonte: 'Nome do veículo', data: '2026-11-20', url: 'https://...' } */
  noticias: [],

  /* Diretório de membros: montado depois das conversas com os profissionais. Vazio = a lista não aparece.
     Exemplo: { nome: 'Nome do profissional ou serviço', url: 'https://...' }
     Lista que estava no site até 25/11/2026, para referência: Mamãe Dynamo, Nutrikids, Casullo Saúde,
     Amo Vacinas SJC, Clínica Exclusivitè, Nana Neném, Somos Luanda. */
  parceiros: []
};
