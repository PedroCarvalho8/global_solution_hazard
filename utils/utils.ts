import { Data } from "@/models/DataModel";

type Calendario = {
    [ano: number]: {
        [mes: number]: number[]
    }
}

export function getCalendario(data) {
    const calendario: { [ano: number]: { [mes: number]: Set<number> } } = {};

    data.forEach(item => {
        const data = new Date(item.timestamp)
        const dia = data.getDate()
        const mes = data.getMonth() + 1
        const ano = data.getFullYear()

        if (!calendario[ano]) calendario[ano] = {}
        if (!calendario[ano][mes]) calendario[ano][mes] = new Set()

        calendario[ano][mes].add(dia)
    })

    const calendarioFinal: Calendario = {};
    
    for (const ano in calendario) {
        calendarioFinal[+ano] = {};
        for (const mes in calendario[+ano]) {
            calendarioFinal[+ano][+mes] = Array.from(calendario[+ano][+mes]);
        }
    }

    return calendario
}

export function getNomeMes(numeroMes: string): string {
  const nomesDosMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const indice = parseInt(numeroMes, 10) - 1;

  if (indice >= 0 && indice < 12) {
    return nomesDosMeses[indice];
  }

  return "Mês inválido";
}

export function calcularDistanciaEmMetros(
  itemA: Data,
  itemB: Data
): number {
  const R = 6371000;
  const toRad = (grau: number) => (grau * Math.PI) / 180;

  const lat1 = itemA.localizacao.coords.latitude
  const lon1 = itemA.localizacao.coords.longitude
  const lat2 = itemB.localizacao.coords.latitude
  const lon2 = itemB.localizacao.coords.longitude

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

type ItemComTimestamp = {
  timestamp: string | number | Date;
  umidade
  anotacao
  inclinacao
};

export function filtrarPorAnoMes(
  lista: ItemComTimestamp[],
  mes: number,
  ano: number
): ItemComTimestamp[] {
  return lista.filter((item) => {
    const data = new Date(item.timestamp);
    return (
      data.getMonth() === mes - 1 &&
      data.getFullYear() === ano
    );
  });
}

export function filtrarPorAno(
  lista: ItemComTimestamp[],
  ano: number
): ItemComTimestamp[] {
  return lista.filter((item) => {
    const data = new Date(item.timestamp);
    return (
      data.getFullYear() === ano
    );
  });
}

function agruparPorProximidade(dados: Data[]): Data[][] {
  const RAIO_METROS = 50;
  const grupos: Data[][] = [];

  for (const item of dados) {
    let grupoExistente = grupos.find(grupo =>
      grupo.some(outro => calcularDistanciaEmMetros(item, outro) <= RAIO_METROS)
    );

    if (grupoExistente) {
      grupoExistente.push(item);
    } else {
      grupos.push([item]);
    }
  }

  return grupos;
}

function calcularFatorDeRisco(grupo: Data[]): {
  nivel: 'seguro' | 'cuidado' | 'alerta',
  justificativa: string
} {
  const umidades = grupo.map(d => d.umidade);
  const inclinacoes = grupo.map(d => d.inclinacao);

  const variacaoumidade = Math.max(...umidades) - Math.min(...umidades);
  const variacaoInclinacao = Math.max(...inclinacoes) - Math.min(...inclinacoes);

  const LIMIAR_umidade_CUIDADO = 30;
  const LIMIAR_umidade_ALERTA = 60;

  const LIMIAR_INCLINACAO_CUIDADO = 5;
  const LIMIAR_INCLINACAO_ALERTA = 12;

  let justificativas: string[] = [];

  let nivelumidade: 'seguro' | 'cuidado' | 'alerta' =
    variacaoumidade > LIMIAR_umidade_ALERTA ? 'alerta' :
    variacaoumidade > LIMIAR_umidade_CUIDADO ? 'cuidado' :
    'seguro';

  let nivelInclinacao: 'seguro' | 'cuidado' | 'alerta' =
    variacaoInclinacao > LIMIAR_INCLINACAO_ALERTA ? 'alerta' :
    variacaoInclinacao > LIMIAR_INCLINACAO_CUIDADO ? 'cuidado' :
    'seguro';

  if (nivelumidade !== 'seguro') {
    justificativas.push(`variação de pressão foi ${variacaoumidade.toFixed(2)} Pa`);
  }

  if (nivelInclinacao !== 'seguro') {
    justificativas.push(`variação de inclinação foi ${variacaoInclinacao.toFixed(2)}°`);
  }

  let nivelFinal: 'seguro' | 'cuidado' | 'alerta' =
    nivelumidade === 'alerta' || nivelInclinacao === 'alerta' ? 'alerta' :
    nivelumidade === 'cuidado' || nivelInclinacao === 'cuidado' ? 'cuidado' :
    'seguro';

  const justificativa =
    justificativas.length > 0
      ? `Risco identificado porque ${justificativas.join(' e ')}.`
      : 'Sem variações significativas detectadas.';

  return { nivel: nivelFinal, justificativa };
}

export function detectarRiscos(dados: Data[]): {
  grupo: Data[],
  risco: 'seguro' | 'cuidado' | 'alerta',
  justificativa: string
}[] {
  const grupos = agruparPorProximidade(dados);

  return grupos.map(grupo => {
    const { nivel, justificativa } = calcularFatorDeRisco(grupo);
    return {
      grupo,
      risco: nivel,
      justificativa
    };
  });
}
