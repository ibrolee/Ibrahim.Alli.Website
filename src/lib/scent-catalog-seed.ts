/** Small offline fallback of recognisable fragrances.
 * Names/brand IDs only when no verified note pyramid is available.
 * Qasida compositions are supplied on FAAN/Qasida's official product pages.
 * This is not the licensed full catalogue.
 */
export type ScentSeed = { id:string; name:string; brand:string; image?:string; year?:string; family?:string; description?:string; notes:string[]; top:string[]; heart:string[]; base:string[]; accords:string[] };
const basic = (brand:string,names:string[]):ScentSeed[] => names.map(name=>({id:"seed:"+brand.toLowerCase().replace(/\W+/g,"-")+":"+name.toLowerCase().replace(/\W+/g,"-"),name,brand,notes:[],top:[],heart:[],base:[],accords:[]}));
const qasida = (name:string,top:string[],heart:string[],base:string[],accords:string[]):ScentSeed=>({id:"seed:qasida:"+name.toLowerCase().replace(/\W+/g,"-"),name,brand:"Qasida (FAAN)",family:"Eau de Parfum · 200 ml",notes:[...top,...heart,...base],top,heart,base,accords});
export const SCENT_SEED:ScentSeed[] = [
  qasida("Sahm",["Mango","Lemon","Pink Berries","Ginger","Raspberry","Green Mandarin","Bergamot"],["Blue Coumarin","Jasmine","Cedar","Dry Woods","Cardamom","Lavender","Clary Sage"],["Oud","Nagarmotha","Musk","Amber","Leather Accord","Vetiver","Wolfwood"],["Woody","Oud","Leather"]),
  qasida("Bakhur",[],[],[],["Saffron","Rose","Incense"]),
  qasida("Dunes",[],[],[],["Incense","Leather","Sandalwood"]),
  qasida("Al-Badr",[],[],[],["Iris","Vetiver","Tonka"]),
  qasida("Purity",["Pear","Fig Nectar","Lily of the Valley"],["Ylang-Ylang","Jasmine Sambac"],["Cashmere Musk","Sandalwood","Vanilla"],["Floral","Musky"]),
  qasida("Senses",["Pear","Red Berries","Bergamot"],["Coconut","Damask Rose","Bourbon Vanilla"],["White Musk","Sandalwood"],["Floral","Vanilla","Musk"]),
  qasida("Queen",["Cherry","Clove","Pink Pepper"],["Orange Blossom","Jasmine"],["Vanilla","Amber","Coffee"],["Gourmand","Amber"]),
  qasida("Signature",["Bergamot","Cinnamon","Almond","Cardamom"],["Orange Blossom","Coconut","Guaiac Wood"],["Praline","Vanilla","Dry Amber","Cashmeran"],["Gourmand","Vanilla","Amber"]),
  ...basic("Lattafa",["Khamrah","Khamrah Qahwa","Asad","Asad Bourbon","Yara","Yara Tous","Bade'e Al Oud Oud for Glory","Bade'e Al Oud Amethyst","Qaed Al Fursan","Fakhar Black","Ameer Al Oudh Intense Oud","Raghba","Ana Abiyedh Rouge","Eclaire"]),
  ...basic("Afnan",["9PM","9AM Dive","Supremacy Not Only Intense","Supremacy Silver","Turathi Blue","Modest Une","Historic Olmeda"]),
  ...basic("Armaf",["Club de Nuit Intense Man","Club de Nuit Milestone","Club de Nuit Sillage","Odyssey Mandarin Sky"]),
  ...basic("Rasasi",["Hawas for Him","Hawas Ice","Daarej Pour Homme"]),
  ...basic("Maison Alhambra",["Jean Lowe Immortal","Salvo Intense","Tobacco Touch"]),
  ...basic("Dior",["Sauvage Eau de Parfum","Sauvage Elixir","Dior Homme Intense","Fahrenheit","Hypnotic Poison"]),
  ...basic("Chanel",["Bleu de Chanel Eau de Parfum","Allure Homme Sport","Coco Mademoiselle"]),
  ...basic("Jean Paul Gaultier",["Le Male Le Parfum","Le Male Elixir","Ultra Male","Scandal Pour Homme"]),
  ...basic("Tom Ford",["Oud Wood","Tobacco Vanille","Black Orchid","Lost Cherry"]),
  ...basic("Creed",["Aventus","Green Irish Tweed","Silver Mountain Water"]),
  ...basic("Maison Francis Kurkdjian",["Baccarat Rouge 540","Grand Soir"]),
  ...basic("Versace",["Eros","Dylan Blue","Pour Homme"]),
  ...basic("Yves Saint Laurent",["Y Eau de Parfum","La Nuit de L'Homme","MYSLF"]),
  ...basic("Nishane",["Hacivat","Ani"]),
  ...basic("Xerjoff",["Erba Pura","Naxos"]),
  ...basic("Initio",["Oud for Greatness","Side Effect"]),
  ...basic("Montblanc",["Explorer","Legend Spirit"]),
  ...basic("Azzaro",["The Most Wanted Parfum","Wanted by Night"])
];
const simplify = (t:string)=>t.toLowerCase().normalize("NFKD").replace(/[^\w]+/g," ").trim();
export function seedSearch(q:string,page=1,pageSize=20):ScentSeed[]{
  const alias=simplify(q).replace(/\bbahoor\b|\bbakhour\b/g,"bakhur").replace(/\bsahn\b/g,"sahm");
  const matches=SCENT_SEED.filter(p=>simplify(p.brand+" "+p.name).includes(alias)||simplify(p.name).includes(alias));
  return matches.slice((page-1)*pageSize,page*pageSize);
}
