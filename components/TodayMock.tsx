import { Icon, type IconName } from '@/components/Icon';

const days: { wd: string; num: string; label: string; mark: 'done' | 'partial' | 'health' | 'empty'; today?: boolean }[] = [
  { wd: 'Fri', num: '23', label: 'Friday 23 October, all done', mark: 'done' },
  { wd: 'Sat', num: '24', label: 'Saturday 24 October, all done', mark: 'done' },
  { wd: 'Sun', num: '25', label: 'Sunday 25 October, 1 task not logged', mark: 'partial' },
  { wd: 'Mon', num: '26', label: 'Today, Monday 26 October', mark: 'empty', today: true },
  { wd: 'Tue', num: '27', label: 'Tuesday 27 October', mark: 'empty' },
  { wd: 'Wed', num: '28', label: 'Wednesday 28 October', mark: 'empty' },
  { wd: 'Thu', num: '29', label: 'Thursday 29 October, Deworming due', mark: 'health' },
];

export function TodayMock() {
  return (
    <div
      className="fk-phone"
      style={{ width: 390, height: 829, position: 'relative', overflow: 'hidden', background: 'var(--background)', color: 'var(--ink)', fontFamily: 'var(--font-body)' }}
    >
      <div style={{ position: 'absolute', inset: 0, padding: '56px 24px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', color: 'var(--action)', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Lisa&apos;s Household
            </a>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, lineHeight: 1.08, letterSpacing: '-0.01em' }}>
              Hey Lisa!
              <br />
              3 jobs left
            </h1>
          </div>
          <a href="#" aria-label="Settings" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span className="fk-avatar fk-avatar--48 fk-avatar--person" aria-hidden="true">L</span>
          </a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
          <div className="fk-datebar">
            <span className="fk-datebar__month">October</span>
            <div className="fk-viewtoggle" role="radiogroup" aria-label="Today view">
              <a role="radio" aria-checked="true" aria-label="List view" href="#" className="fk-viewtoggle__opt" style={{ textDecoration: 'none' }}>
                <Icon name="view-list" size={22} />
              </a>
              <a role="radio" aria-checked="false" aria-label="Day view" href="#" className="fk-viewtoggle__opt" style={{ textDecoration: 'none' }}>
                <Icon name="view-day" size={22} />
              </a>
            </div>
          </div>
          <div className="fk-days" role="group" aria-label="Choose a day. Swipe for more days">
            {days.map((day) => (
              <a
                key={day.num}
                className={day.today ? 'fk-day is-today is-selected' : 'fk-day'}
                href="#"
                aria-label={day.label}
                aria-current={day.today ? 'date' : undefined}
              >
                <span className="fk-day__wd">{day.wd}</span>
                <span className="fk-day__num">{day.num}</span>
                <DayMark mark={day.mark} />
              </a>
            ))}
          </div>
        </div>
        <div className="fk-switcher" role="group" aria-label="Show tasks for" style={{ margin: '0 -24px', paddingLeft: 24 }}>
          <button className="fk-chip fk-chip--all is-selected" type="button" aria-pressed="true">All pets</button>
          <button className="fk-chip" type="button" aria-pressed="false">
            <span className="fk-avatar"><span className="fk-photo" /></span>
            <span className="fk-chip__label">Mallow</span>
          </button>
          <button className="fk-chip" type="button" aria-pressed="false">
            <span className="fk-avatar" aria-hidden="true">P</span>
            <span className="fk-chip__label">Pepper</span>
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} role="list">
          <div className="fk-task fk-task--overdue">
            <TaskBox name="feed" />
            <div className="fk-task__body">
              <div className="fk-task__title" />
              <div style={{ marginBottom: 2 }}>
                <span className="fk-tag fk-tag--overdue">
                  <Icon name="clock" size={16} />
                  Overdue
                </span>
              </div>
              <div className="fk-task__title">Dinner</div>
              <div className="fk-task__meta"><span className="fk-task__pet">Pepper</span> · Was due 18:00</div>
            </div>
            <a className="fk-btn fk-btn--primary fk-btn--sm" href="#" style={{ textDecoration: 'none' }}>Done</a>
          </div>
          <DoneTask icon="feed" title="Breakfast" meta="Lisa · 08:10 · 120 g" pet="Mallow" />
          <DoneTask icon="walk" title="Morning walk" meta="Daan · 07:20 · 35 min" pet="Mallow" />
          <DoneTask icon="feed" title="Dinner" meta="Daan · 18:05 · 120 g" pet="Mallow" />
          <div className="fk-task">
            <TaskBox name="walk" />
            <div className="fk-task__body">
              <div className="fk-task__title">Evening walk</div>
              <div className="fk-task__meta"><span className="fk-task__pet">Mallow</span> · 19:00</div>
            </div>
            <a className="fk-btn fk-btn--primary fk-btn--sm" href="#" style={{ textDecoration: 'none' }}>Done</a>
          </div>
        </div>
        <a className="fk-card fk-card--reminder" href="#" style={{ textDecoration: 'none' }}>
          <Icon name="bell" size={24} />
          <span className="fk-card__title" style={{ flex: 1 }}>Deworming on Thursday · Mallow</span>
          <Icon name="chevron-right" size={20} />
        </a>
      </div>
      <a className="fk-fab" href="#" style={{ position: 'absolute', right: 16, bottom: 100, textDecoration: 'none' }}>
        <Icon name="plus" size={24} />
        Log
      </a>
      <nav className="fk-tabbar" aria-label="Main" style={{ position: 'absolute', left: 16, right: 16, bottom: 20 }}>
        <a className="fk-tab is-active" href="#" aria-current="page">
          <Icon name="today" size={22} />
          Today
        </a>
        <a className="fk-tab" href="#" aria-label="Pets"><Icon name="pets" size={24} /></a>
        <a className="fk-tab" href="#" aria-label="Activity"><Icon name="activity" size={24} /></a>
        <a className="fk-tab" href="#" aria-label="Household"><Icon name="household" size={24} /></a>
      </nav>
    </div>
  );
}

function DayMark({ mark }: { mark: 'done' | 'partial' | 'health' | 'empty' }) {
  if (mark === 'done') {
    return (
      <span className="fk-day__mark fk-day__mark--done">
        <Icon name="check" size={10} />
      </span>
    );
  }
  if (mark === 'partial') return <span className="fk-day__mark fk-day__mark--partial" />;
  if (mark === 'health') {
    return (
      <span className="fk-day__mark">
        <span className="fk-day__mark--health" style={{ display: 'block', borderRadius: 999, boxSizing: 'border-box' }} />
      </span>
    );
  }
  return <span className="fk-day__mark" />;
}

function TaskBox({ name }: { name: IconName }) {
  return (
    <span className="fk-task__box" aria-hidden="true">
      <Icon name={name} size={24} />
    </span>
  );
}

function DoneTask({ icon, title, pet, meta }: { icon: IconName; title: string; pet: string; meta: string }) {
  return (
    <div className="fk-task fk-task--done" role="link">
      <span className="fk-task__box" aria-hidden="true">
        <Icon name={icon} size={24} />
        <span className="fk-task__badge">
          <Icon name="check" size={14} />
        </span>
      </span>
      <div className="fk-task__body">
        <div className="fk-task__title">{title}</div>
        <div className="fk-task__meta"><span className="fk-task__pet">{pet}</span> · {meta}</div>
      </div>
    </div>
  );
}
