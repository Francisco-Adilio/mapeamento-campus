'use client'

import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useDrag } from '@mantine/hooks'
import { LocationPinIcon } from './location-pin-icon'
import { Place } from '../models/place.model'
import { Connection } from '../models/connection.model'
import { useSearchParams } from 'next/navigation'

type MapProps = {
  onPlaceCardOpen: (place: Place) => void;
  onPlaceCardClose: () => void;
  pathPoints: number[]
}

const INITIAL_VIEWBOX = { x: 125, y: 217, width: 1440, height: 810 }
const MIN_ZOOM = 0.75
const MAX_ZOOM = 3

export const points: Place[] = [
  {
    id: 1,
    x: 880,
    y: 640,
    color: '#BF1234',
    name: 'Guarita',
    category: 'Segurança',
    description: 'Controle de entrada e saída do campus.',
    details: 'Horário de funcionamento: 24h',
    // Exemplo com duas imagens para testar o carrossel
    images: [
      'https://diregional.com.br/files/42738/053ddec104a3e7da2401deee5365b510'
    ]
  },
  {
    id: 2,
    x: 877,
    y: 480,
    name: 'Bloco B',
    category: 'Acadêmico',
    description: 'Salas de aulas e refeitório.',
    details: `B14 e B15 
- Sala de professores
Núcleo pedagógico
- Acompanhamento de orientação dos alunos
- Oficina de estudos
- conselho de classe
- Atendimento aos professores 
- 
Sala de atendimento 
Núcleo Acessibilidade Educacional
B13, B 12 , B11
- Sala de aula`,
    images: ['/foto_blocob.jpg']
  },
  {
    id: 3,
    x: 840,
    y: 520,
    name: 'Bloco A',
    category: 'Acadêmico',
    description: 'Bloco de assistência estudantil e biblioteca',
    details: `RA
- Registro acadêmico
- período de matricula  
- protocolo de justificativa de ausência
- Emitem o certificado ao final do curso 
- alimentação dos sistemas institucionais 
DAE
- Ações de apoio ao estudante
- Alimentação estudantil
- Estágio e emprego
- Biblioteca `,
    images: ['/foto_blocoa.jpg']
  },
  {
    id: 4,
    color: '#7C3AED',
    x: 800,
    y: 510,
    name: 'Estação 3 - Teto verde',
    category: 'Circuito sustentável',
    description: 'Espaço de convivência',
    details: 'O Container Sustentável do IFSC Câmpus Chapecó surgiu em 2017 a partir da necessidade de reduzir o calor excessivo em um contêiner utilizado pelo Grêmio Estudantil e Centros Acadêmicos. Como solução, estudantes e professores da Oficina de Integração III desenvolveram e construíram um teto verde de baixo custo, utilizando cobertura vegetal para melhorar o conforto térmico do espaço. Ao longo dos anos, o projeto foi complementado com uma parede verde irrigada por água reaproveitada dos aparelhos de ar-condicionado e passou por revitalizações realizadas por diferentes turmas, incluindo pintura, manutenção do teto verde e construção de mobiliário com materiais reutilizados. Além de proporcionar um ambiente mais agradável e sustentável, o projeto tornou-se um importante espaço de aprendizagem prática, integrando conhecimentos de diversas áreas e promovendo a conscientização ambiental, o trabalho colaborativo e o protagonismo estudantil.',
    link: 'https://docs.google.com/document/d/1FcjfXuhOzjJS4MXsZO67-V_BfLxw0DcCzcWuuvi2HfA/edit?usp=sharing',
    // Mais um exemplo com mais fotos para testar as setinhas e bolinhas
    images: [`/foto_container.jpg`,`/Foto_tetoverde.jpg`, `foto_tetoverde2.jpeg`]
  },
  {
    id: 5,
    x: 815,
    y: 410,
    name: 'Bloco C',
    category: 'Administrativo',
    description: 'Setores administrativos do câmpus.',
    details: `
    RADIO C
- Rádio do IFSC Chapecó
    BLOCO C
- C 16 - Gestão de pessoas
- C 13 - Chefia DAM
- C 14 - Compras
- C 15 - Almoxarifado 
- C 35 - Psicóloga 
- C34 - comunicações externas 
- Direção-Geral
- C33 - TI`,
    images: ['/laboratorio.jpg']
  },
  {
    id: 6,
    x: 685,
    y: 440,
    name: 'Bloco D',
    category: 'Acadêmico',
    description: 'Salas de aulas e laboratórios',
    details: `D11 - Lab usinagem convencional 
D12 - Lab de usinagem CNC
D13 - Laboratório Ciências 
Quadro de tampinhas
DEPE
- Direção de ensino e extensão 
- trabalha com os coordenadores de curso
- planejamento dos cursos
- criação de novos cursos e alteração
- contratação de professores 
- problemas com docentes
- ponte com a reitoria
D22 - Sala de professores 
D23 - Lab metrologia 
D24 - sala de aula 
D25 - sala de aula
D26 - sala de aula 
D27 - audiovisual`,
    images: ['/auditorio.jpg']
  },
  {
    id: 7,
    x: 730,
    y: 420,
    name: 'Bloco E',
    category: 'Acadêmico',
    description: 'Salas de aulas e laboratórios',
    details: `E11- Lab Instalações elétricas
E12 - Lab maquinas elétricas 
E13 - Lab acionamentos elétricos 
E14 - Lab eletrônica
E15 Lab eletrônica 2
E16 - Lab materias 
E17 - Sala de laboratoristas
E21 - sala de aula
E22 - sala de aula
E23 - sala de aula
E24 - sala de aula
E25 - sala de professores 
E26 - sala de professores`,
    images: ['/administracao.jpg']
  },
  {
    id: 8,
    x: 580,
    y: 330,
    name: 'Bloco F',
    category: 'Acadêmico',
    description: 'Salas de aulas e laboratórios',
    details: `F11 - Lab manutenção mecânica 
F21 - Lab de soldagem
F22 - Lab ajustagem mecânica 
F23 - Lab conformação mecânica 
F31
F32 - almoxarifado de mecânica 
F33
F34
F35
F41 - Lab de informática 
F42 - Lab pneumática e hidráulica 
F43 - Lab projeto integrador 
F44 - Almoxarifado 
F45 - Lab automação e Redes 
F46 - Lab instrumentação e controle 
F47 - Lab de robótica 
F51 - Lab informática 
F52 - Lab informática 
F53 - Lab informática 
F55 - Lab informática 
F56 - Lab informática 
F61 - Sala de aula
F62 - Sala de aula
F63 - Sala de aula
F65 - Sala de aula
F66 - Lab segurança do trabalho 
F67 - sala de professores`,
    images: ['/estacionamento.jpg']
  },
  {
    id: 9,
    color: '#7C3AED',
    x: 525,
    y: 260,
    name: 'Estação 15 - IfHorta Pedagógica',
    category: 'Circuito Sustentável',
    description: 'Horta sustentável do IFSC Chapecó',
    details: 'A IFHorta Pedagógica do IFSC Câmpus Chapecó é um projeto de agroecologia e sustentabilidade criado em 2025 por estudantes e professores da Oficina de Integração III. Inspirada em conhecimentos ancestrais e práticas agroflorestais, a iniciativa busca promover a produção sustentável de alimentos, o cultivo de plantas alimentícias, flores, árvores nativas e frutíferas, além de incentivar a valorização dos saberes da agricultura familiar. Desenvolvida de forma colaborativa, a horta funciona como um espaço de aprendizagem prática, integrando conhecimentos de diversas áreas e estimulando o protagonismo estudantil. Além de contribuir para a educação ambiental, o projeto fortalece a reflexão sobre alimentação, sustentabilidade, biodiversidade e a relação harmoniosa entre sociedade e natureza',
    link: 'https://docs.google.com/document/d/1FcjfXuhOzjJS4MXsZO67-V_BfLxw0DcCzcWuuvi2HfA/edit?usp=sharing',
    images: ['/20260326_163153.jpg', '/20260326_163225.jpg']
  },
  {
    id: 10,
    color: '#7C3AED',
    x: 580,
    y: 440,
    name: 'Estação 12 - Vermicompostagem',
    category: 'Circuito Sustentável',
    description: `Reaproveitamento de resíduos`,
    details: 'A Vermicompostagem do IFSC Câmpus Chapecó é um projeto de sustentabilidade que utiliza minhocas para transformar resíduos orgânicos em biofertilizante natural. Reativado em 2026 por estudantes da Oficina de Integração III, o sistema busca reaproveitar restos de alimentos gerados no campus, reduzindo o descarte de resíduos e producing adubo para a IFHorta. Além de contribuir para a melhoria do solo e para a agricultura sustentável, o projeto proporciona uma experiência prática de educação ambiental, incentivando a conscientização sobre reciclagem de resíduos orgânicos, economia circular e preservação dos recursos naturais.',
    link: 'https://docs.google.com/document/d/1FcjfXuhOzjJS4MXsZO67-V_BfLxw0DcCzcWuuvi2HfA/edit?usp=sharing',
    images: [ '/foto_1vermicompostagem.jpeg', '/foto_2vermicompostagem.jpeg', '/foto_3vermicompostagem.jpeg']
  },
  {
    id: 11,
    color: '#7C3AED',
    x: 920,
    y: 680,
    name: 'Estação 1 - Pergolado Verde',
    category: 'Circuito Sustentável',
    description: `Espaço de convivência`,
    details: 'O Pergolado Verde do IFSC Câmpus Chapecó é um espaço de convivência ao ar livre criado em 2018 a partir de uma demanda estudantil por ambientes de integração. Ao longo dos anos, o projeto passou por diversas revitalizações e ampliações realizadas por diferentes turmas da Oficina de Integração III, envolvendo a instalação de novos bancos, mesas, trepadeiras, melhorias no acesso e reaproveitamento de materiais. Além de proporcionar um ambiente agradável para estudo e convivência, o pergolado tornou-se um exemplo de sustentabilidade, trabalho colaborativo e aprendizagem prática, fortalecendo a integração entre estudantes, professores e comunidade escolar. ',images: ['/20260326_161357.jpg'],
    link: 'https://docs.google.com/document/d/1FcjfXuhOzjJS4MXsZO67-V_BfLxw0DcCzcWuuvi2HfA/edit?usp=sharing'
  },
  {
    id: 12,
    color: '#7C3AED',
    x: 835,
    y: 460,
    name: 'Estação 5 - PTQA',
    category: 'Circuito Sustentável',
    description: `Monitoramento da qualidade do ar`,
    details: 'O Projeto de Monitoramento da Qualidade do Ar (PTQA) foi desenvolvido por estudantes do IFSC Câmpus Chapecó com o objetivo de acompanhar, em tempo real, a qualidade do ar da instituição e conscientizar a comunidade sobre os impactos ambientais das mudanças climáticas e das queimadas. Utilizando tecnologias de baixo custo baseadas em Internet das Coisas (IoT), o sistema coleta dados de temperatura, pressão atmosférica e concentração de dióxido de carbono, disponibilizando as informações em uma plataforma digital acessível ao público. Além de contribuir para a educação ambiental, o PTQA promove a aplicação prática de conhecimentos em programação, eletrônica e monitoramento ambiental, sendo continuamente aprimorado por diferentes turmas da Oficina de Integração III.',
    link: 'https://docs.google.com/document/d/1FcjfXuhOzjJS4MXsZO67-V_BfLxw0DcCzcWuuvi2HfA/edit?usp=sharing',
    images: ['/Captura de tela 2026-06-10 221037.png']
  },
  {
    id: 13,
    color: '#7C3AED',
    x: 720,
    y: 435,
    name: 'Estação 9 - Meliponário',
    category: 'Circuito Sustentável - IFBEE',
    description: `Criação de abelhas sem ferrão`,
    details: 'O Meliponário do IFSC Câmpus Chapecó foi criado em 2022 por estudantes da Oficina de Integração III com o objetivo de preservar e incentivar a criação de abelhas nativas sem ferrão da espécie jataí. O projeto envolve o manejo sustentável das colônias e o monitoramento das condições ambientais por meio de sensores conectados a um sistema baseado em Arduino, permitindo acompanhar dados de temperatura e umidade em tempo real. Além de contribuir para a conservação da biodiversidade e para a polinização das plantas do campus, o meliponário tornou-se um importante espaço de educação ambiental e aprendizagem prática, promovendo a conscientização sobre a importância das abelhas para os ecossistemas e para a produção de alimentos.',
    link: 'https://docs.google.com/document/d/1FcjfXuhOzjJS4MXsZO67-V_BfLxw0DcCzcWuuvi2HfA/edit?usp=sharing',
    images: ['/Captura de tela 2026-06-10 220852.png']
  },
  {
    id: 14,
    color: '#7C3AED',
    x: 640,
    y: 435,
    name: 'Estação 11 - Biodigestor',
    category: 'Circuito Sustentável',
    description: `reaproveitamento de detritos para gerar gás e adubo`,
    details: 'O Biodigestor do IFSC Câmpus Chapecó foi implantado como um laboratório didático voltado ao estudo de biomassa e energias renováveis. Utilizando resíduos orgânicos gerados no campus, o sistema realiza a biodigestão anaeróbica, produzindo biogás e biofertilizante. O biogás é utilizado em atividades laboratoriais, enquanto o biofertilizante contribui para o cultivo da IFHorta. Mantido por estudantes do curso técnico em Sistemas de Energia Renovável, o projeto proporciona aprendizagem prática sobre produção de energia sustentável, gestão de resíduos e economia circular. Além de seu valor educacional, o biodigestor promove a conscientização ambiental e demonstra o potencial das energias renováveis para a construção de um futuro mais sustentável.',
    link: 'https://docs.google.com/document/d/1FcjfXuhOzjJS4MXsZO67-V_BfLxw0DcCzcWuuvi2HfA/edit?usp=sharing',
    images: ['/Captura de tela 2026-06-10 220957.png', '/foto_biodigestor.jpg']
  },
  {
    id: 15,
    color: '#7C3AED',
    x: 540,
    y: 420,
    name: 'Estação 14 - Redário',
    category: 'Convivência',
    description: `Espaço de relaxamento`,
    details: 'O Redário do IFSC Câmpus Chapecó foi criado em 2025 por estudantes da Oficina de Integração III com o objetivo de oferecer um espaço de descanso, convivência e bem-estar para a comunidade acadêmica. Instalado ao lado do Bloco F, em uma área sombreada e arborizada, o projeto contou com planejamento, construção da estrutura de sustentação e instalação de redes para uso dos estudantes. Além de proporcionar um ambiente acolhedor para os intervalos entre as aulas, o redário fortalece a integração entre os alunos e contribui para a qualidade de vida no campus, sendo um exemplo de iniciativa estudantil voltada à valorização dos espaços de convivência.',
    link: 'https://docs.google.com/document/d/1FcjfXuhOzjJS4MXsZO67-V_BfLxw0DcCzcWuuvi2HfA/edit?usp=sharing',
    images: ['/20260326_165013.jpg']
  },
]

export const connections: Connection[] = [
  {
    id1: 1,
    id2: 2,
    distance: 63,
    lines: [
      { x1: 917, y1: 671, x2: 966, y2: 569 },
      { x1: 967 , y1: 571, x2: 883, y2: 542 },
    ]
  },
  {
    id1: 1,
    id2: 11,
    distance: 20,
    lines: [
      { x1: 917, y1: 671, x2: 955, y2: 680 },
      { x1: 955, y1: 680, x2: 936, y2: 723 },
    ]
  },
  {//bloco C a bloco D
    id1: 5,
    id2: 6,
    distance: 20,
    lines: [
      { x1: 883, y1: 540, x2: 848, y2: 529 },
      { x1: 848, y1: 530, x2: 866, y2: 511 },
      { x1: 866, y1: 511, x2: 744, y2: 471 },
      { x1: 719, y1: 453, x2: 744, y2: 471 },
      { x1: 719, y1: 453, x2: 705, y2: 465 },
    ]
  },
  {//bloco C a bloco D
    id1: 5,
    id2: 7,
    distance: 20,
    lines: [
      { x1: 883, y1: 540, x2: 848, y2: 529 },
      { x1: 848, y1: 530, x2: 866, y2: 511 },
      { x1: 866, y1: 511, x2: 744, y2: 471 },
      { x1: 719, y1: 453, x2: 744, y2: 471 },
      { x1: 719, y1: 453, x2: 727, y2: 447 },
    ]
  },
  {//bloco D a bloco F
    id1: 6,
    id2: 8,
    distance: 20,
    lines: [
      { x1: 708, y1: 464, x2: 682, y2: 456 },
      { x1: 687, y1: 450, x2: 682, y2: 456 },
      { x1: 687, y1: 450, x2: 679, y2: 448 },
      { x1: 686, y1: 441, x2: 679, y2: 448 },
      { x1: 647, y1: 427, x2: 686, y2: 441 },
    ]
  },
  {//bloco F a IF horta
    id1: 8,
    id2: 9,
    distance: 20,
    lines: [
      { x1: 647, y1: 427, x2: 658, y2: 413 },
      { x1: 549, y1: 309, x2: 658, y2: 413 },
      
    ]
  },
  {//bloco F a Redário
    id1: 8,
    id2: 15,
    distance: 20,
    lines: [
      { x1: 647, y1: 427, x2: 592, y2: 458 },
      { x1: 568, y1: 453, x2: 592, y2: 458 },
      
      
    ]
  },
  {//Vermicompostagem a Biodigestor
    id1: 10,
    id2: 14,
    distance: 20,
    lines: [
      { x1: 611, y1: 479, x2: 655, y2: 465 },
      
      
    ]
  },
    {//Biodigestor a bloco D
    id1: 10,
    id2: 14,
    distance: 20,
    lines: [
      { x1: 676, y1: 447, x2: 655, y2: 465 },
      { x1: 676, y1: 447, x2: 687, y2: 451 },
      { x1: 680, y1: 457, x2: 687, y2: 451 },
      { x1: 680, y1: 457, x2: 704, y2: 462 },
      
      
    ]
  },
  {//Bloco B a container
    id1: 2,
    id2: 4,
    distance: 20,
    lines: [
      { x1: 879, y1: 539, x2: 835, y2: 525 },
      { x1: 815, y1: 543, x2: 835, y2: 525 },
    ]
  }

]

export function Map(props: MapProps) {
  const [zoom, setZoom] = useState(1)
  const [viewBox, setViewBox] = useState(INITIAL_VIEWBOX)
  const viewBoxRef = useRef(viewBox)
  const zoomRef = useRef(zoom)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const pinchStartDistanceRef = useRef(0)
  const pinchStartZoomRef = useRef(1)
  const pinchStartViewBoxRef = useRef({ x: 0, y: 0, width: 0, height: 0 })

  const mapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement | null>(null);

  const searchParams = useSearchParams()
  const currentSearchParam = searchParams.get('current')
  const current = currentSearchParam ? parseInt(currentSearchParam) : 1
  
  useEffect(() => {
    zoomRef.current = zoom
  }, [zoom])

  useEffect(() => {
    viewBoxRef.current = viewBox
  }, [viewBox])

  useEffect(() => {
    const mapElement = mapRef.current
    if (!mapElement) return

    // WHEEL ZOOM (DESKTOP)
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()

      const wheelDirection = event.deltaY < 0 ? 'up' : 'down'
      const shouldZoomIn = wheelDirection === 'up'

      const currentZoom = zoomRef.current
      const nextZoom = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, currentZoom + (shouldZoomIn ? 0.12 : -0.12))
      )

      const currentViewBox = viewBoxRef.current
      const zoomRatio = currentZoom / nextZoom

      const rect = mapElement.getBoundingClientRect()

      const pointerX = (event.clientX - rect.left) / rect.width
      const pointerY = (event.clientY - rect.top) / rect.height

      const nextWidth = currentViewBox.width * zoomRatio
      const nextHeight = currentViewBox.height * zoomRatio

      setZoom(nextZoom)
      setViewBox({
        x: currentViewBox.x + (currentViewBox.width - nextWidth) * pointerX,
        y: currentViewBox.y + (currentViewBox.height - nextHeight) * pointerY,
        width: nextWidth,
        height: nextHeight,
      })
    }

    // TOUCH PINCH ZOOM (MOBILE)
    const getDistance = (t1: Touch, t2: Touch) => {
      const dx = t2.clientX - t1.clientX
      const dy = t2.clientY - t1.clientY
      return Math.hypot(dx, dy)
    }

    const getMidpoint = (t1: Touch, t2: Touch) => ({
      x: (t1.clientX + t2.clientX) / 2,
      y: (t1.clientY + t2.clientY) / 2,
    })

    const onTouchStart = (ev: TouchEvent) => {
      if (ev.touches.length === 2) {
        ev.preventDefault()
        const [t1, t2] = [ev.touches[0], ev.touches[1]]
        
        // Salva nas referências para persistirem durante o movimento
        pinchStartDistanceRef.current = getDistance(t1, t2)
        pinchStartZoomRef.current = zoomRef.current
        pinchStartViewBoxRef.current = { ...viewBoxRef.current }
      }
    }

    const onTouchMove = (ev: TouchEvent) => {
      if (ev.touches.length === 2) {
        ev.preventDefault()
        const [t1, t2] = [ev.touches[0], ev.touches[1]]
        
        const distance = getDistance(t1, t2)
        if (pinchStartDistanceRef.current === 0) return

        const rawScale = distance / pinchStartDistanceRef.current
        const sensitivity = 0.35 
        const smoothedScale = 1 + (rawScale - 1) * sensitivity

        const targetZoom = pinchStartZoomRef.current * smoothedScale
        const nextZoom = Math.min(
          MAX_ZOOM,
          Math.max(MIN_ZOOM, targetZoom)
        )

        const zoomRatio = pinchStartZoomRef.current / nextZoom

        const startViewBox = pinchStartViewBoxRef.current

        const rect = mapElement.getBoundingClientRect()
        const midpoint = getMidpoint(t1, t2)

        const pointerX = (midpoint.x - rect.left) / rect.width
        const pointerY = (midpoint.y - rect.top) / rect.height

        const nextWidth = startViewBox.width * zoomRatio
        const nextHeight = startViewBox.height * zoomRatio

        if(zoomRef.current !== nextZoom) {
          setZoom(nextZoom)
          setViewBox({
            x: startViewBox.x + (startViewBox.width - nextWidth) * pointerX,
            y: startViewBox.y + (startViewBox.height - nextHeight) * pointerY,
            width: nextWidth,
            height: nextHeight,
          })
        }
      }
    }

    const onTouchEnd = (ev: TouchEvent) => {
      if (ev.touches.length < 2) {
        pinchStartDistanceRef.current = 0
      }
    }

    mapElement.addEventListener('wheel', onWheel, { passive: false })
    mapElement.addEventListener('touchstart', onTouchStart, { passive: false })
    mapElement.addEventListener('touchmove', onTouchMove, { passive: false })
    mapElement.addEventListener('touchend', onTouchEnd)

    return () => {
      mapElement.removeEventListener('wheel', onWheel)
      mapElement.removeEventListener('touchstart', onTouchStart)
      mapElement.removeEventListener('touchmove', onTouchMove)
      mapElement.removeEventListener('touchend', onTouchEnd)
    }
  }, [])


  const connectionsToShow = useMemo(() => {
    return connections.filter(c => props.pathPoints.includes(c.id1) && props.pathPoints.includes(c.id2))
  }, [props.pathPoints])

  const { ref: dragRef, active } = useDrag((state) => {
    props.onPlaceCardClose()

    if (state.first) {
      dragStartRef.current = {
        x: viewBoxRef.current.x,
        y: viewBoxRef.current.y,
      }
    }

    setViewBox((currentViewBox) => ({
      ...currentViewBox,
      x: dragStartRef.current.x - state.movement[0],
      y: dragStartRef.current.y - state.movement[1],
    }))
  })

  const handleSvgClick = (event: MouseEvent) => {
    if(!event.ctrlKey) return
    const svg = svgRef.current;
    if (!svg) return;

    // 1. Create a native SVG point object
    const point = svg.createSVGPoint();
    
    // 2. Assign the screen coordinates (clientX/Y) to the point
    point.x = event.clientX;
    point.y = event.clientY;

    // 3. Get the transformation matrix from screen space to SVG space
    const targetMatrix = svg.getScreenCTM()?.inverse();

    if (targetMatrix) {
      // 4. Transform the screen point into the local viewBox coordinates
      const svgPoints = point.matrixTransform(targetMatrix);
      
      // These coordinates now perfectly match your dynamic viewBox scale!
      const actualX = svgPoints.x;
      const actualY = svgPoints.y;

      alert(`ViewBox Local Position - X: ${actualX.toFixed(0)}, Y: ${actualY.toFixed(0)}`);
    }
  };

  function onLocationPinClick(place: Place) {
    props.onPlaceCardOpen(place)
  }

  return (
    <div
      ref={(node) => {
        dragRef(node)
        mapRef.current = node
      }}
      style={{
        position: 'fixed',
        zIndex: 0,
        overflow: 'hidden',
        background: '#79b369',
        cursor: active ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMidYMid meet"
        width="1440"
        height="810"
        style={{ display: 'block' }}
        onClick={handleSvgClick}
      >
        <image href="/campus.svg" x="0" y="0" width="1440" height="810" />

        {points.map((point) => (
          <g
            key={point.id}
            transform={`translate(${point.x}, ${point.y})`}
            onClick={() => onLocationPinClick(point)}
            cursor="pointer"
          >
            <LocationPinIcon color={point.color} isHere={current === point.id} />
          </g>
        ))}
        <>
          {connectionsToShow.map((connection) => 
            connection.lines.map((line, key) => (
              <line x1={line.x1} x2={line.x2} y1={line.y1} y2={line.y2} key={key} stroke='red' strokeWidth="5px"/>
            ))
          )}
        </>
      </svg>
    </div>
  )
}