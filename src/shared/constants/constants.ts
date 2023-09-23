export const defaultLanguages = {
    input: "English",
    output: "Spanish (Español)"
}

export const defaultTone : string = "Formal";

export const tones : Array<string> = ["Formal", "Informal", "Professional"];

export const maxCharLimit : number = 1000;

export const mobileWidthBreakpoint = 700;

export const languages : Array<string> = [
    'Arabic (العربية)',
    'Bengali (বাংলা)',
    'Chinese (中文)',
    'English',
    'French (Français)',
    'German (Deutsch)',
    'Hindi (हिन्दी)',
    'Italian (Italiano)',
    'Japanese (日本語)',
    'Javanese (Jawa)',
    'Korean (한국어)',
    'Marathi (मराठी)',
    'Portuguese (Português)',
    'Punjabi (ਪੰਜਾਬੀ)',
    'Russian (Русский)',
    'Spanish (Español)',
    'Tamil (தமிழ்)',
    'Telugu (తెలుగు)',
    'Turkish (Türkçe)',
    'Urdu (اردو)',
    'Vietnamese (Tiếng Việt)',
];

interface LanguageObject {
    [code: string]: string;
}

export const bingLanguages : LanguageObject = {
    af: "Afrikaans",
    sq: "Albanian",
    am: "Amharic",
    ar: "Arabic",
    hy: "Armenian",
    as: "Assamese",
    az: "Azerbaijani",
    bn: "Bangla",
    ba: "Bashkir",
    eu: "Basque",
    bs: "Bosnian",
    bg: "Bulgarian",
    yue: "Cantonese (Traditional)",
    ca: "Catalan",
    lzh: "Chinese (Literary)",
    "zh-Hans": "Chinese Simplified",
    "zh-Hant": "Chinese Traditional",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    prs: "Dari",
    dv: "Divehi",
    nl: "Dutch",
    en: "English",
    et: "Estonian",
    fo: "Faroese",
    fj: "Fijian",
    fil: "Filipino",
    fi: "Finnish",
    fr: "French",
    "fr-CA": "French (Canada)",
    gl: "Galician",
    lug: "Ganda",
    ka: "Georgian",
    de: "German",
    el: "Greek",
    gu: "Gujarati",
    ht: "Haitian Creole",
    ha: "Hausa",
    he: "Hebrew",
    hi: "Hindi",
    "mww": "Hmong Daw",
    hu: "Hungarian",
    is: "Icelandic",
    ig: "Igbo",
    id: "Indonesian",
    ikt: "Inuinnaqtun",
    iu: "Inuktitut",
    "iu-Latn": "Inuktitut (Latin)",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    kn: "Kannada",
    kk: "Kazakh",
    km: "Khmer",
    rw: "Kinyarwanda",
    "tlh-Latn": "Klingon (Latin)",
    gom: "Konkani",
    ko: "Korean",
    ku: "Kurdish (Central)",
    kmr: "Kurdish (Northern)",
    ky: "Kyrgyz",
    lo: "Lao",
    lv: "Latvian",
    ln: "Lingala",
    lt: "Lithuanian",
    dsb: "Lower Sorbian",
    mk: "Macedonian",
    mai: "Maithili",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mr: "Marathi",
    "mn-Cyrl": "Mongolian (Cyrillic)",
    "mn-Mong": "Mongolian (Traditional)",
    my: "Myanmar (Burmese)",
    mi: "Māori",
    ne: "Nepali",
    nb: "Norwegian",
    nya: "Nyanja",
    or: "Odia",
    ps: "Pashto",
    fa: "Persian",
    pl: "Polish",
    "pt": "Portuguese (Brazil)",
    "pt-PT": "Portuguese (Portugal)",
    pa: "Punjabi",
    otq: "Querétaro Otomi",
    ro: "Romanian",
    run: "Rundi",
    ru: "Russian",
    sm: "Samoan",
    "sr-Cyrl": "Serbian (Cyrillic)",
    "sr-Latn": "Serbian (Latin)",
    st: "Sesotho",
    nso: "Sesotho sa Leboa",
    tn: "Setswana",
    sn: "Shona",
    sd: "Sindhi",
    si: "Sinhala",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somali",
    es: "Spanish",
    sw: "Swahili",
    sv: "Swedish",
    ty: "Tahitian",
    ta: "Tamil",
    tt: "Tatar",
    te: "Telugu",
    th: "Thai",
    bo: "Tibetan",
    ti: "Tigrinya",
    to: "Tongan",
    tr: "Turkish",
    tk: "Turkmen",
    uk: "Ukrainian",
    hsb: "Upper Sorbian",
    ur: "Urdu",
    ug: "Uyghur",
    uz: "Uzbek (Latin)",
    vi: "Vietnamese",
    cy: "Welsh",
    xh: "Xhosa",
    yo: "Yoruba",
    yua: "Yucatec Maya",
    zu: "Zulu"
};

export const bingLanguagesArray: { code: string; value: string }[] = Object.keys(bingLanguages).map((code) => ({
    code: code,
    value: bingLanguages[code],
}));


