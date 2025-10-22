export interface SyncfusioEditorModel {
    sections: Section[]
    characterFormat: CharacterFormat
    paragraphFormat: ParagraphFormat
    background: Background
    styles: Style[]
  }
  
  export interface Section {
    blocks: any[]
    headersFooters: HeadersFooters
    sectionFormat: SectionFormat
  }

  export interface Block {
    id: number
    paragraphFormat: ParagraphFormat
    inlines: Inline[]
  }

  export interface Inline {
    text: string
  }
  
  export interface HeadersFooters {
    header: Header
    footer: Footer
    evenHeader: EvenHeader
    evenFooter: EvenFooter
    firstPageHeader: FirstPageHeader
    firstPageFooter: FirstPageFooter
  }
  
  export interface Header {
    blocks: any[]
  }
  
  export interface Footer {
    blocks: any[]
  }
  
  export interface EvenHeader {
    blocks: any[]
  }
  
  export interface EvenFooter {
    blocks: any[]
  }
  
  export interface FirstPageHeader {
    blocks: any[]
  }
  
  export interface FirstPageFooter {
    blocks: any[]
  }
  
  export interface SectionFormat {
    headerDistance: number
    footerDistance: number
    pageWidth: number
    pageHeight: number
    leftMargin: number
    rightMargin: number
    topMargin: number
    bottomMargin: number
    differentFirstPage: boolean
    differentOddAndEvenPages: boolean
  }
  
  export interface CharacterFormat {
    fontSize: number
    fontFamily: string
  }
  
  export interface ParagraphFormat {
    afterSpacing: number
    lineSpacing: number
    lineSpacingType: string
  }
  
  export interface Background {
    color: string
  }
  
  export interface Style {
    type: string
    name: string
    next?: string
    paragraphFormat?: ParagraphFormat2
    basedOn?: string
    characterFormat?: CharacterFormat2
    link?: string
  }
  
  export interface ParagraphFormat2 {
    afterSpacing?: number
    lineSpacing: number
    lineSpacingType: string
    tabs?: Tab[]
  }
  
  export interface Tab {
    tabJustification: string
    position: number
    tabLeader: string
    deletePosition: number
  }
  
  export interface CharacterFormat2 {
    fontSize?: number
    fontFamily?: string
    bold?: boolean
  }
  