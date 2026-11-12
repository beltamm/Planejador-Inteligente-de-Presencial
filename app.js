/**
 * PIP • Planejador Inteligente Presencial
 * Motor de Cálculo de Dias Úteis, Feriados (Nacionais/Móveis/Estaduais/Municipais) e Exportação
 */

// ============================================================================
// 1. BASE DE ESTADOS, MUNICÍPIOS E FERIADOS
// ============================================================================
const STATES = [
  { uf: 'AC', name: 'Acre', cities: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá'] },
  { uf: 'AL', name: 'Alagoas', cities: ['Maceió', 'Arapiraca', 'Rio Largo', 'Palmeira dos Índios', 'Penedo'] },
  { uf: 'AP', name: 'Amapá', cities: ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque'] },
  { uf: 'AM', name: 'Amazonas', cities: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'] },
  { uf: 'BA', name: 'Bahia', cities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna', 'Juazeiro', 'Ilhéus', 'Lauro de Freitas', 'Barreiras', 'Porto Seguro'] },
  { uf: 'CE', name: 'Ceará', cities: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca'] },
  { uf: 'DF', name: 'Distrito Federal', cities: ['Brasília', 'Taguatinga', 'Águas Claras', 'Gama'] },
  { uf: 'ES', name: 'Espírito Santo', cities: ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Cachoeiro de Itapemirim', 'Linhares', 'Colatina'] },
  { uf: 'GO', name: 'Goiás', cities: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Alto Paraíso de Goiás', 'Cavalcante'] },
  { uf: 'MA', name: 'Maranhão', cities: ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias'] },
  { uf: 'MT', name: 'Mato Grosso', cities: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra'] },
  { uf: 'MS', name: 'Mato Grosso do Sul', cities: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Bonito'] },
  { uf: 'MG', name: 'Minas Gerais', cities: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga', 'Sete Lagoas', 'Divinópolis', 'Poços de Caldas', 'Ouro Preto'] },
  { uf: 'PA', name: 'Pará', cities: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas', 'Castanhal'] },
  { uf: 'PB', name: 'Paraíba', cities: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Cabedelo'] },
  { uf: 'PR', name: 'Paraná', cities: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guarapuava'] },
  { uf: 'PE', name: 'Pernambuco', cities: ['Recife', 'Caruaru', 'Surubim', 'Santa Cruz do Capibaribe', 'Olinda', 'Jaboatão dos Guararapes', 'Paulista', 'Petrolina', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão', 'Igarassu', 'São Lourenço da Mata', 'Abreu e Lima', 'Ipojuca', 'Serra Talhada', 'Araripina', 'Gravatá', 'Carpina', 'Goiana', 'Belo Jardim', 'Arcoverde', 'Toritama', 'Limoeiro'] },
  { uf: 'PI', name: 'Piauí', cities: ['Teresina', 'Parnaíba', 'Picos', 'Floriano'] },
  { uf: 'RJ', name: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Belford Roxo', 'Campos dos Goytacazes', 'São João de Meriti', 'Petrópolis', 'Volta Redonda', 'Macaé', 'Cabo Frio', 'Angra dos Reis', 'Teresópolis', 'Paraty'] },
  { uf: 'RN', name: 'Rio Grande do Norte', cities: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Caicó'] },
  { uf: 'RS', name: 'Rio Grande do Sul', cities: ['Porto Alegre', 'Caxias do Sul', 'Canoas', 'Pelotas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande', 'Passo Fundo', 'Gramado'] },
  { uf: 'RO', name: 'Rondônia', cities: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal'] },
  { uf: 'RR', name: 'Roraima', cities: ['Boa Vista', 'Rorainópolis'] },
  { uf: 'SC', name: 'Santa Catarina', cities: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Chapecó', 'Itajaí', 'Criciúma', 'Jaraguá do Sul', 'Palhoça', 'Lages', 'Balneário Camboriú'] },
  { uf: 'SP', name: 'São Paulo', cities: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'São José dos Campos', 'Santo André', 'Ribeirão Preto', 'Osasco', 'Sorocaba', 'Mauá', 'São José do Rio Preto', 'Mogi das Cruzes', 'Santos', 'Diadema', 'Jundiaí', 'Piracicaba', 'Carapicuíba', 'Bauru', 'Itaquaquecetuba', 'São Vicente', 'Franca', 'Barueri', 'Taubaté', 'Praia Grande'] },
  { uf: 'SE', name: 'Sergipe', cities: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana'] },
  { uf: 'TO', name: 'Tocantins', cities: ['Palmas', 'Araguaína', 'Gurupi'] }
];

const NATIONAL_FIXED = {
  '01-01': 'Confraternização Universal',
  '04-21': 'Tiradentes',
  '05-01': 'Dia do Trabalho',
  '09-07': 'Independência do Brasil',
  '10-12': 'N. Sra. Aparecida',
  '11-02': 'Finados',
  '11-15': 'Proclamação da República',
  '11-20': 'Consciência Negra',
  '12-25': 'Natal'
};

const STATE_HOLIDAYS = {
  'AC': { '01-23': 'Dia do Evangélico', '06-15': 'Aniversário do Acre', '09-05': 'Dia da Amazônia', '11-17': 'Tratado de Petrópolis' },
  'AL': { '06-24': 'São João', '06-29': 'São Pedro', '09-16': 'Emancipação de Alagoas' },
  'AP': { '03-19': 'São José', '07-25': 'São Tiago', '09-13': 'Criação do Ex-Território' },
  'AM': { '09-05': 'Elevação do Amazonas', '12-08': 'N. Sra. da Conceição' },
  'BA': { '07-02': 'Independência da Bahia' },
  'CE': { '03-19': 'São José', '03-25': 'Data Magna do Ceará' },
  'DF': { '04-21': 'Fundação de Brasília', '11-30': 'Dia do Evangélico' },
  'ES': { '05-23': 'Colonização do Solo Espírito-Santense' },
  'GO': { '07-26': 'Fundação da Cidade de Goiás', '10-24': 'Pedra Fundamental de Goiânia' },
  'MA': { '07-28': 'Adesão do Maranhão à Independência' },
  'MT': { '11-20': 'Consciência Negra' },
  'MS': { '10-11': 'Criação do Estado (MS)' },
  'MG': { '04-21': 'Data Magna de MG' },
  'PA': { '08-15': 'Adesão do Pará à Independência' },
  'PB': { '08-05': 'Fundação do Estado da Paraíba' },
  'PR': { '12-19': 'Emancipação do Paraná' },
  'PE': { '03-06': 'Data Magna de PE', '06-24': 'São João' },
  'PI': { '10-19': 'Dia do Piauí' },
  'RJ': { '04-23': 'Dia de São Jorge' },
  'RN': { '08-07': 'Dia do RN', '10-03': 'Mártires de Cunhaú e Uruaçu' },
  'RS': { '09-20': 'Revolução Farroupilha' },
  'RO': { '01-04': 'Criação do Estado (RO)', '06-18': 'Dia do Evangélico' },
  'RR': { '10-05': 'Criação do Estado (RR)' },
  'SC': { '08-11': 'Criação da Capitania (SC)' },
  'SP': { '07-09': 'Revolução Constitucionalista' },
  'SE': { '07-08': 'Autonomia Política de Sergipe' },
  'TO': { '03-18': 'Autonomia do Tocantins', '09-08': 'N. Sra. da Natividade', '10-05': 'Criação do Tocantins' }
};

const MUNICIPAL_HOLIDAYS = {
  'PE:Recife': { '07-16': 'N. Sra. do Carmo', '12-08': 'N. Sra. da Conceição' },
  'PE:Olinda': { '03-12': 'Aniversário de Olinda', '08-06': 'São Salvador do Mundo', '12-08': 'N. Sra. da Conceição' },
  'PE:Jaboatão dos Guararapes': { '01-15': 'Santo Amaro', '05-04': 'Fundação de Jaboatão' },
  'PE:Paulista': { '09-04': 'Emancipação de Paulista', '12-08': 'N. Sra. da Conceição' },
  'PE:Caruaru': { '05-18': 'Aniversário de Caruaru', '06-29': 'São Pedro', '09-15': 'N. Sra. das Dores' },
  'PE:Surubim': { '03-19': 'São José', '09-11': 'Emancipação de Surubim' },
  'PE:Santa Cruz do Capibaribe': { '05-29': 'Emancipação Política', '09-29': 'São Miguel / Bom Jesus' },
  'PE:Toritama': { '12-08': 'N. Sra. da Conceição', '12-29': 'Emancipação de Toritama' },
  'PE:Petrolina': { '08-15': 'N. Sra. Rainha dos Anjos', '09-21': 'Emancipação de Petrolina' },
  'PE:Garanhuns': { '02-04': 'Aniversário de Garanhuns', '06-13': 'Santo Antônio' },
  'PE:Cabo de Santo Agostinho': { '06-13': 'Santo Antônio', '07-09': 'Aniversário do Cabo' },
  'PE:Camaragibe': { '05-13': 'Emancipação de Camaragibe', '06-24': 'São João Batista' },
  'PE:Vitória de Santo Antão': { '01-17': 'Santo Antão', '05-06': 'Elevação a Cidade', '08-03': 'Batalha das Tabocas' },
  'PE:Igarassu': { '09-27': 'Santos Cosme e Damião' },
  'SP:São Paulo': { '01-25': 'Aniversário de SP' },
  'SP:Guarulhos': { '12-08': 'Aniversário de Guarulhos / Imaculada' },
  'SP:Campinas': { '07-14': 'Aniversário de Campinas', '12-08': 'N. Sra. da Conceição' },
  'SP:Santos': { '01-26': 'Aniversário de Santos', '09-08': 'N. Sra. do Monte Serrat' },
  'SP:São Bernardo do Campo': { '08-20': 'Aniversário de SBC' },
  'SP:Santo André': { '04-08': 'Aniversário de Santo André' },
  'SP:São José dos Campos': { '03-19': 'São José', '07-27': 'Aniversário de SJC' },
  'SP:Ribeirão Preto': { '01-20': 'São Sebastião', '06-19': 'Aniversário de Ribeirão' },
  'SP:Sorocaba': { '08-15': 'Aniversário de Sorocaba' },
  'SP:Osasco': { '02-19': 'Emancipação de Osasco', '06-13': 'Santo Antônio' },
  'SP:Barueri': { '03-26': 'Aniversário de Barueri', '06-24': 'São João Batista' },
  'RJ:Rio de Janeiro': { '01-20': 'São Sebastião', '03-01': 'Aniversário do Rio' },
  'RJ:Niterói': { '06-24': 'São João', '11-22': 'Aniversário de Niterói' },
  'RJ:São Gonçalo': { '01-10': 'São Gonçalo', '09-22': 'Emancipação de São Gonçalo' },
  'RJ:Duque de Caxias': { '06-13': 'Santo Antônio', '08-25': 'Dia do Soldado / Caxias' },
  'RJ:Nova Iguaçu': { '01-15': 'Aniversário de Nova Iguaçu', '06-13': 'Santo Antônio' },
  'RJ:Petrópolis': { '03-16': 'Fundação de Petrópolis', '06-29': 'Chegada dos Colonos' },
  'MG:Belo Horizonte': { '08-15': 'N. Sra. da Boa Viagem', '12-12': 'Aniversário de BH' },
  'MG:Uberlândia': { '08-15': 'N. Sra. da Abadia', '08-31': 'Aniversário de Uberlândia' },
  'MG:Contagem': { '08-30': 'Emancipação de Contagem', '10-15': 'Jubileu de N. Sra. das Dores' },
  'MG:Juiz de Fora': { '05-31': 'Aniversário de Juiz de Fora', '06-13': 'Santo Antônio' },
  'MG:Betim': { '07-16': 'N. Sra. do Carmo', '12-17': 'Aniversário de Betim' },
  'MG:Ouro Preto': { '07-08': 'Aniversário de Ouro Preto', '08-16': 'N. Sra. do Pilar', '12-08': 'N. Sra. da Conceição' },
  'BA:Salvador': { '06-24': 'São João', '12-08': 'N. Sra. da Conceição da Praia' },
  'BA:Feira de Santana': { '06-24': 'São João', '07-26': 'Senhora Sant\'Ana' },
  'BA:Vitória da Conquista': { '08-15': 'N. Sra. das Vitórias', '11-09': 'Aniversário de Conquista' },
  'BA:Camaçari': { '01-07': 'São Thomaz de Cantuária', '09-28': 'Emancipação de Camaçari' },
  'CE:Fortaleza': { '04-13': 'Aniversário de Fortaleza', '08-15': 'N. Sra. da Assunção' },
  'CE:Juazeiro do Norte': { '07-22': 'Aniversário de Juazeiro', '09-15': 'N. Sra. das Dores' },
  'PR:Curitiba': { '09-08': 'N. Sra. da Luz dos Pinhais' },
  'PR:Londrina': { '06-12': 'Sagrado Coração de Jesus', '12-10': 'Aniversário de Londrina' },
  'PR:Maringá': { '05-10': 'Aniversário de Maringá', '08-15': 'N. Sra. da Glória' },
  'PR:Foz do Iguaçu': { '06-10': 'Aniversário de Foz', '06-24': 'São João Batista' },
  'RS:Porto Alegre': { '02-02': 'N. Sra. dos Navegantes' },
  'RS:Caxias do Sul': { '05-26': 'N. Sra. de Caravaggio' },
  'SC:Florianópolis': { '03-23': 'Aniversário de Florianópolis' },
  'SC:Joinville': { '03-09': 'Aniversário de Joinville' },
  'SC:Blumenau': { '09-02': 'Fundação de Blumenau' },
  'GO:Goiânia': { '05-24': 'N. Sra. Auxiliadora', '10-24': 'Aniversário de Goiânia' },
  'PA:Belém': { '01-12': 'Aniversário de Belém', '12-08': 'N. Sra. da Conceição' },
  'AM:Manaus': { '10-24': 'Aniversário de Manaus', '12-08': 'N. Sra. da Conceição' },
  'MA:São Luís': { '06-29': 'São Pedro', '09-08': 'Natividade de N. Sra.' },
  'PB:João Pessoa': { '06-24': 'São João', '08-05': 'N. Sra. das Neves', '12-08': 'N. Sra. da Conceição' },
  'PB:Campina Grande': { '06-24': 'São João', '10-11': 'Aniversário de Campina Grande', '12-08': 'N. Sra. da Conceição' },
  'RN:Natal': { '01-06': 'Santos Reis', '11-21': 'N. Sra. da Apresentação' },
  'AL:Maceió': { '06-24': 'São João', '08-27': 'N. Sra. dos Prazeres', '12-05': 'Aniversário de Maceió', '12-08': 'N. Sra. da Conceição' },
  'SE:Aracaju': { '03-17': 'Aniversário de Aracaju', '06-24': 'São João', '12-08': 'N. Sra. da Conceição' },
  'PI:Teresina': { '08-16': 'Aniversário de Teresina', '12-08': 'N. Sra. da Conceição' },
  'ES:Vitória': { '09-08': 'N. Sra. da Vitória / Aniversário' },
  'ES:Vila Velha': { '05-23': 'Colonização do Solo / Aniversário' },
  'MT:Cuiabá': { '04-08': 'Aniversário de Cuiabá', '12-08': 'N. Sra. da Conceição' },
  'MS:Campo Grande': { '06-13': 'Santo Antônio', '08-26': 'Aniversário de Campo Grande' },
  'AC:Rio Branco': { '12-28': 'Aniversário de Rio Branco' },
  'RO:Porto Velho': { '01-24': 'São Francisco de Sales', '10-02': 'Criação do Município' },
  'RR:Boa Vista': { '06-29': 'São Pedro', '07-09': 'Aniversário de Boa Vista' },
  'AP:Macapá': { '02-04': 'Aniversário de Macapá', '03-19': 'São José' },
  'TO:Palmas': { '03-19': 'São José', '05-20': 'Aniversário de Palmas' }
];

function getMovableHolidays(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  const easter = new Date(year, month, day);
  const addDays = (base, delta) => {
    const dt = new Date(base);
    dt.setDate(dt.getDate() + delta);
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    return `${mm}-${dd}`;
  };

  return {
    [addDays(easter, -48)]: 'Segunda de Carnaval',
    [addDays(easter, -47)]: 'Terça de Carnaval',
    [addDays(easter, -2)]: 'Sexta-feira Santa',
    [addDays(easter, 60)]: 'Corpus Christi'
  };
}

function getAllHolidaysMap(year, uf, city) {
  const movable = getMovableHolidays(year);
  const stateH = STATE_HOLIDAYS[uf] || {};
  const muniH = MUNICIPAL_HOLIDAYS[`${uf}:${city}`] || {};
  return { ...NATIONAL_FIXED, ...movable, ...stateH, ...muniH };
}

// ============================================================================
// 2. ESTADO GLOBAL E INICIALIZAÇÃO
// ============================================================================
const STORAGE_KEY = 'pip_planejador_pro_v4';
const ibgeCache = {};

const store = {
  step: 1,
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  uf: 'PE',
  city: 'Recife',
  mode: 'pct',
  valPct: 40,
  valWk: 2,
  favs: [2, 4],
  alreadyWent: 0,
  activeBrush: 'office',
  days: {}
};

const WEEKEND_JOKES = [
  "Sábado ou Domingo?! Calma aí, o prêmio de funcionário do mês não paga terapia! ☕🦖",
  "Trabalhar presencial no fim de semana? Alguém avisa o RH que temos um infiltrado! 🚨",
  "Fim de semana selecionado! Nem o chefe vai estar lá pra ver essa sua dedicação toda, visse?",
  "Modo Workaholic Extremo ativado! Cuidado pra não trancarem você no prédio com o segurança. 👀"
];

document.addEventListener('DOMContentLoaded', () => {
  loadFromStorageOrUrl();
  populateStatesSync();
  populateCitiesSync(store.uf, store.city);
  syncStep1Inputs();
  renderFavButtons();
  setBrush('office');
  updateHolidaysPreview();

  fetchIbgeCitiesInBackground(store.uf, store.city);

  document.getElementById('selectMonth').onchange = (e) => {
    store.month = Number(e.target.value);
    updateHolidaysPreview();
    saveState();
  };

  document.getElementById('selectYear').onchange = (e) => {
    store.year = Number(e.target.value);
    updateHolidaysPreview();
    saveState();
  };

  document.getElementById('selectUf').onchange = (e) => {
    store.uf = e.target.value;
    populateCitiesSync(store.uf);
    updateHolidaysPreview();
    saveState();
    fetchIbgeCitiesInBackground(store.uf, store.city);
  };

  document.getElementById('selectCity').onchange = (e) => {
    store.city = e.target.value;
    updateHolidaysPreview();
    saveState();
  };

  document.getElementById('btnModePct').onclick = () => {
    store.mode = 'pct';
    syncStep1Inputs();
    saveState();
  };
  document.getElementById('btnModeWk').onclick = () => {
    store.mode = 'wk';
    syncStep1Inputs();
    saveState();
  };

  const rangePct = document.getElementById('rangePct');
  const numPct = document.getElementById('numPct');
  rangePct.oninput = (e) => {
    store.valPct = Number(e.target.value);
    numPct.value = store.valPct;
    saveState();
  };
  numPct.oninput = (e) => {
    let val = Math.min(100, Math.max(1, Number(e.target.value) || 1));
    store.valPct = val;
    rangePct.value = val;
    saveState();
  };

  const rangeWk = document.getElementById('rangeWk');
  const numWk = document.getElementById('numWk');
  rangeWk.oninput = (e) => {
    store.valWk = Number(e.target.value);
    numWk.value = store.valWk;
    saveState();
  };
  numWk.oninput = (e) => {
    let val = Math.min(7, Math.max(1, Number(e.target.value) || 1));
    store.valWk = val;
    rangeWk.value = val;
    saveState();
  };

  document.getElementById('inputAlreadyWent').oninput = (e) => {
    store.alreadyWent = Math.max(0, Math.min(31, Number(e.target.value) || 0));
    updateStep2Preview();
    saveState();
  };

  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.onclick = () => {
      const dow = Number(btn.dataset.dow);
      const idx = store.favs.indexOf(dow);
      if (idx > -1) {
        store.favs.splice(idx, 1);
      } else {
        store.favs.push(dow);
        if (dow === 0 || dow === 6) triggerHumorToast();
      }
      renderFavButtons();
      saveState();
    };
  });

  document.getElementById('btnNext1').onclick = () => goToStep(2);
  document.getElementById('btnBack2').onclick = () => goToStep(1);
  document.getElementById('btnNext2').onclick = () => {
    applySmartSuggestion();
    goToStep(3);
  };
  document.getElementById('btnBack3').onclick = () => goToStep(2);

  document.querySelectorAll('.step-nav').forEach(btn => {
    btn.onclick = () => {
      const target = Number(btn.dataset.goto);
      if (target === 3 && Object.keys(store.days).length === 0) applySmartSuggestion();
      goToStep(target);
    };
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
      e.preventDefault();
      if (store.step === 1) goToStep(2);
      else if (store.step === 2) { applySmartSuggestion(); goToStep(3); }
    }
  });

  document.querySelectorAll('.brush-btn').forEach(btn => {
    btn.onclick = () => setBrush(btn.dataset.brush);
  });

  document.getElementById('btnPrevMonth').onclick = () => {
    store.month--;
    if (store.month < 0) { store.month = 11; store.year--; }
    syncStep1Inputs();
    updateHolidaysPreview();
    applySmartSuggestion();
    renderCalendar();
  };

  document.getElementById('btnNextMonth').onclick = () => {
    store.month++;
    if (store.month > 11) { store.month = 0; store.year++; }
    syncStep1Inputs();
    updateHolidaysPreview();
    applySmartSuggestion();
    renderCalendar();
  };

  document.getElementById('btnAutoFill').onclick = () => {
    applySmartSuggestion(true);
    renderCalendar();
  };

  document.getElementById('btnClearMonth').onclick = () => {
    clearCurrentMonth();
    renderCalendar();
  };

  document.getElementById('btnCopyText').onclick = copySummaryText;
  document.getElementById('btnShareUrl').onclick = copyShareableLink;
  document.getElementById('btnOpenCalModal').onclick = openCalendarModal;
  document.getElementById('btnCloseCalModal').onclick = () => document.getElementById('calendarModal').classList.add('hidden');
  document.getElementById('btnModalDownloadIcs').onclick = downloadIcsFile;
});

// ============================================================================
// 3. POPULAÇÃO SÍNCRONA + IBGE EM SEGUNDO PLANO
// ============================================================================
function populateStatesSync() {
  const sel = document.getElementById('selectUf');
  sel.innerHTML = STATES.map(s => `<option value="${s.uf}" ${s.uf === store.uf ? 'selected' : ''}>${s.name} (${s.uf})</option>`).join('');
}

function populateCitiesSync(uf, preferredCity = null) {
  const sel = document.getElementById('selectCity');
  const stateObj = STATES.find(s => s.uf === uf) || STATES[16];
  const list = ibgeCache[uf] || stateObj.cities;
  const target = (preferredCity && list.includes(preferredCity)) ? preferredCity : list[0];
  store.city = target;
  sel.innerHTML = list.map(c => `<option value="${c}" ${c === target ? 'selected' : ''}>${c}</option>`).join('');
}

function fetchIbgeCitiesInBackground(uf, currentCity) {
  if (ibgeCache[uf]) return;
  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`)
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        ibgeCache[uf] = data.map(c => c.nome);
        if (store.uf === uf) {
          populateCitiesSync(uf, store.city || currentCity);
        }
      }
    })
    .catch(() => {});
}

function syncStep1Inputs() {
  document.getElementById('selectMonth').value = String(store.month);
  document.getElementById('selectYear').value = String(store.year);

  const isPct = store.mode === 'pct';
  document.getElementById('boxPct').classList.toggle('hidden', !isPct);
  document.getElementById('boxWk').classList.toggle('hidden', isPct);

  document.getElementById('btnModePct').className = `mode-tab ${isPct ? 'active' : ''}`;
  document.getElementById('btnModeWk').className = `mode-tab ${!isPct ? 'active' : ''}`;

  document.getElementById('rangePct').value = store.valPct;
  document.getElementById('numPct').value = store.valPct;
  document.getElementById('rangeWk').value = store.valWk;
  document.getElementById('numWk').value = store.valWk;
  document.getElementById('inputAlreadyWent').value = store.alreadyWent;
}

function updateHolidaysPreview() {
  const holidaysMap = getAllHolidaysMap(store.year, store.uf, store.city);
  const daysInMonth = new Date(store.year, store.month + 1, 0).getDate();
  const found = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const mmdd = `${String(store.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    if (holidaysMap[mmdd]) {
      const dow = new Date(store.year, store.month, d).getDay();
      const isWknd = dow === 0 || dow === 6;
      found.push(`${String(d).padStart(2, '0')}/${String(store.month + 1).padStart(2, '0')} (${holidaysMap[mmdd]}${isWknd ? ' - Fim de semana' : ''})`);
    }
  }

  const el = document.getElementById('detectedHolidaysPreview');
  el.textContent = found.length > 0 ? found.join(' • ') : 'Nenhum feriado oficial neste mês.';
}

function renderFavButtons() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const dow = Number(btn.dataset.dow);
    const active = store.favs.includes(dow);
    btn.className = `fav-btn py-3 rounded-xl border text-xs font-semibold transition ${
      active
        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-sm'
        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
    }`;
  });
}

function triggerHumorToast() {
  const toast = document.getElementById('humorToast');
  const txt = document.getElementById('humorText');
  txt.textContent = WEEKEND_JOKES[Math.floor(Math.random() * WEEKEND_JOKES.length)];
  toast.classList.remove('hidden');
  clearTimeout(window._humorTimer);
  window._humorTimer = setTimeout(() => toast.classList.add('hidden'), 4500);
}

function goToStep(stepNum) {
  store.step = stepNum;
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`step${i}`).classList.toggle('active', i === stepNum);
  }
  document.querySelectorAll('.step-nav').forEach(btn => {
    const s = Number(btn.dataset.goto);
    if (s === stepNum) {
      btn.className = "step-nav active-step";
    } else if (s < stepNum) {
      btn.className = "step-nav done-step";
    } else {
      btn.className = "step-nav inactive-step";
    }
  });

  if (stepNum === 2) updateStep2Preview();
  if (stepNum === 3) renderCalendar();
}

function updateStep2Preview() {
  const stats = calculateMonthMetrics();
  const remaining = Math.max(0, stats.requiredDays - store.alreadyWent);
  document.getElementById('previewCalcBadge').textContent = `Meta: ${stats.requiredDays} dias no mês`;
  document.getElementById('previewCalcDesc').textContent =
    `O mês tem ${stats.availableWorkdays} dias úteis (descontando ${stats.deductedDays} feriado(s) em dia de semana). ` +
    (store.alreadyWent > 0 ? `Como você já foi ${store.alreadyWent}d, faltam ${remaining} dia(s) para planejar.` : `Vamos sugerir ${stats.requiredDays} dias presenciais.`);
}

// ============================================================================
// 4. MOTOR DE SUGESTÃO INTELIGENTE E CÁLCULO DE MÉTRICAS
// ============================================================================
function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function clearCurrentMonth() {
  const daysInMonth = new Date(store.year, store.month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    delete store.days[formatDateKey(store.year, store.month, d)];
  }
  saveState();
}

function applySmartSuggestion(forceReset = false) {
  const { year, month, uf, city, favs, alreadyWent } = store;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const holidaysMap = getAllHolidaysMap(year, uf, city);

  if (forceReset) clearCurrentMonth();

  const availableCandidates = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const key = formatDateKey(year, month, d);
    const mmdd = key.slice(5);
    const dow = new Date(year, month, d).getDay();
    const isWeekend = dow === 0 || dow === 6;

    if (holidaysMap[mmdd] && !isWeekend) {
      store.days[key] = 'holiday';
      continue;
    }

    const currentStatus = store.days[key];
    if (currentStatus === 'vacation' || currentStatus === 'holiday') continue;

    if (!isWeekend || favs.includes(dow)) {
      availableCandidates.push({ d, dow, key });
    }
  }

  availableCandidates.forEach(c => {
    if (store.days[c.key] === 'office' || store.days[c.key] === 'done') {
      delete store.days[c.key];
    }
  });

  const stats = calculateMonthMetrics();
  const totalNeeded = stats.requiredDays;

  const favCandidates = availableCandidates.filter(c => favs.includes(c.dow));
  const nonFavCandidates = availableCandidates.filter(c => !favs.includes(c.dow) && c.dow !== 0 && c.dow !== 6);

  const selectedKeys = [];
  for (const item of favCandidates) {
    if (selectedKeys.length < totalNeeded) selectedKeys.push(item.key);
  }
  for (const item of nonFavCandidates) {
    if (selectedKeys.length < totalNeeded) selectedKeys.push(item.key);
  }

  selectedKeys.sort();
  selectedKeys.forEach((key, idx) => {
    store.days[key] = idx < alreadyWent ? 'done' : 'office';
  });

  if (alreadyWent > selectedKeys.length) {
    let extraNeeded = alreadyWent - selectedKeys.length;
    for (const item of availableCandidates) {
      if (extraNeeded <= 0) break;
      if (!store.days[item.key]) {
        store.days[item.key] = 'done';
        extraNeeded--;
      }
    }
  }

  saveState();
}

function calculateMonthMetrics() {
  const { year, month, uf, city, mode, valPct, valWk } = store;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const holidaysMap = getAllHolidaysMap(year, uf, city);

  let totalWeekdays = 0;
  let deductedDays = 0;
  let doneCount = 0;
  let officeCount = 0;

  for (let d = 1; d <= daysInMonth; d++) {
    const key = formatDateKey(year, month, d);
    const mmdd = key.slice(5);
    const dow = new Date(year, month, d).getDay();
    const isWeekend = dow === 0 || dow === 6;
    const status = store.days[key] || (holidaysMap[mmdd] && !isWeekend ? 'holiday' : 'work');

    if (!isWeekend) {
      totalWeekdays++;
      if (status === 'holiday' || status === 'vacation') {
        deductedDays++;
      }
    }

    if (status === 'done') doneCount++;
    if (status === 'office') officeCount++;
  }

  const availableWorkdays = Math.max(0, totalWeekdays - deductedDays);
  const effectivePct = mode === 'pct' ? (valPct / 100) : Math.min(1, valWk / 5);
  const requiredDays = Math.ceil(availableWorkdays * effectivePct);
  const totalPresence = doneCount + officeCount;
  const achievedPct = availableWorkdays > 0 ? Math.round((totalPresence / availableWorkdays) * 100) : 0;
  const missingDays = Math.max(0, requiredDays - totalPresence);
  const extraBank = Math.max(0, totalPresence - requiredDays);

  return {
    totalWeekdays,
    deductedDays,
    availableWorkdays,
    requiredDays,
    doneCount,
    officeCount,
    totalPresence,
    achievedPct,
    missingDays,
    extraBank
  };
}

// ============================================================================
// 5. RENDERIZAÇÃO DO CALENDÁRIO & MODAL MULTI-EVENTOS GOOGLE AGENDA
// ============================================================================
function setBrush(brush) {
  store.activeBrush = brush;
  document.querySelectorAll('.brush-btn').forEach(btn => {
    const b = btn.dataset.brush;
    const isSel = b === brush;
    let style = 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700';
    if (isSel) {
      if (b === 'office') style = 'border-emerald-500 bg-emerald-500/20 text-emerald-200';
      if (b === 'done') style = 'border-blue-500 bg-blue-500/20 text-blue-200';
      if (b === 'vacation') style = 'border-amber-500 bg-amber-500/20 text-amber-200';
      if (b === 'holiday') style = 'border-rose-500 bg-rose-500/20 text-rose-200';
    }
    btn.className = `brush-btn px-2.5 py-1 rounded-lg border text-xs font-medium transition ${style}`;
  });
}

function renderCalendar() {
  const { year, month, uf, city } = store;
  const holidaysMap = getAllHolidaysMap(year, uf, city);
  const monthLabel = new Date(year, month, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  document.getElementById('lblCalTitle').textContent = monthLabel;
  document.getElementById('lblCitySubtitle').textContent = `📍 ${city} (${uf}) • Feriados locais ativos`;

  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';

  const firstDayDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDayDow; i++) {
    const empty = document.createElement('div');
    empty.className = 'h-16 sm:h-20 rounded-xl bg-slate-950/30 border border-slate-800/30';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const key = formatDateKey(year, month, d);
    const mmdd = key.slice(5);
    const dow = new Date(year, month, d).getDay();
    const isWeekend = dow === 0 || dow === 6;
    const holidayName = holidaysMap[mmdd];

    let status = store.days[key];
    if (!status && holidayName && !isWeekend) {
      status = 'holiday';
      store.days[key] = 'holiday';
    }

    const cell = document.createElement('div');
    let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 cursor-pointer';
    let badge = '<span class="text-[10px] text-slate-600">Remoto</span>';

    if (status === 'office') {
      style = 'bg-emerald-950/60 border-emerald-500/70 text-emerald-200 cursor-pointer shadow-sm';
      badge = '<span class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 w-fit">📅 Planejado</span>';
    } else if (status === 'done') {
      style = 'bg-blue-950/60 border-blue-500/70 text-blue-200 cursor-pointer shadow-sm';
      badge = '<span class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 w-fit">✓ Já Fui</span>';
    } else if (status === 'vacation') {
      style = 'bg-amber-950/50 border-amber-500/60 text-amber-200 cursor-pointer';
      badge = '<span class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 w-fit">✈️ Férias</span>';
    } else if (status === 'holiday') {
      style = 'bg-rose-950/50 border-rose-500/60 text-rose-200 cursor-pointer';
      const hTitle = holidayName || 'Feriado Local';
      badge = `<span class="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 truncate max-w-full" title="${hTitle}">🎉 ${hTitle}</span>`;
    } else if (isWeekend) {
      style = 'bg-slate-950/40 border-slate-800/40 text-slate-600 cursor-pointer';
      badge = `<span class="text-[9px] text-slate-600">${holidayName ? '🎉 ' + holidayName : 'Fim de sem.'}</span>`;
    }

    cell.className = `day-cell h-16 sm:h-20 p-2 rounded-xl border flex flex-col justify-between ${style}`;
    cell.innerHTML = `<div class="flex justify-between items-center"><span class="text-xs font-bold">${d}</span></div>${badge}`;

    cell.onclick = () => {
      if (store.days[key] === store.activeBrush) {
        delete store.days[key];
      } else {
        store.days[key] = store.activeBrush;
      }
      if ((dow === 0 || dow === 6) && (store.days[key] === 'office' || store.days[key] === 'done')) {
        triggerHumorToast();
      }
      saveState();
      renderCalendar();
    };

    grid.appendChild(cell);
  }

  const m = calculateMonthMetrics();
  document.getElementById('statWorkdays').textContent = m.availableWorkdays;
  document.getElementById('statDeducted').textContent = `${m.deductedDays} descontado(s)`;
  document.getElementById('statTarget').textContent = m.requiredDays;
  document.getElementById('statTargetPct').textContent = store.mode === 'pct' ? `Meta: ${store.valPct}%` : `Meta: ${store.valWk}x/sem`;
  document.getElementById('statTotal').textContent = m.totalPresence;
  document.getElementById('statBreakdown').textContent = `${m.doneCount} feito(s) / ${m.officeCount} plan.`;
  document.getElementById('statPct').textContent = `${m.achievedPct}%`;
  document.getElementById('statMissing').textContent = m.missingDays === 0 ? 'Meta batida!' : `Faltam ${m.missingDays}d`;
  document.getElementById('statBank').textContent = `+${m.extraBank}d`;
  document.getElementById('statBankSub').textContent = m.extraBank > 0 ? 'Dias acumulados' : 'Sem excedente';

  const statusBadge = document.getElementById('lblStatusBadge');
  if (m.totalPresence >= m.requiredDays && m.requiredDays > 0) {
    statusBadge.textContent = m.extraBank > 0 ? `Meta Superada (+${m.extraBank}d no banco)` : 'Meta Atingida!';
    statusBadge.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
  } else {
    statusBadge.textContent = `Faltam ${m.missingDays} dia(s)`;
    statusBadge.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40';
  }

  const listDates = getSelectedDatesFormatted();
  document.getElementById('lblCountCalBtn').textContent = `${listDates.length} dias`;
  document.getElementById('txtSummaryPreview').textContent = listDates.length > 0
    ? `📅 Presenciais (${listDates.length}d): ${listDates.map(i => i.label).join(', ')}`
    : 'Nenhum dia presencial marcado neste mês.';
}

function getSelectedDatesFormatted() {
  const { year, month } = store;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const result = [];
  const dowNamesShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const rruleCodes = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  for (let d = 1; d <= daysInMonth; d++) {
    const key = formatDateKey(year, month, d);
    const st = store.days[key];
    if (st === 'office' || st === 'done') {
      const dtObj = new Date(year, month, d);
      const dow = dtObj.getDay();
      const dd = String(d).padStart(2, '0');
      const mm = String(month + 1).padStart(2, '0');
      result.push({
        key,
        day: d,
        dow,
        dowName: dowNamesShort[dow],
        rruleCode: rruleCodes[dow],
        status: st,
        label: `${dd}/${mm}${st === 'done' ? '(✓)' : ''}`
      });
    }
  }
  return result;
}

function openCalendarModal() {
  const list = getSelectedDatesFormatted();
  if (list.length === 0) {
    alert('Marque pelo menos um dia presencial no calendário primeiro!');
    return;
  }

  document.getElementById('modalDaysCount').textContent = list.length;

  const uniqueDows = [...new Set(list.map(i => i.dow))];
  const rruleCodes = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const dowNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const byDayStr = uniqueDows.map(d => rruleCodes[d]).join(',');
  const byDayNames = uniqueDows.map(d => dowNames[d]).join(', ');
  document.getElementById('modalRruleDaysDesc').textContent = byDayNames;

  const firstItem = list[0];
  const nextDayObj = new Date(store.year, store.month, firstItem.day + 1);
  const startStr = firstItem.key.replace(/-/g, '');
  const endStr = `${nextDayObj.getFullYear()}${String(nextDayObj.getMonth() + 1).padStart(2, '0')}${String(nextDayObj.getDate()).padStart(2, '0')}`;
  const lastDayMonth = new Date(store.year, store.month + 1, 0).getDate();
  const untilStr = `${store.year}${String(store.month + 1).padStart(2, '0')}${String(lastDayMonth).padStart(2, '0')}T235959Z`;

  const title = encodeURIComponent(`🏢 Presencial (${store.city})`);
  const details = encodeURIComponent(`Escala planejada via PIP (${list.length} dias no mês): ${list.map(i => i.label).join(', ')}`);
  const recur = encodeURIComponent(`RRULE:FREQ=WEEKLY;BYDAY=${byDayStr};UNTIL=${untilStr}`);

  document.getElementById('btnGoogleRecurring').onclick = () => {
    const gUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&recur=${recur}`;
    window.open(gUrl, '_blank');
  };

  const container = document.getElementById('modalIndividualLinks');
  container.innerHTML = '';
  list.forEach(item => {
    const dStart = item.key.replace(/-/g, '');
    const nObj = new Date(store.year, store.month, item.day + 1);
    const dEnd = `${nObj.getFullYear()}${String(nObj.getMonth() + 1).padStart(2, '0')}${String(nObj.getDate()).padStart(2, '0')}`;
    const singleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dStart}/${dEnd}&details=${details}`;

    const a = document.createElement('a');
    a.href = singleUrl;
    a.target = '_blank';
    a.className = 'px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500 text-[11px] font-medium text-slate-200 flex items-center justify-between transition';
    a.innerHTML = `<span>${item.dowName}, ${String(item.day).padStart(2, '0')}/${String(store.month + 1).padStart(2, '0')}</span><span class="text-indigo-400 font-bold">+</span>`;
    a.onclick = () => {
      a.classList.add('border-emerald-500/60', 'text-emerald-300');
      a.querySelector('span:last-child').textContent = '✓';
    };
    container.appendChild(a);
  });

  document.getElementById('calendarModal').classList.remove('hidden');
}

function copySummaryText() {
  const list = getSelectedDatesFormatted();
  const m = calculateMonthMetrics();
  const monthName = new Date(store.year, store.month, 1).toLocaleDateString('pt-BR', { month: 'long' });
  const text = list.length > 0
    ? `📅 Minha escala presencial em ${monthName} (${store.city}-${store.uf}) — ${list.length}/${m.requiredDays} dias (${m.achievedPct}%): ${list.map(i => i.label).join(', ')}`
    : `Nenhum dia presencial planejado para ${monthName}.`;

  navigator.clipboard.writeText(text);
  const btn = document.getElementById('btnCopyText');
  const old = btn.textContent;
  btn.textContent = '✅ Texto Copiado!';
  setTimeout(() => btn.textContent = old, 2000);
}

function copyShareableLink() {
  const payload = {
    year: store.year, month: store.month, uf: store.uf, city: store.city,
    mode: store.mode, valPct: store.valPct, valWk: store.valWk, days: store.days
  };
  const hash = btoa(encodeURIComponent(JSON.stringify(payload)));
  const url = `${window.location.origin}${window.location.pathname}#d=${hash}`;
  navigator.clipboard.writeText(url);

  const btn = document.getElementById('btnShareUrl');
  const old = btn.textContent;
  btn.textContent = '✅ Link Copiado!';
  setTimeout(() => btn.textContent = old, 2000);
}

function downloadIcsFile() {
  const list = getSelectedDatesFormatted();
  if (list.length === 0) return;

  let ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//PIP Planejador Inteligente Presencial//PT-BR\r\n";
  list.forEach(item => {
    const dtStart = item.key.replace(/-/g, '');
    const nextObj = new Date(store.year, store.month, item.day + 1);
    const dtEnd = `${nextObj.getFullYear()}${String(nextObj.getMonth() + 1).padStart(2, '0')}${String(nextObj.getDate()).padStart(2, '0')}`;
    ics += "BEGIN:VEVENT\r\n";
    ics += `UID:${dtStart}-pip@planejador\r\n`;
    ics += `DTSTART;VALUE=DATE:${dtStart}\r\n`;
    ics += `DTEND;VALUE=DATE:${dtEnd}\r\n`;
    ics += `SUMMARY:🏢 Trabalho Presencial (${store.city})\r\n`;
    ics += `DESCRIPTION:Dia presencial planejado via PIP.\r\n`;
    ics += "END:VEVENT\r\n";
  });
  ics += "END:VCALENDAR";

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `PIP-presencial-${store.year}-${String(store.month + 1).padStart(2, '0')}.ics`;
  link.click();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function loadFromStorageOrUrl() {
  if (window.location.hash.startsWith('#d=')) {
    try {
      const raw = decodeURIComponent(atob(window.location.hash.replace('#d=', '')));
      const parsed = JSON.parse(raw);
      Object.assign(store, parsed);
      store.step = 3;
      setTimeout(() => goToStep(3), 50);
      return;
    } catch (e) {}
  }
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(store, parsed, { step: 1 });
    } catch (e) {}
  }
}
