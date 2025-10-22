export interface SyncfusionEditorSerialized {
    optimizeSfdt: boolean
    sec: Sec[]
    cf: Cf3
    pf: Pf2
    tfl: Tfl
    dtw: number
    tc: number
    enf: number
    hv: string
    sv: string
    fmt: number
    pt: number
    dhtml: number
    ffs: number
    comp: number
    stytbl: number
    bg: Bg
    sty: Sty[]
    li: any[]
    al: any[]
    cm: any[]
    r: any[]
    cx: any[]
    imgs: Imgs
  }
  
  export interface Sec {
    secpr: Secpr
    b: B[]
    hf: Hf
  }
  
  export interface Secpr {
    pw: number
    ph: number
    lm: number
    rm: number
    tm: number
    bm: number
    hd: number
    fd: number
    dfp: number
    doep: number
    bi: number
    bc: string
    enf: number
    fnf: number
    rif: number
    rie: number
    ifn: number
    ien: number
    pgns: string
    ncols: number
    eqw: number
    lbtc: number
    cols: any[]
  }
  
  export interface B {
    blockId:string
    pf: Pf
    cf: Cf
    i: I[]
  }
  
  export interface Pf {
    bdrs: Bdrs
    stn: string
    lif: Lif
  }
  
  export interface Bdrs {
    tp: Tp
    lt: Lt
    rg: Rg
    bt: Bt
    h: H
    v: V
  }
  
  export interface Tp {}
  
  export interface Lt {}
  
  export interface Rg {}
  
  export interface Bt {}
  
  export interface H {}
  
  export interface V {}
  
  export interface Lif {}
  
  export interface Cf {}
  
  export interface I {
    cf: Cf2
    tlp: string
  }
  
  export interface Cf2 {
    bi: boolean
  }
  
  export interface Hf {}
  
  export interface Cf3 {
    b: boolean
    i: boolean
    fsz: number
    ff: string
    u: number
    st: number
    ba: number
    hc: number
    fc: string
    fszbi: number
    ffbi: string
    ac: boolean
    ffa: string
    ffnfe: string
    fffe: string
  }
  
  export interface Pf2 {
    bdrs: Bdrs2
    lin: number
    rin: number
    fin: number
    ta: number
    bs: number
    as: number
    ls: number
    lst: number
    ol: number
    bi: boolean
    klt: boolean
    kwn: boolean
    wc: boolean
    lif: Lif2
  }
  
  export interface Bdrs2 {
    tp: Tp2
    lt: Lt2
    rg: Rg2
    bt: Bt2
    h: H2
    v: V2
  }
  
  export interface Tp2 {}
  
  export interface Lt2 {}
  
  export interface Rg2 {}
  
  export interface Bt2 {}
  
  export interface H2 {}
  
  export interface V2 {}
  
  export interface Lif2 {}
  
  export interface Tfl {}
  
  export interface Bg {
    c: string
  }
  
  export interface Sty {
    n: string
    t: number
    pf?: Pf3
    cf: Cf4
    nx?: string
    b?: string
    l?: string
  }
  
  export interface Pf3 {
    bdrs: Bdrs3
    as?: number
    ls?: number
    lst?: number
    lif: Lif3
    lin?: number
    rin?: number
    fin?: number
    ta?: number
    bs?: number
    ol?: number
  }
  
  export interface Bdrs3 {
    tp: Tp3
    lt: Lt3
    rg: Rg3
    bt: Bt3
    h: H3
    v: V3
  }
  
  export interface Tp3 {}
  
  export interface Lt3 {}
  
  export interface Rg3 {}
  
  export interface Bt3 {}
  
  export interface H3 {}
  
  export interface V3 {}
  
  export interface Lif3 {}
  
  export interface Cf4 {
    fsz?: number
    ff?: string
    fc?: string
    ffa?: string
    ffnfe?: string
    fffe?: string
    i?: boolean
  }
  
  export interface Imgs {}
  