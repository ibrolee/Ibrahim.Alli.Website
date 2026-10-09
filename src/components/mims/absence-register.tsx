import { useState } from 'react';
import { Check } from 'lucide-react';

export type AbsenceRecord = { name: string; date: string; note: string };
export const sampleAbsences: AbsenceRecord[] = [
  { name: 'Amina Yusuf', date: '2026-09-03', note: 'Parent informed the class teacher.' },
  { name: 'Amina Yusuf', date: '2026-09-15', note: 'Absence recorded by the class teacher.' },
];
export function AbsenceRegister({ parent, pupilName, pupilClass, roster, records, onSave }: {
  parent: boolean; pupilName: string; pupilClass: string; roster: string[];
  records: AbsenceRecord[]; onSave: (records: AbsenceRecord[]) => void;
}) {
  const [date, setDate] = useState('2026-10-05');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const checked = (name: string) => selected[`${date}|${name}`] ?? records.some(r => r.name === name && r.date === date);
  const visibleRecords = (parent ? records.filter(r => r.name === pupilName) : records).slice().sort((a,b) => b.date.localeCompare(a.date));
  const formatDate = (value: string) => {
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  };
  return <>
    <div className="m-panel"><p className="m-eyebrow">CLASS TEACHER ABSENCE RECORDS</p>
      <h2>{parent ? `${pupilName}’s recorded absences` : 'JSS 2 absence register'}</h2>
      <p>{parent ? `View absence dates recorded by the class teacher for ${pupilClass}. Children do not need to use the portal.` : 'Record only pupils who are absent. There is no daily present marking or pupil check-in. Use this page when an absence occurs or a record needs correction.'}</p>
      {parent ? <div className="m-absence-summary"><strong>{visibleRecords.length}</strong><span>recorded absence{visibleRecords.length===1?'':'s'} in this sample term</span></div> :
        <form onSubmit={e => {
          e.preventDefault();
          const next = records.filter(r => r.date !== date || !roster.includes(r.name));
          roster.filter(checked).forEach(name => {
            const key = `${date}|${name}`;
            next.push({ name, date, note: notes[key] ?? records.find(r => r.name === name && r.date === date)?.note ?? '' });
          });
          onSave(next);
        }}>
          <label className="m-absence-date">Date of absence<input type="date" required value={date} onChange={e => setDate(e.target.value)} /></label>
          <div className="m-table-wrap"><table><thead><tr><th>Pupil</th><th>Record absence</th><th>Optional note</th></tr></thead><tbody>{roster.map(name => {
            const key = `${date}|${name}`;
            return <tr key={name}><td>{name}</td><td><label className="m-absence-choice"><input type="checkbox" aria-label={`Record absence for ${name}`} checked={checked(name)} onChange={e => setSelected({...selected,[key]:e.target.checked})} />Absent</label></td><td>{checked(name) ? <input aria-label={`Absence note for ${name}`} maxLength={160} placeholder="Optional teacher note" value={notes[key] ?? records.find(r=>r.name===name&&r.date===date)?.note ?? ''} onChange={e=>setNotes({...notes,[key]:e.target.value})} /> : <span className="m-cell-note">No absence selected</span>}</td></tr>;
          })}</tbody></table></div>
          <button className="m-button" type="submit">Save absence updates<Check size={16}/></button>
          <p className="m-note">To correct an existing entry, select its date, untick that pupil and save. Unlisted days carry no attendance status.</p>
        </form>}
    </div>
    <div className="m-panel"><h2>{parent ? 'Absence history' : 'Recorded class absences'}</h2>
      {visibleRecords.length ? <div className="m-table-wrap"><table><thead><tr>{!parent&&<th>Pupil</th>}<th>Date of absence</th><th>Teacher note</th></tr></thead><tbody>{visibleRecords.map(r=><tr key={`${r.name}|${r.date}`}>{!parent&&<td>{r.name}</td>}<td>{formatDate(r.date)}</td><td>{r.note||'No note added.'}</td></tr>)}</tbody></table></div> : <p>No absences have been recorded in this sample term.</p>}
      <p className="m-note">Fictional records for review. No attendance percentage, scan time or daily present record is collected.</p>
    </div>
  </>;
}
