import { Link } from 'react-router-dom';
import { formatList, formatSignal } from '../../utils/dashboardUtils';

const evidenceColors = {
  yes: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  unclear: 'border-amber-200 bg-amber-50 text-amber-700',
  no: 'border-slate-200 bg-slate-100 text-slate-600',
  not_reviewed: 'border-sky-200 bg-sky-50 text-sky-700',
};

const confidenceColors = {
  High: 'border-sky-200 bg-sky-50 text-sky-700',
  Medium: 'border-amber-200 bg-amber-50 text-amber-700',
  Low: 'border-rose-200 bg-rose-50 text-rose-700',
  'Not rated': 'border-slate-200 bg-slate-100 text-slate-600',
};

const evidenceRecordLabels = {
  confirms_absence: 'Confirms absence',
  background_only: 'Background only',
  confirms_activity: 'Confirms activity',
  ambiguous: 'Ambiguous',
};

function Badge({ label, className }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-gray-800">{value || '\u2014'}</dd>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="border-t border-gray-100 px-6 py-5">
      <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-gray-500">{title}</h3>
      {children}
    </section>
  );
}

function TagList({ items, emptyLabel = 'No entries recorded' }) {
  if (!items?.length) {
    return <p className="text-sm text-gray-500">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function Placeholder({ overview }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2563eb] px-6 py-6 text-white">
        <h2 className="font-serif text-2xl font-semibold">Explore the pilot evidence</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-blue-50/90">
          Select an institution from the navigator to review preliminary evidence on government
          use of generative AI in the current public release.
        </p>
      </div>

      <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-[#f7f9fc] p-4">
          <div className="text-xs uppercase tracking-wide text-gray-500">Countries represented</div>
          <div className="mt-2 text-3xl font-semibold text-[#1e3a5f]">{overview.totalCountries}</div>
        </div>
        <div className="rounded-2xl bg-[#f7f9fc] p-4">
          <div className="text-xs uppercase tracking-wide text-gray-500">Institutions in database</div>
          <div className="mt-2 text-3xl font-semibold text-[#1e3a5f]">{overview.totalInstitutions}</div>
        </div>
        <div className="rounded-2xl bg-[#f7f9fc] p-4">
          <div className="text-xs uppercase tracking-wide text-gray-500">Pilot-reviewed institutions</div>
          <div className="mt-2 text-3xl font-semibold text-[#1e3a5f]">
            {overview.pilotReviewedInstitutions}
          </div>
        </div>
        <div className="rounded-2xl bg-[#f7f9fc] p-4">
          <div className="text-xs uppercase tracking-wide text-gray-500">Pilot-added institutions</div>
          <div className="mt-2 text-3xl font-semibold text-[#1e3a5f]">
            {overview.pilotAddedInstitutions}
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-t border-gray-100 px-6 py-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-700">Pilot signal</div>
          <p className="mt-2 text-sm leading-relaxed text-emerald-950">
            The pilot contributes {overview.namedActivities} named activities and
            {' '}
            {overview.documentedActivityInstitutions} institutions with documented activity.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Current release</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-800">
            {overview.totalInstitutions} institutions are currently visible across
            {' '}
            {overview.totalCountries} countries.
          </p>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
      <h4 className="text-sm font-semibold text-[#1e3a5f]">{activity.name}</h4>
      <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
        <MetaItem label="Stage" value={activity.stage || '\u2014'} />
        <MetaItem label="Type" value={activity.type || '\u2014'} />
        <MetaItem label="Tool" value={activity.toolName || '\u2014'} />
        <MetaItem label="Vendor" value={activity.vendor || '\u2014'} />
        <MetaItem label="Access" value={activity.accessType || '\u2014'} />
        <MetaItem label="Interaction" value={activity.interactionType || '\u2014'} />
        <MetaItem label="Deployment" value={activity.deploymentMode || '\u2014'} />
        <MetaItem label="Target users" value={activity.targetUsers || '\u2014'} />
        <MetaItem
          label="Years"
          value={
            activity.yearDeployed || activity.yearAnnounced
              ? [activity.yearAnnounced, activity.yearDeployed].filter(Boolean).join(' / ')
              : '\u2014'
          }
        />
      </dl>
    </article>
  );
}

function EvidenceRecord({ record }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        {record.sourceType && (
          <Badge
            label={record.sourceType.replace(/_/g, ' ')}
            className="border-gray-200 bg-gray-50 text-gray-600"
          />
        )}
        {record.sourceCredibility && (
          <Badge
            label={`${record.sourceCredibility} credibility`}
            className="border-gray-200 bg-gray-50 text-gray-600"
          />
        )}
        {record.confidence && (
          <Badge
            label={`${record.confidence} confidence`}
            className="border-gray-200 bg-gray-50 text-gray-600"
          />
        )}
      </div>

      <h4 className="mt-3 text-sm font-semibold text-[#1e3a5f]">
        {record.sourceTitle || 'Untitled source row'}
      </h4>

      <div className="mt-2 text-xs text-gray-500">
        {[record.sourcePublicationDate, record.sourceAccessDate, record.sourceLanguage]
          .filter((value) => value && value !== 'unknown')
          .join(' • ') || 'Publication details not supplied'}
      </div>

      {record.genaiEvidence && (
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          {evidenceRecordLabels[record.genaiEvidence] || record.genaiEvidence}
        </p>
      )}

      {record.sourceSnippet && (
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{record.sourceSnippet}</p>
      )}

      {(record.outcomes || record.incidents) && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">Reported outcomes</div>
            <p className="mt-1 text-sm text-gray-700">{record.outcomes || '\u2014'}</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">Reported incidents</div>
            <p className="mt-1 text-sm text-gray-700">{record.incidents || '\u2014'}</p>
          </div>
        </div>
      )}

      {record.uncertaintyFlags?.length > 0 && record.uncertaintyFlags[0] !== 'none' && (
        <div className="mt-3">
          <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">Uncertainty flags</div>
          <TagList items={record.uncertaintyFlags} />
        </div>
      )}

      {record.sourceUrl && record.sourceUrl !== 'unknown' && (
        <a
          href={record.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-[#2563eb] hover:underline"
        >
          View source
        </a>
      )}
    </article>
  );
}

function InstitutionProfile({ institution, overview }) {
  if (!institution) {
    return <Placeholder overview={overview} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-[#1e3a5f] via-[#24527f] to-[#2563eb] px-6 py-6 text-white">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            label={institution.evidenceLabel}
            className={evidenceColors[institution.hasGenaiActivity] || evidenceColors.no}
          />
          <Badge
            label={`${institution.confidenceLabel} confidence`}
            className={
              confidenceColors[institution.confidenceLabel] || confidenceColors['Not rated']
            }
          />
        </div>

        <h2 className="mt-4 font-serif text-2xl font-semibold">{institution.name}</h2>
        <p className="mt-2 text-sm text-blue-50/90">
          {institution.country} • {institution.levelLabel} • {institution.branchLabel} •{' '}
          {institution.regionLabel}
        </p>
      </div>

      <div className="grid gap-4 px-6 py-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetaItem label="Country" value={institution.country} />
        <MetaItem label="Government tier" value={institution.levelLabel} />
        <MetaItem label="Agency / branch" value={institution.branchLabel} />
        <MetaItem label="Region or locality" value={institution.regionLabel} />
        <MetaItem label="Activities" value={String(institution.activityCount)} />
        <MetaItem label="Source rows" value={String(institution.sourceCount)} />
        <MetaItem label="Latest source date" value={institution.latestSourceDate || '\u2014'} />
        <MetaItem label="Search languages" value={formatList(institution.searchLanguages)} />
      </div>

      <Section title="Institution Summary">
        <p className="text-sm leading-relaxed text-gray-700">{institution.summary}</p>
        {institution.scopeNotes?.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">Scope notes</div>
            <div className="space-y-2">
              {institution.scopeNotes.map((note) => (
                <p key={note} className="text-sm leading-relaxed text-gray-600">
                  {note}
                </p>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section title="Classification">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <MetaItem label="Evidence status" value={institution.evidenceLabel} />
          <MetaItem label="Coverage source" value={institution.recordOriginLabel} />
          <MetaItem label="Agency / branch" value={institution.branchLabel} />
          <MetaItem label="Institution type" value={institution.institutionType || '\u2014'} />
          <MetaItem label="Adoption stages" value={formatList(institution.adoptionStages)} />
          <MetaItem label="Years announced" value={formatList(institution.yearAnnounced)} />
          <MetaItem label="Years deployed" value={formatList(institution.yearDeployed)} />
        </div>
      </Section>

      {institution.website && (
        <section className="border-t border-gray-100 px-6 py-5">
          <a
            href={institution.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-[#2563eb] hover:underline"
          >
            Visit institution website
          </a>
        </section>
      )}

      <Section title="Tools And Vendors">
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">Tools</div>
            <TagList items={institution.tools} emptyLabel="No tool named in the current pilot file" />
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">Vendors</div>
            <TagList items={institution.vendors} emptyLabel="No vendor named in the current pilot file" />
          </div>
        </div>
      </Section>

      <Section title="Governance Signals">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetaItem
            label="Human oversight"
            value={formatSignal(institution.safeguardSignals.humanOversight)}
          />
          <MetaItem
            label="Transparency notice"
            value={formatSignal(institution.safeguardSignals.transparencyNotice)}
          />
          <MetaItem
            label="Data classification"
            value={formatSignal(institution.safeguardSignals.dataClassification)}
          />
          <MetaItem
            label="Risk assessment"
            value={formatSignal(institution.safeguardSignals.riskAssessment)}
          />
        </div>

        {(institution.reportedOutcomes.length > 0 || institution.reportedIncidents.length > 0) && (
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div>
              <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">
                Reported outcomes
              </div>
              <div className="space-y-2">
                {institution.reportedOutcomes.length > 0 ? (
                  institution.reportedOutcomes.map((outcome) => (
                    <p key={outcome} className="text-sm leading-relaxed text-gray-700">
                      {outcome}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No reported outcomes in the pilot file.</p>
                )}
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">
                Reported incidents
              </div>
              <div className="space-y-2">
                {institution.reportedIncidents.length > 0 ? (
                  institution.reportedIncidents.map((incident) => (
                    <p key={incident} className="text-sm leading-relaxed text-gray-700">
                      {incident}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No reported incidents in the pilot file.</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-5">
          <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">Institution-wide uncertainty flags</div>
          <TagList
            items={institution.uncertaintyFlags.filter((flag) => flag !== 'none')}
            emptyLabel="No uncertainty flags recorded"
          />
        </div>
      </Section>

      <Section title="Named Activities">
        {institution.activities.length > 0 ? (
          <div className="space-y-4">
            {institution.activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No named activity was recorded for this institution in the current pilot file.
          </p>
        )}
      </Section>

      <Section title="Evidence Records">
        {institution.evidenceRecords.length > 0 ? (
          <div className="space-y-4">
            {institution.evidenceRecords.map((record) => (
              <EvidenceRecord key={record.id} record={record} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No pilot evidence rows are attached to this institution yet.
          </p>
        )}
      </Section>

      <div className="flex flex-wrap gap-3 border-t border-gray-100 px-6 py-5">
        <Link
          to={`/contact?action=error&institution=${encodeURIComponent(institution.name)}`}
          className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Report an Error
        </Link>
        <Link
          to={`/contact?action=add&institution=${encodeURIComponent(institution.name)}`}
          className="rounded-xl border border-[#2563eb] px-4 py-2 text-sm font-medium text-[#2563eb] transition hover:bg-blue-50"
        >
          Add Information
        </Link>
        <Link
          to={`/contact?action=update&institution=${encodeURIComponent(institution.name)}`}
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Suggest an Update
        </Link>
      </div>
    </div>
  );
}

export default InstitutionProfile;
