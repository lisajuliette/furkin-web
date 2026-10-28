import { ColourToy } from '@/components/ColourToy';
import { Icon, type IconName } from '@/components/Icon';
import { PawArt } from '@/components/PawArt';
import { PhoneShot } from '@/components/PhoneShot';
import { TodayMock } from '@/components/TodayMock';
import { WaitlistForm } from '@/components/WaitlistForm';
import { cta, features, hero, how, problems } from '@/content/en';
import { sectionMotionScript } from '@/lib/motion';

const problemTiles = ['ws-tile--done', 'ws-tile--accent', 'ws-tile--primary'] as const;

export default function Home() {
  return (
    <main>
      <section className="ws-hero ws-rise">
        <div className="ws-wrap ws-hero__grid">
          <div className="ws-hero__copy">
            <p className="ws-label">{hero.label}</p>
            <h1 className="ws-h1">{hero.title}</h1>
            <p className="ws-lead">{hero.lead}</p>
            <WaitlistForm id="email" />
          </div>
          <div className="ws-hero__art">
            <span className="ws-blob ws-hero__blob1" aria-hidden="true" />
            <span className="ws-blob ws-hero__blob2" aria-hidden="true" />
            <div className="ws-phone ws-hero__phone">
              <PhoneShot shot="PGlacierLightToday" alt={hero.phoneAlt} sizes="(max-width: 860px) 240px, 300px" priority className="ws-hero__shot ws-hero__shot--light" />
              <PhoneShot shot="PGlacierDarkToday" alt={hero.phoneAlt} sizes="(max-width: 860px) 240px, 300px" priority className="ws-hero__shot ws-hero__shot--dark" />
            </div>
            <span className="ws-sticker ws-sticker--done ws-hero__st1">
              <span className="ws-sticker__ic"><Icon name="check" size={18} /></span>
              {hero.stickerFed}
            </span>
            <span className="ws-sticker ws-sticker--accent ws-hero__st2">
              <span className="ws-sticker__ic"><Icon name="feed" size={18} /></span>
              {hero.stickerLogged}
            </span>
          </div>
        </div>
      </section>

      <section className="ws-section ws-section--tight ws-rise">
        <div className="ws-wrap">
          <div className="ws-sechead">
            <p className="ws-label">{problems.label}</p>
            <h2 className="ws-h2">{problems.title}</h2>
          </div>
          <div className="ws-grid3">
            {problems.items.map((item, index) => (
              <article className="ws-card" key={item.title}>
                <span className={`ws-tile ${problemTiles[index]}`} aria-hidden="true">
                  <Icon name={item.icon as IconName} size={28} />
                </span>
                <h3 className="ws-h3">{item.title}</h3>
                <p className="ws-p">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ws-section ws-section--how ws-rise" id="how">
        <div className="ws-wrap">
          <div className="ws-sechead">
            <p className="ws-label">{how.label}</p>
            <h2 className="ws-h2">{how.title}</h2>
          </div>
          <ol className="ws-steps">
            {how.steps.map((step, index) => (
              <li className="ws-step" key={step.shot}>
                <span className="ws-step__n" aria-hidden="true">{index + 1}</span>
                <h3 className="ws-h3">{step.title}</h3>
                <p className="ws-p">{step.body}</p>
                <div className="ws-phone ws-phone--sm ws-step__phone">
                  <PhoneShot shot={step.shot} alt={step.alt} sizes="236px" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ws-section ws-rise" id="features">
        <div className="ws-wrap">
          <div className="ws-sechead">
            <p className="ws-label">{features.label}</p>
            <h2 className="ws-h2">{features.title}</h2>
          </div>
          <div className="ws-grid3">
            {features.items.map((item) => (
              <article className="ws-feature" key={item.title}>
                <div className="ws-feature__shot">
                  <PhoneShot shot={item.shot} alt={item.alt} sizes="260px" style={{ marginTop: item.crop }} />
                </div>
                <div className="ws-feature__body">
                  <h3 className="ws-h3">{item.title}</h3>
                  <p className="ws-p">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ws-section ws-band ws-rise" id="make-it-yours">
        <div className="ws-wrap ws-toy">
          <ColourToy>
            <TodayMock />
          </ColourToy>
        </div>
      </section>

      <section id="get" className="ws-section ws-section--cta ws-rise">
        <div className="ws-wrap">
          <div className="ws-cta">
            <div className="ws-stack" style={{ gap: 18 }}>
              <h2 className="ws-h2">{cta.title}</h2>
              <p className="ws-lead">{cta.leadWaitlist}</p>
              <WaitlistForm id="email2" />
            </div>
            <PawArt />
          </div>
        </div>
      </section>
      <script dangerouslySetInnerHTML={{ __html: sectionMotionScript }} />
    </main>
  );
}
