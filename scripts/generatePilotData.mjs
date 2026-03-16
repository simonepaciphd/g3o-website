import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const workspaceRoot = path.resolve(projectRoot, '..', '..', '..');

const pilotCsvPath = path.join(
  workspaceRoot,
  'inputs',
  'G3O_automatic_search',
  'final_merge',
  'g3o_full_database_v1.csv',
);

const masterCsvPath = path.join(
  workspaceRoot,
  'inputs',
  'G3O_Institution_Master',
  'data_final',
  'master_institutions.csv',
);

const outputPath = path.join(projectRoot, 'src', 'data', 'pilotDashboardData.json');

const LEVEL_LABELS = {
  national: 'National',
  subnational: 'Subnational',
  unknown: 'Unknown level',
};

const BRANCH_LABELS = {
  executive: 'Executive',
  legislative: 'Legislative',
  judicial: 'Judicial',
  unknown: 'Unknown branch',
};

const EVIDENCE_LABELS = {
  yes: 'Documented activity',
  unclear: 'Unclear / ambiguous',
  no: 'No documented activity',
  not_reviewed: 'Structure only / not yet reviewed',
};

const ORIGIN_LABELS = {
  pilot: 'Pilot evidence only',
  'pilot+master': 'Pilot evidence + master structure',
  master: 'Master structure only',
};

const CONFIDENCE_ORDER = ['low', 'medium', 'high'];

const COUNTRY_ALIASES = {
  'Bolivia (Plurinational State of)': 'Bolivia',
  Czechia: 'Czech Republic',
  Gambia: 'Gambia (The)',
  'Ivory Coast': 'Côte d’Ivoire',
  'Republic of Moldova': 'Moldova',
  'United Republic of Tanzania': 'Tanzania',
  Syria: 'Syrian Arab Republic',
  'Korea (North)': 'North Korea',
  "Democratic People's Republic of Korea": 'North Korea',
  'Republic of Korea': 'South Korea',
  'Bosnia and Herzegovina': 'Bosnia & Herzegovina',
  'Democratic Republic of the Congo': 'Democratic Republic of Congo',
  'Congo (Democratic Republic)': 'Democratic Republic of Congo',
  'Congo (Republic)': 'Congo',
};

function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === ',' && !inQuotes) {
      fields.push(current);
      current = '';
      continue;
    }

    current += character;
  }

  fields.push(current);
  return fields;
}

function cleanCell(value) {
  if (value == null) {
    return '';
  }

  const trimmed = String(value).trim();

  if (!trimmed || trimmed === '_NA_') {
    return '';
  }

  return trimmed;
}

function normalizeOptionalValue(value) {
  const cleaned = cleanCell(value);
  return /^(unknown|tbd|n\/a|na|-)$/i.test(cleaned) ? '' : cleaned;
}

function canonicalizeCountry(value) {
  const cleaned = cleanCell(value);
  return COUNTRY_ALIASES[cleaned] || cleaned;
}

function dedupe(values) {
  return [...new Set(values.filter(Boolean))];
}

function titleCase(value) {
  if (!value) {
    return '';
  }

  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeForKey(value) {
  return cleanCell(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(the|of|de|del|la|le|el|and)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function createInstitutionKey(country, institutionName) {
  return `${normalizeForKey(canonicalizeCountry(country))}__${normalizeForKey(institutionName)}`;
}

function slugify(value) {
  return normalizeForKey(value).replace(/\s+/g, '-');
}

function normalizeConfidence(value) {
  const normalized = cleanCell(value).toLowerCase();

  if (normalized === 'high' || normalized === 'medium' || normalized === 'low') {
    return normalized;
  }

  return '';
}

function pickConfidence(values) {
  let best = '';
  let score = -1;

  for (const value of values) {
    const normalized = normalizeConfidence(value);
    const nextScore = CONFIDENCE_ORDER.indexOf(normalized);

    if (nextScore > score) {
      best = normalized;
      score = nextScore;
    }
  }

  return best;
}

function normalizeLevel(value) {
  const normalized = cleanCell(value).toLowerCase();
  return normalized === 'national' || normalized === 'subnational' ? normalized : 'unknown';
}

function normalizeBranch(value) {
  const normalized = cleanCell(value).toLowerCase();
  return normalized === 'executive' || normalized === 'legislative' || normalized === 'judicial'
    ? normalized
    : 'unknown';
}

function normalizeEvidence(value) {
  const normalized = cleanCell(value).toLowerCase();

  if (normalized === 'yes') {
    return 'yes';
  }

  if (normalized === 'unclear') {
    return 'unclear';
  }

  return 'no';
}

function normalizeTriState(value) {
  const normalized = cleanCell(value).toLowerCase();

  if (normalized === 'yes' || normalized === 'no') {
    return normalized;
  }

  return 'unknown';
}

function pickTriState(values) {
  if (values.includes('yes')) {
    return 'yes';
  }

  if (values.includes('no')) {
    return 'no';
  }

  return 'unknown';
}

function normalizeYear(value) {
  return normalizeOptionalValue(value);
}

function cleanRegionLabel(value) {
  return value
    .replace(/\s+/g, ' ')
    .replace(/[.,;:]+$/g, '')
    .trim();
}

function inferRegion(institutionName, level) {
  if (level === 'national') {
    return { label: 'National', kind: 'national' };
  }

  const simplifiedName = cleanCell(institutionName)
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const matchers = [
    { pattern: /Gobierno de la Provincia de ([^,;]+)/i, format: ([match]) => cleanRegionLabel(match) },
    { pattern: /Province of ([^,;]+)/i, format: ([match]) => cleanRegionLabel(match) },
    { pattern: /Provincia de ([^,;]+)/i, format: ([match]) => cleanRegionLabel(match) },
    { pattern: /State of ([^,;]+)/i, format: ([match]) => cleanRegionLabel(match) },
    { pattern: /Province de ([^,;]+)/i, format: ([match]) => cleanRegionLabel(match) },
    {
      pattern: /([A-Z][A-Za-z'.& -]+?) Metropolitan City\b/,
      format: ([match]) => `${cleanRegionLabel(match)} Metropolitan City`,
    },
    {
      pattern: /([A-Z][A-Za-z'.& -]+?) Prefecture\b/,
      format: ([match]) => `${cleanRegionLabel(match)} Prefecture`,
    },
    {
      pattern: /([A-Z][A-Za-z'.& -]+?) Governorate\b/,
      format: ([match]) => `${cleanRegionLabel(match)} Governorate`,
    },
    {
      pattern: /([A-Z][A-Za-z'.& -]+?) County\b/,
      format: ([match]) => `${cleanRegionLabel(match)} County`,
    },
    {
      pattern: /([A-Z][A-Za-z'.& -]+?) District\b/,
      format: ([match]) => `${cleanRegionLabel(match)} District`,
    },
    {
      pattern: /([A-Z][A-Za-z'.& -]+?) Region\b/,
      format: ([match]) => `${cleanRegionLabel(match)} Region`,
    },
    {
      pattern: /([A-Z][A-Za-z'.& -]+?) City\b/,
      format: ([match]) => `${cleanRegionLabel(match)} City`,
    },
    {
      pattern: /Municipality of ([^,;]+)/i,
      format: ([match]) => cleanRegionLabel(match),
    },
    {
      pattern: /City of ([^,;]+)/i,
      format: ([match]) => `${cleanRegionLabel(match)} City`,
    },
    {
      pattern: /Gobierno de la Ciudad de ([^,;]+)/i,
      format: ([match]) => cleanRegionLabel(match),
    },
    {
      pattern: /([A-Z][A-Za-z'.& -]+?) High Court\b/,
      format: ([match]) => cleanRegionLabel(match),
    },
    {
      pattern: /Estado do ([^,;]+)/i,
      format: ([match]) => cleanRegionLabel(match),
    },
    {
      pattern: /[–-]\s*([^–-]+)$/,
      format: ([match]) => cleanRegionLabel(match),
    },
  ];

  for (const matcher of matchers) {
    const result = simplifiedName.match(matcher.pattern);

    if (result?.[1]) {
      const label = matcher.format(result.slice(1));

      if (label) {
        return { label, kind: 'inferred' };
      }
    }
  }

  if (level === 'subnational') {
    return { label: 'Unspecified subnational', kind: 'unspecified' };
  }

  return { label: 'Unspecified', kind: 'unspecified' };
}

function pickMostRecentDate(records) {
  const candidates = records
    .flatMap((record) => [record.sourcePublicationDate, record.sourceAccessDate])
    .filter(Boolean);

  if (candidates.length === 0) {
    return '';
  }

  return candidates.sort().at(-1) ?? '';
}

function parseCsvFile(filePath) {
  const csvText = fs.readFileSync(filePath, 'utf8');
  const lines = csvText.split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const columns = parseCsvLine(line);
    const row = Object.fromEntries(
      header.map((column, index) => [column, cleanCell(columns[index] ?? '')]),
    );

    if (row.country) {
      row.country = canonicalizeCountry(row.country);
    }

    return row;
  });
}

function buildMasterRecords() {
  if (!fs.existsSync(masterCsvPath)) {
    return new Map();
  }

  const rows = parseCsvFile(masterCsvPath);
  const masterRecords = new Map();

  for (const row of rows) {
    const key = createInstitutionKey(row.country, row.institution_name);

    if (!masterRecords.has(key)) {
      masterRecords.set(key, {
        key,
        id: `MASTER-${slugify(row.country)}-${slugify(row.institution_name)}`,
        name: row.institution_name,
        country: row.country,
        levelKey: normalizeLevel(row.government_level),
        levelLabel: LEVEL_LABELS[normalizeLevel(row.government_level)],
        branchKey: normalizeBranch(row.branch),
        branchLabel: BRANCH_LABELS[normalizeBranch(row.branch)],
        institutionType: normalizeOptionalValue(row.institution_type),
        institutionTypeLabel: normalizeOptionalValue(row.institution_type)
          ? titleCase(row.institution_type)
          : '',
        website: normalizeOptionalValue(row.website),
        sourceDatasetId: normalizeOptionalValue(row.source_dataset_id),
        sourceUrl: normalizeOptionalValue(row.source_url),
        sourceFile: normalizeOptionalValue(row.source_file),
        retrievalDate: normalizeOptionalValue(row.retrieval_date),
        notes: [],
      });
    }

    const masterRecord = masterRecords.get(key);
    masterRecord.website ||= normalizeOptionalValue(row.website);
    masterRecord.sourceDatasetId ||= normalizeOptionalValue(row.source_dataset_id);
    masterRecord.sourceUrl ||= normalizeOptionalValue(row.source_url);
    masterRecord.sourceFile ||= normalizeOptionalValue(row.source_file);
    masterRecord.retrievalDate ||= normalizeOptionalValue(row.retrieval_date);

    const note = normalizeOptionalValue(row.notes);
    if (note) {
      masterRecord.notes.push(note);
    }
  }

  for (const masterRecord of masterRecords.values()) {
    masterRecord.notes = dedupe(masterRecord.notes);
  }

  return masterRecords;
}

function applyMasterRecord(institution, masterRecord) {
  if (!masterRecord) {
    institution.recordOrigin = 'pilot';
    institution.recordOriginLabel = ORIGIN_LABELS.pilot;
    institution.institutionType = '';
    institution.website = '';
    institution.masterRecord = null;
    return institution;
  }

  if (institution.levelKey === 'unknown' && masterRecord.levelKey !== 'unknown') {
    institution.levelKey = masterRecord.levelKey;
    institution.levelLabel = masterRecord.levelLabel;
  }

  if (institution.branchKey === 'unknown' && masterRecord.branchKey !== 'unknown') {
    institution.branchKey = masterRecord.branchKey;
    institution.branchLabel = masterRecord.branchLabel;
  }

  institution.recordOrigin = 'pilot+master';
  institution.recordOriginLabel = ORIGIN_LABELS['pilot+master'];
  institution.institutionType = masterRecord.institutionTypeLabel;
  institution.website = masterRecord.website;
  institution.masterRecord = masterRecord;

  return institution;
}

function buildPilotInstitution(institutionId, rows, masterRecord) {
  const firstRow = rows[0];
  const levelKey = normalizeLevel(firstRow.level_of_government);
  const branchKey = normalizeBranch(firstRow.branch_of_government);
  const region = inferRegion(firstRow.institution_name, levelKey);

  const evidenceValues = rows.map((row) => normalizeEvidence(row.has_genai_activity));
  const hasGenaiActivity = evidenceValues.includes('yes')
    ? 'yes'
    : evidenceValues.includes('unclear')
      ? 'unclear'
      : 'no';

  const activities = rows
    .filter(
      (row) =>
        row.activity_name ||
        row.activity_type ||
        row.tool_name ||
        row.vendor ||
        row.adoption_stage,
    )
    .map((row) => ({
      id: row.global_row_id || `${institutionId}-${row.source_url || row.source_title}`,
      name: row.activity_name || row.activity_type || 'Recorded activity',
      type: normalizeOptionalValue(row.activity_type),
      stage: normalizeOptionalValue(row.adoption_stage),
      accessType: normalizeOptionalValue(row.access_type),
      interactionType: normalizeOptionalValue(row.interaction_type),
      toolName: normalizeOptionalValue(row.tool_name),
      vendor: normalizeOptionalValue(row.vendor),
      deploymentMode: normalizeOptionalValue(row.deployment_mode),
      targetUsers: normalizeOptionalValue(row.target_users),
      yearAnnounced: normalizeYear(row.year_announced),
      yearDeployed: normalizeYear(row.year_deployed),
    }));

  const evidenceRecords = rows.map((row) => ({
    id: row.global_row_id || `${institutionId}-${row.source_url || row.source_title}`,
    sourceUrl: normalizeOptionalValue(row.source_url),
    sourceTitle: normalizeOptionalValue(row.source_title),
    sourcePublicationDate: normalizeOptionalValue(row.source_publication_date),
    sourceAccessDate: normalizeOptionalValue(row.source_access_date),
    sourceType: normalizeOptionalValue(row.source_type),
    sourceLanguage: normalizeOptionalValue(row.source_language),
    sourceCredibility: normalizeOptionalValue(row.source_credibility),
    confidence: normalizeConfidence(row.confidence),
    genaiEvidence: normalizeOptionalValue(row.genai_evidence),
    sourceSnippet: normalizeOptionalValue(row.source_snippet),
    outcomes: normalizeOptionalValue(row.reported_outcomes),
    incidents: normalizeOptionalValue(row.reported_incidents),
    uncertaintyFlags: dedupe(
      cleanCell(row.uncertainty_flags)
        .split(';')
        .map((value) => cleanCell(value)),
    ),
  }));

  const confidence = pickConfidence(rows.map((row) => row.confidence));
  const scopeNotes = dedupe(rows.map((row) => normalizeOptionalValue(row.scope_notes)));
  const tools = dedupe(rows.map((row) => normalizeOptionalValue(row.tool_name)));
  const vendors = dedupe(rows.map((row) => normalizeOptionalValue(row.vendor)));
  const searchLanguages = dedupe(
    rows.flatMap((row) =>
      normalizeOptionalValue(row.institution_search_languages)
        .split(/[;,]/)
        .map((value) => normalizeOptionalValue(value)),
    ),
  );
  const adoptionStages = dedupe(rows.map((row) => normalizeOptionalValue(row.adoption_stage))).map(titleCase);
  const reportedOutcomes = dedupe(rows.map((row) => normalizeOptionalValue(row.reported_outcomes)));
  const reportedIncidents = dedupe(rows.map((row) => normalizeOptionalValue(row.reported_incidents)));
  const uncertaintyFlags = dedupe(
    rows.flatMap((row) =>
      cleanCell(row.uncertainty_flags)
        .split(';')
        .map((value) => cleanCell(value)),
    ),
  );
  const yearAnnounced = dedupe(rows.map((row) => normalizeYear(row.year_announced)));
  const yearDeployed = dedupe(rows.map((row) => normalizeYear(row.year_deployed)));
  const latestSourceDate = pickMostRecentDate(evidenceRecords);

  const institution = {
    id: institutionId,
    name: firstRow.institution_name || institutionId,
    country: firstRow.country || 'Unknown country',
    levelKey,
    levelLabel: LEVEL_LABELS[levelKey],
    branchKey,
    branchLabel: BRANCH_LABELS[branchKey],
    regionLabel: region.label,
    regionKind: region.kind,
    hasGenaiActivity,
    evidenceLabel: EVIDENCE_LABELS[hasGenaiActivity],
    summary: firstRow.institution_summary || 'No institution summary available in the pilot data.',
    searchLanguages,
    tools,
    vendors,
    adoptionStages,
    confidence,
    confidenceLabel: confidence ? titleCase(confidence) : 'Not rated',
    latestSourceDate,
    yearAnnounced,
    yearDeployed,
    activityCount: activities.length,
    sourceCount: evidenceRecords.length,
    scopeNotes,
    reportedOutcomes,
    reportedIncidents,
    uncertaintyFlags,
    safeguardSignals: {
      humanOversight: pickTriState(rows.map((row) => normalizeTriState(row.has_human_oversight))),
      transparencyNotice: pickTriState(
        rows.map((row) => normalizeTriState(row.has_transparency_notice)),
      ),
      dataClassification: pickTriState(
        rows.map((row) => normalizeTriState(row.has_data_classification)),
      ),
      riskAssessment: pickTriState(
        rows.map((row) => normalizeTriState(row.has_risk_assessment)),
      ),
    },
    activities,
    evidenceRecords,
  };

  applyMasterRecord(institution, masterRecord);

  institution.searchText = [
    institution.name,
    institution.country,
    institution.levelLabel,
    institution.branchLabel,
    institution.regionLabel,
    institution.evidenceLabel,
    institution.recordOriginLabel,
    institution.institutionType,
    institution.summary,
    institution.tools.join(' '),
    institution.vendors.join(' '),
    institution.scopeNotes.join(' '),
    institution.activities.map((activity) => activity.name).join(' '),
    institution.masterRecord?.notes?.join(' ') || '',
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return institution;
}

function buildMasterOnlyInstitution(masterRecord) {
  const region = inferRegion(masterRecord.name, masterRecord.levelKey);

  return {
    id: masterRecord.id,
    name: masterRecord.name,
    country: masterRecord.country,
    levelKey: masterRecord.levelKey,
    levelLabel: masterRecord.levelLabel,
    branchKey: masterRecord.branchKey,
    branchLabel: masterRecord.branchLabel,
    regionLabel: region.label,
    regionKind: region.kind,
    hasGenaiActivity: 'not_reviewed',
    evidenceLabel: EVIDENCE_LABELS.not_reviewed,
    summary: `${masterRecord.name} is currently included from master_institutions.csv as a structural baseline record. The pilot evidence backend does not yet contain a reviewed row for this institution.`,
    searchLanguages: [],
    tools: [],
    vendors: [],
    adoptionStages: [],
    confidence: '',
    confidenceLabel: 'Not rated',
    latestSourceDate: '',
    yearAnnounced: [],
    yearDeployed: [],
    activityCount: 0,
    sourceCount: 0,
    scopeNotes: [],
    reportedOutcomes: [],
    reportedIncidents: [],
    uncertaintyFlags: [],
    safeguardSignals: {
      humanOversight: 'unknown',
      transparencyNotice: 'unknown',
      dataClassification: 'unknown',
      riskAssessment: 'unknown',
    },
    activities: [],
    evidenceRecords: [],
    recordOrigin: 'master',
    recordOriginLabel: ORIGIN_LABELS.master,
    institutionType: masterRecord.institutionTypeLabel,
    website: masterRecord.website,
    masterRecord,
    searchText: [
      masterRecord.name,
      masterRecord.country,
      masterRecord.levelLabel,
      masterRecord.branchLabel,
      masterRecord.institutionTypeLabel,
      EVIDENCE_LABELS.not_reviewed,
      ORIGIN_LABELS.master,
      masterRecord.notes.join(' '),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
}

function sortInstitutions(institutions) {
  const levelOrder = ['national', 'subnational', 'unknown'];
  const branchOrder = ['executive', 'legislative', 'judicial', 'unknown'];
  const evidenceOrder = ['yes', 'unclear', 'no', 'not_reviewed'];

  return institutions.sort((left, right) => {
    if (left.country !== right.country) {
      return left.country.localeCompare(right.country);
    }

    if (left.levelKey !== right.levelKey) {
      return levelOrder.indexOf(left.levelKey) - levelOrder.indexOf(right.levelKey);
    }

    if (left.branchKey !== right.branchKey) {
      return branchOrder.indexOf(left.branchKey) - branchOrder.indexOf(right.branchKey);
    }

    if (left.regionLabel !== right.regionLabel) {
      return left.regionLabel.localeCompare(right.regionLabel);
    }

    if (left.hasGenaiActivity !== right.hasGenaiActivity) {
      return evidenceOrder.indexOf(left.hasGenaiActivity) - evidenceOrder.indexOf(right.hasGenaiActivity);
    }

    return left.name.localeCompare(right.name);
  });
}

function collectMetaCounts(institutions) {
  const meta = {
    institutionCount: institutions.length,
    countryCount: new Set(institutions.map((institution) => institution.country)).size,
    rowCount: institutions.reduce(
      (total, institution) => total + institution.evidenceRecords.length,
      0,
    ),
    activityCount: institutions.reduce(
      (total, institution) => total + institution.activities.length,
      0,
    ),
    evidenceCounts: {
      yes: 0,
      unclear: 0,
      no: 0,
      not_reviewed: 0,
    },
    levelCounts: {
      national: 0,
      subnational: 0,
      unknown: 0,
    },
    branchCounts: {
      executive: 0,
      legislative: 0,
      judicial: 0,
      unknown: 0,
    },
    originCounts: {
      pilot: 0,
      'pilot+master': 0,
      master: 0,
    },
  };

  for (const institution of institutions) {
    meta.evidenceCounts[institution.hasGenaiActivity] += 1;
    meta.levelCounts[institution.levelKey] += 1;
    meta.branchCounts[institution.branchKey] += 1;
    meta.originCounts[institution.recordOrigin] += 1;
  }

  return meta;
}

function buildInstitutionRows(masterRecords) {
  const rows = parseCsvFile(pilotCsvPath);
  const groupedByInstitution = new Map();

  for (const row of rows) {
    const institutionId = row.institution_id || row.institution_name;

    if (!groupedByInstitution.has(institutionId)) {
      groupedByInstitution.set(institutionId, []);
    }

    groupedByInstitution.get(institutionId).push(row);
  }

  const institutions = [];
  const usedMasterKeys = new Set();

  for (const [institutionId, institutionRows] of groupedByInstitution.entries()) {
    const firstRow = institutionRows[0];
    const masterKey = createInstitutionKey(firstRow.country, firstRow.institution_name);
    const masterRecord = masterRecords.get(masterKey) || null;

    if (masterRecord) {
      usedMasterKeys.add(masterKey);
    }

    institutions.push(buildPilotInstitution(institutionId, institutionRows, masterRecord));
  }

  for (const [masterKey, masterRecord] of masterRecords.entries()) {
    if (!usedMasterKeys.has(masterKey)) {
      institutions.push(buildMasterOnlyInstitution(masterRecord));
    }
  }

  return sortInstitutions(institutions);
}

function buildCountrySummaries(institutions) {
  const countries = institutions.reduce((groups, institution) => {
    const current = groups.get(institution.country) || {
      name: institution.country,
      institutionCount: 0,
      documentedCount: 0,
      structureOnlyCount: 0,
    };

    current.institutionCount += 1;

    if (institution.hasGenaiActivity === 'yes') {
      current.documentedCount += 1;
    }

    if (institution.hasGenaiActivity === 'not_reviewed') {
      current.structureOnlyCount += 1;
    }

    groups.set(institution.country, current);
    return groups;
  }, new Map());

  return [...countries.values()].sort((left, right) => left.name.localeCompare(right.name));
}

function main() {
  const hasPilotCsv = fs.existsSync(pilotCsvPath);
  const hasExistingOutput = fs.existsSync(outputPath);

  if (!hasPilotCsv) {
    if (hasExistingOutput) {
      console.log(
        `Pilot CSV not found at ${pilotCsvPath}. Keeping existing ${outputPath} for build/deploy.`,
      );
      return;
    }

    throw new Error(`Pilot CSV not found at ${pilotCsvPath}`);
  }

  const masterRecords = buildMasterRecords();
  const institutions = buildInstitutionRows(masterRecords);

  const dataset = {
    generatedAt: new Date().toISOString(),
    sourceFiles: {
      pilotDatabase: path.relative(projectRoot, pilotCsvPath).replace(/\\/g, '/'),
      masterInstitutions: fs.existsSync(masterCsvPath)
        ? path.relative(projectRoot, masterCsvPath).replace(/\\/g, '/')
        : '',
    },
    meta: collectMetaCounts(institutions),
    countries: buildCountrySummaries(institutions),
    institutions,
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(dataset, null, 2)}\n`);
  console.log(`Generated ${outputPath} from ${pilotCsvPath}`);
}

main();
