import { BookOpen, GraduationCap, School, MapPin, HeartHandshake, Landmark, History, Target, Users, FlaskConical, LibraryBig, Palette, Monitor, CookingPot, Wrench, Trophy, Newspaper, Camera, CalendarDays, FilePenLine, ClipboardList, CircleHelp, Mail, ShieldCheck, CreditCard, Bell, NotebookPen, UserRound, House, UserRoundCheck, type LucideIcon } from 'lucide-react';

const routes: Record<string, LucideIcon> = {
  '':House,about:Landmark,'about/welcome':HeartHandshake,'about/history':History,'about/mission-vision':Target,'about/leadership':Users,
  schools:School,'schools/an-nur':BookOpen,'schools/bajulaiye':BookOpen,'schools/surulere':BookOpen,'schools/somolu':GraduationCap,'schools/epe':GraduationCap,
  academics:BookOpen,facilities:FlaskConical,'school-life':Trophy,gallery:Camera,admissions:FilePenLine,'admissions/apply':FilePenLine,'admissions/entrance-examination':ClipboardList,faq:CircleHelp,news:Newspaper,alumni:GraduationCap,contact:Mail,portal:ShieldCheck,
};
export function PageIcon({page='',size=22}:{page?:string|undefined;size?:number}) { const Icon=routes[page]||routes[page.split('/')[0]||'']||BookOpen;return <Icon size={size} strokeWidth={1.8} aria-hidden="true"/>; }
export function FeatureIcon({name,size=25}:{name:string|undefined;size?:number}) {
  const n=(name||'').toLowerCase();
  const Icon=n.includes('science')||n.includes('secondary')?FlaskConical:n.includes('ict')||n.includes('digital')?Monitor:n.includes('library')?LibraryBig:n.includes('economics')||n.includes('catering')?CookingPot:n.includes('technology')?Wrench:n.includes('creative')||n.includes('celebration')?Palette:n.includes('sport')?Trophy:n.includes('trip')?MapPin:n.includes('club')?Users:n.includes('early')||n.includes('nursery')||n.includes('primary')?BookOpen:GraduationCap;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true"/>;
}
const portalIcons:Record<string,LucideIcon>={dashboard:House,results:GraduationCap,attendance:UserRoundCheck,fees:CreditCard,assignments:NotebookPen,timetable:ClipboardList,events:CalendarDays,notices:Bell,profile:UserRound,admissions:FilePenLine,people:Users,content:Newspaper};
export function PortalIcon({name,size=20}:{name:string|undefined;size?:number}){const Icon=portalIcons[name||'']||School;return <Icon size={size} strokeWidth={1.8} aria-hidden="true"/>;}
